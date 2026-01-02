
import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  varying float vZ;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Wave calculations on GPU
    float dist = distance(pos.xy, uMouse * 25.0);
    float wave = sin(pos.x * 0.2 + uTime) * 0.3 + cos(pos.y * 0.2 + uTime) * 0.3;
    
    // Magnetic dip effect
    float dip = 0.0;
    if (dist < 12.0) {
      dip = -pow(12.0 - dist, 1.5) * 0.12;
    }
    
    // Parallax displacement based on scroll
    pos.z += wave + dip + (uScroll * 2.0);
    vZ = pos.z;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying float vZ;
  uniform float uTime;

  void main() {
    // Grid line logic
    float strength = step(0.96, fract(vUv.x * 30.0)) + step(0.96, fract(vUv.y * 30.0));
    
    // Color shifting based on height (vZ)
    vec3 colorA = vec3(0.1, 0.05, 0.3); // Deep Purple
    vec3 colorB = vec3(0.0, 0.8, 1.0); // Bright Cyan
    vec3 finalColor = mix(colorA, colorB, (vZ + 1.5) * 0.4);
    
    gl_FragColor = vec4(finalColor, strength * 0.25);
  }
`;

const particleVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  attribute float aSize;
  attribute vec3 aOffset;
  varying float vOpacity;
  varying vec3 vColor;

  void main() {
    vec3 pos = position + aOffset;
    
    // Swarm logic around mouse
    vec3 mouse3 = vec3(uMouse * 15.0, 0.0);
    float dist = distance(pos, mouse3);
    
    // Magnetic attraction/repulsion
    float force = (20.0 - dist) * 0.05;
    if (dist < 20.0) {
       pos += normalize(pos - mouse3) * force * sin(uTime + aSize);
    }

    // Floating animation
    pos.x += sin(uTime * 0.5 + aOffset.z) * 0.5;
    pos.y += cos(uTime * 0.5 + aOffset.x) * 0.5;
    
    // Influence position with scroll for depth parallax
    pos.z += sin(uTime * 0.5 + aOffset.y) * 2.0 - (uScroll * 5.0);

    vOpacity = smoothstep(25.0, 5.0, dist) * 0.8 + 0.1;
    
    // Color transition based on proximity
    vec3 cyan = vec3(0.13, 0.82, 0.93);
    vec3 purple = vec3(0.54, 0.36, 0.96);
    vColor = mix(purple, cyan, vOpacity);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = `
  varying float vOpacity;
  varying vec3 vColor;

  void main() {
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;
    
    float glow = pow(0.5 - r, 2.0) * 4.0;
    gl_FragColor = vec4(vColor, vOpacity * glow);
  }
`;

function InteractiveParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  const count = 1500;
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [positions, offsets, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const off = new Float32Array(count * 3);
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      off.set([
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20 - 5
      ], i * 3);
      s[i] = Math.random() * 2.0 + 0.5;
    }
    return [pos, off, s];
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScroll: { value: 0 }
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = state.clock.getElapsedTime();
    material.uniforms.uMouse.value.lerp(mouse, 0.05);
    material.uniforms.uScroll.value = THREE.MathUtils.lerp(material.uniforms.uScroll.value, scrollYRef.current, 0.1);
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aOffset" count={count} array={offsets} itemSize={3} />
        <bufferAttribute attach="attributes-aSize" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function WarpGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScroll: { value: 0 }
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = state.clock.getElapsedTime();
    material.uniforms.uMouse.value.lerp(mouse, 0.05);
    material.uniforms.uScroll.value = THREE.MathUtils.lerp(material.uniforms.uScroll.value, scrollYRef.current, 0.1);
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]}>
      <planeGeometry args={[120, 120, 60, 60]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        wireframe={false}
      />
    </mesh>
  );
}

function CameraRig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    // ultra-smooth cinematic camera float combined with scroll depth
    const scrollDepth = scrollYRef.current * 10;
    camera.position.lerp(vec.set(mouse.x * 2.5, (mouse.y * 1.5) - (scrollYRef.current * 5), 12 + scrollDepth), 0.04);
    camera.lookAt(0, -scrollYRef.current * 10, -5);
  });
  return null;
}

function FloatingCrystals() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 15;
  const dummy = new THREE.Object3D();
  
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      pos: new THREE.Vector3((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 15 - 10),
      rot: new THREE.Euler(Math.random(), Math.random(), Math.random()),
      scale: 0.2 + Math.random() * 0.6,
      speed: 0.15 + Math.random() * 0.4
    }));
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      const t = state.clock.getElapsedTime() * p.speed;
      dummy.position.set(
        p.pos.x + Math.sin(t) * 3,
        p.pos.y + Math.cos(t) * 3,
        p.pos.z
      );
      dummy.rotation.set(p.rot.x + t * 0.5, p.rot.y + t * 0.8, p.rot.z);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null as any, null as any, count]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color="#22d3ee" 
        emissive="#06b6d4" 
        emissiveIntensity={2} 
        transparent 
        opacity={0.3} 
      />
    </instancedMesh>
  );
}

export const Experience = ({ isIntro = false }: { isIntro?: boolean }) => {
  return (
    <div className="w-full h-full pointer-events-none fixed inset-0 bg-[#030014]">
      <Canvas 
        dpr={[1, 2]} 
        gl={{ 
          antialias: false, 
          powerPreference: "high-performance",
          alpha: true,
          depth: true
        }}
        camera={{ position: [0, 0, 12], fov: 45 }}
      >
        <CameraRig />
        <ambientLight intensity={0.4} />
        <pointLight position={[15, 15, 10]} intensity={25} color="#8b5cf6" />
        <pointLight position={[-15, -15, -10]} intensity={15} color="#06b6d4" />
        
        <WarpGrid />
        <InteractiveParticles />
        <FloatingCrystals />
        
        <Stars radius={120} depth={60} count={2000} factor={6} saturation={0} fade speed={0.8} />
        
        <fog attach="fog" args={['#030014', 8, 30]} />
      </Canvas>
    </div>
  );
};

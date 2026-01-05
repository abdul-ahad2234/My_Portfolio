import React, { useRef, useMemo, useEffect, Suspense, lazy } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Lazy load heavier components
const WarpGrid = lazy(() => Promise.resolve({
  default: function WarpGrid() {
    const meshRef = useRef<THREE.Mesh>(null);
    const { mouse } = useThree();
    const scrollYRef = useRef(0);
    const rafId = useRef<number>();

    useEffect(() => {
      const handleScroll = () => {
        scrollYRef.current = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (rafId.current) cancelAnimationFrame(rafId.current);
      };
    }, []);
    
    const uniforms = useMemo(() => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 }
    }), []);

    useFrame((state) => {
      if (!meshRef.current) return;
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime() * 0.5; // Slowed down
      material.uniforms.uMouse.value.lerp(mouse, 0.03); // Reduced sensitivity
      material.uniforms.uScroll.value = THREE.MathUtils.lerp(
        material.uniforms.uScroll.value, 
        scrollYRef.current, 
        0.05
      );
    });

    return (
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]}>
        {/* Reduced geometry complexity */}
        <planeGeometry args={[80, 80, 40, 40]} />
        <shaderMaterial
          vertexShader={`
            varying vec2 vUv;
            uniform float uTime;
            uniform vec2 uMouse;
            uniform float uScroll;
            
            void main() {
              vUv = uv;
              vec3 pos = position;
              
              // Simplified wave calculations
              float wave = sin(pos.x * 0.15 + uTime) * 0.2 + cos(pos.y * 0.15 + uTime) * 0.2;
              pos.z += wave + (uScroll * 1.5);
              
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            uniform float uTime;

            void main() {
              // Simplified grid
              float gridX = step(0.97, fract(vUv.x * 20.0));
              float gridY = step(0.97, fract(vUv.y * 20.0));
              float strength = min(gridX + gridY, 1.0);
              
              // Simpler colors
              vec3 color = mix(vec3(0.1, 0.05, 0.3), vec3(0.0, 0.6, 0.8), strength);
              
              gl_FragColor = vec4(color, strength * 0.2);
            }
          `}
          uniforms={uniforms}
          transparent={true}
          opacity={0.7}
        />
      </mesh>
    );
  }
}));

function OptimizedCameraRig() {
  const { camera, mouse } = useThree();
  const scrollYRef = useRef(0);
  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const rafId = useRef<number>();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          scrollYRef.current = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    const scrollDepth = scrollYRef.current * 8;
    targetPosition.set(
      mouse.x * 1.5, 
      (mouse.y * 1.0) - (scrollYRef.current * 3), 
      10 + scrollDepth
    );
    
    // Smoother camera movement
    camera.position.lerp(targetPosition, 0.03);
    camera.lookAt(0, -scrollYRef.current * 5, -3);
  });
  
  return null;
}

// Loading fallback
const LoadingFallback = () => (
  <div className="w-full h-full fixed inset-0 bg-[#030014] flex items-center justify-center">
    <div className="text-cyan-400 text-lg">Loading experience...</div>
  </div>
);

export const Experience = ({ isIntro = false }: { isIntro?: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Preload WebGL context
  useEffect(() => {
    if (typeof window !== 'undefined' && canvasRef.current) {
      const gl = canvasRef.current.getContext('webgl2') || 
                 canvasRef.current.getContext('webgl');
      if (gl) {
        // Set up basic WebGL context for faster initial render
        gl.clearColor(0.02, 0.0, 0.08, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      }
    }
  }, []);

  return (
    <div className="w-full h-full pointer-events-none fixed inset-0 bg-[#030014]">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas 
          ref={canvasRef}
          dpr={Math.min(window.devicePixelRatio, 1.5)} // Limit pixel ratio
          gl={{
            antialias: true, // Keep antialias for quality
            powerPreference: "high-performance",
            alpha: false, // Disable alpha for performance
            depth: true,
            stencil: false,
            preserveDrawingBuffer: false
          }}
          camera={{ 
            position: [0, 0, 10], 
            fov: 45,
            near: 0.1,
            far: 100
          }}
          frameloop="demand" // Only render when needed
          performance={{ min: 0.5 }} // Target 50% GPU usage
        >
          <OptimizedCameraRig />
          <ambientLight intensity={0.3} />
          
          {/* Only essential lights */}
          <pointLight 
            position={[10, 10, 5]} 
            intensity={15} 
            color="#6d28d9" 
            distance={30}
            decay={1.5}
          />
          
          <Suspense fallback={null}>
            <WarpGrid />
          </Suspense>
          
          {/* Removed fog for performance */}
        </Canvas>
      </Suspense>
    </div>
  );
};

// Export a lightweight version for initial load
export const LightweightExperience = () => (
  <div className="w-full h-full pointer-events-none fixed inset-0 bg-gradient-to-b from-[#030014] to-[#0a0a2a]" />
);
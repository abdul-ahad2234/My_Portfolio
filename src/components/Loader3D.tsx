
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  PerspectiveCamera, 
  Stars,
  Icosahedron,
  Torus
} from '@react-three/drei';
import * as THREE from 'three';

const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;
const SpotLight = 'spotLight' as any;
const Group = 'group' as any;
const Points = 'points' as any;
const BufferGeometry = 'bufferGeometry' as any;
const BufferAttribute = 'bufferAttribute' as any;
const PointsMaterial = 'pointsMaterial' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;

const Core = ({ progress, isExiting }: { progress: number; isExiting: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      
      const distortValue = 0.3 + (progress / 100) * 0.4;
      (meshRef.current.material as any).distort = distortValue;
      
      // Handle the "exit flourish"
      if (isExiting) {
        meshRef.current.scale.lerp(new THREE.Vector3(5, 5, 5), 0.05);
        (meshRef.current.material as any).emissiveIntensity = THREE.MathUtils.lerp(
          (meshRef.current.material as any).emissiveIntensity,
          20,
          0.05
        );
        (meshRef.current.material as any).opacity = THREE.MathUtils.lerp(
          (meshRef.current.material as any).opacity,
          0,
          0.05
        );
      } else {
        const scale = 1 + (progress / 100) * 0.2;
        meshRef.current.scale.set(scale, scale, scale);
      }
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[1, 15]}>
      <MeshDistortMaterial
        color="#8b5cf6"
        speed={4}
        distort={0.4}
        radius={1}
        emissive="#4c1d95"
        emissiveIntensity={1 + (progress / 50)}
        metalness={0.9}
        roughness={0.1}
        transparent
      />
    </Icosahedron>
  );
};

const OrbitalRings = ({ progress, isExiting }: { progress: number; isExiting: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const children = groupRef.current.children;
      children.forEach((child, i) => {
        child.rotation.x += 0.01 * (i + 1);
        child.rotation.y += 0.015 * (i + 1);
        
        if (isExiting) {
          child.scale.multiplyScalar(1.05);
          (child as any).material.opacity = THREE.MathUtils.lerp((child as any).material.opacity, 0, 0.1);
        }
      });
    }
  });

  return (
    <Group ref={groupRef}>
      {[1.6, 2.2, 2.8].map((radius, i) => (
        <Torus key={i} args={[radius, 0.01, 16, 100]}>
          <MeshStandardMaterial 
            color={i === 1 ? "#06b6d4" : "#8b5cf6"} 
            emissive={i === 1 ? "#06b6d4" : "#8b5cf6"} 
            emissiveIntensity={2}
            transparent 
            opacity={0.3 + (progress / 200)} 
          />
        </Torus>
      ))}
    </Group>
  );
};

const Particles = ({ count = 200, isExiting }: { count?: number; isExiting: boolean }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
      if (isExiting) {
        ref.current.scale.multiplyScalar(1.02);
        (ref.current.material as any).opacity = THREE.MathUtils.lerp((ref.current.material as any).opacity, 0, 0.05);
      }
    }
  });

  return (
    <Points ref={ref}>
      <BufferGeometry>
        <BufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </BufferGeometry>
      <PointsMaterial
        size={0.02}
        color="#06b6d4"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </Points>
  );
};

export const Loader3D: React.FC<{ progress: number; isExiting?: boolean }> = ({ progress, isExiting = false }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#030014] overflow-hidden">
      <div className="absolute inset-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <AmbientLight intensity={0.2} />
          <SpotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#8b5cf6" />
          <PointLight position={[-10, -10, -10]} intensity={1} color="#06b6d4" />
          
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Core progress={progress} isExiting={isExiting} />
            <OrbitalRings progress={progress} isExiting={isExiting} />
          </Float>
          
          <Particles isExiting={isExiting} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>

      <div className={`relative z-10 w-full max-w-md px-10 text-center pointer-events-none transition-all duration-1000 ${isExiting ? 'opacity-0 scale-110 blur-xl' : 'opacity-100'}`}>
        <div className="mb-12">
          <h2 className="text-sm font-mono tracking-[0.6em] text-cyan-400 uppercase mb-2 opacity-50">
            Nexus Protocol v4.0
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold font-space tracking-tighter text-white">
            LOADING
          </h1>
        </div>

        <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden mb-4 border border-white/5">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 via-cyan-400 to-purple-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 w-20 bg-white/40 blur-md animate-[scan_2s_linear_infinite]" />
          </div>
        </div>

        <div className="flex justify-between items-center font-mono">
          <span className="text-[10px] text-gray-500 tracking-widest uppercase">Syncing Modalities...</span>
          <span className="text-2xl font-bold text-white tracking-tighter">
            {Math.floor(progress)}<span className="text-cyan-400 text-sm ml-1">%</span>
          </span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }
      `}} />
    </div>
  );
};

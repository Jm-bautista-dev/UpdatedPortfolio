import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Edges } from '@react-three/drei';
import * as THREE from 'three';

interface OrbitTagProps {
  text: string;
  radius: number;
  speed: number;
  initialAngle: number;
}

const OrbitTag = ({ text, radius, speed, initialAngle }: OrbitTagProps) => {
  const ref = useRef<THREE.Group>(null);
  const angle = useRef(initialAngle);

  useFrame((state, delta) => {
    if (ref.current) {
      angle.current += speed * delta;
      const x = Math.cos(angle.current) * radius;
      const z = Math.sin(angle.current) * radius;
      const y = Math.sin(angle.current * 1.5) * (radius * 0.2);
      ref.current.position.set(x, y, z);
    }
  });

  return (
    <group ref={ref}>
      <Html center distanceFactor={8} zIndexRange={[10, 0]}>
        <div className="px-3 py-1.5 bg-bg-card/90 dark:bg-bg-card/95 backdrop-blur-md border border-border-subtle text-[8px] uppercase tracking-[0.2em] font-bold text-text-main whitespace-nowrap pointer-events-none select-none shadow-md transition-colors duration-500">
          {text}
        </div>
      </Html>
    </group>
  );
};

interface SkillCoreProps {
  theme: string;
  coreColor: string;
  innerColor: string;
  lightRef: React.RefObject<THREE.PointLight | null>;
}

const SkillCore = ({ theme, coreColor, innerColor, lightRef }: SkillCoreProps) => {
  const coreRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  
  const smoothScroll = useRef(0);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    
    if (orbitRef.current) {
      orbitRef.current.rotation.y = -elapsed * 0.05;
    }

    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const targetScrollProgress = Math.min(scrollY / 800, 1.0);
    smoothScroll.current += (targetScrollProgress - smoothScroll.current) * 0.15;
    const scrollOffset = smoothScroll.current;

    if (theme === 'dark') {
      const breathe = Math.sin(elapsed * 1.5) * 0.5 + 0.5;
      const heartbeatFrequency = 2 + scrollOffset * 8;
      const heartbeat = Math.sin(elapsed * heartbeatFrequency) * 0.5 + 0.5;
      const pulse = breathe + heartbeat * scrollOffset * 1.5;
      const finalPulse = Math.min(Math.max(pulse, 0), 1.0);

      const outerScale = 1.0 + finalPulse * 0.07;
      const innerScale = 0.75 * (1.0 + finalPulse * 0.04);

      if (coreRef.current) {
        coreRef.current.scale.set(outerScale, outerScale, outerScale);
        const mat = coreRef.current.material as THREE.MeshStandardMaterial;
        if (mat) mat.emissiveIntensity = 0.6 + finalPulse * 1.8;
        
        coreRef.current.rotation.y = elapsed * 0.15 + scrollOffset * 0.8;
        coreRef.current.rotation.x = Math.sin(elapsed * 0.2) * 0.1 + scrollOffset * 0.35;
      }
      if (innerRef.current) {
        innerRef.current.scale.set(innerScale, innerScale, innerScale);
        const mat = innerRef.current.material as THREE.MeshStandardMaterial;
        if (mat) mat.emissiveIntensity = 1.0 + finalPulse * 2.2;
        
        innerRef.current.rotation.y = -elapsed * 0.1 - scrollOffset * 0.5;
      }
      
      if (lightRef && lightRef.current) {
        lightRef.current.intensity = 1.2 + finalPulse * 2.5;
      }
    } else {
      if (coreRef.current) {
        coreRef.current.scale.set(1.0, 1.0, 1.0);
        const mat = coreRef.current.material as THREE.MeshStandardMaterial;
        if (mat) mat.emissiveIntensity = 0.2;
        coreRef.current.rotation.y = elapsed * 0.1;
        coreRef.current.rotation.x = 0;
      }
      if (innerRef.current) {
        innerRef.current.scale.set(0.75, 0.75, 0.75);
        const mat = innerRef.current.material as THREE.MeshStandardMaterial;
        if (mat) mat.emissiveIntensity = 0.6;
        innerRef.current.rotation.y = -elapsed * 0.08;
      }
      if (lightRef && lightRef.current) {
        lightRef.current.intensity = 1.0;
      }
    }
  });

  const skills = ['React', 'Node.js', 'MySQL', 'Python', 'Tailwind', 'Git'];

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color={coreColor}
          roughness={0.1}
          metalness={0.9}
          wireframe
          transparent
          opacity={0.35}
          emissive={theme === 'dark' ? '#22d3ee' : '#000000'}
        />
        <Edges 
          color={theme === 'dark' ? '#93c5fd' : '#000000'} 
        />

        <mesh ref={innerRef} scale={0.75}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={innerColor}
            emissive={theme === 'dark' ? '#3b82f6' : '#5e5e6a'}
            roughness={0.2}
          />
          <Edges 
            color={theme === 'dark' ? '#3b82f6' : 'rgba(0,0,0,0.1)'} 
          />
        </mesh>
      </mesh>

      <group ref={orbitRef}>
        {skills.map((skill, index) => {
          const step = (Math.PI * 2) / skills.length;
          return (
            <OrbitTag
              key={skill}
              text={skill}
              radius={2.8}
              speed={0.25}
              initialAngle={index * step}
            />
          );
        })}
      </group>
    </group>
  );
};

interface ParticleFieldProps {
  count?: number;
  color: string;
}

const ParticleField = ({ count = 120, color }: ParticleFieldProps) => {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 12;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 12;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return coords;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.008;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.003) * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={color}
        sizeAttenuation={true}
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </points>
  );
};

const ParallaxGroup = ({ children }: { children: React.ReactNode }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const targetX = state.pointer.x * 0.6;
      const targetY = state.pointer.y * 0.4;
      
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.08;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.08;
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

export const SceneCanvas = ({ theme }: { theme: string }) => {
  const lightRef = useRef<THREE.PointLight>(null);
  
  const coreColor = theme === 'dark' ? '#06b6d4' : '#000000';
  const innerColor = theme === 'dark' ? '#1e3a8a' : '#5e5e6a';
  const particleColor = theme === 'dark' ? '#38bdf8' : '#71717a';

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <fog attach="fog" args={[theme === 'dark' ? '#0a0a1a' : '#f9f9fb', 5, 20]} />

        <ambientLight intensity={theme === 'dark' ? 1.0 : 0.4} />
        
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={theme === 'dark' ? 2.5 : 1.0} 
          color={theme === 'dark' ? '#60a5fa' : '#ffffff'} 
        />
        
        <pointLight 
          position={[-5, -5, -5]} 
          intensity={theme === 'dark' ? 2.0 : 0.5} 
          color={theme === 'dark' ? '#38bdf8' : '#ffffff'} 
        />

        <pointLight
          ref={lightRef}
          position={[0, 0, 1.2]}
          intensity={theme === 'dark' ? 1.5 : 0.8}
          color={theme === 'dark' ? '#38bdf8' : '#ffffff'}
          distance={6}
          decay={2}
        />
        
        <ParallaxGroup>
          <SkillCore 
            theme={theme} 
            coreColor={coreColor} 
            innerColor={innerColor} 
            lightRef={lightRef} 
          />
          <ParticleField count={100} color={particleColor} />
        </ParallaxGroup>
      </Canvas>
    </div>
  );
};

export default SceneCanvas;

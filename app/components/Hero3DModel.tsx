'use client';

import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Suppress GLTFLoader blob URL warnings globally
if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args: any[]) => {
    const message = args[0];
    if (
      typeof message === 'string' &&
      message.includes('GLTFLoader') &&
      message.includes('texture') &&
      message.includes('blob:')
    ) {
      // Suppress blob URL texture warnings - these are handled internally
      return;
    }
    originalWarn.apply(console, args);
  };
}

// Preload GLTF
useGLTF.preload('/models/biomass-heater.glb');

// 3D Model Loader Component
function Model({ url }: { url: string }) {
  const gltf = useGLTF(url, true);
  const scene = gltf.scene;
  const meshRef = useRef<THREE.Group>(null);
  const initializedRef = useRef(false);

  // Handle texture loading issues - run once after scene loads
  useEffect(() => {
    if (!scene || initializedRef.current) return;
    
    initializedRef.current = true;

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((material) => {
          if (material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshPhysicalMaterial) {
            // Ensure textures are properly initialized
            if (material.map) material.map.needsUpdate = true;
            if (material.normalMap) material.normalMap.needsUpdate = true;
            if (material.roughnessMap) material.roughnessMap.needsUpdate = true;
            if (material.metalnessMap) material.metalnessMap.needsUpdate = true;
            material.needsUpdate = true;
          }
        });
      }
    });
  }, [scene]);

  // Auto-rotate animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <primitive 
      ref={meshRef}
      object={scene} 
      scale={1} 
      position={[0, 0, 0]}
    />
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#f97316" />
    </mesh>
  );
}

// Placeholder 3D model - a simple industrial heater representation
function PlaceholderModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, 2, 32]} />
        <meshStandardMaterial color="#4a5568" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[0.8, 0.5, 16]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[1.5, 0, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>
    </group>
  );
}

// Main 3D Model Viewer Component
export default function Hero3DModel({ modelPath }: { modelPath?: string }) {
  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        className="w-full h-full"
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          {modelPath ? (
            <Model url={modelPath} />
          ) : (
            <PlaceholderModel />
          )}
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
    </div>
  );
}


'use client';

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import Icon from './Icon';

// Model variants data
const burnerModels = [
  {
    id: 'IB-150',
    modelPath: '/models/biomass-heater.glb',
    capacityKcal: '1,50,000',
    capacityKW: '174',
    fuelRate: '37',
    power: '1 HP (0.75 KW)',
    plcControl: 'Yes',
    secondaryFeeder: 'Optional',
    autoIgnition: 'Optional',
    autoAshRemoval: 'Optional',
  },
  {
    id: 'IB-200',
    modelPath: '/models/biomass-heater.glb',
    capacityKcal: '2,00,000',
    capacityKW: '232',
    fuelRate: '49',
    power: '1.5 HP (1.1 KW)',
    plcControl: 'Yes',
    secondaryFeeder: 'Optional',
    autoIgnition: 'Optional',
    autoAshRemoval: 'Optional',
  },
  {
    id: 'IB-300',
    modelPath: '/models/biomass-heater.glb',
    capacityKcal: '3,00,000',
    capacityKW: '349',
    fuelRate: '73',
    power: '2 HP (1.5 KW)',
    plcControl: 'Yes',
    secondaryFeeder: 'Optional',
    autoIgnition: 'Optional',
    autoAshRemoval: 'Optional',
  },
  {
    id: 'IB-400',
    modelPath: '/models/biomass-heater.glb',
    capacityKcal: '4,00,000',
    capacityKW: '465',
    fuelRate: '98',
    power: '2 HP (1.5 KW)',
    plcControl: 'Yes',
    secondaryFeeder: 'Optional',
    autoIgnition: 'Optional',
    autoAshRemoval: 'Optional',
  },
  {
    id: 'IB-500',
    modelPath: '/models/biomass-heater.glb',
    capacityKcal: '5,00,000',
    capacityKW: '581',
    fuelRate: '122',
    power: '3 HP (2.2 KW)',
    plcControl: 'Yes',
    secondaryFeeder: 'Optional',
    autoIgnition: 'Optional',
    autoAshRemoval: 'Optional',
  },
  {
    id: 'IB-600',
    modelPath: '/models/biomass-heater.glb',
    capacityKcal: '6,00,000',
    capacityKW: '698',
    fuelRate: '147',
    power: '3 HP (2.2 KW)',
    plcControl: 'Yes',
    secondaryFeeder: 'Optional',
    autoIgnition: 'Optional',
    autoAshRemoval: 'Optional',
  },
  {
    id: 'IB-800',
    modelPath: '/models/biomass-heater.glb',
    capacityKcal: '8,00,000',
    capacityKW: '930',
    fuelRate: '196',
    power: '4 HP (3 KW)',
    plcControl: 'Yes',
    secondaryFeeder: 'Optional',
    autoIgnition: 'Optional',
    autoAshRemoval: 'Optional',
  },
  {
    id: 'IB-1000',
    modelPath: '/models/biomass-heater.glb',
    capacityKcal: '10,00,000',
    capacityKW: '1163',
    fuelRate: '245',
    power: '5 HP (3.7 KW)',
    plcControl: 'Yes',
    secondaryFeeder: 'Optional',
    autoIgnition: 'Optional',
    autoAshRemoval: 'Optional',
  },
  {
    id: 'IB-1200',
    modelPath: '/models/biomass-heater.glb',
    capacityKcal: '12,00,000',
    capacityKW: '1395',
    fuelRate: '294',
    power: '5 HP (3.7 KW)',
    plcControl: 'Yes',
    secondaryFeeder: 'Optional',
    autoIgnition: 'Optional',
    autoAshRemoval: 'Optional',
  },
  {
    id: 'IB-1400',
    modelPath: '/models/biomass-heater.glb',
    capacityKcal: '14,00,000',
    capacityKW: '1628',
    fuelRate: '343',
    power: '7.5 HP (5.5 KW)',
    plcControl: 'Yes',
    secondaryFeeder: 'Optional',
    autoIgnition: 'Optional',
    autoAshRemoval: 'Optional',
  },
  {
    id: 'IB-1600',
    modelPath: '/models/biomass-heater.glb',
    capacityKcal: '16,00,000',
    capacityKW: '1860',
    fuelRate: '392',
    power: '7.5 HP (5.5 KW)',
    plcControl: 'Yes',
    secondaryFeeder: 'Optional',
    autoIgnition: 'Optional',
    autoAshRemoval: 'Optional',
  },
  {
    id: 'IB-2000',
    modelPath: '/models/biomass-heater.glb',
    capacityKcal: '20,00,000',
    capacityKW: '2326',
    fuelRate: '490',
    power: '10 HP (7.5 KW)',
    plcControl: 'Yes',
    secondaryFeeder: 'Optional',
    autoIgnition: 'Optional',
    autoAshRemoval: 'Optional',
  },
];

// Animated 3D Model Component
function AnimatedModel({ modelPath, isChanging }: { modelPath: string; isChanging: boolean }) {
  const gltf = useGLTF(modelPath, true);
  const scene = gltf?.scene;
  const meshRef = useRef<THREE.Group>(null);
  const scaleRef = useRef(1);

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((material) => {
          if (material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshPhysicalMaterial) {
            if (material.map) material.map.needsUpdate = true;
            material.needsUpdate = true;
          }
        });
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Smooth rotation
      meshRef.current.rotation.y += delta * 0.3;
      
      // Scale animation when changing
      if (isChanging) {
        scaleRef.current = Math.max(0.8, scaleRef.current - delta * 2);
      } else {
        scaleRef.current = Math.min(1, scaleRef.current + delta * 2);
      }
      meshRef.current.scale.setScalar(scaleRef.current);
    }
  });

  if (!scene) {
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1, 1, 2, 32]} />
          <meshStandardMaterial color="#4a5568" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    );
  }

  return <primitive ref={meshRef} object={scene} scale={1} position={[0, 0, 0]} />;
}

// 3D Viewer with Animation
function Animated3DViewer({ modelPath, isChanging }: { modelPath: string; isChanging: boolean }) {
  return (
    <div className="w-full h-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] rounded-xl overflow-hidden border-2 border-gray-200 shadow-xl bg-white relative">
      <div className="w-full h-full bg-gradient-to-br from-gray-50 via-white to-gray-50 p-3">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          className="w-full h-full rounded-lg"
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} />
            <AnimatedModel modelPath={modelPath} isChanging={isChanging} />
            <OrbitControls
              enableZoom={true}
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
    </div>
  );
}

export default function WoodPelletBurnerSelector() {
  const [selectedModel, setSelectedModel] = useState('IB-400');
  const [isChanging, setIsChanging] = useState(false);
  const [specKey, setSpecKey] = useState(0); // Force re-render for animation

  const currentModel = burnerModels.find(m => m.id === selectedModel) || burnerModels[3];

  const handleModelChange = (modelId: string) => {
    if (modelId === selectedModel) return;
    
    setIsChanging(true);
    setTimeout(() => {
      setSelectedModel(modelId);
      setSpecKey(prev => prev + 1);
      setTimeout(() => {
        setIsChanging(false);
      }, 300);
    }, 200);
  };

  return (
    <div className="w-full bg-white py-8 sm:py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Model Selector Timeline */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#5FAA3F] via-[#5FAA3F] to-[#5FAA3F] transform -translate-y-1/2"></div>
            
            {/* Model Buttons */}
            <div className="relative flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 py-4">
              {burnerModels.map((model) => {
                const isSelected = model.id === selectedModel;
                return (
                  <button
                    key={model.id}
                    onClick={() => handleModelChange(model.id)}
                    className={`relative z-10 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 transform hover:scale-110 ${
                      isSelected
                        ? 'bg-[#5FAA3F] text-white shadow-lg scale-110'
                        : 'bg-white text-[#5FAA3F] border-2 border-[#5FAA3F] hover:bg-[#5FAA3F] hover:text-white'
                    }`}
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {model.id}
                    {isSelected && (
                      <div className="absolute -inset-1 border-2 border-[#5FAA3F] border-dashed rounded-full animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content: Image Left, Specs Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
          {/* 3D Model - Left Side */}
          <div className="order-1">
            <Animated3DViewer modelPath={currentModel.modelPath} isChanging={isChanging} />
          </div>

          {/* Specifications - Right Side */}
          <div className="order-2">
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm h-full">
              {/* Model Title */}
              <h2 
                key={specKey}
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 animate-fadeIn"
                style={{ 
                  color: '#5FAA3F', 
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                  lineHeight: '1.2'
                }}
              >
                Model: {currentModel.id}
              </h2>

              {/* Specifications List */}
              <div className="space-y-4 sm:space-y-5">
                <div 
                  key={`${specKey}-1`}
                  className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 animate-slideIn"
                >
                  <div className="shrink-0 mt-1">
                    <Icon name="zap" className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#5FAA3F' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base font-semibold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                      Capacity - Max (Kcal/Hr)
                    </p>
                    <p className="text-lg sm:text-xl font-bold" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                      {currentModel.capacityKcal}
                    </p>
                  </div>
                </div>

                <div 
                  key={`${specKey}-2`}
                  className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 animate-slideIn"
                >
                  <div className="shrink-0 mt-1">
                    <Icon name="thermometer" className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#5FAA3F' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base font-semibold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                      Capacity - Max (KW/Hr)
                    </p>
                    <p className="text-lg sm:text-xl font-bold" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                      {currentModel.capacityKW}
                    </p>
                  </div>
                </div>

                <div 
                  key={`${specKey}-3`}
                  className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 animate-slideIn"
                >
                  <div className="shrink-0 mt-1">
                    <Icon name="package" className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#5FAA3F' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base font-semibold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                      Fuel Feeding Rate - Max (Kg/Hr)
                    </p>
                    <p className="text-lg sm:text-xl font-bold" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                      {currentModel.fuelRate}
                    </p>
                  </div>
                </div>

                <div 
                  key={`${specKey}-4`}
                  className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 animate-slideIn"
                >
                  <div className="shrink-0 mt-1">
                    <Icon name="zap" className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#5FAA3F' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base font-semibold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                      Power
                    </p>
                    <p className="text-base sm:text-lg font-semibold" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                      {currentModel.power}
                    </p>
                  </div>
                </div>

                <div 
                  key={`${specKey}-5`}
                  className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 animate-slideIn"
                >
                  <div className="shrink-0 mt-1">
                    <Icon name="cpu" className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#5FAA3F' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base font-semibold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                      PLC Control Panel
                    </p>
                    <p className="text-base sm:text-lg font-semibold flex items-center gap-2" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                      <Icon name="check" className="w-4 h-4" style={{ color: '#5FAA3F' }} /> {currentModel.plcControl}
                    </p>
                  </div>
                </div>

                <div 
                  key={`${specKey}-6`}
                  className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 animate-slideIn"
                >
                  <div className="shrink-0 mt-1">
                    <Icon name="plus" className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#5FAA3F' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base font-semibold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                      Secondary Fuel Feeder
                    </p>
                    <p className="text-base sm:text-lg font-semibold" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                      {currentModel.secondaryFeeder}
                    </p>
                  </div>
                </div>

                <div 
                  key={`${specKey}-7`}
                  className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 animate-slideIn"
                >
                  <div className="shrink-0 mt-1">
                    <Icon name="power" className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#5FAA3F' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base font-semibold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                      Automatic Ignition
                    </p>
                    <p className="text-base sm:text-lg font-semibold" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                      {currentModel.autoIgnition}
                    </p>
                  </div>
                </div>

                <div 
                  key={`${specKey}-8`}
                  className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 animate-slideIn"
                >
                  <div className="shrink-0 mt-1">
                    <Icon name="settings" className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#5FAA3F' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base font-semibold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                      Auto ASH Removal
                    </p>
                    <p className="text-base sm:text-lg font-semibold" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                      {currentModel.autoAshRemoval}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}


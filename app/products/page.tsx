'use client';

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { FiPlus, FiMinus, FiCheck, FiZap, FiThermometer, FiPackage, FiCpu, FiPower, FiSettings, FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import NeedHelp from '../components/NeedHelp';
import Icon from '../components/Icon';
import { FiPlay } from 'react-icons/fi';
import faqData from '../../data/faq.json';
import { gpbModels, type GPBModel } from './gpb-models';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// 3D Model Component for Products
function ProductModel({ modelPath }: { modelPath?: string }) {
  const gltf = modelPath ? useGLTF(modelPath, true) : null;
  const scene = gltf?.scene;
  const meshRef = useRef<THREE.Group>(null);

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
      meshRef.current.rotation.y += delta * 0.3;
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

// Product 3D Viewer Component - Fully Responsive
function Product3DViewer({ modelPath }: { modelPath?: string }) {
  return (
    <div className="w-full h-full overflow-hidden bg-gray-50" style={{ minHeight: 'clamp(300px, 40vh, 700px)' }}>
      <div className="w-full h-full p-4 sm:p-6 md:p-8">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          className="w-full h-full"
        >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <ProductModel modelPath={modelPath} />
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

export default function ProductsPage() {
  const { t } = useTranslation();
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);
  const [selectedGPBModel, setSelectedGPBModel] = useState<string>('GPB-01');
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation({ threshold: 0.2 });

// Product Data
const products = [
  {
    id: 1,
      name: t('products.product1Name'),
    modelPath: '/models/biomass-heater.glb',
    image: '/product/Wood Pellet Burner.png',
      overview: t('products.product1Overview'),
    specifications: [
        t('products.product1Spec1'),
        t('products.product1Spec2'),
        t('products.product1Spec3'),
        t('products.product1Spec4'),
        t('products.product1Spec5'),
    ],
    icon: 'zap',
  },
  {
    id: 2,
      name: t('products.product2Name'),
    modelPath: '/models/biomass-heater.glb',
    image: '/product/Wood Pellet Stove.png',
      overview: t('products.product2Overview'),
    specifications: [
        t('products.product2Spec1'),
        t('products.product2Spec2'),
        t('products.product2Spec3'),
        t('products.product2Spec4'),
    ],
    icon: 'thermometer',
  },
  {
    id: 3,
      name: t('products.product3Name'),
    modelPath: '/models/biomass-heater.glb',
    image: '/product/Batch Fryer.png',
      overview: t('products.product3Overview'),
    specifications: [
        t('products.product3Spec1'),
        t('products.product3Spec2'),
        t('products.product3Spec3'),
        t('products.product3Spec4'),
        t('products.product3Spec5'),
    ],
    icon: 'package',
  },
  {
    id: 4,
      name: t('products.product4Name'),
    modelPath: '/models/biomass-heater.glb',
    image: '/product/Hot Air Generator.png',
      overview: t('products.product4Overview'),
    specifications: [
        t('products.product4Spec1'),
        t('products.product4Spec2'),
        t('products.product4Spec3'),
        t('products.product4Spec4'),
        t('products.product4Spec5'),
        t('products.product4Spec6'),
    ],
    icon: 'wind',
  },
  {
    id: 5,
      name: t('products.product5Name'),
    modelPath: '/models/biomass-heater.glb',
    image: '/product/Aluminium Melting Furnace.png',
      overview: t('products.product5Overview'),
    specifications: [
        t('products.product5Spec1'),
        t('products.product5Spec2'),
        t('products.product5Spec3'),
        t('products.product5Spec4'),
        t('products.product5Spec5'),
    ],
    icon: 'flame',
  },
];

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const selectedModelData: GPBModel = gpbModels.find((model: GPBModel) => model.id === selectedGPBModel) || gpbModels[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full bg-white py-4 sm:py-5 md:py-8 lg:py-8 xl:py-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 2xl:px-16">
          <div className="text-center mb-1 sm:mb-1.5 md:mb-2">
            <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3 animate-on-scroll ${heroVisible ? 'animate-textAppear animated' : ''}`} style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
              {t('products.title')}
            </h1>
            <div className="flex justify-center mb-2 sm:mb-2.5">
              <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400"></div>
            </div>
            <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-on-scroll ${heroVisible ? 'animate-textAppear animated stagger-1' : ''}`} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
              {t('products.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Products Section - Card Grid Layout */}
      <section className="relative w-full bg-gradient-to-b from-white to-gray-50 py-8 sm:py-10 md:py-12 lg:py-16" aria-label="Products">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8 md:gap-10 lg:gap-8 xl:gap-6">
            {products.map((product) => (
              <article
                key={product.id}
                className="group bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1"
                itemScope
                itemType="https://schema.org/Product"
              >
                <Link
                  href={`/products/${product.id}`}
                  className="flex flex-col flex-grow"
                  aria-label={`View details for ${product.name}`}
                >
                  {/* Product Image */}
                  <div className="w-full overflow-hidden relative bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-5 md:p-6">
                    <div className="aspect-square relative rounded-lg overflow-hidden shadow-inner">
                      <Image
                        src={product.image}
                        alt={`${product.name} - Product Image`}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                        priority={product.id <= 3}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                        itemProp="image"
                      />
                    </div>
                  </div>
                  
                  {/* Product Content */}
                  <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow bg-white">
                    {/* Product Title */}
                    <h2 
                      className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-5 text-gray-900 group-hover:text-[#5FAA3F] transition-colors duration-300 text-center min-h-[3rem] flex items-center justify-center" 
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                      itemProp="name"
                    >
                      {product.name}
                    </h2>
                    
                    {/* View Details Button */}
                    <div className="flex items-center justify-center gap-2 mt-auto pt-2">
                      <span className="text-sm sm:text-base font-semibold text-[#5FAA3F] group-hover:text-[#2E7D32] transition-colors duration-300" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                        View Details
                      </span>
                      <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#5FAA3F] group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Watch Videos Section */}
      <section className="relative w-full bg-gradient-to-br from-[#5FAA3F] to-[#2E7D32] py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl bg-white"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl bg-yellow-400"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 2xl:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 sm:mb-8 md:mb-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3 text-white" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
                Watch Our Products in Action
              </h2>
              <div className="flex justify-center mb-2 sm:mb-2.5">
                <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400"></div>
              </div>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                Explore our comprehensive video library showcasing our products in real-world applications
              </p>
            </div>
            
            <Link
              href="/products/videos"
              className="inline-flex items-center gap-2 px-5 py-3 sm:px-5 sm:py-3 md:px-6 md:py-3.5 lg:px-8 lg:py-4 text-white font-semibold rounded-lg transition-all duration-300 text-sm sm:text-sm md:text-base lg:text-base shadow-md hover:shadow-lg min-h-[44px] border-2 border-white"
              style={{ 
                background: 'linear-gradient(90deg, #5FAA3F, #2E7D32)',
                fontFamily: 'var(--font-poppins), Poppins, sans-serif'
              }}
            >
              <FiPlay className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <span>Watch Videos</span>
              <Icon name="arrow-right" className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" style={{ filter: 'brightness(0) invert(1)' }} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="relative w-full bg-white py-4 sm:py-5 md:py-8 lg:py-8 xl:py-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 2xl:px-16">
          <div className="max-w-4xl mx-auto">
            {/* Section Title */}
            <div className={`text-center mb-4 sm:mb-5 md:mb-6 lg:mb-8 animate-on-scroll ${faqVisible ? 'animate-textAppear animated' : ''}`}>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
                {t('products.frequentlyAskedQuestions')}
              </h2>
              <div className="flex justify-center mb-2 sm:mb-2.5">
                <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400"></div>
              </div>
            </div>

            {/* FAQ Items */}
            <div className="space-y-3 sm:space-y-4 md:space-y-5">
              {faqData.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white border-b border-gray-200 transition-all duration-300 overflow-hidden"
                  >
                    {/* Question Header - Clickable */}
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-3 sm:p-3.5 md:p-4 lg:p-4.5 text-left flex items-center justify-between gap-3 sm:gap-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <h3 className="text-xs sm:text-xs md:text-sm lg:text-base font-semibold flex-1" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                        {t(`faq.question${faq.id}`)}
                      </h3>
                      <div className="shrink-0">
                        {isOpen ? (
                          <FiMinus className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5" style={{ color: '#5FAA3F' }} />
                        ) : (
                          <FiPlus className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5" style={{ color: '#5FAA3F' }} />
                        )}
                      </div>
                    </button>
                    
                    {/* Answer - Collapsible */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-3 sm:px-3.5 md:px-4 lg:px-4.5 pb-3 sm:pb-3.5 md:pb-4 lg:pb-4.5">
                        <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                          {t(`faq.answer${faq.id}`)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Need Help Section */}
      <NeedHelp />
    </div>
  );
}

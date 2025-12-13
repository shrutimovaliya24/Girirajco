'use client';

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '../../components/Icon';
import NeedHelp from '../../components/NeedHelp';
import { gpbModels, type GPBModel } from '../gpb-models';
import { useTranslation } from '../../hooks/useTranslation';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useParams } from 'next/navigation';

// 3D Model Component for Products
function ProductModel({ modelPath }: { modelPath?: string }) {
  const gltf = modelPath ? useGLTF(modelPath, true) : null;
  const scene = gltf?.scene;
  const meshRef = useRef<THREE.Group>(null);

  React.useEffect(() => {
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

// Product 3D Viewer Component
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

export default function ProductDetailPage() {
  const params = useParams();
  const { t } = useTranslation();
  const productId = parseInt(params.id as string);
  const [selectedGPBModel, setSelectedGPBModel] = useState<string>('GPB-01');
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.1 });

  // Product Data
  const products = [
    {
      id: 1,
      name: String(t('products.product1Name')),
      modelPath: '/models/biomass-heater.glb',
      image: '/product/Wood Pellet Burner.png',
      overview: String(t('products.product1Overview')),
      specifications: [
        String(t('products.product1Spec1')),
        String(t('products.product1Spec2')),
        String(t('products.product1Spec3')),
        String(t('products.product1Spec4')),
        String(t('products.product1Spec5')),
      ],
      icon: 'zap',
    },
    {
      id: 2,
      name: String(t('products.product2Name')),
      modelPath: '/models/biomass-heater.glb',
      image: '/product/Wood Pellet Stove.png',
      overview: String(t('products.product2Overview')),
      specifications: [
        String(t('products.product2Spec1')),
        String(t('products.product2Spec2')),
        String(t('products.product2Spec3')),
        String(t('products.product2Spec4')),
      ],
      icon: 'thermometer',
    },
    {
      id: 3,
      name: String(t('products.product3Name')),
      modelPath: '/models/biomass-heater.glb',
      image: '/product/Batch Fryer.png',
      overview: String(t('products.product3Overview')),
      specifications: [
        String(t('products.product3Spec1')),
        String(t('products.product3Spec2')),
        String(t('products.product3Spec3')),
        String(t('products.product3Spec4')),
        String(t('products.product3Spec5')),
      ],
      icon: 'package',
    },
    {
      id: 4,
      name: String(t('products.product4Name')),
      modelPath: '/models/biomass-heater.glb',
      image: '/product/Hot Air Generator.png',
      overview: String(t('products.product4Overview')),
      specifications: [
        String(t('products.product4Spec1')),
        String(t('products.product4Spec2')),
        String(t('products.product4Spec3')),
        String(t('products.product4Spec4')),
        String(t('products.product4Spec5')),
        String(t('products.product4Spec6')),
      ],
      icon: 'wind',
    },
    {
      id: 5,
      name: String(t('products.product5Name')),
      modelPath: '/models/biomass-heater.glb',
      image: '/product/Aluminium Melting Furnace.png',
      overview: String(t('products.product5Overview')),
      specifications: [
        String(t('products.product5Spec1')),
        String(t('products.product5Spec2')),
        String(t('products.product5Spec3')),
        String(t('products.product5Spec4')),
        String(t('products.product5Spec5')),
      ],
      icon: 'flame',
    },
  ];

  const product = products.find((p) => p.id === productId);
  const selectedModelData: GPBModel = gpbModels.find((model: GPBModel) => model.id === selectedGPBModel) || gpbModels[0];

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products" className="text-[#5FAA3F] hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const isFirstProduct = product.id === 1;

  // Structured Data for Product
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.overview,
    "image": `https://girirajco.com${product.image}`,
    "brand": {
      "@type": "Brand",
      "name": "Giriraj Industries"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Giriraj Industries"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": `https://girirajco.com/products/${productId}`
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full bg-white py-4 sm:py-5 md:py-8 lg:py-8 xl:py-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 2xl:px-16">
          <div className="text-center mb-1 sm:mb-1.5 md:mb-2">
            <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3 animate-on-scroll ${heroVisible ? 'animate-textAppear animated' : ''}`} style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
              {product.name}
            </h1>
            <div className="flex justify-center mb-2 sm:mb-2.5">
              <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="relative w-full bg-white py-4 sm:py-5 md:py-6 lg:py-8 xl:py-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 2xl:px-16">
          {isFirstProduct ? (
            // Special layout for first product (Wood Pellet Burner) with model selector
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16">
              {/* Left Column: Model Selector + Image */}
              <div>
                {/* Model Selector Header */}
                <div className="pt-2 sm:pt-3 md:pt-4 mb-2 sm:mb-3 md:mb-4">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-center mb-1 sm:mb-1.5" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                    {String(t('products.selectModel'))}
                  </h3>
                  <p className="text-xs sm:text-xs md:text-xs text-gray-500 text-center">{String(t('products.chooseModel'))}</p>
                </div>
                
                {/* Model Selector - Grid Layout */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                  {gpbModels.map((model: GPBModel) => {
                    const isSelected = model.id === selectedGPBModel;
                    return (
                      <button
                        key={model.id}
                        onClick={() => setSelectedGPBModel(model.id)}
                        className={`relative px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 rounded-lg font-semibold text-xs sm:text-xs md:text-sm transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#5FAA3F] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                      >
                        {model.id}
                      </button>
                    );
                  })}
                </div>

                {/* Model Image/3D */}
                <div className="w-full group max-w-xs mx-auto">
                  {selectedModelData.image ? (
                    <div className="w-full overflow-hidden relative bg-gray-50 p-4 sm:p-5 md:p-6 rounded-lg">
                      <div className="aspect-square relative rounded-lg overflow-hidden">
                        <Image
                          src={selectedModelData.image}
                          alt={selectedModelData.id}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          priority
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  ) : (
                    <Product3DViewer modelPath={selectedModelData.modelPath || product.modelPath || '/models/biomass-heater.glb'} />
                  )}
                </div>
              </div>

              {/* Right Column: Product Details */}
              <div>
                {/* Product Overview */}
                <div className="mb-4 sm:mb-5 md:mb-6">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-2 sm:mb-2.5 md:mb-3" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                    {String(t('products.productOverview'))}
                  </h3>
                  <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                    {product.overview}
                  </p>
                </div>

                {/* Specifications */}
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-2 sm:mb-2.5 md:mb-3" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                    {String(t('products.specifications'))}
                  </h3>
                  <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-4">
                    <li className="flex items-start gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
                      <div className="mt-1 sm:mt-1.5 md:mt-2 shrink-0">
                        <div className="w-1.5 sm:w-2 md:w-2.5 lg:w-3 h-1.5 sm:h-2 md:h-2.5 lg:h-3 rounded-full bg-[#5FAA3F] animate-pulse"></div>
                      </div>
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                        {String(t('products.maxHeatCapacity'))} {selectedModelData.maxHeatCapacity} kcal/hour
                      </p>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
                      <div className="mt-1 sm:mt-1.5 md:mt-2 shrink-0">
                        <div className="w-1.5 sm:w-2 md:w-2.5 lg:w-3 h-1.5 sm:h-2 md:h-2.5 lg:h-3 rounded-full bg-[#5FAA3F]"></div>
                      </div>
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                        {String(t('products.maxFuelConsumption'))} {selectedModelData.maxFuelConsumption} kg/hour
                      </p>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
                      <div className="mt-1 sm:mt-1.5 md:mt-2 shrink-0">
                        <div className="w-1.5 sm:w-2 md:w-2.5 lg:w-3 h-1.5 sm:h-2 md:h-2.5 lg:h-3 rounded-full bg-[#5FAA3F]"></div>
                      </div>
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                        {String(t('products.electricityConsumption'))} {selectedModelData.electricityConsumption} HP
                      </p>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
                      <div className="mt-1 sm:mt-1.5 md:mt-2 shrink-0">
                        <div className="w-1.5 sm:w-2 md:w-2.5 lg:w-3 h-1.5 sm:h-2 md:h-2.5 lg:h-3 rounded-full bg-[#5FAA3F]"></div>
                      </div>
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                        {String(t('products.autoControlPanel'))} {selectedModelData.autoControlPanel}
                      </p>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
                      <div className="mt-1 sm:mt-1.5 md:mt-2 shrink-0">
                        <div className="w-1.5 sm:w-2 md:w-2.5 lg:w-3 h-1.5 sm:h-2 md:h-2.5 lg:h-3 rounded-full bg-[#5FAA3F]"></div>
                      </div>
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                        {String(t('products.autoAshRemoval'))} {selectedModelData.autoAshRemoval}
                      </p>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
                      <div className="mt-1 sm:mt-1.5 md:mt-2 shrink-0">
                        <div className="w-1.5 sm:w-2 md:w-2.5 lg:w-3 h-1.5 sm:h-2 md:h-2.5 lg:h-3 rounded-full bg-[#5FAA3F]"></div>
                      </div>
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                        {String(t('products.autoIgnition'))} {selectedModelData.autoIgnition}
                      </p>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
                      <div className="mt-1 sm:mt-1.5 md:mt-2 shrink-0">
                        <div className="w-1.5 sm:w-2 md:w-2.5 lg:w-3 h-1.5 sm:h-2 md:h-2.5 lg:h-3 rounded-full bg-[#5FAA3F]"></div>
                      </div>
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                        {String(t('products.secondaryFuelFeeder'))} {selectedModelData.secondaryFuelFeeder}
                      </p>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
                      <div className="mt-1 sm:mt-1.5 md:mt-2 shrink-0">
                        <div className="w-1.5 sm:w-2 md:w-2.5 lg:w-3 h-1.5 sm:h-2 md:h-2.5 lg:h-3 rounded-full bg-[#5FAA3F]"></div>
                      </div>
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                        {String(t('products.ssCombustionChamber'))} {selectedModelData.ssCombustionChamber}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            // Regular layout for other products
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
              {/* Image/3D Model */}
              <div>
                <div className="w-full group max-w-xs mx-auto">
                  {product.image ? (
                    <div className="w-full overflow-hidden relative bg-gray-50 p-4 sm:p-5 md:p-6 rounded-lg">
                      <div className="aspect-square relative rounded-lg overflow-hidden">
                        <Image
                          src={product.image}
                          alt={`${product.name} - Product Image`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          priority
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  ) : (
                    <Product3DViewer modelPath={product.modelPath} />
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                {/* Product Overview */}
                <div className="mb-5 sm:mb-6 md:mb-7">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-2 sm:mb-2.5 md:mb-3" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                    {String(t('products.productOverview'))}
                  </h3>
                  <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                    {product.overview}
                  </p>
                </div>

                {/* Specifications */}
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-2 sm:mb-2.5 md:mb-3" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                    {String(t('products.specifications'))}
                  </h3>
                  <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                    {product.specifications.map((spec, specIndex) => (
                      <li key={specIndex} className="flex items-start gap-2 sm:gap-3 md:gap-4">
                        <div className="mt-1.5 sm:mt-2 shrink-0">
                          <div className="w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 rounded-full bg-[#5FAA3F]"></div>
                        </div>
                        <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                          {spec}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products Section */}
      <section className="relative w-full bg-gradient-to-b from-gray-50 to-white py-8 sm:py-10 md:py-12 lg:py-16" aria-label="Related Products">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 2xl:px-16">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
              Related Products
            </h2>
            <div className="flex justify-center mb-2 sm:mb-2.5">
              <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-0.5 sm:h-1 bg-yellow-400"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
            {products
              .filter((p) => p.id !== productId)
              .slice(0, 4)
              .map((relatedProduct) => (
                <article
                  key={relatedProduct.id}
                  className="group bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1"
                  itemScope
                  itemType="https://schema.org/Product"
                >
                  <Link
                    href={`/products/${relatedProduct.id}`}
                    className="flex flex-col flex-grow"
                    aria-label={`View details for ${relatedProduct.name}`}
                  >
                    {/* Product Image */}
                    <div className="w-full overflow-hidden relative bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-5 md:p-6">
                      <div className="aspect-square relative rounded-lg overflow-hidden shadow-inner">
                        <Image
                          src={relatedProduct.image}
                          alt={`${relatedProduct.name} - Product Image`}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          itemProp="image"
                        />
                      </div>
                    </div>
                    
                    {/* Product Content */}
                    <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow bg-white">
                      {/* Product Title */}
                      <h3 
                        className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-5 text-gray-900 group-hover:text-[#5FAA3F] transition-colors duration-300 text-center min-h-[3rem] flex items-center justify-center" 
                        style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                        itemProp="name"
                      >
                        {relatedProduct.name}
                      </h3>
                      
                      {/* View Details Button */}
                      <div className="flex items-center justify-center gap-2 mt-auto pt-2">
                        <span className="text-sm sm:text-base font-semibold text-[#5FAA3F] group-hover:text-[#2E7D32] transition-colors duration-300" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                          View Details
                        </span>
                        <Icon name="arrow-right" className="w-4 h-4 sm:w-5 sm:h-5 text-[#5FAA3F] group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* Back to Products Link */}
      <section className="relative w-full bg-white py-4 sm:py-5 md:py-8">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 2xl:px-16">
          <Link 
            href="/products"
            className="inline-flex items-center gap-2 text-[#5FAA3F] hover:text-[#2E7D32] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            <Icon name="arrow-left" className="w-5 h-5" />
            <span className="font-semibold">Back to Products</span>
          </Link>
        </div>
      </section>

      {/* Need Help Section */}
      <NeedHelp />
    </div>
  );
}


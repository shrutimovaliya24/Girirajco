'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '../../components/Icon';
import { productVideos, productOrder } from '../../../data/productVideos';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { FiPlay } from 'react-icons/fi';

export default function ProductVideosPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full bg-white py-4 sm:py-5 md:py-6 lg:py-6">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 2xl:px-16">
          <div className="text-center">
            <Link 
              href="/products"
              className="inline-flex items-center gap-2 text-[#5FAA3F] hover:text-[#2E7D32] transition-colors duration-300 mb-4 sm:mb-5 text-sm sm:text-base"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              <Icon name="arrow-left" className="w-5 h-5" />
              <span className="font-semibold">Back to Products</span>
            </Link>
            
            <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3 animate-on-scroll ${heroVisible ? 'animate-textAppear animated' : ''}`} style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
              Product Videos
            </h1>
            <div className="flex justify-center mb-2 sm:mb-2.5">
              <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative w-full bg-white pt-0 pb-8 sm:pb-10 md:py-8 lg:py-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 sm:gap-6">
            {productOrder.map((productName) => {
              const productData = productVideos[productName];
              const hasVideos = productData && (productData.videos || productData.categories);
              
              if (!hasVideos) return null;
              
              // Create URL-friendly slug
              const productSlug = productName.toLowerCase().replace(/\s+/g, '-');
              
              return (
                <Link
                  key={productName}
                  href={`/products/videos/${productSlug}`}
                  className="group relative p-4 sm:p-5 rounded-lg border border-gray-200 bg-white hover:border-[#5FAA3F] hover:shadow-md transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 transition-colors duration-300 bg-gray-100 text-[#5FAA3F] group-hover:bg-[#5FAA3F] group-hover:text-white">
                      <FiPlay className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-[#5FAA3F]" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                      {productName}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}


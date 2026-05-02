'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { getProductSlugById } from '../../lib/product-slugs';

export default function HomeProducts() {
  const { t } = useTranslation();
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.15 });
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.15 });

  const products = [
    { id: 1, nameKey: 'products.product1Name' as const, image: '/product/Wood Pellet Burner.png' },
    { id: 2, nameKey: 'products.product2Name' as const, image: '/product/Wood Pellet Stove.png' },
    { id: 3, nameKey: 'products.product3Name' as const, image: '/product/Batch Fryer.png' },
    { id: 4, nameKey: 'products.product4Name' as const, image: '/product/Hot Air Generator.png' },
    { id: 5, nameKey: 'products.product5Name' as const, image: '/product/Aluminium Melting Furnace.png' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-white to-gray-50 py-4 sm:py-5 md:py-8 lg:py-8 xl:py-10"
      aria-labelledby="home-products-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 2xl:px-16">
        <div
          ref={titleRef}
          className={`text-center mb-6 sm:mb-7 md:mb-10 lg:mb-10 animate-on-scroll ${titleVisible ? 'animate-textAppear animated' : ''}`}
        >
          <h2
            id="home-products-heading"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3"
            style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}
          >
            {String(t('products.title'))}
          </h2>
          <div className="flex justify-center mb-2 sm:mb-2.5 md:mb-3">
            <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400" />
          </div>
          <p
            className={`text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed animate-on-scroll ${titleVisible ? 'animate-textAppear animated stagger-1' : ''}`}
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
          >
            {String(t('products.description'))}
          </p>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-7 md:gap-8 lg:gap-8 xl:gap-6 animate-on-scroll ${sectionVisible ? 'animate-textAppear animated stagger-2' : ''}`}
        >
          {products.map((product) => {
            const slug = getProductSlugById(product.id);
            if (!slug) return null;
            return (
            <article
              key={product.id}
              className="group bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1"
            >
              <Link
                href={`/products/${slug}`}
                className="flex flex-col flex-grow"
                aria-label={`${String(t(product.nameKey))} — ${String(t('products.viewDetails'))}`}
              >
                <div className="w-full overflow-hidden relative bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-5 md:p-6">
                  <div className="aspect-square relative rounded-lg overflow-hidden shadow-inner">
                    <Image
                      src={product.image}
                      alt={String(t(product.nameKey))}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                      priority={product.id <= 2}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw, 20vw"
                    />
                  </div>
                </div>
                <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow bg-white">
                  <h3
                    className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-5 text-gray-900 group-hover:text-[#5FAA3F] transition-colors duration-300 text-center min-h-[3rem] flex items-center justify-center"
                    style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {String(t(product.nameKey))}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mt-auto pt-2">
                    <span
                      className="text-sm sm:text-base font-semibold text-[#5FAA3F] group-hover:text-[#2E7D32] transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    >
                      {String(t('products.viewDetails'))}
                    </span>
                    <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#5FAA3F] group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </article>
          );
          })}
        </div>

        <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-lg font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base min-h-[44px]"
            style={{
              background: 'linear-gradient(90deg, #5FAA3F, #2E7D32)',
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
            }}
          >
            {String(t('products.viewAllProducts'))}
            <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

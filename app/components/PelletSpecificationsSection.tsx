'use client';

import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const WHATSAPP_INQUIRY_NUMBER = '919825213536';
const pelletInquiryWaText = encodeURIComponent(
  'Hello Giriraj Industries, I would like an inquiry regarding biomass wood pellets (pricing / quantity / delivery).'
);

export default function PelletSpecificationsSection() {
  const { t } = useTranslation();
  const { ref: pelletSpecRef, isVisible: pelletSpecVisible } = useScrollAnimation({ threshold: 0.2 });
  const waPelletHref = `https://wa.me/${WHATSAPP_INQUIRY_NUMBER}?text=${pelletInquiryWaText}`;

  return (
    <section
      ref={pelletSpecRef}
      className="relative w-full bg-gradient-to-b from-[#f4faf2] via-white to-white py-4 sm:py-5 md:py-8 lg:py-8 xl:py-10"
      aria-labelledby="pellet-specifications-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-4 sm:mb-5 md:mb-6 lg:mb-8 animate-on-scroll ${pelletSpecVisible ? 'animate-textAppear animated' : ''}`}>
            <h2
              id="pellet-specifications-heading"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3"
              style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}
            >
              {String(t('aboutUs.pelletSpecificationsTitle'))}
            </h2>
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-16 sm:w-20 md:w-24 h-1 bg-yellow-400"></div>
            </div>
            <p
              className="text-xs sm:text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed px-1"
              style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            >
              {String(t('aboutUs.pelletSpecificationsSubtitle'))}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 items-stretch">
            <div
              className={`animate-on-scroll h-full min-h-0 flex flex-col ${pelletSpecVisible ? 'animate-slideInFromLeft animated' : ''}`}
            >
              <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm w-full aspect-[4/3] max-h-[420px] mx-auto lg:mx-0 lg:max-h-none lg:flex-1 lg:min-h-[300px] lg:aspect-auto">
                <Image
                  src="/Pine wood pellets.png"
                  alt="Pine Wood Pellets"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.placeholder')) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'placeholder w-full h-full bg-green-100 flex items-center justify-center';
                      placeholder.innerHTML = '<p class="text-gray-500 text-sm">Pine Wood Pellets Image</p>';
                      parent.appendChild(placeholder);
                    }
                  }}
                />
              </div>
            </div>

            <div className={`animate-on-scroll h-full min-h-0 flex flex-col ${pelletSpecVisible ? 'animate-slideInFromRight animated' : ''}`}>
              <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-sm w-full h-full flex flex-col transition-all duration-300 hover:-translate-y-1" onMouseEnter={(e) => e.currentTarget.style.borderColor = '#5FAA3F'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}>
                <div className="space-y-3 sm:space-y-4 grow">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <div key={n} className="flex items-start gap-3 sm:gap-4">
                      <Icon name="check-circle" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5" style={{ color: '#5FAA3F' }} />
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                        {String(t(`aboutUs.pelletSpec${n}` as const))}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-200 space-y-3 sm:space-y-4">
                  <p
                    className="text-[11px] sm:text-xs text-gray-500 text-center sm:text-left flex items-start sm:items-center justify-center sm:justify-start gap-2"
                    style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                  >
                    <Icon name="check-circle" className="w-4 h-4 shrink-0 opacity-90" style={{ color: '#5FAA3F' }} aria-hidden />
                    <span>{String(t('aboutUs.pelletInquiryHint'))}</span>
                  </p>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-center">
                    <Link
                      href="/contact-us"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 md:px-8 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base transform hover:scale-[1.02] min-h-[48px] order-1"
                      style={{
                        background: 'linear-gradient(90deg, #5FAA3F, #2E7D32)',
                        fontFamily: 'var(--font-poppins), Poppins, sans-serif'
                      }}
                    >
                      {String(t('aboutUs.getPelletInquiry'))}
                      <Icon name="arrow-right" className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" style={{ filter: 'brightness(0) invert(1)' }} aria-hidden />
                    </Link>
                    <Link
                      href={waPelletHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-lg border-2 font-semibold transition-all duration-300 text-sm sm:text-base min-h-[48px] hover:bg-green-50 order-2"
                      style={{
                        borderColor: '#5FAA3F',
                        color: '#2E7D32',
                        fontFamily: 'var(--font-poppins), Poppins, sans-serif'
                      }}
                    >
                      <Icon name="whatsapp" className="w-5 h-5 shrink-0" style={{ color: '#25D366' }} aria-hidden />
                      {String(t('aboutUs.pelletInquiryWhatsApp'))}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

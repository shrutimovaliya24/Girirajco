'use client';

import Link from 'next/link';
import Image from 'next/image';
import Icon from './Icon';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function AboutUs() {
  const { t } = useTranslation();
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: buttonRef, isVisible: buttonVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={sectionRef} className="relative w-full bg-white py-4 sm:py-5 md:py-8 lg:py-8 xl:py-10">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 2xl:px-16">
        {/* Section Title */}
        <div ref={titleRef} className={`text-center mb-4 sm:mb-5 md:mb-8 lg:mb-8 animate-on-scroll ${titleVisible ? 'animate-textAppear animated' : ''}`}>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
            {String(t('aboutUs.title'))}
          </h2>
          <div className="flex justify-center mb-2 sm:mb-2.5 md:mb-3">
            <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400"></div>
          </div>
          <p className={`text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed animate-on-scroll ${titleVisible ? 'animate-textAppear animated' : ''}`} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            {String(t('aboutUs.description'))}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 items-center">
          {/* Left Column - Image */}
          <div ref={imageRef} className={`order-2 lg:order-1 animate-on-scroll ${imageVisible ? 'animate-textAppear animated' : ''}`}>
            <div className="relative rounded-lg overflow-hidden">
              <div className="aspect-[4/3] relative group">
                <Image
                  src="/about-home.png"
                  alt="Biomass wood pellets and logs"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{
                    filter: 'brightness(1.05) contrast(1.1) saturate(1.2) sepia(0.1) hue-rotate(-5deg)',
                  }}
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Column - Text and Button */}
          <div ref={textRef} className={`order-1 lg:order-2 animate-on-scroll ${textVisible ? 'animate-textAppear animated' : ''}`}>
            <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
              <p className={`text-xs sm:text-sm md:text-sm lg:text-base xl:text-base text-gray-800 leading-relaxed animate-on-scroll ${textVisible ? 'animate-textAppear animated' : ''}`} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                <span className="font-semibold text-gray-900">Giriraj</span> {String(t('aboutUs.content'))}
              </p>
              
              {/* View More Button - Orange Gradient (Secondary) */}
              <div ref={buttonRef} className={`pt-2 sm:pt-3 md:pt-4 animate-on-scroll ${buttonVisible ? 'animate-textAppear animated' : ''}`}>
                <Link href="/about-us">
                  <button 
                    className="flex items-center justify-center gap-2 px-5 py-3 sm:px-5 sm:py-3 md:px-6 md:py-3.5 lg:px-8 lg:py-4 text-white font-semibold rounded-lg transition-all duration-300 text-sm sm:text-sm md:text-base lg:text-base shadow-md hover:shadow-lg min-h-[44px]"
                    style={{ 
                      background: 'linear-gradient(90deg, #FF7A00, #FFC837)',
                      fontFamily: 'var(--font-poppins), Poppins, sans-serif'
                    }}
                  >
                    <span>{String(t('aboutUs.viewMore'))}</span>
                    <Icon name="arrow-right" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" style={{ filter: 'brightness(0) invert(1)' }} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


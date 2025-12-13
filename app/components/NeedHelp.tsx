'use client';

import Link from 'next/link';
import Icon from './Icon';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function NeedHelp() {
  const { t } = useTranslation();
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: buttonRef, isVisible: buttonVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={sectionRef} className="relative w-full py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 overflow-hidden" style={{ backgroundColor: '#F5F5F5' }}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: '#5FAA3F' }}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: '#FFC837' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 2xl:px-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 ref={titleRef} className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3 animate-on-scroll ${titleVisible ? 'animate-textAppear animated' : ''}`} style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
            {t('needHelp.title')}
          </h2>
          <div className="flex justify-center mb-2 sm:mb-2.5">
            <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400"></div>
          </div>
          <p className={`text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg text-gray-700 mb-8 sm:mb-10 md:mb-12 lg:mb-14 leading-relaxed animate-on-scroll ${titleVisible ? 'animate-textAppear animated' : ''}`} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            {t('needHelp.description')}
          </p>
          <div ref={buttonRef} className={`animate-on-scroll ${buttonVisible ? 'animate-textAppear animated' : ''}`}>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 px-5 py-3 sm:px-5 sm:py-3 md:px-6 md:py-3.5 lg:px-8 lg:py-4 text-white font-semibold rounded-lg transition-all duration-300 text-sm sm:text-sm md:text-base lg:text-base shadow-md hover:shadow-lg min-h-[44px]"
            style={{ 
              background: 'linear-gradient(90deg, #5FAA3F, #2E7D32)',
              fontFamily: 'var(--font-poppins), Poppins, sans-serif'
            }}
          >
              {t('needHelp.contactUs')}
            <Icon name="arrow-right" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ filter: 'brightness(0) invert(1)' }} />
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


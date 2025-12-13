'use client';

import { useRef, useEffect, useState } from 'react';
import Icon from './Icon';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function WhyChooseUs() {
  const { t } = useTranslation();
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);
  const [featuresVisible, setFeaturesVisible] = useState<boolean[]>([]);

  const features = [
    String(t('whyChooseUs.feature1')),
    String(t('whyChooseUs.feature2')),
    String(t('whyChooseUs.feature3')),
    String(t('whyChooseUs.feature4')),
    String(t('whyChooseUs.feature5')),
    String(t('whyChooseUs.feature6')),
    String(t('whyChooseUs.feature7')),
  ];

  useEffect(() => {
    if (!sectionVisible) return;

    // Group boxes by rows (2 boxes per row)
    const boxesPerRow = 2;
    const totalRows = Math.ceil(features.length / boxesPerRow);

    // Animate rows sequentially - all boxes in a row appear together
    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
      setTimeout(() => {
        // Animate all boxes in this row at the same time
        for (let colIndex = 0; colIndex < boxesPerRow; colIndex++) {
          const boxIndex = rowIndex * boxesPerRow + colIndex;
          if (boxIndex < features.length) {
            setFeaturesVisible((prev) => {
              const newState = [...prev];
              newState[boxIndex] = true;
              return newState;
            });
          }
        }
      }, rowIndex * 200); // 200ms delay between rows
    }
  }, [sectionVisible, features.length]);

  return (
    <section ref={sectionRef} className="relative w-full py-4 sm:py-5 md:py-8 lg:py-6" style={{ backgroundColor: '#1A1A1A' }}>
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 2xl:px-16">
        {/* Section Title */}
        <div ref={titleRef} className={`text-center mb-4 sm:mb-5 md:mb-8 lg:mb-4 animate-on-scroll ${titleVisible ? 'animate-textAppear animated' : ''}`}>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3" style={{ color: '#FFFFFF', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
            {String(t('whyChooseUs.title'))}
          </h2>
          <div className="flex justify-center mb-2 sm:mb-2.5 md:mb-3">
            <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400"></div>
          </div>
          <p className={`text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed animate-on-scroll ${titleVisible ? 'animate-textAppear animated' : ''}`} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            {String(t('whyChooseUs.description'))}
          </p>
        </div>

        {/* Features List */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-2.5 md:gap-3 lg:gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={(el) => {
                  featuresRef.current[index] = el;
                }}
                className={`flex items-start gap-3 sm:gap-2.5 md:gap-3 p-3 sm:p-2.5 md:p-3 lg:p-3.5 rounded-lg border transition-all duration-300 hover:-translate-y-1 animate-on-scroll ${featuresVisible[index] ? `animate-slideInFromLeft animated stagger-${Math.floor(index / 2) + 1}` : ''}`}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(95, 170, 63, 0.3)' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#5FAA3F'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(95, 170, 63, 0.3)'}
              >
                <Icon name="check-circle" className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 shrink-0 mt-0.5 sm:mt-1" style={{ color: '#5FAA3F' }} />
                <p className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-base leading-relaxed" style={{ color: '#E5E5E5', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


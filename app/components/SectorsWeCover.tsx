'use client';

import { useRef, useEffect, useState } from 'react';
import Icon from './Icon';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function SectorsWeCover() {
  const { t } = useTranslation();
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });
  const sectorsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [sectorsVisible, setSectorsVisible] = useState<boolean[]>([]);

  const sectors = [
    {
      id: 1,
      name: t('sectorsWeCover.foodProcessing'),
      icon: 'utensils',
      color: '#d97706', // Orange-brown for food
    },
    {
      id: 2,
      name: t('sectorsWeCover.textile'),
      icon: 'tshirt',
      color: '#22c55e', // Green for textile
    },
    {
      id: 3,
      name: t('sectorsWeCover.packagingPrinting'),
      icon: 'box',
      color: '#d97706', // Orange-brown for packaging
    },
    {
      id: 4,
      name: t('sectorsWeCover.pharmaceuticals'),
      icon: 'pills',
      color: '#f97316', // Orange for pharmaceuticals
    },
    {
      id: 5,
      name: t('sectorsWeCover.chemical'),
      icon: 'flask',
      color: '#3b82f6', // Blue for chemical
    },
    {
      id: 6,
      name: t('sectorsWeCover.foundryMetallurgical'),
      icon: 'fire',
      color: '#f97316', // Orange for foundry
    },
    {
      id: 7,
      name: t('sectorsWeCover.dairyMilkProcessing'),
      icon: 'milk-carton',
      color: '#3b82f6', // Blue for dairy
    },
  ];

  useEffect(() => {
    if (!sectionVisible) return;

    // Group boxes by rows based on grid columns
    // Mobile: 2 cols, Tablet: 3 cols, Desktop: 4 cols
    const getColsPerRow = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth >= 1024) return 4; // lg: 4 cols
        if (window.innerWidth >= 640) return 3;  // sm: 3 cols
        return 2; // mobile: 2 cols
      }
      return 4; // default
    };

    const colsPerRow = getColsPerRow();
    const totalRows = Math.ceil(sectors.length / colsPerRow);

    // Animate rows sequentially - all boxes in a row appear together
    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
      setTimeout(() => {
        // Animate all boxes in this row at the same time
        for (let colIndex = 0; colIndex < colsPerRow; colIndex++) {
          const boxIndex = rowIndex * colsPerRow + colIndex;
          if (boxIndex < sectors.length) {
            setSectorsVisible((prev) => {
              const newState = [...prev];
              newState[boxIndex] = true;
              return newState;
            });
          }
        }
      }, rowIndex * 200); // 200ms delay between rows
    }
  }, [sectionVisible, sectors.length]);

  return (
    <section ref={sectionRef} className="relative w-full py-4 sm:py-5 md:py-8 lg:py-8 xl:py-10 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 2xl:px-16">
        {/* Section Title */}
        <div ref={titleRef} className={`text-center mb-4 sm:mb-5 md:mb-8 lg:mb-8 animate-on-scroll ${titleVisible ? 'animate-textAppear animated' : ''}`}>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
            {t('sectorsWeCover.title')}
          </h2>
          <div className="flex justify-center mb-2 sm:mb-2.5 md:mb-3">
            <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400"></div>
          </div>
          <p className={`text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed animate-on-scroll ${titleVisible ? 'animate-textAppear animated' : ''}`} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            {t('sectorsWeCover.description')}
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 max-w-6xl mx-auto">
          {sectors.map((sector, index) => {
            return (
              <div
                key={sector.id}
                ref={(el) => {
                  sectorsRef.current[index] = el;
                }}
                className={`bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col items-center justify-center text-center shadow-sm border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg min-h-[100px] sm:min-h-0 animate-on-scroll ${sectorsVisible[index] ? `animate-slideInFromLeft animated stagger-${Math.floor(index / 4) + 1}` : ''}`}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#5FAA3F'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
              >
                {/* Icon */}
                <div 
                  className="mb-2 sm:mb-3 md:mb-4 flex items-center justify-center transition-colors duration-300"
                  style={{ 
                    color: '#5FAA3F',
                  }}
                >
                  <Icon name={sector.icon} className="w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16" style={{ color: '#5FAA3F' }} />
                </div>
                
                {/* Sector Name */}
                <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-base font-semibold uppercase tracking-wide leading-snug break-words px-1" style={{ color: '#1A1A1A', fontFamily: 'var(--font-poppins), Poppins, sans-serif', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  {sector.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

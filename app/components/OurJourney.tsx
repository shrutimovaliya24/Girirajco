'use client';

import { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface JourneyItem {
  year: string;
  title: string;
  description: string;
}

export default function OurJourney() {
  const { t } = useTranslation();
  const journeyData: JourneyItem[] = [
    {
      year: '2017',
      title: t('ourJourney.journey1Title'),
      description: t('ourJourney.journey1Desc'),
    },
    {
      year: '2018',
      title: t('ourJourney.journey2Title'),
      description: t('ourJourney.journey2Desc'),
    },
    {
      year: '2019',
      title: t('ourJourney.journey3Title'),
      description: t('ourJourney.journey3Desc'),
    },
    {
      year: '2020',
      title: t('ourJourney.journey4Title'),
      description: t('ourJourney.journey4Desc'),
    },
    {
      year: '2022',
      title: t('ourJourney.journey5Title'),
      description: t('ourJourney.journey5Desc'),
    },
    {
      year: '2023',
      title: t('ourJourney.journey6Title'),
      description: t('ourJourney.journey6Desc'),
    },
    {
      year: '2024',
      title: t('ourJourney.journey7Title'),
      description: t('ourJourney.journey7Desc'),
    },
    {
      year: '2025',
      title: t('ourJourney.journey8Title'),
      description: t('ourJourney.journey8Desc'),
    },
  ];

// Journey Item Component
function JourneyItemComponent({ item, index, isInView }: { item: JourneyItem; index: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  // Alternate left/right for desktop centered timeline
  const isEven = index % 2 === 0;

  return (
    <div
      className={`relative mb-4 md:mb-6 transition-all duration-1000 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex flex-col md:flex-row gap-3 md:gap-4 items-center ${
        isEven ? 'md:flex-row-reverse' : ''
      }`}>
        {/* Year Badge - Modern Design */}
        <div className="flex-shrink-0 w-full md:w-28">
          <div className="relative flex justify-center">
            <div className="relative z-10">
              {/* Year Badge with gradient */}
              <div
                className={`relative bg-gradient-to-br from-[#22c55e] via-[#16a34a] to-[#15803d] text-white px-4 py-3 rounded-xl font-bold text-sm md:text-base shadow-xl transition-all duration-300 overflow-hidden ${
                  isHovered ? 'scale-110 shadow-2xl ring-4 ring-[#22c55e]/20' : ''
                }`}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"></div>
                <span className="relative z-10">{item.year}</span>
              </div>
              {/* Connecting Line to center timeline */}
              <div className="hidden md:block absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-10 bg-gradient-to-b from-[#22c55e] via-[#eab308] to-transparent"></div>
              {/* Dot at the end of connecting line */}
              <div className="hidden md:block absolute top-full left-1/2 transform -translate-x-1/2 translate-y-10 w-4 h-4 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-full border-3 border-white shadow-xl ring-2 ring-[#22c55e]/30"></div>
            </div>
          </div>
        </div>

        {/* Content Card - Modern Card Design */}
        <div className="flex-1 relative group md:max-w-md">
          <div
            className={`relative bg-white rounded-2xl p-3 md:p-4 border transition-all duration-300 shadow-lg overflow-hidden ${
              isHovered
                ? 'border-[#22c55e] shadow-2xl transform -translate-y-2 scale-[1.02]'
                : 'border-gray-100'
            }`}
          >
            {/* Gradient Background on Hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-[#22c55e]/5 via-transparent to-[#eab308]/5 transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            ></div>
            
            {/* Animated Accent Line */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#22c55e] via-[#eab308] to-[#22c55e] transition-all duration-500 ease-out ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            ></div>
            
            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold mb-2 sm:mb-3 transition-colors duration-300" style={{ color: '#1A1A1A', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }} onMouseEnter={(e) => e.currentTarget.style.color = '#5FAA3F'} onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}>
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-base text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                {item.description}
              </p>
            </div>

            {/* Decorative Corner */}
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#22c55e]/10 to-transparent rounded-bl-full transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <section
      ref={ref}
      className="relative w-full py-4 sm:py-5 md:py-8 lg:py-6 overflow-hidden"
      style={{ backgroundColor: '#F5F5F5' }}
    >
      {/* Modern Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(95, 170, 63, 0.05)' }}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(255, 200, 55, 0.05)' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: 'linear-gradient(to right, rgba(95, 170, 63, 0.03), rgba(255, 200, 55, 0.03))' }}></div>
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(to right, #5FAA3F 1px, transparent 1px), linear-gradient(to bottom, #5FAA3F 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10 relative z-10">
        {/* Section Title - Modern Design */}
        <div className="text-center mb-2 sm:mb-2.5 md:mb-3 lg:mb-4">
          
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
            {t('ourJourney.title')}
          </h2>
          <div className="flex justify-center mb-2 sm:mb-2.5">
            <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400"></div>
          </div>
          <p className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            {t('ourJourney.description')}
          </p>
        </div>

        {/* Journey Timeline - Modern Centered Design */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Vertical Timeline Line - Enhanced */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#22c55e] via-[#eab308] via-[#22c55e] to-[#eab308] transform -translate-x-1/2 rounded-full shadow-lg"></div>
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-white/50 to-transparent transform -translate-x-1/2"></div>

            {/* Journey Items */}
            <div className="space-y-0">
              {journeyData.map((item, index) => (
                <div key={index} className="relative">
                  <JourneyItemComponent item={item} index={index} isInView={inView} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


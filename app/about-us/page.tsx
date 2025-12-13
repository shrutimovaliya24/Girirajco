'use client';

import Image from 'next/image';
import Link from 'next/link';
import Icon from '../components/Icon';
import OurJourney from '../components/OurJourney';
import NeedHelp from '../components/NeedHelp';
import { useTranslation } from '../hooks/useTranslation';
import { useRef, useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function AboutUsPage() {
  const { t } = useTranslation();
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: aboutDescRef, isVisible: aboutDescVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: whyBiomassRef, isVisible: whyBiomassVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: pelletSpecRef, isVisible: pelletSpecVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: comparisonRef, isVisible: comparisonVisible } = useScrollAnimation({ threshold: 0.2 });
  
  const missionCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [missionCardsVisible, setMissionCardsVisible] = useState<boolean[]>([]);
  const whyBiomassPointsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [whyBiomassPointsVisible, setWhyBiomassPointsVisible] = useState<boolean[]>([]);
  const tableRowsRef = useRef<(HTMLTableRowElement | null)[]>([]);
  const [tableRowsVisible, setTableRowsVisible] = useState<boolean[]>([]);

  const whyBiomassPoints = [
    String(t('aboutUs.whyBiomassPoint1')),
    String(t('aboutUs.whyBiomassPoint2')),
    String(t('aboutUs.whyBiomassPoint3')),
    String(t('aboutUs.whyBiomassPoint4')),
    String(t('aboutUs.whyBiomassPoint5')),
    String(t('aboutUs.whyBiomassPoint6')),
    String(t('aboutUs.whyBiomassPoint7')),
  ];

  const comparisonData = [
    {
      parameter: String(t('aboutUs.calorificValueTable')),
      pellet: '4200',
      lpg: '12000',
      diesel: '11000',
      ldo: '10200',
    },
    {
      parameter: String(t('aboutUs.equivalentPelletConsumption')),
      pellet: '1',
      lpg: '2.86',
      diesel: '2.62',
      ldo: '2.42',
    },
    {
      parameter: String(t('aboutUs.rate')),
      pellet: '15',
      lpg: '88',
      diesel: '91',
      ldo: '65',
    },
    {
      parameter: String(t('aboutUs.costOfPellet')),
      pellet: '15',
      lpg: '43',
      diesel: '40',
      ldo: '37',
    },
    {
      parameter: String(t('aboutUs.tentativeSavingsRs')),
      pellet: '-',
      lpg: '45',
      diesel: '51',
      ldo: '29',
    },
    {
      parameter: String(t('aboutUs.tentativeSavingsPercent')),
      pellet: '-',
      lpg: '51%',
      diesel: '56%',
      ldo: '44%',
    },
  ];

  // Row-by-row animation for Mission/Vision/Objective cards
  useEffect(() => {
    if (!missionVisible) return;
    const cardsPerRow = 3;
    const totalRows = Math.ceil(3 / cardsPerRow);
    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
      setTimeout(() => {
        for (let colIndex = 0; colIndex < cardsPerRow; colIndex++) {
          const cardIndex = rowIndex * cardsPerRow + colIndex;
          if (cardIndex < 3) {
            setMissionCardsVisible((prev) => {
              const newState = [...prev];
              newState[cardIndex] = true;
              return newState;
            });
          }
        }
      }, rowIndex * 200);
    }
  }, [missionVisible]);

  // Row-by-row animation for Why Biomass points
  useEffect(() => {
    if (!whyBiomassVisible) return;
    const pointsPerRow = 2;
    const totalRows = Math.ceil(whyBiomassPoints.length / pointsPerRow);
    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
      setTimeout(() => {
        for (let colIndex = 0; colIndex < pointsPerRow; colIndex++) {
          const pointIndex = rowIndex * pointsPerRow + colIndex;
          if (pointIndex < whyBiomassPoints.length) {
            setWhyBiomassPointsVisible((prev) => {
              const newState = [...prev];
              newState[pointIndex] = true;
              return newState;
            });
          }
        }
      }, rowIndex * 200);
    }
  }, [whyBiomassVisible, whyBiomassPoints.length]);

  // Row-by-row animation for comparison table rows
  useEffect(() => {
    if (!comparisonVisible) return;
    for (let rowIndex = 0; rowIndex < comparisonData.length; rowIndex++) {
      setTimeout(() => {
        setTableRowsVisible((prev) => {
          const newState = [...prev];
          newState[rowIndex] = true;
          return newState;
        });
      }, rowIndex * 150);
    }
  }, [comparisonVisible, comparisonData.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full bg-white py-4 sm:py-5 md:py-8 lg:py-8 xl:py-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10">
          <div className="text-center mb-1 sm:mb-1.5 md:mb-2">
            <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3 animate-on-scroll ${heroVisible ? 'animate-textAppear animated' : ''}`} style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
              {String(t('aboutUs.title'))}
            </h1>
            <div className="flex justify-center mb-2 sm:mb-2.5">
              <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400"></div>
            </div>
            <p className={`text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed animate-on-scroll ${heroVisible ? 'animate-textAppear animated stagger-1' : ''}`} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
              {String(t('aboutUs.heroDescription'))}
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Strategic Objective */}
      <section ref={missionRef} className="relative w-full bg-white pt-0 pb-4 sm:pb-5 md:pb-6 lg:pb-8 xl:pb-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Mission */}
            <div 
              ref={(el) => { missionCardsRef.current[0] = el; }}
              className={`bg-white rounded-xl p-4 sm:p-5 md:p-6 lg:p-7 border border-gray-200 transition-all duration-300 hover:-translate-y-1 shadow-sm animate-on-scroll ${missionCardsVisible[0] ? 'animate-slideInFromLeft animated stagger-1' : ''}`}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#5FAA3F'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Icon name="sprout" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9" style={{ color: '#5FAA3F' }} />
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>{String(t('aboutUs.mission'))}</h2>
              </div>
              <p className="text-xs sm:text-sm md:text-sm lg:text-base text-gray-700 leading-relaxed">
                "{String(t('aboutUs.missionText'))}"
              </p>
            </div>

            {/* Vision */}
            <div 
              ref={(el) => { missionCardsRef.current[1] = el; }}
              className={`bg-white rounded-xl p-4 sm:p-5 md:p-6 lg:p-7 border border-gray-200 transition-all duration-300 hover:-translate-y-1 shadow-sm animate-on-scroll ${missionCardsVisible[1] ? 'animate-slideInFromLeft animated stagger-1' : ''}`}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#5FAA3F'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Icon name="globe" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9" style={{ color: '#5FAA3F' }} />
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>{String(t('aboutUs.vision'))}</h2>
              </div>
              <p className="text-xs sm:text-sm md:text-sm lg:text-base text-gray-700 leading-relaxed">
                "{String(t('aboutUs.visionText'))}"
              </p>
            </div>

            {/* Strategic Objective */}
            <div 
              ref={(el) => { missionCardsRef.current[2] = el; }}
              className={`bg-white rounded-xl p-4 sm:p-5 md:p-6 lg:p-7 border border-gray-200 transition-all duration-300 hover:-translate-y-1 shadow-sm animate-on-scroll ${missionCardsVisible[2] ? 'animate-slideInFromLeft animated stagger-1' : ''}`}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#5FAA3F'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Icon name="target" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9" style={{ color: '#5FAA3F' }} />
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>{String(t('aboutUs.strategicObjective'))}</h2>
              </div>
              <p className="text-xs sm:text-sm md:text-sm lg:text-base text-gray-700 leading-relaxed">
                "{String(t('aboutUs.strategicObjectiveText'))}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Description */}
      <section ref={aboutDescRef} className="relative w-full bg-white py-4 sm:py-5 md:py-8 lg:py-8 xl:py-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <div className={`bg-white rounded-xl p-4 sm:p-5 md:p-6 lg:p-7 border border-gray-200 animate-on-scroll ${aboutDescVisible ? 'animate-textAppear animated' : ''}`}>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
                {String(t('aboutUs.title'))}
              </h2>
              <div className="w-12 sm:w-16 md:w-20 h-0.5 sm:h-1 bg-yellow-400 mb-3 sm:mb-4 md:mb-5"></div>
              <p className="text-xs sm:text-sm md:text-sm lg:text-base text-gray-700 leading-relaxed">
                {String(t('aboutUs.fullContent'))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <OurJourney />

      {/* Why Biomass Wood Pellets */}
      <section ref={whyBiomassRef} className="relative w-full bg-white py-4 sm:py-5 md:py-8 lg:py-8 xl:py-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10">
          <div className="max-w-5xl mx-auto">
            {/* Section Title */}
            <div className={`text-center mb-4 sm:mb-5 md:mb-6 lg:mb-8 animate-on-scroll ${whyBiomassVisible ? 'animate-textAppear animated' : ''}`}>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
                {String(t('aboutUs.whyBiomassTitle'))}
              </h2>
              <div className="flex justify-center mb-2 sm:mb-2.5">
                <div className="w-16 sm:w-20 md:w-24 h-1 bg-yellow-400"></div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10">
              {whyBiomassPoints.map((point, index) => (
                <div
                  key={index}
                  ref={(el) => { whyBiomassPointsRef.current[index] = el; }}
                  className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-white rounded-lg border border-gray-200 transition-all duration-300 hover:-translate-y-1 shadow-sm animate-on-scroll ${whyBiomassPointsVisible[index] ? `animate-slideInFromLeft animated stagger-${Math.floor(index / 2) + 1}` : ''}`}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#5FAA3F'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                >
                  <Icon name="check-circle" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5" style={{ color: '#5FAA3F' }} />
                  <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                    {point}
                  </p>
                </div>
              ))}
            </div>

            {/* Photo of Biomass Wood Pellets */}
            <div className="mt-8 sm:mt-10">
              <div className="relative rounded-xl overflow-hidden border border-gray-200">
                <div className="aspect-video relative">
                  <Image
                    src="/biomass-pellets.jpg"
                    alt="Biomass Wood Pellets and Loose Biomass"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.placeholder')) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'placeholder w-full h-full bg-green-100 flex items-center justify-center';
                        placeholder.innerHTML = '<p class="text-gray-500 text-sm">Biomass Wood Pellets Image</p>';
                        parent.appendChild(placeholder);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pellet Specifications Section */}
      <section ref={pelletSpecRef} className="relative w-full bg-white py-4 sm:py-5 md:py-8 lg:py-8 xl:py-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10">
          <div className="max-w-6xl mx-auto">
            {/* Section Title */}
            <div className={`text-center mb-4 sm:mb-5 md:mb-6 lg:mb-8 animate-on-scroll ${pelletSpecVisible ? 'animate-textAppear animated' : ''}`}>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
                {String(t('aboutUs.pelletSpecificationsTitle'))}
              </h2>
              <div className="flex justify-center mb-2 sm:mb-2.5">
                <div className="w-16 sm:w-20 md:w-24 h-1 bg-yellow-400"></div>
              </div>
            </div>

            {/* Content Grid: Image and Specifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 items-stretch">
              {/* Pellet Image */}
              <div className={`animate-on-scroll ${pelletSpecVisible ? 'animate-slideInFromLeft animated' : ''}`}>
                <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm w-full h-full">
                  <div className="aspect-square relative">
                    <Image
                      src="/Pine wood pellets.png"
                      alt="Pine Wood Pellets"
                      fill
                      className="object-cover"
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
              </div>

              {/* Specifications */}
              <div className={`animate-on-scroll ${pelletSpecVisible ? 'animate-slideInFromRight animated' : ''}`}>
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-sm w-full h-full flex flex-col transition-all duration-300 hover:-translate-y-1" onMouseEnter={(e) => e.currentTarget.style.borderColor = '#5FAA3F'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}>
                  <div className="space-y-3 sm:space-y-4 flex-grow">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Icon name="check-circle" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5" style={{ color: '#5FAA3F' }} />
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                        {String(t('aboutUs.pelletSpec1'))}
                      </p>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Icon name="check-circle" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5" style={{ color: '#5FAA3F' }} />
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                        {String(t('aboutUs.pelletSpec2'))}
                      </p>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Icon name="check-circle" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5" style={{ color: '#5FAA3F' }} />
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                        {String(t('aboutUs.pelletSpec3'))}
                      </p>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Icon name="check-circle" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5" style={{ color: '#5FAA3F' }} />
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                        {String(t('aboutUs.pelletSpec4'))}
                      </p>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Icon name="check-circle" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5" style={{ color: '#5FAA3F' }} />
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                        {String(t('aboutUs.pelletSpec5'))}
                      </p>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Icon name="check-circle" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5" style={{ color: '#5FAA3F' }} />
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                        {String(t('aboutUs.pelletSpec6'))}
                      </p>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Icon name="check-circle" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5" style={{ color: '#5FAA3F' }} />
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                        {String(t('aboutUs.pelletSpec7'))}
                      </p>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Icon name="check-circle" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 mt-0.5" style={{ color: '#5FAA3F' }} />
                      <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                        {String(t('aboutUs.pelletSpec8'))}
                      </p>
                    </div>
                  </div>

                  {/* Get Pellet Inquiry Button */}
                  <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-200">
                    <Link
                      href="/contact-us"
                      className="inline-flex items-center justify-center px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm transform hover:scale-105"
                      style={{
                        background: 'linear-gradient(90deg, #5FAA3F, #2E7D32)',
                        fontFamily: 'var(--font-poppins), Poppins, sans-serif'
                      }}
                    >
                      {String(t('aboutUs.contactForPelletRequirement'))}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section ref={comparisonRef} className="relative w-full bg-white py-4 sm:py-5 md:py-8 lg:py-8 xl:py-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10">
          <div className="max-w-6xl mx-auto">
            {/* Section Title */}
            <div className={`text-center mb-4 sm:mb-5 md:mb-6 lg:mb-8 animate-on-scroll ${comparisonVisible ? 'animate-textAppear animated' : ''}`}>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
                {String(t('aboutUs.comparisonTitle'))}
              </h2>
              <div className="flex justify-center mb-2 sm:mb-2.5">
                <div className="w-16 sm:w-20 md:w-24 h-1 bg-yellow-400"></div>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mt-2">
                {String(t('aboutUs.approxSavings'))}
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead style={{ backgroundColor: '#5FAA3F' }}>
                      <tr>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">
                          {String(t('aboutUs.parameter'))}
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">
                          {String(t('aboutUs.pelletKg'))}
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">
                          {String(t('aboutUs.lpgKg'))}
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">
                          {String(t('aboutUs.dieselLtr'))}
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">
                          {String(t('aboutUs.ldoLtr'))}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {comparisonData.map((row, index) => (
                        <tr
                          key={index}
                          ref={(el) => { tableRowsRef.current[index] = el; }}
                          className={`${index % 2 === 0 ? 'bg-white' : ''} animate-on-scroll ${tableRowsVisible[index] ? 'animate-slideInFromLeft animated' : ''}`}
                          style={{ backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F5F5F5' }}
                        >
                          <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                            {row.parameter}
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                            {row.pellet}
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                            {row.lpg}
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                            {row.diesel}
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center text-gray-700">
                            {row.ldo}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Need Help Section */}
      <NeedHelp />
    </div>
  );
}

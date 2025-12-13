'use client';

import { useState, useEffect, useRef } from 'react';
import { FiDownload, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Hero() {
  const { t } = useTranslation();
  const [yearsCount, setYearsCount] = useState(0);
  const [installationsCount, setInstallationsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref: heroContentRef, isVisible: heroContentVisible } = useScrollAnimation({ threshold: 0.1 });

  // Count-up animation function
  const animateCount = (
    start: number,
    end: number,
    duration: number,
    callback: (value: number) => void
  ) => {
    let startTime: number | null = null;
    
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const current = Math.floor(start + (end - start) * progress);
      callback(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  // Intersection Observer to trigger animation when stats section is visible
  useEffect(() => {
    if (!statsRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Start animations
            animateCount(0, 10, 2000, setYearsCount);
            animateCount(0, 700, 2500, setInstallationsCount);
            animateCount(0, 99, 2000, setClientsCount);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(statsRef.current);

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);
  const handleDownloadBrochure = () => {
    const link = document.createElement('a');
    link.href = '/brochure/brochure.pdf';
    link.download = 'Giriraj-Industries-Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative w-full bg-white min-h-screen flex items-center pt-0 pb-4 sm:pb-5 md:pb-6 lg:pb-4 xl:pb-6">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-10 2xl:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-8 lg:gap-6 xl:gap-8 2xl:gap-10 items-center">
          {/* Left Section - Text Content */}
          <div ref={heroContentRef} className="order-2 lg:order-1 space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-2.5 xl:space-y-3 2xl:space-y-3.5 flex flex-col justify-center">
            {/* 1. Main Heading - Line 1 */}
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-[#1A1A1A] leading-tight tracking-tight animate-on-scroll ${heroContentVisible ? 'animate-textAppear animated stagger-1' : ''}`} style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
              {String(t('hero.title'))}
            </h1>

            {/* 2. Description - Line 2 */}
            <p className={`text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg text-[#1A1A1A] leading-relaxed max-w-2xl animate-on-scroll ${heroContentVisible ? 'animate-textAppear animated stagger-2' : ''}`} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
              {String(t('hero.description'))}
            </p>

            {/* Buttons Container */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2.5 md:gap-4 lg:gap-3.5 xl:gap-4 pt-3 sm:pt-2.5 md:pt-4">
              {/* 3. Get Brochure Button - Line 3 */}
              <button 
                onClick={handleDownloadBrochure}
                className={`flex items-center justify-center gap-2 sm:gap-1.5 md:gap-2 px-4 sm:px-3 md:px-4 lg:px-3 xl:px-3 py-3 sm:py-2 md:py-2.5 lg:py-2 xl:py-2.5 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm whitespace-nowrap min-h-[44px] animate-on-scroll ${heroContentVisible ? 'animate-textAppear animated stagger-3' : ''}`}
                style={{ 
                  background: 'linear-gradient(90deg, #FF7A00, #FFC837)',
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif'
                }}
              >
                <span>{String(t('hero.getBrochure'))}</span>
                <FiDownload className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-4 lg:h-4" />
              </button>

              {/* 4. Fuel Saving Calculator Button - Line 4 */}
              <Link 
                href="/#fuel-savings-calculator"
                className={`flex items-center justify-center gap-2 sm:gap-1.5 md:gap-2 px-4 sm:px-3 md:px-4 lg:px-3 xl:px-3 py-3 sm:py-2 md:py-2.5 lg:py-2 xl:py-2.5 border-2 text-[#5FAA3F] font-semibold rounded-lg hover:bg-[#5FAA3F] hover:text-white transition-all duration-300 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm whitespace-nowrap min-h-[44px] animate-on-scroll ${heroContentVisible ? 'animate-textAppear animated stagger-4' : ''}`}
                style={{ 
                  borderColor: '#5FAA3F',
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif'
                }}
                onMouseEnter={(e) => {
                  const arrow = e.currentTarget.querySelector('svg');
                  if (arrow) arrow.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  const arrow = e.currentTarget.querySelector('svg');
                  if (arrow) arrow.style.color = '#5FAA3F';
                }}
              >
                <span className="text-center">{String(t('hero.fuelCalculator'))}</span>
                <FiArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-4 lg:h-4" style={{ color: '#5FAA3F' }} />
              </Link>
            </div>

            {/* Statistics - Lines 5, 6, 7 */}
            <div ref={statsRef} className="grid grid-cols-3 gap-3 sm:gap-3.5 md:gap-6 lg:gap-3 xl:gap-4 2xl:gap-5 pt-2 sm:pt-2.5 md:pt-3 lg:pt-2 xl:pt-3">
              {/* 5. +10 Years Experience - Line 5 */}
              <div className={`text-center sm:text-left animate-on-scroll ${heroContentVisible ? 'animate-textAppear animated stagger-5' : ''}`}>
                <div className="text-2xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-gray-900 mb-2 sm:mb-2 md:mb-2.5">
                  +{yearsCount}
                </div>
                <div className="text-sm sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg">
                  {String(t('hero.yearsExperience'))}
                </div>
              </div>

              {/* 6. 700+ Successful Installations - Line 6 */}
              <div className={`text-center sm:text-left animate-on-scroll ${heroContentVisible ? 'animate-textAppear animated stagger-6' : ''}`}>
                <div className="text-2xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-gray-900 mb-2 sm:mb-2 md:mb-2.5">
                  {installationsCount}+
                </div>
                <div className="text-sm sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg">
                  {String(t('hero.successfulInstallations'))}
                </div>
              </div>

              {/* 7. 99% Happy clients - Line 7 */}
              <div className={`text-center sm:text-left animate-on-scroll ${heroContentVisible ? 'animate-textAppear animated stagger-7' : ''}`}>
                <div className="text-2xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-gray-900 mb-2 sm:mb-2 md:mb-2.5">
                  {clientsCount}%
                </div>
                <div className="text-sm sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg">
                  {String(t('hero.happyClients'))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Hero Video - Fully Responsive */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end items-center py-2 sm:py-3 md:py-4 overflow-hidden">
          <div className="w-full max-w-[900px] aspect-video bg-white overflow-hidden">
  <video
    src="/Hero Page Burner Motion 360.mp4"
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover scale-[1.02]"
  />
</div>
</div>
        </div>
      </div>
    </section>
  );
}


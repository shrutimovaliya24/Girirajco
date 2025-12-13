'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Icon from './Icon';
import testimonialsData from '../../data/testimonials.json';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Testimonials() {
  const { t } = useTranslation();
  const testimonials = testimonialsData;
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <>
      <style>{`
        .testimonial-swiper {
          padding: 20px 0;
          overflow: hidden !important;
        }
        .testimonial-swiper .swiper-wrapper {
          transition-timing-function: linear;
        }
        .testimonial-swiper .swiper-slide {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          height: auto;
        }
        .testimonial-swiper .swiper-slide-shadow-left,
        .testimonial-swiper .swiper-slide-shadow-right,
        .testimonial-swiper .swiper-slide-shadow-top,
        .testimonial-swiper .swiper-slide-shadow-bottom {
          display: none !important;
        }
        .testimonial-swiper::-webkit-scrollbar {
          display: none;
        }
        .testimonial-swiper {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .swiper-pagination-custom {
          position: relative !important;
        }
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #9ca3af;
          opacity: 0.5;
          transition: all 0.3s ease;
          border-radius: 50%;
        }
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: #5FAA3F;
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
      <section ref={sectionRef} className="relative w-full bg-white py-4 sm:py-5 md:py-8 lg:py-8 xl:py-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 2xl:px-16">
          {/* Section Title */}
          <div ref={titleRef} className={`text-center mb-4 sm:mb-5 md:mb-8 lg:mb-8 relative animate-on-scroll ${titleVisible ? 'animate-textAppear animated' : ''}`}>
            {/* Navigation Arrows - Desktop: Positioned absolutely on the right */}
            <div className="hidden md:flex items-center gap-2 sm:gap-3 absolute right-0 top-0">
              <button
                className="swiper-button-prev-custom w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-300 group min-h-[44px]"
                aria-label="Previous testimonial"
              >
                <Icon name="chevron-left" className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: '#6B7280' }} />
              </button>
              <button
                className="swiper-button-next-custom w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 group shadow-md hover:shadow-lg min-h-[44px]"
                style={{ 
                  background: 'linear-gradient(90deg, #5FAA3F, #2E7D32)'
                }}
                aria-label="Next testimonial"
              >
                <Icon name="chevron-right" className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ filter: 'brightness(0) invert(1)' }} />
              </button>
            </div>
            
            {/* Heading - Centered */}
            <div className="mb-2 sm:mb-2.5 md:mb-3">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
                {String(t('testimonials.title'))}
              </h2>
            </div>
            <div className="flex justify-center mb-2 sm:mb-2.5 md:mb-3">
              <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400"></div>
            </div>
            <p className={`text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed animate-on-scroll ${titleVisible ? 'animate-textAppear animated' : ''}`} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
              {String(t('testimonials.description'))}
            </p>
            
            {/* Navigation Arrows - Mobile: Show below description */}
            <div className="flex md:hidden items-center justify-center gap-3 mt-4">
              <button
                className="swiper-button-prev-custom w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-300 group min-h-[44px]"
                aria-label="Previous testimonial"
              >
                <Icon name="chevron-left" className="w-5 h-5" style={{ color: '#6B7280' }} />
              </button>
              <button
                className="swiper-button-next-custom w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group shadow-md hover:shadow-lg min-h-[44px]"
                style={{ 
                  background: 'linear-gradient(90deg, #5FAA3F, #2E7D32)'
                }}
                aria-label="Next testimonial"
              >
                <Icon name="chevron-right" className="w-5 h-5" style={{ filter: 'brightness(0) invert(1)' }} />
              </button>
            </div>
          </div>

          {/* Swiper Container */}
          <div className="relative max-w-6xl mx-auto overflow-hidden">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              grabCursor={true}
              slidesPerView={1}
              spaceBetween={20}
              loop={true}
              loopAdditionalSlides={2}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              pagination={{
                clickable: true,
                el: '.swiper-pagination-custom',
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              className="testimonial-swiper"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div 
                    className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col border-2 border-gray-200"
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#5FAA3F'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                  >
                    {/* Top Row: Quote Icon (Left) and Stars (Right) */}
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      {/* Quote Icon - Top Left - Outlined */}
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                        />
                      </svg>

                      {/* Star Rating - Top Right */}
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <svg
                            key={index}
                            className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${
                              index < testimonial.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-yellow-400 fill-none'
                            }`}
                            fill={index < testimonial.rating ? 'currentColor' : 'none'}
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Text - Left Aligned */}
                    <p className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-base text-gray-700 leading-relaxed mb-2 sm:mb-3 md:mb-4 grow" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                      {String(t(`testimonials.testimonial${testimonial.id}`))}
                    </p>

                    {/* Company Name - Bottom */}
                    <div className="mt-auto pt-2 sm:pt-3 md:pt-4 border-t border-gray-100">
                      <h3 className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-base font-bold" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                        {testimonial.company}
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Pagination */}
            <div className="swiper-pagination-custom flex justify-center gap-2 mt-6 sm:mt-8"></div>
          </div>
        </div>
      </section>
    </>
  );
}

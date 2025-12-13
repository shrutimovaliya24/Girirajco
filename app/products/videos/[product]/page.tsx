'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '../../../components/Icon';
import { productVideos, productOrder } from '../../../../data/productVideos';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { FiPlay, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useParams } from 'next/navigation';

export default function ProductVideoDetailPage() {
  const params = useParams();
  const productSlug = params.product as string;
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.1 });
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  // Find product name from slug
  const productName = productOrder.find(name => 
    name.toLowerCase().replace(/\s+/g, '-') === productSlug
  );

  const productData = productName ? productVideos[productName] : null;

  // Set default tab to first category or null if no categories
  useEffect(() => {
    if (productData) {
      if (productData.categories) {
        const firstCategory = Object.keys(productData.categories)[0];
        setSelectedTab(firstCategory);
      } else {
        setSelectedTab(null);
      }
    }
  }, [productData]);

  // Ensure all videos are muted and support all devices
  useEffect(() => {
    // Mute all thumbnail videos
    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        video.muted = true;
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('x5-playsinline', '');
      }
    });

    // Mute modal video
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = true;
      modalVideoRef.current.setAttribute('muted', '');
      modalVideoRef.current.setAttribute('playsinline', '');
      modalVideoRef.current.setAttribute('webkit-playsinline', '');
      modalVideoRef.current.setAttribute('x5-playsinline', '');
    }
  });

  const handleVideoClick = (videoSrc: string) => {
    setSelectedVideo(videoSrc);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const getCurrentVideos = (): string[] => {
    if (!productData) return [];

    if (selectedTab && productData.categories) {
      return productData.categories[selectedTab]?.map(v => v.src) || [];
    }

    if (productData.videos) {
      return productData.videos.map(v => v.src);
    }

    return [];
  };

  const getCurrentVideoIndex = (): number => {
    const videos = getCurrentVideos();
    return videos.findIndex(v => v === selectedVideo);
  };

  const navigateVideo = (direction: 'prev' | 'next') => {
    const videos = getCurrentVideos();
    const currentIndex = getCurrentVideoIndex();
    
    if (direction === 'prev') {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : videos.length - 1;
      setSelectedVideo(videos[prevIndex]);
    } else {
      const nextIndex = currentIndex < videos.length - 1 ? currentIndex + 1 : 0;
      setSelectedVideo(videos[nextIndex]);
    }
  };

  if (!productName || !productData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products/videos" className="text-[#5FAA3F] hover:underline">
            Back to Videos
          </Link>
        </div>
      </div>
    );
  }

  const hasCategories = productData.categories && Object.keys(productData.categories).length > 0;
  const categories = hasCategories ? Object.keys(productData.categories) : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full bg-white py-4 sm:py-5 md:py-6 lg:py-6">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 2xl:px-16">
          <div className="text-center">
            <Link 
              href="/products/videos"
              className="inline-flex items-center gap-2 text-[#5FAA3F] hover:text-[#2E7D32] transition-colors duration-300 mb-4 sm:mb-5 text-sm sm:text-base"
              style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
            >
              <Icon name="arrow-left" className="w-5 h-5" />
              <span className="font-semibold">Back to Videos</span>
            </Link>
            
            <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3 animate-on-scroll ${heroVisible ? 'animate-textAppear animated' : ''}`} style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
              {productName} Videos
            </h1>
            <div className="flex justify-center mb-2 sm:mb-2.5">
              <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      {hasCategories && categories.length > 0 && (
        <section className="relative w-full bg-white pt-0 pb-4 sm:pb-5 md:py-4 lg:py-6">
          <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 2xl:px-16">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {categories.map((categoryName) => (
                <button
                  key={categoryName}
                  onClick={() => setSelectedTab(categoryName)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-base ${
                    selectedTab === categoryName
                      ? 'bg-[#5FAA3F] text-white'
                      : 'bg-white text-[#5FAA3F] border border-[#5FAA3F] hover:bg-[#5FAA3F] hover:text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  {categoryName}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Videos Grid */}
      {getCurrentVideos().length > 0 && (
        <section className="relative w-full bg-white pt-0 pb-8 sm:pb-10 md:py-8 lg:py-10">
          <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 2xl:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {getCurrentVideos().map((videoSrc, index) => (
                <div
                  key={index}
                  onClick={() => handleVideoClick(videoSrc)}
                  className="group relative aspect-video bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                >
                  <video
                    ref={(el) => {
                      if (el) {
                        videoRefs.current[videoSrc] = el;
                        el.muted = true;
                        el.setAttribute('playsinline', '');
                        el.setAttribute('webkit-playsinline', '');
                        el.setAttribute('x5-playsinline', '');
                      }
                    }}
                    src={videoSrc}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    muted
                    playsInline
                    preload="metadata"
                    onMouseEnter={(e) => {
                      const video = e.currentTarget;
                      video.muted = true;
                      video.play().catch(() => {});
                    }}
                    onMouseLeave={(e) => {
                      const video = e.currentTarget;
                      video.pause();
                      video.currentTime = 0;
                    }}
                    onTouchStart={(e) => {
                      const video = e.currentTarget;
                      video.muted = true;
                      video.play().catch(() => {});
                    }}
                    onTouchEnd={(e) => {
                      const video = e.currentTarget;
                      video.pause();
                      video.currentTime = 0;
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-300">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center">
                      <FiPlay className="w-7 h-7 sm:w-8 sm:h-8 text-[#5FAA3F] ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 sm:p-6" 
          onClick={closeVideoModal}
        >
          {/* Close Button - Top Right */}
          <button
            onClick={closeVideoModal}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 z-20 shadow-lg"
            aria-label="Close video"
          >
            <FiX className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#1F2937' }} />
          </button>

          {/* Previous Button */}
          {getCurrentVideos().length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateVideo('prev');
              }}
              className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 z-20 shadow-lg"
              aria-label="Previous video"
            >
              <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#5FAA3F' }} />
            </button>
          )}

          {/* Next Button */}
          {getCurrentVideos().length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateVideo('next');
              }}
              className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 z-20 shadow-lg"
              aria-label="Next video"
            >
              <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#5FAA3F' }} />
            </button>
          )}

          {/* Video Container */}
          <div 
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="relative flex items-center justify-center"
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh'
              }}
            >
              <video
                ref={(el) => {
                  modalVideoRef.current = el;
                  if (el) {
                    el.muted = true;
                    el.setAttribute('playsinline', '');
                    el.setAttribute('webkit-playsinline', '');
                    el.setAttribute('x5-playsinline', '');
                  }
                }}
                src={selectedVideo}
                controls
                autoPlay
                muted
                playsInline
                preload="auto"
                className="object-contain"
                style={{
                  maxWidth: '90vw',
                  maxHeight: '85vh',
                  width: 'auto',
                  height: 'auto',
                  display: 'block'
                }}
                onLoadedMetadata={(e) => {
                  const video = e.currentTarget;
                  video.muted = true;
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


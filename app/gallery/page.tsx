'use client';

import Image from 'next/image';
import Icon from '../components/Icon';
import { useState, useEffect, useRef, useMemo } from 'react';
import NeedHelp from '../components/NeedHelp';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function GalleryPage() {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<Record<number, { width: number; height: number }>>({});
  const { ref: galleryRef, isVisible: galleryVisible } = useScrollAnimation({ threshold: 0.2 });
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [imagesVisible, setImagesVisible] = useState<boolean[]>([]);

  // Automatically generate gallery images array from all .jpg files in gallery folder
  // Based on the files: gallery1.jpg through gallery12.jpg
  // Memoized to prevent recreation on every render
  const galleryImages = useMemo(() => {
    const images = [];
    for (let i = 1; i <= 12; i++) {
      images.push({
        id: i,
        src: `/gallery/gallery${i}.jpg`,
        alt: `Gallery Image ${i}`,
      });
    }
    return images;
  }, []);

  // Get first 6 images for initial display
  const initialImages = useMemo(() => galleryImages.slice(0, 6), [galleryImages]);

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://girirajco.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Gallery",
        "item": "https://girirajco.com/gallery"
      }
    ]
  };

  // Load image dimensions only for visible images (lazy load)
  useEffect(() => {
    const imagesToLoad = showAll ? galleryImages : initialImages;
    const imageLoadPromises: Promise<void>[] = [];
    
    imagesToLoad.forEach((image) => {
      // Skip if dimensions already loaded
      if (imageDimensions[image.id]) return;
      
      const img = new window.Image();
      const promise = new Promise<void>((resolve) => {
        img.onload = () => {
          setImageDimensions((prev) => ({
            ...prev,
            [image.id]: { width: img.naturalWidth, height: img.naturalHeight },
          }));
          resolve();
        };
        img.onerror = () => resolve(); // Resolve even on error to prevent hanging
        img.src = image.src;
      });
      imageLoadPromises.push(promise);
    });

    // Cleanup function
    return () => {
      // Cancel any pending image loads if component unmounts
      imageLoadPromises.forEach(() => {
        // Images will be garbage collected
      });
    };
  }, [showAll]); // Only reload when showAll changes

  // Row-by-row animation for gallery images
  useEffect(() => {
    if (!galleryVisible) return;

    // Gallery uses columns layout: 1 col mobile, 2 cols tablet, 3 cols desktop
    const getColsPerRow = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth >= 1024) return 3; // lg: 3 cols
        if (window.innerWidth >= 640) return 2;  // sm: 2 cols
        return 1; // mobile: 1 col
      }
      return 3; // default
    };

    const colsPerRow = getColsPerRow();
    const imagesToAnimate = showAll ? galleryImages : initialImages;
    const totalRows = Math.ceil(imagesToAnimate.length / colsPerRow);

    // Animate rows sequentially
    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
      setTimeout(() => {
        for (let colIndex = 0; colIndex < colsPerRow; colIndex++) {
          const imageIndex = rowIndex * colsPerRow + colIndex;
          if (imageIndex < imagesToAnimate.length) {
            const imageId = imagesToAnimate[imageIndex].id;
            setImagesVisible((prev) => {
              const newState = [...prev];
              newState[imageId - 1] = true; // IDs start from 1
              return newState;
            });
          }
        }
      }, rowIndex * 200);
    }
  }, [galleryVisible, showAll, galleryImages, initialImages]);

  const handleImageClick = (id: number) => {
    setSelectedImage(id);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      const currentIndex = galleryImages.findIndex(img => img.id === selectedImage);
      const previousIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
      setSelectedImage(galleryImages[previousIndex].id);
    }
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      const currentIndex = galleryImages.findIndex(img => img.id === selectedImage);
      const nextIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(galleryImages[nextIndex].id);
    }
  };

  // Keyboard navigation for modal
  useEffect(() => {
    if (selectedImage === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = galleryImages.findIndex(img => img.id === selectedImage);
        const previousIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
        setSelectedImage(galleryImages[previousIndex].id);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = galleryImages.findIndex(img => img.id === selectedImage);
        const nextIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
        setSelectedImage(galleryImages[nextIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, galleryImages]);

  const handleViewMore = () => {
    setShowAll(true);
  };

  const handleViewLess = () => {
    setShowAll(false);
  };

  // Get aspect ratio based on image dimensions
  const getAspectRatio = (imageId: number) => {
    const dims = imageDimensions[imageId];
    if (dims) {
      return dims.width / dims.height;
    }
    // Default to 16:9 if dimensions not loaded yet
    return 16 / 9;
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full bg-white py-4 sm:py-5 md:py-8 lg:py-8 xl:py-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10">
          <div className="text-center mb-1 sm:mb-1.5 md:mb-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
              {String(t('gallery.title'))}
            </h1>
            <div className="flex justify-center mb-2 sm:mb-2.5">
              <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400"></div>
            </div>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
              {String(t('gallery.description'))}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative w-full bg-white pt-0 pb-4 sm:pb-5 md:pb-6 lg:pb-8 xl:pb-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          {/* Conditional Rendering: 6 Images or All Images */}
          {!showAll ? (
            <>
              {/* Gallery Grid - Responsive columns with masonry-style layout */}
              <div ref={galleryRef} className="columns-1 sm:columns-2 lg:columns-3 gap-4 mb-6">
                {initialImages.map((image) => {
                  const aspectRatio = getAspectRatio(image.id);
                  return (
                  <div
                    key={image.id}
                    ref={(el) => {
                      imagesRef.current[image.id - 1] = el;
                    }}
                      className={`relative group cursor-pointer w-full mb-4 break-inside-avoid animate-on-scroll ${imagesVisible[image.id - 1] ? `animate-slideInFromLeft animated stagger-${Math.floor((image.id - 1) / 3) + 1}` : ''}`}
                    onClick={() => handleImageClick(image.id)}
                  >
                      <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 hover:border-[#5FAA3F] transition-all duration-300" style={{ aspectRatio: aspectRatio }}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={75}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector('.placeholder')) {
                            const placeholder = document.createElement('div');
                            placeholder.className = 'placeholder w-full h-full bg-green-100 flex items-center justify-center';
                            placeholder.innerHTML = `<p class="text-gray-500 text-xs text-center px-2">${image.alt}</p>`;
                            parent.appendChild(placeholder);
                          }
                        }}
                      />
                      {/* Eye Icon Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <Icon name="eye" className="w-5 h-5" style={{ color: '#5FAA3F' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
              {/* View More Button */}
              {galleryImages.length > 6 && (
                <div className="text-center">
                  <button
                    onClick={handleViewMore}
                    className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3.5 lg:px-8 lg:py-4 border-2 rounded-lg text-[#5FAA3F] hover:bg-[#5FAA3F] hover:text-white transition-all duration-300 font-semibold text-xs sm:text-sm md:text-base lg:text-base"
                    style={{ borderColor: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  >
                    {String(t('gallery.viewMore'))}
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* All Images Grid - Responsive columns with masonry-style layout */}
              <div ref={galleryRef} className="columns-1 sm:columns-2 lg:columns-3 gap-4 mb-6">
                {galleryImages.map((image) => {
                  const aspectRatio = getAspectRatio(image.id);
                  return (
                  <div
                    key={image.id}
                    ref={(el) => {
                      imagesRef.current[image.id - 1] = el;
                    }}
                      className={`relative group cursor-pointer w-full mb-4 break-inside-avoid animate-on-scroll ${imagesVisible[image.id - 1] ? `animate-slideInFromLeft animated stagger-${Math.floor((image.id - 1) / 3) + 1}` : ''}`}
                    onClick={() => handleImageClick(image.id)}
                  >
                      <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 hover:border-[#5FAA3F] transition-all duration-300" style={{ aspectRatio: aspectRatio }}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={75}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector('.placeholder')) {
                            const placeholder = document.createElement('div');
                            placeholder.className = 'placeholder w-full h-full bg-green-100 flex items-center justify-center';
                            placeholder.innerHTML = `<p class="text-gray-500 text-xs text-center px-2">${image.alt}</p>`;
                            parent.appendChild(placeholder);
                          }
                        }}
                      />
                      {/* Eye Icon Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <Icon name="eye" className="w-5 h-5" style={{ color: '#5FAA3F' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
              {/* View Less Button */}
              <div className="text-center">
                <button
                  onClick={handleViewLess}
                  className="inline-flex items-center gap-2 px-6 py-2.5 border-2 rounded-lg text-[#5FAA3F] hover:bg-[#5FAA3F] hover:text-white transition-all duration-300 font-medium text-sm"
                  style={{ borderColor: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                >
                  {String(t('gallery.viewLess'))}
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Modal for Full Image View */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 sm:p-6" 
          onClick={closeModal}
        >
          {/* Close Button - Top Right */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 z-20 shadow-lg"
            aria-label="Close modal"
          >
            <Icon name="x" className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#1F2937' }} />
          </button>

          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 z-20 shadow-lg"
            aria-label="Previous image"
          >
            <Icon name="chevron-left" className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#5FAA3F' }} />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 z-20 shadow-lg"
            aria-label="Next image"
          >
            <Icon name="chevron-right" className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#5FAA3F' }} />
          </button>

          {/* Image Container */}
          <div 
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const selectedImg = galleryImages.find((img) => img.id === selectedImage);
              const dims = imageDimensions[selectedImage || 0];
              
              if (dims && selectedImg) {
                // Use natural dimensions with CSS constraints to maintain aspect ratio - no fixed frame
                return (
                  <div 
                    className="relative flex items-center justify-center"
                    style={{
                      maxWidth: '90vw',
                      maxHeight: '85vh'
                    }}
                  >
                    <Image
                      src={selectedImg.src}
                      alt={selectedImg.alt}
                      width={dims.width}
                      height={dims.height}
                      className="object-contain"
                      style={{
                        maxWidth: '90vw',
                        maxHeight: '85vh',
                        width: 'auto',
                        height: 'auto',
                        display: 'block'
                      }}
                      quality={90}
                      priority
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.placeholder')) {
                          const placeholder = document.createElement('div');
                          placeholder.className = 'placeholder w-full h-full bg-green-100 flex items-center justify-center';
                          placeholder.innerHTML = `<p class="text-gray-500">Image not found</p>`;
                          parent.appendChild(placeholder);
                        }
                      }}
                    />
                  </div>
                );
              }
              
              // Fallback if dimensions not loaded yet
              return (
                <div className="relative flex items-center justify-center" style={{ maxWidth: '90vw', maxHeight: '85vh' }}>
                  <Image
                    src={selectedImg?.src || ''}
                    alt={selectedImg?.alt || ''}
                    width={1200}
                    height={800}
                    className="object-contain"
                    style={{
                      maxWidth: '90vw',
                      maxHeight: '85vh',
                      width: 'auto',
                      height: 'auto',
                      display: 'block'
                    }}
                    quality={90}
                    priority
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.placeholder')) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'placeholder w-full h-full bg-green-100 flex items-center justify-center';
                        placeholder.innerHTML = `<p class="text-gray-500">Image not found</p>`;
                        parent.appendChild(placeholder);
                      }
                    }}
                  />
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Need Help Section */}
      <NeedHelp />
    </div>
    </>
  );
}

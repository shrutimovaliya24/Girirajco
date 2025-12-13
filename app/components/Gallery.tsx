'use client';

import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import { useState } from 'react';

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Gallery images with size variations for collage layout
  const galleryImages = [
    { id: 1, src: '/gallery/gallery-1.jpg', alt: 'Biomass Heating System Installation', size: 'large' },
    { id: 2, src: '/gallery/gallery-2.jpg', alt: 'Industrial Pellet Burner', size: 'medium' },
    { id: 3, src: '/gallery/gallery-3.jpg', alt: 'Hot Air Generator', size: 'small' },
    { id: 4, src: '/gallery/gallery-4.jpg', alt: 'Aluminium Melting Furnace', size: 'small' },
    { id: 5, src: '/gallery/gallery-5.jpg', alt: 'Batch Fryer System', size: 'medium' },
    { id: 6, src: '/gallery/gallery-6.jpg', alt: 'Manufacturing Facility', size: 'large' },
    { id: 7, src: '/gallery/gallery-7.jpg', alt: 'Quality Testing', size: 'small' },
    { id: 8, src: '/gallery/gallery-8.jpg', alt: 'Product Showcase', size: 'medium' },
  ];

  // Get current set of images (6 images per view for collage)
  const getCurrentImages = () => {
    const start = currentIndex;
    const end = Math.min(start + 6, galleryImages.length);
    let images = galleryImages.slice(start, end);
    // If we need to fill, loop back to beginning
    if (images.length < 6) {
      const remaining = 6 - images.length;
      images = [...images, ...galleryImages.slice(0, remaining)];
    }
    return images;
  };

  const currentImages = getCurrentImages();

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 6) % galleryImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 6 + galleryImages.length) % galleryImages.length);
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return ' min-h-[250px] ';
      case 'medium':
        return ' min-h-[200px] ';
      case 'small':
        return ' min-h-[150px] ';
      default:
        return ' min-h-[200px] ';
    }
  };

  return (
    <section className="relative w-full bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col mb-6 gap-4">
          {/* Left Side - Title and Description */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
              Our Gallery
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
              Discover the essence of excellence captured in every installation, every innovation, and every solution we deliver.
            </p>
          </div>

          {/* Right Side - Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-300 group"
              style={{ '--hover-border-color': '#5FAA3F' } as React.CSSProperties}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#5FAA3F'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
              aria-label="Previous gallery"
            >
              <Icon name="chevron-left" className="w-5 h-5" style={{ color: '#6B7280' }} />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group shadow-md hover:shadow-lg"
              style={{ background: 'linear-gradient(90deg, #5FAA3F, #2E7D32)' }}
              aria-label="Next gallery"
            >
              <Icon name="chevron-right" className="w-5 h-5" style={{ filter: 'brightness(0) invert(1)' }} />
            </button>
          </div>
        </div>

        {/* Gallery Collage Grid */}
        <div className="grid grid-cols-1 gap-4 mb-6 auto-rows-fr">
          {currentImages.map((image) => (
            <div key={image.id} className={`relative group ${getSizeClasses(image.size)}`}>
              <div
                className="relative w-full h-full rounded-xl overflow-hidden border border-gray-200 transition-all duration-300"
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#5FAA3F'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
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
          ))}
        </div>

        {/* View All Button - Green Outline (Light Outline) */}
        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-2.5 border-2 rounded-lg hover:bg-[#5FAA3F] hover:text-white transition-all duration-300 font-medium text-sm"
            style={{ borderColor: '#5FAA3F', color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}

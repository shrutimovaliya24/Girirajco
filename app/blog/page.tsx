'use client';

import Image from 'next/image';
import Link from 'next/link';
import Icon from '../components/Icon';
import NeedHelp from '../components/NeedHelp';
import blogPostsData from '../../data/blog.json';
import { useTranslation } from '../hooks/useTranslation';
import { useRef, useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function BlogPage() {
  const { t } = useTranslation();
  const blogPosts = blogPostsData;
  const { ref: blogSectionRef, isVisible: blogSectionVisible } = useScrollAnimation({ threshold: 0.2 });
  const postsRef = useRef<(HTMLElement | null)[]>([]);
  const [postsVisible, setPostsVisible] = useState<boolean[]>([]);

  // Row-by-row animation for blog posts
  useEffect(() => {
    if (!blogSectionVisible) return;

    // Blog uses grid: 1 col mobile, 2 cols tablet, 3 cols desktop
    const getColsPerRow = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth >= 1024) return 3; // lg: 3 cols
        if (window.innerWidth >= 768) return 2;   // md: 2 cols
        return 1; // mobile: 1 col
      }
      return 3; // default
    };

    const colsPerRow = getColsPerRow();
    const totalRows = Math.ceil(blogPosts.length / colsPerRow);

    // Animate rows sequentially
    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
      setTimeout(() => {
        for (let colIndex = 0; colIndex < colsPerRow; colIndex++) {
          const postIndex = rowIndex * colsPerRow + colIndex;
          if (postIndex < blogPosts.length) {
            setPostsVisible((prev) => {
              const newState = [...prev];
              newState[postIndex] = true;
              return newState;
            });
          }
        }
      }, rowIndex * 200);
    }
  }, [blogSectionVisible, blogPosts.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full bg-white py-4 sm:py-5 md:py-8 lg:py-8 xl:py-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10">
          <div className="text-center mb-1 sm:mb-1.5 md:mb-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
              {String(t('blog.title'))}
            </h1>
            <div className="flex justify-center mb-2 sm:mb-2.5">
              <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400"></div>
            </div>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
              {String(t('blog.description'))}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section ref={blogSectionRef} className="relative w-full bg-white pt-0 pb-4 sm:pb-5 md:pb-6 lg:pb-8 xl:pb-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {blogPosts.map((post, index) => (
              <article
                key={post.id}
                ref={(el) => {
                  postsRef.current[index] = el;
                }}
                className={`bg-white rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-lg group h-full flex flex-col animate-on-scroll ${postsVisible[index] ? `animate-slideInFromLeft animated stagger-${Math.floor(index / (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1)) + 1}` : ''}`}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#5FAA3F'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
              >
                {/* Blog Image */}
                <div className="relative w-full h-32 sm:h-36 md:h-40 overflow-hidden bg-transparent">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.placeholder')) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'placeholder w-full h-full bg-green-100 flex items-center justify-center';
                        placeholder.innerHTML = `<p class="text-gray-500 text-xs text-center px-2">${post.title}</p>`;
                        parent.appendChild(placeholder);
                      }
                    }}
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <span className="px-2 sm:px-3 py-1 text-white text-xs sm:text-xs font-semibold rounded-full" style={{ backgroundColor: '#5FAA3F' }}>
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-4 sm:p-5 flex flex-col grow">
                  {/* Meta Information */}
                  <div className="flex items-center flex-wrap gap-3 sm:gap-4 text-xs sm:text-xs md:text-sm text-gray-500 mb-2 sm:mb-3" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                    <div className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                      <Icon name="calendar" className="w-3 h-3 shrink-0" />
                      <span className="whitespace-nowrap">{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                      <Icon name="user" className="w-3 h-3 shrink-0" />
                      <span className="whitespace-nowrap">{post.author}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-2.5 md:mb-3 line-clamp-2 transition-colors duration-300 grow"
                    style={{ color: '#1A1A1A', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#5FAA3F'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#1A1A1A'}
                  >
                    {String(t(`blog.blog${post.id}Title`))}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4 line-clamp-3" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                    {String(t(`blog.blog${post.id}Excerpt`))}
                  </p>

                  {/* Read More Link */}
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 font-semibold text-xs sm:text-xs md:text-sm lg:text-base hover:gap-3 hover:bg-[#5FAA3F] hover:text-white px-2 py-1 rounded transition-all duration-300 group/link mt-auto text-[#5FAA3F]"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#FFFFFF';
                      const icon = e.currentTarget.querySelector('svg');
                      if (icon) icon.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#5FAA3F';
                      const icon = e.currentTarget.querySelector('svg');
                      if (icon) icon.style.color = '#5FAA3F';
                    }}
                  >
                    <span>{String(t('blog.readMore'))}</span>
                    <Icon name="arrow-right" className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform duration-300" style={{ color: '#5FAA3F' }} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Need Help Section */}
      <NeedHelp />
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, changeLanguage, currentLanguage } = useTranslation();

  const navLinks = [
    { href: '/', label: t('header.home') },
    { href: '/about-us', label: t('header.aboutUs') },
    { href: '/products', label: t('header.products') },
    { href: '/gallery', label: t('header.gallery') },
    { href: '/blog', label: t('header.blog') },
    { href: '/contact-us', label: t('header.contactUs') },
  ];

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'gu', label: 'GU' },
  ];

  return (
    <header className="w-full bg-white backdrop-blur-md border-b border-[#D9D9D9] sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-5 md:px-8 lg:px-8 xl:px-10 2xl:px-12">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20 lg:h-20 xl:h-22 2xl:h-26">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group">
            <Image
              src="/logo.png"
              alt="Giriraj Industries Logo"
              width={600}
              height={180}
              className="py-2 sm:py-3 md:py-4 lg:py-6 h-32 w-auto sm:h-40 md:h-48 lg:h-48 xl:h-56 2xl:h-64 transition-transform duration-300 group-hover:scale-105"
              priority
              style={{ objectFit: 'contain', backgroundColor: 'transparent' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 2xl:space-x-4">
            {navLinks.map((link) => {
              const isContactUs = link.href === '/contact-us';
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-2 py-1.5 xl:px-3 xl:py-2 2xl:px-4 2xl:py-2.5 transition-all duration-300 font-semibold text-sm lg:text-base xl:text-lg 2xl:text-xl group ${
                    isContactUs 
                      ? 'px-3 py-1.5 xl:px-4 xl:py-2 2xl:px-5 2xl:py-2.5 rounded-lg text-white shadow-md hover:shadow-lg transform hover:scale-105' 
                      : 'text-[#1A1A1A]'
                  }`}
                  style={{ 
                    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                    ...(isContactUs && { background: 'linear-gradient(90deg, #5FAA3F, #2E7D32)' })
                  }}
                  onMouseEnter={(e) => {
                    if (!isContactUs) {
                      e.currentTarget.style.color = '#5FAA3F';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isContactUs) {
                      e.currentTarget.style.color = '#1A1A1A';
                    }
                  }}
                >
                  <span className="relative z-10">{link.label}</span>
                  {!isContactUs && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5FAA3F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                  )}
                </Link>
              );
            })}
            
            {/* Language Switcher - Desktop */}
            <div className="flex items-center gap-1 ml-2 xl:ml-3 border-l border-gray-300 pl-2 xl:pl-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`px-2.5 py-1.5 xl:px-3 xl:py-2 rounded-md text-xs xl:text-sm font-semibold transition-all duration-300 min-w-[36px] xl:min-w-[40px] ${
                    currentLanguage === lang.code
                      ? 'bg-[#5FAA3F] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  aria-label={`Switch to ${lang.code === 'en' ? 'English' : 'Gujarati'}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Language Switcher - Mobile (before menu button) */}
          <div className="lg:hidden flex items-center gap-1 mr-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-300 min-w-[32px] ${
                  currentLanguage === lang.code
                    ? 'bg-[#5FAA3F] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                aria-label={`Switch to ${lang.code === 'en' ? 'English' : 'Gujarati'}`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 space-y-1 sm:space-y-1.5 focus:outline-none rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 sm:w-6 sm:h-0.5 bg-gray-800 transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1.5 sm:translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 sm:w-6 sm:h-0.5 bg-gray-800 transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 sm:w-6 sm:h-0.5 bg-gray-800 transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5 sm:-translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col space-y-1 sm:space-y-1.5 md:space-y-2 py-3 sm:py-4 md:py-5 lg:py-6 border-t border-[#D9D9D9] bg-white">
            {navLinks.map((link) => {
              const isContactUs = link.href === '/contact-us';
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`transition-all duration-200 font-semibold text-xs sm:text-sm md:text-base py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 rounded-lg mx-2 sm:mx-3 ${
                    isContactUs 
                      ? 'text-white shadow-md hover:shadow-lg transform hover:scale-105' 
                      : 'text-[#1A1A1A] hover:text-[#5FAA3F] hover:bg-[#F5F5F5]'
                  }`}
                  style={{ 
                    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                    ...(isContactUs && { background: 'linear-gradient(90deg, #5FAA3F, #2E7D32)' })
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            
            {/* Language Switcher - Mobile Menu */}
            <div className="flex items-center justify-center gap-2 px-3 sm:px-4 pt-2 border-t border-gray-200 mt-2">
              <span className="text-xs sm:text-sm text-gray-600 font-medium" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                {t('common.language')}
              </span>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all duration-300 min-w-[40px] ${
                    currentLanguage === lang.code
                      ? 'bg-[#5FAA3F] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
                  aria-label={`Switch to ${lang.code === 'en' ? t('common.english') : t('common.gujarati')}`}
                >
                  {lang.code === 'en' ? t('common.english') : t('common.gujarati')}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}


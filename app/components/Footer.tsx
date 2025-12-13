'use client';

import React from 'react';
import Link from "next/link";
import Icon from "./Icon";
import { useTranslation } from '../hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();
  const navLinks = [
    { href: '/', label: String(t('header.home')) },
    { href: '/about-us', label: String(t('header.aboutUs')) },
    { href: '/products', label: String(t('header.products')) },
    { href: '/gallery', label: String(t('header.gallery')) },
    { href: '/blog', label: String(t('header.blog')) },
    { href: '/contact-us', label: String(t('header.contactUs')) },
  ];

  return (
    <footer className="bg-[#1A1A1A] text-gray-200 pt-6 sm:pt-8 md:pt-10 pb-5 sm:pb-6">
      <div className="container mx-auto px-4 sm:px-5 md:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1.1fr_1.3fr_2.5fr] gap-6 sm:gap-8 md:gap-10">

          {/* About */}
          <div className="space-y-1 sm:space-y-1.5">
            <h3 className="text-sm sm:text-sm md:text-sm lg:text-base font-bold uppercase tracking-wide mb-2 sm:mb-2.5 md:mb-2 pb-1.5 border-b border-dashed border-gray-500 whitespace-nowrap" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
              {String(t('footer.aboutUs'))}
            </h3>
            <p className="text-sm sm:text-xs md:text-sm leading-relaxed text-gray-300">
              {String(t('footer.aboutDescription'))}
            </p>

            {/* Social icons */}
            <div className="flex items-center space-x-2.5 sm:space-x-3 md:space-x-4 lg:space-x-4 mt-4 sm:mt-5 md:mt-6">
              {/* WhatsApp - Clickable */}
              <a 
                href="https://wa.me/919825213536"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-10 lg:h-10 xl:w-12 xl:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-green-600 transition min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 cursor-pointer"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
              {/* Instagram - Clickable */}
              <a 
                href="https://www.instagram.com/giriraj_india/?igsh=Zmp1OWJiejM0Yzdz#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-10 lg:h-10 xl:w-12 xl:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 cursor-pointer"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* LinkedIn - Non-clickable, hover only */}
              <div 
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-10 lg:h-10 xl:w-12 xl:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-blue-700 transition min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 cursor-default"
                aria-label="LinkedIn"
              >
                <Icon name="linkedin" className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6" style={{ filter: 'brightness(0) invert(1)' }} />
              </div>
              {/* YouTube - Non-clickable, hover only */}
              <div 
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-10 lg:h-10 xl:w-12 xl:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-600 transition min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 cursor-default"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-1 sm:space-y-1.5">
            <h3 className="text-sm sm:text-sm md:text-sm lg:text-base font-bold uppercase tracking-wide mb-2 sm:mb-2.5 md:mb-2 pb-1.5 border-b border-dashed border-gray-500 whitespace-nowrap" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
              {String(t('footer.quickLink'))}
            </h3>
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm sm:text-xs md:text-sm text-gray-300 transition-colors duration-200 inline-block py-0.5" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }} onMouseEnter={(e) => e.currentTarget.style.color = '#5FAA3F'} onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Policy */}
          <div className="space-y-1 sm:space-y-1.5">
            <h3 className="text-sm sm:text-sm md:text-sm lg:text-base font-bold uppercase tracking-wide mb-2 sm:mb-2.5 md:mb-2 pb-1.5 border-b border-dashed border-gray-500 whitespace-nowrap" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
              {String(t('footer.companyPolicy'))}
            </h3>
            <ul className="space-y-1">
              <li>
                <a 
                  href="/policy/Quality policy.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm sm:text-xs md:text-sm text-gray-300 transition-colors duration-200 inline-block py-0.5" 
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }} 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#5FAA3F'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}
                >
                  {String(t('footer.qualityPolicy'))}
                </a>
              </li>
              <li>
                <a 
                  href="/policy/SUSTAINABILITY POLICY.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm sm:text-xs md:text-sm text-gray-300 transition-colors duration-200 inline-block py-0.5" 
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }} 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#5FAA3F'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}
                >
                  {String(t('footer.sustainabilityPolicy'))}
                </a>
              </li>
              <li>
                <a 
                  href="/policy/HSE policy.docx.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm sm:text-xs md:text-sm text-gray-300 transition-colors duration-200 inline-block py-0.5" 
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }} 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#5FAA3F'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}
                >
                  {String(t('footer.hsePolicy'))}
                </a>
              </li>
              <li>
                <a 
                  href="/policy/Terms and conditions.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm sm:text-xs md:text-sm text-gray-300 transition-colors duration-200 inline-block py-0.5" 
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }} 
                  onMouseEnter={(e) => e.currentTarget.style.color = '#5FAA3F'} 
                  onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}
                >
                  {String(t('footer.termsAndConditions'))}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-1 sm:space-y-1.5">
            <h3 className="text-sm sm:text-sm md:text-sm lg:text-base font-bold uppercase tracking-wide mb-2 sm:mb-2.5 md:mb-2 pb-1.5 border-b border-dashed border-gray-500 whitespace-nowrap" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
              {String(t('footer.contactUs'))}
            </h3>

            <ul className="space-y-1.5">
              <li className="flex items-start gap-2">
                <Icon name="phone" className="w-5 h-5 sm:w-5 sm:h-5 mt-0.5 shrink-0" style={{ color: '#5FAA3F' }} />
                <div className="space-y-1">
                  <a href="tel:+919825213536" className="text-sm sm:text-xs md:text-sm text-gray-300 transition-colors duration-200 block py-0.5" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }} onMouseEnter={(e) => e.currentTarget.style.color = '#5FAA3F'} onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}>
                    +91 9825213536
                  </a>
                  <a href="tel:+919825213524" className="text-sm sm:text-xs md:text-sm text-gray-300 transition-colors duration-200 block py-0.5" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }} onMouseEnter={(e) => e.currentTarget.style.color = '#5FAA3F'} onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}>
                    +91 9825213524
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <Icon name="map-pin" className="w-5 h-5 sm:w-5 sm:h-5 mt-0.5 shrink-0" style={{ color: '#5FAA3F' }} />
                <div 
                  className="text-sm sm:text-xs md:text-sm text-gray-300 leading-relaxed"
                  style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
                >
                  <a 
                    href="https://maps.app.goo.gl/QNnjn1HHTybCD3oi6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 block py-0.5"
                    onMouseEnter={(e) => e.currentTarget.style.color = '#5FAA3F'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}
                  >
                    {String(t('footer.addressContent'))}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2">
                <Icon name="mail" className="w-5 h-5 sm:w-5 sm:h-5 mt-0.5 shrink-0" style={{ color: '#5FAA3F' }} />
                <a href="mailto:info@girirajco.com" className="text-sm sm:text-xs md:text-sm text-gray-300 transition-colors duration-200 py-0.5" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }} onMouseEnter={(e) => e.currentTarget.style.color = '#5FAA3F'} onMouseLeave={(e) => e.currentTarget.style.color = '#D1D5DB'}>
                  info@girirajco.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 mt-6 sm:mt-8 pt-4 sm:pt-5">
          <div className="flex justify-center items-center">
            <p className="text-gray-400 text-xs sm:text-sm md:text-sm lg:text-base text-center" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
              © 2025 <span className="font-semibold" style={{ color: '#5FAA3F' }}>Giriraj Industries</span>. {String(t('footer.allRightsReserved'))}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

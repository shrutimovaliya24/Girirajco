'use client';

import Icon from './Icon';
import { useTranslation } from '../hooks/useTranslation';

export default function FloatingContactWidget() {
  const { t } = useTranslation();
  const phoneNumber = '919825213536'; // WhatsApp format (no spaces, no +)

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  const handleCallback = () => {
    // Open phone dialer
    window.location.href = `tel:+919825213536`;
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 lg:bottom-6 lg:right-6 z-50 group">
      {/* Chat Icon Button - Green Gradient (Primary) */}
      <div
        className="text-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer backdrop-blur-sm flex items-center justify-center"
        style={{ 
          background: 'linear-gradient(90deg, #5FAA3F, #2E7D32)',
          width: '56px',
          height: '56px',
          minWidth: '56px',
          minHeight: '56px'
        }}
      >
        <Icon name="message-circle" className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} />
      </div>

      {/* Popup on Hover - Modern Round */}
      <div className="absolute bottom-full right-0 mb-2 sm:mb-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 sm:p-2.5 md:p-3 flex flex-col gap-1.5 sm:gap-2 min-w-[120px] sm:min-w-[140px] md:min-w-[160px] backdrop-blur-sm">
          <button
            onClick={handleWhatsApp}
            className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 md:py-2.5 rounded-xl transition-all duration-200 text-left group/item"
            style={{ '--hover-bg': '#F5F5F5' } as React.CSSProperties}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F5F5F5')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Icon name="whatsapp" className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0" style={{ color: '#5FAA3F' }} />
            <span className="text-[10px] sm:text-xs md:text-sm text-gray-700 font-medium">{String(t('floatingWidget.whatsapp'))}</span>
          </button>
          <button
            onClick={handleCallback}
            className="flex items-center gap-2 sm:gap-2.5 px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 md:py-2.5 rounded-xl transition-all duration-200 text-left group/item"
            style={{ '--hover-bg': '#F5F5F5' } as React.CSSProperties}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F5F5F5')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Icon name="phone" className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0" style={{ color: '#5FAA3F' }} />
            <span className="text-[10px] sm:text-xs md:text-sm text-gray-700 font-medium">{String(t('floatingWidget.contact'))}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

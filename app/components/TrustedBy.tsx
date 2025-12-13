'use client';

import Image from 'next/image';
import clientsData from '../../data/clients.json';

export default function TrustedBy() {
  const clients = clientsData;

  return (
    <section className="relative w-full bg-white py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-10">
        {/* Section Title */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6" style={{ color: '#5FAA3F', fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '1.2' }}>
            Trusted By
          </h2>
          <div className="flex justify-center mb-3 sm:mb-4 md:mb-4.5">
            <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400"></div>
          </div>
          <p className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Trusted by leading companies across various industries for reliable heating solutions
          </p>
        </div>

        {/* Clients Grid - 2 Rows: 5 in first, 4 in second (centered) */}
        <div className="max-w-6xl mx-auto">
          {/* First Row - 5 logos */}
          <div className="flex justify-center gap-3 sm:gap-4 md:gap-5 mb-3 sm:mb-4 md:mb-5 flex-wrap">
            {clients.slice(0, 5).map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-lg w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center border-2 border-gray-200 hover:border-[#22c55e] transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 p-3"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('span')) {
                        const fallback = document.createElement('span');
                        fallback.className = 'text-gray-600 text-xs sm:text-sm font-medium';
                        fallback.textContent = client.name;
                        target.style.display = 'none';
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Second Row - 4 logos (centered) */}
          <div className="flex justify-center gap-3 sm:gap-4 md:gap-5 flex-wrap">
            {clients.slice(5, 9).map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-lg w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center border-2 border-gray-200 hover:border-[#22c55e] transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 p-3"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('span')) {
                        const fallback = document.createElement('span');
                        fallback.className = 'text-gray-600 text-xs sm:text-sm font-medium';
                        fallback.textContent = client.name;
                        target.style.display = 'none';
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


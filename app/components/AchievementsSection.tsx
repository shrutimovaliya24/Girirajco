'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiAward, FiCheck, FiShield } from 'react-icons/fi';
import { useTranslation } from '../hooks/useTranslation';
import styles from './AchievementsSection.module.css';

type CardKey = 'iso' | 'ce';

const CARDS: {
  key: CardKey;
  Icon: typeof FiAward;
  image: string;
  imageWidth: number;
  imageHeight: number;
}[] = [
  {
    key: 'iso',
    Icon: FiAward,
    image: '/certificates/iso-9001-certificate-thumb.jpg',
    imageWidth: 1000,
    imageHeight: 1415,
  },
  {
    key: 'ce',
    Icon: FiShield,
    image: '/certificates/ce-compliance-certificate.jpeg',
    imageWidth: 1131,
    imageHeight: 1600,
  },
];

const POINTS = ['point1', 'point2', 'point3'] as const;
const poppins = { fontFamily: 'var(--font-poppins), Poppins, sans-serif' };
const inter = { fontFamily: 'var(--font-inter), Inter, sans-serif' };

export default function AchievementsSection() {
  const { t } = useTranslation();
  const tr = (key: string) => String(t(`achievements.${key}`));

  return (
    <section className={styles.section} aria-labelledby="achievements-heading">
      <div className={`${styles.inner} container mx-auto px-5 sm:px-6 md:px-10 xl:px-12 2xl:px-16`}>
        {/* Section title — same style as About Us */}
        <div className="text-center mb-6 md:mb-10">
          <h2 id="achievements-heading" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-2.5 md:mb-3" style={{ color: '#5FAA3F', ...poppins, lineHeight: '1.2' }}>
            {tr('eyebrow')}
          </h2>
          <div className="flex justify-center mb-3 md:mb-4">
            <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-32 h-0.5 sm:h-1 bg-yellow-400"></div>
          </div>
          <p className={`${styles.heading} font-semibold text-gray-900 max-w-3xl mx-auto`} style={poppins}>
            {tr('titleStart')} <span className={styles.highlightGreen}>{tr('titleQuality')}</span> {tr('titleMid')}{' '}
            <span className={styles.highlightOrange}>{tr('titleStandards')}</span>
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 list-none p-0 m-0">
          {CARDS.map(({ key, Icon, image, imageWidth, imageHeight }) => (
            <li key={key} className="flex">
              <article className={`${styles.card} w-full`}>
                <div className="flex items-center gap-4 mb-5">
                  <span className={styles.iconBadge} aria-hidden="true">
                    <Icon size={26} />
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight" style={poppins}>
                      {tr(`${key}.title`)}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-[#2E7D32] mt-0.5" style={inter}>
                      {tr(`${key}.subtitle`)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center mb-5">
                  <div className={styles.preview}>
                    <Image
                      src={image}
                      alt={tr(`${key}.previewAlt`)}
                      width={imageWidth}
                      height={imageHeight}
                      sizes="(min-width: 1280px) 320px, (min-width: 768px) 280px, 280px"
                      quality={90}
                      className={styles.previewImg}
                    />
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-5" style={inter}>
                  {tr(`${key}.descriptionLead`)}{tr(`${key}.descriptionBold`)}{tr(`${key}.descriptionTail`)}
                </p>

                <ul className="list-none p-0 m-0 space-y-2.5">
                  {POINTS.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm sm:text-base font-medium text-gray-900" style={inter}>
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#2E7D32] text-white" aria-hidden="true">
                        <FiCheck size={13} strokeWidth={3} />
                      </span>
                      <span>{tr(`${key}.${p}`)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>

        <div className="text-center mt-8 md:mt-10">
          <Link href="/contact-us" className={`${styles.cta} ${styles.focusable} w-full sm:w-auto`} style={poppins}>
            {tr('cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}

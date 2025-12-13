'use client';

import { useTranslation as useReactI18nextTranslation } from 'react-i18next';

export function useTranslation() {
  const { t, i18n } = useReactI18nextTranslation('common');
  
  return {
    t: (key: string, options?: any) => {
      // Keys can be accessed directly like 'testimonials.title' or 'hero.title'
      // The 'common' namespace is already set as default
      return t(key, options);
    },
    i18n,
    changeLanguage: i18n.changeLanguage.bind(i18n),
    currentLanguage: i18n.language,
  };
}


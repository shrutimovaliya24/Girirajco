import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en.json';
import guTranslations from './locales/gu.json';

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    // Fallback language
    fallbackLng: 'en',
    
    // Supported languages
    supportedLngs: ['en', 'gu'],
    
    // Resources with translations
    resources: {
      en: {
        common: enTranslations,
      },
      gu: {
        common: guTranslations,
      },
    },
    
    // Namespace configuration
    ns: ['common'],
    defaultNS: 'common',
    
    // Options
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // Detection options
    detection: {
      // Order and from where user language should be detected
      order: ['localStorage', 'navigator', 'htmlTag'],
      
      // Keys or params to lookup language from
      lookupLocalStorage: 'i18nextLng',
      
      // Cache user language on
      caches: ['localStorage'],
    },
    
    // React specific options
    react: {
      useSuspense: false, // Set to false for Next.js compatibility
    },
  });

export default i18n;


import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import es from './es/es.json';
import en from './en/en.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'es',
  fallbackLng: 'es',
  resources: {
    es: {
      translation: es,
    },
    en: {
      translation: en,
    },
  },
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

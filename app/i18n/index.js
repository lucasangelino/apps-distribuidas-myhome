import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import es from './es/es.json';
import en from './en/en.json';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';

i18next
  .use(initReactI18next)
  .use(RNLanguageDetector)
  .init({
    compatibilityJSON: 'v3',
    supportedLngs: ['es', 'en'],
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

export default i18next;

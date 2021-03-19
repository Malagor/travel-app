import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en/translation.json';
import ru from './locales/ru/translation.json';
import be from './locales/be/translation.json';

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  be: {
    translation: be,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

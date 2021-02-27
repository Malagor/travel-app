import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANGUAGE } from './appConstants/general';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      'Error Message':
        'The data was lost somewhere and we sent a lifeguard to search for it.',
      'Theme toggle': 'Theme toggle',
    },
  },
  ru: {
    translation: {
      'Error Message':
        'Данные где-то потерялись и мы выслали спасателя на их поиски.',
      'Theme toggle': 'Переключить тему',
    },
  },
  be: {
    translation: {
      'Error Message':
        'Данныя дзесьці згубіліся і мы выслалі выратавальніка на іх пошукі.',
      'Theme toggle': 'Змяніць тэму',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: DEFAULT_LANGUAGE,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

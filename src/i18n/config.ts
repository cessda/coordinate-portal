import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation from './en/translation.json';

export const resources = {
  en: {
    translation,
  }
};

i18n.use(initReactI18next).init({
  lng: 'en',
  debug: false,
  resources,
  returnNull: false,
  fallbackLng: 'en'
});

export default i18n;

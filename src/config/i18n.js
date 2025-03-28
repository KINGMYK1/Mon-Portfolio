import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; 
import enTranslation from '../locales/en/translation.json';
import frTranslation from '../locales/fr/translation.json';

const resources = {
  en: { translation: enTranslation },
  fr: { translation: frTranslation },
};

i18n
  .use(LanguageDetector)  // Détecte la langue du navigateur
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // Langue par défaut
    detection: {
      order: ['navigator', 'localStorage', 'querystring'],
      caches: ['localStorage'], // Sauvegarde la langue choisie
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

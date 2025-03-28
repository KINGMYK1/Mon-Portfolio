import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import enTranslations from '../locales/en/translation.json';
import frTranslations from '../locales/fr/translation.json';

const translations = {
  en: enTranslations,
  fr: frTranslations,
};

const useTranslation = () => {
  const { language } = useContext(LanguageContext);

  // Vérifie si la langue est supportée
  const currentTranslations = translations[language] || translations.en;

  // Fonction pour récupérer une traduction par clé
  const translate = (key) => {
    const keys = key.split('.');
    return keys.reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : null), currentTranslations);
  };

  return translate;
};

export default useTranslation;
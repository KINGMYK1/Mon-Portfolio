import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import enTranslations from '../locales/en/pages.json';
import frTranslations from '../locales/fr/pages.json';

const translations = {
  en: enTranslations,
  fr: frTranslations,
};

const useTranslation = () => {
  const { language } = useContext(LanguageContext);
  return translations[language];
};

export default useTranslation;
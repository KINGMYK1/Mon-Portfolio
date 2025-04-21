/* eslint-disable no-unused-vars */

import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Restaurer la langue depuis localStorage ou utiliser "en" par défaut
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'fr' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage); // Sauvegarder dans localStorage
  };

  useEffect(() => {
    localStorage.setItem('language', language); // Sauvegarder à chaque changement
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLanguage = () => useContext(LanguageContext);
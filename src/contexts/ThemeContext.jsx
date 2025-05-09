/* eslint-disable no-unused-vars */
import React, { useState, createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Restaurer le thème depuis localStorage ou utiliser "dark" par défaut
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Sauvegarder dans localStorage
  };

  useEffect(() => {
    document.body.className = theme; // Appliquer la classe du thème au body
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Removed useTheme hook to comply with Fast Refresh requirements.
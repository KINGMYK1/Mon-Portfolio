/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AppRoutes from './routes/AppRoutes';
import Starfield from './components/background/Starfield';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { initEmailJS } from './services/emailService';
import './styles/theme.css';

function App() {
  useEffect(() => {
    // Initialiser EmailJS au démarrage de l'application
    initEmailJS();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider  >
        <LanguageProvider>
          {/* Le background animé sera en bas grâce à son z-index négatif */}
          <Starfield />
          <Layout>
            <AppRoutes />
          </Layout>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AppRoutes from './routes/AppRoutes';
import Starfield from './components/background/Starfield'; // ton background animé
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import './styles/theme.css'; // Importer le fichier CSS des thèmes

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
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
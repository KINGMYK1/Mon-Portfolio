/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useRef } from 'react';
import useTheme from '../../../hooks/useTheme';
import { useLanguage } from '../../../contexts/LanguageContext';
import useTranslation from '../../../hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';
import { Cog6ToothIcon, GlobeAltIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { FaRobot } from "react-icons/fa";
import './Header.css';
import '../../../styles/animations.css';
import AIAssistant from '../../ui/AIAssistant/AIAssistant';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { toggleLanguage } = useLanguage();
  const t = useTranslation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const settingsRef = useRef(null);
  
  React.useEffect(() => {
    document.body.className = theme; // Appliquer la classe du thème au body
  }, [theme]);

  const handleSettingsClick = (event) => {
    event.stopPropagation();
    setIsSettingsOpen(prev => !prev);
    console.log(`Menu paramètres ${!isSettingsOpen ? 'ouvert' : 'fermé'} par clic`);
  };

  const handleClickOutside = (event) => {
    if (settingsRef.current && !settingsRef.current.contains(event.target)) {
      setIsSettingsOpen(false);
      console.log('Menu paramètres fermé par clic en dehors');
    }
  };

  const handleAIAssistantToggle = () => {
    setIsAIAssistantOpen(prev => !prev);
    // Fermer le menu des paramètres si ouvert
    if (isSettingsOpen) setIsSettingsOpen(false);
  };

  useEffect(() => {
    if (isSettingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSettingsOpen]);

  const menuVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0, transition: { duration: 0.3 } }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0, x: 0, y: 0 },
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      x: custom.x,
      y: custom.y,
      transition: { delay: custom.delay, duration: 0.3 }
    }),
    exit: { opacity: 0, scale: 0, x: 0, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <header className="header fade-in">
      <div className="header-title">Mohamed Yehiya Koïta</div>

      <div className="header-settings">
        <Cog6ToothIcon 
          onClick={handleSettingsClick} 
          className="settings-icon" 
          title={t('header.settings', 'Paramètres')}
        />
        <AnimatePresence>
          {isSettingsOpen && (
            <motion.div
              ref={settingsRef}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              className="settings-menu slide-in"
              style={{ zIndex: 3 }}
            >
              <motion.div
                custom={{ x: -170, y: -20, delay: 0.1 }}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={iconVariants}
                className="settings-option settings-option-lang"
                onClick={toggleLanguage}
              >
                <GlobeAltIcon 
                  className="settings-icon" 
                  title={t('header.language', 'Changer la langue')}
                />
              </motion.div>
              <motion.div
                custom={{ x: -85, y: 65, delay: 0.2 }}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={iconVariants}
                className="settings-option settings-option-theme"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? (
                  <SunIcon 
                    className="settings-icon" 
                    title={t('header.theme.dark', 'Mode clair')} 
                  />
                ) : (
                  <MoonIcon 
                    className="settings-icon" 
                    title={t('header.theme.light', 'Mode sombre')} 
                  />
                )}
              </motion.div>
              <motion.div
                custom={{ x: -155, y: 40, delay: 0.3 }}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={iconVariants}
                className="settings-option settings-option-robot"
                onClick={handleAIAssistantToggle}
              >
                <FaRobot 
                  className="settings-icon" 
                  title={t('header.assistant', 'Assistant IA')} 
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Assistant IA */}
      <AIAssistant isOpen={isAIAssistantOpen} onClose={() => setIsAIAssistantOpen(false)} />
    </header>
  );
};

export default Header;
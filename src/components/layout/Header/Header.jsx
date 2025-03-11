import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLanguage } from '../../../contexts/LanguageContext';
import useTranslation from '../../../hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';
import { Cog6ToothIcon, GlobeAltIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { FaRobot } from "react-icons/fa";
import './Header.css';
import '../../../styles/animations.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { toggleLanguage } = useLanguage();
  const t = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleSettingsClick = (event) => {
    event.stopPropagation(); // Empêche la propagation de l'événement
    setIsMenuOpen(!isMenuOpen);
    console.log(`Menu ${!isMenuOpen ? 'ouvert' : 'fermé'} par clic sur l'icône des paramètres`);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
      console.log('Menu fermé par clic en dehors du menu');
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

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
      <div className="header-center"></div>
      <div className="header-settings">
        <Cog6ToothIcon onClick={handleSettingsClick} className="settings-icon" />
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
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
                <GlobeAltIcon className="settings-icon" />
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
                  <SunIcon className="settings-icon" />
                ) : (
                  <MoonIcon className="settings-icon" />
                )}
              </motion.div>
              <motion.div
                custom={{ x: -155, y: 40, delay: 0.3 }}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={iconVariants}
                className="settings-option settings-option-robot"
              >
                <FaRobot className="settings-icon" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
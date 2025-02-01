import { useState } from 'react';
// import PropTypes from 'prop-types';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLanguage } from '../../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import './Header.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSettingsClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <header className="header">
      <div className="header-title">Mohamed Yehiya Koïta</div>
      <div className="header-center"></div>
      <div className="header-settings">
        <Cog6ToothIcon onClick={handleSettingsClick} className="settings-icon" />
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              className="settings-menu"
              style={{ zIndex: 3 }}
            >
              <button onClick={toggleLanguage} className="settings-option">
                Change Language
              </button>
              <button onClick={toggleTheme} className="settings-option">
                Toggle Theme
              </button>
              <button className="settings-option">
                AI Assistant
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

Header.propTypes = {};

export default Header;
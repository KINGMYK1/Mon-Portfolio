import React from 'react';
import useTranslation from '../../hooks/useTranslation';
import './Home.css';
import { motion } from 'framer-motion';
import { AiFillGithub, AiOutlineMail, AiOutlineLinkedin, AiOutlineInstagram, AiOutlineCode, AiOutlineDotNet } from 'react-icons/ai';
import { FaWhatsapp, FaMobileAlt, FaLaptopCode, FaDatabase } from 'react-icons/fa';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const textItemVariants = (direction) => {
  let initial;
  switch (direction) {
    case 'left':
      initial = { opacity: 0, x: -50 };
      break;
    case 'top':
      initial = { opacity: 0, y: -50 };
      break;
    default:
      initial = { opacity: 0 };
  }
  return {
    hidden: initial,
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 1 } },
  };
};

const imageVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.2 } },
};

const Home = () => {
  const t = useTranslation();

  const greetingText = t('home.greeting') || "Hello, I am";
  const nameText = t('home.name') || "Your Name";

  const isMobile = window.innerWidth <= 768;
  const textDirection = isMobile ? 'top' : 'left';

  return (
    <motion.div
      className="home"
      id="home"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
    >
      <motion.div variants={textItemVariants(textDirection)} className="home-content">
        <motion.h3 variants={textItemVariants(textDirection)}>{greetingText}</motion.h3>
        <motion.h1 variants={textItemVariants(textDirection)}>{nameText}</motion.h1>
        <motion.p variants={textItemVariants(textDirection)}>{t('home.bio1')}</motion.p>
        <motion.p variants={textItemVariants(textDirection)}>{t('home.bio2')}</motion.p>

        <motion.div variants={textItemVariants(textDirection)} className="social-media">
          <a href="https://github.com/votrePseudo" className="social-icon" target="_blank" rel="noopener noreferrer">
            <AiFillGithub />
          </a>
          <a href="mailto:email@example.com" className="social-icon">
            <AiOutlineMail />
          </a>
          <a href="https://www.linkedin.com/in/votreProfil" className="social-icon" target="_blank" rel="noopener noreferrer">
            <AiOutlineLinkedin />
          </a>
          <a href="https://www.instagram.com/votreProfil" className="social-icon" target="_blank" rel="noopener noreferrer">
            <AiOutlineInstagram />
          </a>
          <a href="https://wa.me/votreNumero" className="social-icon" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
          </a>
        </motion.div>

        <motion.a
          variants={textItemVariants(textDirection)}
          href="/CV.pdf"
          className="btn"
          download
        >
          Download CV
        </motion.a>
      </motion.div>

      <motion.div variants={imageVariants} className="home-img">
        <img src="/Profil.png" alt="Home" loading="eager" />
      </motion.div>

      <div className="profession-container">
        <div className="profession-box">
          <div className="profession" style={{ '--i': 0 }}>
            <AiOutlineCode className="profession-icon" />
            <h3>Web Developer</h3>
          </div>
          <div className="profession" style={{ '--i': 1 }}>
            <FaMobileAlt className="profession-icon"  />
            <h3>Mobile Developer</h3>
          </div>
          <div className="profession" style={{ '--i': 2 }}>
            <AiOutlineDotNet className="profession-icon" />
            <h3>.Net Developer</h3>

          </div>
          <div className="profession" style={{ '--i': 3 }}>
            <FaLaptopCode className="profession-icon" />
            <h3>Full Stack Dev</h3>
          </div>
          <div className="circle"></div>
        </div>
        <div className="overlay"></div>
      </div>
    </motion.div>
  );
};

export default Home;

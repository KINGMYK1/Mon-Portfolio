import React from 'react';
import useTranslation from '../../hooks/useTranslation';
import './Home.css';
import { motion } from 'framer-motion';
import { AiOutlineFacebook, AiOutlineTwitter, AiOutlineInstagram, AiOutlineLinkedin } from 'react-icons/ai';
import { AiOutlineCode, AiOutlineCamera, AiOutlineVideoCamera } from 'react-icons/ai';

const Home = () => {
  const t = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}    // état initial (invisible, décalé)
      animate={{ opacity: 1, x: 0 }}      // état final (visible, position normale)
      exit={{ opacity: 0, x: -100 }}      // état lors de la sortie (part vers la gauche)
      transition={{ duration: 2.5 }}      // durée de l’animation
      className="home"
      id="home"
    >
      <div className="home-content">
        <h3>Hello, I am</h3>
        <h1>Cristian Chiriac</h1>
        <p>
          I'm a web developer who loves to create beautiful and functional websites
          for people who want to make a difference in the world.
        </p>
        <p>Currently I'm a student of The Jump Digital School, where I'm learning how to
          create beautiful and functional websites using HTML, CSS, JavaScript, and WordPress.
        </p>

        <div className="social-media">
          <a href="#"><AiOutlineFacebook /></a>
          <a href="#"><AiOutlineTwitter /></a>
          <a href="#"><AiOutlineInstagram /></a>
          <a href="#"><AiOutlineLinkedin /></a>
        </div>

        <a href="#" className="btn">Download CV</a>
      </div>

      <div className="profession-container">
        <div className="profession-box">
          <div className="profession" style={{ '--i': 0 }}>
            <AiOutlineCode className="profession-icon" />
            <h3>Web Developer</h3>
          </div>
          <div className="profession" style={{ '--i': 1 }}>
            <AiOutlineCamera className="profession-icon" />
            <h3>Mobile Developer</h3>
          </div>
          <div className="profession" style={{ '--i': 2 }}>
            <AiOutlineCamera className="profession-icon" />
            <h3>Web Designer</h3>
          </div>
          <div className="profession" style={{ '--i': 3 }}>
            <AiOutlineVideoCamera className="profession-icon" />
            <h3>Videographer</h3>
          </div>

          <div className="circle"></div>
        </div>

        <div className="overlay"></div>
      </div>

      <div className="home-img">
        {/* <img src="../../../public/home.png" alt="Home" /> */}
      </div>
    </motion.div>
  );
};

export default Home;
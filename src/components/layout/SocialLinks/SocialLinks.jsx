// filepath: c:\Users\Mohamed\Desktop\Mon-Portfolio\src\components\shared\SocialLinks.jsx
import React from "react";
import { AiFillGithub, AiOutlineMail, AiOutlineLinkedin, AiOutlineInstagram } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import './SocialLinks.css'
const SocialLinks = () => {
  return (
    <div className="social-links  ">
      <a href="https://github.com/MYK-OTAKU" className="social-icon" target="_blank" rel="noopener noreferrer">
        <AiFillGithub size={30} />
      </a>
      <a href="mailto:mohamedyehiyakoita@gmail.com" className="social-icon">
        <AiOutlineMail size={30} />
      </a>
      <a href="https://www.linkedin.com/in/mohamed-yehiya-koita" className="social-icon" target="_blank" rel="noopener noreferrer">
        <AiOutlineLinkedin size={30} />
      </a>
      <a href="https://www.instagram.com/mohamed_yehiya_koita/" className="social-icon" target="_blank" rel="noopener noreferrer">
        <AiOutlineInstagram size={30} />
      </a>
      <a href="https://wa.me/+2120620836989" className="social-icon" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp size={30} />
      </a>
    </div>
  );
};

export default SocialLinks;
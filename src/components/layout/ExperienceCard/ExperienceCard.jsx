import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import  useTheme  from "./../../../hooks/useTheme";

import "./ExperienceCard.css";
import useTranslation from './../../../hooks/useTranslation';

const ExperienceCard = ({ 
  title, 
  companyName, 
  duration, 
  description, 
  media, 
  mediaType = "image", 
  link 
}) => {
  const navigate = useNavigate();
  const t = useTranslation();
  const { theme } = useTheme();

  return (
    <motion.div
      className={`experience-card ${theme}`}
      onClick={() => navigate(link)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background media (image ou vidéo) */}
      <div className="media-container">
        {mediaType === "video" ? (
          <video 
            className="background-media"
            src={media}
            autoPlay
            loop
            muted
            playsInline
            
            preload="metadata"
          />
        ) : (
          <img 
            className="background-media"
            src={media}
            alt={title} 
          />
        )}
      </div>
      
      {/* Informations toujours visibles */}
      <div className="experience-info">
        <h3 className="experience-title">{title}</h3>
        <p className="experience-company">{companyName}</p>
        <span className="experience-duration">{duration}</span>
      </div>

      {/* Overlay qui s'affiche au survol */}
      <motion.div
        className="experience-overlay"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="overlay-content">
          <p className="experience-description">{description}</p>
          <button
            className="experience-button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(link);
            }}
          >
            {t("experience.learnMore")}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};



export default ExperienceCard;
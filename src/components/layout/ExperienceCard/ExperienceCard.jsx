import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./ExperienceCard.css";
import PropTypes from "prop-types";
import useTranslation from "../../../hooks/useTranslation";
// import OptimizedVideo from "../../ui/OptimizedVideo/OptimizedVideo";
import OptimizedImage from "../../ui/OptimizedImage/OptimizedImage";

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
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslation();

  // Gère le clic sur mobile ou le survol sur desktop
  const handleInteraction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Sur mobile, inverser l'état d'affichage de l'overlay
    setIsHovered(!isHovered);
  };

  // Navigation seulement quand on clique sur le bouton "En savoir plus"
  const handleNavigate = (e) => {
    e.stopPropagation();
    navigate(link);
  };

  return (
    <motion.div
      className="experience-card"
      onClick={handleInteraction}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.8 }}
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
           />
         ) : (
           <OptimizedImage 
             src={media}
             alt={title} 
             className="background-media"
           />
         )}
      </div>
      
      {/* Informations toujours visibles (affichées par défaut) */}
      <div className="experience-info">
        <h3 className="experience-title">{title}</h3>
        <p className="experience-company">{companyName}</p>
        <span className="experience-duration">{duration}</span>
      </div>

      {/* Overlay qui s'affiche au survol sur desktop ou au tap sur mobile */}
      <motion.div
        className="experience-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="overlay-content">
          <p className="experience-description">{description}</p>
          <button
            className="experience-button"
            onClick={handleNavigate}
          >
            {/* En savoir plus */}
            {t("experience.learnMore", "learn More")}

          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
ExperienceCard.propTypes = {
  title: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  media: PropTypes.string.isRequired,
  mediaType: PropTypes.oneOf(["image", "video"]),
  link: PropTypes.string.isRequired,
};

export default ExperienceCard;
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./ExperienceCard.css";

const ExperienceCard = ({ title, companyName, duration, description, image, link }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="experience-card"
      style={{ backgroundImage: `url(${image})` }}
      onClick={() => navigate(link)}
      whileHover={{ scale: 1.0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Informations toujours visibles (affichées par défaut) */}
      <div className="experience-info">
        <h className="experience-title">{title}</h>
        <p className="experience-company">{companyName}</p>
        <span className="experience-duration">{duration}</span>
      </div>

      {/* Overlay qui s'affiche au survol */}
      <motion.div
        className="experience-overlay"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
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
            En savoir plus
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceCard;

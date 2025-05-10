// ProjectCard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import useTranslation from "../../hooks/useTranslation";

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslation();
  
  // Gère le clic sur mobile ou le survol sur desktop
  const handleInteraction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Sur mobile, inverser l'état d'affichage de l'overlay
    setIsHovered(!isHovered);
  };

  return (
    <motion.div
      className="project-box"
      onClick={handleInteraction}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="project-image-container">
        <img
          src={project.image}
          alt={t(project.titleKey)}
          className="project-image"
        />
      </div>
      
      {/* Titre visible par défaut */}
      <div className="project-info">
        <h3 className="project-title">{t(project.titleKey)}</h3>
        <div className="project-tech">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>
      
      {/* Overlay qui apparaît au survol/clic */}
      <motion.div
        className="project-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="overlay-content">
          <h4 className="project-overlay-title">
            {t(project.titleKey)}
          </h4>
          <p className="project-description">
            {t(project.descriptionKey)}
          </p>
          <div className="project-actions">
            {project.link && project.link !== "https://github.com/MYK-OTAKU/" && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub className="project-icon" />
              </a>
            )}
            <Link
              to={project.detailsPage}
              className="details-button"
              onClick={(e) => e.stopPropagation()}
            >
              {t("projects.viewDetails", "Voir les détails")}
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
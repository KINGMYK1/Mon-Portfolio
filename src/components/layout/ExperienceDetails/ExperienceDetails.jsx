import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import useTranslation from "../../../hooks/useTranslation";
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
import OptimizedImage from "../../ui/OptimizedImage/OptimizedImage";
import OptimizedVideo from "../../ui/OptimizedVideo/OptimizedVideo";
import "./ExperienceDetails.css";

// Données des expériences professionnelles
const experienceData = [
  {
    id: "freelance",
    titleKey: "experience.freelance.title",
    companyKey: "experience.freelance.company",
    locationKey: "experience.freelance.location",
    dateStartKey: "experience.freelance.dateStart",
    dateEndKey: "experience.freelance.dateEnd",
    descriptionKey: "experience.freelance.description",
    detailsKey: "experience.freelance.details",
    tasksKey: "experience.freelance.tasks",
    skills: ["React", "Angular", "Node.js", "MongoDB"],
    media: [
      { type: "image", src: "/experiences/freelance1.jpg" },
      { type: "image", src: "/experiences/freelance2.jpg" }
    ],
    projectLink: "/projects/5" // Lien vers le projet correspondant
  },
  {
    id: "digicard-mobile",
    titleKey: "experience.digicard.title",
    companyKey: "experience.digicard.company",
    locationKey: "experience.digicard.location",
    dateStartKey: "experience.digicard.dateStart",
    dateEndKey: "experience.digicard.dateEnd",
    descriptionKey: "experience.digicard.description",
    detailsKey: "experience.digicard.details",
    tasksKey: "experience.digicard.tasks",
    skills: ["React Native", "JavaScript", "Node.js", "REST API"],
    media: [
      { type: "video", src: "/text.mp4", poster: "/experiences/digicard-poster.jpg" },
      { type: "image", src: "/experiences/digicard1.jpg" }
    ],
    projectLink: "/projects/4"
  }
];

const ExperienceDetails = () => {
  const { id } = useParams();
  const t = useTranslation();
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const experience = experienceData.find(exp => exp.id === id);

  useEffect(() => {
    // Remonter en haut de la page lors du chargement
    window.scrollTo(0, 0);
  }, []);

  if (!experience) {
    return (
      <div className="not-found-container">
        <h2>{t("experience.notFound") || "Expérience non trouvée"}</h2>
        <Link to="/AboutMe" className="back-link">
          <FaArrowLeft /> {t("buttons.backToExperiences") || "Retour aux expériences"}
        </Link>
      </div>
    );
  }

  const handleNextMedia = () => {
    setCurrentMediaIndex((prev) => 
      prev === experience.media.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prev) => 
      prev === 0 ? experience.media.length - 1 : prev - 1
    );
  };

  // Formatage des détails avec paragraphes
  const formatText = (text) => {
    if (!text) return "";
    return text.split('\n').map((paragraph, i) => (
      <p key={i} className="text-paragraph">{paragraph}</p>
    ));
  };

  return (
    <div className="experience-details-container">
      {/* En-tête avec bouton retour */}
      <div className="exp-header">
        <Link to="/AboutMe" className="back-button">
          <FaArrowLeft className="back-icon" />
          <span>{t("buttons.back") || "Retour"}</span>
        </Link>
      </div>

      {/* Informations principales */}
      <motion.div 
        className="exp-main-info"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="exp-title">{t(experience.titleKey)}</h1>
        
        <div className="exp-meta">
          <div className="exp-meta-item">
            <FaBuilding className="exp-meta-icon" />
            <span>{t(experience.companyKey)}</span>
          </div>
          
          <div className="exp-meta-item">
            <FaMapMarkerAlt className="exp-meta-icon" />
            <span>{t(experience.locationKey)}</span>
          </div>
          
          <div className="exp-meta-item">
            <FaCalendarAlt className="exp-meta-icon" />
            <span>
              {t(experience.dateStartKey)} - {t(experience.dateEndKey)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Corps de l'expérience */}
      <div className="exp-body">
        {/* Colonne gauche : Médias */}
        <motion.div 
          className="exp-media-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="exp-media-container">
            {experience.media[currentMediaIndex].type === "video" ? (
              <OptimizedVideo 
                src={experience.media[currentMediaIndex].src} 
                poster={experience.media[currentMediaIndex].poster}
                className="exp-media" 
              />
            ) : (
              <OptimizedImage 
                src={experience.media[currentMediaIndex].src} 
                alt={t(experience.titleKey)} 
                className="exp-media" 
              />
            )}
            
            {experience.media.length > 1 && (
              <div className="media-navigation">
                <button className="media-nav-btn prev" onClick={handlePrevMedia}>
                  <FaArrowLeft />
                </button>
                <div className="media-indicators">
                  {experience.media.map((_, idx) => (
                    <button 
                      key={idx} 
                      className={`media-indicator ${idx === currentMediaIndex ? 'active' : ''}`}
                      onClick={() => setCurrentMediaIndex(idx)}
                    ></button>
                  ))}
                </div>
                <button className="media-nav-btn next" onClick={handleNextMedia}>
                  <FaArrowLeft style={{ transform: 'rotate(180deg)' }} />
                </button>
              </div>
            )}
          </div>
        </motion.div>
        
        {/* Colonne droite : Description et tâches */}
        <motion.div 
          className="exp-content-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="exp-description">
            <h2 className="section-title">{t("experience.overview")}</h2>
            <div className="exp-description-text">
              {formatText(t(experience.detailsKey))}
            </div>
          </div>
          
          <div className="exp-tasks">
            <h2 className="section-title">{t("experience.responsibilities")}</h2>
            <ul className="tasks-list">
              {t(experience.tasksKey, { returnObjects: true }).map((task, idx) => (
                <li key={idx} className="task-item">
                  <span className="task-bullet">•</span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="exp-skills">
            <h2 className="section-title">{t("experience.skillsUsed")}</h2>
            <div className="skills-tags">
              {experience.skills.map((skill, idx) => (
                <span key={idx} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          
          {experience.projectLink && (
            <div className="exp-project-link">
              <h2 className="section-title">{t("experience.relatedProject")}</h2>
              <Link to={experience.projectLink} className="project-link-btn">
                {t("experience.viewProject")}
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ExperienceDetails;
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import useTranslation from "../../../hooks/useTranslation";
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaArrowLeft } from "react-icons/fa";
import  OptimizedImage  from "../../ui/OptimizedImage/OptimizedImage";
import "./ProjectDetails.css";

// Mise à jour des données de projet avec les chemins des captures d'écran
const projectsData = [
  {
    id: 1,
    titleKey: "projects.project1.title",
    descriptionKey: "projects.project1.description",
    detailsKey: "projects.project1.details",
    link: "https://github.com/MYK-OTAKU/MyNewApp",
    demoLink: "", // Vide s'il n'y a pas de démo en ligne
    screenshots: [
      "/RMSW/login-preview.PNG", 
      "/RMSW/produit.PNG"
    ],
    technologies: ["Angular", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    titleKey: "projects.project2.title",
    descriptionKey: "projects.project2.description",
    detailsKey: "projects.project2.details",
    link: "https://github.com/MYK-OTAKU/Restaurent-Management-system",
    demoLink: "",
    screenshots: [
      "/RMSD/dashboard (1).png",
      "/RMSD/DASHBORD (1).png",
      "/RMSD/cuisine (1).png",
      "/RMSD/cuisine (2).png",
      "/RMSD/ERRER (1).png",
      "/RMSD/fact.png"
    ],
    technologies: ["C#", "SQL Server", ".NET Framework"]
  },
  {
    id: 3,
    titleKey: "projects.project3.title",
    descriptionKey: "projects.project3.description",
    detailsKey: "projects.project3.details",
    link: "https://github.com/MYK-OTAKU/",
    demoLink: "",
    screenshots: [
      "/Pharma/screen1.png",
      "/Pharma/screen10.png",
      "/Pharma/screen11.png",
      "/Pharma/screen12.png",
      "/Pharma/screen13.png",
      "/Pharma/screen14.png",
      "/Pharma/screen15.png"
    ],
    technologies: ["WordPress", "Elementor"],  // Correction des technologies

  },
  {
    id: 4,
    titleKey: "projects.project4.title",
    descriptionKey: "projects.project4.description",
    detailsKey: "projects.project4.details",
    link: "https://github.com/MYK-OTAKU/",
    demoLink: "",
    screenshots: [
      "/OtakuWorld/OtakuWorld.png",
      "/OtakuWorld/OtakuWorld2.png"
    ],
    technologies: ["Html", 'Javascript' ,"Tailwind CSS"]
  },
  {
    id: 5,
    titleKey: "projects.project5.title",
    descriptionKey: "projects.project5.description",
    detailsKey: "projects.project5.details",
    link: "https://github.com/KINGMYK1/Mon-Portfolio",
    demoLink: "", // À remplir si vous avez un lien de démo
    screenshots: [
      "/Portfolio/portfolio-preview.png",
      "/Portfolio/portfolio-about.png",
      "/Portfolio/portfolio-projects.png",
      "/Portfolio/portfolio-contact.png"
    ],
    technologies: ["React", "Framer Motion", "CSS"]
  }

];

const ProjectDetails = () => {
  const { id } = useParams();
  const t = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const project = projectsData.find((p) => p.id === parseInt(id));

  // Préchargement des images du carousel
  useEffect(() => {
    if (project) {
      // Préchargement des images du carousel après chargement de l'image actuelle
      const currentImg = new Image();
      currentImg.src = project.screenshots[currentIndex];
      
      currentImg.onload = () => {
        // Précharger la prochaine image en arrière-plan
        const nextIndex = (currentIndex + 1) % project.screenshots.length;
        const nextImg = new Image();
        nextImg.src = project.screenshots[nextIndex];
      };
    }
  }, [project, currentIndex]);

  // Défilement automatique du carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (project && project.screenshots.length > 1) {
        setCurrentIndex((prevIndex) =>
          prevIndex === project.screenshots.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [project]);

  if (!project) {
    return <div className="not-found">{t("projects.notFound")}</div>;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === project.screenshots.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? project.screenshots.length - 1 : prevIndex - 1
    );
  };

  // Ajoutez ceci pour formater correctement le détail du projet
  const formatProjectDetails = (details) => {
    if (!details) return "";
    return details.split('\n').map((paragraph, i) => (
      <p key={i} className="details-paragraph">{paragraph}</p>
    ));
  };

  return (
    <div className="project-details">
      {/* Bouton Retour */}
      <div className="back-button-container">
        <Link to="/projects" className="back-button">
          <FaArrowLeft className="back-icon" />
          <span>{t("buttons.back")}</span>
        </Link>
      </div>

      {/* Section supérieure - Info du projet */}
      <div className="top-section">
        {/* En-tête avec titre à gauche et liens à droite */}
        <div className="project-header">
          <div className="left-content">
            <h1 className="project-title text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent inline-block">{t(project.titleKey)}</h1>
            <div className="technologies">
              {project.technologies.map((tech, index) => (
                <span key={index} className="technology-badge text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent inline-block">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="right-content">
            <div className="project-links">
              {/* N'afficher l'icône GitHub que si le lien est valide */}
              {project.link && project.link !== "https://github.com/MYK-OTAKU/" && (
                <motion.a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link github-link"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="link-icon" />
                </motion.a>
              )}
              
              {project.demoLink && (
                <motion.a 
                  href={project.demoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link demo-link"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExternalLinkAlt className="link-icon" />
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section du carousel et de la description - disposition horizontale sur PC */}
      <div className="bottom-section">
        {/* Partie gauche - Carousel */}
        <div className="carousel-section">
          <div className="carousel-wrapper">
            <div className="carousel-container">
              <div 
                className="carousel-track"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {project.screenshots.map((src, index) => (
                  <div key={index} className="carousel-slide">
                    <OptimizedImage 
                      src={src} 
                      alt={`Screenshot ${index + 1}`} 
                      className="carousel-image"
                    />
                  </div>
                ))}
              </div>
              
              {project.screenshots.length > 1 && (
                <motion.div 
                  className="carousel-nav-buttons"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button 
                    className="carousel-button prev" 
                    onClick={handlePrev}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaChevronLeft />
                  </motion.button>
                  <motion.button 
                    className="carousel-button next" 
                    onClick={handleNext}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaChevronRight />
                  </motion.button>
                </motion.div>
              )}
            </div>
            
            {project.screenshots.length > 1 && (
              <div className="carousel-indicators">
                {project.screenshots.map((_, index) => (
                  <button 
                    key={index}
                    className={`carousel-indicator ${currentIndex === index ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                  ></button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Partie droite - Information du projet */}
        <motion.div 
          className="details-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          
          
          <div className="project-details-info">
            <h3 className="project-details-title   text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent inline-block">
              {t("projects.details")}
            </h3>
            <div className="project-details-text">
              {formatProjectDetails(t(project.detailsKey))}
            </div>
            
            {/* Section des fonctionnalités clés */}
            {project.features && (
              <div className="project-features">
                <h4 className="features-title">{t("projects.features")}</h4>
                <ul className="features-list">
                  {project.features.map((featureKey, idx) => (
                    <li key={idx} className="feature-item">
                      <span className="feature-icon">✦</span>
                      <span className="feature-text">{t(featureKey)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails;
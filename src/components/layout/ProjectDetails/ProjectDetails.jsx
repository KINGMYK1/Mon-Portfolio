import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useTranslation from "../../../hooks/useTranslation";
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaArrowLeft } from "react-icons/fa";
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
      "/OtakuWorld/OtakuWorld.png"
    ],
    technologies: ["React", "Tailwind CSS"]
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

  // Dans la fonction ProjectDetails, ajoutez ce code pour précharger les images du carousel
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
            <h1 className="project-title">{t(project.titleKey)}</h1>
            <div className="technologies">
              {project.technologies.map((tech, index) => (
                <span key={index} className="technology-badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="right-content">
            <div className="project-links">
              {/* N'afficher l'icône GitHub que si le lien est valide */}
              {project.link && project.link !== "https://github.com/MYK-OTAKU/" && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link github-link"
                >
                  <FaGithub className="link-icon" />
                </a>
              )}
              
              {project.demoLink && (
                <a 
                  href={project.demoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link demo-link"
                >
                  <FaExternalLinkAlt className="link-icon" />
                </a>
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
                    />
                  </div>
                ))}
              </div>
              
              {project.screenshots.length > 1 && (
                <div className="carousel-nav-buttons">
                  <button className="carousel-button prev" onClick={handlePrev}>
                    <FaChevronLeft />
                  </button>
                  <button className="carousel-button next" onClick={handleNext}>
                    <FaChevronRight />
                  </button>
                </div>
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
        <div className="details-section">
          <div className="project-info-container">
            <p className="project-description">{t(project.descriptionKey)}</p>
          </div>
          
          <div className="project-details-info">
            <h2>{t("projects.details")}</h2>
            <p>{t(project.detailsKey)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
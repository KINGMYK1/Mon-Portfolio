import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import "./Projects.css";
import { FaGithub } from "react-icons/fa";
import useTranslation from './../../hooks/useTranslation';
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { initMouseTracking } from '../../utils/mouseTracker';

// Mise à jour des données de projet - limité aux 4 projets demandés
const projectsData = [
  {
    id: 1,
    titleKey: "projects.project1.title",      // RMS Web
    descriptionKey: "projects.project1.description",
    technologies: ["Angular", "Node.js", "MongoDB"],
    link: "https://github.com/MYK-OTAKU/MyNewApp",
    image: "/RMSW/login-preview.PNG",
    detailsPage: "/projects/1",
  },
  {
    id: 2,
    titleKey: "projects.project2.title",      // RMS Desktop
    descriptionKey: "projects.project2.description",
    technologies: ["C#", "SQL Server", ".NET Framework"],
    link: "https://github.com/MYK-OTAKU/Restaurent-Management-system",
    image: "/RMSD/dashboard (1).png",
    detailsPage: "/projects/2",
  },
  {
    id: 3,
    titleKey: "projects.project3.title",      // Pharmacie
    descriptionKey: "projects.project3.description",
    technologies: ["WordPress", "Elementor"],  // Correction des technologies
    link: "https://github.com/MYK-OTAKU/",    // Lien invalide - pas d'icône GitHub
    image: "/Pharma/screen10.png",
    detailsPage: "/projects/3",
  },
  {
    id: 4,
    titleKey: "projects.project4.title",      // OtakuWorld
    descriptionKey: "projects.project4.description",
    technologies: ["Html", "Tailwind CSS", 'javascript'],
    link: "https://github.com/MYK-OTAKU/",    // Lien invalide - pas d'icône GitHub
    image: "/OtakuWorld/OtakuWorld.png",
    detailsPage: "/projects/4",
  },{
    id: 5,
    titleKey: "projects.project5.title",      // Portfolio personnel
    descriptionKey: "projects.project5.description",
    technologies: ["React", "Framer Motion", "CSS"],
    link: "https://github.com/KINGMYK1/Mon-Portfolio",
    image: "/Portfolio/portfolio-preview.png", // Créez une capture d'écran de votre portfolio
    detailsPage: "/projects/5",
  },
];

const Projects = () => {
  const t = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const [hoveredProject, setHoveredProject] = useState(null); // État pour gérer le hover

  useEffect(() => {
    // Initialise le suivi de souris pour l'effet de brillance
    initMouseTracking();
  }, []);

  const handleInteraction = (e, projectId) => {
    e.preventDefault();
    e.stopPropagation();
    setHoveredProject(hoveredProject === projectId ? null : projectId); // Basculer l'état
  };

  const projectAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.1,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };
  
  const imageAnimation = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  const layerAnimation = {
    rest: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };
  
  const contentAnimation = {
    rest: { opacity: 0, y: 20 },
    hover: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <section className="projects-section" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="projects-header"
      >
        <h2 className="projects-title">
          {t("projects.title")} <span>{t("projects.subtitle")}</span>
        </h2>
        <p className="projects-subtitle">{t("projects.description")}</p>
        <div className="projects-divider"></div>
      </motion.div>

      <div className="projects-grid">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-box"
            custom={index}
            initial="hidden"
            whileInView="visible"
            whileHover={!hoveredProject ? "hover" : undefined} // Hover uniquement si aucune carte n'est active
            onClick={(e) => handleInteraction(e, project.id)} // Gérer le clic sur mobile
            viewport={{ once: true, margin: "-50px" }}
            variants={projectAnimation}
          >
            <motion.div className="project-image-container" variants={imageAnimation}>
              <img
                src={project.image}
                alt={t(project.titleKey)}
                className="project-image"
                loading={index < 2 ? "eager" : "lazy"}
              />
            </motion.div>

            {/* Overlay qui s'affiche au survol ou au clic */}
            <motion.div
              className="project-layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredProject === project.id ? 1 : 0 }} // Afficher l'overlay si la carte est active
              variants={layerAnimation}
              transition={{ duration: 0.3 }}
            >
              <motion.h4 
                className="project-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent"
                variants={contentAnimation}
              >
                {t(project.titleKey)}
              </motion.h4>
              
              <motion.p variants={contentAnimation}>
                {t(project.descriptionKey)}
              </motion.p>
              
              <motion.div className="project-actions" variants={contentAnimation}>
                {project.link && project.link !== "https://github.com/MYK-OTAKU/" && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaGithub className="project-icon" />
                  </motion.a>
                )}
                
                <motion.div
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link to={project.detailsPage} className="project-link">
                    <i className="bx project-icon bx-link-external"></i>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
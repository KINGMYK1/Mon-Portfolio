import React from "react";
import { motion } from "framer-motion";
import "./Projects.css";
import { FaGithub } from "react-icons/fa";
import useTranslation from './../../hooks/useTranslation';
import { Link } from "react-router-dom";

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
    technologies: ["React", "Tailwind CSS"],
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img
              src={project.image}
              alt={t(project.titleKey)}
              className="project-image pharma"
              loading="lazy"
            />
            <div className="project-layer">
              <h4 className="project-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                {t(project.titleKey)}
              </h4>
              <p>{t(project.descriptionKey)}</p>
              <div className="project-actions">
                {/* N'afficher l'icône GitHub que si le lien est valide */}
                {project.link && project.link !== "https://github.com/MYK-OTAKU/" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FaGithub className="project-icon"></FaGithub>
                  </a>
                )}
                <Link to={project.detailsPage} className="project-link">
                  <i className="bx project-icon bx-link-external"></i>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
import React from "react";
import { motion } from "framer-motion";
import "./Projects.css";
import {  FaGithub} from "react-icons/fa";

const projectsData = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A personal portfolio website to showcase my skills and projects.",
    technologies: ["React", "CSS", "JavaScript"],
    link: "https://example.com/portfolio",
    image: "portfolio3.jpg",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "An e-commerce platform with user authentication and payment integration.",
    technologies: ["Node.js", "Express", "MongoDB"],
    link: "https://example.com/ecommerce",
    image: "/portfolio1.jpg",
  },
  {
    id: 3,
    title: "Chat Application",
    description: "A real-time chat application using WebSocket.",
    technologies: ["React", "Socket.io", "Node.js"],
    link: "https://example.com/chat",
    image: "/portfolio2.jpg",
  },
];

const Projects = () => {
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
          Latest <span>Projects</span>
        </h2>
        <p className="projects-subtitle">
          A selection of my recent work showcasing my skills and expertise.
        </p>
        <div className="projects-divider"></div>
      </motion.div>

      <div className="projects-container">
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
              alt={project.title}
              className="project-image"
              loading="lazy"
            />
            <div className="project-layer">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                <FaGithub className="project-icon"></FaGithub>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
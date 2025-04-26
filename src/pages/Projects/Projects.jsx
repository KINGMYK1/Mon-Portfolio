import React from 'react';
import './Projects.css';

const projectsData = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A personal portfolio website to showcase my skills and projects.",
    technologies: ["React", "CSS", "JavaScript"],
    link: "https://example.com/portfolio",
    image: "/images/portfolio.jpg",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "An e-commerce platform with user authentication and payment integration.",
    technologies: ["Node.js", "Express", "MongoDB"],
    link: "https://example.com/ecommerce",
    image: "/images/ecommerce.jpg",
  },
  {
    id: 3,
    title: "Chat Application",
    description: "A real-time chat application using WebSocket.",
    technologies: ["React", "Socket.io", "Node.js"],
    link: "https://example.com/chat",
    image: "/images/chat.jpg",
  },
];

const Projects = () => {
  return (
    <div className="projects-container">
      <h1 className="projects-title">My Projects</h1>
      <div className="projects-grid">
        {projectsData.map((project) => (
          <div key={project.id} className="project-card">
            <img
              src={project.image}
              alt={project.title}
              className="project-image"
              loading="lazy"
            />
            <div className="project-content">
              <h2 className="project-title">{project.title}</h2>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="project-tech">
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
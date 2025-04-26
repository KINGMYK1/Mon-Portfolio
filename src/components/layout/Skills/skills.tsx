import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaReact, FaGithub, FaHtml5, FaCss3Alt, FaJs, FaPhp, FaNodeJs, FaLaravel, FaJava } from "react-icons/fa";
import { SiTailwindcss, SiMysql, SiMongodb, SiExpress, SiSpringboot } from "react-icons/si";
import "./Skills.css";
import { useLanguage } from '../../../contexts/LanguageContext';
import useTranslation from '../../../hooks/useTranslation';
// Définition des icônes avec leurs couleurs directement appliquées
const iconComponents = {
  React: <FaReact size={32} style={{ color: "#61DAFB" }} />,
  HTML: <FaHtml5 size={32} style={{ color: "#E34F26" }} />,
  CSS: <FaCss3Alt size={32} style={{ color: "#1572B6" }} />,
  JavaScript: <FaJs size={32} style={{ color: "#F7DF1E" }} />,
  PHP: <FaPhp size={32} style={{ color: "#777BB4" }} />,
  Node: <FaNodeJs size={32} style={{ color: "#68A063" }} />,
  Laravel: <FaLaravel size={32} style={{ color: "#FF2D20" }} />,
  Java: <FaJava size={32} style={{ color: "#007396" }} />,
  SpringBoot: <SiSpringboot size={32} style={{ color: "#6DB33F" }} />,
  Tailwind: <SiTailwindcss size={32} style={{ color: "#06B6D4" }} />,
  MySQL: <SiMysql size={32} style={{ color: "#4479A1" }} />,
  MongoDB: <SiMongodb size={32} style={{ color: "#47A248" }} />,
  Express: <SiExpress size={32} style={{ color: "#000000" }} />,
  Github: <FaGithub size={32} style={{ color: "#181717" }} />
};

// Données des compétences
const mainStack = [
  { name: "React", iconName: "React", color: "text-blue-500" },
  { name: "HTML", iconName: "HTML", color: "text-orange-500" },
  { name: "CSS", iconName: "CSS", color: "text-blue-400" },
  { name: "JavaScript", iconName: "JavaScript", color: "text-yellow-400" },
  { name: "PHP", iconName: "PHP", color: "text-purple-500" },
  { name: "Node.js", iconName: "Node", color: "text-green-500" },
  // { name: "Node.js", iconName: "Node", color: "text-green-500" },
  { name: "Spring Boot", iconName: "SpringBoot", color: "text-green-600" }, // Ajouté Spring Boot
  { name: "Java", iconName: "Java", color: "text-blue-700" }, // Ajouté Java
  { name: "Tailwind", iconName: "Tailwind", color: "text-cyan-400" },
  { name: "MySQL", iconName: "MySQL", color: "text-blue-600" },
  { name: "MongoDB", iconName: "MongoDB", color: "text-green-600" },
  { name: "Express", iconName: "Express", color: "text-gray-400" },
  { name: "Github", iconName: "Github", color: "text-gray-500" }
];

const Skills = () => {
  const GLOW_INTERVAL = 2000; // Intervalle de brillance en millisecondes
  const [glowingIndex, setGlowingIndex] = useState(0);
  const [iconsLoaded, setIconsLoaded] = useState(false);
  const { toggleLanguage } = useLanguage();
  const t = useTranslation();
  useEffect(() => {
    // Force un re-rendu pour les icônes
    const iconTimer = setTimeout(() => {
      setIconsLoaded(true);
    }, 50);
    
    // Animation de brillance
    const glowTimer = setInterval(() => {
      setGlowingIndex((prevIndex) => (prevIndex + 1) % mainStack.length);
    }, GLOW_INTERVAL);

    return () => {
      clearTimeout(iconTimer);
      clearInterval(glowTimer);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="skills-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="skills-header"
      >
        <h2 className="section-title bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent inline-block">
        {t("about.skills", "My Skills")}
         
        </h2>
        <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full mb-4"></div>
      </motion.div>

      <motion.div
        className="skills-grid "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={iconsLoaded ? 'loaded' : 'loading'}
      >
        {mainStack.map((tech, index) => {
          const isGlowing = index === glowingIndex;
          return (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              className={`
                skill-card
                ${isGlowing ? 'glowing-card' : ''}
              `}
            >
              {isGlowing && (
                <div className="glow-effect"></div>
              )}
              <div className="skill-content">
                <span className="skill-icon">
                  {iconComponents[tech.iconName]}
                </span>
                <span className="skill-name">{tech.name}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Skills;
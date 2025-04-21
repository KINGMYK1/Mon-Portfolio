/* eslint-disable no-unused-vars */
// src/pages/Skills/Skills.jsx
// Ce composant affiche une liste de compétences avec des icônes et des animations
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, FaAngular, FaHtml5, FaCss3Alt, FaPhp, FaLaravel, 
  FaWordpress, FaPython, FaNodeJs, FaJava 
} from 'react-icons/fa';
import { SiJavascript, SiMysql, SiElementor } from 'react-icons/si';
import { TbBrandCSharp } from "react-icons/tb";
import './Skills.css'; // Assurez-vous d'importer le fichier CSS pour le style


const Skills = () => {
  // Liste de vos compétences avec l'icône associée et une durée d'animation spécifique
  const skills = [
    { name: 'HTML5', icon: <FaHtml5 size={40} className="text-orange-600" />, duration: 0.5 },
    { name: 'CSS3', icon: <FaCss3Alt size={40} className="text-blue-600" />, duration: 0.6 },
    { name: 'JavaScript', icon: <SiJavascript size={40} className="text-yellow-500" />, duration: 0.7 },
    { name: 'React', icon: <FaReact size={40} className="text-cyan-600 " />, duration: 0.8 },
    { name: 'Angular', icon: <FaAngular size={40} className="text-red-600" />, duration: 0.9 },
    { name: 'Node.js', icon: <FaNodeJs size={40} className="text-green-600" />, duration: 1.0 },
    { name: 'PHP', icon: <FaPhp size={40} className="text-purple-600" />, duration: 1.1 },
    { name: 'Laravel', icon: <FaLaravel size={40} className="text-red-500" />, duration: 1.2 },
    { name: 'WordPress', icon: <FaWordpress size={40} className="text-blue-500" />, duration: 1.3 },
    { name: 'Elementor', icon: <SiElementor size={40} className="text-indigo-600" />, duration: 1.4 },
    { name: 'C#', icon: <TbBrandCSharp size={40} className="text-blue-700" />, duration: 1.5 },
    { name: 'Java', icon: <FaJava size={40} className="text-red-700" />, duration: 1.6 },
    { name: 'MySQL', icon: <SiMysql size={40} className="text-cyan-800" />, duration: 1.7 },
    { name: 'Python', icon: <FaPython size={40} className="text-cyan-500" />, duration: 1.8 },
  ];

  // Fonction qui retourne les réglages d'animation pour chaque carte d'icône
  const motionSettings = (duration) => ({
    initial: { y: -10 },
    animate: { y: [10, -10] },
    transition: { duration, repeat: Infinity, repeatType: 'reverse', ease: 'linear' },
  });

  return (
    <div className="skills-section px-4 py-8">
      <h1 className="skills-title text-center my-6 text-4xl text-white">
        Compétences
      </h1>
      <div className="skills-container flex flex-wrap justify-center items-center gap-8">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            {...motionSettings(skill.duration)}
            className="skill-card rounded-md border-2 p-3 border-gray-600 shadow-md"
          >
            {skill.icon}
            <p className="skill-name mt-2 text-center text-white"></p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;

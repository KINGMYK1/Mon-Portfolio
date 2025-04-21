import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaReact, FaGithub, FaHtml5, FaCss3Alt, FaJs, FaPhp, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiMysql, SiMongodb, SiExpress } from "react-icons/si";

// Définition des icônes disponibles
const iconComponents = {
  React: <FaReact size={32} />,
  HTML: <FaHtml5 size={32} />,
  CSS: <FaCss3Alt size={32} />,
  JavaScript: <FaJs size={32} />,
  PHP: <FaPhp size={32} />,
  Node: <FaNodeJs size={32} />,
  Tailwind: <SiTailwindcss size={32} />,
  MySQL: <SiMysql size={32} />,
  MongoDB: <SiMongodb size={32} />,
  Express: <SiExpress size={32} />,
  Github: <FaGithub size={32} />
};

// Données des compétences
const mainStack = [
  { name: "React", iconName: "React", color: "text-blue-500" },
  { name: "HTML", iconName: "HTML", color: "text-orange-500" },
  { name: "CSS", iconName: "CSS", color: "text-blue-400" },
  { name: "JavaScript", iconName: "JavaScript", color: "text-yellow-400" },
  { name: "PHP", iconName: "PHP", color: "text-purple-500" },
  { name: "Node.js", iconName: "Node", color: "text-green-500" },
  { name: "Tailwind", iconName: "Tailwind", color: "text-cyan-400" },
  { name: "MySQL", iconName: "MySQL", color: "text-blue-600" },
  { name: "MongoDB", iconName: "MongoDB", color: "text-green-600" },
  { name: "Express", iconName: "Express", color: "text-gray-400" },
  { name: "Github", iconName: "Github", color: "text-gray-500" }
];

const Skills = () => {
  const GLOW_INTERVAL = 2000; // Intervalle de brillance en millisecondes
  const [glowingIndex, setGlowingIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGlowingIndex((prevIndex) => (prevIndex + 1) % mainStack.length);
    }, GLOW_INTERVAL);

    return () => clearInterval(intervalId);
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
    <section className="py-12 bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent inline-block">
            Mes Compétences
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full mb-8"></div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {mainStack.map((tech, index) => {
            const isGlowing = index === glowingIndex;
            return (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                className={`
                  group relative p-4 rounded-xl
                  bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg
                  border border-transparent
                  hover:border-purple-500/50
                  transition-all duration-300 ease-in-out
                  transform hover:-translate-y-1
                  ${isGlowing ? 'ring-2 ring-teal-400/60 shadow-teal-400/10' : ''}
                `}
              >
                {isGlowing && (
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                )}
                <div className={`relative flex flex-col items-center justify-center space-y-3 ${tech.color}`}>
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {iconComponents[tech.iconName]}
                  </span>
                  <span className="font-semibold text-gray-200 text-sm">{tech.name}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
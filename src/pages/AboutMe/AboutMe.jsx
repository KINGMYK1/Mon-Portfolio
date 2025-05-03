import React from "react";
import useTranslation from "../../hooks/useTranslation";
import { motion } from 'framer-motion';
import './AboutMe.css';
import DegreeCard from "../../components/layout/degreeCard/DegreeCard";
import ExperienceCard from "../../components/layout/ExperienceCard/ExperienceCard";
// import Skills from "../../components/layout/Skills/Skills";
import Skills from './../../components/layout/Skills/skills';
 
const AboutMe = () => {
  const t = useTranslation();
  
  // Utilisation des traductions pour les données personnelles
  const aboutData = {
    name: t("about.name", "Mohamed Yehiya Koïta"),
    title: t("about.jobTitle", "Full Stack Developer")
  };

  const degreeData = [
    {
      logo_path: "osbt.png",
      alt_name: t("about.degrees.degree1.schoolShort", "Omnia School Logo"),
      title: t("about.degrees.degree1.title", "Licence en Ingénierie des Applications Web et Mobiles"),
      subtitle: t("about.degrees.degree1.school", "Omnia School of Business and Technology"),
      duration: "2022 - 2025",
      descriptions: [
        t("about.degrees.degree1.description1", "Formation axée sur le développement web et mobile."),
        t("about.degrees.degree1.description2", "Apprentissage des technologies modernes comme React, Node.js, et Laravel."),
        t("about.degrees.degree1.description3", "Projets pratiques pour renforcer les compétences techniques."),
      ],
      website_link: "https://osbt.ma",
    },
    {
      logo_path: "osbt.png",
      alt_name: t("about.degrees.degree2.schoolShort", "Omnia School Logo"),
      title: t("about.degrees.degree2.title", "Technicien Spécialisé en Développement Informatique"),
      subtitle: t("about.degrees.degree2.school", "Omnia School of Business and Technology"),
      duration: "2020 - 2022",
      descriptions: [
        t("about.degrees.degree2.description1", "Formation axée sur les bases du développement logiciel."),
        t("about.degrees.degree2.description2", "Apprentissage des langages comme Java, PHP, et MySQL."),
        t("about.degrees.degree2.description3", "Projets pratiques pour développer des applications simples."),
      ],
      website_link: "https://osbt.ma",
    },
  ];

  // Nouvelles données d'expérience avec traductions
  const experienceData = [
    {
      title: t("about.experiences.exp1.title", "Développeur Full Stack"),
      companyName: t("about.experiences.exp1.company", "Freelance"),
      description: t("about.experiences.exp1.description", "Création de sites web et applications mobiles pour divers clients."),
      duration: `2024 - ${t("about.present", "Présent")}`,
      media: "/portfolio1.jpg",
      mediaType: "image", 
      link: "/projects/5",
    },
    {
      title: t("about.experiences.exp2.title", "Stage en Développement Mobile"),
      companyName: t("about.experiences.exp2.company", "Digicard"),
      description: t("about.experiences.exp2.description", "Développement d'une application Mobile pour des projets internes."),
      duration: "2024",
      media: "/text.mp4",
      mediaType: "video",
      link: "#",
    },
        {
      title: t("about.experiences.exp3.title", "Stage en Développement Mobile"),
      companyName: t("about.experiences.exp3.company", "Digicard"),
      description: t("about.experiences.exp3.description", "Développement d'une application Mobile pour des projets internes."),
      duration: "2024",
      media: "/portfolio2.jpg",
      mediaType: "image",
      link: "/projects/1",
    },
    
  ];

  // Le reste du code reste inchangé
  return (
    <div className="about-container">
      {/* Header */}
      <motion.div 
        className="about-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="about-title">
          {t("about.title", "À propos de moi")}
        </h1>
      </motion.div>

      {/* Container pour les 3 sections avec hauteur fixe */}
      <div className="sections-container">
        {/* Section Profil + Éducation */}
        <motion.div 
          className="profile-education-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Profil - Divisé en deux parties */}
          <div className="profile-container">
            {/* Partie Avatar (80%) */}
            <div className="avatar-container">
              <motion.div 
                className="avatar-wrapper"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="avatar-image-container">
                  <div className="avatar-glow" aria-hidden="true" />
                  <div className="avatar-image-wrapper">
                    <img 
                      src="/avatar.png" 
                      loading="lazy"
                      alt={aboutData.name}
                      className="avatar-image"
                      fetchPriority="high" // Priorité élevée pour l'avatar qui est critique

                    />
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Partie Titre (20%) */}
            <div className="profile-info">
              <h3 className="section-title text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent inline-block">
                {aboutData.name}
              </h3>
              <p className="profile-title">
                {aboutData.title}
              </p>
            </div>
          </div>

          {/* Éducation - En colonne avec DegreeCard */}
          <div className="education-container">
            <div className="education-title text-center">
              <h2 className="section-title textcenter text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent inline-block">
                {t("about.education", "Formation")}
              </h2>
            </div>
            <div className="degrees-list">
              {degreeData.map((degree, index) => (
                <div key={index} className="degree-card-wrapper">
                  <DegreeCard degree={degree} compact={true} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section Expérience */}
        <motion.div 
          className="experience-section text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
           <h2 className="section-title text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent inline-block">
             {t("about.experience", "Expérience")}
           </h2>
          <div className="experiences-container">
            {experienceData.map((experience, index) => (
              <div key={index} className="experience-card-wrapper">
                <ExperienceCard {...experience} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Section Compétences */}
        <motion.div 
          className="skills-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Skills/>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMe;
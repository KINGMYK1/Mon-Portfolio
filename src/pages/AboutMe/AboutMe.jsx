import React from "react";
import "./AboutMe.css";
// import Skills from "./../Skills/Skills";
// import EducationCard from "./../../components/layout/EducationCard/EducationCard";
import ExperienceCard from "./../../components/layout/ExperienceCard/ExperienceCard";
import DegreeCard from "../../shared/degreeCard/DegreeCard";
import useTranslation from "../../hooks/useTranslation";
// import { AiFillGithub, AiOutlineMail, AiOutlineLinkedin, AiOutlineInstagram  } from 'react-icons/ai';
// import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SocialLinks from "./../../components/layout/SocialLinks/SocialLinks"
import Skills from './../../components/layout/Skills/skills';
const AboutMe = () => {
  const t = useTranslation();

  const degreeData = [
    {
      logo_path: "osbt.png",
      alt_name: "Omnia School Logo",
      title: "Licence en Ingénierie des Applications Web et Mobiles",
      subtitle: "Omnia School of Business and Technology",
      duration: "2022 - 2025",
      descriptions: [
        "Formation axée sur le développement web et mobile.",
        "Apprentissage des technologies modernes comme React, Node.js, et Laravel.",
        "Projets pratiques pour renforcer les compétences techniques.",
      ],
      website_link: "https://www.omniatech.ma",
    },
    {
      logo_path: "osbt.png",
      alt_name: "Omnia School Logo",
      title: "Technicien Spécialisé en Développement Informatique",
      subtitle: "Omnia School of Business and Technology",
      duration: "2020 - 2022",
      descriptions: [
        "Formation axée sur les bases du développement logiciel.",
        "Apprentissage des langages comme Java, PHP, et MySQL.",
        "Projets pratiques pour développer des applications simples.",
      ],
      website_link: "https://www.omniatech.ma",
    },
  ];

  const experienceData = [
    {
      title: "Développeur Full Stack",
      companyName: "Freelance",
      description:
        "Création de sites web et applications mobiles pour divers clients.",
      duration: "2021 - Présent",
      image: "/portfolio1.jpg",
      link: "/projects/freelance",
    },
    {
      title: "Stage en Développement Web",
      companyName: "Omnia Tech",
      description:
        "Participation au développement d’applications web pour des projets internes.",
      duration: "2020",
      image: "/portfolio3.jpg",
      link: "/projects/stage",
    },
  ];

  return (
    <div className="about-container p-6 bg-gray-100 dark:bg-neutral-800">
      <div className="main-section flex flex-col lg:flex-row gap-8">
        {/* Section gauche */}
        <div className="left-section flex-1 text-center">
          <div className="left-top">
            <img
              src="/fullstack.svg"
              alt="Profil de Mohamed Yehiya Koïta"
              className="profile-img mx-auto w-48 h-48 md:w-64 md:h-64 rounded-full object-cover"
            />
            <h2 className="profile-name text-2xl md:text-3xl font-bold mt-4">
              Mohamed Yehiya Koïta
            </h2>
            <p className="profile-title text-lg md:text-xl text-gray-600">
              Full Stack Developer
            </p>
          </div>
          <div className="left-bottom mt-8">
            <h3 className="social-title text-xl font-semibold mb-4">
              {t("about.social")}
            </h3>
            <div className="social-links flex flex-col gap-2">
             <motion.div className="social-media">
              <SocialLinks/>
        </motion.div>
            </div>
          </div>
        </div>

        {/* Section droite */}
        <div className="right-section flex-1">
          {/* Formations */}
          <div className="degree-section bg-primary mb-8">
            <h3 className="section-title text-2xl font-bold mb-4">
              {t("about.education")}
            </h3>
            <div className="degree-list flex flex-col gap-6">
              {degreeData.map((degree, index) => (
                <DegreeCard key={index} degree={degree} />
              ))}
            </div>
          </div>

          {/* Expériences */}
          <div className="experience-section">
            <h3 className="section-title text-2xl font-bold mb-4">
              {t("about.experience")}
            </h3>
            <div className="experience-list flex flex-col gap-6">
              {experienceData.map((exp, index) => (
                <ExperienceCard
                  key={index}
                  title={exp.title}
                  companyName={exp.companyName}
                  duration={exp.duration}
                  description={exp.description}
                  image={exp.image}
                  link={exp.link}
                />
              ))}
            </div>
            
          </div>
          <Skills/>

        </div>

      </div>

     
      

    
    </div>
  );
};

export default AboutMe;
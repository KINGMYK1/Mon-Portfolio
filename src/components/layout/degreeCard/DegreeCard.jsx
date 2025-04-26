import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import "./DegreeCard.css"; // Vous pouvez créer ce fichier pour le CSS spécifique au carte

const DegreeCard = ({ degree, compact = true }) => {
  const imageSrc = `/${degree.logo_path}`;
  const websiteLink = degree.website_link || "https://www.osbt.ma";

  return (
    <motion.div 
      className="degree-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {degree.logo_path && (
        <motion.div
          className="logo-container"
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <img
            className="logo-image"
            src={imageSrc}
            alt={degree.alt_name}
          />
        </motion.div>
      )}

      <motion.div
        className="degree-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <motion.h2 
            className="degree-title"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {degree.title}
          </motion.h2>
          <h3 className="degree-subtitle">
            {degree.subtitle}
          </h3>
          
          <div className="mt-2">
            <p className="degree-description">
              {degree.descriptions[0]}
            </p>
          </div>
          
          <div className="mt-2">
            <motion.a
              href={websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="degree-link"
              whileHover={{ scale: 1.05, x: 3 }}
            >
              Visiter le site
            </motion.a>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="degree-duration"
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="duration-pill">
          {degree.duration}
        </h3>
      </motion.div>
    </motion.div>
  );
};

DegreeCard.propTypes = {
  degree: PropTypes.shape({
    logo_path: PropTypes.string,
    alt_name: PropTypes.string,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    descriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    website_link: PropTypes.string,
  }).isRequired,
  compact: PropTypes.bool
};

export default DegreeCard;
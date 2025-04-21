import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const DegreeCard = ({ degree }) => {
  const imageSrc = `/${degree.logo_path}`;

  return (
    <div className="w-[80%] mx-auto my-6 p-4 bg-white dark:bg-neutral-900 rounded-xl shadow-md transition-colors duration-300 flex flex-col md:flex-row justify-center items-center">
      {degree.logo_path && (
        <motion.div
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-4 md:mb-0 md:mr-6 flex-shrink-0"
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <img
            className="w-full h-full object-contain rounded-full border border-gray-300 shadow-md p-2"
            src={imageSrc}
            alt={degree.alt_name}
          />
        </motion.div>
      )}

      <motion.div
        className="flex-1 w-full"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="flex flex-col md:flex-row justify-center items-start md:items-center bg-gradient-to-br from-purple-100/20 via-neutral-100/10 to-transparent dark:from-neutral-800 dark:via-neutral-700/10 p-4 rounded-t-xl w-full">
          <div className="w-full md:w-4/5">
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800 dark:text-white">
              {degree.title}
            </h2>
            <h3 className="text-sm sm:text-md md:text-lg text-gray-600 dark:text-gray-300 mt-1">
              {degree.subtitle}
            </h3>
          </div>
          <div className="w-full md:w-1/5 mt-2 md:mt-0 text-right">
            <h3 className="text-sm sm:text-md md:text-lg font-normal text-gray-500 dark:text-gray-400">
              {degree.duration}
            </h3>
          </div>
        </div>

        <div className="p-4 rounded-b-xl border border-t-0 border-gray-200 dark:border-gray-700">
          {degree.descriptions.map((sentence, index) => (
            <p
              key={index}
              className="text-sm sm:text-md md:text-lg text-gray-700 dark:text-gray-300 mb-2"
            >
              {sentence}
            </p>
          ))}

          {degree.website_link && (
            <a
              href={degree.website_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4"
            >
              <div className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm sm:text-md md:text-lg font-medium px-4 py-2 rounded-md float-right">
                Visit Website
              </div>
            </a>
          )}
        </div>
      </motion.div>
    </div>
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
};

export default DegreeCard;
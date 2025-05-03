/* ProjectCards.jsx avec Tailwind CSS */
import React from 'react';
import { Link } from 'react-router-dom';
import { CgWebsite } from 'react-icons/cg';
import { BsGithub } from 'react-icons/bs';
import PropTypes from 'prop-types';

const ProjectCards = ({
  index,
  imgPath,
  title,
  description,
  ghLink,
  demoLink,
  detailsPage,
  technologies = [],
  isBlog = false,
  t,
}) => (
  <div
    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform transform hover:-translate-y-1 duration-300`}  
    key={index}
  >
    <img
      className="w-full h-48 object-cover"
      src={imgPath}
      alt={`${title} image`}
    />
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
        {description}
      </p>

      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, i) => (
            <span
              key={i}
              className="text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 px-2 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-2">
        {/* GitHub ou Blog */}
        {ghLink && (
          <a
            href={ghLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
          >
            <BsGithub className="mr-2" />
            {isBlog ? t('buttons.blog') : t('buttons.github')}
          </a>
        )}

        {/* Démo si disponible */}
        {!isBlog && demoLink && (
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-gray-900 text-gray-900 rounded-lg hover:bg-gray-100 transition"
          >
            <CgWebsite className="mr-2" />
            {t('buttons.demo')}
          </a>
        )}

        {/* Page détails interne */}
        {detailsPage && (
          <Link
            to={detailsPage}
            className="inline-flex items-center px-4 py-2 border border-gray-500 text-gray-500 rounded-lg hover:bg-gray-100 transition"
          >
            {t('buttons.details')}
          </Link>
        )}
      </div>
    </div>
  </div>
);

ProjectCards.propTypes = {
  index: PropTypes.number,
  imgPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  ghLink: PropTypes.string,
  demoLink: PropTypes.string,
  detailsPage: PropTypes.string,
  technologies: PropTypes.arrayOf(PropTypes.string),
  isBlog: PropTypes.bool,
  t: PropTypes.func,
};

export default ProjectCards;
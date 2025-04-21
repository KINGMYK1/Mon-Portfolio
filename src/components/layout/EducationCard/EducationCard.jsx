// EducationCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FaGraduationCap } from 'react-icons/fa';
import './EducationCard.css';

const EducationCard = ({ title, schoolName, schoolLink, year }) => {
  return (
    <div className="education-card">
      <div className="education-card-icon">
        <FaGraduationCap />
      </div>
      <div className="education-card-content">
        <h4 className="education-card-title">{title}</h4>
        <a
          href={schoolLink}
          target="_blank"
          rel="noopener noreferrer"
          className="education-card-school"
        >
          {schoolName}
        </a>
      </div>
      <div className="education-card-year">
        <span>{year}</span>
      </div>
    </div>
  );
};

EducationCard.propTypes = {
  title: PropTypes.string.isRequired,
  schoolName: PropTypes.string.isRequired,
  schoolLink: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

export default EducationCard;

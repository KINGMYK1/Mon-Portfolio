import React from "react";
import PropTypes from "prop-types";
import "./ExperienceCard.css";
import { Fade } from "react-reveal";

const ExperienceCard = ({ experience, index, totalCards, theme }) => {
  // Vérification que l'objet experience est défini
  if (!experience) return null;

  // Utilisation de logo_path s'il est défini, sinon on utilise image.
  // Cette expression vérifie que experience.logo_path existe avant de l'utiliser
  const logoSrc = `${import.meta.env.BASE_URL}assets/images/${experience.logo_path || experience.image || "default-logo.png"}`;

  return (
    <div className="experience-list-item" style={{ marginTop: index === 0 ? 30 : 50 }}>
      <Fade left duration={2000} distance="40px">
        <div className="experience-card-logo-div">
          <img
            className="experience-card-logo"
            src={logoSrc}
            alt={`${experience.company || experience.companyName} logo`}
          />
        </div>
      </Fade>
      <div className="experience-card-stepper">
        <div
          style={{
            width: 20,
            height: 20,
            backgroundColor: theme.headerColor,
            borderRadius: "50%",
            zIndex: 100,
          }}
        />
        {index !== totalCards - 1 && (
          <div
            style={{
              height: 190,
              width: 2,
              backgroundColor: theme.headerColor,
              position: "absolute",
              marginTop: 20,
            }}
          />
        )}
      </div>
      <Fade right duration={2000} distance="40px">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ borderRight: `10px solid ${theme.body}` }} className="arrow-left"></div>
          <div className="experience-card" style={{ background: theme.body }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <div>
                <h3 className="experience-card-title" style={{ color: theme.text }}>
                  {experience.title}
                </h3>
                <p className="experience-card-company" style={{ color: theme.text }}>
                  <a href={experience.company_url} target="_blank" rel="noopener noreferrer">
                    {experience.company || experience.companyName}
                  </a>
                </p>
              </div>
              <div>
                <div className="experience-card-heading-right">
                  <p className="experience-card-duration" style={{ color: theme.secondaryText }}>
                    {experience.duration}
                  </p>
                  <p className="experience-card-location" style={{ color: theme.secondaryText }}>
                    {experience.location}
                  </p>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-start", marginTop: 20 }}>
              <div className="repo-description" />
              {experience.description}
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
};

ExperienceCard.propTypes = {
  experience: PropTypes.shape({
    title: PropTypes.string.isRequired,
    company: PropTypes.string,
    companyName: PropTypes.string,
    company_url: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    logo_path: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  totalCards: PropTypes.number.isRequired,
  theme: PropTypes.shape({
    headerColor: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    secondaryText: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExperienceCard;
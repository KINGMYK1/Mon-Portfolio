import React from 'react';
import { NavLink } from 'react-router-dom';
import './HorizontalNav.css';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineBook,
  AiOutlineMail,
} from 'react-icons/ai';

const HorizontalNav = () => {
  const linkClasses = ({ isActive }) =>
    `nav-circle ${isActive ? 'active' : ''}`;

  return (
    <div className="horizontal-nav">
      <NavLink to="/" className={linkClasses} title="Accueil">
        <AiOutlineHome className="nav-icon" />
      </NavLink>
      <NavLink to="/AboutMe" className={linkClasses} title="À propos">
        <AiOutlineUser className="nav-icon" />
      </NavLink>
      <NavLink to="/projects" className={linkClasses} title="Projets">
        <AiOutlineBook className="nav-icon" />
      </NavLink>
      <NavLink to="/contact" className={linkClasses} title="Contact">
        <AiOutlineMail className="nav-icon" />
      </NavLink>
    </div>
  );
};

export default HorizontalNav;
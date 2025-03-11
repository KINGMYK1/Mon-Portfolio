// src/components/layout/Navbar/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineBook,
  AiOutlineMail,
} from 'react-icons/ai';

const Navbar = () => {
  const linkClasses = ({ isActive }) =>
    `nav-circle ${isActive ? 'active' : ''}`;

  return (
    <div className="vertical-nav">
      <NavLink to="/" className={linkClasses} title="Accueil">
        <AiOutlineHome className="nav-icon" />
      </NavLink>
      <NavLink to="/about" className={linkClasses} title="À propos">
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

export default Navbar;

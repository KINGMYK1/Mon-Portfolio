/* eslint-disable no-unused-vars */

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
    <>
      {/* Navbar vertical pour les écrans larges */}
      <div className="vertical-nav">
        <NavLink to="/" className={linkClasses} title="Accueil">
          <AiOutlineHome className="nav-icon" />
        </NavLink>
        <NavLink to="/AboutMe" className={linkClasses} title="AboutMe ">
          <AiOutlineUser className="nav-icon" />
        </NavLink>
        <NavLink to="/projects" className={linkClasses} title="Projets">
          <AiOutlineBook className="nav-icon" />
        </NavLink>
        <NavLink to="/contact" className={linkClasses} title="Contact">
          <AiOutlineMail className="nav-icon" />
        </NavLink>
      </div>

      {/* Navbar horizontal pour les petits écrans
      <div className="horizontal-nav">
        <NavLink to="/" className={linkClasses} title="Accueil">
          <AiOutlineHome className="nav-icon" />
        </NavLink>
        <NavLink to="/AboutMe" className={linkClasses} title="AboutMe">
          <AiOutlineUser className="nav-icon" />
        </NavLink>
        <NavLink to="/projects" className={linkClasses} title="Projets">
          <AiOutlineBook className="nav-icon" />
        </NavLink>
        <NavLink to="/contact" className={linkClasses} title="Contact">
          <AiOutlineMail className="nav-icon" />
        </NavLink>
      </div> */}
    </>
  );
};

export default Navbar;
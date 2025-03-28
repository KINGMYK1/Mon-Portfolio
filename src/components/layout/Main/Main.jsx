import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import './Main.css';
import HorizontalNav from '../HorizontalNav/HorizontalNav'; // Import du nouveau composant

const Main = ({ children }) => {
  return (
    <div className="main-container">
      <div className="page-content">
        {children}
      </div>
      <aside className="navbar">
        <Navbar />
      </aside>
      <HorizontalNav/>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Main.css';

const Main = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={`main-container ${isHomePage ? 'home-layout' : 'other-page'}`}>
      {isHomePage && (
        <aside className="navbar navbar-home">
          <Navbar />
        </aside>
      )}
      <div className="page-content">
        {children}
      </div>
      {!isHomePage && (
        <aside className="navbar">
          <Navbar />
        </aside>
      )}
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
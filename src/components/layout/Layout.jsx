import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import "./Layout.css";
import HorizontalNav from './HorizontalNav/HorizontalNav';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
        <Main>{children}</Main>
      <HorizontalNav />

      <Footer />
    </div>
  );
};


Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
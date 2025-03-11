// src/components/layout/Layout.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className="relative">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

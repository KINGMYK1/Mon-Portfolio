/* eslint-disable no-unused-vars */

import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Loading from '../components/ui/Loading/Loading';

const Home = lazy(() => import('../pages/Home/Home'));
const Skills = lazy(() => import('../pages/Skills/Skills'));
const Projects = lazy(() => import('../pages/Projects/Projects'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const AboutMe = lazy(() => import('../pages/AboutMe/AboutMe'));
// import AboutMe from './../pages/AboutMe/AboutMe';


const AppRoutes = () => {
  const location = useLocation();

  return (
    // AnimatePresence permet de gérer la sortie et l’entrée
    <AnimatePresence mode="wait">
      <Suspense fallback={<Loading />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/AboutMe" element={<AboutMe />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<div>404 - Page non trouvée</div>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AppRoutes;
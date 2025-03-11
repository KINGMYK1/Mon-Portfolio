import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Loading from '../components/ui/Loading/Loading';

const Home = lazy(() => import('../pages/Home/Home'));
// const About = lazy(() => import('../pages/About/About'));
const Projects = lazy(() => import('../pages/Projects/Projects'));
const Contact = lazy(() => import('../pages/Contact/Contact'));

const AppRoutes = () => {
  const location = useLocation();

  return (
    // AnimatePresence permet de gérer la sortie et l’entrée
    <AnimatePresence mode="wait">
      <Suspense fallback={<Loading />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<div>404 - Page non trouvée</div>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AppRoutes;
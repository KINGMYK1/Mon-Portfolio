import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Loading from '../components/ui/Loading/Loading';

// Import intelligent des composants
const Home = lazy(() => import(/* webpackPrefetch: true */ '../pages/Home/Home'));
const Skills = lazy(() => import('../pages/Skills/Skills'));
const Projects = lazy(() => import('../pages/Projects/Projects'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const AboutMe = lazy(() => import('../pages/AboutMe/AboutMe'));
const ProjectDetails = lazy(() => import('../components/layout/ProjectDetails/ProjectDetails'));
const ExperienceDetails = lazy(() => import('../components/layout/ExperienceDetails/ExperienceDetails'));

// Composant plus léger pour le chargement
const LightLoading = () => <div className="simple-loader"></div>;

const AppRoutes = () => {
  const location = useLocation();
  
  // Préchargement intelligent des pages
  React.useEffect(() => {
    if (location.pathname === '/') {
      import('../pages/AboutMe/AboutMe');
    }
    if (location.pathname === '/AboutMe') {
      import('../pages/Projects/Projects');
    }
    if (location.pathname.startsWith('/projects/')) {
      import('../components/layout/ProjectDetails/ProjectDetails');
    }
    if (location.pathname.startsWith('/experience/')) {
      import('../components/layout/ExperienceDetails/ExperienceDetails');
    }
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<Loading />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={
            <Suspense fallback={<LightLoading />}>
              <Skills />
            </Suspense>
          } />
          <Route path="/AboutMe" element={<AboutMe />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/experience/:id" element={<ExperienceDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<div>404 - Page non trouvée</div>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AppRoutes;
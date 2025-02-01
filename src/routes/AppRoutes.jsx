import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '../components/ui/Loading/Loading';

const Home = lazy(() => import('../pages/Home/Home'));
const Projects = lazy(() => import('../pages/Projects/Projects'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const Skills = lazy(() => import('../pages/Skills/Skills'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="*" element={<div>404 - Page non trouvée</div>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
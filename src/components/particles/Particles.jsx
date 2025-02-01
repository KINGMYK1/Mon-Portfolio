import { useCallback } from 'react';
import PropTypes from 'prop-types';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { useTheme } from '../../contexts/ThemeContext';

const ParticlesBackground = ({ paused }) => {
  const { theme } = useTheme();

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // Configuration commune à toutes les couches
  const baseOptions = {
    background: { color: { value: 'transparent' } },
    interactivity: { events: { onHover: { enable: true, mode: 'repulse' } } },
    particles: {
      move: { 
        enable: !paused,
        direction: 'none',
        outModes: 'out',
      },
      opacity: { value: { min: 0.1, max: 0.5 } },
      size: { value: { min: 1, max: 3 } },
    }
  };

  // Couches d'étoiles avec des paramètres différents
  const layers = [
    { // Étoiles rapides (petites)
      quantity: 400,
      speed: 5,
      sizeRange: { min: 0.5, max: 1 },
      color: theme === 'dark' ? '#ffffff' : '#2A2A72'
    },
    { // Étoiles moyennes
      quantity: 200,
      speed: 3,
      sizeRange: { min: 1, max: 2 },
      color: theme === 'dark' ? '#dddddd' : '#3A3A92'
    },
    { // Étoiles lentes (grandes)
      quantity: 100,
      speed: 1,
      sizeRange: { min: 2, max: 4 },
      color: theme === 'dark' ? '#bbbbbb' : '#4A4AB2'
    }
  ];

  return (
    <div className="absolute inset-0 -z-10">
      {layers.map((layer, index) => (
        <Particles
          key={index}
          id={`tsparticles-layer-${index}`}
          init={particlesInit}
          options={{
            ...baseOptions,
            particles: {
              ...baseOptions.particles,
              number: { value: layer.quantity },
              color: { value: layer.color },
              size: { value: layer.sizeRange },
              move: {
                ...baseOptions.particles.move,
                speed: layer.speed
              }
            }
          }}
        />
      ))}
    </div>
  );
};
ParticlesBackground.propTypes = {
  paused: PropTypes.bool.isRequired,
};

export default ParticlesBackground;

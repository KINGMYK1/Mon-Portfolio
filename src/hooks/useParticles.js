import { useEffect } from 'react';
import { tsParticles } from 'tsparticles';

const useParticles = (id, options) => {
  useEffect(() => {
    tsParticles.load(id, options);

    return () => {
      tsParticles.dom().forEach((instance) => instance.destroy());
    };
  }, [id, options]);
};

export default useParticles;
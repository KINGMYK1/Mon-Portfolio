import React, { useState, useEffect } from 'react';
import './OptimizedImage.css';
import PropTypes from 'prop-types';

const OptimizedImage = ({ src, alt, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imageRef = React.useRef(null);
  
  // Générer une miniature (très petite version de l'image)
  // Dans un vrai projet, vous auriez des miniatures pré-générées
  const thumbSrc = src?.replace('.png', '-thumb.png')
                      .replace('.jpg', '-thumb.jpg')
                      .replace('.webp', '-thumb.webp') || src;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={imageRef} 
      className={`optimized-image-container ${className} animated-element`}
    >
      {/* Image miniature floue pendant le chargement */}
      {!isLoaded && (
        <div className="image-placeholder" style={{
          backgroundImage: isInView ? `url(${thumbSrc})` : 'none',
          backgroundColor: '#e0e0e0'
        }} />
      )}
      
      {/* Image réelle chargée progressivement */}
      {isInView && (
        <img 
          src={src} 
          alt={alt} 
          className={`optimized-image ${isLoaded ? 'loaded' : ''}`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};
OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default OptimizedImage;

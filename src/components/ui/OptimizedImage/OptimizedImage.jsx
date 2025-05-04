import React, { useState, useEffect, useRef } from 'react';
import './OptimizedImage.css';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const OptimizedImage = ({ src, alt, className = '', priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef(null);
  
  useEffect(() => {
    // Si l'image est prioritaire, on la charge immédiatement
    if (priority) {
      setIsInView(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current && observer) {
        observer.disconnect();
      }
    };
  }, [priority]);

  // Générer une version miniature pour le flou
  const placeholderSrc = src?.replace(/\.(png|jpe?g|webp)$/, '-thumb.$1') || src;

  return (
    <div 
      ref={imageRef} 
      className={`optimized-image-container ${className}`}
    >
      {/* Image miniature floue pendant le chargement */}
      {!isLoaded && (
        <div 
          className="image-placeholder"
          style={{
            backgroundImage: isInView ? `url(${placeholderSrc})` : 'none',
          }}
        >
          <div className="loading-shimmer"></div>
        </div>
      )}
      
      {/* Image réelle chargée progressivement */}
      {isInView && (
        <motion.img 
          src={src} 
          alt={alt} 
          className="optimized-image"
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setIsLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isLoaded ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
        />
      )}
    </div>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  priority: PropTypes.bool,
};

export default OptimizedImage;

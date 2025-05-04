import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './OptimizedAvatar.css';

const OptimizedAvatar = ({ src, alt, priority = true }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Préchargement de l'image
  useEffect(() => {
    // Si l'image est prioritaire, la charger immédiatement
    if (priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
    }
    
    // Déclencher l'animation après un court délai
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [src, priority]);
  
  return (
    <div className="optimized-avatar-container">
      {/* Placeholder avec effet de pulsation pendant le chargement */}
      {!isLoaded && (
        <div className="avatar-placeholder">
          <div className="avatar-pulse"></div>
        </div>
      )}
      
      {/* L'avatar avec animation */}
      <motion.div 
        className="avatar-image-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isLoaded && isVisible ? 1 : 0, 
          scale: isLoaded && isVisible ? 1 : 0.8 
        }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20, 
          duration: 0.8 
        }}
      >
        <div className="avatar-glow" aria-hidden="true" />
        <div className="avatar-image-wrapper">
          <img 
            src={src} 
            alt={alt}
            className="avatar-image"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default OptimizedAvatar;
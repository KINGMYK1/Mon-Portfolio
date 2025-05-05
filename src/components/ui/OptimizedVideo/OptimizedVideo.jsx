import React, { useState, useEffect, useRef } from 'react';
import './OptimizedVideo.css';
import PropTypes from 'prop-types';

const OptimizedVideo = ({ src, poster, className = '', autoplay = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Préchargement de la vidéo
    const preloadVideo = new Image();
    preloadVideo.src = poster || '';
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [poster]);

  useEffect(() => {
    // Réinitialiser les états lors du changement de source
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  const handleVideoLoaded = () => {
    setIsLoaded(true);
    if (autoplay && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.warn('Lecture automatique impossible:', error);
      });
    }
  };

  const handleError = () => {
    setHasError(true);
    console.error(`Erreur lors du chargement de la vidéo: ${src}`);
  };

  return (
    <div 
      ref={containerRef} 
      className={`optimized-video-container ${className} animated-element`}
    >
      {/* Afficher un poster pendant le chargement */}
      {!isLoaded && !hasError && poster && (
        <div 
          className="video-poster" 
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}
      
      {hasError ? (
        <div className="video-error">
          <div className="video-error-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <p>La vidéo n'a pas pu être chargée</p>
        </div>
      ) : (
        // Ne charger la vidéo que lorsqu'elle devient visible
        isVisible && (
          <video
            ref={videoRef}
            className={`optimized-video ${isLoaded ? 'loaded' : ''}`}
            onLoadedData={handleVideoLoaded}
            onError={handleError}
            preload="metadata"
            // controls
            autoPlay
            loop
            muted
            
            
            
            // playsInline
            poster={poster}
          >
            <source src={src} type="video/mp4" />
            Votre navigateur ne supporte pas les vidéos HTML5.
          </video>
        )
      )}
    </div>
  );
};
OptimizedVideo.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string,
  className: PropTypes.string,
  autoplay: PropTypes.bool,
};

export default OptimizedVideo;

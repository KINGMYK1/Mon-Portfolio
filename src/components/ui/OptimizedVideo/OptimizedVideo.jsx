import React, { useState, useEffect, useRef } from 'react';
import './OptimizedVideo.css';
import PropTypes from 'prop-types';

const OptimizedVideo = ({ src, poster, className = '', autoplay = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
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

  const handleVideoLoaded = () => {
    setIsLoaded(true);
    if (autoplay && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.warn('Lecture automatique impossible:', error);
      });
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`optimized-video-container ${className} animated-element`}
    >
      {/* Afficher un poster pendant le chargement */}
      {!isLoaded && poster && (
        <div 
          className="video-poster" 
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}
      
      {/* Ne charger la vidéo que lorsqu'elle devient visible */}
      {isVisible && (
        <video
          ref={videoRef}
          className={`optimized-video ${isLoaded ? 'loaded' : ''}`}
          onLoadedData={handleVideoLoaded}
          preload="metadata"
          controls
          playsInline
          poster={poster}
        >
          <source src={src} type="video/mp4" />
          Votre navigateur ne supporte pas les vidéos HTML5.
        </video>
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

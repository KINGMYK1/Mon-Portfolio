import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import useTranslation from '../../hooks/useTranslation';
// Ajoutez ces imports pour les nouvelles icônes

import { SiLeetcode } from 'react-icons/si';
import OptimizedImage from '../../components/ui/OptimizedImage/OptimizedImage';
import useTheme from '../../hooks/useTheme';
import emailjs from '@emailjs/browser';
import './Contact.css';
import { 
  FaLinkedin, 
  FaGithub, 
  FaEnvelope, 
  FaWhatsapp, 
  FaInstagram, 
  FaTelegram, 
  FaDiscord ,
  FaTwitter,
  FaRss 
  // FaLinkedin, FaGithub, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, 
} from 'react-icons/fa';
const Contact = () => {
  const t = useTranslation();
  const { theme } = useTheme();
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  // État pour l'animation des icônes sociales
  const [activeIcon, setActiveIcon] = useState(null);
  const [isOrbitPaused, setIsOrbitPaused] = useState(false);
  const [tappedItem, setTappedItem] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmLink, setConfirmLink] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Détection d'appareil mobile
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    
    // Configuration d'EmailJS
    emailjs.init({
      publicKey: "OxFutu7-O8y4U1W5C",
    });
    
    // Animation aléatoire des icônes (facultatif - vous pouvez le garder ou le supprimer)
    const animationInterval = setInterval(() => {
      if (!isOrbitPaused) {
        // Effet de pulse aléatoire sur une icône
       
        
        // Réinitialiser après un court délai
        // setTimeout(() => setActiveIcon(null), 800);
      }
    }, 4000);
    
    return () => {
      clearInterval(animationInterval);
    };
  }, [isOrbitPaused]);
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = t('contact.errors.name', 'Veuillez entrer votre nom');
    }
    
    if (!formData.email.trim()) {
      errors.email = t('contact.errors.email', 'Veuillez entrer votre email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('contact.errors.emailInvalid', 'Adresse email invalide');
    }
    
    if (!formData.message.trim()) {
      errors.message = t('contact.errors.message', 'Veuillez entrer un message');
    } else if (formData.message.length < 20) {
      errors.message = t('contact.errors.messageLength', 'Le message doit contenir au moins 20 caractères');
    }
    
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Effacer l'erreur lorsque l'utilisateur commence à corriger
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Valider le formulaire
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Indiquer que le formulaire a été soumis
    setSubmitStatus({
      submitted: true,
      success: false,
      message: t('contact.submitting', 'Envoi en cours...')
    });

    try {
      // Préparation de l'objet à envoyer
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: getSubjectLabel(formData.subject),
        message: formData.message,
        time: new Date().toLocaleString() // Ajoute l'horodatage pour le template
      };

      // Vérifiez les valeurs avant l'envoi pour le débogage
      console.log("Paramètres envoyés:", templateParams);

      // Utilisez la nouvelle syntaxe d'EmailJS v3
      const result = await emailjs.send(
        "service_ukrprkh",
        "template_fyggidq" ,       // Votre Template ID
        templateParams            // Ne pas inclure la clé publique ici
      );
      
      console.log("Résultat EmailJS:", result);
      
      // Email envoyé avec succès
      setSubmitStatus({
        submitted: true,
        success: true,
        message: t('contact.success', 'Message envoyé avec succès! Je vous répondrai dans les plus brefs délais.')
      });
      
      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        subject: 'general',
        message: ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      setSubmitStatus({
        submitted: true,
        success: false,
        message: t('contact.error', 'Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.')
      });
    }
  };
// État pour suivre l'élément central actuel
  // Fonction pour obtenir le libellé du sujet
  const getSubjectLabel = (subjectId) => {
    const option = contactOptions.find(opt => opt.id === subjectId);
    return option ? option.label : '';
  };

  const contactOptions = [
    { id: 'general', label: t('contact.subjects.general', 'Discussion générale') },
    { id: 'project', label: t('contact.subjects.project', 'Discuter d\'un projet') },
    { id: 'freelance', label: t('contact.subjects.freelance', 'Services freelance') },
    { id: 'quote', label: t('contact.subjects.quote', 'Demande de devis') }
  ];

  const socialLinks = [
    { 
      id: 'email', 
      icon: <FaEnvelope className="social-icon" />, 
      label: 'mohamedyehiyakoita@gmail.com', 
      href: 'mailto:mohamedyehiyakoita@gmail.com',
      delay: 0.3
    },
    { 
      id: 'whatsapp', 
      icon: <FaWhatsapp className="social-icon" />, 
      label: '+212 6 20 83 69 89', 
      href: 'https://wa.me/212620836989',
      delay: 0.4
    },
    { 
      id: 'instagram', 
      icon: <FaInstagram className="social-icon" />, 
      label: 'Instagram', 
      href: 'https://instagram.com/mohamed_yehiya_koita',
      delay: 0.5
    },
    { 
      id: 'linkedin', 
      icon: <FaLinkedin className="social-icon" />, 
      label: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/mohamed-yehiya-koita/',
      delay: 0.6
    },
    { 
      id: 'github', 
      icon: <FaGithub className="social-icon" />, 
      label: 'GitHub', 
      href: 'https://github.com/MYK-OTAKU',
      delay: 0.7
    },
  ];
  // Tableau pour les liens additionnels
const additionalLinks = [
  {
    id: 'telegram',
    icon: <FaTelegram />,
    label: 'Telegram',
    href: 'https://t.me/MYKDEV1'
  },
  {
    id: 'leetcode',
    icon: <SiLeetcode />,
    label: 'LeetCode',
    href: 'https://leetcode.com/u/myk-otaku/'
  },
  {
    id: 'discord',
    icon: <FaDiscord />,
    label: 'Discord',
    href: 'https://discord.gg/ehhyjUDM'
  }
];
  const handleOrbitItemClick = (e, link) => {
    if (isMobile) {
      e.preventDefault(); // Empêcher la navigation par défaut
      
      if (tappedItem === link.id) {
        // Deuxième tap: afficher la confirmation
        setConfirmLink(link.href);
        setShowConfirm(true);
      } else {
        // Premier tap: mémoriser l'élément et arrêter l'orbite
        setTappedItem(link.id);
        setActiveIcon(link.id);
        setIsOrbitPaused(true);
        
        // Réinitialiser après 3 secondes si pas de second tap
        setTimeout(() => {
          if (tappedItem === link.id) {
            setTappedItem(null);
          }
        }, 3000);
      }
    }
    // Sur desktop, comportement normal (pas besoin de preventDefault)
  };
  
  // Ajoutez cette fonction pour la redirection après confirmation
  const handleConfirm = () => {
    window.open(confirmLink, '_blank');
    setShowConfirm(false);
    setTappedItem(null);
  };
  
  // Ajoutez cette fonction pour annuler
  const handleCancel = () => {
    setShowConfirm(false);
    setTappedItem(null);
  };
  const handleAdditionalLinkClick = (e, link) => {
    if (isMobile) {
      e.preventDefault(); // Empêcher la navigation par défaut
      
      if (tappedItem === `additional-${link.id}`) {
        // Deuxième tap: afficher la confirmation
        setConfirmLink(link.href);
        setShowConfirm(true);
      } else {
        // Premier tap: mémoriser l'élément
        setTappedItem(`additional-${link.id}`);
        
        // Réinitialiser après 3 secondes si pas de second tap
        setTimeout(() => {
          if (tappedItem === `additional-${link.id}`) {
            setTappedItem(null);
          }
        }, 3000);
      }
    }
    // Sur desktop, comportement normal (pas besoin de preventDefault)
  };
  return (
    <div className="contact-page-container">
      <motion.div 
        className="contact-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent inline-block">
          {t('contact.title', 'Contactez-moi')}
        </h1>
      </motion.div>
      
      <div className="contact-grid">
        {/* Formulaire (maintenant à gauche) */}
        <motion.div 
          className="contact-form-wrapper"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="contact-form-container">
            {submitStatus.submitted && submitStatus.success ? (
              <motion.div 
                className="success-message-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="success-orbit">
                  <div className="success-planet">
                    <div className="success-check">✓</div>
                  </div>
                  <div className="orbit-path"></div>
                </div>
                <h3 className="success-title">{t('contact.successTitle', 'Message Envoyé!')}</h3>
                <p className="success-description">{submitStatus.message}</p>
                <motion.button 
                  className="reset-form-btn"
                  onClick={() => setSubmitStatus({ submitted: false, success: false, message: '' })}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('contact.sendAnother', 'Envoyer un autre message')}
                </motion.button>
              </motion.div>
            ) : (
              <>
                <h2 className="form-title">
                  {t('contact.formTitle', 'Envoyez-moi un message')}
                </h2>
                <p className="form-subtitle">
                  {t('contact.formSubtitle', 'Je vous répondrai dès que possible')}
                </p>
                
                <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">
                      <span className="label-text">{t('contact.name', 'Nom')}</span>
                    </label>
                    <div className="input-container">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t('contact.namePlaceholder', 'Votre nom')}
                        className={formErrors.name ? 'error' : ''}
                      />
                      <div className="input-focus-effect"></div>
                    </div>
                    {formErrors.name && <p className="error-message">{formErrors.name}</p>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">
                      <span className="label-text">{t('contact.email', 'Email')}</span>
                    </label>
                    <div className="input-container">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t('contact.emailPlaceholder', 'Votre adresse email')}
                        className={formErrors.email ? 'error' : ''}
                      />
                      <div className="input-focus-effect"></div>
                    </div>
                    {formErrors.email && <p className="error-message">{formErrors.email}</p>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">
                      <span className="label-text">{t('contact.subject', 'Sujet')}</span>
                    </label>
                    <div className="select-container">
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                      >
                        {contactOptions.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="select-arrow">▼</div>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">
                      <span className="label-text">{t('contact.message', 'Message')}</span>
                    </label>
                    <div className="textarea-container">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t('contact.messagePlaceholder', 'Votre message ici...')}
                        rows="5"
                        className={formErrors.message ? 'error' : ''}
                      ></textarea>
                      <div className="textarea-focus-effect"></div>
                    </div>
                    {formErrors.message && <p className="error-message">{formErrors.message}</p>}
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="submit-btn"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={submitStatus.submitted}
                  >
                    <span className="btn-text">
                      {submitStatus.submitted ? 
                        t('contact.sending', 'Envoi en cours...') : 
                        t('contact.send', 'Envoyer le message')}
                    </span>
                    <span className="btn-icon">→</span>
                  </motion.button>
                  
                  {submitStatus.submitted && !submitStatus.success && (
                    <p className="form-error-message">{submitStatus.message}</p>
                  )}
                </form>
              </>
            )}
          </div>
        </motion.div>
        
        {/* Section d'information (maintenant à droite) */}
        <motion.div 
          className="contact-info-wrapper"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Carte de profil améliorée */}
         {/* Système d'orbite solaire amélioré */}
{/* Système d'orbite solaire avec échange dynamique */}
<div className="social-orbit-container">
  <h3 className="social-title">
    {t('contact.connectWithMe', 'Connectez-vous avec moi')}
  </h3>
  
  <div 
    className={`orbit-system ${isOrbitPaused ? 'paused' : ''}`}
    onMouseLeave={() => setIsOrbitPaused(false)}
  >
    {/* Avatar central fixe */}
    <div className="avatar-center">
      <OptimizedImage 
        src="/avatar.png" 
        alt="Mohamed Yehiya Koïta" 
        className="orbit-avatar"
      />
      <div className="avatar-glow"></div>
    </div>
    
    {/* Orbites et connexions moléculaires */}
    <div className="orbit-line orbit-line-1"></div>
    <div className="orbit-line orbit-line-2"></div>
    <div className="molecular-connection connection-1"></div>
    <div className="molecular-connection connection-2"></div>
    
    {/* Éléments en orbite */}
    <div className="orbit-items-container ">
    {socialLinks.map((link, index) => (
  <a
    key={link.id}
    href={link.href}
    target={link.id !== 'email' && link.id !== 'phone' ? "_blank" : undefined}
    rel="noopener noreferrer"
    className={`orbit-item ${activeIcon === link.id ? 'active' : ''} ${tappedItem === link.id ? 'tapped' : ''}`}
    style={{
      '--index': index,
      '--total': 5
    }}
    onClick={(e) => handleOrbitItemClick(e, link)}
    onMouseEnter={() => {
      if (!isMobile) {
        setActiveIcon(link.id);
        setIsOrbitPaused(true);
      }
    }}
    onMouseLeave={() => {
      if (!isMobile) {
        setActiveIcon(null);
      }
    }}
  >
    <div className="orbit-icon">
      {link.icon}
    </div>
    <span className="orbit-tooltip">{link.label}</span>
  </a>
))}
    </div>
    
    {/* Info badge sous l'orbite */}
    <div className="orbit-info">
      <h4 className="orbit-name">Mohamed Yehiya Koïta</h4>
      <p className="orbit-title">Full Stack Developer</p>
      <span className="orbit-badge">Disponible pour des missions</span>
    </div>
    
    {/* Liens supplémentaires */}
    <div className="additional-social-links">
  {additionalLinks.map(link => (
    <a 
      key={link.id}
      href={link.href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`additional-link ${tappedItem === `additional-${link.id}` ? 'tapped' : ''}`}
      onClick={(e) => handleAdditionalLinkClick(e, link)}
    >
      {link.icon}
      <span className="additional-tooltip">{link.label}</span>
    </a>
  ))}
</div>
  </div>
</div>
        </motion.div>
      </div>
      
      {/* Éléments décoratifs d'arrière-plan */}
      <div className="contact-background-elements">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-blur blur-1"></div>
        <div className="bg-blur blur-2"></div>
        <div className="bg-grid"></div>
        <div className="bg-lines">
          <div className="line line-1"></div>
          <div className="line line-2"></div>
          <div className="line line-3"></div>
        </div>
      </div>
      {/* Boîte de dialogue de confirmation */}
{showConfirm && (
  <div className="confirm-dialog">
    <div className="confirm-content">
      <p>{t('contact.confirmRedirect', 'Êtes-vous sûr de vouloir accéder à ce lien ?')}</p>
      <div className="confirm-buttons">
        <button onClick={handleCancel} className="cancel-btn">
          {t('contact.cancel', 'Annuler')}
        </button>
        <button onClick={handleConfirm} className="confirm-btn">
          {t('contact.confirm', 'Confirmer')}
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Contact;
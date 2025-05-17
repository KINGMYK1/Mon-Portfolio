import emailjs from '@emailjs/browser';

/**
 * Service d'email unifié qui prend en charge différents types d'emails
 */
export const sendEmail = async (emailData) => {
  try {
    // Déterminer le template à utiliser
    const templateID = emailData.templateId || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    
    if (!serviceID || !templateID || !PUBLIC_KEY) {
      console.error("Configuration EmailJS manquante");
      throw new Error("Configuration d'email manquante");
    }
    
    // Debug
    console.log(`Envoi d'email avec template: ${templateID}`);
    
    // Structure des paramètres selon le type d'email
    let templateParams;
    
    if (emailData.html) {
      // Format pour les emails Gemini (conversations IA)
      templateParams = {
        name: emailData.userName || "Visiteur anonyme",
        email: emailData.userEmail || "Non fourni",
        subject: emailData.subject || "Conversation IA",
        message: emailData.html || emailData.message || "",
        time: new Date().toLocaleString()
      };
    } else {
      // Format pour les emails du formulaire de contact
      templateParams = {
        from_name: emailData.from_name || emailData.userName || "Visiteur anonyme",
        from_email: emailData.from_email || emailData.userEmail || "Non fourni",
        subject: emailData.subject || "Message du portfolio",
        message: emailData.message || "",
        time: new Date().toLocaleString()
      };
    }
    
    console.log("Paramètres envoyés:", JSON.stringify(templateParams).substring(0, 100) + "...");
    
    // Utilisation correcte de la bibliothèque emailjs sans Fetch direct
    const response = await emailjs.send(
      serviceID,
      templateID,
      templateParams
    );
    
    console.log('Email envoyé avec succès!', response);
    return response;
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    console.error('Détails:', error.text || error.message);
    throw error;
  }
};

// Initialisation d'EmailJS - CRUCIAL
export const initEmailJS = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    // Initialiser la clé publique ici est essentiel
    emailjs.init(publicKey);
    console.log("EmailJS initialisé avec succès");
    return true;
  }
  console.warn("Clé EmailJS non configurée");
  return false;
};
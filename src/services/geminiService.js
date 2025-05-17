import { GoogleGenerativeAI } from "@google/generative-ai";
import { sendEmail } from "./emailService";

// Récupération de la clé API depuis les variables d'environnement
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Création de l'instance Gemini
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// Profil de Mohamed (informations essentielles uniquement)
const MOHAMED_INFO = {
  fullName: "Mohamed Yehiya Koïta",
  role: "Développeur Full Stack",
  skills: ["React", "Angular", "Node.js", "MSSQL", "React Native"],
  experience: "Freelance et stages chez Digicard (mobile) et Gouvernancia (IT)",
  education: "Licence en Ingénierie des Applications Web et Mobiles",
  contact: "mohamedyehiyakoita@gmail.com, +212 0620836989",
  availability: "Disponible pour des opportunités professionnelles"
};

// Génération dynamique d'un agenda basé sur la date actuelle
function generateDynamicSchedule(daysAhead = 14) {
  const schedule = {};
  const today = new Date();
  
  // Générer l'agenda pour les X prochains jours
  for (let i = 0; i < daysAhead; i++) {
    const currentDate = new Date();
    currentDate.setDate(today.getDate() + i);
    
    // Format YYYY-MM-DD
    const dateString = currentDate.toISOString().split('T')[0];
    
    // Le weekend (samedi et dimanche) a une disponibilité réduite
    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
    
    // Générer des disponibilités aléatoires mais réalistes
    schedule[dateString] = {
      morning: isWeekend ? Math.random() > 0.7 : Math.random() > 0.3,
      afternoon: isWeekend ? Math.random() > 0.7 : Math.random() > 0.3,
      evening: isWeekend ? Math.random() > 0.8 : Math.random() > 0.5
    };
  }
  
  return schedule;
}

// Agenda dynamique pour Mohamed, basé sur la date actuelle
const MOHAMED_SCHEDULE = generateDynamicSchedule();

// Chat pour maintenir le contexte
let chatHistory = [];
const MAX_HISTORY_LENGTH = 10;

// Information de l'utilisateur collectées pendant la conversation
let userInfo = {
  name: "",
  email: "",
  phone: "",
  appointmentRequested: false,
  appointmentDateTime: null,
  appointmentPurpose: "",
  emailCollected: false,
  schedulingInProgress: false,
  pageUrl: window.location.href, // Capturer l'URL de la page
  userAgent: navigator.userAgent, // Capturer les infos du navigateur
  conversationStartTime: new Date().toISOString()
};

// Variable pour suivre si c'est le premier message
let isFirstInteraction = true;

// Base de données d'apprentissage - stockage des nouvelles informations
const learningDatabase = {
  skills: [...MOHAMED_INFO.skills],
  projects: [],
  questions: {}, // Questions et réponses inconnues
  addSkill(skill) {
    if (!this.skills.includes(skill)) {
      this.skills.push(skill);
      return true;
    }
    return false;
  },
  addProject(project) {
    this.projects.push(project);
  },
  addQuestion(question, answer = null) {
    this.questions[question] = answer;
  }
};

// Fonction pour envoyer la conversation à Mohamed par email
export const sendConversationToMohamed = async (reason = "Fin de conversation") => {
  if (chatHistory.length === 0) return;
  
  // Formatage de la conversation pour l'email avec meilleur style visuel
  const formattedConversation = chatHistory.map((msg, i) => {
    const isUser = i % 2 === 0;
    return `
      <div style="display: flex; margin-bottom: 10px; align-items: flex-start;">
        <div style="width: 40px; height: 40px; border-radius: 50%; background-color: ${isUser ? '#6366f1' : '#10b981'}; display: flex; justify-content: center; align-items: center; margin-right: 10px; flex-shrink: 0;">
          <span style="color: white; font-weight: bold;">${isUser ? 'U' : 'A'}</span>
        </div>
        <div style="flex-grow: 1; max-width: 85%;">
          <div style="font-weight: bold; margin-bottom: 3px; color: ${isUser ? '#4f46e5' : '#047857'};">
            ${isUser ? 'Visiteur' : 'Assistant'}
          </div>
          <div style="background-color: ${isUser ? '#f3f4f6' : '#f0fdf4'}; padding: 8px 12px; border-radius: 8px; border-left: 3px solid ${isUser ? '#6366f1' : '#10b981'};">
            ${msg.content.replace(/\n/g, '<br>')}
          </div>
        </div>
      </div>`;
  }).join('');

  // Préparation des informations utilisateur
  const userInfoPart = `
    <strong>Informations utilisateur:</strong><br/>
    ${userInfo.name ? `• Nom: ${userInfo.name}<br/>` : ''}
    ${userInfo.email ? `• Email: ${userInfo.email}<br/>` : ''}
    ${userInfo.phone ? `• Téléphone: ${userInfo.phone}<br/>` : ''}
    ${userInfo.appointmentRequested ? 
      `• Demande de rendez-vous: ${userInfo.appointmentDateTime || 'Date non précisée'}<br/>
       • Objet: ${userInfo.appointmentPurpose || 'Non précisé'}<br/>` 
      : ''}
    • Page visitée: ${userInfo.pageUrl}<br/>
  `;
  
  // Questions sans réponse
  let questionsHTML = '';
  if (learningDatabase.questions && Object.keys(learningDatabase.questions).length > 0) {
    const unansweredQuestions = Object.entries(learningDatabase.questions)
      .filter(([_, answer]) => answer === null)
      .map(([question, _]) => `• ${question}`)
      .join('<br/>');
    
    if (unansweredQuestions) {
      questionsHTML = `
        <strong>Questions sans réponse:</strong><br/>
        ${unansweredQuestions}
      `;
    }
  }
  
  // Message complet avec le nouveau formatage
  const messageContent = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">Nouvelle conversation - ${reason}</h2>
      
      <div style="margin-bottom: 20px; padding: 15px; background-color: #f5f7fa; border-radius: 8px; border-left: 4px solid #6366f1;">
        <h3 style="margin-top: 0; color: #4f46e5;">Informations utilisateur</h3>
        ${userInfoPart}
      </div>
      
      <div style="margin-bottom: 20px;">
        <h3 style="color: #4f46e5; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Conversation</h3>
        <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
          ${formattedConversation}
        </div>
      </div>
      
      ${questionsHTML ? `
      <div style="margin-top: 20px; padding: 15px; background-color: #fff4e5; border-radius: 8px; border-left: 4px solid #ff9800;">
        <h3 style="margin-top: 0; color: #d97706;">Questions sans réponse</h3>
        ${questionsHTML}
      </div>` : ''}
      
      <!-- Section debug optionnelle -->
      <div style="margin-top: 30px; padding: 15px; background-color: #f1f5f9; border-radius: 8px; font-family: monospace; font-size: 12px;">
        <h4 style="margin-top: 0; color: #64748b; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px;">Informations techniques</h4>
        <ul style="color: #64748b; padding-left: 20px;">
          <li>Intentions détectées: ${userInfo.appointmentRequested ? 'Rendez-vous' : 'Information'}</li>
          <li>Email collecté: ${userInfo.emailCollected ? 'Oui' : 'Non'}</li>
          <li>Questions posées: ${chatHistory.filter((_, i) => i % 2 === 0).length}</li>
          <li>Questions sans réponse: ${Object.values(learningDatabase.questions).filter(v => v === null).length}</li>
          <li>Compétences connues: ${learningDatabase.skills.length}</li>
        </ul>
      </div>
    </div>
  `;
  
  try {
    // Envoi avec le nouveau format
    await sendEmail({
      templateId: import.meta.env.VITE_EMAILJS_GEMINI_TEMPLATE_ID, // Explicitement spécifier le template Gemini
      subject: `Conversation IA - ${reason}`,
      userName: userInfo.name || "Visiteur anonyme",
      userEmail: userInfo.email || "Non fourni",
      message: messageContent,
      html: messageContent, // Double envoi pour s'assurer que le contenu est bien transmis
    });
    
    console.log("Conversation Gemini envoyée à Mohamed avec succès");
  } catch (error) {
    console.error("Erreur lors de l'envoi de la conversation Gemini:", error);
  }
};
// Fonction pour envoyer une notification de rendez-vous à Mohamed
const sendAppointmentNotification = async () => {
  if (!userInfo.appointmentRequested) return;
  
  const emailContent = {
    to: "mohamedyehiyakoita@gmail.com",
    subject: "Nouvelle demande de rendez-vous",
    html: `
      <h2>Nouvelle demande de rendez-vous</h2>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      
      <h3>Informations sur le rendez-vous</h3>
      <ul>
        ${userInfo.name ? `<li><strong>Nom:</strong> ${userInfo.name}</li>` : ''}
        ${userInfo.email ? `<li><strong>Email:</strong> ${userInfo.email}</li>` : ''}
        ${userInfo.phone ? `<li><strong>Téléphone:</strong> ${userInfo.phone}</li>` : ''}
        <li><strong>Date/heure proposée:</strong> ${userInfo.appointmentDateTime || 'Non précisée'}</li>
        <li><strong>Objet:</strong> ${userInfo.appointmentPurpose || 'Non précisé'}</li>
      </ul>
      
      <p>Merci de confirmer cette demande de rendez-vous dès que possible.</p>
    `
  };
  
  try {
    await sendEmail(emailContent);
    console.log("Notification de rendez-vous envoyée");
  } catch (error) {
    console.error("Erreur lors de l'envoi de la notification:", error);
  }
};

// Fonction pour envoyer une question inconnue à Mohamed
const sendUnknownQuestionNotification = async (question) => {
  const emailContent = {
    to: "mohamedyehiyakoita@gmail.com",
    subject: "Question sans réponse dans le portfolio",
    html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">Question sans réponse</h2>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      
      <div style="margin: 20px 0; padding: 15px; background-color: #f0fdf4; border-radius: 8px; border-left: 4px solid #10b981;">
        <h3 style="margin-top: 0; color: #047857;">Question</h3>
        <p style="font-size: 16px; font-weight: 500;">${question}</p>
      </div>
      
      <div style="margin-top: 20px;">
        <h3 style="color: #4f46e5;">Contexte</h3>
        <p>Un visiteur a posé cette question et l'assistant n'avait pas d'information pour y répondre.</p>
        
        <p style="font-weight: bold;">Pour ajouter cette connaissance à l'assistant:</p>
        <ol>
          <li>Répondez à cet email avec votre réponse</li>
          <li>Ajoutez cette question dans votre base de données de connaissances</li>
          <li>L'assistant pourra répondre à cette question lors des prochaines interactions</li>
        </ol>
      </div>

      <div style="margin-top: 30px; text-align: center;">
        <a href="mailto:mohamedyehiyakoita@gmail.com?subject=Réponse à: ${encodeURIComponent(question)}&body=La réponse est: " 
           style="background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Répondre rapidement
        </a>
      </div>
    </div>
  `
  };
  
  try {
    await sendEmail(emailContent);
    console.log("Question inconnue envoyée");
  } catch (error) {
    console.error("Erreur lors de l'envoi de la question:", error);
  }
};

// Fonction pour générer une réponse
export const generateResponse = async (prompt) => {
  try {
    // Analyser la demande pour détecter des intentions spécifiques
    analyzeUserIntent(prompt);
    
    // Tester d'abord si c'est une conversation simple ou une demande de rendez-vous
    const specialResponseResult = handleSpecialRequests(prompt);
    if (specialResponseResult) {
      console.log("Réponse spéciale générée localement");
      updateChatHistory(prompt, specialResponseResult);
      
      // Si c'est une demande de rendez-vous confirmée, envoyer notification
      if (userInfo.appointmentRequested && userInfo.emailCollected && userInfo.appointmentDateTime) {
        sendAppointmentNotification();
      }
      
      return specialResponseResult;
    }
    
    // Tester si c'est une conversation simple
    const casualResponseResult = handleCasualConversation(prompt);
    if (casualResponseResult) {
      console.log("Réponse de conversation simple générée localement");
      
      // Si ce n'est pas la première interaction, supprimer les salutations potentielles
      let response = casualResponseResult;
      if (!isFirstInteraction) {
        response = removeSalutations(response);
      }
      
      // Marquer que la première interaction est terminée
      isFirstInteraction = false;
      updateChatHistory(prompt, response);
      return response;
    }
    
    // Vérifier si la question est déjà dans la base d'apprentissage
    if (learningDatabase.questions[prompt.toLowerCase().trim()]) {
      const answer = learningDatabase.questions[prompt.toLowerCase().trim()];
      if (answer) {
        updateChatHistory(prompt, answer);
        return answer;
      }
    }
    
    // Si ce n'est pas une question simple, utiliser Gemini
    if (!genAI) {
      console.error("L'API Gemini n'est pas configurée");
      const fallbackResponse = createMixedResponse(prompt);
      updateChatHistory(prompt, fallbackResponse);
      return fallbackResponse;
    }

    console.log("Envoi de requête à Gemini avec prompt:", prompt.substring(0, 20) + "...");
    
    // Configuration du modèle
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 800,
      }
    });
    
    // Instructions personnalisées avec contexte utilisateur et capacités réalistes
    const enhancedPrompt = `
Tu es l'assistant virtuel sympa et décontracté de Mohamed Yehiya Koïta.

INFOS SUR MOHAMED: ${JSON.stringify({...MOHAMED_INFO, skills: learningDatabase.skills})}

INFOS SUR L'UTILISATEUR: ${JSON.stringify(userInfo)}

DATE ACTUELLE: ${new Date().toISOString().split('T')[0]}

LIMITES ET CAPACITÉS RÉELLES:
- Tu n'as PAS accès à l'agenda de Mohamed en temps réel
- Tu ne peux PAS envoyer d'e-mails directement
- Tu dois TOUJOURS collecter les informations nécessaires avant de promettre des actions
- Si tu ne connais pas la réponse à une question, dis-le clairement au lieu d'inventer

INSTRUCTIONS IMPORTANTES:
- Sois naturel et conversationnel, comme un ami qui présente Mohamed
- Adapte ton langage au ton utilisé par l'interlocuteur
${isFirstInteraction 
  ? "- C'est la première fois que tu parles avec cette personne, commence par une salutation amicale" 
  : "- C'est une CONVERSATION EN COURS, ne dis PAS bonjour/salut/hello et ne te présente pas à nouveau"}
- Si l'utilisateur demande un rendez-vous:
  1. Demande la date, l'heure et l'objet du rendez-vous
  2. Dis que tu vas transmettre sa demande à Mohamed
  3. Demande son email pour que Mohamed puisse confirmer
  4. Précise que c'est Mohamed qui confirmera personnellement la disponibilité
- Si l'utilisateur pose une question à laquelle tu ne connais pas la réponse:
  1. Admets honnêtement que tu ne connais pas la réponse
  2. Indique que tu vas transmettre sa question à Mohamed
- Si tu as déjà l'email de l'utilisateur, rappelle-le dans ta réponse
- N'oublie pas: tu dois être PERSONNALISÉ et PAS ROBOTIQUE!
- Tu peux utiliser des émojis modérément si approprié 😊

CONTEXTE DE LA CONVERSATION:
${chatHistory.map((msg, i) => `${i % 2 === 0 ? 'User' : 'Assistant'}: ${msg.content}`).join('\n')}

User: ${prompt}`;

    // Envoi à l'API
    const result = await model.generateContent(enhancedPrompt);
    let responseText = result.response.text();
    
    // Si ce n'est pas la première interaction, supprimer les salutations
    if (!isFirstInteraction) {
      responseText = removeSalutations(responseText);
    }
    
    // Post-traitement de la réponse pour s'assurer qu'elle est cohérente
    responseText = postProcessResponse(responseText, prompt);
    
    // Détecter les réponses incertaines qui nécessitent l'intervention de Mohamed
    if (detectUncertaintyInResponse(responseText, prompt)) {
      // Stocker la question sans réponse
      learningDatabase.addQuestion(prompt.toLowerCase().trim(), null);
      
      // Envoyer une notification à Mohamed pour cette question
      sendUnknownQuestionNotification(prompt);
    }
    
    // Mettre à jour l'historique
    updateChatHistory(prompt, responseText);
    
    // Marquer que la première interaction est terminée
    isFirstInteraction = false;
    
    return responseText;
    
  } catch (error) {
    console.error("Erreur Gemini:", error);
    
    // Fallback amélioré qui utilise un mélange de réponses au lieu d'une seule réponse fixe
    const fallbackResponse = createMixedResponse(prompt);
    updateChatHistory(prompt, fallbackResponse);
    return fallbackResponse;
  }
};

// Détecter l'incertitude dans les réponses
function detectUncertaintyInResponse(response, prompt) {
  const lowerResponse = response.toLowerCase();
  const lowerPrompt = prompt.toLowerCase();
  
  // Termes indiquant que l'assistant n'est pas sûr
  const uncertaintyMarkers = [
    "je n'ai pas cette information",
    "je ne connais pas",
    "je n'ai pas de détails",
    "je ne suis pas sûr",
    "je n'ai pas ces informations",
    "je ne dispose pas",
    "je n'ai pas accès",
    "désolé, je ne peux pas",
    "je ne pourrais pas te dire"
  ];
  
  // Si la question porte sur les compétences spécifiques, l'expérience ou les projets
  const importantTopics = [
    "laravel", "vue", "flutter", "java ", "python", "php", "wordpress",
    "projet", "réalisation", "portfolio", "âge", "age", "github", "linkedin"
  ];
  
  const containsUncertainty = uncertaintyMarkers.some(marker => lowerResponse.includes(marker));
  const isImportantTopic = importantTopics.some(topic => lowerPrompt.includes(topic));
  
  return containsUncertainty && isImportantTopic;
}

// Analyser les intentions de l'utilisateur
function analyzeUserIntent(prompt) {
  const lowerPrompt = prompt.toLowerCase().trim();
  
  // Détecter une demande de rendez-vous
  if (
    lowerPrompt.includes("rendez-vous") || 
    lowerPrompt.includes("rdv") || 
    lowerPrompt.includes("rencontre") || 
    lowerPrompt.includes("meeting") || 
    lowerPrompt.includes("disponibilité") || 
    /quand peut|peut(-| )on se voir/.test(lowerPrompt)
  ) {
    userInfo.appointmentRequested = true;
    userInfo.schedulingInProgress = true;
    
    // Essayer de détecter l'objet du rendez-vous
    if (lowerPrompt.includes("entretien")) {
      userInfo.appointmentPurpose = "Entretien professionnel";
    } else if (lowerPrompt.includes("projet")) {
      userInfo.appointmentPurpose = "Discussion de projet";
    } else if (lowerPrompt.includes("conseil") || lowerPrompt.includes("question")) {
      userInfo.appointmentPurpose = "Demande de conseil";
    }
    
    // Essayer de détecter une date/heure proposée
    // Détection pour "demain"
    if (lowerPrompt.includes("demain")) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      userInfo.appointmentDateTime = tomorrow.toISOString().split('T')[0];
    }
    
    // Détection pour jours de la semaine
    const days = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
    const today = new Date().getDay(); // 0 = dimanche, 1 = lundi, ...
    
    for (let i = 0; i < days.length; i++) {
      if (lowerPrompt.includes(days[i])) {
        // Calculer le nombre de jours à ajouter
        let daysToAdd = (i + 1) - today;
        if (daysToAdd <= 0) daysToAdd += 7; // si c'est dans le passé, passer à la semaine prochaine
        
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + daysToAdd);
        userInfo.appointmentDateTime = targetDate.toISOString().split('T')[0];
        break;
      }
    }
    
    // Détection des heures
    const hourMatch = lowerPrompt.match(/(\d{1,2})[h:](\d{0,2})/);
    if (hourMatch) {
      const hour = hourMatch[1];
      const minute = hourMatch[2] || "00";
      userInfo.appointmentDateTime = (userInfo.appointmentDateTime || new Date().toISOString().split('T')[0]) + ` à ${hour}:${minute.padEnd(2, '0')}`;
    }
  }
  
  // Détecter un email
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const emailMatch = prompt.match(emailRegex);
  if (emailMatch) {
    userInfo.email = emailMatch[0];
    userInfo.emailCollected = true;
  }
  
  // Détecter un nom
  if (lowerPrompt.includes("je m'appelle") || lowerPrompt.includes("mon nom est") || lowerPrompt.includes("c'est ") && lowerPrompt.length < 20) {
    const nameMatch = prompt.match(/je m'appelle (.+?)[\.,]|mon nom est (.+?)[\.,]|c'est (.+?)[\.,]/i);
    if (nameMatch) {
      userInfo.name = nameMatch[1] || nameMatch[2] || nameMatch[3];
    }
  }
  
  // Détecter un numéro de téléphone
  const phoneRegex = /(\+\d{1,3}[\s.-]?)?(\d{2,3}[\s.-]?){3,5}\d{2,3}/;
  const phoneMatch = prompt.match(phoneRegex);
  if (phoneMatch) {
    userInfo.phone = phoneMatch[0];
  }
}

// Gestion des requêtes spéciales (comme la prise de rendez-vous)
function handleSpecialRequests(prompt) {
  const lowerPrompt = prompt.toLowerCase().trim();
  
  // Si une demande de rendez-vous est en cours et que l'utilisateur fournit une date/heure
  if (userInfo.schedulingInProgress) {
    // Si l'utilisateur propose une date/heure
    if (
      lowerPrompt.includes("demain") || 
      lowerPrompt.includes("lundi") || lowerPrompt.includes("mardi") || 
      lowerPrompt.includes("mercredi") || lowerPrompt.includes("jeudi") || 
      lowerPrompt.includes("vendredi") || lowerPrompt.includes("samedi") || 
      lowerPrompt.includes("dimanche") ||
      /\d{1,2}h/.test(lowerPrompt) ||
      /\d{1,2}:\d{2}/.test(lowerPrompt)
    ) {
      // Si on n'a pas encore demandé l'email
      if (!userInfo.emailCollected) {
        return "Merci pour ces précisions. Je vais transmettre cette demande de rendez-vous à Mohamed, qui vérifiera sa disponibilité. Pour qu'il puisse te confirmer le rendez-vous, pourrais-tu me communiquer ton adresse email ?";
      } else {
        // Notification de rendez-vous immédiate
        sendAppointmentNotification();
        return `Parfait ! Je viens de transmettre ta demande de rendez-vous à Mohamed. Il va vérifier sa disponibilité et te confirmera directement à l'adresse ${userInfo.email} dans les plus brefs délais. Est-ce qu'il y a autre chose que tu souhaiterais savoir sur Mohamed en attendant ?`;
      }
    }
    
    // Si l'utilisateur fournit un email après qu'on lui a demandé
    if (userInfo.emailCollected && lowerPrompt.includes("@")) {
      // Notification de rendez-vous immédiate
      sendAppointmentNotification();
      return `Merci ! J'ai bien noté ton email (${userInfo.email}). Je viens d'informer Mohamed de ta demande de rendez-vous. Il va vérifier sa disponibilité et te recontactera rapidement pour confirmer. Y a-t-il autre chose que je puisse faire pour toi ?`;
    }
  }
  
  // Détection d'une nouvelle demande de rendez-vous
  if (
    (lowerPrompt.includes("rendez-vous") || lowerPrompt.includes("rdv") || lowerPrompt.includes("rencontre")) &&
    (lowerPrompt.includes("prendre") || lowerPrompt.includes("fixer") || lowerPrompt.includes("organiser") || lowerPrompt.includes("possible"))
  ) {
    userInfo.appointmentRequested = true;
    userInfo.schedulingInProgress = true;
    
    return `Bien sûr ! Mohamed sera ravi d'organiser un rendez-vous avec toi. Pourrais-tu me préciser quand tu serais disponible (date et heure) ? Et aussi, quel serait l'objet de ce rendez-vous ? Une fois ces détails communiqués, je transmettrai ta demande à Mohamed qui vérifiera sa disponibilité.`;
  }
  
  // Si ce n'est pas une requête spéciale, retourner null pour utiliser le traitement standard
  return null;
}

// Fonction pour supprimer les salutations au début des réponses
function removeSalutations(text) {
  // Supprime les salutations communes au début du texte
  return text.replace(/^(salut|hey|bonjour|hello|coucou|eh salut|yo|hola)(!|\s|\.|,|;|:).*?(?=\s[A-Z])/i, "")
             .trim()
             .replace(/^[,;:.!]\s*/, ""); // Nettoie les ponctuations qui pourraient rester au début
}

// Post-traitement pour vérifier la cohérence de la réponse
function postProcessResponse(response, prompt) {
  // Vérifier si la réponse promet d'envoyer un email sans avoir collecté l'adresse
  if (
    (response.toLowerCase().includes("envoyer un email") || 
     response.toLowerCase().includes("confirmer par email") || 
     response.toLowerCase().includes("par mail")) && 
    !userInfo.emailCollected &&
    !response.toLowerCase().includes("quelle est ton adresse email") &&
    !response.toLowerCase().includes("ton email")
  ) {
    response += "\n\nMais j'aurais besoin de ton adresse email pour que Mohamed puisse t'envoyer cette confirmation. Pourrais-tu me la communiquer ?";
  }
  
  // Vérifier si la réponse confirme directement un créneau sans préciser la vérification
  if (
    response.toLowerCase().includes("c'est disponible") || 
    response.toLowerCase().includes("ça devrait le faire") || 
    response.toLowerCase().includes("ça marche pour")
  ) {
    if (!response.toLowerCase().includes("vérifier") && !response.toLowerCase().includes("confirmer")) {
      response = response.replace(
        /(c'est disponible|ça devrait le faire|ça marche pour)/i, 
        "Je vais transmettre cette demande à Mohamed pour qu'il vérifie sa disponibilité, mais normalement $1"
      );
    }
  }
  
  return response;
}

// Gérer les conversations décontractées localement pour plus de réactivité
function handleCasualConversation(prompt) {
  const lowerPrompt = prompt.toLowerCase().trim();
  
  // Salutations informelles
  if (/^(yo|hey|salut|hi|hello|bonjour|coucou|wesh|slt)$/i.test(lowerPrompt)) {
    const greetings = [
      "Hey! Comment je peux t'aider aujourd'hui concernant Mohamed?",
      "Salut! Besoin d'infos sur Mohamed, son travail ou ses compétences?",
      "Hello! Je suis là pour te parler de Mohamed. Que veux-tu savoir?",
      "Coucou! Je peux te renseigner sur Mohamed. Que veux-tu découvrir?"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Questions de type "ça va"
  if (/^(ça va|ca va|comment vas-tu|comment ça va|tu vas bien|ça roule|la forme)\??$/i.test(lowerPrompt)) {
    // Différentes réponses selon que c'est la première interaction ou non
    const firstInteractionResponses = [
      "Ça va super bien, merci de demander! Je suis là pour te parler de Mohamed. Comment puis-je t'aider?",
      "Je vais bien! Sympa de ta part de demander. Je suis prêt à répondre à tes questions sur Mohamed.",
      "Tout va bien de mon côté! Et toi? En quoi puis-je t'aider concernant Mohamed aujourd'hui?"
    ];
    
    const continuedInteractionResponses = [
      "Oui, ça va très bien! Tu voulais savoir quelque chose sur Mohamed?",
      "Bien, merci! Revenons à Mohamed - tu avais une question particulière?",
      "Ça roule! Alors, concernant Mohamed, que veux-tu savoir exactement?"
    ];
    
    const responses = isFirstInteraction ? firstInteractionResponses : continuedInteractionResponses;
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Questions simples sur Mohamed
  if (/qui est mohamed|parle-?moi de mohamed/i.test(lowerPrompt)) {
    return `Mohamed Yehiya Koïta est un développeur Full Stack talentueux, spécialisé en React, Angular et Node.js. Il a de l'expérience en freelance et a fait des stages chez Digicard où il a travaillé sur des applications mobiles, et chez Gouvernancia dans l'IT. Il est actuellement disponible pour de nouvelles opportunités! Que voudrais-tu savoir plus précisément sur lui?`;
  }
  
  // Questions sur le nom
  if (/comment( il)? s'appelle(-t-il)?|c'est qui|quel est son nom/i.test(lowerPrompt)) {
    return `Il s'appelle Mohamed Yehiya Koïta ! 😄`;
  }
  
  // Questions sur la formation
  if (/formation|études|diplôme|diplome|niveau d'étude|niveau scolaire/i.test(lowerPrompt)) {
    return `Mohamed a une Licence en Ingénierie des Applications Web et Mobiles. Sa formation lui a permis d'acquérir de solides compétences techniques qu'il a ensuite appliquées dans ses projets professionnels.`;
  }
  
  // Petites affirmations ou remerciements
  if (/^(merci|ok|d'accord|compris|je vois|parfait|super|génial)$/i.test(lowerPrompt)) {
    const acknowledgements = [
      "Avec plaisir ! Tu as d'autres questions ?",
      "De rien ! Tu souhaites savoir autre chose sur Mohamed ?",
      "Je t'en prie ! Je reste disponible si tu as besoin d'autres infos.",
      "Pas de problème ! N'hésite pas si tu as d'autres questions."
    ];
    return acknowledgements[Math.floor(Math.random() * acknowledgements.length)];
  }
  
  // Si ce n'est pas une conversation simple, retourner null pour utiliser Gemini
  return null;
}

// Créer une réponse mixte à partir de templates variés
function createMixedResponse(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  
  // Préparation de la réponse selon le type de question
  let response = "";
  
  // Si c'est une question sur les compétences
  if (lowerPrompt.includes('compétence') || lowerPrompt.includes('skill') || lowerPrompt.includes('sait faire')) {
    const skillResponses = [
      `${isFirstInteraction ? "Mohamed" : "Il"} est un développeur Full Stack avec de solides compétences en ${learningDatabase.skills.join(', ')}. ${isFirstInteraction ? "Il" : ""} est particulièrement à l'aise avec le développement web moderne.`,
      `Les points forts de ${isFirstInteraction ? "Mohamed" : "ses compétences"} sont ${learningDatabase.skills.slice(0, 3).join(', ')}. Il maîtrise aussi ${learningDatabase.skills.slice(3).join(' et ')}.`,
      `${isFirstInteraction ? "Mohamed a" : "Il a"} développé une expertise en ${learningDatabase.skills.join(', ')}. Il peut construire des applications complètes du frontend au backend.`
    ];
    response = skillResponses[Math.floor(Math.random() * skillResponses.length)];
  }
  
  // Si c'est une question sur l'expérience
  else if (lowerPrompt.includes('expérience') || lowerPrompt.includes('parcours') || lowerPrompt.includes('travail')) {
    const expResponses = [
      `${isFirstInteraction ? "Mohamed travaille" : "Il travaille"} en freelance et a fait des stages chez Digicard et Gouvernancia. Chez Digicard, il a développé une app mobile et chez Gouvernancia, il a travaillé sur un système de journalisation SSH.`,
      `${isFirstInteraction ? "L'expérience de Mohamed" : "Son expérience"} inclut du développement mobile chez Digicard et des solutions IT chez Gouvernancia. Il travaille aussi en freelance sur divers projets web.`,
      `${isFirstInteraction ? "Mohamed a" : "Il a"} acquis de l'expérience variée: développement mobile avec React Native chez Digicard, IT avec Apache Guacamole chez Gouvernancia, et divers projets freelance.`
    ];
    response = expResponses[Math.floor(Math.random() * expResponses.length)];
  }
  
  // Si c'est une question sur le contact
  else if (lowerPrompt.includes('contact') || lowerPrompt.includes('joindre') || lowerPrompt.includes('email') || lowerPrompt.includes('mail')) {
    response = `Pour contacter Mohamed, tu peux lui envoyer un email à mohamedyehiyakoita@gmail.com ou l'appeler au +212 0620836989.`;
  }
  
  // Si c'est une demande de rendez-vous
  else if (userInfo.appointmentRequested || lowerPrompt.includes('rendez-vous') || lowerPrompt.includes('rdv') || lowerPrompt.includes('disponible')) {
    if (!userInfo.emailCollected) {
      response = `Pour organiser un rendez-vous avec Mohamed, il me faudrait quelques informations : quand souhaiterais-tu le rencontrer (date et heure) et pour quel sujet ? Ensuite, il me faudrait ton adresse email pour que Mohamed puisse te confirmer sa disponibilité.`;
    } else {
      response = `Je vais transmettre ta demande de rendez-vous à Mohamed. Il vérifiera sa disponibilité et te contactera directement à l'adresse ${userInfo.email} pour confirmer.`;
    }
  }
  
  // Question inconnue
  else if (lowerPrompt.length > 5 && lowerPrompt.includes("?")) {
    response = `Désolé, je n'ai pas toutes les informations pour répondre précisément à cette question. Je vais la transmettre à Mohamed qui pourra te donner une réponse plus détaillée. En attendant, puis-je t'aider avec autre chose concernant ses compétences ou son parcours ?`;
    
    // Enregistrer la question inconnue pour apprentissage
    learningDatabase.addQuestion(prompt.toLowerCase().trim(), null);
  }
  
  // Réponse générale par défaut
  else {
    const generalResponses = [
      `${isFirstInteraction ? "Je peux te parler de Mohamed, un" : "Mohamed est un"} développeur Full Stack. Tu veux connaître ses compétences, son expérience, ou autre chose?`,
      `${isFirstInteraction ? "Mohamed est un développeur Full Stack que je représente. Que" : "Que"} voudrais-tu savoir sur lui - ses projets, compétences ou formation?`,
      `${isFirstInteraction ? "Je suis là pour te renseigner sur Mohamed Yehiya Koïta. Tu" : "Tu"} cherches des infos particulières sur son parcours ou ses compétences?`
    ];
    response = generalResponses[Math.floor(Math.random() * generalResponses.length)];
  }
  
  // Marquer que la première interaction est terminée
  isFirstInteraction = false;
  
  return response;
}

// Mettre à jour l'historique du chat
function updateChatHistory(userMessage, botResponse) {
  // Ajouter à l'historique
  chatHistory.push({ role: "user", content: userMessage });
  chatHistory.push({ role: "assistant", content: botResponse });
  
  // Limiter la taille de l'historique
  if (chatHistory.length > MAX_HISTORY_LENGTH * 2) {
    chatHistory = chatHistory.slice(-MAX_HISTORY_LENGTH * 2);
  }
}

// Fonction pour réinitialiser la conversation
export function resetConversation() {
  // Envoyer la conversation à Mohamed avant de réinitialiser
  if (chatHistory.length > 0) {
    sendConversationToMohamed("Réinitialisation manuelle");
  }
  
  chatHistory = [];
  isFirstInteraction = true;
  userInfo = {
    name: "",
    email: "",
    phone: "",
    appointmentRequested: false,
    appointmentDateTime: null,
    appointmentPurpose: "",
    emailCollected: false,
    schedulingInProgress: false,
    pageUrl: window.location.href,
    userAgent: navigator.userAgent,
    conversationStartTime: new Date().toISOString()
  };
  console.log("Conversation réinitialisée");
}
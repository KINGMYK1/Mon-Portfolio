// Assistant simulé qui répond aux questions sans utiliser OpenAI

// Base de connaissances sur Mohamed
const knowledgeBase = {
  skills: "Je suis spécialisé en React, Angular, Node.js, MongoDB et développement mobile avec React Native.",
  experience: "J'ai fait un stage chez Gouvernancia où j'ai mis en place un système de journalisation SSH avec Apache Guacamole. J'ai également participé au développement d'une application mobile avec React Native et Node.js chez Digicard.",
  contact: "Vous pouvez me contacter par email à mohamedyehiyakoita@gmail.com ou par WhatsApp au +212 0620836989.",
  projects: "Mon portfolio comprend plusieurs projets, notamment des applications web et mobiles utilisant des technologies modernes.",
  education: "Je suis diplômé en développement informatique avec une spécialisation en technologies web et mobiles.",
  availability: "Je suis actuellement disponible pour des opportunités professionnelles ou des collaborations sur des projets.",
  default: "Je suis l'assistant de Mohamed et je peux vous renseigner sur son profil professionnel, ses compétences ou vous aider à prendre contact avec lui.",
  // Ajout des réponses pour les salutations
  greeting: "Bonjour ! Comment puis-je vous aider concernant Mohamed Yehiya Koïta aujourd'hui ?",
  howAreYou: "Je vais bien, merci de demander ! Je suis ici pour vous donner des informations sur Mohamed et son travail. Comment puis-je vous aider ?"
};

export const generateResponse = (prompt) => {
  return new Promise((resolve) => {
    // Simuler un délai de réponse pour donner l'impression d'une IA qui réfléchit
    setTimeout(() => {
      const lowercasePrompt = prompt.toLowerCase();
      
      // Vérifier d'abord si c'est une salutation
      if (isGreeting(lowercasePrompt)) {
        resolve(knowledgeBase.greeting);
        return;
      }
      
      // Vérifier si c'est une question de type "ça va ?"
      if (isHowAreYou(lowercasePrompt)) {
        resolve(knowledgeBase.howAreYou);
        return;
      }
      
      // Analyser la requête et générer une réponse appropriée
      if (lowercasePrompt.includes("compétence") || lowercasePrompt.includes("skill") || 
          lowercasePrompt.includes("technologies") || lowercasePrompt.includes("stack")) {
        resolve(knowledgeBase.skills);
      } 
      else if (lowercasePrompt.includes("expérience") || lowercasePrompt.includes("stage") || 
               lowercasePrompt.includes("travail") || lowercasePrompt.includes("parcours")) {
        resolve(knowledgeBase.experience);
      }
      else if (lowercasePrompt.includes("contact") || lowercasePrompt.includes("email") || 
               lowercasePrompt.includes("téléphone") || lowercasePrompt.includes("joindre")) {
        resolve(knowledgeBase.contact);
      }
      else if (lowercasePrompt.includes("projet") || lowercasePrompt.includes("réalisation") || 
               lowercasePrompt.includes("portfolio")) {
        resolve(knowledgeBase.projects);
      }
      else if (lowercasePrompt.includes("formation") || lowercasePrompt.includes("étude") || 
               lowercasePrompt.includes("diplôme")) {
        resolve(knowledgeBase.education);
      }
      else if (lowercasePrompt.includes("disponible") || lowercasePrompt.includes("disponibilité") || 
               lowercasePrompt.includes("recruter")) {
        resolve(knowledgeBase.availability);
      }
      else if (lowercasePrompt.includes("rendez-vous") || lowercasePrompt.includes("rencontre") || 
               lowercasePrompt.includes("meeting")) {
        resolve("Pour planifier un rendez-vous avec Mohamed, veuillez contacter directement par email à mohamedyehiyakoita@gmail.com en précisant l'objet de votre demande et vos disponibilités.");
      }
      // Si la question n'est pas liée à Mohamed ou son travail
      else if (!isRelevantQuestion(lowercasePrompt)) {
        resolve("Je suis l'assistant de Mohamed et je peux uniquement répondre aux questions le concernant ou vous aider à prendre rendez-vous avec lui.");
      }
      // Réponse par défaut pour les autres questions
      else {
        resolve(knowledgeBase.default);
      }
    }, 800); // Délai simulé de 800ms
  });
};

// Fonction pour détecter les salutations
function isGreeting(text) {
  const greetings = [
    "bonjour", "salut", "hello", "hi", "hey", "coucou", 
    "bonsoir", "bon matin", "good morning", "morning",
    "good evening", "good afternoon"
  ];
  
  return greetings.some(greeting => text.includes(greeting));
}

// Fonction pour détecter les questions de type "ça va ?"
function isHowAreYou(text) {
  const howAreYouPhrases = [
    "ça va", "comment vas-tu", "comment ça va", "comment va",
    "how are you", "comment allez-vous", "tu vas bien", "ça roule",
    "la forme", "en forme"
  ];
  
  return howAreYouPhrases.some(phrase => text.includes(phrase));
}

// Fonction pour déterminer si une question est pertinente pour l'assistant
function isRelevantQuestion(text) {
  // Si c'est une salutation ou une question de type "ça va", c'est pertinent
  if (isGreeting(text) || isHowAreYou(text)) {
    return true;
  }
  
  const relevantKeywords = [
    "mohamed", "koita", "développeur", "developer", "portfolio", "compétence", "skill",
    "projet", "experience", "contact", "cv", "travail", "formation", "étude",
    "react", "angular", "node", "développement", "web", "mobile"
  ];
  
  return relevantKeywords.some(keyword => text.includes(keyword));
}
import OpenAI from 'openai';

// Récupération de la clé API depuis les variables d'environnement Vite
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

// Vérification de la clé API avec message d'erreur plus explicite
if (!apiKey) {
  console.error("⚠️ Erreur : Clé API OpenAI manquante dans les variables d'environnement.");
  console.error("Veuillez créer un fichier .env à la racine du projet avec VITE_OPENAI_API_KEY=votre_clé");
}

// Création d'une instance OpenAI UNIQUEMENT si la clé existe
const openai = apiKey ? new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Note: À utiliser avec précaution en production
}) : null;

// Fonction pour générer une réponse avec vérification de l'API
export const generateText = async (prompt) => {
  // Vérifier si l'API est configurée
  if (!openai) {
    return "Configuration de l'API manquante. Veuillez contacter l'administrateur du site.";
  }

  try {
    // Afficher un log pour débugger
    console.log("Envoi de requête à OpenAI avec prompt:", prompt.substring(0, 20) + "...");
    
    const systemPrompt = `Tu es l'assistant virtuel de Mohamed Yehiya Koïta, un développeur Full Stack.
    
Tu dois UNIQUEMENT répondre aux questions concernant Mohamed, son expérience, ses compétences, ou pour prendre rendez-vous avec lui.

Informations sur Mohamed:
- Développeur Full Stack spécialisé en React, Angular, Node.js, MongoDB
- A fait un stage chez Gouvernancia où il a mis en place un système de journalisation SSH avec Apache Guacamole
- A également participé au développement d'une application mobile avec React Native et Node.js chez Digicard
- Email de contact: mohamedyehiyakoita@gmail.com
- WhatsApp: +212 0620836989
- GitHub: https://github.com/MYK-OTAKU
- LinkedIn: https://www.linkedin.com/in/mohamed-yehiya-koita

IMPORTANT:
- Si on te demande une information que tu n'as pas, suggère de contacter Mohamed directement.
- Si on te pose une question qui n'a AUCUN rapport avec Mohamed ou son travail, réponds simplement "Je suis l'assistant de Mohamed et je peux uniquement répondre aux questions le concernant ou vous aider à prendre rendez-vous avec lui."
- Refuse poliment de discuter de sujets non liés à Mohamed et son portfolio.

Sois cordial, professionnel et concis dans tes réponses.`;

    const response = await openai.chat.completions.create({
      // model: "gpt-3.5-turbo",
          model: "gpt-4.1",

      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    console.log("Réponse reçue d'OpenAI");
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Erreur OpenAI détaillée:', error);
    throw new Error(`Erreur lors de la génération du texte: ${error.message}`);
  }
};
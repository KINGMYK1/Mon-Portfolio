import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PaperAirplaneIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { generateResponse, resetConversation, sendConversationToMohamed } from '../../../services/geminiService';
import './AIAssistant.css';

const AIAssistant = ({ isOpen, onClose }) => {
  // Utiliser le localStorage pour conserver les messages entre les sessions
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('aiAssistantMessages');
    return savedMessages ? JSON.parse(savedMessages) : [
      { id: 0, text: "Bonjour ! Je suis l'assistant de Mohamed. Comment puis-je vous aider aujourd'hui ?", isUser: false }
    ];
  });
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  
  // Sauvegarder les messages dans localStorage quand ils changent
  useEffect(() => {
    localStorage.setItem('aiAssistantMessages', JSON.stringify(messages));
  }, [messages]);
  
  // Scroll automatique
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Envoyer la conversation à Mohamed quand l'utilisateur ferme l'assistant
  useEffect(() => {
    // Fonction qui sera appelée lorsque l'utilisateur fermera l'assistant
    const handleClose = () => {
      if (messages.length > 1) { // S'il y a eu une conversation (plus que le message d'accueil)
        sendConversationToMohamed("Fermeture de l'assistant");
      }
    };

    // Si l'état passe de isOpen=true à isOpen=false, envoyer la conversation
    if (!isOpen) {
      handleClose();
    }
    
    // Ajouter aussi un gestionnaire pour la fermeture de la page
    const handleBeforeUnload = () => {
      if (messages.length > 1) {
        sendConversationToMohamed("Fermeture de la page");
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isOpen, messages]);

  // Gérer l'envoi de message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);
    
    try {
      // Appel au service Gemini avec le contexte du chat précédent
      const response = await generateResponse(inputValue);
      
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        isUser: false,
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Erreur:', error);
      setError(error.message);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: `Désolé, une erreur s'est produite. Je vais utiliser mes connaissances intégrées pour vous répondre.`,
        isUser: false,
        isError: true,
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Réinitialiser la conversation
  const handleResetChat = () => {
    resetConversation(); // Cette fonction s'occupera d'envoyer la conversation à Mohamed
    setMessages([
      { id: 0, text: "Bonjour ! Je suis l'assistant de Mohamed. Comment puis-je vous aider aujourd'hui ?", isUser: false }
    ]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="ai-assistant-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="ai-assistant-header">
            <h3>Assistant IA de Mohamed</h3>
            <div className="ai-header-buttons">
              <button 
                onClick={handleResetChat} 
                className="ai-reset-btn" 
                title="Réinitialiser la conversation"
              >
                <ArrowPathIcon className="ai-icon" width={18} height={18} />
              </button>
              <button 
                onClick={() => {
                  if (messages.length > 1) {
                    sendConversationToMohamed("Fermeture manuelle");
                  }
                  onClose();
                }} 
                className="ai-close-btn"
              >
                <XMarkIcon className="ai-icon" width={20} height={20} />
              </button>
            </div>
          </div>
          
          <div className="ai-assistant-messages">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`ai-message ${msg.isUser ? 'ai-user-message' : 'ai-bot-message'} ${msg.isError ? 'ai-error-message' : ''}`}
              >
                {msg.text}
              </div>
            ))} 
            {isLoading && (
              <div className="ai-bot-message ai-loading-message">
              <div className="ai-typing-indicator">
              <span></span>
              <span></span>
              <span></span>
              </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {error && (
            <div className="ai-error-banner">
              Une erreur s'est produite avec l'API. L'assistant utilise ses connaissances intégrées.
            </div>
          )}
          
          <form onSubmit={handleSendMessage} className="ai-assistant-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Posez une question à propos de Mohamed..."
              disabled={isLoading}
              className="ai-input-field"
            />
            <button 
              type="submit" 
              disabled={isLoading || !inputValue.trim()}
              className="ai-send-btn"
            >
              <PaperAirplaneIcon className="ai-icon" width={20} height={20} />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIAssistant;
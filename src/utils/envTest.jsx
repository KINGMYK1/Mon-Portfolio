import React, { useEffect, useState } from 'react';

const EnvTest = () => {
  const [apiKey, setApiKey] = useState('');
  const [isKeyPresent, setIsKeyPresent] = useState(false);
  
  useEffect(() => {
    // Vérifier si la clé API est disponible
    const key = import.meta.env.VITE_OPENAI_API_KEY;
    setIsKeyPresent(!!key);
    
    if (key) {
      // Ne montrer que les 5 premiers caractères pour des raisons de sécurité
      setApiKey(key.substring(0, 5) + '...');
    }
  }, []);
  
  return (
    <div style={{ padding: '20px', margin: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>Test des Variables d'Environnement</h3>
      <p>VITE_OPENAI_API_KEY est présente: <strong>{isKeyPresent ? 'Oui' : 'Non'}</strong></p>
      {isKeyPresent && <p>Début de la clé: <code>{apiKey}</code></p>}
      
      <div style={{ marginTop: '10px' }}>
        <h4>Déboguer les erreurs possibles:</h4>
        <ol>
          <li>Vérifiez que le fichier .env est à la racine du projet</li>
          <li>Assurez-vous que la variable commence par VITE_</li>
          <li>Redémarrez complètement le serveur de développement</li>
        </ol>
      </div>
    </div>
  );
};

export default EnvTest;
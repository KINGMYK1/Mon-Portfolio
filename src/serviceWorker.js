// Service Worker pour la mise en cache
const CACHE_NAME = 'portfolio-cache-v1';

// Liste des ressources à mettre en cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/static/js/main.chunk.js',
  '/static/css/main.chunk.css',
  '/Profil.png',
  '/avatar.webp',
  '/osbt.png'
];

// Installation du service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(STATIC_ASSETS);
      })
  );
});

// Stratégie de cache: Stale-While-Revalidate
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        const networkFetch = fetch(event.request)
          .then(response => {
            // Mettre à jour le cache si c'est une requête réussie
            if (response.ok && response.type === 'basic') {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
            }
            return response;
          });
        
        // Retourner la version du cache en attendant le réseau
        return cachedResponse || networkFetch;
      })
  );
});
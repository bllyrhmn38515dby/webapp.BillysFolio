// PWA Service Worker - Cache static assets
const CACHE_NAME = 'billysfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/skills.html',
  '/projects.html',
  '/contact.html',
  '/favicon.ico',
  '/manifest.json',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // Handle navigation requests with 'follow' redirect mode
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request.clone(), { redirect: 'follow' })
        .catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});

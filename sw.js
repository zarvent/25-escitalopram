const CACHE_NAME = 'zvs-articulos-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/Articulos/2025-03-11/2025-03-11%20Que%20es%20el%20escitalopram%3F.html',
  '/Articulos/2025-03-11/css/2025-03-11-escitalopram-enhanced.min.css',
  '/Articulos/2025-03-11/css/2025-03-11-escitalopram-print.css',
  '/Articulos/2025-03-11/js/2025-03-11-escitalopram-enhanced.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

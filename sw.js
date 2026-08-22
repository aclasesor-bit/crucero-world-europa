/* generado por build.js */
const CACHE = 'crucero-ca1f7e7a80';
const FILES = ['./', './index.html', './manifest.webmanifest',
               './icon-192.png', './icon-512.png', './apple-touch-icon.png',
               './img/barcelona.jpg', './img/barco.jpg', './img/capri.jpg', './img/cocatedral.jpg', './img/etna.jpg', './img/garde.jpg', './img/genova.jpg', './img/marsella.jpg', './img/mesina.jpg', './img/napoles.jpg', './img/pompeya.jpg', './img/taormina.jpg', './img/valeta.jpg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// primero la red (para recoger cambios), y si no hay, la copia guardada
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(r => {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return r;
      })
      .catch(() => caches.match(e.request).then(m => m || caches.match('./index.html')))
  );
});

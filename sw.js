// Kromatch offline support.
// Online: always fetch the newest files from the server (so updates reach people right away),
// and keep a copy. Offline: use the saved copy so matching still works.
const CACHE = 'kromatch-v10';
const CORE = ['./', './index.html', './colors.js', './shops.js', './config.js', './privacy.html', './manifest.webmanifest',
              './icon-192.png', './icon-512.png', './apple-touch-icon.png', './favicon-32.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(() => {}));
  self.skipWaiting();                       // a new version takes over straight away
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;                          // never touch orders or other sends
  const url = new URL(req.url);
  const sameSite = url.origin === self.location.origin;
  const fonts = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameSite && !fonts) return;                           // leave everything else to the browser
  // Network first, saved copy as fallback
  event.respondWith(
    // 'no-cache' asks the server whether the file changed, so uploads show up right away
    fetch(sameSite ? new Request(req, { cache: 'no-cache' }) : req).then(res => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true })
      .then(hit => hit || (req.mode === 'navigate' ? caches.match('./index.html') : undefined)))
  );
});

// Phone notifications ("your cans are ready"), sent by Kromatch's server
self.addEventListener('push', event => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch (e) { d = { title: 'Kromatch', body: event.data ? event.data.text() : '' }; }
  event.waitUntil(self.registration.showNotification(d.title || 'Kromatch', {
    body: d.body || '', icon: './icon-192.png', badge: './favicon-32.png', data: { url: d.url || './' }, tag: d.url || 'kromatch' }));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = new URL((event.notification.data && event.notification.data.url) || './', self.location.href).href;
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) if ('focus' in c) { c.navigate(url); return c.focus(); }
    return clients.openWindow(url);
  }));
});

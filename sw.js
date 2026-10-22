// Caches the app shell so the demo opens instantly and survives bad venue Wi-Fi.
// Bump CACHE when you push changes so phones pick up the new version.
const CACHE = "starauto-mobile-concept-v11";
const SHELL = [
  "./", "./index.html", "./config.js", "./manifest.webmanifest",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png", "./img/breakdown-401.jpg"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: "reload" })))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  // Never cache Genesys login or API calls.
  if (url.origin !== self.location.origin || e.request.method !== "GET") return;
  // Network first (fresh after a push), cache as fallback (offline).
  e.respondWith(
    fetch(e.request, { cache: "no-cache" })   // revalidate with GitHub Pages, skip its 10-minute browser cache
      .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});

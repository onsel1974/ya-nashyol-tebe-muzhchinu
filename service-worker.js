const CACHE_NAME = "ya-nashyol-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./story.html",
  "./chapter1.html",
  "./chapter2.html",
  "./chapter3.html",
  "./chapter4.html",
  "./chapter5.html",
  "./style.css",
  "./script.js",
  "./assets/piter-cover-1.png",
  "./assets/piter-cover.png",
  "./assets/piter-watermark.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});

/* eslint-disable no-restricted-globals */
// Service Workerni yaratish
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open("cache-v1")
      .then((cache) =>
        cache.addAll([
          "/",
          "/index.html",
          "/styles/main.css",
          "/scripts/main.js",
        ])
      )
  );
});

// Cache-dan foydalanish
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// Cache-ni yangilash
self.addEventListener("activate", (event) => {
  const cacheWhitelist = ["cache-v2"];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        // eslint-disable-next-line array-callback-return
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

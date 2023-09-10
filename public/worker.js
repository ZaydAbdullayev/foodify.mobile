/* eslint-disable no-restricted-globals */
// Service Worker'ı Oluşturma
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

// Cache Kullanma
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // İlgili kaynak cache'te bulunuyorsa cache'ten al
      if (response) {
        return response;
      }
      // İlgili kaynak cache'te bulunmuyorsa ağdan al
      return fetch(event.request);
    })
  );
});

// Cache'i Güncelleme ve Temizleme
self.addEventListener("activate", (event) => {
  const cacheWhitelist = ["cache-v2"];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Kullanılmayan cache'i temizle
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

"use strict";

const cacheName = "pwa-cache-files";
const assets = [
  "",
  "./index.html",
  "./error.html",
  "./res/img/logo/logo.webp",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js",
  "./res/img/fondo/fondo.svg",
  "./res/js/main.js",
  "./res/css/styles.css",
];

self.addEventListener("install", (e) => {
  self.skipWaiting();

  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      cache.addAll(assets);
    })
  );
  console.log("Service Worker Instalado! ", e);
});

self.addEventListener("activate", (e) => {
  console.log("Service Worker Activado! ", e);
});

self.addEventListener("fetch", (e) => {
  console.log("Request", e);
  
  e.respondWith(
    caches.match(e.request)
      .then((response) => {
        if (response) {
          return response;
        }

        let requestToCache = e.request.clone();

        return fetch(requestToCache)
          .then((res) => {
            if (!res || res.status !== 200) {
              console.log("No se pudo obtener respuesta del servidor", res);
              return res;
            }

            let responseToCache = res.clone();

            caches.open(cacheName).then((cache) => {
              cache.put(requestToCache, responseToCache);
            });

            return res;
          })
          .catch((error) => {
            return fetch("https://dwt3bv-pokedex-pwa.netlify.app/error.html")
              .then((res) => {
                return res;
              });
          });
      })
  );
});


//Aquí recibimos las notificaciones de push
self.addEventListener("push", (e) => {
  let title = "¡Nuevo Evento Pokémon!";
  let body = "¡Descubre las sorpresas que tenemos preparadas para ti!";
  // [{"title":"Nos expandimos","body":"Ahora contamos con aplicación para que nos lleves a todas partes!"}]
  let options = {
    body: body,
    icon: "./res/img/favicon/icon-192x192.png",
    vibrate: [600, 200, 600],
    tag: 1,
    actions: [
      {
        action: 1,
        icon: "./res/img/icons/aceptar.png",
        title: "¡Accede ahora!",
      },
      { action: 2, icon: "./res/img/icons/cerrar.png", title: "No, gracias" },
    ],
  };

  e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (e) => {
  if (e.action == 1) {
    console.log("El usuario quiere acceder");
    clients.openWindow("https://www.youtube.com/watch?v=llDPm0TzAGI");
  } else {
    console.log("El usuario no quiere acceder");
  }
  e.notification.close();
});

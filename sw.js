"use strict";
// Establecemos un nombre para la cache
const cacheName = "pwa-cache-files";
// En este array guardaremos los recursos que quisiera almacener en el pre caching
const assets = [
  "./index.html",
  "./res/img/logo/logo.webp",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js",
  "./res/img/fondo/fondo.svg",
  "./res/js/main.js",
  "./res/css/styles.css",
  "./manifest.webmanifest",
];
//Instalación del service worker
self.addEventListener("install", (e) => {
  //Salteamos el tiempo de espera de activación de forma automatica
  self.skipWaiting();

  //Realizamos el pre caching, es para guardar los recursos necesarios para la carga del sitio
  //Utilizamos el waitUntil dentro del install para que cuando terminé la instalación ya tengamos nuestros recursos deseados almacenados en el cache del sitio
  e.waitUntil(
    //Si existe el cache con ese nombre, lo usa y si no fuera asi lo crea de 0
    caches.open(cacheName).then(function (cache) {
      cache.addAll(assets);
    })
  );
  console.log("Service Worker Instalado! ", e);
});

// Activación del Service Worker
self.addEventListener("activate", (e) => {
  console.log("Service Worker Activado! ", e);
});

// Capturamos las peticiones de la interfaz
self.addEventListener("fetch", (e) => {
  console.log("Request", e);
  //Utilizaremos está propiedad para proveer una respuesta al fetch
  e.respondWith(
    //Revisamos si el recurso pedido está en el cache del service worker
    caches.match(e.request).then((response) => {
      //Si está y tiene contenido lo devolvemos
      if (response) {
        return response;
      }
      //De no tener contenido se le pide al servidor para que intente obtenerlo nuevamente
      return fetch(e.request);
    })
  );
});

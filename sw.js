"use strict";
// Establecemos un nombre para la cache
const cacheName = "pwa-cache-files";
// En este array guardaremos los recursos que quisiera almacener en el pre caching
const assets = [
  "/index.html",
  "/manifest.webmanifest",
  "./res/img/logo/logo.webp",
  "./res/img/fondo/fondo.svg",
  "./res/js/main.js",
  "./res/css/styles.css",
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
        return cache.addAll(assets);
      })
    );
  // console.log("Service Worker Instalado! ", e);
});

// Activación del Service Worker
self.addEventListener("activate", (e) => {
  // console.log("Service Worker Activado! ", e);
});

// Capturamos las peticiones de la interfaz
self.addEventListener("fetch", (e) => {
  // console.log("Request", e);
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

self.addEventListener("push", (e) => {
  // console.log(e.data.text());

  let data = JSON.parse(e.data.text());
  console.log(data);
  let title = data[0].title;
  let body = data[0].body;
  let options = {
    body: body,
    icon: './res/img/favicon-32x32.png',
    vibrate: [600,100,600],
    tag: 1,
    actions: [{
              action:1,
              icon:'./res/img/favicon-32x32.png', 
              title: 'Acceder a la app'
            },
            {
              action:2,
              icon:'./res/img/favicon-32x32.png', 
              title: 'No Acceder a la app'
            },],
  };

  e.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', event => {
  if (event.action==1) {
    console.log('El usuario quiere acceder');
    clients.window.open("https://google.com", "_self")
  } else{
    console.log('El no usuario quiere acceder');
  }
  event.notification.close();
})
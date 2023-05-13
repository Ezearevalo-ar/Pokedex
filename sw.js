'use strict'
// Instalación del Service Worker
const cacheName = "pwa-cache-files"
const assets = ['./index.html',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css',
                './res/css/styles.css',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js',
                './res/js/main.js']
self.addEventListener('install', (e) => {
    self.skipWaiting();
    
    e.waitUntil(
        caches.open(cacheName)
        .then(function (cache){
            cache.addAll(assets)
        })
    )
    console.log('Service Worker Instalado! ', e);
})

// Activación del Service Worker
self.addEventListener('activate', (e) => {
    console.log('Service Worker Activado! ', e);
})

// Capturamos las peticiones de la interfaz
self.addEventListener('fetch', (e) => {
    console.log('Request', e);
})
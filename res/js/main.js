'use strict'

window.addEventListener('DOMContentLoaded', (e) => {
    
    //Registramos el service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
        .then(registration => {
            console.log(registration);
        })
        .catch(rejected => {
            console.error(rejected);
        })
    }
})

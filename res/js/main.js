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
        });
    }
    
    const d = document;
    
    const search = d.getElementById('search-input');
    const searchBtn = d.getElementById('button-addon2');
    
    //Selecionamos el contenedor de nuestras cards
    const CardContainer = d.getElementById('Pokemons');
    
    /** 
    * Está función lo que hace es recibir un parametro ID que está seleccionado en un bucle for para mostrar mas de 1 pokemon al ingresar al sitio este parametro puede modificarse para mostrar mas o menos pokemons según se desee
    * 
    * Asi mismo está función utiliza fetch para recibir la información de la API de Pokeapi, modificando el valor del Pokemon recibido con este parametro que recibimos por ID, luego envia esa información a la función crearCard() que se encarga de recibir los pokemons y crear las cards para luego publicarlas en el sitio
    * 
    * PROXIMAMENTE: añadir funcionalidad de modificar este valor desde el sitio 
    **/
    function consumirApi(ID) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${ID}`)
        .then(res => res)
        .then(data => {
            crearCard(data);
        })
    }
    
    /** 
    * Está función lo que hace es recibir un parametro (data) y está recibiendo pokemons, con toda su información, imagen, ID, etc.
    * 
    * Asi mismo está función está creando elementos HTML, y estructurandolos para posteriormente meterlos en el index.html con tecnicas de DOM
    * 
    **/
    function crearCard(data) {
        let card = d.createElement('div');
        
        let cardHeader = d.createElement('div');
        
        let cardMain = d.createElement('div');
        
        let cardFooter = d.createElement('div');
    }
});

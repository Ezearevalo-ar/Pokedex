'use strict'

window.addEventListener('DOMContentLoaded', (e) =>{

    const d = document;
    //Obtenemos los elementos principales a modificar en el index.html
    const containerPokemons = d.getElementById('Pokemons');
    const buscadorInput = d.getElementById('buscador_input');
    const buscadorButton = d.getElementById('buscador_button');

    /**
     * La función mostrarPokemons() utiliza un `bucle for` para mostrar una cantidad fija de tarjetas en el archivo index.html.
     * 
     * En esta función, se llama a la función obtenerPokemons(id) pasando como parámetro el número generado y recorrido en el bucle for.
    **/
    function mostrarPokemons() {
        for (let i = 1; i < 25; i++) {
            obtenerPokemons(i);
        }
    } mostrarPokemons()

    /**
     * La función obtenerPokemons() realiza una solicitud a la API de Pokémon para obtener los datos de un Pokémon específico.
     * 
     * Recibe un parámetro `id` que indica el número de identificación del Pokémon a buscar.
     * 
     * Utiliza `fetch()` para realizar una solicitud GET a la API y obtener la respuesta en formato JSON.
     * 
     * Luego, se invoca la función `crearPokemons(data)` pasando los datos obtenidos como argumento.
    **/
    function obtenerPokemons(id) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then((data) => {
            crearPokemons(data);
        })
    }

    function crearPokemons(pokemon) {
        let card = document.createElement('div');
        card.className = 'Pokemon-Card';
        card.addEventListener('click', (e) => {
          mostrarInformacion(pokemon);
        });
        let cardHeader = document.createElement('div');
        cardHeader.className = 'Pokemon-Card-Header';
        let cardMain = document.createElement('div');
        cardMain.className = 'Pokemon-Card-Main';
        let cardFooter = document.createElement('div');
        cardFooter.className = 'Pokemon-Card-Footer';
        
        let cardMain_Name = document.createElement('h3');
        cardMain_Name.textContent = pokemon.name;
        let cardMain_ID = document.createElement('span');
        cardMain_ID.textContent = pokemon.id;
        
        let cardFooter_Fav = document.createElement('button');
        cardFooter_Fav.className = 'heart-btn';
        let fav_button = document.createElement('span');
        fav_button.className = 'heart';
        
        // Agregar event listener al botón
        cardFooter_Fav.addEventListener('click', () => {
          fav_button.classList.toggle('heart-active');
        });
        
        cardMain.appendChild(cardMain_Name);
        cardMain.appendChild(cardMain_ID);
        cardFooter_Fav.appendChild(fav_button);
        cardFooter.appendChild(cardFooter_Fav);
        card.appendChild(cardHeader);
        card.appendChild(cardMain);
        card.appendChild(cardFooter);
        containerPokemons.appendChild(card);
    }

    function mostrarInformacion(pokemon) {
        alert(pokemon.name);
    }
});
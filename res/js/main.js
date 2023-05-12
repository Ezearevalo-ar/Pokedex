'use strict'

window.addEventListener('DOMContentLoaded', (e) => {
    const d = document;
    
    function ConsumirApi(id) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(data => {
            CrearCards(data);
        })
    }
    
    function ObtenerPokemons(number){
        for (let i = 1; i < number; i++) {
            ConsumirApi(i);            
        }
    }
    
    function CrearCards(data) {
        /*Contenedor principal donde se cargarán las cards*/
        const CardContainer = d.getElementById('Pokemons');
        
        /*Card que contendrá al pokemon*/
        let card = d.createElement('div');
        card.className = "Card";
        
        /*Sección del header de la card que contendrá la imagen*/
        let card_header = d.createElement('div');
        card_header.className = "Card-Header";
        let card_header_img = d.createElement('img');
        card_header_img.src = data.sprites.front_default;
        card_header_img.alt = "Pokemon obtenido de una api";
        
        /*Sección del main de la card que contendrá el nombre y su numero*/
        let card_main = d.createElement('div');
        card_main.className = "Card-Main";
        let card_main_title = d.createElement('h3');
        card_main_title.textContent = `${data.name}`;
        let card_main_number = d.createElement('h4');
        card_main_number.textContent = `Numero: #${data.id}`;
        
        /*Sección del footer de la card que contendrá información*/
        let card_footer = d.createElement('div');
        card_footer.className = "Card-Footer";
    
        card_header.appendChild(card_header_img);
        card.appendChild(card_header);
        card_main.appendChild(card_main_title);
        card_main.appendChild(card_main_number);
        card.appendChild(card_main);
        card.appendChild(card_footer);
        
        CardContainer.appendChild(card);
    }
    
    ObtenerPokemons(21);
});
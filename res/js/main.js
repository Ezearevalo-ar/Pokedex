"use strict";

window.addEventListener("DOMContentLoaded", (e) => {
    
    //Inicio del registro de nuestro service worker
    //Primero verificamos si el navegador acepta service worker 
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            //Si el navegador soporta service worker, le registramos nuestro archivo service worker.js o sw.js en este caso
            .register("sw.js")
            .then((registration) => {
                console.log(registration);
            })
            .catch((rejected) => {
                console.error(rejected);
            });
    }
    //Fin del registro de nuestro service worker

    const d = document;

    const search = d.getElementById("search-input");
    const searchBtn = d.getElementById("button-addon2");
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (search.value.trim() === "" || search.value < 0) {
            return false;
        } else{
            CardContainer.innerHTML = "";
            consumirApi(search.value);
            return true;
        }
    });
    
    const favoritosBTN = d.getElementById("fav-button");
    favoritosBTN.addEventListener('click', (e) => {
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        CardContainer.innerHTML = "";
        for (const ID of favoritos) {
            consumirApi(ID);
        }
    });

    //Selecionamos el contenedor de nuestras cards
    const CardContainer = d.getElementById("Pokemons");

    /**
     * Está función lo que hace es recibir una cantidad numerica y en un bucle for se recorre desde el 1 hasta la cantidad recibida por el parametro
     *
     * Luego de recibir y recorrer está cantidad deseada es enviado a la función consumirApi, lo cual hará que está funcion busque a ese pokemon y lo mande a la función crearCard que se encargará de crear la card y enviarla al documento HTML
     *
     * //TODO PROXIMAMENTE: añadir funcionalidad de modificar este valor desde el sitio
     **/
    function generarPokemons(cantidad) {
        for (let i = 1; i < cantidad; i++) {
            consumirApi(i);
        }
    }
    generarPokemons(21);
    
    /**
     * Está función lo que hace es recibir un parametro ID que está seleccionado en un bucle for para mostrar mas de 1 pokemon al ingresar al sitio este parametro puede modificarse para mostrar mas o menos pokemons según se desee
     *
     * Asi mismo está función utiliza fetch para recibir la información de la API de Pokeapi, modificando el valor del Pokemon recibido con este parametro que recibimos por ID, luego envia esa información a la función crearCard() que se encarga de recibir los pokemons y crear las cards para luego publicarlas en el sitio
     *
     **/
    function consumirApi(ID) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${ID}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                crearCard(data);
            })
            .catch((error) => {
                console.log(error);
                ErrorSearch();
            });
    }

    /**
     * Está función lo que hace es recibir un parametro (data) y está recibiendo pokemons, con toda su información, imagen, ID, etc.
     *
     * Asi mismo está función está creando elementos HTML, y estructurandolos para posteriormente meterlos en el index.html con tecnicas de DOM
     *
     **/
    function crearCard(data) {
        //Creamos la card que contendrá a nuestros pokemons
        let card = d.createElement("div");
        //Creamos la sección dentro de la card que contendrá la imagen del pokemon
        let cardHeader = d.createElement("div");
        let cardHeaderImg = d.createElement("img");
        //Creamos la sección dentro de la card que contendrá el nombre y ID del pokemon
        let cardMain = d.createElement("div");
        let cardMainName = d.createElement("h3");
        let cardMainID = d.createElement("h4");
        //Creamos la sección dentro de la card que contendrá los botones de Añadir a Favoritos o Eliminar de Favoritos
        let cardFooter = d.createElement("div");
        let cardFooterAddBtn = d.createElement("button");
        let cardFooterRemoveBtn = d.createElement("button");

        //Modificamos al detalle el header de la card y sus contenidos
        //Card
        card.className = "Card";
        
        //Card Header
        cardHeader.className = "Card-Header";
        cardHeaderImg.src = data.sprites.front_default;
        cardHeaderImg.alt = `Imagen del Pokemon ${data.name}`;
        cardHeaderImg.width = 96;
        cardHeaderImg.height = 96;
        cardHeaderImg.loading = "lazy";

        //Card Main
        cardMain.className = "Card-Main";
        cardMainName.textContent = `${data.name}`;
        cardMainID.textContent = `#0${data.id}`; //TODO Investigar la forma de añadir el #000 dependiendo el pokemon de forma dinamica

        //Card Footer
        cardFooter.className = "Card-Footer";
        cardFooterAddBtn.className = "bi bi-heart";
        cardFooterAddBtn.ariaLabel = `${data.id}`;
        //Enviamos el id del pokemon que queremos añadir a nuestros favoritos y se envia a la función addFavorito que se encarga de todo eso
        cardFooterAddBtn.addEventListener("click", (e) => {
            addFavorito(data.id);
        });
        //TODO Solucionar el error de eliminar cards del DOM inicial, posible solución uso de banderitas u otra página aparte para mostrar este contenido
        //TODO Realizar un recoded del sitio usando PHP y MYSQL, cambiar el formato de las imagenes en webp
        cardFooterRemoveBtn.className = "bi bi-x-circle";
        cardFooterRemoveBtn.ariaLabel = `${data.id}`;
        //Enviamos el id del pokemon que queremos eliminar de nuestros favoritos y se envia a la función removeFavoritos que se encarga de todo eso
        cardFooterRemoveBtn.addEventListener("click", (e) => {
            removeFavorito(data.id);
            //Eliminamos la card del pokemon deseado en el DOM
            card.remove();
        });

        //Enviamos cada sección de la card a su respectivo lugar y la card a su contenedor
        cardHeader.appendChild(cardHeaderImg); //Enviamos la imagen dentro del cardHeader
        cardMain.appendChild(cardMainName); //Enviamos el nombre del pokemon dentro del cardMain
        cardMain.appendChild(cardMainID); //Enviamos el id del pokemon dentro del cardMain
        cardFooter.appendChild(cardFooterAddBtn); //Enviamos el Button de añadir a favoritos dentro del cardFooter
        cardFooter.appendChild(cardFooterRemoveBtn); //Enviamos el Button de eliminar de favoritos dentro del cardFooter

        card.appendChild(cardHeader); //Integramos el cardHeader final en la card
        card.appendChild(cardMain); //Integramos el cardMain final en la card
        card.appendChild(cardFooter); //Integramos el cardFooter final en la card
        CardContainer.appendChild(card); //Enviamos la card terminada dentro del contenedor que contendrá todas las demas cards
    }

    /**
     * Está función se encargará de recibir un parametro ID y una vez se haga click en un pokemon especifico será almacenado en el local storge  del sitio el pokemon y sus propiedades, nombre, id, imagen
    **/
    function addFavorito(ID) {
        let favorito = JSON.parse(localStorage.getItem("favoritos")) || [];
        
        //TODO Añadir una acción o alerta cuando se agrega a favorito y si ya está agregado
        
        // Verificamos si el Pokemon no está incluido en la lista de favoritos del localstorage
        if (!favorito.includes(ID)) {
            favorito.push(ID); // Agregamos al localstorage pusheando el ID del Pokemon a la lista de favoritos, el ID se agrega al final del array
            //TODO hacer que se array guarde los items por orden numerico para lograr una generación en orden de las cards
            localStorage.setItem("favoritos", JSON.stringify(favorito)); // Guardamos los pokemons seleccionados como favoritos en el localstorage y lo mandamos como string mediante stringify
            console.warn("El pokemon fue agregado a favoritos!");
        } else {
            console.error("El pokemon ya se encuentra en tus favoritos!");
        }
    }
    
    /**
     * Está función se encargará de recibir un parametro ID y una vez se haga click en un pokemon especifico será eliminado del array que se encuentrá en local storge, y a su vez eliminará la card del sitio en la sección de favoritos
    **/
    function removeFavorito(ID) {
        let favorito = JSON.parse(localStorage.getItem("favoritos")) || [];
    
        // Verificamos si el Pokemon está incluido en la lista de favoritos del localstorage
        if (favorito.includes(ID)) {
            favorito = favorito.filter((favoritoID) => favoritoID !== ID); // Filtramos el localstorage y buscamos el ID deseado para eliminarlo
            localStorage.setItem("favoritos", JSON.stringify(favorito)); // Actualizamos los pokemons seleccionados como favoritos en el localstorage
            console.warn("El Pokemon fue eliminado de favoritos!");
        } else {
            console.error("El Pokemon no se encuentra en tus favoritos!");
        }
    }
    
    /** 
     *
     * 
     * 
     * 
    **/
   function ErrorSearch() {
        //Creamos la card que contendrá a nuestros pokemons
        let card = d.createElement("div");
        //Creamos la sección dentro de la card que contendrá la imagen del pokemon
        let cardHeader = d.createElement("div");
        let cardHeaderImg = d.createElement("img");
        //Creamos la sección dentro de la card que contendrá el nombre y ID del pokemon
        let cardMain = d.createElement("div");
        let cardMainName = d.createElement("h3");
        let cardMainID = d.createElement("h4");

        //Modificamos al detalle el header de la card y sus contenidos
        //Card
        card.className = "Card";
        
        //Card Header
        cardHeader.className = "Card-Header";
        cardHeaderImg.src = "./res/img/error/Error404.webp";
        cardHeaderImg.alt = "Error al encontrar el pokemon en la busqueda";
        cardHeaderImg.loading = "lazy";

        //Card Main
        cardMain.className = "Card-Main";
        cardMainName.textContent = "Pokemon no existente!";
        cardMainID.textContent = "Numero: #404";

        //Enviamos cada sección de la card a su respectivo lugar y la card a su contenedor
        cardHeader.appendChild(cardHeaderImg); //Enviamos la imagen dentro del cardHeader
        cardMain.appendChild(cardMainName); //Enviamos el nombre del pokemon dentro del cardMain
        cardMain.appendChild(cardMainID); //Enviamos el id del pokemon dentro del cardMain

        card.appendChild(cardHeader); //Integramos el cardHeader final en la card
        card.appendChild(cardMain); //Integramos el cardMain final en la card
        CardContainer.appendChild(card); //Enviamos la card terminada dentro del contenedor que contendrá todas las demas cards
   }
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("../../json/idiomas.json")
        .then(response => response.json())
        .then(idiomas => {
            let idioma_usuario = localStorage.getItem("userLanguage");
            if (idioma_usuario == null) idioma_usuario = "en";


            const stats_title = document.querySelector("#stats_title");
            stats_title.textContent = idiomas["buscador_pokemon"][`content_${idioma_usuario}`][3];

            const weaknesses_title = document.querySelector("#weaknesses_title");
            weaknesses_title.textContent = idiomas["buscador_pokemon"][`content_${idioma_usuario}`][4];

            const movements_title = document.querySelector("#movements_title");
            movements_title.textContent = idiomas["buscador_pokemon"][`content_${idioma_usuario}`][5];

            const strategies_title = document.querySelector("#strategies_title");
            strategies_title.textContent = idiomas["buscador_pokemon"][`content_${idioma_usuario}`][6];

            const name = document.querySelector("#name");
            name.textContent = idiomas["buscador_pokemon"][`movements_${idioma_usuario}`][0];

            const type = document.querySelector("#type");
            type.textContent = idiomas["buscador_pokemon"][`movements_${idioma_usuario}`][1];

            const category = document.querySelector("#category");
            category.textContent = idiomas["buscador_pokemon"][`movements_${idioma_usuario}`][2];
        })
});
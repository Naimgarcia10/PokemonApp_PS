document.addEventListener("DOMContentLoaded", function(){
    fetch("../../json/idiomas.json")
    .then(response => response.json())
    .then(idiomas => {
        let idioma_usuario = localStorage.getItem("userLanguage");
        if(idioma_usuario == null) idioma_usuario = "en";

        const title = document.querySelector(".title");
        title.textContent = idiomas["buscador_habilidades"][`content_${idioma_usuario}`][0];

        const buscador = document.querySelector("#buscador");
        buscador.placeholder = idiomas["buscador_habilidades"][`content_${idioma_usuario}`][1] + "...";

        const pokemon = document.querySelector("#pokemon");
        pokemon.textContent = idiomas["buscador_habilidades"][`content_${idioma_usuario}`][5];

        const image = document.querySelector("#image");
        image.textContent = idiomas["buscador_habilidades"][`content_${idioma_usuario}`][6];

        const learnMet = document.querySelector("#learnMet");
        learnMet.textContent = idiomas["buscador_habilidades"][`content_${idioma_usuario}`][7];
    })
});
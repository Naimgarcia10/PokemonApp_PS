document.addEventListener("DOMContentLoaded", function(){
    fetch("../../json/idiomas.json")
    .then(response => response.json())
    .then(idiomas => {
        let idioma_usuario = localStorage.getItem("userLanguage");
        if(idioma_usuario == null) idioma_usuario = "en";

        const title = document.querySelector("#mainTitle");
        title.textContent = idiomas["buscador_pokemon"][`content_${idioma_usuario}`][0];

        const innerTitle = document.querySelector("#innerTitle");
        innerTitle.textContent = idiomas["buscador_pokemon"][`content_${idioma_usuario}`][1] + "!";

        const buscador = document.querySelector("#buscador");
        buscador.placeholder = idiomas["buscador_pokemon"][`content_${idioma_usuario}`][2] + "...";        
    })
});
document.addEventListener("DOMContentLoaded", function(){
    fetch("../../json/idiomas.json")
    .then(response => response.json())
    .then(idiomas => {
        let idioma_usuario = localStorage.getItem("userLanguage");
        if(idioma_usuario == null) idioma_usuario = "en";

        const title = document.querySelector(".title");
        title.textContent = idiomas["buscador_objetos"][`content_${idioma_usuario}`][0];

        const buscador = document.querySelector("#buscador");
        buscador.placeholder = idiomas["buscador_objetos"][`content_${idioma_usuario}`][1] + "...";

        const word = document.querySelector("#word");
        word.textContent = idiomas["buscador_objetos"][`content_${idioma_usuario}`][2];

        const icon = document.querySelector("#icon");
        icon.textContent = idiomas["buscador_objetos"][`content_${idioma_usuario}`][3];

        const description = document.querySelector("#description");
        description.textContent = idiomas["buscador_objetos"][`content_${idioma_usuario}`][4];

    })
});
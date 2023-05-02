document.addEventListener("DOMContentLoaded", function(){
    fetch("../../json/idiomas.json")
    .then(response => response.json())
    .then(idiomas => {
        let idioma_usuario = localStorage.getItem("userLanguage");
        if(idioma_usuario == null) idioma_usuario = "en";

        const title = document.querySelector(".title");
        title.textContent = idiomas["buscador_movimientos"][`content_${idioma_usuario}`][0];

        const buscador = document.querySelector("#buscador");
        buscador.placeholder = idiomas["buscador_movimientos"][`content_${idioma_usuario}`][1] + "...";

        const name = document.querySelector("#name");
        name.textContent = idiomas["buscador_movimientos"][`content_${idioma_usuario}`][2];

        const type = document.querySelector("#type");
        type.textContent = idiomas["buscador_movimientos"][`content_${idioma_usuario}`][3];

        const category = document.querySelector("#category");
        category.textContent = idiomas["buscador_movimientos"][`content_${idioma_usuario}`][4];

        const power = document.querySelector("#power");
        power.textContent = idiomas["buscador_movimientos"][`content_${idioma_usuario}`][5];

        const precision = document.querySelector("#precision");
        precision.textContent = idiomas["buscador_movimientos"][`content_${idioma_usuario}`][6];

        const priority = document.querySelector("#priority");
        priority.textContent = idiomas["buscador_movimientos"][`content_${idioma_usuario}`][7];

        const learn = document.querySelector("#learn");
        learn.textContent = idiomas["buscador_movimientos"][`content_${idioma_usuario}`][8];
    })
});
document.addEventListener("DOMContentLoaded", function(){
    fetch("../../json/idiomas.json")
    .then(response => response.json())
    .then(idiomas => {
        let idioma_usuario = localStorage.getItem("userLanguage");
        if(idioma_usuario == null) idioma_usuario = "en";

        const main_title = document.querySelector(".main_title");     
        main_title.innerHTML = idiomas["home"][`title_${idioma_usuario}`];

        const boton_principiante = document.querySelector("#begginerButton");
        boton_principiante.innerHTML = idiomas["home"][`buttons_${idioma_usuario}`][0];

        const boton_experto = document.querySelector("#expertButton");
        boton_experto.innerHTML = idiomas["home"][`buttons_${idioma_usuario}`][1];
    })
});
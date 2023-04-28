document.addEventListener("DOMContentLoaded", function(){
    fetch("../../json/idiomas.json")
    .then(response => response.json())
    .then(idiomas => {
        let idioma_usuario = localStorage.getItem("userLanguage");
        if(idioma_usuario == null) idioma_usuario = "en";

        const main_title = document.querySelector(".main_title")        
        const boton_principiante = document.querySelector("#begginerButton")
        const boton_experto = document.querySelector("#expertButton")
        
        main_title.innerHTML = idiomas["home"][`title_${idioma_usuario}`]
        boton_principiante.innerHTML = idiomas["home"][`buttons_${idioma_usuario}`][0]
        boton_experto.innerHTML = idiomas["home"][`buttons_${idioma_usuario}`][1]
    })
});
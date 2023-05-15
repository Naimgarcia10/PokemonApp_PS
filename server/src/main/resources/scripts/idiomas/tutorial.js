document.addEventListener("DOMContentLoaded", function(){
    fetch("../../json/idiomas.json")
    .then(response => response.json())
    .then(idiomas => {
        let idioma_usuario = localStorage.getItem("userLanguage");
        if(idioma_usuario == null) idioma_usuario = "en";

        const titulo = document.querySelector(".titulo");
        titulo.textContent = idiomas["tutorial"][`title_${idioma_usuario}`]
    })
});
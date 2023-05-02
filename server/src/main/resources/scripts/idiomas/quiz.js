document.addEventListener("DOMContentLoaded", function(){
    fetch("../../json/idiomas.json")
    .then(response => response.json())
    .then(idiomas => {
        let idioma_usuario = localStorage.getItem("userLanguage");
        if(idioma_usuario == null) idioma_usuario = "en";

        const title = document.querySelector(".enunciado");     
        title.innerHTML = idiomas["quiz"][`content_${idioma_usuario}`][0];
        
        const quiz_description = document.querySelector("#quiz_description");     
        quiz_description.innerHTML = idiomas["quiz"][`content_${idioma_usuario}`][1];

        const start_button = document.querySelector(".start_button");     
        start_button.innerHTML = idiomas["quiz"][`content_${idioma_usuario}`][2];
    })
});
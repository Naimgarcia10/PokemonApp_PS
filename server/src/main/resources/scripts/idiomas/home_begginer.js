document.addEventListener("DOMContentLoaded", function(){
    fetch("../../json/idiomas.json")
    .then(response => response.json())
    .then(idiomas => {
        let idioma_usuario = localStorage.getItem("userLanguage");
        if(idioma_usuario == null) idioma_usuario = "en";

        const menu_principiantes = document.querySelectorAll(".menu_principiantes li a");

        for (let i = 0; i < menu_principiantes.length; i++) {
            menu_principiantes[i].textContent = idiomas["beginner_funcionalities"][`${idioma_usuario}`][i]; 
        }
    })
});
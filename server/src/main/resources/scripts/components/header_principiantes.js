import { loadOver, cargarSelectorIdiomas } from "./function.js"
loadOver("header.html", document.querySelector('script[src="../scripts/components/header_principiantes.js"]'))
document.addEventListener("HeaderCargado", function () {
    // mostrar header principiantes
    document.querySelector("header .navbar_principiantes").style.display = "block";
    cargarSelectorIdiomas();
    fetch("../../json/idiomas.json")
        .then(response => response.json())
        .then(idiomas => {
            let idioma_usuario = localStorage.getItem("userLanguage");
            if (idioma_usuario == null) idioma_usuario = "en";

            const tutorial_a = document.querySelector("#tutorial_a");
            tutorial_a.innerHTML = idiomas["beginner_funcionalities"][`${idioma_usuario}`][0];
            
            const types_a = document.querySelector("#types_a");
            types_a.innerHTML = idiomas["beginner_funcionalities"][`${idioma_usuario}`][1];

            const glossary_a = document.querySelector("#glossary_a");
            glossary_a.innerHTML = idiomas["beginner_funcionalities"][`${idioma_usuario}`][2];

            const quizz_a = document.querySelector("#quizz_a");
            quizz_a.innerHTML = idiomas["beginner_funcionalities"][`${idioma_usuario}`][3];
        })
})
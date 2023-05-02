import { loadOver } from "./function.js"

export const cargarSelectorIdiomas = () => {
    const spanishFlag = document.querySelector("#spanish");
    const englishFlag = document.querySelector("#english");
    spanishFlag.addEventListener("click", () => {
        localStorage.setItem("userLanguage", "es");
        location.reload();
    });
    englishFlag.addEventListener("click", () => {
        localStorage.setItem("userLanguage", "en");
         location.reload();
    });
}

loadOver("header.html", document.querySelector('script[src="../scripts/components/header.js"]'));
document.addEventListener("HeaderCargado", function () {
    cargarSelectorIdiomas();
    fetch("../../json/idiomas.json")
        .then(response => response.json())
        .then(idiomas => {
            let idioma_usuario = localStorage.getItem("userLanguage");
            if (idioma_usuario == null) idioma_usuario = "en";

            const languagepicker = document.querySelector("#languagepicker");
            languagepicker.innerHTML = idiomas["beginner_funcionalities"][`${idioma_usuario}`][4] + ":";

        })
})
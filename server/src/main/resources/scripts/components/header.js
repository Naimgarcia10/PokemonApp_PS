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
document.addEventListener("HeaderCargado", function(){
    cargarSelectorIdiomas();
})
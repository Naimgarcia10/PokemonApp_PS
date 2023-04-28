import { loadOver } from "./function.js"

export const cargarSelectorIdiomas = () => {
    const languagePickerSelect = document.getElementById('language-picker-select');
    if(localStorage.getItem("userLanguage") === "es") languagePickerSelect.value = "spanish";
    languagePickerSelect.addEventListener('change', () => {
        const selectedLang = languagePickerSelect.selectedOptions[0].getAttribute("lang");
        localStorage.setItem("userLanguage", selectedLang);
        console.log("El idioma seleccionado por el usuario es ", selectedLang);
        location.reload();
    });
}

loadOver("header.html", document.querySelector('script[src="../scripts/components/header.js"]'));
document.addEventListener("HeaderCargado", function(){
    cargarSelectorIdiomas();
})
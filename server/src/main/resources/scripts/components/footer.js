import { loadOver } from "./function.js"
loadOver("footer.html", document.querySelector('script[src="../scripts/components/footer.js"]'));
document.addEventListener("HeaderCargado", function () {
    fetch("../../json/idiomas.json")
        .then(response => response.json())
        .then(idiomas => {
            let idioma_usuario = localStorage.getItem("userLanguage");
            if (idioma_usuario == null) idioma_usuario = "en";

            const contact_a = document.querySelector("#contact_a");
            contact_a.innerHTML = idiomas["footer"][`${idioma_usuario}`][0];

            const suggestions_a = document.querySelector("#suggestions_a");
            suggestions_a.innerHTML = idiomas["footer"][`${idioma_usuario}`][1];

            const cookies_a = document.querySelector("#cookies_a");
            cookies_a.innerHTML = idiomas["footer"][`${idioma_usuario}`][2];

            const privacy_a = document.querySelector("#privacy_a");
            privacy_a.innerHTML = idiomas["footer"][`${idioma_usuario}`][3];
        })
});
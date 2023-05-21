import { loadOver, cargarSelectorIdiomas } from "./function.js"
loadOver("header.html", document.querySelector('script[src="../scripts/components/header_expertos.js"]'))

document.addEventListener("HeaderCargado", function () {
    // mostrar header expertos
    document.querySelector("header .navbar_expertos").style.display = "block";

    cargarSelectorIdiomas();
    fetch("../../json/idiomas.json")
        .then(response => response.json())
        .then(idiomas => {
            let idioma_usuario = localStorage.getItem("userLanguage");
            if (idioma_usuario == null) idioma_usuario = "en";

            const search_pokemon_a = document.querySelector("#search_pokemon_a");
            search_pokemon_a.innerHTML = idiomas["expert_funcionalities"][`${idioma_usuario}`][0];

            const search_object_a = document.querySelector("#search_object_a");
            search_object_a.innerHTML = idiomas["expert_funcionalities"][`${idioma_usuario}`][1];

            const search_move_a = document.querySelector("#search_move_a");
            search_move_a.innerHTML = idiomas["expert_funcionalities"][`${idioma_usuario}`][2];

            const search_ability_a = document.querySelector("#search_ability_a");
            search_ability_a.innerHTML = idiomas["expert_funcionalities"][`${idioma_usuario}`][3];

            const simulator_a = document.querySelector("#simulator_a");
            simulator_a.innerHTML = idiomas["expert_funcionalities"][`${idioma_usuario}`][4];

            const evaluate_team_a = document.querySelector("#evaluate_team_a");
            evaluate_team_a.innerHTML = idiomas["expert_funcionalities"][`${idioma_usuario}`][5];

            const languagepicker = document.querySelector("#languagepicker");
            languagepicker.innerHTML = idiomas["expert_funcionalities"][`${idioma_usuario}`][6] + ":";
        })

        const logoutLi = document.getElementById('logoutLi');
        logoutLi.addEventListener("click", function (event) {
            event.preventDefault();
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('username');
            window.location.href = 'equipoPokemon.html';
        }) 
    
        const username = sessionStorage.getItem('username');
        const loginLi = document.getElementById('loginLi');
        const registerLi = document.getElementById('registerLi');
        const usernameLi = document.getElementById('usernameLi');
        const usernameText = document.getElementById('usernameText');
    
        if (username.length > 0) {
            loginLi.style.display = 'none';
            registerLi.style.display = 'none';
            logoutLi.style = 'border-style: initial;display: inline; padding: 1rem; margin: 0.5rem; background-color: var(--LightSeaGreen); font-weight: bold; font-size: 1rem;';
            usernameLi.style = 'border-style: initial;display: inline; padding: 1rem; margin: 0.5rem; background-color: var(--LightSeaGreen); font-weight: bold; font-size: 1rem;';
            usernameText.innerHTML = username;
            usernameText.style = 'color: var(--Black);';
        } else {
            loginLi.style = 'border-style: initial;display: inline; padding: 1rem; margin: 0.5rem; background-color: var(--LightSeaGreen); font-weight: bold; font-size: 1rem;';
            registerLi.style = 'border-style: initial;display: inline; padding: 1rem; margin: 0.5rem; background-color: var(--LightSeaGreen); font-weight: bold; font-size: 1rem;';
            usernameLi.style = 'display: none;';
            logoutLi.style = 'display: none;';
        }
})

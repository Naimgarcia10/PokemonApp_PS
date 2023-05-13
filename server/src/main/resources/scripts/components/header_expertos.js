import { loadOver, cargarSelectorIdiomas } from "./function.js"
loadOver("header.html", document.querySelector('script[src="../scripts/components/header_expertos.js"]'))
document.addEventListener("HeaderCargado", function(){
    // mostrar header expertos
    document.querySelector("header .navbar_expertos").style.display = "block";
    cargarSelectorIdiomas();
    fetch("../../json/idiomas.json")
    .then(response => response.json())
    .then(idiomas => {
    let idioma_usuario = localStorage.getItem("userLanguage");
    if(idioma_usuario == null) idioma_usuario = "en";

    const search_pokemon_a = document.querySelector("#search_pokemon_a");
    search_pokemon_a.innerHTML = idiomas["expert_funcionalities"][`${idioma_usuario}`][0]; 

    const search_object_a = document.querySelector("#search_object_a");
    search_object_a.innerHTML = idiomas["expert_funcionalities"][`${idioma_usuario}`][1];

    const search_move_a = document.querySelector("#search_move_a");
    search_move_a.innerHTML = idiomas["expert_funcionalities"][`${idioma_usuario}`][2];

    const search_ability_a = document.querySelector("#search_ability_a");
    search_ability_a.innerHTML = idiomas["expert_funcionalities"][`${idioma_usuario}`][3];

    const evaluate_team_a = document.querySelector("#evaluate_team_a");
    evaluate_team_a.innerHTML = idiomas["expert_funcionalities"][`${idioma_usuario}`][4];
    });
});
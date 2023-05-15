document.addEventListener("DOMContentLoaded", function(){
    fetch("../../json/idiomas.json")
    .then(response => response.json())
    .then(idiomas => {
        let idioma_usuario = localStorage.getItem("userLanguage");
        if(idioma_usuario == null) idioma_usuario = "en";

        const titulo = document.querySelector(".main_title");
        titulo.textContent = idiomas["types"][`title_${idioma_usuario}`];

        const h1_poke_types = document.querySelector("#h1_poke_types");
        h1_poke_types.textContent = idiomas["types"][`table_content_${idioma_usuario}`][0];

        const selector_label = document.querySelector("#selector_label");
        selector_label.textContent = idiomas["types"][`table_content_${idioma_usuario}`][1] + ":";

        const choose_opt = document.querySelector("#choose_opt");
        choose_opt.textContent = idiomas["types"][`table_content_${idioma_usuario}`][2];

        const offensive_u = document.querySelector("#offensive_u");
        offensive_u.textContent = idiomas["types"][`offensive_content_${idioma_usuario}`][0];

        const effective_h3 = document.querySelector("#efectivo_h3");
        effective_h3.textContent = idiomas["types"][`offensive_content_${idioma_usuario}`][1];

        const no_effective_h3 = document.querySelector("#no_efectivo_h3");
        no_effective_h3.textContent = idiomas["types"][`offensive_content_${idioma_usuario}`][2];

        const zero_damage_h3 = document.querySelector("#nulo_h3");
        zero_damage_h3.textContent = idiomas["types"][`offensive_content_${idioma_usuario}`][3];

        const defensive_u = document.querySelector("#defensive_u");
        defensive_u.textContent = idiomas["types"][`defensive_content_${idioma_usuario}`][0];

        const efectivo_def_h3 = document.querySelector("#efectivo_def_h3");
        efectivo_def_h3.textContent = idiomas["types"][`defensive_content_${idioma_usuario}`][1];

        const no_efectivo_def_h3 = document.querySelector("#no_efectivo_def_h3");
        no_efectivo_def_h3.textContent = idiomas["types"][`defensive_content_${idioma_usuario}`][2];

        const nulo_def_h3 = document.querySelector("#nulo_def_h3");
        nulo_def_h3.textContent = idiomas["types"][`defensive_content_${idioma_usuario}`][3];

        

        

        

    })
});
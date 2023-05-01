document.addEventListener("HeaderCargado", function(){
    fetch("../../json/idiomas.json")
    .then(response => response.json())
    .then(idiomas => {
        let idioma_usuario = localStorage.getItem("userLanguage");
        if(idioma_usuario == null) idioma_usuario = "en";

        const menu_expertos = document.querySelectorAll(".expert_menu li a");
        
        for (let i = 0; i < menu_expertos.length; i++) {
            menu_expertos[i].textContent = idiomas["expert_funcionalities"][`${idioma_usuario}`][i]; 
        }
    })
});
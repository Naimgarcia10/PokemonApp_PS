import { loadOver } from "./function.js"
loadOver("header.html", document.querySelector('script[src="../scripts/components/header_principiantes.js"]'))
document.addEventListener("HeaderCargado", function(){
    // mostrar header principiantes
    document.querySelector("header .navbar_principiantes").style.display = "block";
})
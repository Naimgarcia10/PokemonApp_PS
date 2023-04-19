import { loadOver } from "./function.js"
loadOver("header.html", document.querySelector('script[src="../scripts/components/header_expertos.js"]'))
document.addEventListener("HeaderCargado", function(){
    // mostrar header expertos
    document.querySelector("header .navbar_expertos").style.display = "block";
})
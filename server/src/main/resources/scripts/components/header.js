import { loadOver, cargarSelectorIdiomas } from "./function.js"

document.addEventListener("HeaderCargado", cargarSelectorIdiomas);
loadOver("header.html", document.querySelector('script[src="../scripts/components/header.js"]'));
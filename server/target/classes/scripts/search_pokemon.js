const input = document.getElementById("buscador");

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    if (buscador.value.trim() === "") {
        alert("No se ha introducido ningún Pokémon.");
    }
    else{window.location.href = "pokemon.html";}
  }
});

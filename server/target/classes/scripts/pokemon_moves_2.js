document.addEventListener("DOMContentLoaded", async () => {
  const moveName = getParameterByName("move");
  if (moveName) {
    const moveDetails = await fetchMoveDetails(moveName);
    displayPokemonMovesTable(moveDetails);
  }
});

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

async function fetchMoveDetails(moveName) {
  const response = await fetch("../json/pokemon_moves.json");
  const moves = await response.json();
  return moves.find((move) => move.name === moveName);
}

function displayPokemonMovesTable(moveDetails) {
  const tableBody = document.getElementById("pokemon-moves-table-body");
  moveDetails.pokemon.forEach((pokemon) => {
    const row = tableBody.insertRow();

    // Nombre del Pokémon
    const cell1 = row.insertCell();
    cell1.textContent = pokemon.name;


    // Imagen del Pokémon
    const cell2 = row.insertCell();
    const image = document.createElement("img");
    image.src = pokemon.image;
    image.alt = pokemon.name;

    // Ajustar el tamaño de la imagen
    image.style.width = "3rem";
    image.style.height = "3rem";

    cell2.appendChild(image);

    // Método de aprendizaje
    const cell3 = row.insertCell();
    if (pokemon.learn_method === "level") {
      cell3.textContent = `Por nivel (Nivel ${pokemon.level})`;
    } else {
      cell3.textContent = pokemon.learn_method;
    }

    
  });
}


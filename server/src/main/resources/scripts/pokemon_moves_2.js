import {DB_HOST, DB_PORT} from "./config.js"

document.addEventListener("DOMContentLoaded", () => {
  const moveName = getParameterByName("move");
  if (moveName) {
    fetchMoveDetails(moveName, displayPokemonMovesTable);
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

function fetchMoveDetails(moveName, callback) {
  const id = localStorage.getItem("idMovement");
  fetch(`http://${DB_HOST}:${DB_PORT}/getPokemonsWhoLearnsMovements/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar los datos de la API");
      }
      return response.json();
    })
    .then((moveDetails) => {
      callback(moveDetails);
    })
    .catch((error) => {
      console.error("Error al cargar los datos de movimientos de Pokémon:", error);
    });
}

function displayPokemonMovesTable(moveDetails) {
  console.log(moveDetails); // Agregar esta línea para ver los datos cargados

  const tableBody = document.getElementById("pokemon-moves-table-body");
  moveDetails.forEach((pokemon) => {
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

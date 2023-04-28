document.addEventListener("DOMContentLoaded", async () => {
  const abilityName = getParameterByName("ability");
  if (abilityName) {
    const abilityDetails = await fetchAbilityDetails(abilityName);
    displayPokemonAbilitiesTable(abilityDetails);
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

async function fetchAbilityDetails(abilityName) {
  const response = await fetch("../json/abilities.json");
  const abilities = await response.json();
  return abilities.find((ability) => ability.name === abilityName);
}

function displayPokemonAbilitiesTable(abilityDetails) {
  const tableBody = document.getElementById("pokemon-abilities-table-body");
  abilityDetails.pokemon.forEach((pokemon) => {
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
    cell3.textContent = pokemon.learn_method;
  });
}

import { DB_HOST, DB_PORT } from "./config.js"

const card = document.querySelector('.card');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');
const saveBtn = document.querySelector('.save-btn');

const searchBox = document.getElementById('input-text');
const searchButton = document.getElementById('search-button');

const pokemonList =[];
let habilidadSeleccionada = '';
const input = document.getElementById("input-text");
const pokemonUl = document.getElementById("pokemon-list");

const url_PokemonsName= `http://${DB_HOST}:${DB_PORT}/getPokemonsName`;


cargaLista();

const habilidades = document.querySelectorAll('.tarjetaPokemonHabilidad .habilidad');

habilidades.forEach(habilidad => {
  habilidad.addEventListener('click', () => {
    habilidades.forEach(h => h.classList.remove('selected'));
    habilidad.classList.add('selected');
    habilidadSeleccionada = habilidad.querySelector('p').textContent;
    console.log(habilidadSeleccionada);
  });
});

const selectMovimiento1 = document.querySelector('#movimiento1');
const selectMovimiento2 = document.querySelector('#movimiento2');
const selectMovimiento3 = document.querySelector('#movimiento3');
const selectMovimiento4 = document.querySelector('#movimiento4');
const movimientos = ['Water Absorb', 'Surf', 'Hydro Pump'];

movimientos.forEach(movimiento => {
  const option = document.createElement('option');
  option.textContent = movimiento;
  const optionClone1 = option.cloneNode(true);
  const optionClone2 = option.cloneNode(true);
  const optionClone3 = option.cloneNode(true);
  const optionClone4 = option.cloneNode(true);
  selectMovimiento1.appendChild(optionClone1);
  selectMovimiento2.appendChild(optionClone2);
  selectMovimiento3.appendChild(optionClone3);
  selectMovimiento4.appendChild(optionClone4);
});

card.addEventListener('click', function () {
    overlay.style.display = 'block';
});

closeBtn.addEventListener('click', function () {
    overlay.style.display = 'none';
});

saveBtn.addEventListener('click', function () {
    overlay.style.display = 'none';
});

input.addEventListener("input", filtradoPokemon);

async function cargaLista() {
    const response = await fetch(url_PokemonsName);
    const data = await response.json();
    data.forEach(pokemon => {
        pokemonList.push(pokemon);
    });
}


function filtradoPokemon() {
    const searchQuery = this.value.toLowerCase();
    const filteredPokemon = pokemonList.filter(pokemon => pokemon.toLowerCase().startsWith(searchQuery));

    pokemonUl.innerHTML = ""; // Limpiar la lista antes de agregar elementos filtrados
    filteredPokemon.forEach(pokemon => {
        if (searchQuery === "") {
            return pokemon.toLowerCase().includes(searchQuery);
        }
        const li = document.createElement("li");
        li.innerText = pokemon;
        li.addEventListener("click", () => {
            const valor = li.textContent;
            document.getElementById('input-text').value = valor;
            pokemonUl.innerHTML = "";
        });
        pokemonUl.appendChild(li);

    });

}

searchButton.onclick = () => {
    searchBox.value = "";
    pokemonUl.innerHTML = "";
    const searchTerm = input.value;
    const valorInputCodificado = encodeURIComponent(searchTerm);
    const url_Pokemon = `http://${DB_HOST}:${DB_PORT}/getPokemon/${valorInputCodificado}`;
    console.log("hola");
};



/****************************------------------------------******************* */



function showStats() {

    const pokemonHp = 10;
    const pokemonAttack = 40;
    const pokemonDefense = 60;
    const pokemonSpatk = 80;
    const pokemonSpdef = 90;
    const pokemonSpeed = 100;
  
    const statsDiv = document.getElementById('stats');
  
    const statNames_es = ['PS', 'Ataque', 'Defensa', 'Ata. Esp', 'Def. Esp', 'Velocidad'];
    const statNames =  statNames_es;
    const statValues = [
      pokemonHp,
      pokemonAttack,
      pokemonDefense,
      pokemonSpatk,
      pokemonSpdef,
      pokemonSpeed
    ];
  
    for (let i = 0; i < statNames.length; i++) {
      const statName = statNames[i];
      const statValue = statValues[i];
  
      const statLabel = document.createElement('div');
      statLabel.textContent = statName;
      statLabel.classList.add('stat-label');
  
      const progressBar = document.createElement('div');
      progressBar.classList.add('progress-bar');
  
      const progress = document.createElement('div');
      progress.classList.add('progress');
      progress.style.width = (statValue / 255) * 100 + '%';
  
      progressBar.appendChild(progress);
  
      const statValueDiv = document.createElement('div');
      statValueDiv.textContent = statValue;
      statValueDiv.classList.add('stat-value');
  
      const statRow = document.createElement('div');
      statRow.classList.add('stat-row');
  
      statRow.appendChild(statLabel);
      statRow.appendChild(progressBar);
      statRow.appendChild(statValueDiv);
  
      statsDiv.appendChild(statRow);
    }
  }
  
  window.addEventListener('DOMContentLoaded', showStats);
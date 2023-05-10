import { DB_HOST, DB_PORT } from "./config.js"

const card = document.querySelector('.card');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');
const saveBtn = document.querySelector('.save-btn');

const searchBox = document.getElementById('input-text');
const searchButton = document.getElementById('search-button');

//const pokemonList = ["Bulbasaur", "Charmander", "Squirtle", "Pikachu", "Eevee", "Snorlax", "Mew", "Mewtwo"];
const pokemonList =[];
const input = document.getElementById("input-text");
const pokemonUl = document.getElementById("pokemon-list");

const url_PokemonsName= `http://${DB_HOST}:${DB_PORT}/getPokemonsName`;


cargaLista();

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





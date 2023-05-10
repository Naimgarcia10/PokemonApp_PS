const card = document.querySelector('.card');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');
const saveBtn = document.querySelector('.save-btn');

card.addEventListener('click', function () {
    overlay.style.display = 'block';
});

closeBtn.addEventListener('click', function () {
    overlay.style.display = 'none';
});

saveBtn.addEventListener('click', function () {
    overlay.style.display = 'none';
});


const pokemonList = ["Bulbasaur", "Charmander", "Squirtle", "Pikachu", "Eevee", "Snorlax", "Mew", "Mewtwo"];
const input = document.getElementById("input-text");
const pokemonUl = document.getElementById("pokemon-list");

input.addEventListener("input", filtradoPokemon);
//input.addEventListener("click", filtradoPokemon);

function filtradoPokemon() {
    const searchQuery = this.value.toLowerCase();
    const filteredPokemon = pokemonList.filter(pokemon => pokemon.toLowerCase().startsWith(searchQuery));
    pokemonUl.innerHTML = ""; // Limpiar la lista antes de agregar elementos filtrados
    filteredPokemon.forEach(pokemon => {
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

const searchBox = document.getElementById('input-text');
const searchButton = document.getElementById('search-button');
searchButton.onclick = () => {
    console.log("a buscar pokemon");
    
    //Borrar contenido del input
    searchBox.value = "";
    //Borrar contenido de la lista
    pokemonUl.innerHTML = "";
};





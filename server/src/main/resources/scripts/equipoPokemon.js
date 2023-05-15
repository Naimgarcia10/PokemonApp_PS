import { DB_HOST, DB_PORT } from "./config.js"

const card = document.querySelector('.card');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');
const saveBtn = document.querySelector('.save-btn');
const searchBox = document.getElementById('input-text');
const searchButton = document.getElementById('search-button');


const pokemonList = [];
let movimientos = [];
let habilidadSeleccionada = '';
let ivs_globales = 508;
const input = document.getElementById("input-text");
const pokemonUl = document.getElementById("pokemon-list");

let pokemonHpBase = 0;
let pokemonAttackBase = 0;
let pokemonDefenseBase = 0;
let pokemonSpatkBase = 0;
let pokemonSpdefBase = 0;
let pokemonSpeedBase = 0;

let pokemonHp = 0;
let pokemonAttack = 0;
let pokemonDefense = 0;
let pokemonSpatk = 0;
let pokemonSpdef = 0;
let pokemonSpeed = 0;

let pokemonCount = 0; // Inicializa el contador de Pokémon. Se usa para saber cuántos Pokémon hay en el equipo

const url_PokemonsName = `http://${DB_HOST}:${DB_PORT}/getPokemonsName`;
const url_PostPokemon = `http://${DB_HOST}:${DB_PORT}/postPokemonCard`;
const url_GetPokemon = `http://${DB_HOST}:${DB_PORT}/getCards`;

cargaLista();


/*
##############################################
#           Seleccionar Habilidades          #
##############################################
*/

const habilidades = document.querySelectorAll('.tarjetaPokemonHabilidad .habilidad');

habilidades.forEach(habilidad => {
    habilidad.addEventListener('click', () => {
        habilidades.forEach(h => h.classList.remove('selected'));
        habilidad.classList.add('selected');
        habilidadSeleccionada = habilidad.querySelector('p').textContent;
        console.log(habilidadSeleccionada);
    });
});

/*
##############################################
#          Seleccionar  Movimientos          #
##############################################
*/

function updateMovements() {

    const selectMovimiento1 = document.getElementById('movimiento1');
    const selectMovimiento2 = document.getElementById('movimiento2');
    const selectMovimiento3 = document.getElementById('movimiento3');
    const selectMovimiento4 = document.getElementById('movimiento4');

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

}

/*Boton no guardar*/
closeBtn.addEventListener('click', function () {
    overlay.style.display = 'none';
});


/*Tarjeta Para añadir pokemon (tarjeta con el +) */
card.addEventListener('click', function () {
    overlay.style.display = 'block';
});


/*Boton guardar pokemon*/
saveBtn.addEventListener('click', function () {

    pokemonCount++;
    updateAddButton();
    const evs = document.querySelectorAll(".ivs");
    const ivs = document.querySelectorAll(".evs");
    let data = {
        name: document.querySelector('.nombrePokemon') ? document.querySelector('.nombrePokemon').textContent : "",
        ability: document.querySelector('.selected') ? document.querySelector('.selected').textContent : "",
        movement1: document.querySelector('#movimiento1') ? document.querySelector('#movimiento1').value : "",
        movement2: document.querySelector('#movimiento2') ? document.querySelector('#movimiento2').value : "",
        movement3: document.querySelector('#movimiento3') ? document.querySelector('#movimiento3').value : "",
        movement4: document.querySelector('#movimiento4') ? document.querySelector('#movimiento4').value : "",
        evs: [],
        ivs: []
    };

    // Comprobaciones de campos vacíos
    if (data.name === "" || data.name === "Nombre del pokemon") {
        alert("Seleccione un Pokémon");
        return;  // Detiene la ejecución de la función
    }

    if (data.ability === "") {
        alert("Seleccione una habilidad");
        return;  // Detiene la ejecución de la función
    }

    if (data.movement1 === "" && data.movement2 === "" && data.movement3 === "" && data.movement4 === "") {
        alert("Seleccione al menos un movimiento");
        return;  // Detiene la ejecución de la función
    }

    evs.forEach(ev => {
        data.evs.push(ev.value ? ev.value : 0);
    });

    ivs.forEach(iv => {
        data.ivs.push(iv.value ? iv.value : 0);
    });

    post_pokemonCard(data);
    overlay.style.display = 'none';

});

/*####################################################*/
function updateAddButton() {
    // Obtiene el botón de agregar Pokémon.

    // Si ya hay 6 Pokémon, oculta el botón. De lo contrario, muéstralo.
    if (pokemonList.length >= 6) {
        console.log("Ya hay 6 Pokémon");
        card.style.display = "none";
    } else {
        card.style.display = "block";
    }
}




/*buscador de pokemon*/

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

/*
###########################################################
click en la lupa
Seccion: refresca la informacion al seleccionar un pokemon
###########################################################
*/


searchButton.onclick = async () => {
    const searchTerm = searchBox.value;
    searchBox.value = "";
    pokemonUl.innerHTML = "";
    const valorInputCodificado = encodeURIComponent(searchTerm);
    const url_Pokemon = `http://${DB_HOST}:${DB_PORT}/getPokemon/${valorInputCodificado}`;
    const response = await fetch(url_Pokemon);
    const data = await response.json();

    /*nombre del pokemon*/
    const nombrePokemon = document.querySelector('.nombrePokemon');
    nombrePokemon.textContent = data[0].name;

    /*imagen del pokemon*/
    const imagenPokemon = document.querySelector('.imagenPokemon');
    imagenPokemon.src = data[0].image;

    /*tipo del pokemon*/
    const tipoPokemon1 = document.querySelector('.tipoPokemon1');
    const tipoPokemon2 = document.querySelector('.tipoPokemon2');
    tipoPokemon1.src = data[0].type1;
    tipoPokemon2.src = data[0].type2;

    /*habilidad del pokemon*/
    const habilidadPokemon1 = document.querySelector('#habilidad1');
    const habilidadPokemon2 = document.querySelector('#habilidad2');
    const habilidadPokemon3 = document.querySelector('#habilidad3');
    habilidadPokemon1.textContent = data[0].ability1;
    habilidadPokemon2.textContent = data[0].ability2;
    habilidadPokemon3.textContent = data[0].ability3;

    /*movimientos del pokemon*/
    data[0].pokemonMoves.forEach(movimiento => {
        movimientos.push(movimiento.name);
    });
    updateMovements();

    /*stats del pokemon*/
    pokemonHp = data[0].hp_base;
    pokemonAttack = data[0].attack_base;
    pokemonDefense = data[0].defense_base;
    pokemonSpatk = data[0].spatk_base;
    pokemonSpdef = data[0].spdef_base;
    pokemonSpeed = data[0].speed_base;

    pokemonHpBase = pokemonHp;
    pokemonAttackBase = pokemonAttack;
    pokemonDefenseBase = pokemonDefense;
    pokemonSpatkBase = pokemonSpatk;
    pokemonSpdefBase = pokemonSpdef;
    pokemonSpeedBase = pokemonSpeed;

    updateStats();

}
function updateStats() {
    const statsDiv = document.getElementById('stats');
    const progress = statsDiv.querySelectorAll('.progress');
    const progress_num = statsDiv.querySelectorAll('.stat-value');
    const statValues = [
        pokemonHp,
        pokemonAttack,
        pokemonDefense,
        pokemonSpatk,
        pokemonSpdef,
        pokemonSpeed
    ];

    for (let i = 0; i < statValues.length; i++) {
        const statValue = statValues[i];
        progress[i].style.width = (statValue / 255) * 100 + '%';
        progress_num[i].textContent = Math.trunc(statValue);
    }
}
function showStats() {

    const statsDiv = document.getElementById('stats');

    const statNames_es = ['PS', 'Ataque', 'Defensa', 'Ata. Esp', 'Def. Esp', 'Velocidad'];
    const statNames = statNames_es;
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
        /*crear los ivs y evs*/
        const ivs = document.createElement('input');
        ivs.type = 'number';
        ivs.min = 0;
        ivs.max = 252;
        ivs.classList.add('ivs');

        const evs = document.createElement('input');
        evs.type = 'number';
        evs.min = 0;
        evs.max = 31;
        evs.classList.add('evs');

        statRow.appendChild(ivs);
        statRow.appendChild(evs);
        statsDiv.appendChild(statRow);
    }
}
function updateIvs() {
    const cuadroTexto = document.getElementById('cuadroTexto');
    cuadroTexto.value = ivs_globales;
}
function listener_for_evs() {
    const input_evs = document.querySelectorAll('.evs');
    let previousValue = 0;
    input_evs.forEach((input, index) => {
        input.addEventListener('keydown', () => {
            if (event.key === 'Enter') {
                if (input.value < 0 || input.value > 31) {
                    input.value = 0;
                    console.log('error');
                    input.style.borderColor = 'red';
                } else {
                    modificate_stats_evs(input.value, index);
                    updateStats();
                    input.style.borderColor = 'green';
                    console.log('ok');
                }
                previousValue = input.value;
                input.blur();
            }
        });
    });
}
function listener_for_ivs() {
    const input_ivs = document.querySelectorAll('.ivs');
    let previousValue = 0;
    const statValues = [
        pokemonHp,
        pokemonAttack,
        pokemonDefense,
        pokemonSpatk,
        pokemonSpdef,
        pokemonSpeed
    ];

    input_ivs.forEach((input, index) => {
        input.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                if (input.value === '') {
                    ivs_globales = ivs_globales + Number(previousValue);
                    updateIvs();
                    modificate_stats(previousValue, 0, index);
                    updateStats();
                    input.style.borderColor = 'green';
                } else if (input.value < 0 || input.value > 252 || input.value > ivs_globales) {
                    input.value = 0;
                    console.log('error');
                    input.style.borderColor = 'red';
                } else {
                    console.log('ok');
                    ivs_globales = ivs_globales + (previousValue - input.value);
                    updateIvs();
                    modificate_stats(previousValue, input.value, index);
                    updateStats();
                    input.style.borderColor = 'green';
                }
                previousValue = input.value;
                input.blur();
            }
        });

        input.addEventListener('focus', () => {
            previousValue = input.value;
        });
    });
}

window.addEventListener('DOMContentLoaded', ()=>{
    loadCards();
    showStats();
    updateIvs();
    listener_for_evs();
    listener_for_ivs();
});

function modificate_stats(previousValue, input, index) {
    switch (index) {
        case 0:
            pokemonHp = pokemonHp + (input - previousValue) / 4;
            break;
        case 1:
            pokemonAttack = pokemonAttack + (input - previousValue) / 4;
            break;
        case 2:
            pokemonDefense = pokemonDefense + (input - previousValue) / 4;
            break;
        case 3:
            pokemonSpatk = pokemonSpatk + (input - previousValue) / 4;
            break;
        case 4:
            pokemonSpdef = pokemonSpdef + (input - previousValue) / 4;
            break;
        case 5:
            pokemonSpeed = pokemonSpeed + (input - previousValue) / 4;
            break;
    }
}
function modificate_stats_evs(input, index) {
    switch (index) {
        case 0:
            pokemonHp = (pokemonHpBase + Number(input));
            break;
        case 1:
            pokemonAttack = (pokemonAttackBase + Number(input));
            break;
        case 2:
            pokemonDefense = (pokemonDefenseBase + Number(input));
            break;
        case 3:
            pokemonSpatk = (pokemonSpatkBase + Number(input));
            break;
        case 4:
            pokemonSpdef = (pokemonSpdefBase + Number(input));
            break;
        case 5:
            pokemonSpeed = (pokemonSpeedBase + Number(input));
            break;
    }
}


function post_pokemonCard(data) {
    fetch(url_PostPokemon, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

function loadCards() {

    fetch(url_GetPokemon)
        .then(response => response.json())
        .then(data => {
            const contenedor = document.querySelector('.container');
            data.forEach(element => {
                const card = document.createElement('div');
                card.innerHTML = `  <div class="imagen_nombre">
                                    <h3>${element.name}</h3>
                                    <img src="${element.image}" alt="">
                                    </div>`;

                card.classList.add('cardPokemon');
                contenedor.appendChild(card);

            });
        })
        .catch(error => console.error(error));
}
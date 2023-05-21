import { DB_HOST, DB_PORT } from "./config.js"
import {CustomPokemon} from "./classes/customPokemon.js"

const url_PokemonsName = `http://${DB_HOST}:${DB_PORT}/getPokemonsName`;
const url_PostPokemon = `http://${DB_HOST}:${DB_PORT}/postPokemonCard`;
const url_Natures = `http://${DB_HOST}:${DB_PORT}/getNatures`;


const addPokemonBtn = document.querySelector('.addPokemon-btn');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');
const saveBtn = document.querySelector('.save-btn');
const searchBox = document.getElementById('input-text');
const searchButton = document.getElementById('search-button');
const saveTeamBtn = document.getElementById('saveTeam-btn');
const evalTeamBtn = document.getElementById('evaluate-btn');



let customPokemons = [];
let naturesShown = false;
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

let pokemonJSON = null;

let pokemonCount = 0; // Inicializa el contador de Pokémon. Se usa para saber cuántos Pokémon hay en el equipo


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

/*
#########################################################
#                   eventListeners                      #
#########################################################
*/

/*Boton no guardar*/
closeBtn.addEventListener('click', function () {
    overlay.style.display = 'none';
});


/*Tarjeta Para añadir pokemon (tarjeta con el +) */
addPokemonBtn.addEventListener('click', addPokemon);

function addPokemon() {
    overlay.style.display = 'block';
}


/*Boton guardar pokemon*/
saveBtn.addEventListener('click', savePokemon);

/*buscador de pokemon*/
input.addEventListener("input", filtradoPokemon);

saveTeamBtn.addEventListener('click', function(){
    saveCustomPokemons(customPokemons)
});



evalTeamBtn.addEventListener('click', function(){
    console.log("EVALUAR EQUIPO");
    showPokemonTeamEvaluation(customPokemons);


});




/*
#########################################################
#                      savePokemon                      #
#########################################################
*/


async function savePokemon(){
    if (customPokemons.length >=6) {
        alert("Equipo completo");
        return;        
    }
    const evs = document.querySelectorAll(".ivs");
    const ivs = document.querySelectorAll(".evs");
    let data = {
        name: document.querySelector('.nombrePokemon') ? document.querySelector('.nombrePokemon').textContent : "",
        ability: document.querySelector('.selected') ? document.querySelector('.selected').textContent : "",
        nature: document.querySelector('#nature') ? document.querySelector('#nature').value : "",
        movement1: document.querySelector('#movimiento1') ? document.querySelector('#movimiento1').value : "",
        movement2: document.querySelector('#movimiento2') ? document.querySelector('#movimiento2').value : "",
        movement3: document.querySelector('#movimiento3') ? document.querySelector('#movimiento3').value : "",
        movement4: document.querySelector('#movimiento4') ? document.querySelector('#movimiento4').value : "",
        evs: [],
        ivs: [],
        image: document.querySelector(".imagenPokemon") ? document.querySelector(".imagenPokemon").getAttribute("src") : "",
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

    if (data.nature === "") {
        alert("Seleccione una naturaleza");
        return;  // Detiene la ejecución de la función
    }

    evs.forEach(ev => {
        data.evs.push(ev.value ? ev.value : 0);
    });

    ivs.forEach(iv => {
        data.ivs.push(iv.value ? iv.value : 0);
    });    

    let weaknesses = pokemonJSON.pokemonWeaknesses.x4.concat(pokemonJSON.pokemonWeaknesses.x2);
    let resistances = pokemonJSON.pokemonWeaknesses.x1medio.concat(pokemonJSON.pokemonWeaknesses.x1cuarto);
    let immunities = pokemonJSON.pokemonWeaknesses.x0;

    let custompokemon = new CustomPokemon(data.name, data.ability, data.nature, "leftovers", data.movement1, data.movement2, data.movement3, data.movement4,
                                    data.evs[0], data.evs[1], data.evs[2], data.evs[3], data.evs[4], data.evs[5],
                                    data.ivs[0], data.ivs[1], data.ivs[2], data.ivs[3], data.ivs[4], data.ivs[5], data.image, weaknesses, resistances, immunities,
                                    pokemonHp, pokemonAttack, pokemonDefense, pokemonSpatk, pokemonSpdef, pokemonSpeed);                                           

                                    
    console.log(custompokemon);
    customPokemons.push(custompokemon);    
    if (customPokemons.length == 6) {
        addPokemonBtn.style.display = 'none';        
    }
    else{
        addPokemonBtn.style.display = 'flex';
    }        
    overlay.style.display = 'none';
    createCard(custompokemon.name, custompokemon.image, custompokemon.idCustomPokemon);
}

/*
#########################################################
#                      showNatures                      #
#########################################################
*/
function showNatures() {

    fetch(url_Natures)
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('nature');

            data.forEach(nature => {
                const option = document.createElement('option');
                option.value = nature;  // Ahora nature es un string
                option.text = nature;   // Ahora nature es un string
                select.add(option);
            });
        })
        .catch(error => console.error('Error:', error));
}

function createCard(pokemonName, pokemonImage, idCustomPokemon){
    const contenedor = document.querySelector('.container');
    const card = document.createElement('div');                        
    const image_name = document.createElement('div');
    const nameElement = document.createElement('h3');
    const imgElement = document.createElement('img');

    // Establecer los atributos de los elementos
    nameElement.innerText = pokemonName;
    imgElement.src = pokemonImage;
    imgElement.alt = "";

    // Agregar los elementos a la tarjeta
    image_name.appendChild(nameElement);
    image_name.appendChild(imgElement);
    imgElement.classList.add('imagePokemon');
    card.appendChild(image_name);
    card.id = idCustomPokemon;

    card.classList.add('tarjetitaPokemon');

    // Agregar la tarjeta al contenedor
    contenedor.appendChild(card);

    card.addEventListener('click', () =>{
        overlay.style.display = 'block';
    });
}


/* 
#########################################################
#                   saveCustomPokemons                  #
#########################################################
*/

function saveCustomPokemons(customPokemons) {
    let username = sessionStorage.getItem("username");
    const url_customPokemon = `http://${DB_HOST}:${DB_PORT}/postTeam/${username}`;

    fetch(url_customPokemon, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customPokemons),
    })
    .then(response => response.text())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    
}

/* 
#########################################################
#                 showPokemonTeamEvaluation             #
#########################################################
*/

function showPokemonTeamEvaluation(customPokemons) {
    let weaknessesSet = new Set();
    let resistancesSet = new Set();
    let immunitiesSet = new Set();
    let statsSum = {attack: 0, defense: 0, spatk: 0, spdef: 0, speed: 0};

    customPokemons.forEach(pokemon => {
        if(pokemon.weaknesses) {
            pokemon.weaknesses.forEach(weakness => {
                weaknessesSet.add(weakness);
            });
        }
        if(pokemon.resistances) {
            pokemon.resistances.forEach(resistance => {
                resistancesSet.add(resistance);
            });
        }
        if(pokemon.immunities) {
            pokemon.immunities.forEach(immunity => {
                immunitiesSet.add(immunity);
            });
        }
        for(let stat in statsSum) {
            if(pokemon[stat]) {
                statsSum[stat] += pokemon[stat];
            }
        }
    });

    let results = {
        weaknesses: Array.from(weaknessesSet),
        resistances: Array.from(resistancesSet),
        immunities: Array.from(immunitiesSet),
        averageStats: {}
    };

    for(let stat in statsSum) {
        results.averageStats[stat] = statsSum[stat] / customPokemons.length;
    }

    let evaluationsDiv = document.getElementById('evaluations');
    evaluationsDiv.innerHTML = '';
    let title = document.createElement('h2');
    title.textContent = 'Team Evaluation';
    title.classList.add('evaluationsTitle');
    evaluationsDiv.appendChild(title);


    for(let category in results) {
        if(category === 'averageStats') {

            let statTitle = document.createElement('h3');
            statTitle.classList.add('statTitle');
            statTitle.textContent = 'Average Stats';
            evaluationsDiv.appendChild(statTitle);

            for(let stat in results.averageStats) {

                let statDiv = document.createElement('div');
                statDiv.classList.add('stat');

                let label = document.createElement('span');
                label.textContent = `${stat}: `;

                let progressBar = document.createElement('progress');
                progressBar.value = results.averageStats[stat];
                progressBar.max = 255; // Assuming stat maximum as 100
                progressBar.className = 'stat-progress'; // Add class

                let statValue = document.createElement('span');
                statValue.textContent = ` ${Math.round(results.averageStats[stat])}`;


                statDiv.appendChild(label);
                statDiv.appendChild(progressBar);
                statDiv.appendChild(statValue);

                evaluationsDiv.appendChild(statDiv);
            }
        } else {
            let text;
            switch(category) {
                case 'weaknesses':
                    text = 'Your team is weak to: ';
                    break;
                case 'resistances':
                    text = 'Your team is resistant to: ';
                    break;
                case 'immunities':
                    text = 'Your team is immune to: ';
                    break;
            }

            let categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category');
            let textNode = document.createElement('h3');
            textNode.textContent = text;
            categoryDiv.appendChild(textNode);

            results[category].forEach(imgSrc => {
                let img = document.createElement('img');
                img.src = imgSrc;
                categoryDiv.appendChild(img);
            });

            evaluationsDiv.appendChild(categoryDiv);
        }
    }
}








/* 
#########################################################
#                   getIdUserByEmail                    #
#########################################################
*/

function getUserIdByEmail() {
    // Obtener el email del almacenamiento de la sesión
    let email = localStorage.getItem('email');

    // Codificar el email para su uso en una URL
    let encodedEmail = encodeURIComponent(email);

    // Crear la URL para la solicitud
    let url = `http://${DB_HOST}:${DB_PORT}/getIdByEmail/${encodedEmail}`;

    // Hacer la solicitud y procesar la respuesta
    fetch(url)
        .then(response => response.json())
        .then(idUser => {
            console.log('El ID del usuario es', idUser);
        })
        .catch(error => console.error('Error:', error));
}

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
##################################################################
#   Seccion: refresca la informacion al seleccionar un pokemon   #
##################################################################
*/

searchButton.onclick = async () => {
    const searchTerm = searchBox.value;
    sessionStorage.setItem('inputPokemon', searchTerm);
    searchBox.value = "";
    pokemonUl.innerHTML = "";
    const valorInputCodificado = encodeURIComponent(searchTerm);
    const url_Pokemon = `http://${DB_HOST}:${DB_PORT}/getPokemon/${valorInputCodificado}`;
    const response = await fetch(url_Pokemon);
    const data = await response.json();
    pokemonJSON = data[0];
    
    const nombrePokemon = document.querySelector('.nombrePokemon');
    nombrePokemon.textContent = data[0].name;
    
    const imagenPokemon = document.querySelector('.imagenPokemon');
    imagenPokemon.src = data[0].image;
    
    const tipoPokemon1 = document.querySelector('.tipoPokemon1');
    const tipoPokemon2 = document.querySelector('.tipoPokemon2');
    tipoPokemon1.src = data[0].type1;
    tipoPokemon2.src = data[0].type2;
   
    const habilidadPokemon1 = document.querySelector('#habilidad1');
    const habilidadPokemon2 = document.querySelector('#habilidad2');
    const habilidadPokemon3 = document.querySelector('#habilidad3');
    habilidadPokemon1.textContent = data[0].ability1;
    habilidadPokemon2.textContent = data[0].ability2;
    habilidadPokemon3.textContent = data[0].ability3;
   
    data[0].pokemonMoves.forEach(movimiento => {
        movimientos.push(movimiento.name);
    });
    updateMovements();
    showNatures();

 
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
    let username = sessionStorage.getItem("username");
    loadCards(username);
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

function loadCards(username) {    
    console.log(username);
    if (username == null) return;
    fetch(`http://${DB_HOST}:${DB_PORT}/getCards/${username}`)
        .then(response => response.json())
        .then(async datos => {                     
            for (const pokemonJson of datos) {
                const url_Pokemon = `http://${DB_HOST}:${DB_PORT}/getPokemon/${pokemonJson.name}`;
                const response = await fetch(url_Pokemon);
                const pokedata = await response.json();
                const pokemon = pokedata[0];
                let weaknesses = pokemon.pokemonWeaknesses.x4.concat(pokemon.pokemonWeaknesses.x2);
                let resistances = pokemon.pokemonWeaknesses.x1medio.concat(pokemon.pokemonWeaknesses.x1cuarto);
                let immunities = pokemon.pokemonWeaknesses.x0;
                /* DEBERÍA CALCULAR EL ATAQUE, DEFENSA, SPATK, SPDEF, Y SPEED, UTILIZANDO LOS EVS/IVS/NATURE. NO SE HACE TODAVÍA. HACERLO? */
                let custompokemon = new CustomPokemon(pokemon.name, pokemon.ability, pokemon.nature, pokemon.item, pokemon.movement1, pokemon.movement2,
                    pokemon.movement3, pokemon.movement4, pokemon.evsHp, pokemon.evsAttack, pokemon.evsDefense, pokemon.evsSpatk, pokemon.evsSpdef,
                    pokemon.evsSpeed, pokemon.ivsHp, pokemon.ivsAttack, pokemon.ivsDefense, pokemon.ivsSpatk, pokemon.ivsSpdef, pokemon.ivsSpeed,
                    pokemon.image, weaknesses, resistances, immunities, pokemon.attack_base, pokemon.defense_base, pokemon.spatk_base, pokemon.spdef_base, pokemon.speed_base);                
                customPokemons.push(custompokemon); // Añadimos el pokemon a la lista de pokemons
                sessionStorage.setItem('customPokemons', JSON.stringify(customPokemons));                
                createCard(custompokemon.name, custompokemon.image, custompokemon.idCustomPokemon);
            }
        })
        .catch(error => console.error(error));
}

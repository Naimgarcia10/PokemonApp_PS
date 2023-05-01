/*
###############################################
#        Seccion: Visualizar Pokemon          #
###############################################
*/
function showPokemon() {
  const pokemonName = localStorage.getItem('pokemonName');
  const pokemonImage = localStorage.getItem('pokemonImage');
  const pokemonType1 = localStorage.getItem('pokemonType1');
  const pokemonType2 = localStorage.getItem('pokemonType2');
  const pokemonAbility1 = localStorage.getItem('pokemonAbility1');
  const pokemonAbility2 = localStorage.getItem('pokemonAbility2');
  const pokemonAbility3 = localStorage.getItem('pokemonAbility3');

  const pokemonDiv = document.getElementById('pokemon');

  const nameElement = document.createElement('h1');
  nameElement.textContent = pokemonName;
  nameElement.setAttribute('id', 'pokemon_name');
  pokemonDiv.appendChild(nameElement);

  const imageElement = document.createElement('img');
  imageElement.setAttribute('src', pokemonImage);
  imageElement.setAttribute('id', 'pokemon_image');
  pokemonDiv.appendChild(imageElement);

  const container = document.createElement('div');
  container.classList.add('pokemon_type_container');
  pokemonDiv.appendChild(container);

  const typeElement1 = document.createElement('img');
  typeElement1.setAttribute('src', pokemonType1);
  typeElement1.setAttribute('alt', pokemonType1);
  typeElement1.setAttribute('id', 'pokemon_type1');
  typeElement1.classList.add('pokemon_type_img');
  container.appendChild(typeElement1);

  

  if (pokemonType2 !== "undefined" && pokemonType2 !== null) {
    const typeElement2 = document.createElement('img');
    typeElement2.setAttribute('src', pokemonType2);
    typeElement2.setAttribute('alt', pokemonType2);
    typeElement2.setAttribute('id', 'pokemon_type2');
    typeElement2.classList.add('pokemon_type_img');
    container.appendChild(typeElement2);
  }

  console.log('pokemonAbility2:', pokemonAbility2);
  console.log('pokemonAbility3:', pokemonAbility3);

  if (pokemonAbility1) {
    const abilitiesElement = document.createElement('h2');
    let abilitiesText = pokemonAbility1;
  
    if (pokemonAbility2 !== "undefined" && pokemonAbility2 !== null) {
      abilitiesText += '<br>' + pokemonAbility2;
    }
  
    if (pokemonAbility3 !== "undefined" && pokemonAbility3 !== null) {
      abilitiesText += '<br>' + pokemonAbility3;
    }
  
    abilitiesElement.innerHTML = abilitiesText;
    abilitiesElement.setAttribute('id', 'pokemon_abilities');
    pokemonDiv.appendChild(abilitiesElement);
  }
  
  
  
}
  
  /*
###############################################
#      Seccion: Visualizar Estadisticas       #
###############################################
*/
  
function showStats() {
    const pokemonHp = localStorage.getItem('pokemonHp');
    const pokemonAttack = localStorage.getItem('pokemonAttack');
    const pokemonDefense = localStorage.getItem('pokemonDefense');
    const pokemonSpatk = localStorage.getItem('pokemonSpatk');
    const pokemonSpdef = localStorage.getItem('pokemonSpdef');
    const pokemonSpeed = localStorage.getItem('pokemonSpeed');
  
    const statsDiv = document.getElementById('stats');
  
    const statNames = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'];
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

  /*
###############################################
#       Seccion: Visualizar Movimientos       #
###############################################
*/

  function showMoves() {
    const pokemonMoves = JSON.parse(localStorage.getItem('pokemonMoves'));
  
    const movesTableBody = document.getElementById("movesTableBody");
  
    pokemonMoves.forEach(move => {
      const row = document.createElement("tr");
  
      const nameCell = document.createElement("td");
      nameCell.textContent = move.name;
      row.appendChild(nameCell);
  
      const typeCell = document.createElement("td");
      const typeImg = document.createElement("img");
      typeImg.setAttribute('id', 'type_img');
      typeImg.src = move.type;
      typeCell.appendChild(typeImg);
      row.appendChild(typeCell);
  
      const classCell = document.createElement("td");
      const classImg = document.createElement("img");
      classImg.setAttribute('id', 'class_img');
      classImg.src = move.category;
      classCell.appendChild(classImg);
      row.appendChild(classCell);
  
      movesTableBody.appendChild(row);
    });

  }

    /*
###############################################
#      Seccion: Visualizar Debilidades        #
###############################################
*/
  
function showWeaknesses() {
  const pokemonWeaknesses = JSON.parse(localStorage.getItem('pokemonWeaknesses'));
  const weaknessesDiv = document.getElementById('weaknesses');


  // Crea un elemento para cada debilidad
  const createImageElement = (src) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Tipo de Pokémon';
    img.classList.add('pokemon-type-img');
    return img;
  };

  // Agrega las debilidades al div correspondiente
  const addWeaknesses = (multiplier, weaknesses) => {
    const multiplierTitles = {
      'x4': 'Very weak against',
      'x2': 'Weak against',
      'x1medio': 'Resistant to',
      'x1cuarto': 'Very resistant to',
      'x0': 'Immune against'
    };

    const header = document.createElement('h3');
    const headerSpan = document.createElement('span');
    headerSpan.innerText = `${multiplierTitles[multiplier]}`;
    headerSpan.id = `weakness-title-${multiplier}`;
    header.appendChild(headerSpan);
    weaknessesDiv.appendChild(header);

    if (weaknesses.length > 0) {
      for (const weakness of weaknesses) {
        weaknessesDiv.appendChild(createImageElement(weakness));
      }
    } else {
      const noWeaknesses = document.createElement('h3');
      noWeaknesses.innerText = 'Nothing';
      weaknessesDiv.appendChild(noWeaknesses);
    }
  };

  addWeaknesses('x4', pokemonWeaknesses.x4);
  addWeaknesses('x2', pokemonWeaknesses.x2);
  addWeaknesses('x1medio', pokemonWeaknesses.x1medio);
  addWeaknesses('x1cuarto', pokemonWeaknesses.x1cuarto);
  addWeaknesses('x0', pokemonWeaknesses.x0);
}





  
  // Ejecutar la función cuando la página se cargue
  window.addEventListener('DOMContentLoaded', showStats);
  window.addEventListener('DOMContentLoaded', showPokemon);
  window.addEventListener('DOMContentLoaded', showMoves);
  window.addEventListener('DOMContentLoaded', showWeaknesses);
  
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
  
    const typeElement = document.createElement('p');
    typeElement.textContent = `${pokemonType1}${pokemonType2 ? ', ' + pokemonType2 : ''}`;
    typeElement.setAttribute('id', 'pokemon_type');
    pokemonDiv.appendChild(typeElement);
  
    const abilitiesElement = document.createElement('p');
  abilitiesElement.innerHTML = `${pokemonAbility1}${pokemonAbility2 ? '<br>' + pokemonAbility2 : ''}${pokemonAbility3 ? '<br>' + pokemonAbility3 : ''}`;
  abilitiesElement.setAttribute('id', 'pokemon_abilities');
  pokemonDiv.appendChild(abilitiesElement);
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
  
  // Ejecutar la función cuando la página se cargue
  window.addEventListener('DOMContentLoaded', showStats);
  
  // Ejecutar la función cuando la página se cargue
  window.addEventListener('DOMContentLoaded', showPokemon);
  
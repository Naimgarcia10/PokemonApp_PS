const input = document.getElementById('buscador');

async function searchPokemon() {
  const searchTerm = input.value;
  const valorInputCodificado = encodeURIComponent(searchTerm);
  const url = `http://localhost:8080/getPokemon/${valorInputCodificado}`;

  

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.length > 0) {
      /*Propiedades Pokemon */
      const pokemonName = data[0].name;
      const pokemonImage = data[0].image;
      const pokemonType1 = data[0].type1;
      const pokemonType2 = data[0].type2;
      const pokemonAbility1 = data[0].ability1;
      const pokemonAbility2 = data[0].ability2;
      const pokemonAbility3 = data[0].ability3;

      /*estadisticas*/ 
      const pokemonHp = data[0].hp_base;
      const pokemonAttack = data[0].attack_base;
      const pokemonDefense = data[0].defense_base;
      const pokemonSpatk = data[0].spatk_base;
      const pokemonSpdef = data[0].spdef_base;
      const pokemonSpeed = data[0].speed_base;

      /*Movimientos*/
      const pokemonMoves = data[0].pokemonMoves;

      /*Debilidades*/
      const pokemonWeaknesses = data[0].pokemonWeaknesses;

      /*Estrategias*/
      const pokemonStrategies = data[0].pokemonStrategies;

      /*Propiedades Pokemon */
      localStorage.setItem('pokemonName', pokemonName);
      localStorage.setItem('pokemonImage', pokemonImage);
      localStorage.setItem('pokemonType1', pokemonType1);
      localStorage.setItem('pokemonType2', pokemonType2);
      localStorage.setItem('pokemonAbility1', pokemonAbility1);
      localStorage.setItem('pokemonAbility2', pokemonAbility2);
      localStorage.setItem('pokemonAbility3', pokemonAbility3);
      /*estadisticas*/ 
      localStorage.setItem('pokemonHp', pokemonHp);
      localStorage.setItem('pokemonAttack', pokemonAttack);
      localStorage.setItem('pokemonDefense', pokemonDefense);
      localStorage.setItem('pokemonSpatk', pokemonSpatk);
      localStorage.setItem('pokemonSpdef', pokemonSpdef);
      localStorage.setItem('pokemonSpeed', pokemonSpeed);

      /*Movimientos*/
      localStorage.setItem('pokemonMoves', JSON.stringify(pokemonMoves));

      /*Debilidades*/
      localStorage.setItem('pokemonWeaknesses', JSON.stringify(pokemonWeaknesses));

      /*Estrategias*/
      localStorage.setItem('pokemonStrategies', JSON.stringify(pokemonStrategies));

      

      // Redirigir a la página pokemon.html
      window.location.href = 'pokemon.html';

    } else {
      console.error('No se encontró el Pokémon');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}



input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    if (buscador.value.trim() === "") {
        alert("No se ha introducido ningún Pokémon.");
    }
    else{searchPokemon();}
  }
});
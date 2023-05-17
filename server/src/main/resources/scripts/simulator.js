import{ DB_HOST, DB_PORT } from "./config.js";
import { Canvas } from "./classes/canvas.js";
import { AttackButton } from "./classes/attackbutton.js";
import { Pokemon } from "./classes/pokemon.js";
import { CanvasImage } from "./classes/canvasimage.js";
import { Type } from "./classes/type.js";

var canvas;
var pokemon1, pokemon2;
var pokemon1Image, pokemon2Image;
var button1Image, button2Image, button3Image, button4Image;
var mensajeTexto;

document.addEventListener("DOMContentLoaded", async function() {
  canvas = new Canvas(document.getElementById("canvasSimulator"));    
  dibujarFondo()
  dibujarRectanguloPrincipal();    
  document.querySelector("#buttonSimulator").addEventListener("click", async function(){
      // comprobamos que los buscadores 1 y 2 no estén vacíos y usamos reportValidity para que salte el mensaje de error
      let pokemon1Text = document.querySelector("#buscador1").value;      
      let pokemon2Text = document.querySelector("#buscador2").value;
      if(pokemon1Text == ""){
        document.querySelector("#buscador1").reportValidity();
        return;
      }
      if(pokemon2Text == ""){
        document.querySelector("#buscador2").reportValidity();
        return;
      }
      pokemon1 = await getPokemon(pokemon1Text);
      if(pokemon1 == null){
        document.querySelector("#buscador1").setCustomValidity("No se ha encontrado el Pokémon");
        document.querySelector("#buscador1").reportValidity();
        return;
      }
      pokemon2 = await getPokemon(pokemon2Text);
      if(pokemon2 == null){
        document.querySelector("#buscador2").setCustomValidity("No se ha encontrado el Pokémon");
        document.querySelector("#buscador2").reportValidity();
        return;
      }
      await empezarCombate(); 
  });    
});

async function empezarCombate(){
  document.querySelector("#buttonSimulator").disabled = true;
  await cargarPokemons();
  await cargarBotonesAtaques();
  dibujarPokemon(pokemon2Image);
  playSound("../../" + pokemon2.cry);
  await delay(500);
  dibujarInfoPokemon(pokemon1, pokemon1Image, 1);
  dibujarInfoPokemon(pokemon2, pokemon2Image, -1);    
  dibujarAtaques();    
  //dibujarMensajeTexto();
  canvas.registerMouseEvents();
  canvas.canvas.addEventListener("buttonClicked", async function(event){        
    canvas.unregisterMouseEvents();                
    const button = event.detail.button;
    const movement = pokemon1.movements.find(movement => movement.name === button.texto);            
    if(movement.currentPP == 0){
      mensajeTexto = "¡No quedan PP para ese movimiento!";
      dibujarMensajeTexto();
      await delay(1200);
      dibujarTodoSalvoMensajeTexto();
      canvas.registerMouseEvents();
      return;
    }
    const randomMovement = pokemon2.movements.filter(movement => movement.currentPP > 0)[Math.floor(Math.random() * pokemon2.movements.filter(movement => movement.currentPP > 0).length)];
    if (pokemon2.speed > pokemon1.speed) {        
      if (await performAttack(pokemon2, pokemon1, randomMovement)) {
        return;
      }    
      if (await performAttack(pokemon1, pokemon2, movement)) {
        return;
      }
    } else {
        if (await performAttack(pokemon1, pokemon2, movement)) {
          return;
        }                
        if (await performAttack(pokemon2, pokemon1, randomMovement)) {
          return;
        }
      canvas.registerMouseEvents();
      }
  });
}

const performAttack = async (attacker, defender, movement) => {
  await animateAttack(attacker, defender, movement);
  if (defender.currentHP === 0) {
    await declareWinner(attacker, defender);
    finalizarCombate();
    if (attacker === pokemon1) {
      playSound("../../audio/simulator/battle_victory.mp3");
    }
    return true;
  }
  return false;
};

async function finalizarCombate(){
  document.querySelector("#buttonSimulator").disabled = true;
}

async function declareWinner(winnerPokemon, loserPokemon){
  mensajeTexto = loserPokemon.name + " se debilitó...";
  dibujarTodoSalvoAtaques();
  await delay(500);
  mensajeTexto = "¡" + winnerPokemon.name + " ganó la batalla!";
  dibujarTodoSalvoAtaques();
  await delay(1500);
  return;
}

async function animateAttack(pokemonAttacker, pokemonReceiver, movement){
  const imageAttacker = (pokemonAttacker == pokemon1) ? pokemon1Image : pokemon2Image;
  const imageReceiver = (pokemonReceiver == pokemon1) ? pokemon1Image : pokemon2Image;
  mensajeTexto = "¡" + pokemonAttacker.name + " usó " + movement.name + "!";
  dibujarTodoSalvoAtaques();
  await animatePokemon(imageAttacker, imageReceiver, imageReceiver.x, imageReceiver.y, 500);            
  let resultado = pokemonAttacker.attackPokemon(pokemonReceiver, movement);      
  dibujarInfoPokemon(pokemonReceiver, imageReceiver, 1);
  switch(resultado.typeEffectivity){
    case 2:
      playSound("../../audio/simulator/super_effective.wav");
      mensajeTexto = "¡Es super efectivo!";
      break;
    case 1:
      playSound("../../audio/simulator/normal_hit.wav");
      mensajeTexto = "";         
      break;
    case 0.5:
      playSound("../../audio/simulator/not_effective.wav");
      mensajeTexto = "No es muy efectivo...";
      break;
    case 0:
      mensajeTexto = "No afecta a " + pokemon2.name + "...";
      break;
    default:
      mensajeTexto = "Pero falló..."
      break;
  }            
  if(mensajeTexto != ""){             
    dibujarMensajeTexto();
    await delay(500);
  }
  await delay(200);
  await animatePokemon(imageAttacker, imageReceiver, imageAttacker.originalX, imageAttacker.originalY, 500);   
  dibujarTodoSalvoMensajeTexto();
}

async function comprobarPokemonDebilitado(pokemon){
  
}

async function cargarPokemons(){
    let fixedHeight = 200;    
    let fixedWidth = 200;       
    pokemon1Image = new CanvasImage(50, (canvas.height - fixedHeight) - 150, fixedWidth, fixedHeight, pokemon1.image);
    await canvas.loadImage(pokemon1Image);
    dibujarPokemon(pokemon1Image);
    playSound("../../" + pokemon1.cry);
    await delay(500);    
    pokemon2Image = new CanvasImage(canvas.width - fixedWidth, 0, fixedWidth, fixedHeight, pokemon2.image);
    await canvas.loadImage(pokemon2Image);
}

async function cargarBotonesAtaques(){
  button1Image = new CanvasImage(0, 0, 0, 0, pokemon1.movements[0].type.picture);
  button2Image = new CanvasImage(0, 0, 0, 0, pokemon1.movements[1].type.picture);
  button3Image = new CanvasImage(0, 0, 0, 0, pokemon1.movements[2].type.picture);
  button4Image = new CanvasImage(0, 0, 0, 0, pokemon1.movements[3].type.picture);
  await canvas.loadImage(button1Image, true);
  await canvas.loadImage(button2Image, true);
  await canvas.loadImage(button3Image, true);
  await canvas.loadImage(button4Image, true);
}

async function getPokemon(name){
    const response = await fetch(`http://${DB_HOST}:${DB_PORT}/getPokemon/${name}`);
    if (!response.ok) {
        throw new Error("Error al cargar los datos de la API");
    }
    const pokemonJson = await response.json();
    if(pokemonJson.length == 0) return null;
    const type1Json = await getType(pokemonJson[0].type1.name);       
    const type1 = new Type(type1Json[0].type_name, type1Json[0].type_picture, type1Json[0].doubleDamageTo, type1Json[0].doubleDamageFrom,
      type1Json[0].halfDamageTo, type1Json[0].halfDamageFrom, type1Json[0].noDamageTo, type1Json[0].noDamageFrom)  
    let type2 = null;        
    if(pokemonJson[0].type2 != null){
      const type2Json = await getType(pokemonJson[0].type2.name);    
      type2 = new Type(type2Json[0].type_name, type2Json[0].type_picture, type2Json[0].doubleDamageTo, type2Json[0].doubleDamageFrom,
        type2Json[0].halfDamageTo, type2Json[0].halfDamageFrom, type2Json[0].noDamageTo, type2Json[0].noDamageFrom);
    }    
    const pokemon = new Pokemon(pokemonJson[0].name, type1, type2, pokemonJson[0].hp_base, pokemonJson[0].attack_base, 
      pokemonJson[0].defense_base, pokemonJson[0].spatk_base, pokemonJson[0].spdef_base, 
      pokemonJson[0].speed_base, pokemonJson[0].image, pokemonJson[0].cry, pokemonJson[0].pokemonMoves);    
    // filtramos los movimientos que no son de tipo daño
    pokemon.movements = pokemon.movements.filter(movement => movement.type.name != "status");
    // randomizamos los movimientos
    pokemon.movements.sort(() => Math.random() - 0.5);
    for(let i=0;i<4;i++){
      const typeMovementJSON = await getType(pokemon.movements[i].type.name);
      pokemon.movements[i].type = new Type(typeMovementJSON[0].type_name, typeMovementJSON[0].type_picture, typeMovementJSON[0].doubleDamageTo, 
        typeMovementJSON[0].doubleDamageFrom, typeMovementJSON[0].halfDamageTo, typeMovementJSON[0].halfDamageFrom, typeMovementJSON[0].noDamageTo, typeMovementJSON[0].noDamageFrom);
      pokemon.movements[i].currentPP = pokemon.movements[i].pp;
    }       
    return pokemon;
}

async function getType(name){
    const response = await fetch(`http://${DB_HOST}:${DB_PORT}/getType/${name}`);
    if (!response.ok) {
        throw new Error("Error al cargar los datos de la API");
    }
    const typeJson = await response.json();        
    return typeJson;
}

function dibujarTodoSalvoAtaques(){
  canvas.clearCanvas();
  dibujarFondo()
  dibujarRectanguloPrincipal();
  dibujarPokemon(pokemon1Image);
  dibujarPokemon(pokemon2Image);    
  dibujarInfoPokemon(pokemon1, pokemon1Image, 1);
  dibujarInfoPokemon(pokemon2, pokemon2Image, -1);
  dibujarMensajeTexto();
}

function dibujarTodoSalvoMensajeTexto(){
  canvas.clearCanvas();
  dibujarFondo();
  dibujarRectanguloPrincipal();
  dibujarPokemon(pokemon1Image);
  dibujarPokemon(pokemon2Image);
  dibujarInfoPokemon(pokemon1, pokemon1Image, 1);
  dibujarInfoPokemon(pokemon2, pokemon2Image, -1);
  dibujarAtaques();
}

function dibujarPokemon(pokemonImage){
  canvas.context.drawImage(pokemonImage.imageObject, pokemonImage.x, pokemonImage.y, pokemonImage.width, pokemonImage.height);
}

function dibujarFondo(){
  canvas.context.fillStyle = "lightblue";
  canvas.context.fillRect(0,0,canvas.width,canvas.height);
}

function dibujarInfoPokemon(pokemon, pokemonImage, signo){       

  let extraSuma = 0;
  if(signo == -1) extraSuma = 200; 
  const barraVidaX = pokemonImage.originalX + (200 + extraSuma) * signo;
  const barraVidaY = pokemonImage.originalY + 80;
  const barraVidaHeight = 25;
  const barraVidaWidth = 320;
  
  // Dibujar el fondo de la barra de vida (rojo)
  canvas.context.fillStyle = "grey";
  canvas.context.fillRect(barraVidaX, barraVidaY, barraVidaWidth, barraVidaHeight);

  const vidaMaxima = pokemon.hp;
  const vidaActual = pokemon.currentHP;  
  const vidaActualHeight = barraVidaHeight;
  const vidaActualWidth = (vidaActual / vidaMaxima) * barraVidaWidth;
  
  // Dibujar la vida actual (verde)
  canvas.context.fillStyle = "green";
  canvas.context.fillRect(barraVidaX, barraVidaY, vidaActualWidth, vidaActualHeight);
 
  // Dibujar texto con los puntos de vida debajo y centrado
  canvas.context.fillStyle = "black";
  canvas.context.font = "20px Arial";
  canvas.context.textAlign = "center";
  canvas.context.textBaseline = "alphabetic";
  canvas.context.fillText(`${vidaActual}/${vidaMaxima}`, barraVidaX + barraVidaWidth / 2, barraVidaY + barraVidaHeight + 20);
  canvas.context.textAlign = "start";
  

  // Dibujar el nombre del Pokémon
  canvas.context.fillStyle = "black";
  canvas.context.font = "20px Arial";
  canvas.context.fillText(pokemon.name, barraVidaX , barraVidaY - 10);

  // Dibujar el nivel del pokémon
  canvas.context.fillStyle = "black";
  canvas.context.font = "20px Arial";
  canvas.context.fillText(`Nivel: ${pokemon.level}`, barraVidaX + 230, barraVidaY - 10);
}

function dibujarRectanguloPrincipal(){
    canvas.context.fillStyle = "grey";
    canvas.context.strokeStyle = "black";
    canvas.context.lineWidth = 2;    
    canvas.context.fillRect(0, 350, canvas.width, canvas.height - 350);    
}


function dibujarMensajeTexto(){
  canvas.context.fillStyle = "white";
  canvas.context.fillRect(0+10, 350+10, canvas.width-20, canvas.height-350-20);
  canvas.context.fillStyle = "black";
  canvas.context.font = "40px Arial";
  canvas.context.textAlign = "start";
  canvas.context.textBaseline = "alphabetic";
  canvas.context.fillText(mensajeTexto, 0+30, 350+60);
}

async function animatePokemon(pokemonMoving, pokemonStatic, finalX, finalY, duration) {
  return new Promise( resolve => {
    // Guardar la posición original de Pokemon1
    const originalX = pokemonMoving.x;
    const originalY = pokemonMoving.y;    

    // Animación de movimiento de Pokemon1 hacia Pokemon2
    let currentFrame = 0; // Fotograma actual de la animación    
    const frameRate = 60;
    const totalFrames = Math.ceil(duration / (1000 / frameRate)); // Número total de fotogramas de la animación  
    animate();  

    async function animate(){      
      let llegoAlDestino = ( pokemonMoving.x >= finalX && pokemonMoving.y >= finalY);
      if (llegoAlDestino) {
        resolve();  
        return;
      }            
      const progress = currentFrame / totalFrames; // Progreso de la animación (entre 0 y 1). Esta variable es la que se utiliza para controlar la duración de la animación
      pokemonMoving.x = originalX + (finalX - originalX) * progress;
      pokemonMoving.y = originalY + (finalY - originalY) * progress;    
      canvas.clearCanvas();
      dibujarFondo();
      dibujarRectanguloPrincipal();
      dibujarMensajeTexto();
      dibujarInfoPokemon(pokemon1, pokemon1Image, 1);
      dibujarInfoPokemon(pokemon2, pokemon2Image, -1);
      dibujarPokemon(pokemonStatic);
      dibujarPokemon(pokemonMoving);
      currentFrame++;
      requestAnimationFrame(animate);
    }
  });  
}

function playSound(soundPath) {
  console.log(soundPath);
  const sound = new Audio(soundPath);
  sound.play();
}

function dibujarAtaques(){  
    const button1 = new AttackButton(200, 360, 150, 50, "white", "20px Verdana", pokemon1.movements[0], button1Image);  
    const button2 = new AttackButton(400, 360, 150, 50, "white", "20px Verdana", pokemon1.movements[1], button2Image);
    const button3 = new AttackButton(200, 430, 150, 50, "white", "20px Verdana", pokemon1.movements[2], button3Image);
    const button4 = new AttackButton(400, 430, 150, 50, "white", "20px Verdana", pokemon1.movements[3], button4Image);  
    canvas.dibujarBoton(button1);
    canvas.dibujarBoton(button2);
    canvas.dibujarBoton(button3);
    canvas.dibujarBoton(button4);
}

// Función de retraso (delay) utilizando promesas
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
  
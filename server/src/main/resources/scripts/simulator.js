import{ DB_HOST, DB_PORT } from "./config.js";
import { Canvas } from "./classes/canvas.js";
import { AttackButton } from "./classes/attackbutton.js";
import { Pokemon } from "./classes/pokemon.js";
import { CanvasImage } from "./classes/canvasimage.js";
import { Type } from "./classes/type.js";

var canvas;
var pokemon1, pokemon2;
var pokemon1Image, pokemon2Image;
var backgroundImage;
var button1Image, button2Image, button3Image, button4Image;
var mensajeTexto;
var battleMusic = new Audio("../../audio/simulator/battle_theme.mp3");

document.addEventListener("DOMContentLoaded", async function() {
  canvas = new Canvas(document.getElementById("canvasSimulator"));    
  await cargarFondo();
  dibujarFondo();  
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
  battleMusic.volume = 0.3;
  battleMusic.play();
  battleMusic.loop = true;
  await cargarPokemons();
  await cargarBotonesAtaques();
  await delay(1000);
  dibujarPokemon(pokemon1Image);
  await playSound("../../" + pokemon1.cry);
  dibujarPokemon(pokemon2Image);
  await playSound("../../" + pokemon2.cry);

  await delay(500);
  dibujarInfoPokemon(pokemon1, pokemon1Image);
  dibujarInfoPokemon(pokemon2, pokemon2Image);    
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
      }
      canvas.registerMouseEvents(); 
  });
}

async function finalizarCombate(){
  document.querySelector("#buttonSimulator").disabled = true;
}

async function declareWinner(winnerPokemon, loserPokemon){
  mensajeTexto = loserPokemon.name + " se debilitó...";
  dibujarTodoSalvoAtaques(winnerPokemon === pokemon1);
  battleMusic.pause();
  await delay(1200);
  mensajeTexto = "¡" + winnerPokemon.name + " ganó la batalla!";
  dibujarTodoSalvoAtaques(winnerPokemon === pokemon1);
  if(winnerPokemon == pokemon1){
    playSound("../../audio/simulator/battle_victory.mp3");
  }
  await delay(1500);
  return;
}

async function performAttack(pokemonAttacker, pokemonReceiver, movement){
  const imageAttacker = (pokemonAttacker == pokemon1) ? pokemon1Image : pokemon2Image;
  const imageReceiver = (pokemonReceiver == pokemon1) ? pokemon1Image : pokemon2Image;
  mensajeTexto = "¡" + pokemonAttacker.name + " usó " + movement.name + "!";
  dibujarTodoSalvoAtaques(pokemonAttacker === pokemon1);
  await animatePokemon(imageAttacker, imageReceiver, imageReceiver.x, imageReceiver.y, 500);
  let resultado = pokemonAttacker.attackPokemon(pokemonReceiver, movement);      
  dibujarTodoSalvoAtaques(pokemonAttacker === pokemon1);
  switch(resultado.typeEffectivity){
    case 2:
      await playSound("../../audio/simulator/super_effective.wav");
      mensajeTexto = "¡Es super efectivo!";
      break;
    case 1:
      await playSound("../../audio/simulator/normal_hit.wav");
      mensajeTexto = "";         
      break;
    case 0.5:
      await playSound("../../audio/simulator/not_effective.wav");
      mensajeTexto = "No es muy efectivo...";
      break;
    case 0:
      mensajeTexto = "No afecta a " + pokemon2.name + "...";
      break;
    default:
      mensajeTexto = "Pero falló..."
      break;
  }   
  if(pokemonReceiver.currentHP == 0){
    await declareWinner(pokemonAttacker, pokemonReceiver);       
    return true;
  }  
  if(mensajeTexto != ""){             
    dibujarMensajeTexto();
    await delay(500);
  }
  await animatePokemon(imageAttacker, imageReceiver, imageAttacker.originalX, imageAttacker.originalY, 500);   
  dibujarTodoSalvoMensajeTexto();
  return false;
}

async function cargarFondo(){
  backgroundImage = new CanvasImage(0, 0, canvas.width, canvas.height, "../../images/simulator/battleBackground.jpg");
  await canvas.loadImage(backgroundImage);
}

async function cargarPokemons(){
    let fixedHeight = 200;    
    let fixedWidth = 200;       
    pokemon1Image = new CanvasImage(150, (canvas.height - fixedHeight) - 150, fixedWidth, fixedHeight, pokemon1.image);
    await canvas.loadImage(pokemon1Image);  
    pokemon2Image = new CanvasImage(canvas.width - 320, 40, fixedWidth, fixedHeight, pokemon2.image);
    await canvas.loadImage(pokemon2Image);
}

async function cargarBotonesAtaques(){

  button1Image = new CanvasImage(0, 0, 0, 0, pokemon1.movements[0].type.picture);
  await canvas.loadImage(button1Image, true);
  if(pokemon1.movements.length == 1) return; // si solo tiene un movimiento, no cargamos los demás botones
  button2Image = new CanvasImage(0, 0, 0, 0, pokemon1.movements[1].type.picture);
  await canvas.loadImage(button2Image, true);
  if(pokemon1.movements.length == 2) return; // si solo tiene dos movimientos, no cargamos los demás botones
  button3Image = new CanvasImage(0, 0, 0, 0, pokemon1.movements[2].type.picture);
  await canvas.loadImage(button3Image, true);
  if(pokemon1.movements.length == 3) return; // si solo tiene tres movimientos, no cargamos el último botón
  button4Image = new CanvasImage(0, 0, 0, 0, pokemon1.movements[3].type.picture);
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
    // filtramos los movimientos que no son de tipo daño
    pokemonJson[0].pokemonMoves = pokemonJson[0].pokemonMoves.filter(movement => movement.category != "/images/movements/status.png");
    const pokemon = new Pokemon(pokemonJson[0].name, type1, type2, pokemonJson[0].hp_base, pokemonJson[0].attack_base, 
      pokemonJson[0].defense_base, pokemonJson[0].spatk_base, pokemonJson[0].spdef_base, 
      pokemonJson[0].speed_base, pokemonJson[0].image, pokemonJson[0].cry, pokemonJson[0].pokemonMoves);    
    // filtramos los movimientos que no son de tipo daño
    pokemon.movements = pokemon.movements.filter(movement => movement.type.name != "status");
    // randomizamos los movimientos
    pokemon.movements.sort(() => Math.random() - 0.5);
    for(let i=0;i<pokemon.movements.length;i++){
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

function dibujarTodoSalvoAtaques(pokemon1Arriba = true){
  canvas.clearCanvas();
  dibujarFondo()
  dibujarRectanguloPrincipal();
  if(pokemon1Arriba){
    dibujarPokemon(pokemon2Image);
    dibujarPokemon(pokemon1Image);
  } else{
    dibujarPokemon(pokemon1Image);
    dibujarPokemon(pokemon2Image);
  }  
  dibujarInfoPokemon(pokemon1, pokemon1Image);
  dibujarInfoPokemon(pokemon2, pokemon2Image);
  dibujarMensajeTexto();
}

function dibujarTodoSalvoMensajeTexto(){
  canvas.clearCanvas();
  dibujarFondo();
  dibujarRectanguloPrincipal();
  dibujarPokemon(pokemon1Image);
  dibujarPokemon(pokemon2Image);
  dibujarInfoPokemon(pokemon1, pokemon1Image);
  dibujarInfoPokemon(pokemon2, pokemon2Image);
  dibujarAtaques();
}

function dibujarPokemon(pokemonImage){
  canvas.context.drawImage(pokemonImage.imageObject, pokemonImage.x, pokemonImage.y, pokemonImage.width, pokemonImage.height);
}

function dibujarFondo(){
  /*canvas.context.fillStyle = "lightblue";
  canvas.context.fillRect(0,0,canvas.width,canvas.height);*/
  canvas.context.drawImage(backgroundImage.imageObject, 0, 0, canvas.width, canvas.height);
}

function dibujarInfoPokemon(pokemon, pokemonImage){       

  let restaX = 0;
  let restaY = 0;
  let signo = 1;
  if(pokemonImage == pokemon2Image){
    signo = -1;
  }
  if(signo == -1){
    restaX = -405;
    restaY = -179;
  }
  const barraVidaX = 576 + restaX;
  const barraVidaY = 280 + restaY;
  const barraVidaHeight = 13;
  const barraVidaWidth = 169;
  //return;  
  
  // Dibujar el fondo de la barra de vida (rojo)  
  canvas.dibujarOvalo(barraVidaX, barraVidaY, barraVidaWidth, barraVidaHeight, 6, "grey");

  const vidaMaxima = pokemon.hp;
  const vidaActual = pokemon.currentHP;  
  const vidaActualHeight = barraVidaHeight;
  const vidaActualWidth = (vidaActual / vidaMaxima) * barraVidaWidth;
  
  // Dibujar la vida actual (verde)
  canvas.dibujarOvalo(barraVidaX, barraVidaY, vidaActualWidth, barraVidaHeight, 6, "green");
 
  // Dibujar texto con los puntos de vida debajo y centrado
  if(signo != -1){
    canvas.context.fillStyle = "black";
      canvas.context.font = "20px Arial";
      canvas.context.textAlign = "center";
      canvas.context.textBaseline = "alphabetic";
      canvas.context.fillText(`${vidaActual}/${vidaMaxima}`, barraVidaX + barraVidaWidth / 2, barraVidaY + barraVidaHeight + 25);
      canvas.context.textAlign = "start";
  }    

  // Dibujar el nombre del Pokémon
  canvas.context.fillStyle = "black";
  canvas.context.font = "20px Arial";
  canvas.context.fillText(pokemon.name, barraVidaX - 50, barraVidaY - 13);

  // Dibujar el nivel del pokémon
  canvas.context.fillStyle = "black";
  canvas.context.font = "20px Arial";
  canvas.context.fillText(`${pokemon.level}`, barraVidaX + 128, barraVidaY - 13);
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
      dibujarInfoPokemon(pokemon1, pokemon1Image);
      dibujarInfoPokemon(pokemon2, pokemon2Image);
      dibujarPokemon(pokemonStatic);
      dibujarPokemon(pokemonMoving);
      currentFrame++;
      requestAnimationFrame(animate);
    }
  });  
}

async function playSound(soundPath) {
  return new Promise((resolve, reject) => {
    const sound = new Audio(soundPath);
    sound.addEventListener('ended', resolve);
    sound.addEventListener('error', reject);
    sound.play();
    return sound;
  });
}


function dibujarAtaques(){  
    const button1 = new AttackButton(200, 360, 150, 50, "white", "20px Verdana", pokemon1.movements[0], button1Image);
    canvas.dibujarBoton(button1);
    if(pokemon1.movements.length == 1) return; // si solo tiene un movimiento, no dibujamos los demás botones
    const button2 = new AttackButton(400, 360, 150, 50, "white", "20px Verdana", pokemon1.movements[1], button2Image);
    canvas.dibujarBoton(button2);
    if(pokemon1.movements.length == 2) return; // si solo tiene dos movimientos, no dibujamos los demás botones
    const button3 = new AttackButton(200, 430, 150, 50, "white", "20px Verdana", pokemon1.movements[2], button3Image);
    canvas.dibujarBoton(button3);
    if(pokemon1.movements.length == 3) return; // si solo tiene tres movimientos, no dibujamos el último botón
    const button4 = new AttackButton(400, 430, 150, 50, "white", "20px Verdana", pokemon1.movements[3], button4Image);  
    canvas.dibujarBoton(button4);
}

// Función de retraso (delay) utilizando promesas
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
  
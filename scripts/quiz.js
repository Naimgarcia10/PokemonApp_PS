// VARIABLES DEL PROGRAMA
var preguntas = [];
var respuestas_usuario;
var opciones_elementos = []
var indice;
const imagePath = "../images/";
const questionPath = "/questions/";
const blanco = "#FAEBD7";
const gris = "#778899";

fetch('../json/questions.json')
	.then(response => response.json())
	.then(data => {
		preguntas = data;  
        for(let i=0;i<preguntas.length;i++){
            preguntas[i].answers = preguntas[i].incorrectAnswers;
            preguntas[i].answers.push(preguntas[i].correctAnswer);
            randomizar_array(preguntas[i].answers);
        }
	})
	.catch(error => console.log(error));

document.addEventListener("DOMContentLoaded", function(){
    const start_button = document.querySelector(".cuadrado_quiz .start_button");
    start_button.addEventListener("click", empezar_quiz);
});

function empezar_quiz(){        
    respuestas_usuario = [];
    indice = 0;
    document.addEventListener("keydown", manejar_pulsaciones);
    ocultar_elementos();   
    mostrar_elementos();
    cargar_pregunta();
}

function finalizar_quiz(){
    let puntos = 0;
    for(let i=0;i<preguntas.length;i++){
        let opcion_correcta = preguntas[i].correctAnswer;
        let opcion_usuario = respuestas_usuario[i];
        puntos += (opcion_correcta === opcion_usuario);           
    }
    document.removeEventListener("keydown", manejar_pulsaciones);
    mostrar_nota(puntos);
}

function ocultar_elementos(){
    let cuadrado_quiz = document.querySelector(".cuadrado_quiz");
    for(let i=0;i<cuadrado_quiz.children.length;i++){
        cuadrado_quiz.children[i].textContent = "";        
    }   
    const start_button = document.querySelector(".cuadrado_quiz .start_button");
    start_button.style.display = "none";
    cuadrado_quiz.style.gridTemplateRows = "11rem 4rem 5rem";
}

function manejar_pulsaciones(event){
    let teclaPulsada = event.key;
    if(teclaPulsada === 'ArrowLeft') go_left();
    else if(teclaPulsada === 'ArrowRight') go_right();
    else if(teclaPulsada.length === 1){        
        let numero = parseInt(teclaPulsada);
        let es_numero = (numero != NaN);
        if(es_numero && numero <= opciones_elementos.length){
            marcar_opcion(opciones_elementos[numero-1])
        }
    }
}

function mostrar_elementos(){
    /* Crear flecha izquierda */
    let left_arrow = document.querySelector("#left_button");
    left_arrow.style.display = "inline-block";    
    left_arrow.addEventListener("click", go_left);

    /* Crear flecha derecha */
    let right_arrow = document.querySelector("#right_button");
    right_arrow.style.display = "inline-block";    
    right_arrow.addEventListener("click", go_right);       
}

function cargar_pregunta(){
    let enunciado = document.querySelector(".cuadrado_quiz .enunciado");
    enunciado.textContent = preguntas[indice]["question"];
    let imagen = document.querySelector(".cuadrado_quiz .imagen");       
    if(preguntas[indice]["image"] != null){
        imagen.src = imagePath + questionPath + preguntas[indice]["image"];
    } else{
        imagen.src = "";
    }
    borrar_opciones();
    let lista_opciones = preguntas[indice]["answers"].slice();           
    for(let i=0;i<lista_opciones.length;i++){
        añadir_opcion(lista_opciones[i], i+1);
    }
}

function randomizar_array(array){
    array.sort(() => Math.random() - 0.5);
}

function añadir_opcion(name, number){
    /* Crear radio button */
    let opt_element = document.createElement("button");
    opt_element.className = "option";
    opt_element.textContent = name;
    opt_element.id = "opcion" + number;

    /* ¿El usuario había marcado ya anteriormente una opción en esta pregunta? */    
    if(respuestas_usuario[indice] == name){
        opt_element.classList.add("marcada");
    }  

    /* Meter el radio button en el contenedor */
    let cuadrado_quiz = document.querySelector(".cuadrado_quiz");    
    cuadrado_quiz.appendChild(opt_element);      
    opciones_elementos.push(opt_element);

    /* Añadimos un event listener para cambiar el color cada vez que se pulsa uno */
    opt_element.addEventListener("click", function(){
        marcar_opcion(opt_element);
    });
}

function marcar_opcion(opt_element){
    if(opt_element.classList.contains("marcada")){            
        opt_element.classList.remove("marcada"); 
        respuestas_usuario[indice] = "";           
    } else{        
        // comprobamos que solo haya una opción marcada (por el momento las preguntas son de una sola opción)
        let options_list = document.querySelectorAll(".option");
        options_list.forEach(option => {
            option.classList.remove("marcada");
        })
        opt_element.classList.add("marcada");
        respuestas_usuario[indice] = opt_element.textContent;
    }
}

function borrar_opciones(){
    let options_list = document.querySelectorAll(".option");
    options_list.forEach(option => {
        option.remove();
    });    
    opciones_elementos = [];
}

function go_left(){
    if( (indice-1) < 0 ) return;
    indice -= 1;
    cargar_pregunta();
}

/* Se activa cuando pulsas el botón de ir hacia la derecha */
function go_right(){
    if( (indice+1) >= preguntas.length){
        finalizar_quiz();
        return;
    }        
    indice += 1;
    cargar_pregunta();
}

function mostrar_nota(puntos){
    borrar_opciones();
    let enunciado = document.querySelector(".enunciado");
    enunciado.innerHTML = "&nbsp;";
    enunciado.classList.add("hide");

    let left_arrow = document.querySelector("#left_button");
    left_arrow.style.display = "none";
    let right_arrow = document.querySelector("#right_button");
    right_arrow.style.display = "none";

    let cuadrado_quiz = document.querySelector(".cuadrado_quiz");
    let imagen = document.querySelector(".cuadrado_quiz .imagen");
    let description1 = cuadrado_quiz.querySelector("#quiz_description");
    description1.textContent = "TOTAL SCORE:";
    let subdescription = cuadrado_quiz.querySelector("#quiz_subdescription");
    subdescription.textContent = puntos + "/" + preguntas.length;    
    let description2 = cuadrado_quiz.querySelector("#quiz_description2");
    let numero_preguntas = preguntas.length;    

    let aprobado = (puntos >= (numero_preguntas / 2));
    if(aprobado){
        cuadrado_quiz.classList.add("aprobado");
        imagen.src = imagePath + "aprobado.png";
        description2.textContent = "You're a real Pokémon Master!";
    } else{
        cuadrado_quiz.classList.add("suspendido");        
        imagen.src = imagePath + "suspenso.png";
        description2.textContent = "Keep practicing!";
    }
    cuadrado_quiz.style.gridTemplateRows = "5rem 25rem 5rem";

    let reset_button = document.querySelector("#reset_button");
    reset_button.style.display = "inline-block";
    reset_button.addEventListener("click", function(){
        enunciado.classList.remove("hide");
        cuadrado_quiz.classList.remove("aprobado");
        cuadrado_quiz.classList.remove("suspendido");
        reset_button.style.display = "none";
        imagen.src = "";
        empezar_quiz();
    });
}

function shuffle(array){
    array.sort(() => Math.random() - 0.5);
}
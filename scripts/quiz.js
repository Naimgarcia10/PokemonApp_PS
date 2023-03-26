// VARIABLES DEL PROGRAMA
var preguntas = [];
var respuestas_usuario;
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
    mostrar_nota(puntos);
}

function ocultar_elementos(){
    let cuadrado_quiz = document.querySelector(".cuadrado_quiz");
    for(let i=0;i<cuadrado_quiz.children.length;i++){
        cuadrado_quiz.children[i].textContent = "";        
    }   
    const start_button = document.querySelector(".cuadrado_quiz .start_button");
    start_button.style.display = "none";
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
        añadir_opcion(lista_opciones[i], i);
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
    opt_element.id = number;

    /* ¿El usuario había marcado ya anteriormente una opción en esta pregunta? */    
    if(respuestas_usuario[indice] == name){
        opt_element.classList.add("marcada");
    }  

    /* Meter el radio button en el contenedor */
    let options_list = document.querySelector("#opciones");
    options_list = document.querySelector("#opciones");          
    options_list.appendChild(opt_element);      

    /* Añadimos un event listener para cambiar el color cada vez que se pulsa uno */
    opt_element.addEventListener("click", function(){    
        if(opt_element.classList.contains("marcada")){            
            opt_element.classList.remove("marcada"); 
            respuestas_usuario[indice] = "";           
        } else{
            // comprobamos que solo haya una opción marcada (por el momento las preguntas son de una sola opción)
            for(let i=0;i<options_list.children.length;i++){
                options_list.children[i].classList.remove("marcada");
            }
            opt_element.classList.add("marcada");
            respuestas_usuario[indice] = opt_element.textContent;
        }        
    })
}

function borrar_opciones(){
    let options_list = document.querySelector("#opciones");    
    options_list.innerHTML = "";
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
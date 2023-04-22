document.addEventListener("DOMContentLoaded", () => {
    //selecciona los elementos a cambiar
    let imagen = document.getElementById("imagen-tutorial");
    let texto = document.getElementById("texto-tutorial");

    fetch('http://localhost:8080/tutorial/' + 0)
        .then(response => {
            if (response.ok) {
                ultima_pagina_ok = contador_paginas;    //almaceno el valor las ultimas respuestas que fueron exitosa
                return response.json();
            }
        })
        .then(data => {

            //cargo los nuevos contenidos
            imagen.src = data.ruta_imagen;
            texto.textContent = data.texto;

        }).catch(error => {

            //en caso de error con el servidor, no aumento el contador
            console.log('Error en la petición:', error);
            contador_paginas = ultima_pagina_ok;

        });
});

//asocio las acciones a los elementos 
const flecha_derecha = document.getElementById("flecha_derecha");
const flecha_izquierda = document.getElementById("flecha_izquierda");
flecha_derecha.addEventListener("click", http_tutorial);
flecha_izquierda.addEventListener("click", http_tutorial);

//controlador de pagina seleccionada y rango de tutorial
let ultima_pagina_ok;
let contador_paginas = 0;
const tutorial_size = 36;

//funcion que se acciona con los eventos de las flechas del tutorial
function http_tutorial(event) {

    //registro del id del accionador
    let elementId = event.target.id;

    //si va para la derecha se suma el contador_paginas
    if (elementId == "flecha_derecha") {

        contador_paginas++;

    } else if (elementId == "flecha_izquierda") {   //si va para la izquierda se resta el contador_paginas

        contador_paginas--;

    } else {  //si no fue ninguna de las condiciones ha habiado un error de accionador

        return "error: evento no registrado";

    }

    if (contador_paginas > tutorial_size) {

        contador_paginas = 0;   //en caso de pedir la siguiente pagina y haber superado el tamaño, vuelves a la pagina 0

    } else if (contador_paginas < 0) {

        contador_paginas = tutorial_size;   //en caso de pedir la pagina menos 1, vuelves a la ultima pagina

    }

    //selecciona los elementos a cambiar
    let imagen = document.getElementById("imagen-tutorial");
    let texto = document.getElementById("texto-tutorial");

    //realizo la petición http, si el tutorial tiene 3 paginas, ira de 0 a 2
    fetch('http://localhost:8080/tutorial/' + contador_paginas)
        .then(response => {
            if (response.ok) {
                ultima_pagina_ok = contador_paginas;    //almaceno el valor las ultimas respuestas que fueron exitosa
                return response.json();
            }
        })
        .then(data => {
            // Agrega la clase fade-in a la imagen
            imagen.classList.remove('imagen');

            //cargo los nuevos contenidos
            imagen.src = data.ruta_imagen;

            // Agrega un listener de evento load a la imagen para esperar a que se cargue por completo antes de remover la clase fade-in
            imagen.addEventListener('load', () => {
                imagen.classList.add('imagen');
            });
            
            texto.textContent = data.texto;

        }).catch(error => {

            //en caso de error con el servidor, no aumento el contador
            console.log('Error en la petición:', error);
            contador_paginas = ultima_pagina_ok;

        });

}

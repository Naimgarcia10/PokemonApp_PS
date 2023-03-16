const flecha_derecha = document.getElementById("flecha_derecha");
const flecha_izquierda = document.getElementById("flecha_izquierda");
flecha_derecha.addEventListener("click", http_tutorial);
flecha_izquierda.addEventListener("click", http_tutorial);
var contador_paginas = 0;
const tutorial_size = 2;
function http_tutorial(event) {
    fetch('../json/tutorial.json')
        .then(response => response.json())
        .then(data => {
            try {
                var elementId = event.target.id;
                if (elementId == "flecha_derecha") {
                    contador_paginas++;
                    console.log("pasar a derecha");
                    var imagen = document.getElementById("imagen-tutorial");
                    var texto = document.getElementById("texto-tutorial");
                    imagen.src = data[contador_paginas].ruta_imagen;
                    texto.textContent = data[contador_paginas].texto;
                }

                if (elementId == "flecha_izquierda") {
                    console.log("pasar a izquierda");
                    contador_paginas--;
                    var imagen = document.getElementById("imagen-tutorial");
                    var texto = document.getElementById("texto-tutorial");
                    imagen.src = data[contador_paginas].ruta_imagen;
                    texto.textContent = data[contador_paginas].texto;
                }
            } catch (error) {
                if (elementId == "flecha_derecha"){
                    contador_paginas = 0;
                    imagen.src = data[contador_paginas].ruta_imagen;
                    texto.textContent = data[contador_paginas].texto;
                }
                if (elementId == "flecha_izquierda"){
                    contador_paginas = tutorial_size;
                    imagen.src = data[contador_paginas].ruta_imagen;
                    texto.textContent = data[contador_paginas].texto;
                }
            }

        })
}

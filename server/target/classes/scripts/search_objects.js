/*
#####################################################################
#     Seccion: Función que rellena la tabla a partir de un JSON     #
#####################################################################
*/

document.addEventListener("DOMContentLoaded", function() {
  fetch("http://localhost:8080/getItems")
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        let image = "<img src='" + data[i].icon + "'>";
        let fila = "<tr><td>" + data[i].name + "</td><td>" + image + "</td><td>" + data[i].description + "</td></tr>";
        document.querySelector("#tabla").insertAdjacentHTML("beforeend", fila);
      }
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
});




/*
##############################################
#        Seccion: Función de busqueda        #
##############################################
*/
// Obtener el campo de entrada y la lista
var buscador = document.getElementById('buscador');
var lista = document.querySelector('.lista table');

// Agregar un evento "input" al campo de entrada
buscador.addEventListener('input', function() {
  // Obtener el valor de búsqueda del campo de entrada
  var busqueda = this.value.toLowerCase();
  
  // Recorrer todas las filas de la tabla
  for (var i = 0; i < lista.rows.length; i++) {
    var fila = lista.rows[i];
    var palabra = fila.cells[0].textContent.toLowerCase();
    
    // Comprobar si la palabra coincide con la búsqueda
    if (palabra.indexOf(busqueda) !== -1) {
      // Si la palabra coincide, mostrar la fila
      fila.style.display = '';
    } else {
      // Si la palabra no coincide, ocultar la fila
      fila.style.display = 'none';
    }
  }
});

/*
##############################################
#      Seccion: Funcion Filtrado Indice      #
##############################################
*/
    function mostrarFilas(letra) {
        var tabla = document.getElementById("tabla");
        var filas = tabla.getElementsByTagName("tr");
        for (var i = 0; i < filas.length; i++) {
            var celda = filas[i].getElementsByTagName("td")[0];
            if (celda) {
                var textoCelda = celda.textContent || celda.innerText;
                if (textoCelda.charAt(0).toUpperCase() === letra.toUpperCase()) {
                    filas[i].style.display = "";
                } else {
                    filas[i].style.display = "none";
                }
            }
        }
    }

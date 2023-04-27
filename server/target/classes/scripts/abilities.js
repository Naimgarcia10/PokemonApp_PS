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

    function fetchPokemonMoves() {
        fetch("../json/abilities.json")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al cargar el archivo JSON");
            }
            return response.json();
          })
          .then((data) => {
            populateTable(data);
          })
          .catch((error) => {
            console.error("Error al cargar los datos de movimientos de Pokémon:", error);
          });
      }
      
      function populateTable(pokemonMoves) {
        const tableBody = document.getElementById("tabla-cuerpo");
      
        for (const move of pokemonMoves) {
          const row = document.createElement("tr");
      
          for (const key in move) {
            if (key !== "pokemon") {
              const cell = document.createElement("td");
              cell.textContent = move[key];
              row.appendChild(cell);
            }
          }
      
          // Agregar la última columna con el botón "Click here"
          const lastCell = document.createElement("td");
          const link = document.createElement("a");
          link.textContent = "Click here";
          link.href = `pokemon_moves_2.html?move=${encodeURIComponent(move.name)}`;
          lastCell.appendChild(link);
          row.appendChild(lastCell);
      
          tableBody.appendChild(row);
        }
      }
      
      document.addEventListener("DOMContentLoaded", fetchPokemonMoves);
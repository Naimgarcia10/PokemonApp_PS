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

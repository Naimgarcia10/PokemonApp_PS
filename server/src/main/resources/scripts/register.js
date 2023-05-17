import { DB_HOST, DB_PORT } from "./config.js"

// Método para registrar el usuario en la base de datos
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".register");
  console.log(form);
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    registrarUsuario();
    form.reset();
  })

});

function registrarUsuario() {
  // Parámetros a enviar
  var formData = {
    'username': document.getElementById('username').value,
    'email': document.getElementById('email').value,
    'password': document.getElementById('password').value,
    'birthdate': document.getElementById('birthdate').value
  }

  fetch(`http://${DB_HOST}:${DB_PORT}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status + ' ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    // Trabajar con los datos obtenidos
    console.log(data);

    localStorage.setItem('email', data);
    console.log(localStorage.getItem('email'));
  })
  .catch(error => {
    // Manejar el error
    console.log('Error en la solicitud:', error);

    // Acceder al mensaje de error devuelto por el servidor
    if (error.response) {
      error.response.text().then(errorMessage => {
        console.log('Mensaje de error:', errorMessage);
      });
    }
  });


}

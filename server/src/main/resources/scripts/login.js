import { DB_HOST, DB_PORT } from "./config.js"

// Método para registrar el usuario en la base de datos
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".login");
  console.log(form);
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    inicioSesion();
  })

});

function inicioSesion() {
  // Parámetros a enviar
  var formData = {
    'email': document.getElementById('email').value,
    'password': document.getElementById('password').value
  }

  fetch(`http://${DB_HOST}:${DB_PORT}/login`, {
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
    sessionStorage.setItem('email', data[0]); // Guardar el email del usuario en la sesión
    sessionStorage.setItem('username', data[1]); // Guardar el nombre de usuario del usuario en la sesión
    window.location.href = 'equipoPokemon.html';
  })
  .catch(error => {
    // Manejar el error
    console.log('Error en la solicitud:', error);
    /* if (error == "Error: 401 Unauthorized") {
      alert("Usuario o contraseña incorrectos");
    } else if (error == "Error: 404 Not Found") {
      alert("Usuario no encontrado");
    } else if (error == "Error: 400 Bad Request") {
      alert("Faltan datos");
    } */
    const errorText = document.getElementById("form_errorText");
    const errorPict = document.getElementById("form_errorPict");

    if (error.message.includes('404')) {
      errorText.innerHTML = "User not found";
    } else if (error.message.includes('401')) {
      errorText.innerHTML = "Incorrect username or password";
    } else if (error.message.includes('400')) {
      errorText.innerHTML = "Please fill all required fields";
    }

    errorText.style.cssText = 'display: block; color: var(--Red); font-size: 1.5rem; margin-top: 1rem; margin-bottom: 0.2rem;'
    errorPict.style.cssText = 'display: block; width: 200px; height: 200px; margin-right: 0.5rem;'
    setTimeout(() => { 
      errorText.style.cssText = 'display: none;'
      errorPict.style.cssText = 'display: none;'
    }, 8000);
    
    /* switch (error) {
      case "Error: 401 Unauthorized":
        alert("Usuario o contraseña incorrectos");
        break;
      case "Error: 404 Not Found":
        alert("Usuario no encontrado");
        break;
      case "Error: 400 Bad Request":
        alert("Faltan datos");
        break;
    } */

    // Acceder al mensaje de error devuelto por el servidor
    if (error.response) {
      error.response.text().then(errorMessage => {
        console.log('Mensaje de error:', errorMessage);
      });
    }
  });
}
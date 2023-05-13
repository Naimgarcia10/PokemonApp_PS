import {DB_HOST, DB_PORT} from "./config.js"

// Método para registrar el usuario en la base de datos
document.addEventListener("DOMContentLoaded", function() {  
  const form = document.querySelector(".register");
  console.log(form);
  form.addEventListener("submit", function(event){
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

  // Realizar la solicitud POST al servidor
  fetch(`http://${DB_HOST}:${DB_PORT}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(formData)
  })
}

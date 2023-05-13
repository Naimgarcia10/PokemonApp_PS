import {DB_HOST, DB_PORT} from "./config.js"

// Método para registrar el usuario en la base de datos
document.addEventListener("DOMContentLoaded", function() {  
  const form = document.querySelector(".register");
  console.log(form);
  form.addEventListener("submit", function(event){
    event.preventDefault();    
    registrarUsuario();
  })

});

function registrarUsuario() {
  const a = document.getElementById('username');
  console.log(a);
  console.log("a.value = " + a.value);
  // Parámetros a enviar
  var formData = {
    'username': document.getElementById('username').value,
    'email': document.getElementById('email').value,
    'password': document.getElementById('password').value,
    'birthdate': document.getElementById('birthdate').value
  }

  console.log(formData);

  // Realizar la solicitud POST al servidor
  fetch(`http://${DB_HOST}:${DB_PORT}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(formData)
  })
  .then(response = response.json())
  .then(data = console.log(data))
  .catch(error = console.error("Fetch error:", error));
}

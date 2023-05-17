import { DB_HOST, DB_PORT } from "./config.js"

const form = document.querySelector(".register");

document.addEventListener("DOMContentLoaded", function () {
  console.log(form);
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    registrarUsuario();
  })

});

function registrarUsuario() {
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
    } else if (response.status === 409) {
      return response.json();
    }
  })
  .then(data => {
    // Trabajar con los datos obtenidos
<<<<<<< HEAD
    alert("Usuario registrado correctamente");
    form.reset();
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('username');
    window.location.href = 'login.html';
=======
    console.log(data);

    localStorage.setItem('email', data);
    console.log(localStorage.getItem('email'));
>>>>>>> 4cb8de226469ce95103dc6e861a7bd7db02b307e
  })
  .catch(error => {
    console.log('Error en la solicitud:', error);
    const errorText = document.getElementById("form_errorText");
    const errorPict = document.getElementById("form_errorPict");

    if (error.message.includes('409')) {
      errorText.innerHTML = "User already exists, change username or email";
    } else if (error.message.includes('400')) {
      errorText.innerHTML = "Please fill all required fields";
    }

    errorText.style.cssText = 'display: block; color: var(--Red); font-size: 1.5rem; margin-top: 1rem; margin-bottom: 0.2rem;'
    errorPict.style.cssText = 'display: block; width: 200px; height: 200px; margin-right: 0.5rem;'
    setTimeout(() => { 
      errorText.style.cssText = 'display: none;'
      errorPict.style.cssText = 'display: none;'
    }, 8000);

    if (error.response) {
      error.response.text().then(errorMessage => {
        console.log('Mensaje de error:', errorMessage);
      });
    }
  });
}

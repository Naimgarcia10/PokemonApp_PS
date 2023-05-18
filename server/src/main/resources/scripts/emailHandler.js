document.getElementById('suggestion-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const suggestion = document.getElementById('suggestion').value;
    const loadingBar = document.getElementById('loading-bar');
    const modal = document.getElementById('myModal');
    const span = document.getElementsByClassName("close")[0];

    loadingBar.style.display = 'block'; // Mostrar la barra de carga

    span.onclick = function() {
      modal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    try {
        await sendEmail('pokemonpsapp@gmail.com', 'Suggestion', `Correo: ${email}\n\nSugerencia: ${suggestion}`);
        modal.style.display = "block"; // Mostrar el modal
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        alert('Error al enviar el correo');
    } finally {
        loadingBar.style.display = 'none'; // Ocultar la barra de carga
    }
});

async function sendEmail(to, subject, body) {
    const response = await fetch(`/sendEmail?to=${encodeURIComponent(to)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    if (!response.ok) {
        throw new Error('Error sending email');
    }
    return await response.text();
}

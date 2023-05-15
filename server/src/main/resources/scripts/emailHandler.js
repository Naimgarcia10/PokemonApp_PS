document.getElementById('suggestion-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const suggestion = document.getElementById('suggestion').value;

    try {
        await sendEmail('pokemonpsapp@gmail.com', 'Suggestion', `Correo: ${email}\n\nSugerencia: ${suggestion}`);
        alert('Correo enviado exitosamente');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        alert('Error al enviar el correo');
    }
});

async function sendEmail(to, subject, body) {
    const response = await fetch(`/sendEmail?to=${encodeURIComponent(to)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    if (!response.ok) {
        throw new Error('Error sending email');
    }
    return await response.text();
}

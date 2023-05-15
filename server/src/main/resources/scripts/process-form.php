<?php
if(isset($_POST['email']) && isset($_POST['suggestion'])) {
    $to = 'sullivan.marin20@gmail.com';
    $subject = 'SUGERENCIA';
    $message = $_POST['email'] . ' ha enviado la siguiente sugerencia: ' . $_POST['suggestion'];
    $headers = 'From: sullivan.marin20@gmail.com' . "\r\n" .
        'Reply-To: sullivan.marin20@gmail.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    mail($to, $subject, $message, $headers);

    echo 'Correo enviado correctamente.';
} else {
    echo 'Error al enviar el correo.';
}
?>

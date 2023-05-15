/* validar campos */
const expresiones = {
    username: /^[a-zA-Z0-9\_\-]{4,12}$/,
    password: /^.{4,12}$/, // 4 a 12 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Validar correo
}

const $inputs = document.querySelectorAll('#register-form input');

const inputsFields = {
    username: false,
    email: false,
    password: false,
    password2: false
}

const validateForm = (e) => {
    switch (e.target.name) {
        case "username":
            validateFields(expresiones.username, e.target, 'username');
            break;
        case "email":
            validateFields(expresiones.email, e.target, 'email');
            break;
        case "password":
            validateFields(expresiones.password, e.target, 'password');
            validatePassword2();
            break;
        case "password2":
            validatePassword2();
            break;
    }
}

const validateFields = (expresion, input, field) => {
    const fieldErrorText = document.getElementById(`${field}_errorText`);
    if (expresion.test(input.value)) {
        fieldErrorText.classList.remove('form_input-error.active');
        fieldErrorText.classList.add('form_input-error');
        inputsFields[field] = true;
    } else {
        fieldErrorText.classList.remove('form_input-error');
        fieldErrorText.classList.add('form_input-error.active');
        inputsFields[field] = false;
    }
}

const validatePassword2 = () => {
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');
    const password2ErrorText = document.getElementById('password2_errorText');
    if (password.value !== password2.value) {
        password2ErrorText.classList.remove('form_input-error');
        password2ErrorText.classList.add('form_input-error.active');
        inputsFields['password2'] = false;
    } else {
        password2ErrorText.classList.remove('form_input-error.active');
        password2ErrorText.classList.add('form_input-error');
        inputsFields['password2'] = true;
    }
}

$inputs.forEach((input) => {
    input.addEventListener('keyup', validateForm);
}
);

const $registerForm = document.getElementById('register-form');
const birthdateField = document.getElementById('birthdate');
$registerForm.addEventListener('submit', (e) => {
    const formErrorText = document.getElementById('form_errorText');
    const formErrorPict = document.getElementById('form_errorPict');
    e.preventDefault();
    if (inputsFields.username && inputsFields.email && inputsFields.password && inputsFields.password2 && birthdateField.value !== '') {
        formErrorText.style.cssText = 'display: none;'
        formErrorPict.style.cssText = 'display: none;'
        console.log('Formulario enviado');
    } else {
        formErrorText.style.cssText = 'display: block; color: var(--Red); font-size: 1.5rem; margin-top: 1rem; margin-bottom: 0.2rem;'
        formErrorPict.style.cssText = 'display: block; width: 200px; height: 200px; margin-right: 0.5rem;'
        /* setTimeout(() => {
            formErrorText.style.cssText = 'display: none;'
            formErrorPict.style.cssText = 'display: none;'
        }
            , 3000); */
    }
}
);


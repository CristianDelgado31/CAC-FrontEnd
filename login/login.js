function validarCorreo() {
    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value;
    const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com)$/;

    if (!regex.test(emailValue)) { // Si el correo no cumple con el patrón establecido (gmail.com o hotmail.com) se muestra un mensaje de error
        alert('Por favor, ingrese un correo electrónico válido.');
        return false;
    }

    return true;
}
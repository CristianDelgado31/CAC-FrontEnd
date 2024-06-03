document.getElementById('loginForm').addEventListener('submit', function(event) {
    const emailInput = document.getElementById('email').value;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(emailInput)) {
        event.preventDefault();
        alert('Por favor, ingrese un correo electrónico válido.');
    }

    const passwordInput = document.getElementById('password').value;
    if (passwordInput.length == 0) {
        event.preventDefault();
        alert('Por favor, ingrese una contraseña.');
    }
});

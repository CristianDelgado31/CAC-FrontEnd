document.getElementById('loginForm').addEventListener('submit', function(event) {
    const emailInput = document.getElementById('email').value;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(emailInput)) {
        event.preventDefault();
        alert('Por favor, ingrese un correo electrónico válido.');
        return;
    }

    const passwordInput = document.getElementById('password').value;
    if (passwordInput.length == 0) {
        event.preventDefault();
        alert('Por favor, ingrese una contraseña.');
        return;
    }

    VerificarDatos(emailInput, passwordInput)
        .then((data) => {
            if (data) {
                // Guardar datos usuario en local storage
                localStorage.setItem('usuario', JSON.stringify(data));
                // Redirigir a la página principal
                window.location.href = '../index.html'; // esto hace cargar el dom de la pagina index.html? -> si
                alert('Inicio de sesión exitoso.');
            } else {
                alert('Correo electrónico o contraseña incorrectos.');
            }
        })
        .catch((error) => {
            console.error(error);
            alert(error.message);
            document.getElementById('loginForm').reset();
        });

    event.preventDefault();
});


async function VerificarDatos(email, contrasenia) {
    const response = await fetch('http://localhost:8080/backendapp/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, contrasenia })
    });

    if(response.ok){
        return response.json();
    } else if(response.status == 401) {
        throw new Error('Correo electrónico o contraseña incorrectos.');
    }
}

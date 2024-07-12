document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let email = document.getElementById('email').value;
    let contrasenia = document.getElementById('password').value;
    let fechaNacimiento = document.getElementById('fecha_nacimiento').value;
    let pais = document.getElementById('pais').value;
    
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return;
    }

    if (contrasenia.length === 0) {
        alert('Por favor, ingrese una contraseña.');
        return;
    }

    RegistrarUsuario(nombre, apellido, email, contrasenia, fechaNacimiento, pais)
        .then((response) => {
            if(response.status === 201){
                alert('Usuario registrado correctamente.');
                window.location.href = '../login/login.html';
            } else {
                alert('Error al registrar usuario.');
            }
        })
        .catch((error) => {
            console.error(error);
            alert('Error al registrar usuario.');
        });
});

async function RegistrarUsuario(nombre, apellido, email, contrasenia, fechaNacimiento, pais) {
    const response = await fetch('http://localhost:8080/backendapp/crear-usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, apellido, email, contrasenia, fechaNacimiento, pais})
    });

    if (response.status === 201) {
        return response; // La llamada fue exitosa y el usuario fue creado
    } else {
        throw new Error('Error en la llamada a la API');
    }
}
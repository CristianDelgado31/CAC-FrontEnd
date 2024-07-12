function cerrarSesion() {
    localStorage.removeItem('usuario');
    window.location.href = '../login/login.html'; // Redirige a la página de inicio de sesión
}

let flagModificar = false;

function modificarPerfil() {
    // window.location.href = '../modificar/modificar.html'; // Redirige a la página de modificación
    if(flagModificar){
        document.getElementById('modify-container').style.display = 'none';
        flagModificar = false;
        document.getElementById('modify-form').reset();
    } else {
        document.getElementById('modify-container').style.display = 'block';
        flagModificar = true;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos del usuario desde localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    document.getElementById('modify-container').style.display = 'none';
    document.getElementById('modify-form').reset();

    if (usuario) {
        document.getElementById('nombre').textContent = usuario.nombre;
        document.getElementById('apellido').textContent = usuario.apellido;
        document.getElementById('email').textContent = usuario.email;
        document.getElementById('contrasenia').textContent = usuario.contrasenia;
        document.getElementById('fechaNacimiento').textContent = usuario.fechaNacimiento;
        document.getElementById('pais').textContent = usuario.pais;
    } else {
        alert("No se encontró la información del usuario en el localStorage.");
    }
});


document.getElementById('modify-form').addEventListener('submit', function(event) {
    const nombreInput = document.getElementById('nombre-modify').value;
    if (nombreInput.length == 0) {
        event.preventDefault();
        alert('Por favor, ingrese un nombre.');
        return;
    }

    const apellidoInput = document.getElementById('apellido-modify').value;
    if (apellidoInput.length == 0) {
        event.preventDefault();
        alert('Por favor, ingrese un apellido.');
        return;
    }

    const emailInput = document.getElementById('email-modify').value;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(emailInput)) {
        event.preventDefault();
        alert('Por favor, ingrese un correo electrónico válido.');
        return;
    }

    const passwordInput = document.getElementById('contrasenia-modify').value;
    if (passwordInput.length == 0) {
        event.preventDefault();
        alert('Por favor, ingrese una contraseña.');
        return;
    }

    const fechaNacimientoInput = document.getElementById('fechaNacimiento-modify').value;
    if (fechaNacimientoInput.length == 0) {
        event.preventDefault();
        alert('Por favor, ingrese una fecha de nacimiento.');
        return;
    }

    const paisInput = document.getElementById('pais-modify').value;
    if (paisInput.length == 0) {
        event.preventDefault();
        alert('Por favor, ingrese un país.');
        return;
    }

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    usuario.nombre = nombreInput;
    usuario.apellido = apellidoInput;
    usuario.email = emailInput;
    usuario.contrasenia = passwordInput;
    usuario.fechaNacimiento = fechaNacimientoInput;
    usuario.pais = paisInput;

    ModificarUsuario(usuario);

    // localStorage.setItem('usuario', JSON.stringify(usuario));
    // alert('Perfil modificado correctamente.');

    // document.getElementById('modify-container').style.display = 'none';

    event.preventDefault(); // Evitar que el formulario se envíe
});


async function ModificarUsuario(jsonUsuario) {
    try {
        const response = await fetch('http://localhost:8080/backendapp/usuario-modificar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonUsuario)
        });

        if (response.ok) {
            alert('Perfil modificado correctamente.');
            localStorage.setItem('usuario', JSON.stringify(jsonUsuario)); // Actualizar el usuario en localStorage
            document.getElementById('modify-container').style.display = 'none';
            // document.getElementById('modify-form').reset();
            window.location.reload(); // Recargar la página para ver los cambios
            console.log(jsonUsuario); // usuario es un objeto JSON con los datos del usuario
        } else {
            const errorData = await response.json();
            alert('Error al modificar el perfil: ' + errorData.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al intentar modificar el perfil: ' + error.message);
    }
}


function eliminarPerfil() {
    if (confirm("¿Estás seguro de que quieres eliminar tu perfil?")) {

        const usuario = JSON.parse(localStorage.getItem('usuario'));
        const id = usuario.id;
        fetch('http://localhost:8080/backendapp/usuario-eliminar/' + id, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                localStorage.removeItem('usuario');
                alert("Perfil eliminado.");
                window.location.href = '../index.html'; // Redirige a la página principal
            } else {
                return response.json();
            }
        })
        .then(errorData => {
            if (errorData) {
                alert('Error al eliminar el perfil: ' + errorData.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al intentar eliminar el perfil: ' + error.message);
        });
    }
}



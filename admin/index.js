async function cargarUsuarios() {
    try {
        const response = await fetch('http://localhost:8080/backendapp/lista-usuarios');
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        const data = await response.json();
        console.log(data);

        const tableBody = document.querySelector('#usuarios-table tbody');
        data.forEach(usuario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido}</td>
                <td>${usuario.email}</td>
                <td>${usuario.contrasenia}</td>
                <td>${usuario.fechaNacimiento}</td>
                <td>${usuario.pais}</td>
                <td>${usuario.rol}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
    }
}

// Cargar los usuarios cuando se cargue el DOM
document.addEventListener('DOMContentLoaded', cargarUsuarios);
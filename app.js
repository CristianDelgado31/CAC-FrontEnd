// Función para buscar películas en ahora reproduciendo
function BuscarPeliculas() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'AGREGAR_TOKEN_ACÁ'
        }
    };

    // Páginas a consultar
    const arrPages = [1, 2];

    // Mapear cada página a una promesa de fetch
    const promises = arrPages.map(page => {
        return fetch(`https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=${page}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => data.results) // Extraer solo los resultados de películas
            .catch(err => console.error(err));
    });

    // Esperar a que todas las promesas se resuelvan
    Promise.all(promises)
        .then(results => {
            // Concatenar todos los resultados en un solo array
            const allMovies = results.flat(); // Usar .flat() para aplanar el array
            mostrarPeliculas(allMovies);
        })
        .catch(err => console.error(err));
}

// Función para mostrar películas en un contenedor
function mostrarPeliculas(peliculas) {
    const flexContainer = document.querySelector('.flex-container');

    // Obtener solo los divs dentro de flexContainer que contienen películas
    const peliculaDivs = flexContainer.querySelectorAll('div');

    // Eliminar los divs que contienen películas anteriores
    peliculaDivs.forEach(div => div.remove());

    peliculas.forEach(pelicula => {
        const posterPath = pelicula.poster_path;
        const fullUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
        const peliculaDiv = document.createElement('div');
        peliculaDiv.style.backgroundImage = `url(${fullUrl})`;
        flexContainer.appendChild(peliculaDiv);
    });
}


// Función para buscar películas más aclamadas
function PeliculasMasAclamadas() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2VjYmE0ZDlhODcwODZmZDdjNzAxNTYxMGNjYzk1OSIsIm5iZiI6MTcyMDc5OTk5MC4zNTEzMjIsInN1YiI6IjY2OTE0ZjdhMzllMzU4ZDdlNWVlNGUyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.awi7fe01n_PMD0tXqekzg4aAma7UtcQFaQweskErLBY'
        }
    };

    fetch(`https://api.themoviedb.org/3/movie/top_rated?language=es-ES&page=1`, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data.results)
        .then(response => MostrarMasAclamadas(response))
        .catch(err => console.error(err));
}

// Función para mostrar películas más aclamadas en un contenedor específico
function MostrarMasAclamadas(peliculas) {
    const pelisMasAclamadasContainer = document.querySelector('.pelis_mas_aclamadas');
    pelisMasAclamadasContainer.innerHTML = ''; // Limpiar el contenedor

    let contador = 0; // Contador para limitar a 9 películas

    peliculas.forEach(pelicula => {
        if (contador > 8) {
            return;
        }

        const posterPath = pelicula.poster_path;
        const fullUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
        const peliculaDiv = document.createElement('div');
        peliculaDiv.style.backgroundImage = `url(${fullUrl})`;
        pelisMasAclamadasContainer.appendChild(peliculaDiv);
        contador++;
    });
}

// Función principal para llamar a las API y mostrar películas
function LlamarApiPeliculas() {
    BuscarPeliculas();
    PeliculasMasAclamadas();
}

// // Llamar a la función principal al cargar la página
// document.addEventListener('DOMContentLoaded', LlamarApiPeliculas);

// Gestión del estado del usuario en localStorage
if (localStorage.getItem('usuario')) {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario.rol === 'admin') {
        document.querySelector('.header_menu_lista_usuarios').style.display = 'block';
    } else {
        document.querySelector('.header_menu_lista_usuarios').style.display = 'none';
    }

    // Ocultar botones de iniciar sesión y registrarse, mostrar perfil
    document.querySelector('.header_menu_login').style.display = 'none';
    document.querySelector('.header_menu_registrarse').style.display = 'none';
    document.querySelector('.header_menu_perfil').style.display = 'block';
    document.querySelector('.main_btn_registrarse').style.display = 'none';
} else {
    // Mostrar botones de iniciar sesión y registrarse, ocultar perfil
    document.querySelector('.header_menu_perfil').style.display = 'none';
    document.querySelector('.header_menu_login').style.display = 'block';
    document.querySelector('.header_menu_registrarse').style.display = 'block';
    document.querySelector('.main_btn_registrarse').style.display = 'block';
    document.querySelector('.header_menu_lista_usuarios').style.display = 'none';
}

const apiKey = '6884348f';
const movieListElement = document.getElementById('movie-list');

async function fetchMovies(query) {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True" && data.Search) {
      displayMovies(data.Search);
    } else {
      movieListElement.innerHTML = `<p class="text-white col-span-full">Nenhum filme encontrado para "${query}".</p>`;
    }
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    movieListElement.innerHTML = `<p class="text-red-500 col-span-full">Erro ao buscar filmes</p>`;
  }
}
document.getElementById('search-query').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    searchMovies();
  }
});

function displayMovies(movies) {
  movieListElement.innerHTML = '';

  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.className = 'bg-[#181818] border-2 border-pink-600 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition';

    movieElement.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'poster-placeholder.jpg'}" alt="${movie.Title}" class="w-full h-64 object-cover">
      <div class="p-2 text-white">
        <h3 class="font-bold text-lg">${movie.Title}</h3>
        <p class="text-sm text-gray-400">${movie.Year}</p>
      </div>
    `;

    movieListElement.appendChild(movieElement);
  });
}

function searchMovies() {
  const query = document.getElementById('search-query').value.trim();
  if (query) {
    fetchMovies(query);
  } else {
    movieListElement.innerHTML = `<p class="text-white col-span-full">Digite algo para buscar.</p>`;
  }
}


// Fecha o dropdown se clicar fora
document.addEventListener('click', function(e) {
  const dropdown = document.querySelector('.dropdown');
  if (!dropdown.contains(e.target)) {
    document.getElementById('dropdown-menu').classList.add('hidden');
  }
});



document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '6884348f';
    const movieListElement = document.getElementById('movie-list');
    const randomTerms = ['Avengers', 'Batman', 'Star Wars', 'Spider', 'Matrix', 'Lord', 'Fast', 'Alien'];
  
    const searchInput = document.getElementById('search-query');
  
    // Pesquisa aleatória ao abrir
    const randomQuery = randomTerms[Math.floor(Math.random() * randomTerms.length)];
    fetchMovies(randomQuery);
  
    async function fetchMovies(query) {
      const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
  
        if (data.Response === "True") {
          renderMovies(data.Search);
        } else {
          movieListElement.innerHTML = "<p style='text-align:center;'>Nenhum filme encontrado.</p>";
        }
      } catch (err) {
        console.error('Erro na API:', err);
        movieListElement.innerHTML = "<p style='text-align:center;'>Erro ao buscar filmes.</p>";
      }
    }
  
    function renderMovies(movies) {
      movieListElement.innerHTML = '';
      movies.forEach(movie => {
        const poster = movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg";
        movieListElement.innerHTML += `
        <div class="card" onclick="showMovieDetails('${movie.imdbID}')">
          <img src="${poster}" alt="${movie.Title}">
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
          <p>${movie.Type}</p>
        </div>
      `;
      
      });
    }
  
    window.searchMovies = function () {
      const query = searchInput.value.trim();
      if (query) {
        fetchMovies(query);
      }
    };
  });
  async function showMovieDetails(imdbID) {
    const url = `https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.Response === "True") {
        const detailsHTML = `
          <img src="${data.Poster !== "N/A" ? data.Poster : "placeholder.jpg"}" alt="${data.Title}">
          <h2>${data.Title} (${data.Year})</h2>
          <p><strong>Tipo:</strong> ${data.Type}</p>
          <p><strong>Sinopse:</strong><br>${data.Plot}</p>
        `;
        document.getElementById('popup-details').innerHTML = detailsHTML;
        document.getElementById('movie-popup').classList.remove('hidden');
      } else {
        alert("Detalhes não encontrados.");
      }
    } catch (err) {
      console.error("Erro ao buscar detalhes:", err);
    }
  }
  
  function closePopup() {
    document.getElementById('movie-popup').classList.add('hidden');
  }
  
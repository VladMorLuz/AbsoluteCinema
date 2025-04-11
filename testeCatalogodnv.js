const ElementoInserirFilme = document.getElementById('inserirFilme');
export const listaFilme = () => {
    ElementoInserirFilme.innerHTML = ``;
    filmes.forEach(movie ->{
        const movieId - movie.imdbID;
        const movieTitle = movie.Title;
        const movieYear = movie.Year;
        const moviePoster = movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg';
        const card = document.createElement('div');
        const rating = movie.Rating ? movie.Rating : 'N/A';
    })
}
import React from "react";

const API_KEY = "90331c638461ea69a8a705bce71b3fca";

function Detalle(props) {
  const movieId = props.match.params.id;
  let movie = null;
  let loading = true;
  let failed = false;

  const [state, setState] = React.useState({
    movie: null,
    loading: true,
    failed: false
  });

  React.useEffect(function () {
    fetch("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + API_KEY + "&language=en-US")
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Movie not found");
        }
        return response.json();
      })
      .then(function (data) {
        setState({
          movie: data,
          loading: false,
          failed: false
        });
      })
      .catch(function () {
        setState({
          movie: null,
          loading: false,
          failed: true
        });
      });
  }, []);

  movie = state.movie;
  loading = state.loading;
  failed = state.failed;

  if (loading) {
    return <p>Cargando Pelicula...</p>;
  }

  if (failed) {
    return <p>Lo siento, algo salio mal.</p>;
  }

  return (
    <div className="movie-detail">
      <h1>{movie.title}</h1>
      <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} />
      <p>{movie.overview}</p>
      <p><strong>Release date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average}</p>
    </div>
  );
}

export default Detalle;
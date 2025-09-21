import React, { Component } from "react";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      esFavorito: false,
      movie: props.data || null
    };
  }

  componentDidMount() {
    if (this.state.movie) return;

    const id =
      (this.props.match && this.props.match.params && this.props.match.params.id) ||
      this.props.id;

    fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=90331c638461ea69a8a705bce71b3fca&language=es-ES")
      .then(function (respuesta) {
        return respuesta.json();
      })
      .then(function (objetoOriginal) {
        const texto = JSON.stringify(objetoOriginal);
        const datos = JSON.parse(texto);
        this.setState({ movie: datos });
      }.bind(this))
      .catch(function (error) {
        console.log("Error al cargar la película:", error);
      });
  }

  agregarAFavoritos() {
    const id = this.state.movie?.id;
    let favoritos = [];
    let datosEnLocalStorage = localStorage.getItem("LSFavoritos");
    if (datosEnLocalStorage !== null) {
      favoritos = JSON.parse(datosEnLocalStorage);
    }

    favoritos.push(id);
    localStorage.setItem("LSFavoritos", JSON.stringify(favoritos));
    this.setState({ esFavorito: true });
  }

  quitarDeFavoritos() {
    this.setState({ esFavorito: false });
  }

  render() {
    const pelicula = this.state.movie;

    if (!pelicula) {
      return <p>Cargando...</p>;
    }

    return (
      <React.Fragment>
        <h2 className="alert alert-primary">{pelicula.title}</h2>
        <section className="row">
          <img
            className="col-md-6"
            src={"https://image.tmdb.org/t/p/w500" + pelicula.poster_path}
            alt={pelicula.title}
          />
          <section className="col-md-6 info">
            <h3>Descripción</h3>
            <p className="description">{pelicula.overview}</p>
            <p id="release-date">
              <strong>Fecha de estreno:</strong> {pelicula.release_date}
            </p>
            <p className="length">
              <strong>Duración:</strong> {pelicula.runtime} minutos
            </p>
            <p id="votes">
              <strong>Puntuación:</strong> {pelicula.vote_average}
            </p>
            {this.state.esFavorito ? (
              <button onClick={() => this.quitarDeFavoritos()}>
                Quitar de favoritos
              </button>
            ) : (
              <button onClick={() => this.agregarAFavoritos()}>
                Agregar a favoritos
              </button>
            )}
          </section>
        </section>
      </React.Fragment>
    );
  }
}

export default Movie;
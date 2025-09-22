import React, { Component } from "react";
import Navbar from '../../components/Navbar/Navbar';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: props.data || null,
      esFavorito: false
    };
  }

  componentDidMount() {
    const id = this.props.match?.params?.id || this.state.movie?.id;

    if (!this.state.movie) {
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=90331c638461ea69a8a705bce71b3fca&language=es-ES`)
        .then(res => res.json())
        .then(data => {
          this.setState({ movie: data }, () => {
            this.verificarFavorito();
          });
        })
        .catch(error => console.log("Error al cargar la película:", error));
    } else {
      this.verificarFavorito();
    }
  }

  verificarFavorito() {
    const id = this.state.movie?.id;
    const datosEnLocalStorage = localStorage.getItem("LSFavoritos");

    if (datosEnLocalStorage) {
      const favoritos = JSON.parse(datosEnLocalStorage);
      if (favoritos.includes(id)) {
        this.setState({ esFavorito: true });
      }
    }
  }

  agregarAFavoritos() {
    const id = this.state.movie?.id;
    let favoritos = [];

    const datosEnLocalStorage = localStorage.getItem("LSFavoritos");
    if (datosEnLocalStorage) {
      favoritos = JSON.parse(datosEnLocalStorage);
    }

    if (!favoritos.includes(id)) {
      favoritos.push(id);
      localStorage.setItem("LSFavoritos", JSON.stringify(favoritos));
      this.setState({ esFavorito: true });
    }
  }

  quitarDeFavoritos() {
    const id = this.state.movie?.id;
    let favoritos = [];

    const datosEnLocalStorage = localStorage.getItem("LSFavoritos");
    if (datosEnLocalStorage) {
      favoritos = JSON.parse(datosEnLocalStorage);
      favoritos = favoritos.filter(favId => favId !== id);
      localStorage.setItem("LSFavoritos", JSON.stringify(favoritos));
      this.setState({ esFavorito: false });
    }
  }

  render() {
    const pelicula = this.state.movie;

    if (!pelicula) {
      return <p>Cargando...</p>;
    }

    return (
      <React.Fragment>
        <Navbar />
        <h2 className="alert alert-primary">{pelicula.title}</h2>
        <section className="row">
          <img
            className="col-md-6"
            src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
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

            {/* 🔘 Botón dinámico de favoritos */}
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
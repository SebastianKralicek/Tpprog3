import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../Cards/style.css';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descripcionVisibleId: null,
      favoritos: []
    };
    console.log("Constructor - props.peliculas:", props.peliculas);
  }

  componentDidMount() {
    const datosEnLocalStorage = localStorage.getItem('LSFavoritos');
    console.log("componentDidMount - datos en localStorage:", datosEnLocalStorage);

    if (datosEnLocalStorage) {
      const favoritos = JSON.parse(datosEnLocalStorage);
      console.log("componentDidMount - favoritos parseados:", favoritos);
      this.setState({ favoritos });
    }
  }

  agregarAFavoritos(id) {
    console.log("agregarAFavoritos - ID recibido:", id);
    let favoritos = [...this.state.favoritos];

    if (!favoritos.includes(id)) {
      favoritos.push(id);
      localStorage.setItem('LSFavoritos', JSON.stringify(favoritos));
      console.log("agregarAFavoritos - favoritos actualizados:", favoritos);
      this.setState({ favoritos });
    } else {
      console.log("agregarAFavoritos - ya estaba en favoritos");
    }
  }

  quitarDeFavoritos(id) {
    console.log("quitarDeFavoritos - ID recibido:", id);
    let favoritos = this.state.favoritos.filter(unID => unID !== id);
    localStorage.setItem('LSFavoritos', JSON.stringify(favoritos));
    console.log("quitarDeFavoritos - favoritos actualizados:", favoritos);
    this.setState({ favoritos });
  }

  descripcion(id) {
    const nuevoEstado = this.state.descripcionVisibleId === id ? null : id;
    console.log("descripcion - ID toggled:", id, "Nuevo estado:", nuevoEstado);
    this.setState({ descripcionVisibleId: nuevoEstado });
  }

  render() {
    console.log("render - favoritos actuales:", this.state.favoritos);

    return (
      <section className="cardContainer">
        {this.props.peliculas.map((peli) => {
          const descripcionVisible = this.state.descripcionVisibleId === peli.id;
          const esFavorito = this.state.favoritos.includes(peli.id);

          console.log("render - peli.id:", peli.id, "esFavorito:", esFavorito);

          return (
            <div key={peli.id} className="character-card">
              <img
                src={`https://image.tmdb.org/t/p/w342${peli.poster_path}`}
                alt={peli.title}
              />
              <h3>{peli.title}</h3>

              <button onClick={() => this.descripcion(peli.id)}>
                {descripcionVisible ? 'Ocultar descripción' : 'Ver descripción'}
              </button>
              {descripcionVisible && <p>{peli.overview}</p>}

              <Link to={`/pelicula/${peli.id}`}>
                <button>Ir a detalle</button>
              </Link>
              {esFavorito ? (
                <button onClick={() => {this.quitarDeFavoritos(peli.id); this.props.onRemove?.(peli.id);}}>Quitar de favoritos</button>
              ) : (
                <button onClick={() => this.agregarAFavoritos(peli.id)}>Agregar a favoritos</button>
                )}
            </div>
          );
        })}
      </section>
    );
  }
}

export default Cards;
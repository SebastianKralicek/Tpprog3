import React, { Component } from 'react';
import Movie from '../Movie/Movie';

const APIKEY = '90331c638461ea69a8a705bce71b3fca';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      personajesFavoritos: []
    };
  }

  componentDidMount() {
    let listaIdFavoritos = [];
    let datosEnLocalStorage = localStorage.getItem('LSFavoritos');
    if (datosEnLocalStorage !== null) {
      listaIdFavoritos = JSON.parse(datosEnLocalStorage);
      listaIdFavoritos.forEach(unID => {
        fetch(`https://api.themoviedb.org/3/movie/${unID}?api_key=${APIKEY}&language=es-ES`)
          .then(response => response.json())
          .then(data => {
            this.setState({
              personajesFavoritos: [...this.state.personajesFavoritos, data]
            });
          })
          .catch(error => console.log(error));
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <h2 className="alert alert-primary">Películas favoritas</h2>
        <section className="row cards" id="movies">
          <article className="single-card-movie">
            {this.state.personajesFavoritos.length === 0 ? (
              <p>Cargando...</p>
            ) : (
              this.state.personajesFavoritos.map(unPersonaje => (
                <Movie data={unPersonaje} key={unPersonaje.id} />
              ))
            )}
          </article>
        </section>
      </React.Fragment>
    );
  }
}

export default Favorites;
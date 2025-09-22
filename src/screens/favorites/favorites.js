import React, { Component } from 'react';
import Cards from '../../components/Cards/Cards';
import Navbar from '../../components/Navbar/Navbar';

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

      listaIdFavoritos.map(unID => {
        fetch(`https://api.themoviedb.org/3/movie/${unID}?api_key=${APIKEY}&language=es-ES`)
          .then(res => res.json())
          .then(data => {
            this.setState({
              personajesFavoritos: [...this.state.personajesFavoritos, data]
            });
          })
          .catch(err => console.log(err));
      });
    }
  }

  sacarDeFavortitos(id) {
    const sobras = this.state.personajesFavoritos.filter(unPj => unPj.id !== id);
    this.setState({ personajesFavoritos: sobras });

    // 🔄 Actualiza el localStorage con los IDs restantes
    localStorage.setItem('LSFavoritos', JSON.stringify(sobras.map(p => p.id)));
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <h2 className="alert alert-primary">Películas favoritas</h2>
        {this.state.personajesFavoritos.length === 0 ? (
          <p>No hay películas favoritas guardadas.</p>
        ) : (
          <Cards
            peliculas={this.state.personajesFavoritos}
            onRemove={this.sacarDeFavortitos.bind(this)}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Favorites;
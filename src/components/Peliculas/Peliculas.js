import React, { Component } from 'react';
import Cards from '../Cards/Cards';

const APIKEY = '90331c638461ea69a8a705bce71b3fca';

class Peliculas extends Component {
  constructor() {
    super();
    this.state = {
      populares: [],
      cartelera: [],
    };
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=es-ES`)
      .then((res) => res.json())
      .then((data) => this.setState({ populares: data.results }))
      .catch((err) => console.log(err));

    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=es-ES`)
      .then((res) => res.json())
      .then((data) => this.setState({ cartelera: data.results }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <main>
        <section>
          <h2>Películas en cartelera</h2>
          <Cards peliculas={this.state.cartelera.filter((peli, i) => i < 4)} />
          <a href="/peliculas/cartelera">Ver todas</a>
        </section>

        <section>
          <h2>Películas más populares</h2>
          <Cards peliculas={this.state.populares.filter((peli, i) => i < 4)} />
          <a href="/peliculas/populares">Ver todas</a>
        </section>
      </main>
    );
  }
}

export default Peliculas;

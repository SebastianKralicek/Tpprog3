import React, { Component } from 'react';
import Cards from '../../components/Cards/Cards';

const APIKEY = '90331c638461ea69a8a705bce71b3fca';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      populares: [],
      cartelera: [],
      error: null
    };
  }

  componentDidMount() {
    const { grupo } = this.props.match.params; 

    if (grupo === 'cartelera') {
      fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=es-ES`)
        .then(res => res.json())
        .then(data => this.setState({
          cartelera: Array.isArray(data.results) ? data.results : [],
          populares: [],
          error: null
        }))
        .catch(error => this.setState({ error }));
    } else { 
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=es-ES`)
        .then(res => res.json())
        .then(data => this.setState({
          populares: Array.isArray(data.results) ? data.results : [],
          cartelera: [],
          error: null
        }))
        .catch(error => this.setState({ error }));
    }
  }

  render() {
    const { grupo } = this.props.match.params;

    if (this.state.error) {
      return (
        <main style={{ padding: 16 }}>
          <h2>Hubo un problema</h2>
          <p>{String(this.state.error)}</p>
        </main>
      );
    }

    if (grupo === 'cartelera') {
      return (
        <main>
          <section>
            <h2>Películas en cartelera</h2>
            <Cards peliculas={Array.isArray(this.state.cartelera) ? this.state.cartelera : []} />
          </section>
        </main>
      );
    }

    return (
      <main>
        <section>
          <h2>Películas más populares</h2>
        <Cards peliculas={Array.isArray(this.state.populares) ? this.state.populares : []} />
        </section>
      </main>
    );
  }
}

export default Movies;

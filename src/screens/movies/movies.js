import React, { Component } from 'react';
import Cards from '../../components/Cards/Cards';

const APIKEY = '90331c638461ea69a8a705bce71b3fca';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      populares: [],
      cartelera: [],
      valor: "",
      visible: 8
    };
  }

  evitarSubmit(event){
    event.preventDefault();
  }

  controlarCambios(event){
    this.setState({ valor: event.target.value });
  }

  cargarMas = (total) => {
    this.setState({ visible: total });
  }

  componentDidMount() {
    const { grupo } = this.props.match.params; 

    if (grupo === 'cartelera') {
      fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=es-ES`)
        .then(res => res.json())
        .then(data => this.setState({
          cartelera: Array.isArray(data.results) ? data.results : [],
          populares: []
        }))
        .catch(err => console.log(err));
    } else {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=es-ES`)
        .then(res => res.json())
        .then(data => this.setState({
          populares: Array.isArray(data.results) ? data.results : [],
          cartelera: []
        }))
        .catch(err => console.log(err));
    }
  }

  render() {
    const { grupo } = this.props.match.params;
    const texto = (this.state.valor || '').toLowerCase();

    const carteleraFiltradasFull = Array.isArray(this.state.cartelera)
      ? this.state.cartelera.filter(elm => ((elm.title || '').toLowerCase()).includes(texto))
      : [];
    const popularesFiltradasFull = Array.isArray(this.state.populares)
      ? this.state.populares.filter(elm => ((elm.title || '').toLowerCase()).includes(texto))
      : [];

    const peliculasFiltradas = carteleraFiltradasFull.slice(0, this.state.visible);
    const popularesFiltradas = popularesFiltradasFull.slice(0, this.state.visible);

    if (grupo === 'cartelera') {
      return (
        <main>
          <form onSubmit={(event) => this.evitarSubmit(event)}>
            <label>Nombre de película:</label>
            <input
              type="text"
              onChange={(event) => this.controlarCambios(event)}
              value={this.state.valor}
            />
            <input type="submit" value="Submit" />
          </form>

          <section>
            <h2>Películas en cartelera</h2>
            <Cards peliculas={peliculasFiltradas} />
          </section>

          <button onClick={() => this.cargarMas(carteleraFiltradasFull.length)}>
            Cargar más
          </button>
        </main>
      );
    }

    return (
      <main>
        <form onSubmit={(event) => this.evitarSubmit(event)}>
          <label>Nombre de película:</label>
          <input
            type="text"
            onChange={(event) => this.controlarCambios(event)}
            value={this.state.valor}
          />
          <input type="submit" value="Submit" />
        </form>

        <section>
          <h2>Películas más populares</h2>
          <Cards peliculas={popularesFiltradas} />
        </section>

        <button onClick={() => this.cargarMas(popularesFiltradasFull.length)}>
          Cargar más
        </button>
      </main>
    );
  }
}

export default Movies;
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
          cartelera: (data && data.results) || [],
          populares: []
        }))
        .catch(err => console.log(err));
    } else { 
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=es-ES`)
        .then(res => res.json())
        .then(data => this.setState({
          populares: (data && data.results) || [],
          cartelera: []
        }))
        .catch(err => console.log(err));
    }
  }

  render() {
    const { grupo } = this.props.match.params;
    const texto   = (this.state.valor || '').toLowerCase();
    const visible = this.state.visible;

    const baseCartelera = this.state.cartelera || [];
    const basePopulares = this.state.populares || [];

    const carteleraFiltradasFull = baseCartelera
      .filter(elm => ((elm.title || '').toLowerCase()).includes(texto));

    const popularesFiltradasFull = basePopulares
      .filter(elm => ((elm.title || '').toLowerCase()).includes(texto));

    const peliculasFiltradas = carteleraFiltradasFull
      .filter((_, i) => i < visible);

    const popularesFiltradas = popularesFiltradasFull
      .filter((_, i) => i < visible);

    if (grupo === 'cartelera') {
      return (
        <main>
          <form onSubmit={(e) => this.evitarSubmit(e)}>
            <label>Nombre de película:</label>
            <input
              type="text"
              onChange={(e) => this.controlarCambios(e)}
              value={this.state.valor}
            />
            <input type="submit" value="Submit" />
          </form>

          <section>
            <h2>Películas en cartelera</h2>
            <Cards peliculas={peliculasFiltradas} />
          </section>

          {visible < carteleraFiltradasFull.length && (
            <button onClick={() => this.cargarMas(carteleraFiltradasFull.length)}>
              Cargar más
            </button>
          )}
        </main>
      );
    }

    return (
      <main>
        <form onSubmit={(e) => this.evitarSubmit(e)}>
          <label>Nombre de película:</label>
          <input
            type="text"
            onChange={(e) => this.controlarCambios(e)}
            value={this.state.valor}
          />
          <input type="submit" value="Submit" />
        </form>

        <section>
          <h2>Películas más populares</h2>
          <Cards peliculas={popularesFiltradas} />
        </section>

        {visible < popularesFiltradasFull.length && (
          <button onClick={() => this.cargarMas(popularesFiltradasFull.length)}>
            Cargar más
          </button>
        )}
      </main>
    );
  }
}

export default Movies;

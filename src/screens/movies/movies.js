import React, { Component } from 'react';
import Cards from '../../components/Cards/Cards';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const APIKEY = '90331c638461ea69a8a705bce71b3fca';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      populares: [],
      cartelera: [],
      valor: "",
      visible: 5
    };
  }

  evitarSubmit(event) {
    event.preventDefault();
    if (this.state.valor !== "") {
      this.props.history.push(`/resultados-busqueda?query=${this.state.valor}`);
    }
  }

  controlarCambios(event){
    this.setState({ valor: event.target.value });
  }

  cargarMas = () => {
  this.setState({ visible: this.state.visible + 5 });
}

  fetchPeliculas(grupo) {
    if (grupo === 'cartelera') {
      fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=es-ES`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            cartelera: data.results || [],
            populares: [],
            visible: 5
          });
        })
        .catch(err => console.log(err));
    } else {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=es-ES`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            populares: data.results || [],
            cartelera: [],
            visible: 5
          });
        })
        .catch(err => console.log(err));
    }
  }

  componentDidMount() {
    const { grupo } = this.props.match.params;
    this.fetchPeliculas(grupo);
  }

  componentDidUpdate(prevProps) {
    const prevGrupo = prevProps.match.params.grupo;
    const actualGrupo = this.props.match.params.grupo;

    if (prevGrupo !== actualGrupo) {
      this.fetchPeliculas(actualGrupo);
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
    .filter((pelicula, i) => i < visible);

    const popularesFiltradas = popularesFiltradasFull
    .filter((pelicula, i) => i < visible);
    
    if (grupo === 'cartelera') {
      return (
        <React.Fragment>
        <Navbar />
        <main>
          <form onSubmit={(e) => this.evitarSubmit(e)}>
            <label>Nombre de película:</label>
            <input
              type="text"
              onChange={(e) => this.controlarCambios(e)}
              value={this.state.valor}
            />
            <input type="submit" value="Buscar" />
          </form>

          <section>
            <h2>Películas en cartelera</h2>
            <Cards peliculas={peliculasFiltradas} />
          </section>
            <button onClick={() => this.cargarMas()}>Cargar más</button>         
        </main>
        <Footer />
        </React.Fragment>
      );
    }

    return (
    <React.Fragment>
    <Navbar />
      <main>
        <form onSubmit={(e) => this.evitarSubmit(e)}>
          <label>Nombre de película:</label>
          <input
            type="text"
            onChange={(e) => this.controlarCambios(e)}
            value={this.state.valor}
          />
          <input type="submit" value="Buscar" />
        </form>

        <section>
          <h2>Películas más populares</h2>
          <Cards peliculas={popularesFiltradas} />
        </section>
         <button onClick={() => this.cargarMas()}>Cargar más</button>
      </main>
    <Footer/>
    </React.Fragment>
    );
  }
}

export default Movies;

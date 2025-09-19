import React, { Component } from 'react';
import Cards from '../Cards/Cards';
import '../Peliculas/style.css'
import { Link } from "react-router-dom";

const APIKEY = '90331c638461ea69a8a705bce71b3fca';

class Peliculas extends Component {
  constructor() {
    super();
    this.state = {
      populares: [],
      cartelera: [],
      valor: ""
    };
  }

  evitarSubmit(event){
    event.preventDefault();
  }

  controlarCambios(event){
    this.setState({valor: event.target.value});
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=es-ES`)
      .then((res) => res.json())
      .then((data) => 
        this.setState({
          populares: data.results
        })
      )
      .catch((err) => console.log(err));

    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=es-ES`)
      .then((res) => res.json())
      .then((data) => 
        this.setState({
          cartelera: data.results
        })
      )
      .catch((err) => console.log(err));
  }

  render() {
    
    const texto = this.state.valor.toLowerCase();

    
    const peliculasFiltradas = this.state.cartelera.filter((elm) => elm.title.toLowerCase().includes(texto) );

    const popularesFiltradas = this.state.populares.filter((elm) => elm.title.toLowerCase().includes(texto) );

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
          <Cards peliculas={peliculasFiltradas.filter((peli, i) => i < 4)} />
           <Link to="/peliculas/cartelera">Ver todas</Link>
        </section>

        <section>
          <h2>Películas más populares</h2>
          <Cards peliculas={popularesFiltradas.filter((peli, i) => i < 4)} />
           <Link to="/peliculas/populares">Ver todas</Link>
        </section>
      </main>
    );
  }
}

export default Peliculas;


import React, { Component} from "react";
import { Link } from "react-router-dom"
import '../Cards/style.css'

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descripcionVisibleId: false,
    };
  }

descripcion(id) {
    if (this.state.descripcionVisibleId === id) {
      this.setState({ descripcionVisibleId: null });
    } else {
      this.setState({ descripcionVisibleId: id });
    }
  }


  render() {
    return (
      <section className="cardContainer">
        {this.props.peliculas.map((peli) => {
        const descripcionVisible = this.state.descripcionVisibleId === peli.id;
          return (
          <div key={peli.id} className="character-card">
            <img
              src={`https://image.tmdb.org/t/p/w342${peli.poster_path}`}
              alt={peli.title}
            />
            <h3>{peli.title}</h3>

            <button onClick={() => this.descripcion(peli.id)}>
            {descripcionVisible ? 'Ocultar descripción ' : 'Ver descripción'} 
            </button>
            {descripcionVisible ? <p>{peli.overview}</p> : null}

            <Link to={`/pelicula/${peli.id}`}><button>Ir a detalle</button></Link>
          </div>
          ) 
        })}
      </section>
    );
  }
}

export default Cards;



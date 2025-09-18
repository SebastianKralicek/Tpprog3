import React, { Component} from "react";
import { Link } from "react-router-dom"
import '../Cards/style.css'

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descripcionVisible: false,
      texto: "Ver descripción",
    };
  }

  ocultar() {
    if (this.state.descripcionVisible) {
      this.setState({
        descripcionVisible: false,
        texto: "Ver descripción",
      });
    } else {
      this.setState({
        descripcionVisible: true,
        texto: "Ocultar descripción",
      });
    }
  }

  render() {
    return (
      <section className="cardContainer">
        {this.props.peliculas.map((peli) => (
          <div key={peli.id} className="character-card">
            <img
              src={`https://image.tmdb.org/t/p/w342${peli.poster_path}`}
              alt={peli.title}
            />
            <h3>{peli.title}</h3>

            <button onClick={() => this.ocultar()}>{this.state.texto}</button>
            {this.state.descripcionVisible ? <p>{peli.overview}</p> : null}

            <Link to={`/pelicula/${peli.id}`}><button>Ir a detalle</button></Link>
          </div>
        ))}
      </section>
    );
  }
}

export default Cards;



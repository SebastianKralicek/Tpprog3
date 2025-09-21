import React, { Component } from "react";
import Cards from "../../components/Cards/Cards";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const APIKEY = "90331c638461ea69a8a705bce71b3fca";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultados: [],
      loading: true,
    };
  }

  componentDidMount() {
    const SearchParams = new URLSearchParams(this.props.location.search)
    const query = SearchParams.get('query')


    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=es-ES&query=${query}`)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          resultados: data.results,
          loading: false,
        })
      )
      .catch((err) => console.log(err));
  }

  render() {
  let contenido = null;

  if (this.state.loading) {
    contenido = <p>Cargando...</p>;
  } else {
    contenido = <Cards peliculas={this.state.resultados} />;
  }

  return (
     <React.Fragment>
        <Navbar />
        <main>
          <h2>Resultados de búsqueda</h2>
          {contenido}
        </main>
        <Footer />
      </React.Fragment>
  );
}
}

export default SearchResults;

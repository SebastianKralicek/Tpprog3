import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from "./screens/Home/Home";
import Detalle from "./screens/Detalle/Detalle";
import SearchResults from "./screens/results/results";
import Movies from "./screens/movies/movies";


function App() {
  return (
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/peliculas" exact={true} />
      <Route path="/series" exact={true} />
      <Route path="/favoritos" exact={true} />
      <Route path="/resultados-busqueda" exact={true} component={SearchResults} />
      <Route path="/pelicula/:id" component={Detalle} />
      <Route path="/peliculas/:grupo" component={Movies} />
    </Switch>
  );
}

export default App;

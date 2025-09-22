import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from "./screens/Home/Home";
import Movie from "./screens/Movie/Movie";
import SearchResults from "./screens/Results/SearchResults";
import Movies from "./screens/Movies/Movies";
import Favorites from "./screens/favorites/Favorites"
import NotFound from './screens/Error/NotFound';


function App() {
  return (
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/peliculas" exact={true} />
      <Route path="/series" exact={true} />
      <Route path="/favoritos" component={Favorites} />
      <Route path="/resultados-busqueda" exact={true} component={SearchResults} />
      <Route path="/pelicula/:id" component={Movie} />
      <Route path="/peliculas/:grupo" component={Movies} />
      <Route component={NotFound}></Route>
    </Switch>
  );
}

export default App;

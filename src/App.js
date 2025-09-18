import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from "./screens/Home/Home"
import Detalle from "./screens/Detalle/Detalle"

function App() {
  return (
       <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/peliculas" exact={true} ></Route>
        <Route path="/series" exact={true} ></Route>
        <Route path="/favoritos" exact={true} ></Route>
        <Route path="/resultados-busqueda" exact={true} ></Route>
        <Route path="/pelicula/:id" component={Detalle}/>
        <Route path="" component={Error}/>


      </Switch>
  );
}

export default App;

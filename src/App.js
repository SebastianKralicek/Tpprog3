import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
  

function App() {
  return (
       <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/peliculas" exact={true} ></Route>
        <Route path="/series" exact={true} ></Route>
        <Route path="/detalle" exact={true} ></Route>
        <Route path="/favoritos" exact={true} ></Route>
        <Route path="/resultados-busqueda" exact={true} ></Route>
        <Route path="" component={Error}/>
      </Switch>
  );
}

export default App;

import React from "react"
import './styles.css'
import { Link } from 'react-router-dom'

function Navbar(props){
    return (
        <nav>
<ul class = "main-nav">

        <b><li><Link to="/">Home</Link></li></b>
        <b><li><Link to="/favorites">Favoritos</Link></li></b>
        <b><li><Link to="/vertodas">Ver Todas</Link></li></b>

</ul>
<ul class = "user">
    <li>{props.name}<img src="./assets/img/user.jpg" alt=""/></li>
</ul>
</nav>
    )
}

export default Navbar;
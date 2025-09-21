import React from "react"
import './styles.css'
import { Link } from 'react-router-dom'

function Navbar(props){
    return (
        <nav>
<ul class = "main-nav">

        <b><li><Link to="/">Home</Link></li></b>
        <b><li><Link to="/favoritos">Favoritos</Link></li></b>
        <b><li><Link to="/vertodas">Ver Todas</Link></li></b>

</ul>
<ul className = "user">
    <li className = "Morza">{props.name}<img src="/img/FOTOUSER.jpeg" alt="user"/></li>
</ul>
</nav>
    )
}

export default Navbar;
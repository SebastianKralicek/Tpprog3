import React from "react"
import '../../../public/css/styles.css'
import { Link } from 'react-router-dom'

function Navbar(props){
    return (
        <nav>
<ul class = "nav">

        <b><li><Link to="/">Home</Link></li></b>

</ul>

        </nav>
    )
}

export default Navbar;
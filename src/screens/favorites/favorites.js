import {Link} from 'react-router-dom'

import Cards from '../../components/Cards/Cards'
import React, {Component} from 'react'

class Favorites extends Component {
    constructor(){
        super()
        this.state = {
            personajesFavoritos: []
        }
    }

    render(){
        return(
            <React.Fragment>
                <h1>Pagina de Favoritos <Link to = "/">Ir al Home</Link></h1>

            <section className = "">
                { this.state.personajesFavoritos.length === 0 
                <p>Cargando...</p>
                this.state.personajesFavoritos.map( unPersonaje)    
            }
            </section>


            </React.Fragment>
        )
    }

}
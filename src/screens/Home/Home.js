import React from "react";
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Peliculas from "../../components/Peliculas/Peliculas";

function Home(){
    return(
        <React.Fragment>
            <Navbar />
            <Peliculas/>

            <Footer />
        </React.Fragment>
    )
}

export default Home;
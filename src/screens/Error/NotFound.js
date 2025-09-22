import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function NotFound() {
  return (
    <React.Fragment>
      <Navbar />
      <main>
        <h1>Error 404</h1>
        <p>Contenido inexistente</p>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default NotFound;
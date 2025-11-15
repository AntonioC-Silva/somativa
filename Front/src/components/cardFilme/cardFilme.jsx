import React from 'react';
import './cardFilme.css';
import { Link } from 'react-router-dom'; // 1. Importar o Link

function CardFilme({ filme }) {
    // 2. O 'filme.id' vem das props (como em home.jsx e categoria.jsx)
    const linkParaDetalhe = `/filme/${filme.id}`; 

    return (
        // 3. Envolver o card com o Link e adicionar uma classe para estilização
        <Link to={linkParaDetalhe} className="linkCardFilme">
            <article className="cardFilme">
                <figure className="poster">
                    <img 
                        src={filme.urlCapa} 
                        alt={`Capa do filme ${filme.titulo}`} 
                        className="imagemCapa" 
                        loading="lazy"
                    />
                    <figcaption className="tituloFilme">
                        {filme.titulo}
                    </figcaption>
                </figure>
            </article>
        </Link>
    );
}

export default CardFilme;
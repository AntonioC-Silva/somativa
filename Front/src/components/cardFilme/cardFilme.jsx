import React from 'react';
import './cardFilme.css';
import { Link } from 'react-router-dom'; 

function CardFilme({ filme }) {
    const linkParaDetalhe = `/filme/${filme.id}`; 

    return (
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
import React from 'react';
import './cardFilme.css';

function CardFilme({ filme }) {
    return (
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
    );
}

export default CardFilme;
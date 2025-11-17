import React from 'react';
import Slider from 'react-slick';
import CardFilme from '../cardFilme/cardFilme';
import './listaFilmes.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SetaAnterior(props) {
    const { className, style, onClick } = props;
    return (
        <article
            className={`${className} setaPersonalizada setaAnterior`}
            style={{ ...style, display: "flex" }}
            onClick={onClick}
            aria-label="Anterior"
        >
            <i className="bi bi-chevron-compact-left"></i>
        </article>
    );
}

function SetaProxima(props) {
    const { className, style, onClick } = props;
    return (
        <article
            className={`${className} setaPersonalizada setaProxima`}
            style={{ ...style, display: "flex" }}
            onClick={onClick}
            aria-label="Próximo"
        >
            <i className="bi bi-chevron-compact-right"></i>
        </article>
    );
}

function ListaFilmes({ tituloSecao, listaFilmes }) {
    
    const configuracoesSlider = {
        dots: false,
        infinite: true, 
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 0,
        draggable: false,
        prevArrow: <SetaAnterior />, 
        nextArrow: <SetaProxima />,  
    };

    if (!listaFilmes || listaFilmes.length === 0) return null;

    return (
        <section className="secaoFilmes" aria-label={`Lista de filmes: ${tituloSecao}`}>
            <h2 className="tituloSecao">{tituloSecao}</h2>
            
            <Slider {...configuracoesSlider} className="carrosselLista">
                {listaFilmes.map((filmeIndividual, index) => (
                    <CardFilme key={`${filmeIndividual.id}-${index}`} filme={filmeIndividual} />
                ))}
            </Slider>
        </section>
    );
}

export default ListaFilmes;
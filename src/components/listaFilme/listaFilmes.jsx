import React from 'react';
import Slider from 'react-slick';
import CardFilme from '../cardFilme/cardFilme';
import './listaFilmes.css';

// Importação dos estilos padrão do slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ListaFilmes({ tituloSecao, listaFilmes }) {
    
    // Configurações simplificadas para Desktop
    const configuracoesSlider = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6, // Exibe 6 filmes por vez em tela cheia
        slidesToScroll: 6, // Rola o bloco inteiro de 6 filmes por vez (estilo Netflix)
        initialSlide: 0,
        draggable: false, // Em desktop, geralmente desabilitamos o "arrastar" com mouse no carrossel principal
    };

    if (!listaFilmes || listaFilmes.length === 0) return null;

    return (
        <section className="secaoFilmes" aria-label={`Lista de filmes: ${tituloSecao}`}>
            <h2 className="tituloSecao">{tituloSecao}</h2>
            
            <Slider {...configuracoesSlider} className="carrosselLista">
                {listaFilmes.map((filmeIndividual) => (
                    <CardFilme key={filmeIndividual.id} filme={filmeIndividual} />
                ))}
            </Slider>
        </section>
    );
}

export default ListaFilmes;
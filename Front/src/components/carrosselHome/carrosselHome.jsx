import React from 'react';
import Slider from 'react-slick';
import './carrosselHome.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function CarrosselHome() {
    
    const filmesEmDestaque = [
 {
            id: 1,
            titulo: "Coringa: Delírio a Dois",
            descricao: "Arthur Fleck está internado em Arkham, aguardando julgamento por seus crimes como o Coringa. Enquanto lida com sua dupla identidade, ele não só se depara com o amor verdadeiro, mas encontra a música que sempre esteve dentro de si.",
            urlImagem: "https://www.cineflexx.com.br/wp-content/uploads/2024/09/Banner-J.png"
        },
        {
            id: 2,
            titulo: "Your Name",
            descricao: "Mitsuha e Taki são dois estranhos que vivem vidas completamente diferentes. Mas quando eles trocam de corpo misteriosamente, surge uma conexão que transcende tempo e espaço.",
            urlImagem: "https://i.pinimg.com/736x/fe/55/7d/fe557da0c62397779ad60bd102348287.jpg"
        },
        {
            id: 3,
            titulo: "Tropa de Elite",
            descricao: "Nascimento, capitão da Tropa de Elite do Rio de Janeiro, é designado para chefiar uma das equipes que tem como missão apaziguar o Morro do Turano. Ele precisa encontrar um substituto enquanto tenta derrubar o tráfico de drogas e criminosos.",
            urlImagem: "https://image.tmdb.org/t/p/original/nNUFlXdj8JIV6HnjVS58r0qCvE7.jpg"
        },
    ];

    const configuracoes = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false
    };

    return (
        <section 
            className="carrosselDestaqueContainer"
            aria-label="Carrossel de Filmes e Séries em Destaque"
        >
            <Slider 
                {...configuracoes}
                aria-roledescription="carrossel de conteúdo em destaque"
            >
                {filmesEmDestaque.map((filme) => (
                    <article className="slideDestaque" key={filme.id}>

                        <figure 
                            className="fundoDestaque" 
                            role="img" 
                            aria-label={`Pôster do filme: ${filme.titulo}`}
                            style={{ backgroundImage: `url(${filme.urlImagem})` }}
                        >
                            <main className="conteudoDestaque">
                                <span className="camadaEscura" /> 
                                <section className="textoDestaque">
                                    <h1>{filme.titulo}</h1>
                                    <p>{filme.descricao}</p>
                                    <nav className="botoesDestaque">
                                        <button className="botaoReproduzir">
                                            <i className="bi bi-play-fill"></i> Reproduzir
                                        </button>
                                        <button className="botaoInfo">
                                            Mais Informações
                                        </button>
                                    </nav>
                                </section>
                            </main>
                        </figure>
                    </article>
                ))}
            </Slider>
        </section>
    );
}

export default CarrosselHome;
import React from 'react';
import Slider from 'react-slick';
import './carrosselHome.css';

// Estilos necessários para o react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function CarrosselHome() {
    
    const filmesEmDestaque = [
        {
            id: 1,
            titulo: "Coringa: Delírio a Dois",
            descricao: "Arthur Fleck está internado em Arkham, aguardando julgamento por seus crimes como o Coringa. Enquanto lida com sua dupla identidade, ele não só se depara com o amor verdadeiro, mas encontra a música que sempre esteve dentro de si.",
            urlImagem: "https://ingresso-a.akamaihd.net/prd/img/movie/coringa-delirio-a-dois/759db388-74d0-406e-a533-9a66704e0a70.webp"
        },
        {
            id: 2,
            titulo: "Filme 2 de Ação",
            descricao: "Uma equipe de elite deve se infiltrar em uma base inimiga para desarmar um dispositivo que ameaça a segurança global.",
            urlImagem: "caminho_para_sua_imagem_de_fundo_2.jpg"
        },
        {
            id: 3,
            titulo: "Série 3 de Drama",
            descricao: "A vida de uma jovem médica muda drasticamente quando ela descobre um segredo de família há muito enterrado.",
            urlImagem: "caminho_para_sua_imagem_de_fundo_3.jpg"
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
                    // <article> é semântico para um item de conteúdo independente
                    <article className="slideDestaque" key={filme.id}>
                        {/* <figure> é usado para a imagem de fundo com descrição acessível */}
                        <figure 
                            className="fundoDestaque" 
                            role="img" 
                            aria-label={`Pôster do filme: ${filme.titulo}`}
                            style={{ backgroundImage: `url(${filme.urlImagem})` }}
                        >
                            {/* <main> para o conteúdo principal do destaque */}
                            <main className="conteudoDestaque">
                                {/* <span> substitui o <div> para o overlay (camada de escurecimento) */}
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
import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import './carrosselHome.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 

const mapaImagensHorizontais = {
    1: 'https://ovicio.com.br/wp-content/uploads/2020/08/20200802-filme-a-origem.jpg', 
    2: 'https://super.abril.com.br/wp-content/uploads/2024/01/2301-super-site23.jpg?quality=70&strip=info&w=1024', 
    7: 'https://blogs.uai.com.br/opipoqueiro/wp-content/uploads/sites/54/2021/10/Duna-01.jpg', 
};


function CarrosselHome({ destaques = [], loading }) {
    
    const configuracoes = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false
    };

    if (loading) {
        return (
            <section 
                className="carrosselDestaqueContainer"
                aria-label="Carregando destaques"
            >
                <article className="slideDestaque" style={{ backgroundColor: '#000' }}>
                </article>
            </section>
        );
    }

    return (
        <section 
            className="carrosselDestaqueContainer"
            aria-label="Carrossel de Filmes e Séries em Destaque"
        >
            <Slider 
                {...configuracoes}
                aria-roledescription="carrossel de conteúdo em destaque"
            >
                {destaques.map((filme) => {
                    
                    const imagemFinal = mapaImagensHorizontais[filme.id] || filme.urlImagem;

                    return (
                        <article className="slideDestaque" key={filme.id}>

                            <figure 
                                className="fundoDestaque" 
                                role="img" 
                                aria-label={`Pôster do filme: ${filme.titulo}`}
                                style={{ backgroundImage: `url(${imagemFinal})` }}
                            >
                                <main className="conteudoDestaque">
                                    <span className="camadaEscura" /> 
                                    <section className="textoDestaque">
                                        <h1>{filme.titulo}</h1>
                                        <p>{filme.descricao}</p>
                                        <nav className="botoesDestaque">
                                            <Link to={`/filme/${filme.id}`} className="botaoInfo">
                                                <i className="bi bi-info-circle"></i>
                                                Mais Informações
                                            </Link>
                                        </nav>
                                    </section>
                                </main>
                            </figure>
                        </article>
                    );
                })}
            </Slider>
        </section>
    );
}

export default CarrosselHome;
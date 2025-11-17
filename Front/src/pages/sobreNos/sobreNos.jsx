import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/navBar/navBar';
import Footer from '../../components/footer/footer';
import './sobreNos.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

function PaginaSobreNos() {
    const [tipoUsuario, setTipoUsuario] = useState(null);
    const navegar = useNavigate();

    useEffect(() => {
        const tipo = localStorage.getItem('tipo_usuario');
        if (!tipo) {
            navegar('/'); 
        } else {
            setTipoUsuario(tipo);
        }
    }, [navegar]);

    const lidarComLogout = (evento) => {
        evento.preventDefault();
        localStorage.removeItem('sessao_usuario');
        localStorage.removeItem('tipo_usuario');
        setTipoUsuario(null);
        navegar('/');
    };

    return (
        <>
            <NavBar tipoUsuario={tipoUsuario} aoSair={lidarComLogout} />
            
            <main className="paginaSobreNos">
                
                <header className="heroSobreNos">
                    <article className="heroConteudo">
                        <h1>Sobre a <span className="logo-gradient">lixs</span></h1>
                        <p className="subtituloHero">Nossa jornada para redefinir sua experiência de streaming.</p>
                    </article>
                </header>

                <section className="secaoSobreNos missao">
                    <article className="secaoConteudo">
                        <article className="textoMissao">
                            <h2>Nossa Missão</h2>
                            <p>Na lixs, nossa missão é simples: conectar pessoas a histórias que importam. Acreditamos que os filmes são mais do que entretenimento; são janelas para novos mundos, espelhos para nossas vidas e pontes para novas perspectivas. Estamos empenhados em criar uma plataforma que não apenas hospeda conteúdo, mas que celebra a arte do cinema e a comunidade que a rodeia.</p>
                            <p>Queremos que cada clique seja o início de uma nova descoberta, seja um clássico atemporal ou uma joia independente que você ainda não conhecia.</p>
                        </article>
                        <article className="iconeMissao">
                            <i className="bi bi-broadcast-pin"></i>
                        </article>
                    </article>
                </section>

                <section className="secaoSobreNos valores">
                    <h2>Nossos Valores</h2>
                    <article className="gridValores">
                        <article className="cardValor">
                            <i className="bi bi-lightbulb"></i>
                            <h3>Inovação</h3>
                            <p>Buscamos constantemente novas maneiras de melhorar sua experiência, desde a qualidade do streaming até a curadoria de conteúdo.</p>
                        </article>
                        <article className="cardValor">
                            <i className="bi bi-people"></i>
                            <h3>Comunidade</h3>
                            <p>Construímos um espaço onde usuários e criadores podem interagir, compartilhar suas paixões e cadastrar novos títulos.</p>
                        </article>
                        <article className="cardValor">
                            <i className="bi bi-shield-check"></i>
                            <h3>Confiança</h3>
                            <p>Garantimos um ambiente seguro e transparente, onde seus dados são protegidos e o conteúdo é verificado e aprovado.</p>
                        </article>
                    </article>
                </section>

                <section className="secaoSobreNos time">
                    <h2>Desenvolvedor</h2>
                    <p className="subtituloTime">A mente por trás da magia.</p>
                    <article className="gridTime">
                        
                        <article className="cardTime">
                            <img 
                                src="https://media.licdn.com/dms/image/v2/D4D03AQEHdWTOehP9yQ/profile-displayphoto-shrink_800_800/B4DZSoZbR6GcAg-/0/1737992026799?e=1764806400&v=beta&t=nXKpv34kXJ8lFEaZfFxMUGN0llqNKDsgaz05pIMlGSo" 
                                alt="Foto de Antônio Rodrigues" 
                                className="fotoTime"
                            />
                            <h4>Antônio Rodrigues</h4>
                            <p className="cargoTime">Full-Stack</p>
                        </article>


                    </article>
                </section>

            </main>

            <Footer />
        </>
    );
}

export default PaginaSobreNos;
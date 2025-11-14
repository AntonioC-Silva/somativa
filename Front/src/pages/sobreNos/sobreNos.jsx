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
                    <div className="heroConteudo">
                        <h1>Sobre a <span className="logo-gradient">lixs</span></h1>
                        <p className="subtituloHero">Nossa jornada para redefinir sua experiência de streaming.</p>
                    </div>
                </header>

                <section className="secaoSobreNos missao">
                    <div className="secaoConteudo">
                        <div className="textoMissao">
                            <h2>Nossa Missão</h2>
                            <p>Na lixs, nossa missão é simples: conectar pessoas a histórias que importam. Acreditamos que os filmes são mais do que entretenimento; são janelas para novos mundos, espelhos para nossas vidas e pontes para novas perspectivas. Estamos empenhados em criar uma plataforma que não apenas hospeda conteúdo, mas que celebra a arte do cinema e a comunidade que a rodeia.</p>
                            <p>Queremos que cada clique seja o início de uma nova descoberta, seja um clássico atemporal ou uma joia independente que você ainda não conhecia.</p>
                        </div>
                        <div className="iconeMissao">
                            <i className="bi bi-broadcast-pin"></i>
                        </div>
                    </div>
                </section>

                <section className="secaoSobreNos valores">
                    <h2>Nossos Valores</h2>
                    <div className="gridValores">
                        <div className="cardValor">
                            <i className="bi bi-lightbulb"></i>
                            <h3>Inovação</h3>
                            <p>Buscamos constantemente novas maneiras de melhorar sua experiência, desde a qualidade do streaming até a curadoria de conteúdo.</p>
                        </div>
                        <div className="cardValor">
                            <i className="bi bi-people"></i>
                            <h3>Comunidade</h3>
                            <p>Construímos um espaço onde usuários e criadores podem interagir, compartilhar suas paixões e cadastrar novos títulos.</p>
                        </div>
                        <div className="cardValor">
                            <i className="bi bi-shield-check"></i>
                            <h3>Confiança</h3>
                            <p>Garantimos um ambiente seguro e transparente, onde seus dados são protegidos e o conteúdo é verificado e aprovado.</p>
                        </div>
                    </div>
                </section>

                <section className="secaoSobreNos time">
                    <h2>Nossa Equipe</h2>
                    <p className="subtituloTime">As mentes por trás da magia.</p>
                    <div className="gridTime">
                        
                        <div className="cardTime">
                            <img 
                                src="https://placehold.co/400x400/111/CD39E7?text=Foto" 
                                alt="Foto de Antônio Rodrigues" 
                                className="fotoTime"
                            />
                            <h4>Antônio Rodrigues</h4>
                            <p className="cargoTime">Desenvolvedor Full-Stack</p>
                        </div>

                        <div className="cardTime">
                            <img 
                                src="https://placehold.co/400x400/111/00d8ff?text=Foto" 
                                alt="Foto de Jane Doe" 
                                className="fotoTime"
                            />
                            <h4>Jane Doe</h4>
                            <p className="cargoTime">Designer de UX/UI</p>
                        </div>

                        <div className="cardTime">
                            <img 
                                src="https://placehold.co/400x400/111/FFFFFF?text=Foto" 
                                alt="Foto de Alex Smith" 
                                className="fotoTime"
                            />
                            <h4>Alex Smith</h4>
                            <p className="cargoTime">Gerente de Conteúdo</p>
                        </div>

                    </div>
                </section>

            </main>

            <Footer />
        </>
    );
}

export default PaginaSobreNos;
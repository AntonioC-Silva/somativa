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
                                src="https://plus.unsplash.com/premium_photo-1664299631876-f143dc691c4d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZW5ncmElQzMlQTdhZG98ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000" 
                                alt="Foto de Antônio Rodrigues" 
                                className="fotoTime"
                            />
                            <h4>Antônio Rodrigues</h4>
                            <p className="cargoTime">Back-End</p>
                        </div>

                        <div className="cardTime">
                            <img 
                                src="https://i0.wp.com/omeudiadia.com.br/wp-content/uploads/2022/04/mili.jpg?resize=700%2C500&ssl=1" 
                                alt="Foto do Antônio Silva" 
                                className="fotoTime"
                            />
                            <h4>Antônio Silva</h4>
                            <p className="cargoTime">Front-End</p>
                        </div>

                        <div className="cardTime">
                            <img 
                                src="data:image/jpeg;base64,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" 
                                alt="Foto de Alex Smith" 
                                className="fotoTime"
                            />
                            <h4>Antônio Carlos</h4>
                            <p className="cargoTime">(DBA) Banco de Dados</p>
                        </div>

                    </div>
                </section>

            </main>

            <Footer />
        </>
    );
}

export default PaginaSobreNos;
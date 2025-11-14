import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/navBar/navBar';
import CarrosselHome from '../../components/carrosselHome/carrosselHome';
import Footer from '../../components/footer/footer';
import "./home.css"
import ListaFilmes from '../../components/listaFilme/listaFilmes';

function PaginaHome() {
    const [filmesDestaque, setFilmesDestaque] = useState([]);
    const [filmesAcao, setFilmesAcao] = useState([]);
    const [filmesSciFi, setFilmesSciFi] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [tipoUsuario, setTipoUsuario] = useState(null);
    const navegar = useNavigate();

    useEffect(() => {
        const tipo = localStorage.getItem('tipo_usuario');
        if (!tipo) {
            navegar('/'); 
        } else {
            setTipoUsuario(tipo);
        }

        const carregarFilmes = async () => {
            setLoading(true);
            setErro(null);
            try {
                const [respDestaques, respAcao, respSciFi] = await Promise.all([
                    fetch('http://localhost:8000/api/filmes'),
                    fetch('http://localhost:8000/api/filmes/genero/Ação'),
                    fetch('http://localhost:8000/api/filmes/genero/Ficção Científica')
                ]);

                if (!respDestaques.ok || !respAcao.ok || !respSciFi.ok) {
                    throw new Error('Falha ao buscar uma das listas de filmes');
                }

                const dadosDestaques = await respDestaques.json();
                const dadosAcao = await respAcao.json();
                const dadosSciFi = await respSciFi.json();

                if (dadosDestaques.sucesso) {
                    setFilmesDestaque(dadosDestaques.filmes.map(filme => ({
                        id: filme.id_filme,
                        titulo: filme.titulo,
                        descricao: filme.sinopse,
                        urlImagem: filme.poster,
                        urlCapa: filme.poster,
                        genero: filme.generos
                    })));
                }

                if (dadosAcao.sucesso) {
                    setFilmesAcao(dadosAcao.filmes.map(filme => ({
                        id: filme.id_filme,
                        titulo: filme.titulo,
                        urlCapa: filme.poster
                    })));
                }
                
                if (dadosSciFi.sucesso) {
                    setFilmesSciFi(dadosSciFi.filmes.map(filme => ({
                        id: filme.id_filme,
                        titulo: filme.titulo,
                        urlCapa: filme.poster
                    })));
                }

            } catch (err) {
                setErro(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (tipo) {
            carregarFilmes();
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
            <NavBar 
                tipoUsuario={tipoUsuario} 
                aoSair={lidarComLogout} 
            />
            
            <CarrosselHome destaques={filmesDestaque.slice(0, 3)} loading={loading} />
            
            <main className='home'>
                
                {loading && <p style={{color: 'white', textAlign: 'center'}}>Carregando filmes...</p>}
                {erro && <p style={{color: 'red', textAlign: 'center'}}>{erro}</p>}

                {!loading && !erro && (
                    <>
                        <ListaFilmes 
                            tituloSecao="Destaques" 
                            listaFilmes={filmesDestaque.slice(3, 13)} 
                        />

                        <ListaFilmes 
                            tituloSecao="Ação e Aventura" 
                            listaFilmes={filmesAcao} 
                        />

                         <ListaFilmes 
                            tituloSecao="Ficção Científica" 
                            listaFilmes={filmesSciFi}
                        />
                    </>
                )}
            </main>

            <Footer />
        </>
    )
}

export default PaginaHome;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/navBar/navBar';
import CarrosselHome from '../../components/carrosselHome/carrosselHome';
import Footer from '../../components/footer/footer';
import "./home.css"
import ListaFilmes from '../../components/listaFilme/listaFilmes';

function PaginaHome() {
    //estados pra guardar as listas dos filmes
    const [filmesParaCarrossel, setFilmesParaCarrossel] = useState([]);
    const [outrosFilmes, setOutrosFilmes] = useState([]);
    const [filmesAcao, setFilmesAcao] = useState([]);
    const [filmesSciFi, setFilmesSciFi] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [tipoUsuario, setTipoUsuario] = useState(null);
    const navegar = useNavigate();

    const IDS_CARROSSEL = [1, 2, 7]; 

    useEffect(() => {
        //ve se ta logado se n manda pro login
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
                    //busca tudo de uma vez
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
                    
                    const todosOsFilmes = dadosDestaques.filmes.map(filme => ({
                        id: filme.id_filme,
                        titulo: filme.titulo,
                        descricao: filme.sinopse,
                        urlImagem: filme.poster,
                        urlCapa: filme.poster,
                        genero: filme.generos
                    }));

                    const filmesCarrossel = [];
                    const filmesRestantes = [];

                    // separa oq vai pro carrossel e oq fica na lista normal
                    todosOsFilmes.forEach(filme => {
                        if (IDS_CARROSSEL.includes(filme.id)) {
                            filmesCarrossel.push(filme);
                        } else {
                            filmesRestantes.push(filme);
                        }
                    });

                    setFilmesParaCarrossel(filmesCarrossel);
                    setOutrosFilmes(filmesRestantes);
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
    //apaga o localstorage e manda pro login
    const lidarComLogout = (evento) => {
        evento.preventDefault();
        localStorage.removeItem('sessao_usuario');
        localStorage.removeItem('tipo_usuario');
        localStorage.removeItem('token_jwt');
        setTipoUsuario(null);
        navegar('/');
    };

    return (
        <>
            <NavBar 
                tipoUsuario={tipoUsuario} 
                aoSair={lidarComLogout} 
            />
            
            <CarrosselHome destaques={filmesParaCarrossel} loading={loading} />
            
            <main className='home'>
                
                {loading && <p style={{color: 'white', textAlign: 'center'}}>Carregando filmes...</p>}
                {erro && <p style={{color: 'red', textAlign: 'center'}}>{erro}</p>}

                {!loading && !erro && (
                    <>
                        <ListaFilmes 
                            tituloSecao="Destaques" 
                            listaFilmes={outrosFilmes.slice(0, 10)} 
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
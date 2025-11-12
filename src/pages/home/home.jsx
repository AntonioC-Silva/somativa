import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navBar/navBar';
import CarrosselHome from '../../components/carrosselHome/carrosselHome';
import Footer from '../../components/footer/footer';
import "./home.css"
import ListaFilmes from '../../components/listaFilme/listaFilmes';

function PaginaHome() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [usuarioLogado, setUsuarioLogado] = useState({ tipo: 'adm' }); 

    useEffect(() => {
        const carregarFilmes = async () => {
            setLoading(true);
            setErro(null);
            try {
                const resposta = await fetch('http://localhost:8000/api/filmes');
                if (!resposta.ok) {
                    throw new Error('Falha ao buscar filmes');
                }
                const dados = await resposta.json();
                
                if (dados.sucesso) {
                    const filmesTransformados = dados.filmes.map(filme => ({
                        id: filme.id_filme,
                        titulo: filme.titulo,
                        urlCapa: filme.poster,
                        descricao: filme.sinopse,
                        urlImagem: filme.poster,
                        genero: filme.genero 
                    }));
                    setFilmes(filmesTransformados);
                } else {
                    setErro(dados.erro);
                }
            } catch (err) {
                setErro(err.message);
            } finally {
                setLoading(false);
            }
        };

        carregarFilmes();
    }, []);

    const handleLogout = (evento) => {
        evento.preventDefault();
        alert("Usuário deslogado!");
        setUsuarioLogado(null);
    };

    const filmesAcao = filmes.filter(f => f.genero && f.genero.includes('Ação')).slice(0, 10);
    const filmesSciFi = filmes.filter(f => f.genero && f.genero.includes('Ficção')).slice(0, 10);
    const destaquesCarrossel = filmes.slice(0, 3);

    return (
        <>
            <NavBar 
                tipoUsuario={usuarioLogado ? usuarioLogado.tipo : null} 
                aoSair={handleLogout} 
            />
            
            <CarrosselHome destaques={destaquesCarrossel} loading={loading} />
            
            <main className='home'>
                
                {loading && <p style={{color: 'white', textAlign: 'center'}}>Carregando filmes...</p>}
                {erro && <p style={{color: 'red', textAlign: 'center'}}>{erro}</p>}

                {!loading && !erro && (
                    <>
                        <ListaFilmes 
                            tituloSecao="Destaques da Semana" 
                            listaFilmes={filmes.slice(0, 10)} 
                        />

                        <ListaFilmes 
                            tituloSecao="Ação e Aventura" 
                            listaFilmes={filmesAcao.length > 0 ? filmesAcao : filmes.slice(4, 14)} 
                        />

                         <ListaFilmes 
                            tituloSecao="Ficção Científica" 
                            listaFilmes={filmesSciFi.length > 0 ? filmesSciFi : filmes.slice(2, 12)}
                        />
                    </>
                )}
            </main>

            <Footer />
        </>
    )
}

export default PaginaHome;
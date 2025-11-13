import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/navBar/navBar';
import Filtros from '../../components/filtros/filtros';
import CardFilme from '../../components/cardFilme/cardFilme';
import Footer from '../../components/footer/footer';
import './categoria.css'; 

function PaginaCategoria(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(null);
    const [tipoUsuario, setTipoUsuario] = useState(null);
    const navegar = useNavigate();

    const buscarFilmes = async (termoBusca) => {
        setLoading(true);
        setErro(null);
        
        let url = 'http://localhost:8000/api/filmes';
        
        if (termoBusca && termoBusca.trim() !== '') {
            url = `http://localhost:8000/api/filmes/pesquisa?q=${encodeURIComponent(termoBusca)}`;
        }

        try {
            const resposta = await fetch(url);
            if (!resposta.ok) {
                throw new Error('Falha ao buscar dados do servidor');
            }
            const dados = await resposta.json();
            if (dados.sucesso) {
                setFilmes(dados.filmes);
            } else {
                setErro(dados.erro);
            }
        } catch (err) {
            setErro(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const tipo = localStorage.getItem('tipo_usuario');
        if (!tipo) {
            navegar('/');
        } else {
            setTipoUsuario(tipo);
        }
        buscarFilmes('');
    }, [navegar]);

    const lidarComLogout = (evento) => {
        evento.preventDefault();
        localStorage.removeItem('sessao_usuario');
        localStorage.removeItem('tipo_usuario');
        setTipoUsuario(null);
        navegar('/');
    };

    const lidarBusca = (termo) => {
        buscarFilmes(termo);
    };

    return(
        <div className="paginaCategoria">
            <NavBar tipoUsuario={tipoUsuario} aoSair={lidarComLogout} />
            <Filtros aoMudarBusca={lidarBusca} />
            
            <main className="containerCategoria">
                {loading && <p className="mensagemCarregando">Buscando...</p>}
                {erro && <p className="mensagemErro">Erro: {erro}</p>}
                
                {!loading && !erro && (
                    <div className="gradeFilmes">
                        {filmes.length > 0 ? (
                            filmes.map(filme => (
                                <CardFilme key={filme.id_filme} filme={{
                                    id: filme.id_filme,
                                    titulo: filme.titulo,
                                    urlCapa: filme.poster 
                                }} />
                            ))
                        ) : (
                            <p className="mensagemVazio">Nenhum filme encontrado.</p>
                        )}
                    </div>
                )}
            </main>
            
            <Footer/>
        </div>
    )
}

export default PaginaCategoria;
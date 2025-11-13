import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/navBar/navBar';
import Footer from '../../components/footer/footer';
import CardGerenciamento from '../../components/cardGerenciamento/cardGerenciamento';
import './gerenciarFilmes.css';

function PaginaGerenciarFilmes() {
    
    const [filmesPendentes, setFilmesPendentes] = useState([]);
    const [filmesAprovados, setFilmesAprovados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [tipoUsuario, setTipoUsuario] = useState(null);
    const navegar = useNavigate();

    const carregarDados = useCallback(async () => {
        setLoading(true);
        setErro(null);
        try {
            const [respPendentes, respAprovados] = await Promise.all([
                fetch('http://localhost:8000/api/filmes/pendentes'),
                fetch('http://localhost:8000/api/filmes')
            ]);

            const dadosPendentes = await respPendentes.json();
            const dadosAprovados = await respAprovados.json();

            if (dadosPendentes.sucesso) {
                setFilmesPendentes(dadosPendentes.filmes);
            } else {
                setErro(dadosPendentes.erro || 'Falha ao buscar filmes pendentes');
            }

            if (dadosAprovados.sucesso) {
                setFilmesAprovados(dadosAprovados.filmes);
            } else {
                setErro(dadosAprovados.erro || 'Falha ao buscar filmes aprovados');
            }
        } catch (err) {
            setErro('Erro de conexão. O servidor Python está rodando?');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const tipo = localStorage.getItem('tipo_usuario');
        if (tipo !== 'adm') {
            navegar('/home');
        } else {
            setTipoUsuario(tipo);
            carregarDados();
        }
    }, [navegar, carregarDados]);

    const lidarComLogout = (evento) => {
        evento.preventDefault();
        localStorage.removeItem('sessao_usuario');
        localStorage.removeItem('tipo_usuario');
        setTipoUsuario(null);
        navegar('/');
    };

    const lidarComRecusar = async (id) => {
        if (!window.confirm('Tem certeza que deseja recusar este filme?')) return;
        try {
            await fetch(`http://localhost:8000/api/filme-pendente/recusar/${id}`, { method: 'DELETE' });
            carregarDados();
        } catch (err) {
            setErro('Falha ao recusar filme.');
        }
    };

    const lidarComAprovar = async (id) => {
        try {
            await fetch(`http://localhost:8000/api/filme/aprovar/${id}`, { method: 'POST' });
            carregarDados();
        } catch (err) {
            setErro('Falha ao aprovar filme.');
        }
    };

    const lidarComRemover = async (id) => {
        if (!window.confirm('Tem certeza que deseja REMOVER este filme permanentemente?')) return;
        try {
            await fetch(`http://localhost:8000/api/filme/remover/${id}`, { method: 'DELETE' });
            carregarDados();
        } catch (err) {
            setErro('Falha ao remover filme.');
        }
    };

    return (
        <main className="paginaGerenciar">
            <NavBar tipoUsuario={tipoUsuario} aoSair={lidarComLogout} />
            
            <section className="secaoGerenciar">
                <h2 className="tituloFormulario">Solicitações Pendentes</h2>
                {loading && <p>Carregando...</p>}
                {erro && <p className="mensagemErro">{erro}</p>}
                {!loading && !erro && filmesPendentes.length === 0 && (
                    <p>Nenhum filme pendente.</p>
                )}
                <div className="listaGerenciar">
                    {filmesPendentes.map(filme => (
                        <CardGerenciamento 
                            key={`pendente-${filme.id_pendente}`}
                            filme={filme} 
                            tipo="pendente"
                            aoRecusar={() => lidarComRecusar(filme.id_pendente)}
                            aoAprovar={() => lidarComAprovar(filme.id_pendente)}
                        />
                    ))}
                </div>
            </section>
            
            <section className="secaoGerenciar">
                <h2 className="tituloFormulario">Filmes Aprovados</h2>
                {loading && <p>Carregando...</p>}
                {!loading && !erro && filmesAprovados.length === 0 && (
                    <p>Nenhum filme aprovado.</p>
                )}
                <div className="listaGerenciar">
                    {filmesAprovados.map(filme => (
                        <CardGerenciamento 
                            key={`aprovado-${filme.id_filme}`}
                            filme={filme} 
                            tipo="aprovado"
                            aoRemover={() => lidarComRemover(filme.id_filme)}
                            aoEditar={() => alert('Função editar não implementada.')}
                        />
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}

export default PaginaGerenciarFilmes;
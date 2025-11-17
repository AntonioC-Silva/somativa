import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/navBar/navBar';
import Footer from '../../components/footer/footer';
import CardGerenciamento from '../../components/cardGerenciamento/cardGerenciamento';
import ModalEdicao from '../../components/modalEdicao/modalEdicao';
import './gerenciarFilmes.css';

function PaginaGerenciarFilmes() {
    
    const [filmesPendentes, setFilmesPendentes] = useState([]);
    const [filmesAprovados, setFilmesAprovados] = useState([]);
    const [edicoesPendentes, setEdicoesPendentes] = useState([]); 
    
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [tipoUsuario, setTipoUsuario] = useState(null);
    const navegar = useNavigate();

    const [modalAberto, setModalAberto] = useState(false);
    const [filmeEditando, setFilmeEditando] = useState(null);
    const [erroModal, setErroModal] = useState(null);

    const carregarDados = useCallback(async () => {
        setLoading(true);
        setErro(null);
        try {
            const [respPendentes, respAprovados, respEdicoes] = await Promise.all([
                fetch('http://localhost:8000/api/filmes/pendentes'),
                fetch('http://localhost:8000/api/filmes'),
                fetch('http://localhost:8000/api/filmes/edicoes-pendentes') 
            ]);

            const dadosPendentes = await respPendentes.json();
            const dadosAprovados = await respAprovados.json();
            const dadosEdicoes = await respEdicoes.json(); 

            if (dadosPendentes.sucesso) {
                setFilmesPendentes(dadosPendentes.filmes);
            } else {
                setErro(erro => erro ? `${erro}, ${dadosPendentes.erro}` : dadosPendentes.erro || 'Falha ao buscar filmes pendentes');
            }

            if (dadosAprovados.sucesso) {
                setFilmesAprovados(dadosAprovados.filmes);
            } else {
                setErro(erro => erro ? `${erro}, ${dadosAprovados.erro}` : dadosAprovados.erro || 'Falha ao buscar filmes aprovados');
            }

         
            if (dadosEdicoes.sucesso) {
                setEdicoesPendentes(dadosEdicoes.edicoes);
            } else {
                setErro(erro => erro ? `${erro}, ${dadosEdicoes.erro}` : dadosEdicoes.erro || 'Falha ao buscar edições pendentes');
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

  
    
    const lidarRecusarEdicao = async (id_edicao) => {
        if (!window.confirm('Tem certeza que deseja recusar esta SUGESTÃO DE EDIÇÃO?')) return;
        try {
            await fetch(`http://localhost:8000/api/filme/edicao/recusar/${id_edicao}`, { method: 'DELETE' });
            carregarDados(); 
        } catch (err) {
            setErro('Falha ao recusar edição.');
        }
    };

    const lidarAprovarEdicao = async (id_edicao) => {
        if (!window.confirm('APROVAR esta edição irá sobrescrever os dados atuais do filme. Continuar?')) return;
        try {
            await fetch(`http://localhost:8000/api/filme/edicao/aprovar/${id_edicao}`, { method: 'POST' });
            carregarDados(); 
        } catch (err) {
            setErro('Falha ao aprovar edição.');
        }
    };

    const lidarAbrirModalEditar = async (filme) => {
        setErroModal(null);
        try {
            const resp = await fetch(`http://localhost:8000/api/filme/${filme.id_filme}`);
            const dados = await resp.json();
            if (dados.sucesso) {
                setFilmeEditando(dados.filme);
                setModalAberto(true);
            } else {
                setErro(dados.erro || 'Falha ao carregar dados do filme.');
            }
        } catch (err) {
            setErro('Erro de conexão ao buscar detalhes do filme.');
        }
    };

    const lidarFecharModal = () => {
        setModalAberto(false);
        setFilmeEditando(null);
        setErroModal(null);
    };

    const lidarSalvarEdicao = async (formData) => {
        setErroModal(null);
        try {
            const resp = await fetch(`http://localhost:8000/api/filme/${formData.id_filme}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const resultado = await resp.json();
            if (resultado.sucesso) {
                lidarFecharModal();
                carregarDados();
            } else {
                setErroModal(resultado.erro || 'Falha ao salvar.');
            }
        } catch (err) {
            setErroModal('Erro de conexão ao salvar.');
        }
    };

    return (
        <main className="paginaGerenciar">
            <NavBar tipoUsuario={tipoUsuario} aoSair={lidarComLogout} />
            
            <section className="secaoGerenciar">
                <h2 className="tituloFormulario">Solicitações de Novos Filmes</h2>
                {loading && <p>Carregando...</p>}
                {erro && <p className="mensagemErro">{erro}</p>}
                {!loading && !erro && filmesPendentes.length === 0 && (
                    <p>Nenhum filme pendente.</p>
                )}
                <article className="listaGerenciar">
                    {filmesPendentes.map(filme => (
                        <CardGerenciamento 
                            key={`pendente-${filme.id_pendente}`}
                            filme={filme} 
                            tipo="pendente"
                            aoRecusar={() => lidarComRecusar(filme.id_pendente)}
                            aoAprovar={() => lidarComAprovar(filme.id_pendente)}
                        />
                    ))}
                </article>
            </section>
            
       
            <section className="secaoGerenciar">
                <h2 className="tituloFormulario">Sugestões de Edição Pendentes</h2>
                {loading && <p>Carregando...</p>}
                {erro && <p className="mensagemErro">{erro}</p>}
                {!loading && !erro && edicoesPendentes.length === 0 && (
                    <p>Nenhuma sugestão de edição pendente.</p>
                )}
                <article className="listaGerenciar">
                    {edicoesPendentes.map(edicao => (
                        <CardGerenciamento 
                            key={`edicao-${edicao.id_edicao}`}
                            filme={edicao} 
                            tipo="edicao_pendente"
                            aoRecusar={() => lidarRecusarEdicao(edicao.id_edicao)}
                            aoAprovar={() => lidarAprovarEdicao(edicao.id_edicao)}
                        />
                    ))}
                </article>
            </section>
            
            <section className="secaoGerenciar">
                <h2 className="tituloFormulario">Filmes Aprovados (Catálogo)</h2>
                {loading && <p>Carregando...</p>}
                {!loading && !erro && filmesAprovados.length === 0 && (
                    <p>Nenhum filme aprovado.</p>
                )}
                <article className="listaGerenciar">
                    {filmesAprovados.map(filme => (
                        <CardGerenciamento 
                            key={`aprovado-${filme.id_filme}`}
                            filme={filme} 
                            tipo="aprovado"
                            aoRemover={() => lidarComRemover(filme.id_filme)}
                            aoEditar={() => lidarAbrirModalEditar(filme)}
                        />
                    ))}
                </article>
            </section>

            <Footer />

            {modalAberto && (
                <ModalEdicao 
                    filme={filmeEditando}
                    aoFechar={lidarFecharModal}
                    aoSalvar={lidarSalvarEdicao}
                    erro={erroModal}
                />
            )}
        </main>
    );
}

export default PaginaGerenciarFilmes;
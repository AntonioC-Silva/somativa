import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navBar/navBar';
import Footer from '../../components/footer/footer';
import ModalEdicao from '../../components/modalEdicao/modalEdicao';
import './detalheFilme.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

function PaginaDetalheFilme() {
    const { id } = useParams(); 
    const navegar = useNavigate();
    
    const [filme, setFilme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [tipoUsuario, setTipoUsuario] = useState(null);

    const [modalAberto, setModalAberto] = useState(false);
    const [erroModal, setErroModal] = useState(null);
    const [loadingModal, setLoadingModal] = useState(false); 

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token_jwt');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    };

    const carregarFilme = useCallback(async () => {
        setLoading(true);
        setErro(null);
        try {
            const resp = await fetch(`http://localhost:8000/api/filme/${id}`);
            const dados = await resp.json();
            if (dados.sucesso) {
                setFilme(dados.filme);
            } else {
                setErro(dados.erro || 'Filme não encontrado');
            }
        } catch (err) {
            setErro('Erro de conexão. O servidor Python está rodando?');
        } finally {
            setLoading(false);
        }
    }, [id]);

   
    useEffect(() => {
        const tipo = localStorage.getItem('tipo_usuario');
        if (!tipo) {
            navegar('/');
        } else {
            setTipoUsuario(tipo);
            carregarFilme();
        }
    }, [navegar, carregarFilme]);

    const lidarComLogout = (evento) => {
        evento.preventDefault();
        localStorage.removeItem('sessao_usuario');
        localStorage.removeItem('tipo_usuario');
        localStorage.removeItem('token_jwt');
        setTipoUsuario(null);
        navegar('/');
    };

    
    const lidarVoltar = () => {
        navegar(-1);
    };

   

    const lidarAbrirModal = () => {
        setErroModal(null);
        setModalAberto(true);
    };

    const lidarFecharModal = () => {
        setModalAberto(false);
        setErroModal(null);
    };


    const lidarSalvarAdmin = async (formData) => {
        setLoadingModal(true);
        setErroModal(null);
        try {
            const resp = await fetch(`http://localhost:8000/api/filme/${formData.id_filme}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(formData)
            });
            const resultado = await resp.json();
            if (resultado.sucesso) {
                lidarFecharModal();
                carregarFilme(); 
            } else {
                setErroModal(resultado.erro || 'Falha ao salvar.');
            }
        } catch (err) {
            setErroModal('Erro de conexão ao salvar.');
        } finally {
            setLoadingModal(false);
        }
    };

    const lidarSugerirEdicao = async (formData) => {
        setLoadingModal(true);
        setErroModal(null);
        
        try {
            const resp = await fetch(`http://localhost:8000/api/filme/sugerir-edicao/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const resultado = await resp.json();
            
            if (resultado.sucesso) {
                alert('Obrigado pela sugestão! Sua edição foi enviada para aprovação.');
                lidarFecharModal();
            } else {
                setErroModal(resultado.erro || 'Falha ao enviar sugestão.');
            }
        } catch (err) {
            setErroModal('Erro de conexão ao enviar sugestão.');
        } finally {
            setLoadingModal(false);
        }
    };


    return (
        <>
            <NavBar tipoUsuario={tipoUsuario} aoSair={lidarComLogout} />
            
            <main className="paginaDetalhe">
                {loading && <p className="detalheMensagem">Carregando...</p>}
                {erro && <p className="detalheMensagem erro">{erro}</p>}
                
                {filme && (
                    <article className="detalheContainer">
                        <figure className="detalhePoster">
                            <img src={filme.poster} alt={`Pôster de ${filme.titulo}`} />
                        </figure>
                        
                        <section className="detalheInfo">
                            <h1 className="detalheTitulo">{filme.titulo}</h1>
                            <span className="detalheAno">({filme.ano})</span>

                            <nav className="detalheBotoes">
                                <button onClick={lidarVoltar} className="botaoAcaoDetalhe voltar">
                                    <i className="bi bi-arrow-left"></i> Voltar
                                </button>
                                <button onClick={lidarAbrirModal} className="botaoAcaoDetalhe editar">
                                    <i className="bi bi-pencil"></i> Editar
                                </button>
                            </nav>
                            
                            <h3>Sinopse</h3>
                            <p className="detalheSinopse">{filme.sinopse}</p>

                            <h3>Elenco</h3>
                            <p className="detalheElenco">{filme.elenco}</p>
                            
                            <h3>Diretor</h3>
                            <p className="detalheDiretor">{filme.diretor_nome}</p>

                            <h3>Gêneros</h3>
                            <p className="detalheGeneros">{filme.generos}</p>

                            <h3>Duração</h3>
                            <p className="detalheDuracao">{filme.tempo_de_duracao}</p>
                        </section>
                    </article>
                )}
            </main>

            <Footer />

    
            {modalAberto && (
                <ModalEdicao 
                    filme={filme}
                    aoFechar={lidarFecharModal}
                    aoSalvar={tipoUsuario === 'adm' ? lidarSalvarAdmin : lidarSugerirEdicao}
                    erro={erroModal}
                    loading={loadingModal} 
                />
            )}
        </>
    );
}

export default PaginaDetalheFilme;
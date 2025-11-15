import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../../components/navBar/navBar';
import Footer from '../../components/footer/footer';
import ModalEdicao from '../../components/modalEdicao/modalEdicao';
import './detalheFilme.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

function PaginaDetalheFilme() {
    const { id } = useParams(); // Pega o 'id' da URL (ex: /filme/12)
    const navegar = useNavigate();
    
    const [filme, setFilme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [tipoUsuario, setTipoUsuario] = useState(null);

    const [modalAberto, setModalAberto] = useState(false);
    const [erroModal, setErroModal] = useState(null);
    const [loadingModal, setLoadingModal] = useState(false); // State de loading para o modal

    // Função para carregar os dados do filme
    const carregarFilme = useCallback(async () => {
        setLoading(true);
        setErro(null);
        try {
            // Usamos o endpoint existente para buscar um filme por ID
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

    // Carrega o tipo de usuário e os dados do filme ao iniciar
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
        setTipoUsuario(null);
        navegar('/');
    };

    // Função do botão "Voltar"
    const lidarVoltar = () => {
        navegar(-1); // Navega para a página anterior no histórico
    };

    // --- LÓGICA DE EDIÇÃO ---

    const lidarAbrirModal = () => {
        setErroModal(null);
        setModalAberto(true);
    };

    const lidarFecharModal = () => {
        setModalAberto(false);
        setErroModal(null);
    };

    // Salvar Edição (para ADM)
    const lidarSalvarAdmin = async (formData) => {
        setLoadingModal(true);
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
                carregarFilme(); // Recarrega os dados do filme na página
            } else {
                setErroModal(resultado.erro || 'Falha ao salvar.');
            }
        } catch (err) {
            setErroModal('Erro de conexão ao salvar.');
        } finally {
            setLoadingModal(false);
        }
    };

    // Sugerir Edição (para Usuário Comum)
    const lidarSugerirEdicao = async (formData) => {
        setLoadingModal(true);
        setErroModal(null);
        
        try {
            // Chama a NOVA ROTA que criamos no backend
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
                    <div className="detalheContainer">
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
                    </div>
                )}
            </main>

            <Footer />

            {/* O Modal de Edição, que será aberto conforme o estado */}
            {modalAberto && (
                <ModalEdicao 
                    filme={filme}
                    aoFechar={lidarFecharModal}
                    // Escolhe a função de salvar baseado no tipo de usuário
                    aoSalvar={tipoUsuario === 'adm' ? lidarSalvarAdmin : lidarSugerirEdicao}
                    erro={erroModal}
                    loading={loadingModal} // Passa o estado de loading
                />
            )}
        </>
    );
}

export default PaginaDetalheFilme;
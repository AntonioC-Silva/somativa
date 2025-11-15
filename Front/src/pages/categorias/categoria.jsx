import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../../components/navBar/navBar';
import Filtros from '../../components/filtros/filtros';
import CardFilme from '../../components/cardFilme/cardFilme';
import Footer from '../../components/footer/footer';
import './categoria.css'; 

function PaginaCategoria(){
    const [todosOsFilmes, setTodosOsFilmes] = useState([]);
    const [filmesFiltrados, setFilmesFiltrados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [tipoUsuario, setTipoUsuario] = useState(null);
    const navegar = useNavigate();
    const location = useLocation();

    const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const termoQuery = params.get('q') || '';
    const generoQuery = params.get('genero') || '';
    const anoQuery = params.get('ano') || '';
    const diretorQuery = params.get('diretor') || '';
    const atorQuery = params.get('ator') || '';

    useEffect(() => {
        const tipo = localStorage.getItem('tipo_usuario');
        if (!tipo) {
            navegar('/');
            return;
        }
        setTipoUsuario(tipo);

        const buscarTodosOsFilmes = async () => {
            setLoading(true);
            setErro(null);
            try {
                const resposta = await fetch('http://localhost:8000/api/filmes');
                if (!resposta.ok) {
                    throw new Error('Falha ao buscar dados do servidor');
                }
                const dados = await resposta.json();
                if (dados.sucesso) {
                    setTodosOsFilmes(dados.filmes);
                } else {
                    setErro(dados.erro);
                }
            } catch (err) {
                setErro(err.message);
            } finally {
                setLoading(false);
            }
        };

        buscarTodosOsFilmes();
    }, [navegar]); 

    useEffect(() => {
        if (todosOsFilmes.length === 0) return;

        let filmesTemp = [...todosOsFilmes];

        if (termoQuery) {
            filmesTemp = filmesTemp.filter(f => 
                f.titulo.toLowerCase().includes(termoQuery.toLowerCase())
            );
        }
        
        // --- LÓGICA DE GÊNERO MODIFICADA (AGORA É "E" / "AND") ---
        if (generoQuery) {
            // 1. Transforma a query "Ação,Comédia" em ["ação", "comédia"]
            const generosParaFiltrar = generoQuery.toLowerCase().split(',').filter(Boolean).map(g => g.trim());
            
            if (generosParaFiltrar.length > 0) {
                filmesTemp = filmesTemp.filter(f => {
                    if (!f.generos) return false;
                    // 2. Transforma os gêneros do filme "Ação, Aventura" em ["ação", "aventura"]
                    const generosDoFilme = f.generos.toLowerCase().split(',').map(g => g.trim());
                    
                    // 3. Verifica se TODOS os gêneros do filtro estão incluídos nos gêneros do filme (lógica E)
                    return generosParaFiltrar.every(generoFiltro => generosDoFilme.includes(generoFiltro));
                });
            }
        }
        // --- FIM DA MODIFICAÇÃO ---

        if (anoQuery) {
            filmesTemp = filmesTemp.filter(f => 
                f.ano.toString() === anoQuery
            );
        }
        if (diretorQuery) {
            filmesTemp = filmesTemp.filter(f => {
                const nomeCompleto = `${f.diretor_nome || ''} ${f.diretor_sobrenome || ''}`.toLowerCase();
                return nomeCompleto.includes(diretorQuery.toLowerCase());
            });
        }
        if (atorQuery) {
            filmesTemp = filmesTemp.filter(f => 
                f.elenco && f.elenco.toLowerCase().includes(atorQuery.toLowerCase())
            );
        }

        setFilmesFiltrados(filmesTemp);

    }, [location.search, todosOsFilmes, termoQuery, generoQuery, anoQuery, diretorQuery, atorQuery]);

    const lidarComLogout = (evento) => {
        evento.preventDefault();
        localStorage.removeItem('sessao_usuario');
        localStorage.removeItem('tipo_usuario');
        setTipoUsuario(null);
        navegar('/');
    };

    const aoAtualizarFiltros = (filtros) => {
        const params = new URLSearchParams();
        
        if (filtros.q) params.set('q', filtros.q);
        if (filtros.genero) params.set('genero', filtros.genero);
        if (filtros.ano) params.set('ano', filtros.ano);
        if (filtros.diretor) params.set('diretor', filtros.diretor);
        if (filtros.ator) params.set('ator', filtros.ator);
        
        navegar(`/categorias?${params.toString()}`);
    };

    return(
        <div className="paginaCategoria">
            <NavBar tipoUsuario={tipoUsuario} aoSair={lidarComLogout} />
            <Filtros 
                valoresIniciais={{
                    q: termoQuery,
                    genero: generoQuery,
                    ano: anoQuery,
                    diretor: diretorQuery,
                    ator: atorQuery
                }}
                aoAtualizarFiltros={aoAtualizarFiltros}
            />
            
            <main className="containerCategoria">
                {loading && <p className="mensagemCarregando">Carregando filmes...</p>}
                {erro && <p className="mensagemErro">Erro: {erro}</p>}
                
                {!loading && !erro && (
                    <div className="gradeFilmes">
                        {filmesFiltrados.length > 0 ? (
                            filmesFiltrados.map(filme => (
                                <CardFilme key={filme.id_filme} filme={{
                                    id: filme.id_filme,
                                    titulo: filme.titulo,
                                    urlCapa: filme.poster 
                                }} />
                            ))
                        ) : (
                            <p className="mensagemVazio">Nenhum filme encontrado para estes filtros.</p>
                        )}
                    </div>
                )}
            </main>
            
            <Footer/>
        </div>
    )
}

export default PaginaCategoria;
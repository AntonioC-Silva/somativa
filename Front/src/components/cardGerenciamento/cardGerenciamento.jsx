import React from 'react';
import './cardGerenciamento.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function CardGerenciamento({ filme, tipo, aoAprovar, aoRecusar, aoEditar, aoRemover }) {
    
    const posterPadrao = 'https://placehold.co/300x450/222/fff?text=Poster';
    
    // --- LÓGICA MODIFICADA PARA ACEITAR 'edicao_pendente' ---
    let titulo, ano, sinopse, elenco, generos, diretor;

    if (tipo === 'edicao_pendente') {
        // Dados de uma edição pendente
        titulo = `${filme.titulo} (Editando: ${filme.titulo_original})`;
        ano = filme.ano;
        sinopse = filme.sinopse;
        elenco = filme.elenco;
        generos = "N/A (Gênero não editável)"; // Gênero não foi incluído na sugestão
        diretor = "N/A (Diretor não editável)"; // Diretor não foi incluído na sugestão
    } else {
        // Dados de um filme (pendente ou aprovado)
        titulo = filme.titulo;
        ano = filme.ano;
        sinopse = filme.sinopse;
        generos = filme.genero_string || filme.generos || 'N/A';
        elenco = filme.elenco_string || filme.elenco || 'N/A';
        diretor = filme.diretor_sobrenome
            ? `${filme.diretor_nome || ''} ${filme.diretor_sobrenome || ''}`.trim()
            : (filme.diretor_nome || 'N/A');
    }
    // --- FIM DA LÓGICA MODIFICADA ---

    return (
        <article className={`cardGerenciamento ${tipo === 'edicao_pendente' ? 'cardEdicao' : ''}`}>
            <figure className="cardPoster">
                <img 
                    src={filme.poster || posterPadrao} 
                    alt={`poster do filme ${titulo}`} 
                    onError={(e) => e.currentTarget.src = posterPadrao}
                />
            </figure>
            <section className="cardInfo">
                <header>
                    {/* MODIFICADO: Usa a variável 'titulo' */}
                    <h3>{titulo}</h3> 
                    <p className="infoAno">{ano}</p>
                </header>
                <p className="infoSinopse">{sinopse}</p>
                <footer className="infoDetalhes">
                    {/* MODIFICADO: Esconde detalhes não editáveis para 'edicao_pendente' */}
                    {tipo !== 'edicao_pendente' && (
                        <p><strong>Diretor:</strong> {diretor}</p>
                    )}
                    <p><strong>Gêneros:</strong> {generos}</p>
                    <p><strong>Elenco:</strong> {elenco}</p>
                </footer>
            </section>
            
            {/* MODIFICADO: Lógica de botões para os 3 tipos */}
            {tipo === 'pendente' || tipo === 'edicao_pendente' ? (
                <nav className="cardAcoes">
                    <button 
                        className="botaoAcao aprovar" 
                        onClick={aoAprovar}
                        aria-label={`aprovar ${titulo}`}
                    >
                        <i className="bi bi-check-lg" aria-hidden="true"></i>
                        {tipo === 'pendente' ? 'Aceitar Filme' : 'Aprovar Edição'}
                    </button>
                    <button 
                        className="botaoAcao recusar" 
                        onClick={aoRecusar}
                        aria-label={`recusar ${titulo}`}
                    >
                        <i className="bi bi-x-lg" aria-hidden="true"></i>
                        Recusar
                    </button>
                </nav>
            ) : ( // tipo === 'aprovado'
                <nav className="cardAcoes">
                    <button 
                        className="botaoAcao editar" 
                        onClick={aoEditar}
                        aria-label={`editar filme ${titulo}`}
                    >
                        <i className="bi bi-pencil" aria-hidden="true"></i>
                        Editar
                    </button>
                    <button 
                        className="botaoAcao remover" 
                        onClick={aoRemover}
                        aria-label={`remover filme ${titulo}`}
                    >
                        <i className="bi bi-trash" aria-hidden="true"></i>
                        Remover
                    </button>
                </nav>
            )}
        </article>
    );
}

export default CardGerenciamento;
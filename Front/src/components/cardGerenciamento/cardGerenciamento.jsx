import React from 'react';
import './cardGerenciamento.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function CardGerenciamento({ filme, tipo, aoAprovar, aoRecusar, aoEditar, aoRemover }) {
    
    const posterPadrao = 'https://placehold.co/300x450/222/fff?text=Poster';
    

    let titulo, ano, sinopse, elenco, generos, diretor;

    if (tipo === 'edicao_pendente') {
        // Dados de uma edição pendente
        titulo = `${filme.titulo} (Editando: ${filme.titulo_original})`;
        ano = filme.ano;
        sinopse = filme.sinopse;
        elenco = filme.elenco;
        generos = "N/A (Gênero não editável)"; 
        diretor = "N/A (Diretor não editável)";
    } else {

        titulo = filme.titulo;
        ano = filme.ano;
        sinopse = filme.sinopse;
        generos = filme.genero_string || filme.generos || 'N/A';
        elenco = filme.elenco_string || filme.elenco || 'N/A';
        diretor = filme.diretor_sobrenome
            ? `${filme.diretor_nome || ''} ${filme.diretor_sobrenome || ''}`.trim()
            : (filme.diretor_nome || 'N/A');
    }


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
                    <h3>{titulo}</h3> 
                    <p className="infoAno">{ano}</p>
                </header>
                <p className="infoSinopse">{sinopse}</p>
                <footer className="infoDetalhes">
                    {tipo !== 'edicao_pendente' && (
                        <p><strong>Diretor:</strong> {diretor}</p>
                    )}
                    <p><strong>Gêneros:</strong> {generos}</p>
                    <p><strong>Elenco:</strong> {elenco}</p>
                </footer>
            </section>
            
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
            ) : (
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
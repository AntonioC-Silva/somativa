import React from 'react';
import './cardGerenciamento.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function CardGerenciamento({ filme, tipo, aoAprovar, aoRecusar, aoEditar, aoRemover }) {
    
    const posterPadrao = 'https://placehold.co/300x450/222/fff?text=Poster';
    
    const generos = filme.genero_string || filme.generos || 'N/A';
    const elenco = filme.elenco_string || filme.atores || 'N/A';
    const diretor = filme.diretor_nome || 'N/A';

    return (
        <article className="cardGerenciamento">
            <figure className="cardPoster">
                <img 
                    src={filme.poster || posterPadrao} 
                    alt={`poster do filme ${filme.titulo}`} 
                    onError={(e) => e.currentTarget.src = posterPadrao}
                />
            </figure>
            <section className="cardInfo">
                <header>
                    <h3>{filme.titulo}</h3>
                    <p className="infoAno">{filme.ano}</p>
                </header>
                <p className="infoSinopse">{filme.sinopse}</p>
                <footer className="infoDetalhes">
                    <p><strong>Diretor:</strong> {diretor}</p>
                    <p><strong>Gêneros:</strong> {generos}</p>
                    <p><strong>Elenco:</strong> {elenco}</p>
                </footer>
            </section>
            
            {tipo === 'pendente' ? (
                <nav className="cardAcoes">
                    <button 
                        className="botaoAcao aprovar" 
                        onClick={aoAprovar}
                        aria-label={`aprovar filme ${filme.titulo}`}
                    >
                        <i className="bi bi-check-lg" aria-hidden="true"></i>
                        Aceitar
                    </button>
                    <button 
                        className="botaoAcao recusar" 
                        onClick={aoRecusar}
                        aria-label={`recusar filme ${filme.titulo}`}
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
                        aria-label={`editar filme ${filme.titulo}`}
                    >
                        <i className="bi bi-pencil" aria-hidden="true"></i>
                        Editar
                    </button>
                    <button 
                        className="botaoAcao remover" 
                        onClick={aoRemover}
                        aria-label={`remover filme ${filme.titulo}`}
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
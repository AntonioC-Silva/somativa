import React, { useState } from 'react';
import './Filtros.css';
import NavBar from '../navBar/navBar';

const Filtros = () => {
  const [ano, setAno] = useState('');
  // Estado que guarda qual filtro está aberto no momento (ex: 'genero', 'ano' ou null)
  const [filtroAberto, setFiltroAberto] = useState(null);

  const manipularMudancaAno = (e) => {
    const novoValor = e.target.value.replace(/\D/g, ''); // Apenas números
    setAno(novoValor);
  };

  // Função que alterna a visibilidade. Se clicar no que já está aberto, ele fecha (null).
  const alternarFiltro = (e, nomeFiltro) => {
    e.preventDefault(); // Impede o comportamento nativo do navegador para o React controlar tudo
    setFiltroAberto(filtroAberto === nomeFiltro ? null : nomeFiltro);
  };

  return (
    <nav className="navegacaoFiltros" aria-label="Filtros de pesquisa">
      <ul className="listaFiltros">
        
        {/* --- Filtro: Gênero --- */}
        <li className="itemFiltro">
          <details className="detalhesFiltro" open={filtroAberto === 'genero'}>
            <summary className="sumarioFiltro" onClick={(e) => alternarFiltro(e, 'genero')}>
              Gênero
            </summary>
            <fieldset className="grupoOpcoes">
              <label className="legendaVisivel">Selecione os gêneros:</label>
              <label className="rotuloOpcao"><input type="checkbox" name="genero" value="acao" /> Ação</label>
              <label className="rotuloOpcao"><input type="checkbox" name="genero" value="comedia" /> Comédia</label>
              <label className="rotuloOpcao"><input type="checkbox" name="genero" value="drama" /> Drama</label>
              <label className="rotuloOpcao"><input type="checkbox" name="genero" value="ficcao" /> Ficção Científica</label>
            </fieldset>
          </details>
        </li>

        {/* --- Filtro: Ano --- */}
        <li className="itemFiltro">
          <details className="detalhesFiltro" open={filtroAberto === 'ano'}>
            <summary className="sumarioFiltro" onClick={(e) => alternarFiltro(e, 'ano')}>
              Ano
            </summary>
            <div className="conteudoInput">
              <label htmlFor="filtroAno" className="rotuloInput">Digite o ano (4 dígitos):</label>
              <input 
                type="text" 
                id="filtroAno" 
                className="campoTexto" 
                value={ano} 
                onChange={manipularMudancaAno} 
                maxLength={4} 
                placeholder="Ex: 2024" 
                inputMode="numeric" 
              />
            </div>
          </details>
        </li>

        {/* --- Filtro: Diretor --- */}
        <li className="itemFiltro">
          <details className="detalhesFiltro" open={filtroAberto === 'diretor'}>
            <summary className="sumarioFiltro" onClick={(e) => alternarFiltro(e, 'diretor')}>
              Diretor
            </summary>
            <div className="conteudoInput">
              <label htmlFor="filtroDiretor" className="rotuloInput">Nome do diretor:</label>
              <input type="text" id="filtroDiretor" className="campoTexto" placeholder="Ex: Tarantino" />
            </div>
          </details>
        </li>

        {/* --- Filtro: Ator/Atriz --- */}
        <li className="itemFiltro">
          <details className="detalhesFiltro" open={filtroAberto === 'ator'}>
            <summary className="sumarioFiltro" onClick={(e) => alternarFiltro(e, 'ator')}>
              Ator/Atriz
            </summary>
            <div className="conteudoInput">
              <label htmlFor="filtroAtor" className="rotuloInput">Nome do ator/atriz:</label>
              <input type="text" id="filtroAtor" className="campoTexto" placeholder="Ex: Fernanda Montenegro" />
            </div>
          </details>
        </li>

         {/* --- Filtro: País --- */}
         <li className="itemFiltro">
          <details className="detalhesFiltro" open={filtroAberto === 'pais'}>
            <summary className="sumarioFiltro" onClick={(e) => alternarFiltro(e, 'pais')}>
              País
            </summary>
            <div className="conteudoInput">
              <label htmlFor="filtroPais" className="rotuloInput">Nome do país de origem:</label>
              <input type="text" id="filtroPais" className="campoTexto" placeholder="Ex: Brasil" />
            </div>
          </details>
        </li>

      </ul>
    </nav>
  );
};

export default Filtros;
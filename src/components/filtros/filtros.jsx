import React, { useState, useEffect } from 'react';
import './filtros.css'; 

const generosDisponiveis = [
  'Ação', 'Aventura', 'Comédia', 'Drama', 'Ficção Científica',
  'Terror', 'Romance', 'Suspense', 'Animação', 'Fantasia'
];

function Filtros({ aoMudarBusca, aoMudarFiltro }) {
  const [ano, setAno] = useState('');
  const [filtroAberto, setFiltroAberto] = useState(null);
  const [termoBusca, setTermoBusca] = useState('');

  useEffect(() => {
    const idTimer = setTimeout(() => {
      if (aoMudarBusca) {
        aoMudarBusca(termoBusca);
      }
    }, 500);

    return () => {
      clearTimeout(idTimer);
    };
  }, [termoBusca, aoMudarBusca]);

  const manipularMudancaAno = (e) => {
    const novoValor = e.target.value.replace(/\D/g, ''); 
    setAno(novoValor);
  };

  const alternarFiltro = (e, nomeFiltro) => {
    e.preventDefault(); 
    setFiltroAberto(filtroAberto === nomeFiltro ? null : nomeFiltro);
  };

  const lidarMudancaBusca = (e) => {
    setTermoBusca(e.target.value);
  };

  return (
    <nav className="navegacaoFiltros" aria-label="Filtros de pesquisa">
      
      <div className="campoBuscaFiltro">
        <input 
          type='search' 
          placeholder='Buscar por título...' 
          aria-label="Buscar por título"
          value={termoBusca}
          onChange={lidarMudancaBusca}
        />
        <i className="bi bi-search iconeBuscaFiltro" aria-hidden="true"></i>
      </div>

      <ul className="listaFiltros">
        
        <li className="itemFiltro">
          <details className="detalhesFiltro" open={filtroAberto === 'genero'}>
            <summary className="sumarioFiltro" onClick={(e) => alternarFiltro(e, 'genero')}>
              Gênero
            </summary>
            <fieldset className="grupoOpcoes">
              <label className="legendaVisivel">Selecione os gêneros:</label>
              {generosDisponiveis.map(genero => (
                 <label key={genero} className="rotuloOpcao">
                   <input type="checkbox" name="genero" value={genero} /> {genero}
                 </label>
              ))}
            </fieldset>
          </details>
        </li>

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

      </ul>
    </nav>
  );
};

export default Filtros;
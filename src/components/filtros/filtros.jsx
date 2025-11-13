import React, { useState, useEffect } from 'react';
import './filtros.css'; 

const generosDisponiveis = [
  'Ação', 'Aventura', 'Comédia', 'Drama', 'Ficção Científica',
  'Terror', 'Romance', 'Suspense', 'Animação', 'Fantasia'
];

function Filtros({ valoresIniciais, aoAtualizarFiltros }) {
    
    const [filtroAberto, setFiltroAberto] = useState(null);

    const [tempAno, setTempAno] = useState(valoresIniciais.ano || '');
    const [tempDiretor, setTempDiretor] = useState(valoresIniciais.diretor || '');
    const [tempAtor, setTempAtor] = useState(valoresIniciais.ator || '');
    const [generoSel, setGeneroSel] = useState(valoresIniciais.genero || '');

    useEffect(() => {
        setTempAno(valoresIniciais.ano || '');
        setTempDiretor(valoresIniciais.diretor || '');
        setTempAtor(valoresIniciais.ator || '');
        setGeneroSel(valoresIniciais.genero || '');
    }, [valoresIniciais]);

    const alternarFiltro = (e, nomeFiltro) => {
        e.preventDefault();
        const estaAbrindo = filtroAberto !== nomeFiltro;
        
        setFiltroAberto(estaAbrindo ? nomeFiltro : null);
        
        if (estaAbrindo) {
            setTempAno(valoresIniciais.ano || '');
            setTempDiretor(valoresIniciais.diretor || '');
            setTempAtor(valoresIniciais.ator || '');
        }
    };

    const lidarAplicarFiltro = (nomeFiltro) => {
        const novosFiltros = { ...valoresIniciais };

        if (nomeFiltro === 'ano') {
            novosFiltros.ano = tempAno;
        } else if (nomeFiltro === 'diretor') {
            novosFiltros.diretor = tempDiretor;
        } else if (nomeFiltro === 'ator') {
            novosFiltros.ator = tempAtor;
        }
        
        aoAtualizarFiltros(novosFiltros);
        setFiltroAberto(null); 
    };

    const lidarMudancaGenero = (e) => {
        const novoGenero = e.target.value;
        setGeneroSel(novoGenero);
        aoAtualizarFiltros({ ...valoresIniciais, genero: novoGenero });
        setFiltroAberto(null);
    };

    const lidarLimparGenero = (e) => {
        e.preventDefault();
        setGeneroSel('');
        aoAtualizarFiltros({ ...valoresIniciais, genero: '' });
        setFiltroAberto(null);
    };

    return (
        <nav className="navegacaoFiltros" aria-label="Filtros de pesquisa">
            
            <ul className="listaFiltros">
                
                <li className="itemFiltro">
                    <details className="detalhesFiltro" open={filtroAberto === 'genero'}>
                        <summary className="sumarioFiltro" onClick={(e) => alternarFiltro(e, 'genero')}>
                        Gênero
                        </summary>
                        <fieldset className="grupoOpcoes">
                            <label className="legendaVisivel">Selecione um gênero:</label>
                            {generosDisponiveis.map(genero => (
                                <label key={genero} className="rotuloOpcao">
                                <input 
                                    type="radio" 
                                    name="genero" 
                                    value={genero}
                                    checked={generoSel === genero}
                                    onChange={lidarMudancaGenero}
                                /> 
                                {genero}
                                </label>
                            ))}
                            <button className="botaoLimpar" onClick={lidarLimparGenero}>
                                Limpar Gênero
                            </button>
                        </fieldset>
                    </details>
                </li>

                <li className="itemFiltro">
                    <details className="detalhesFiltro" open={filtroAberto === 'ano'}>
                        <summary className="sumarioFiltro" onClick={(e) => alternarFiltro(e, 'ano')}>
                        Ano
                        </summary>
                        <div className="conteudoInput">
                        <label htmlFor="filtroAno" className="rotuloInput">Filtrar por Ano:</label>
                        <input 
                            type="text" 
                            id="filtroAno" 
                            name="ano"
                            className="campoTexto" 
                            value={tempAno} 
                            onChange={(e) => setTempAno(e.target.value)} 
                            maxLength={4} 
                            placeholder="Ex: 2023" 
                            inputMode="numeric" 
                        />
                        <button className="botaoAplicar" onClick={() => lidarAplicarFiltro('ano')}>OK</button>
                        </div>
                    </details>
                </li>

                <li className="itemFiltro">
                    <details className="detalhesFiltro" open={filtroAberto === 'diretor'}>
                        <summary className="sumarioFiltro" onClick={(e) => alternarFiltro(e, 'diretor')}>
                        Diretor
                        </summary>
                        <div className="conteudoInput">
                        <label htmlFor="filtroDiretor" className="rotuloInput">Filtrar por Diretor:</label>
                        <input 
                            type="text" 
                            id="filtroDiretor"
                            name="diretor"
                            className="campoTexto" 
                            value={tempDiretor} 
                            onChange={(e) => setTempDiretor(e.target.value)} 
                            placeholder="Ex: Nolan" 
                        />
                        <button className="botaoAplicar" onClick={() => lidarAplicarFiltro('diretor')}>OK</button>
                        </div>
                    </details>
                </li>

                <li className="itemFiltro">
                    <details className="detalhesFiltro" open={filtroAberto === 'ator'}>
                        <summary className="sumarioFiltro" onClick={(e) => alternarFiltro(e, 'ator')}>
                        Ator (Elenco)
                        </summary>
                        <div className="conteudoInput">
                        <label htmlFor="filtroAtor" className="rotuloInput">Filtrar por Ator:</label>
                        <input 
                            type="text" 
                            id="filtroAtor"
                            name="ator"
                            className="campoTexto" 
                            value={tempAtor} 
                            onChange={(e) => setTempAtor(e.target.value)} 
                            placeholder="Ex: DiCaprio" 
                        />
                        <button className="botaoAplicar" onClick={() => lidarAplicarFiltro('ator')}>OK</button>
                        </div>
                    </details>
                </li>

            </ul>
        </nav>
    );
};

export default Filtros;
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
    
    // MODIFICADO: Estado para múltiplos gêneros (array)
    const [generosSel, setGenerosSel] = useState(
        valoresIniciais.genero ? valoresIniciais.genero.split(',').filter(Boolean) : []
    );

    useEffect(() => {
        setTempAno(valoresIniciais.ano || '');
        setTempDiretor(valoresIniciais.diretor || '');
        setTempAtor(valoresIniciais.ator || '');
        // MODIFICADO: Sincroniza o estado do array com os valores iniciais
        setGenerosSel(
            valoresIniciais.genero ? valoresIniciais.genero.split(',').filter(Boolean) : []
        );
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

    // MODIFICADO: Lógica para checkbox (múltipla seleção)
    const lidarMudancaGenero = (e) => {
        const { value, checked } = e.target;
        let novosGeneros;

        if (checked) {
            novosGeneros = [...generosSel, value];
        } else {
            novosGeneros = generosSel.filter(g => g !== value);
        }

        setGenerosSel(novosGeneros);
        aoAtualizarFiltros({ ...valoresIniciais, genero: novosGeneros.join(',') });
    };

    // MODIFICADO: Limpa o array de gêneros
    const lidarLimparGenero = (e) => {
        e.preventDefault();
        setGenerosSel([]);
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
                                    type="checkbox" // MODIFICADO: de 'radio' para 'checkbox'
                                    name="genero" 
                                    value={genero}
                                    checked={generosSel.includes(genero)} // MODIFICADO: verifica se 'includes' no array
                                    onChange={lidarMudancaGenero} // MODIFICADO: usa a nova função
                                /> 
                                {genero}
                                </label>
                            ))}
                            <button className="botaoLimpar" onClick={lidarLimparGenero}>
                                Limpar Gêneros
                            </button>
                        </fieldset>
                    </details>
                </li>

                {/* O restante dos filtros (Ano, Diretor, Ator) permanece igual */}
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
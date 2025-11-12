import React, { useState } from 'react';
import NavBar from '../../components/navBar/navBar';
import './cadastroFilme.css';

const generosDisponiveis = [
  'Ação', 'Aventura', 'Comédia', 'Drama', 'Ficção Científica',
  'Terror', 'Romance', 'Suspense', 'Animação', 'Fantasia'
];

function SelecaoCustomizada({ opcoes, valor, aoMudar, placeholder }) {
  const [estaAberto, setEstaAberto] = useState(false);
  const lidarComClique = () => setEstaAberto(!estaAberto);

  const lidarCliqueOpcao = (valorOpcao) => {
    const estaSelecionado = valor.includes(valorOpcao);
    if (estaSelecionado) {
      aoMudar(valor.filter(v => v !== valorOpcao));
    } else {
      aoMudar([...valor, valorOpcao]);
    }
  };

  const obterTextoExibido = () => {
    if (valor.length === 0) return placeholder;
    if (valor.length === 1) return valor[0];
    return `${valor.length} gêneros selecionados`;
  };

  return (
    <div className="containerSelecaoCustom">
      <div 
        className={`valorSelecaoCustom ${valor.length === 0 ? 'placeholder' : ''}`}
        onClick={lidarComClique}
        tabIndex={0}
      >
        {obterTextoExibido()}
      </div>
      {estaAberto && (
        <div className="opcoesSelecaoCustom">
          {opcoes.map((opcao) => (
            <div 
              key={opcao}
              className={`opcaoSelecaoCustom ${valor.includes(opcao) ? 'selecionado' : ''}`}
              onClick={() => lidarCliqueOpcao(opcao)}
            >
              {opcao}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CadastroFilme() {
  const [titulo, setTitulo] = useState('');
  const [orcamento, setOrcamento] = useState('');
  const [diretor, setDiretor] = useState('');
  const [duracao, setDuracao] = useState('');
  const [ano, setAno] = useState('');
  const [produtora, setProdutora] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [elenco, setElenco] = useState('');
  const [generosSelecionados, setGenerosSelecionados] = useState([]);
  const [sinopse, setSinopse] = useState('');
  
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  const lidarComEnvio = async (evento) => {
    evento.preventDefault();
    setLoading(true);
    setMensagem('');

    const [horas = '0', minutos = '0', segundos = '0'] = duracao.split(':');
    const totalSegundos = (parseInt(horas, 10) * 3600) +
                         (parseInt(minutos, 10) * 60) +
                         (parseInt(segundos, 10));

    if (generosSelecionados.length === 0) {
      setMensagem('Erro: Por favor, selecione pelo menos um gênero.');
      setLoading(false);
      return; 
    }

    const dadosFilme = {
      titulo: titulo,
      orcamento: parseFloat(orcamento),
      nomeDiretor: diretor,
      tempoDeDuracao: totalSegundos,
      ano: parseInt(ano, 10),
      elenco: elenco,
      genero: generosSelecionados.join(', '), 
      nomeProdutora: produtora,
      poster: posterUrl,
      sinopse: sinopse,
    };

    try {
      const resposta = await fetch('http://localhost:8000/api/filmes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosFilme),
      });

      const resultado = await resposta.json();

      if (resposta.ok && resultado.sucesso) {
        setMensagem('Filme cadastrado com sucesso!');
        setTitulo('');
        setOrcamento('');
        setDiretor('');
        setDuracao('');
        setAno('');
        setProdutora('');
        setPosterUrl('');
        setElenco('');
        setGenerosSelecionados([]);
        setSinopse('');
      } else {
        setMensagem(`Erro ao cadastrar: ${resultado.erro || 'Erro desconhecido'}`);
      }
    } catch (erro) {
      console.error("Erro de rede:", erro);
      setMensagem('Erro de conexão. O servidor Python está rodando?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <> 
      <NavBar tipoUsuario="adm" /> 

      <form className="formularioFilme" onSubmit={lidarComEnvio}>
        <fieldset className="grupoCampos" disabled={loading}>
          <legend className="tituloFormulario">Cadastrar Novo Filme</legend>

          <section className="containerGrid">
            
            <article className="colunaFormulario">
              <label htmlFor="titulo" className="rotulo">Título do Filme:</label>
              <input 
                type="text" 
                id="titulo" 
                className="campo"
                placeholder="Ex: Um Sonho de Liberdade"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required 
              />
              <label htmlFor="diretor" className="rotulo">Diretor:</label>
              <input 
                type="text" 
                id="diretor" 
                className="campo"
                placeholder="Ex: Frank Darabont"
                value={diretor}
                onChange={(e) => setDiretor(e.target.value)}
                required
              />
              <label htmlFor="duracao" className="rotulo">Duração (HH:MM:SS):</label>
              <input 
                type="time" 
                id="duracao" 
                className="campo"
                step="1"
                value={duracao}
                onChange={(e) => setDuracao(e.target.value)}
                required
              />
            </article>
            
            <article className="colunaFormulario">
              <label htmlFor="orcamento" className="rotulo">Orçamento:</label>
              <input 
                type="number" 
                id="orcamento" 
                className="campo"
                placeholder="Ex: 25000000"
                min="0"
                value={orcamento}
                onChange={(e) => setOrcamento(e.target.value)}
                required
              />
              <label htmlFor="ano" className="rotulo">Ano de Lançamento:</label>
              <input 
                type="number" 
                id="ano" 
                className="campo"
                placeholder="Ex: 1994"
                min="1888"
                max={new Date().getFullYear() + 1}
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                required
              />
              <label htmlFor="produtora" className="rotulo">Produtora:</label>
              <input 
                type="text" 
                id="produtora" 
                className="campo"
                placeholder="Ex: Castle Rock Entertainment"
                value={produtora}
                onChange={(e) => setProdutora(e.target.value)}
                required
              />
            </article>
          </section>

          <label htmlFor="poster" className="rotulo">URL do Pôster (Vertical):</label>
          <input 
            type="url" 
            id="poster" 
            className="campo"
            placeholder="https://..."
            value={posterUrl}
            onChange={(e) => setPosterUrl(e.target.value)}
            required
          />
          <label htmlFor="elenco" className="rotulo">Elenco (separado por vírgula):</label>
          <input 
            type="text" 
            id="elenco" 
            className="campo"
            placeholder="Ex: Tim Robbins, Morgan Freeman"
            value={elenco}
            onChange={(e) => setElenco(e.target.value)}
            required
          />
          <label htmlFor="genero" className="rotulo">Gênero:</label>
          <SelecaoCustomizada
            opcoes={generosDisponiveis}
            valor={generosSelecionados}
            aoMudar={setGenerosSelecionados}
            placeholder="Selecione os gêneros..."
          />
          <label htmlFor="sinopse" className="rotulo">Sinopse:</label>
          <textarea 
            id="sinopse" 
            className="campoArea"
            placeholder="Descreva o filme..."
            value={sinopse}
            onChange={(e) => setSinopse(e.target.value)}
            required
          ></textarea>
          
          {mensagem && (
            <div 
              className="mensagemFormulario" 
              style={{
                color: mensagem.startsWith('Erro') ? '#ff6b6b' : '#51cf66',
                textAlign: 'center',
                marginBottom: '1rem',
                fontSize: '1rem'
              }}
            >
              {mensagem}
            </div>
          )}

          <button type="submit" className="botaoEnvio" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar Pedido de Cadastro'}
          </button>
        </fieldset>
      </form>
    </>
  );
}

export default CadastroFilme;
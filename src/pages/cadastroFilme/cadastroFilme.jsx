import React, { useState } from 'react';
import './cadastroFilme.css'; // Vamos atualizar este CSS

function CadastroFilme() {
  // Estados para cada campo do formulário
  const [titulo, setTitulo] = useState('');
  const [orcamento, setOrcamento] = useState('');
  const [diretor, setDiretor] = useState('');
  const [ano, setAno] = useState('');
  const [duracao, setDuracao] = useState('');
  const [produtora, setProdutora] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [elenco, setElenco] = useState('');
  const [generos, setGeneros] = useState('');
  const [sinopse, setSinopse] = useState('');

  // Função "pré-configurada" para o backend
  const lidarComEnvio = (evento) => {
    evento.preventDefault();
    
    // 1. Monta o objeto de dados pronto para o backend
    const dadosFilme = {
      titulo,
      orcamento: parseFloat(orcamento),
      nomeDiretor: diretor,
      tempoDeDuracao: parseInt(duracao, 10), // Duração em minutos
      ano: parseInt(ano, 10),
      // O backend tratará essas strings separadas por vírgula
      elenco: elenco,
      generos: generos,
      nomeProdutora: produtora,
      poster: posterUrl,
      sinopse: sinopse, // Campo novo da imagem
    };

    // 2. A lógica do backend (fetch, axios) virá aqui
    console.log('Dados prontos para envio:', dadosFilme);
    
    // Ex: 
    // try {
    //   const resposta = await api.post('/filmes', dadosFilme);
    //   alert('Filme cadastrado!');
    // } catch (erro) {
    //   alert('Erro ao cadastrar filme.');
    // }
  };

  return (
    <form className="formularioFilme" onSubmit={lidarComEnvio}>
      <fieldset className="grupoCampos">
        <legend className="tituloFormulario">Cadastrar Novo Filme</legend>

        {/* --- GRADE DE DUAS COLUNAS --- */}
        <section className="containerGrid">
          
          {/* Coluna 1 */}
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

            <label htmlFor="duracao" className="rotulo">Duração (em minutos):</label>
            <input 
              type="number" 
              id="duracao" 
              className="campo"
              placeholder="Ex: 142"
              min="1"
              value={duracao}
              onChange={(e) => setDuracao(e.target.value)}
              required
            />
          </article>
          
          {/* Coluna 2 */}
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

        {/* --- CAMPOS DE LARGURA TOTAL --- */}
        
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

        <label htmlFor="generos" className="rotulo">Gêneros (separado por vírgula):</label>
        <input 
          type="text" 
          id="generos" 
          className="campo"
          placeholder="Ex: Drama, Crime"
          value={generos}
          onChange={(e) => setGeneros(e.target.value)}
          required
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
        
        {/* --- BOTÃO DE ENVIO --- */}
        <button type="submit" className="botaoEnvio">
          Enviar Pedido de Cadastro
        </button>
      </fieldset>
    </form>
  );
}

export default CadastroFilme;
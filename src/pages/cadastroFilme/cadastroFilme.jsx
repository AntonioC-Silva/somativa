import React, { useState } from 'react';
import NavBar from '../../components/navBar/navBar';
import './cadastroFilme.css';

const generosDisponiveis = [
  'Ação', 'Aventura', 'Comédia', 'Drama', 'Ficção Científica',
  'Terror', 'Romance', 'Suspense', 'Animação', 'Fantasia'
];

function CustomSelect({ options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleOptionClick = (optionValue) => {
    const isSelected = value.includes(optionValue);
    if (isSelected) {
      onChange(value.filter(v => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const getDisplayText = () => {
    if (value.length === 0) return placeholder;
    if (value.length === 1) return value[0];
    return `${value.length} gêneros selecionados`;
  };

  return (
    <div className="custom-select-container">
      <div 
        className={`custom-select-value ${value.length === 0 ? 'placeholder' : ''}`}
        onClick={handleToggle}
        tabIndex={0}
      >
        {getDisplayText()}
      </div>

      {isOpen && (
        <div className="custom-select-options">
          {options.map((option) => (
            <div 
              key={option}
              className={`custom-select-option ${value.includes(option) ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
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
  const [selectedGeneros, setSelectedGeneros] = useState([]);
  const [sinopse, setSinopse] = useState('');

  const lidarComEnvio = (evento) => {
    evento.preventDefault();

    const [horas = '0', minutos = '0', segundos = '0'] = duracao.split(':');
    const totalSegundos = (parseInt(horas, 10) * 3600) +
                         (parseInt(minutos, 10) * 60) +
                         (parseInt(segundos, 10));

    if (selectedGeneros.length === 0) {
      console.error("Por favor, selecione pelo menos um gênero.");
      return; 
    }

    const dadosFilme = {
      titulo,
      orcamento: parseFloat(orcamento),
      nomeDiretor: diretor,
      tempoDeDuracao: totalSegundos,
      ano: parseInt(ano, 10),
      elenco: elenco,
      genero: selectedGeneros.join(', '),
      nomeProdutora: produtora,
      poster: posterUrl,
      sinopse: sinopse,
    };

    console.log('Dados prontos para envio:', dadosFilme);
  };

  return (
    <> 
      <NavBar/>

      <form className="formularioFilme" onSubmit={lidarComEnvio}>
        <fieldset className="grupoCampos">
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
          <CustomSelect
            options={generosDisponiveis}
            value={selectedGeneros}
            onChange={setSelectedGeneros}
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
          
          <button type="submit" className="botaoEnvio">
            Enviar Pedido de Cadastro
          </button>
        </fieldset>
      </form>
    </>
  );
}

export default CadastroFilme;
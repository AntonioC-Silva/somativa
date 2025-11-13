import React, { useState } from 'react';
import './loginPainel.css';
import { Link, useNavigate } from 'react-router-dom';

function PainelLogin() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navegar = useNavigate();

  const lidarComLogin = async (evento) => {
    evento.preventDefault();
    setLoading(true);
    setErro('');

    try {
      const resposta = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha })
      });

      const dados = await resposta.json();

      if (resposta.ok && dados.sucesso) {
        localStorage.setItem('sessao_usuario', JSON.stringify(dados.usuario));
        localStorage.setItem('tipo_usuario', dados.tipo); 
        navegar('/home'); 
      } else {
        setErro(dados.erro || 'Erro desconhecido');
      }
    } catch (err) {
      setErro('Erro de conexão. O servidor Python está rodando?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="loginPainel">
      <form className="loginForm" onSubmit={lidarComLogin}>
        <h2>Login</h2>
        
        <label htmlFor="usuario">Usuário:</label>
        <input 
          type="text" 
          id="usuario" 
          name="usuario" 
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        
        <label htmlFor="senha">Senha:</label>
        <input 
          type="password" 
          id="senha" 
          name="senha" 
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        
        {erro && <p className="formErro">{erro}</p>}
        
        <a href="#" className="link">Esqueceu a senha?</a>
        <button type="submit" className="enterBotao" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        
        <p className="link">
          Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </form> 
    </section>
  );
}

export default PainelLogin;
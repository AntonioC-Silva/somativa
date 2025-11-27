import React, { useState } from 'react';
import '../loginPainel/loginPainel.css';
import { Link, useNavigate } from 'react-router-dom';

function PainelCadastro() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState(''); 
  const [loading, setLoading] = useState(false);
  const navegar = useNavigate();

  const lidarComEnvio = async (evento) => {
    evento.preventDefault();
    setErro(''); 
    //validação se as senhas são iguais
    if (senha !== confirmarSenha) {
      setErro('As senhas não são iguais.');
      return; 
    }
    //regex para gararantir (letra maiuscula, minuscula, numero, caracter especial e no minimo 8 caracteres)
    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{8,}$/;
    if (!regexSenha.test(senha)) {
      setErro('Senha: 8+ chars, maiúscula, minúscula, número e especial.');
      return;
    }

    setLoading(true);
    try {
      //manda no back pra criar o usuario
      const resposta = await fetch('http://localhost:8000/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha })
      });

      const dados = await resposta.json();

      if (resposta.ok && dados.sucesso) {
        alert('Cadastro realizado com sucesso! Faça o login.');
        navegar('/'); 
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
      <form className="loginForm" onSubmit={lidarComEnvio}>
        <h2>Cadastro</h2>

        <label htmlFor="usuario">Usuário:</label>
        <input 
          type="text" 
          id="usuario" 
          name="usuario" 
          placeholder="EX: Antônio123" 
          value={usuario} 
          onChange={(e) => setUsuario(e.target.value)} 
          required
        />

        <label htmlFor="senha">Senha:</label>
        <input 
          type="password" 
          id="senha" 
          name="senha" 
          placeholder="EX: A1b345@4"
          value={senha}
          onChange={(e) => setSenha(e.target.value)} 
          required
        />

        <label htmlFor="confirmarSenha">Confirmar Senha:</label>
        <input 
          type="password" 
          id="confirmarSenha" 
          name="confirmarSenha" 
          placeholder="Confirmar Senha" 
          value={confirmarSenha} 
          onChange={(e) => setConfirmarSenha(e.target.value)} 
          required
        />

        {erro && <p className="formErro">{erro}</p>}

        <button type="submit" className="enterBotao" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p className="link">Já tem conta? <Link to="/">Faça Login</Link></p>
      </form>
    </section>
  );
}

export default PainelCadastro;
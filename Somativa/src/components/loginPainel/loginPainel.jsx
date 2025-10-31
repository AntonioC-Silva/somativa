import React from 'react';
import './loginPainel.css';

function PainelLogin() {
  return (
  
    <section className="loginPainel">
      
      <form className="loginForm">
        <h2>Login</h2>
        
        <label htmlFor="usuario">Usuário:</label>
        <input type="text" id="usuario" name="usuario" />
        
        <label htmlFor="senha">Senha:</label>
        <input type="password" id="senha" name="senha" />
        
        <a href="#" className="link">Esqueceu a senha?</a>
        <button type="submit" className="enterBotao">Entrar</button>
        
        <p className="link">
          Não tem conta? <a href="#">Cadastre-se</a>
        </p>
      </form> 

    </section>
  );
}

export default PainelLogin;
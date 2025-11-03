import React from 'react';
import '../loginPainel/loginPainel.css';

function CadastroPainel() {
  return (
  
    <section className="loginPainel">
      
      <form className="loginForm">
        <h2>Cadastro</h2>
        
        <label htmlFor="usuario">Usuário:</label>
        <input type="text" id="usuario" name="usuario" placeholder='EX: Antônio123'/>
        
        <label htmlFor="senha">Senha:</label>
        <input type="password" id="senha" name="senha" placeholder='EX: A12345@4' minlength="8"
        title="A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial (!@#$%^&*-)."
        required/>

        <label htmlFor="senha">Confirmar Senha:</label>
        <input type="password" id="senha" name="senha" placeholder='Confirmar Senha' />
        
    
        <button type="submit" className="enterBotao">Entrar</button>
        
        <p className="link">
          Já tem conta? <a href="../pages/login/login.jsx">Faça Login</a>
        </p>
      </form> 

    </section>
  );
}

export default CadastroPainel;
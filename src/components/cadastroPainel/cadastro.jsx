import React, { useState } from 'react'; // 1. Importe o useState
import '../loginPainel/loginPainel.css';
import { Link } from 'react-router-dom';

function CadastroPainel() {

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState(''); 

 
  const envio = (event) => {
    event.preventDefault();
    setErro(''); 


    if (senha !== confirmarSenha) {
      setErro('As senhas não são iguais.');
      return; 
    }

 
    // regras para criar a senha (n sei como vai ficar isso n banco depois)
    // (?=.*[a-z]) - Pelo menos uma letra minúscula
    // (?=.*[A-Z]) - Pelo menos uma letra maiúscula
    // (?=.*\d) - Pelo menos um número
    // (?=.*[!@#$%^&*-]) - Pelo menos um caractere especial
    // .{8,} - Pelo menos 8 caracteres no total
    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{8,}$/;

    if (!regexSenha.test(senha)) {
      setErro('A senha não atende aos requisitos. verifique se a pelo menos uma letra maiuscula e minuscula, 8 caracteres e um caracter especial!');
      return;
    }

    console.log('senha ok!', { usuario, senha });
    alert('Cadastro realizado com sucesso!');
  };

  return (
    <section className="loginPainel">

      <form className="loginForm" onSubmit={envio}>
        <h2>Cadastro</h2>

        <label htmlFor="usuario">Usuário:</label>
        <input type="text" id="usuario" name="usuario" placeholder="EX: Antônio123" value={usuario} 
        onChange={(e) => setUsuario(e.target.value)} required/>

        <label htmlFor="senha">Senha:</label>
        <input type="password" id="senha" name="senha" placeholder="EX: A1b345@4"value={senha}
          onChange={(e) => setSenha(e.target.value)} required/>

        <label htmlFor="confirmarSenha">Confirmar Senha:</label>
        <input type="password" id="confirmarSenha" name="confirmarSenha" placeholder="Confirmar Senha" value={confirmarSenha} 
          onChange={(e) => setConfirmarSenha(e.target.value)} required/>

        {erro && <p className="formErro">{erro}</p>}

        <button type="submit" className="enterBotao">Entrar</button>

        <p className="link">Já tem conta? <Link to="/">Faça Login</Link></p>
      </form>
    </section>
  );
}

export default CadastroPainel;
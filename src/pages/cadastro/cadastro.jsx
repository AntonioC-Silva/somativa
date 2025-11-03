import React, { useState } from 'react';
import Intro from '../../components/intro/intro.jsx';
import CadastroPainel from "../../components/cadastroPainel/cadastro.jsx";
import '../login/login.css';

function PaginaCadastro() {
  const [loginAtivo, setloginAtivo] = useState(false);

  // Esta função é chamada quando a animação da intro termina
  const terminouIntro = () => {
    setTimeout(() => {
      setloginAtivo(true);
    }, 1000); 
  };

  return (
    <main className={`autenticacao ${loginAtivo ? 'loginAtivo' : ''}`}>
      
      <CadastroPainel />
      <Intro/>
      

    </main>
  );
}

export default PaginaCadastro;
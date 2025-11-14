import React, { useState } from 'react';
import Painel from "../../components/painel/painel.jsx";
import PainelLogin from "../../components/loginPainel/loginPainel.jsx";
import './login.css';

function PaginaLogin() {
  const [loginAtivo, setloginAtivo] = useState(false);

  // Esta função é chamada quando a animação da intro termina
  const terminouIntro = () => {
    setTimeout(() => {
      setloginAtivo(true);
    }, 1000); 
  };

  return (
    <main className={`autenticacao ${loginAtivo ? 'loginAtivo' : ''}`}>
      
      <Painel terminouIntro={terminouIntro} />
      
      <PainelLogin />

    </main>
  );
}

export default PaginaLogin;
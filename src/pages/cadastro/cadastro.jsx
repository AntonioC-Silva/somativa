import React, { useState, useEffect } from 'react';
import Painel from '../../components/painel/painel.jsx'; // Importamos o Painel
import CadastroPainel from "../../components/cadastroPainel/cadastro.jsx";
import './cadastro.css'; // Importamos o NOVO CSS de cadastro

function PaginaCadastro() {
  const [cadastroAtivo, setCadastroAtivo] = useState(false);

  const terminouIntro = () => {
    setCadastroAtivo(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCadastroAtivo(true);
    }, 100); 
    
    return () => clearTimeout(timer);
  }, []); 

  return (
    
    <main className={`autenticacao cadastroPage ${cadastroAtivo ? 'cadastroAtivo' : ''}`}>
      
      
      <CadastroPainel />
      <Painel terminouIntro={terminouIntro} pularIntro={false} showCarrossel={true}/>
      
    </main>
  );
}

export default PaginaCadastro;
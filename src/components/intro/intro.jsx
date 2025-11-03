import React, { useEffect } from 'react';
import './intro.css';

function Intro({ terminouIntro }) { 
  
  useEffect(() => {
    const ultimaLetra = 1.0;
    const duracaoAnimacao = 1.0;
    const tempoTotalAnimacao = (ultimaLetra + duracaoAnimacao) * 1000;

    const temporizador = setTimeout(() => {
      const h1 = document.querySelector('.textoRecortado');
      if (h1) {
        h1.classList.add('finalizado');
        
        if (terminouIntro) {
          terminouIntro();
        }
      }
    }, tempoTotalAnimacao + 100); 

    return () => clearTimeout(temporizador);
  
  }, [terminouIntro]); 

  return (
      <h1 className="textoRecortado" aria-label="lixs">
        <span>l</span>
        <span>i</span>
        <span>x</span>
        <span>s</span>
      </h1>
  );
}

export default Intro;
import React, { useState, useEffect } from 'react';
import './carrosel.css';

const textos = [
  "Os lançamento e novidades do cinema direto na sua TELA",
  "Milhares de filmes para você assistir.",
  "Crie sua conta e comece agora mesmo."
];

function Carrossel() {
  const [indice, setIndice] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const idIntervalo = setInterval(() => {

      setFade(true);

      setTimeout(() => {
        setIndice((indiceAtual) => (indiceAtual + 1) % textos.length);
        setFade(false);
        
      },500); 

      
    },4000); 

    return () => clearInterval(idIntervalo);
  }, []);

  return (
    <div className="carrossel">
      <p className={fade?'fade':''}>{textos[indice]}</p>
    </div>
  );
}

export default Carrossel;
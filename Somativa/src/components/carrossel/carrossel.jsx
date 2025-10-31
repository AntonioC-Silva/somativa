import React, { useState, useEffect } from 'react';
import './carrosel.css';

const textos = [
  "Os lançamento e novidades do cinema direto na sua TELA",
  "Milhares de filmes e séries para você assistir.",
  "Crie sua conta e comece agora mesmo."
];

function Carrossel() {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const idIntervalo = setInterval(() => {
      setIndice((indiceAtual) => (indiceAtual + 1) % textos.length);
    }, 4000); 

    return () => clearInterval(idIntervalo);
  }, []);

  return (
    <div className="carrossel">
      <p>{textos[indice]}</p>
    </div>
  );
}

export default Carrossel;
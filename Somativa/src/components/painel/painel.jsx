import React from 'react';
import Intro from '../intro/intro.jsx';
import Carrossel from '../carrosel/carrosel';
import './Painel.css';

function Painel({ terminouIntro }) {
  return (
    <aside className="painel">
      <Intro terminouIntro={terminouIntro} />
      <Carrossel />
    </aside> 
  );
}

export default Painel;
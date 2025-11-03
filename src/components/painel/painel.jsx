import React from 'react';
import Intro from '../intro/intro'
import Carrossel from '../carrossel/carrossel'

import './painel.css';

function Painel({ terminouIntro }) {
  return (
    <aside className="painel">
      <Intro terminouIntro={terminouIntro} />
      <Carrossel/>

    </aside> 
  );
}

export default Painel;
import React from 'react';
import Intro from '../intro/intro'
import Carrossel from '../carrossel/carrossel'

import './painel.css';


function Painel({ terminouIntro, pularIntro= true, showCarrossel = true }) {
  return (
    <aside className="painel">
      <Intro terminouIntro={terminouIntro} pularIntro={pularIntro} />
      {showCarrossel && <Carrossel/>}

    </aside> 
  );
}

export default Painel;
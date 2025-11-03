import React from 'react';
import Intro from '../intro/intro'

import './painel.css';

function Painel({ terminouIntro }) {
  return (
    <aside className="painel">
      <Intro terminouIntro={terminouIntro} />

    </aside> 
  );
}

export default Painel;
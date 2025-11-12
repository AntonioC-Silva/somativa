import './App.css'
import { Routes, Route } from 'react-router-dom' 

import PaginaLogin from './pages/login/login'
import PaginaCadastro from './pages/cadastro/cadastro'
import PaginaHome from './pages/home/home'

import NavBar from './components/navBar/navBar'
import Footer from './components/footer/footer'
import CadastroFilme from './pages/cadastroFilme/cadastroFilme'

// --- PÁGINAS TEMPORÁRIAS (Placeholders) ---

function PaginaAdicionarFilme() {
  const aoSairSimulado = (e) => {
    e.preventDefault();
    alert('Simulando logout...');
  }
  
  return (
    <>
      <NavBar tipoUsuario="comum" aoSair={aoSairSimulado} />
      <main style={{ paddingTop: '80px', background: '#141414', minHeight: 'calc(100vh - 140px)', color: 'white' }}>
        <h1 style={{ paddingTop: '40px' }}>Página de Adicionar Filme</h1>
        <p>Aqui virá o formulário para adicionar um novo filme.</p>
      </main>
      <Footer />
    </>
  )
}

function PaginaGerenciarFilmes() {
  const aoSairSimulado = (e) => {
    e.preventDefault();
    alert('Simulando logout...');
  }

  return (
    <>
      <NavBar tipoUsuario="adm" aoSair={aoSairSimulado} />
      <main style={{ paddingTop: '80px', background: '#141414', minHeight: 'calc(100vh - 140px)', color: 'white' }}>
        <h1 style={{ paddingTop: '40px' }}>Página de Gerenciar Filmes (Admin)</h1>
        <p>Aqui virá a interface para gerenciar os filmes.</p>
      </main>
      <Footer />
    </>
  )
}

// --- COMPONENTE PRINCIPAL APP ---
function App() {
  
  return (

    <CadastroFilme/>
  )
}

export default App
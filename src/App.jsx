import './App.css'
import { Routes, Route } from 'react-router-dom' 

import PaginaLogin from './pages/login/login.jsx'
import PaginaCadastro from './pages/cadastro/cadastro.jsx'
import PaginaHome from './pages/home/home.jsx'
import PaginaCategoria from './pages/categorias/categoria.jsx'
import CadastroFilme from './pages/cadastroFilme/cadastroFilme.jsx'
import PaginaGerenciarFilmes from './pages/gerenciarFilmes/gerenciarFilmes.jsx'


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<PaginaLogin />} />
      <Route path="/cadastro" element={<PaginaCadastro />} />
      <Route path="/home" element={<PaginaHome />} />
      <Route path="/categorias" element={<PaginaCategoria />} />
      <Route path="/adicionarFilmes" element={<CadastroFilme />} />
      <Route path="/gerenciarFilmes" element={<PaginaGerenciarFilmes />} />
    </Routes>
  )
}

export default App
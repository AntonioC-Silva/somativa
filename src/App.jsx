import './App.css'
import { Routes, Route } from 'react-router-dom' 
import PaginaLogin from '../src/pages/login/login'
import PaginaCadastro from './pages/cadastro/cadastro'

function App() {
  return (
    // 2. Defina suas rotas aqui
    <Routes>
      <Route path="/" element={<PaginaLogin />} />
      <Route path="/cadastro" element={<PaginaCadastro />} />
    </Routes>
  )
}

export default App
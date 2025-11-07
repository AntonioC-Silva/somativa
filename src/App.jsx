import './App.css'
import { Routes, Route } from 'react-router-dom' 
import PaginaLogin from '../src/pages/login/login'
import PaginaCadastro from './pages/cadastro/cadastro'
import Footer from './components/footer/footer'
import CarrosselHome from './components/carrosselHome/carrosselHome'

function App() {
  return (
    // 2. Defina suas rotas aqui
    <>
      <CarrosselHome/>
    </>
  )
}

export default App
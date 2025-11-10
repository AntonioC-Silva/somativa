import './App.css'
import { Routes, Route } from 'react-router-dom' 
import PaginaLogin from '../src/pages/login/login'
import PaginaCadastro from './pages/cadastro/cadastro'
import Footer from './components/footer/footer'
import CarrosselHome from './components/carrosselHome/carrosselHome'
import Filtros from './components/filtros/filtros'
import NavBar from './components/navBar/navBar'
import PaginaHome from './pages/home/home'
import CardFilme from './components/cardFilme/cardFilme'

function App() {
  return (

    <>
      <PaginaHome/>
    </>
  )
}

export default App
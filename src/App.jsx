import { useState } from 'react'
import './App.css'
import PaginaLogin from '../src/pages/login/login'
import PaginaCadastro from './pages/cadastro/cadastro'

function App() {

  const handle = () => {
    console.log("intro terminou")
  }
  return (
    <>
      
       <PaginaLogin/>
       <PaginaCadastro/>
    </>
  )
}

export default App

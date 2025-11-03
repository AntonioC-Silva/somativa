import { useState } from 'react'
import './App.css'
import Intro from './components/intro/intro'
import PaginaLogin from './pages/login/login'
import Painel from './components/painel/painel'

function App() {

  const handle = () => {
    console.log("intro terminou")
  }
  return (
    <>
      
       <PaginaLogin/>
    </>
  )
}

export default App

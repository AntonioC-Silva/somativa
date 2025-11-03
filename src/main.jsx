import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

// 1. Importe apenas as PÁGINAS
import PaginaCadastro from './pages/cadastro/cadastro.jsx'
import App from './App.jsx'

// 2. Crie as rotas
const router = createBrowserRouter([
  {
    path: "/", // A rota principal agora vai direto para o Login
    element: <App />, 
  },
   {
    path: "/cadastro", // A rota de cadastro
    element: <PaginaCadastro />, 
  },
]);

// 3. Renderize o Roteador
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
// src/components/navBar/navBar.jsx
import './navBar.css';
import React, { useState } from 'react'; // 1. Importa o useState
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

// 2. Componente recebe "tipoUsuario" e a função "aoSair"
function NavBar({ tipoUsuario, aoSair }) {
    // 3. Estado para controlar se o menu está aberto ou fechado
    const [menuAberto, setMenuAberto] = useState(false);

    // Define a classe de cor baseada no tipo de usuário
    const classeIcone = tipoUsuario === 'adm' ? 'icon-adm' : 'icon-comum';

    // Função para lidar com o clique no link de Sair
    const lidarComLogout = (evento) => {
        evento.preventDefault(); // Impede o link de navegar
        aoSair(evento);          // Chama a função de logout passada por props
        setMenuAberto(false);    // Garante que o menu feche
    };

    return (
        // 4. Tag <header> semântica
        <header className="navBar">
            
            <Link to="#home" className="logoNav">lixs</Link>

            <form className="campoBusca">
                <input type='search' placeholder='Buscar...' aria-label="Campo de busca"/>
                <button type="submit" className="iconeBusca" aria-label="Buscar">
                    {/* 5. Ícone acessível com <span> */}
                    <span className="bi bi-search" aria-hidden="true"></span>
                </button>
            </form>

            {/* 6. Tag <nav> semântica para navegação principal */}
            <nav className="menuNav" aria-label="Navegação principal">
                <ul>
                    <li><Link to="#home">Início</Link></li>
                    <li><Link to="#about">Sobre Nós</Link></li>
                    <li><Link to="#services">Catálogo</Link></li>
                </ul>
            </nav>

            {/* 7. Renderização condicional: só mostra se estiver logado */}
            {tipoUsuario && (
                // 8. Tag <nav> semântica para o menu do usuário
                <nav className="menuUsuario" aria-label="Menu do usuário">
                    
                    {/* 9. Um <button> acessível para abrir/fechar o menu */}
                    <button 
                        type="button"
                        className={`botaoMenuUsuario ${classeIcone}`}
                        onClick={() => setMenuAberto(!menuAberto)} // Alterna o estado
                        aria-expanded={menuAberto} // Informa se está aberto
                        aria-controls="dropdown-usuario" // Controla o elemento abaixo
                        aria-label="Abrir menu do usuário"
                    >
                        <span className="bi bi-person-circle" aria-hidden="true"></span>
                    </button>
                    
                    {/* 10. O menu dropdown (uma <ul> semântica) */}
                    <ul 
                        id="dropdown-usuario" 
                        className={`dropdownConteudo ${menuAberto ? 'aberto' : ''}`} // Classe dinâmica
                        role="menu" // Define o papel de acessibilidade
                    >
                        {tipoUsuario === 'adm' ? (
                            <li role="none">
                                <Link to="/gerenciarFilmes" role="menuitem">Gerenciar Filmes</Link>
                            </li>
                        ) : (
                            <li role="none">
                                <Link to="/adicionarFilmes" role="menuitem">Adicionar Filme</Link>
                            </li>
                        )}
                        
                        <li role="none">
                            <a href="#" onClick={lidarComLogout} role="menuitem">Sair</a>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}

export default NavBar;
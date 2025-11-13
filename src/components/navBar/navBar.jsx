import './navBar.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

function NavBar({ tipoUsuario, aoSair }) {
    const [menuAberto, setMenuAberto] = useState(false);
    const [termoBusca, setTermoBusca] = useState('');
    const navegar = useNavigate();

    const classeIcone = tipoUsuario === 'adm' ? 'icon-adm' : 'icon-comum';

    const lidarComLogout = (evento) => {
        evento.preventDefault(); 
        aoSair(evento);          
        setMenuAberto(false);    
    };

    const lidarSubmitBusca = (evento) => {
        evento.preventDefault();
        if (termoBusca.trim()) {
            navegar(`/categorias?q=${encodeURIComponent(termoBusca)}`);
        }
    };

    return (
        <header className="navBar">
            
            <Link to="/home" className="logoNav">lixs</Link>

            <form className="campoBusca" onSubmit={lidarSubmitBusca}>
                <input 
                    type='search' 
                    placeholder='Buscar...' 
                    aria-label="Campo de busca"
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                />
                <button type="submit" className="iconeBusca" aria-label="Buscar">
                    <span className="bi bi-search" aria-hidden="true"></span>
                </button>
            </form>

            <nav className="menuNav" aria-label="Navegação principal">
                <ul>
                    <li><Link to="/home">Início</Link></li>
                    <li><Link to="/sobre">Sobre Nós</Link></li>
                    <li><Link to="/categorias">Catálogo</Link></li>
                </ul>
            </nav>

            {tipoUsuario && (
                <nav className="menuUsuario" aria-label="Menu do usuário">
                    
                    <button 
                        type="button"
                        className={`botaoMenuUsuario ${classeIcone}`}
                        onClick={() => setMenuAberto(!menuAberto)}
                        aria-expanded={menuAberto}
                        aria-controls="dropdown-usuario"
                        aria-label="Abrir menu do usuário"
                    >
                        <span className="bi bi-person-circle" aria-hidden="true"></span>
                    </button>
                    
                    <ul 
                        id="dropdown-usuario" 
                        className={`dropdownConteudo ${menuAberto ? 'aberto' : ''}`}
                        role="menu"
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
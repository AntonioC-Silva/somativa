// navBar.js
import './navBar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

function NavBar() {
    return (
        <header className="navBar">
            
            <Link to="#home" className="logoNav">lixs</Link>

            <form className="campoBusca">
                <input type='search' placeholder='Buscar...'/>
                <button type="submit" className="iconeBusca" alt="Buscar">
                    <i className="bi bi-search"></i>
                </button>
            </form>


            <nav className="menuNav">
                <ul>
                    <li><Link to="#home">Início</Link></li>
                    <li><Link to="#about">Sobre Nós</Link></li>
                    <li><Link to="#services">Catálogo</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;
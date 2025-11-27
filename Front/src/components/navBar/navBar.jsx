import './navBar.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

function NavBar({ tipoUsuario, aoSair }) {
    const [menuAberto, setMenuAberto] = useState(false);
    const [termoBusca, setTermoBusca] = useState('');
    const navegar = useNavigate();

    // muda a cor do icone se for adm ou usuario normal
    const classeIcone = tipoUsuario === 'adm' ? 'icon-adm' : 'icon-comum';

    // chama a funcao de logout
    const lidarComLogout = (evento) => {
        evento.preventDefault(); 
        aoSair(evento);          
        setMenuAberto(false);    
    };

    // manda pra pagina de catalogo 
    const lidarSubmitBusca = (evento) => {
        evento.preventDefault();
        if (termoBusca.trim()) {
            navegar(`/categorias?q=${encodeURIComponent(termoBusca)}`);
        }
    };

    return (
        <header className="navBar">
            
            <Link to="/home" className="logoNav">lixs</Link>

            {/* barra de pesquisa  */}
            <form className="campoBusca" onSubmit={lidarSubmitBusca}>
                <input 
                    type='search' 
                    placeholder='Buscar...' 
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                />
                <button type="submit" className="iconeBusca">
                    <span className="bi bi-search"></span>
                </button>
            </form>

            {/* links principais */}
            <nav className="menuNav">
                <ul>
                    <li><Link to="/home">Início</Link></li>
                    <li><Link to="/sobre">Sobre Nós</Link></li>
                    <li><Link to="/categorias">Catálogo</Link></li>
                </ul>
            </nav>

            {/* menu dropdown  */}
            {tipoUsuario && (
                <nav className="menuUsuario">
                    <button 
                        className={`botaoMenuUsuario ${classeIcone}`}
                        onClick={() => setMenuAberto(!menuAberto)}
                    >
                        <span className="bi bi-person-circle"></span>
                    </button>
                    
                    <ul className={`dropdownConteudo ${menuAberto ? 'aberto' : ''}`}>
                        {/* opcao so de adm */}
                        {tipoUsuario === 'adm' && (
                            <li><Link to="/gerenciarFilmes">Gerenciar Filmes</Link></li>
                        )}
                        <li><Link to="/adicionarFilmes">Adicionar Filme</Link></li>
                        <li><Link to="/" onClick={lidarComLogout}>Sair</Link></li>
                    </ul>
                </nav>
            )}
        </header>
    );
}

export default NavBar;
import './footer.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 

function Footer() {
    return (
        <footer className="footer">
            
            <article className="links">
                <h3>Links:</h3>
                <ul>
                    <li><a href="#home">Início</a></li>
                    <li><a href="#about">Sobre Nós</a></li>
                    <li><a href="#services">Catálogo</a></li>
                </ul>
            </article>
            

            <article className="social">
                <h3>Siga-nos:</h3>
                <ul className="icones">
                    <li>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> 
                            <i className="bi bi-instagram"></i> Instagram 
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"> 
                            <i className="bi bi-linkedin"></i> LinkedIn 
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/AntonioC-Silva" target="_blank" rel="noopener noreferrer"> 
                            <i className="bi bi-github"></i> GitHub 
                        </a>
                    </li>
                </ul>
            </article>


             <p aria-label='Logo com gradiente, Texto da logo "lixs" ' className="logoFooter">lixs</p>
            

            <p className="copyright">© 2024 Lixs. Todos os direitos reservados.</p>
        </footer>
    );
}

export default Footer;
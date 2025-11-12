// Em src/pages/home/home.jsx
import React, { useState } from 'react';
import NavBar from '../../components/navBar/navBar'; // Importa o componente
import CarrosselHome from '../../components/carrosselHome/carrosselHome';
import Footer from '../../components/footer/footer';
import "./home.css"
import ListaFilmes from '../../components/listaFilme/listaFilmes';

function PaginaHome() {
    // MOCK DE DADOS (Isso virá do seu banco de dados depois)
    const dadosMock = [
        { id: 1, titulo: "Coringa", urlCapa: "https://br.web.img3.acsta.net/pictures/19/04/03/21/31/2668320.jpg" },
        { id: 2, titulo: "Batman", urlCapa: "https://br.web.img3.acsta.net/pictures/22/03/02/19/26/3666027.jpg" },
        { id: 3, titulo: "Interestelar", urlCapa: "https://br.web.img3.acsta.net/pictures/14/10/31/20/39/476171.jpg" },
        { id: 4, titulo: "A Origem", urlCapa: "https://br.web.img2.acsta.net/medias/nmedia/18/87/32/31/20028688.jpg" },
        { id: 5, titulo: "Matrix", urlCapa: "https://br.web.img3.acsta.net/medias/nmedia/18/91/08/82/20128877.jpg" },
        { id: 6, titulo: "Vingadores", urlCapa: "https://br.web.img2.acsta.net/pictures/19/03/26/11/51/2083770.jpg" },
        { id: 7, titulo: "Homem-Aranha", urlCapa: "https://br.web.img2.acsta.net/pictures/21/12/01/12/10/3544377.jpg" },
    ];

    // --- SIMULAÇÃO DE AUTENTICAÇÃO ---
    // 1. Estado para simular o usuário logado
    // Mude 'adm' para 'comum' ou 'null' para testar
    const [usuarioLogado, setUsuarioLogado] = useState({ tipo: 'adm' }); 
    // const [usuarioLogado, setUsuarioLogado] = useState({ tipo: 'comum' });
    // const [usuarioLogado, setUsuarioLogado] = useState(null); // Simula logout

    // 2. Função de Logout (agora em português)
    const handleLogout = (evento) => {
        evento.preventDefault(); // Impede o link de navegar
        alert("Usuário deslogado!");
        setUsuarioLogado(null); // "Desloga" o usuário
    };

    return (
        <>
            {/* 3. Passa as props em português para o NavBar */}
            <NavBar 
                tipoUsuario={usuarioLogado ? usuarioLogado.tipo : null} 
                aoSair={handleLogout} 
            />
            
            <CarrosselHome />
            
            <main className='home'>
                
                <ListaFilmes 
                    tituloSecao="Destaques da Semana" 
                    listaFilmes={dadosMock} 
                />

                <ListaFilmes 
                    tituloSecao="Ação e Aventura" 
                    listaFilmes={[...dadosMock].reverse()} 
                />

                 <ListaFilmes 
                    tituloSecao="Sci-Fi" 
                    listaFilmes={dadosMock} 
                />

            </main>

            <Footer />
        </>
    )
}

export default PaginaHome;
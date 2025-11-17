
-- drop database  webserver;
 create database if not exists webserver;
use webserver;

create table usuario(
    id_usuario int auto_increment primary key,
    nome varchar(30),
    senha text
);


create table adm(
    id_adm int auto_increment primary key,
    nome varchar(30),
    senha text
);


create table genero(
    id_genero int primary key auto_increment,
    tipo varchar(50)
);


create table ator(
    id_ator int primary key auto_increment,
    nome varchar(50),
    sobrenome varchar(50),
    genero enum("feminino","masculino"),
    nacionalidade varchar(50)
);


create table diretor(
    id_diretor int primary key auto_increment,
    nome varchar(50),
    sobrenome varchar(50),
    genero enum("feminino","masculino"),
    nacionalidade varchar(50)
);


create table linguagem(
    id_linguagem int primary key auto_increment,
    idioma varchar(20)
);


create table pais(
    id_pais int primary key auto_increment,
    nome varchar(50),
    continente varchar(50)
);


create table produtora(
    id_produtora int primary key auto_increment,
    nome varchar(70),
    id_pais int,
    foreign key (id_pais) references pais(id_pais)
);


create table filme(
    id_filme int primary key auto_increment,
    titulo varchar(100),
    orcamento float,
    id_diretor int,
    tempo_de_duracao time,
    ano year,
    poster text,
    sinopse text,
    elenco text, 
    foreign key (id_diretor) references diretor(id_diretor)
);


CREATE TABLE edicao_pendente (
    id_edicao INT AUTO_INCREMENT PRIMARY KEY,
    id_filme INT NOT NULL,
    titulo VARCHAR(100),
    ano YEAR,
    poster TEXT,
    elenco TEXT,
    sinopse TEXT,
    data_sugestao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pendente') DEFAULT 'pendente',
    FOREIGN KEY (id_filme) REFERENCES filme(id_filme) ON DELETE CASCADE
);


create table filme_linguagem(
    id_filme_linguagem int primary key auto_increment,
    id_filme int,
    id_linguagem int,
    foreign key (id_filme) references filme(id_filme) on delete cascade,
    foreign key (id_linguagem) references linguagem(id_linguagem)
);

create table filme_ator(
    id_filme_ator int primary key auto_increment,
    id_filme int,
    id_ator int,
    foreign key (id_filme) references filme(id_filme) on delete cascade,
    foreign key (id_ator) references ator(id_ator)
);

create table filme_genero(
    id_filme_genero int primary key auto_increment,
    id_filme int,
    id_genero int,
    foreign key (id_filme) references filme(id_filme) on delete cascade,
    foreign key (id_genero) references genero(id_genero)
);

create table filme_produtora(
    id_filme_produtora int primary key auto_increment,
    id_filme int,
    id_produtora int,
    foreign key (id_filme) references filme(id_filme) on delete cascade,
    foreign key (id_produtora) references produtora(id_produtora)
);


create table filme_pendente (
    id_pendente int auto_increment primary key,
    titulo varchar(100),
    orcamento float,
    diretor_nome varchar(255),
    tempo_de_duracao int,
    ano year,
    poster text,
    sinopse text,
    elenco_string varchar(500),
    genero_string varchar(255)
);


insert into genero (tipo) values
('Ação'), ('Aventura'), ('Comédia'), ('Drama'), ('Ficção Científica'),
('Terror'), ('Romance'), ('Suspense'), ('Animação'), ('Fantasia');

insert into pais (nome, continente) values
('Estados Unidos', 'América do Norte'), ('Reino Unido', 'Europa'),
('Canadá', 'América do Norte'), ('França', 'Europa'), ('Japão', 'Ásia'),
('Brasil', 'América do Sul'), ('Alemanha', 'Europa'), ('Coreia do Sul', 'Ásia'), ('Nova Zelândia', 'Oceania');

insert into linguagem (idioma) values
('Inglês'), ('Espanhol'), ('Português'), ('Francês'), ('Japonês'), ('Alemão'), ('Coreano');

insert into produtora (nome, id_pais) values
('Warner Bros. Pictures', 1),('20th Century Fox', 1),('Universal Pictures', 1),('Paramount Pictures', 1),
('Walt Disney Pictures', 1),('Sony Pictures', 1),('Netflix', 1),('Studio Ghibli', 5),('Globo Filmes', 6),('BBC Films', 2),
('A24', 1), ('Miramax', 1), ('New Line Cinema', 1), ('Lionsgate', 1), ('Focus Features', 1), ('CJ Entertainment', 8);


insert into ator (nome, sobrenome, genero, nacionalidade) values
('Leonardo', 'DiCaprio', 'masculino', 'Estados Unidos'),
('Tom', 'Hanks', 'masculino', 'Estados Unidos'),
('Meryl', 'Streep', 'feminino', 'Estados Unidos'),
('Scarlett', 'Johansson', 'feminino', 'Estados Unidos'),
('Brad', 'Pitt', 'masculino', 'Estados Unidos'),
('Tais', 'Araujo', 'feminino', 'Brasil'),
('Daniel', 'Day-Lewis', 'masculino', 'Reino Unido'),
('Margot', 'Robbie', 'feminino', 'Austrália'),
('Ryan', 'Gosling', 'masculino', 'Canadá'),
('Gal', 'Gadot', 'feminino', 'Israel'),
('Keanu', 'Reeves', 'masculino', 'Canadá'),
('Sandra', 'Bullock', 'feminino', 'Estados Unidos'),
('Joseph', 'Gordon-Levitt', 'masculino', 'Estados Unidos'),
('Elliot', 'Page', 'masculino', 'Canadá'),
('Tom', 'Hardy', 'masculino', 'Reino Unido'),
('Timothee', 'Chalamet', 'masculino', 'Estados Unidos'),
('Rebecca', 'Ferguson', 'feminino', 'Suécia'),
('Zendaya', 'Maree', 'feminino', 'Estados Unidos'),
('Cillian', 'Murphy', 'masculino', 'Irlanda'),
('Emily', 'Blunt', 'feminino', 'Reino Unido'),
('Robert', 'Downey Jr.', 'masculino', 'Estados Unidos'),
('Chris', 'Evans', 'masculino', 'Estados Unidos'),
('Chris', 'Hemsworth', 'masculino', 'Austrália'),
('Mark', 'Ruffalo', 'masculino', 'Estados Unidos'),
('Christian', 'Bale', 'masculino', 'Reino Unido'),
('Matt', 'Damon', 'masculino', 'Estados Unidos'),
('Anne', 'Hathaway', 'feminino', 'Estados Unidos'),
('Matthew', 'McConaughey', 'masculino', 'Estados Unidos'),
('John', 'Travolta', 'masculino', 'Estados Unidos'),
('Uma', 'Thurman', 'feminino', 'Estados Unidos'),
('Samuel', 'L. Jackson', 'masculino', 'Estados Unidos'),
('Sam', 'Neill', 'masculino', 'Nova Zelândia'),
('Laura', 'Dern', 'feminino', 'Estados Unidos'),
('Jeff', 'Goldblum', 'masculino', 'Estados Unidos'),
('Chris', 'Pratt', 'masculino', 'Estados Unidos'),
('Anthony', 'Hopkins', 'masculino', 'Reino Unido'),
('Jodie', 'Foster', 'feminino', 'Estados Unidos'),
('Elijah', 'Wood', 'masculino', 'Estados Unidos'),
('Ian', 'McKellen', 'masculino', 'Reino Unido'),
('Viggo', 'Mortensen', 'masculino', 'Estados Unidos'),
('Song', 'Kang-ho', 'masculino', 'Coreia do Sul'),
('Lee', 'Sun-kyun', 'masculino', 'Coreia do Sul'),
('Cho', 'Yeo-jeong', 'feminino', 'Coreia do Sul'),
('Choi', 'Woo-shik', 'masculino', 'Coreia do Sul'),
('Park', 'So-dam', 'feminino', 'Coreia do Sul');


insert into diretor (nome, sobrenome, genero, nacionalidade) values
('Christopher', 'Nolan', 'masculino', 'Reino Unido'),
('Greta', 'Gerwig', 'feminino', 'Estados Unidos'),
('Steven', 'Spielberg', 'masculino', 'Estados Unidos'),
('Quentin', 'Tarantino', 'masculino', 'Estados Unidos'),
('Patty', 'Jenkins', 'feminino', 'Estados Unidos'),
('Fernando', 'Meirelles', 'masculino', 'Brasil'),
('Denis', 'Villeneuve', 'masculino', 'Canadá'),
('Bong', 'Joon-ho', 'masculino', 'Coreia do Sul'),
('James', 'Cameron', 'masculino', 'Canadá'),
('Peter', 'Jackson', 'masculino', 'Nova Zelândia'),
('Martin', 'Scorsese', 'masculino', 'Estados Unidos'),
('Ridley', 'Scott', 'masculino', 'Reino Unido'),
('Joss', 'Whedon', 'masculino', 'Estados Unidos'),
('Anthony', 'Russo', 'masculino', 'Estados Unidos'),
('Joe', 'Russo', 'masculino', 'Estados Unidos'),
('Jonathan', 'Demme', 'masculino', 'Estados Unidos'),
('Lana', 'Wachowski', 'feminino', 'Estados Unidos'),
('Lilly', 'Wachowski', 'feminino', 'Estados Unidos'),
('Jordan', 'Peele', 'masculino', 'Estados Unidos'),
('Ari', 'Aster', 'masculino', 'Estados Unidos');


insert into filme (titulo, orcamento, id_diretor, tempo_de_duracao, ano, poster, sinopse, elenco) values
('A Origem', 160000000.00, 1, '02:28:00', 2010, 'https://br.web.img3.acsta.net/medias/nmedia/18/87/32/31/20028688.jpg', 'Dom Cobb é um ladrão habilidoso que rouba informações valiosas se infiltrando nos sonhos das pessoas. Ele recebe a tarefa de fazer o oposto: plantar uma ideia na mente de um alvo.', 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy'),
('Barbie', 145000000.00, 2, '01:54:00', 2023, 'https://topview.com.br/wp-content/uploads/2023/07/cartaz-filme-barbie.jpeg', 'Depois de ser expulsa da Barbieland por não ser uma boneca de aparência perfeita, Barbie parte para o mundo humano em busca da verdadeira felicidade.', 'Margot Robbie, Ryan Gosling'),
('Jurassic Park', 63000000.00, 3, '02:07:00', 1993, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_X4-0pYKf7HTjmkhtEpI0loV15m-JqbczuA&s', 'Um parque temático de dinossauros clonados sofre uma falha de segurança catastrófica, colocando seus visitantes em perigo.', 'Sam Neill, Laura Dern, Jeff Goldblum'),
('Pulp Fiction', 8000000.00, 4, '02:34:00', 1994, 'https://img.elo7.com.br/product/zoom/268A58D/big-poster-filme-pulp-fiction-lo001-tamanho-90x60-cm-presente-geek.jpg', 'As vidas de dois assassinos de aluguel, um boxeador, a esposa de um gângster e um casal de assaltantes se entrelaçam em quatro contos de violência e redenção.', 'John Travolta, Uma Thurman, Samuel L. Jackson'),
('Mulher-Maravilha', 149000000.00, 5, '02:21:00', 2017, 'https://br.web.img2.acsta.net/pictures/17/03/10/19/41/580546.jpg', 'Diana, princesa das Amazonas, deixa sua ilha paradisíaca para lutar na Primeira Guerra Mundial, descobrindo seus plenos poderes e seu verdadeiro destino.', 'Gal Gadot, Chris Pine'),
('Cidade de Deus', 3300000.00, 6, '02:10:00', 2002, 'https://br.web.img3.acsta.net/medias/nmedia/18/87/02/76/19871246.jpg', 'A história de Buscapé, um jovem pobre que cresce em uma violenta favela do Rio de Janeiro, e sua visão sobre o tráfico de drogas e a violência ao seu redor.', 'Alexandre Rodrigues, Leandro Firmino, Phellipe Haagensen'),
('Duna', 165000000.00, 7, '02:35:00', 2021, 'https://www.europanet.com.br/upload/id_produto/107___/107350g.jpg', 'Paul Atreides, um jovem brilhante nascido para um grande destino, deve viajar ao planeta mais perigoso do universo para garantir o futuro de sua família e de seu povo.', 'Timothee Chalamet, Rebecca Ferguson, Zendaya Maree'),
('Parasita', 11000000.00, 8, '02:12:00', 2019, 'https://img.elo7.com.br/product/zoom/2D25B68/big-poster-filme-parasita-2019-lo001-tamanho-90x60-cm-nerd.jpg', 'Toda a família de Ki-taek está desempregada. Eles se infiltram metodicamente na vida da rica família Park, mas um incidente inesperado expõe a relação simbiótica.', 'Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong, Choi Woo-shik'),
('O Resgate do Soldado Ryan', 70000000.00, 3, '02:49:00', 1998, 'https://upload.wikimedia.org/wikipedia/pt/a/ac/Saving_Private_Ryan_poster.jpg', 'Durante a invasão da Normandia, um grupo de soldados americanos é enviado para trás das linhas inimigas para resgatar um paraquedista cujos três irmãos foram mortos em combate.', 'Tom Hanks, Matt Damon, Tom Sizemore'),
('Interestelar', 165000000.00, 1, '02:49:00', 2014, 'https://br.web.img3.acsta.net/pictures/14/10/31/20/39/476171.jpg', 'Com a Terra se tornando inabitável, um ex-piloto da NASA lidera uma equipe em uma missão através de um buraco de minhoca para encontrar um novo lar para a humanidade.', 'Matthew McConaughey, Anne Hathaway, Jessica Chastain'),
('Oppenheimer', 100000000.00, 1, '03:00:00', 2023, 'https://m.media-amazon.com/images/I/71xDtUSyAKL._AC_UF894,1000_QL80_.jpg', 'A história do físico americano J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atômica durante o Projeto Manhattan.', 'Cillian Murphy, Emily Blunt, Robert Downey Jr., Matt Damon'),
('Os Vingadores', 220000000.00, 13, '02:23:00', 2012, 'https://img.elo7.com.br/product/zoom/267846A/big-poster-filme-os-vingadores-2012-lo01-tamanho-90x60-cm-poster-de-filme.jpg', 'Os heróis mais poderosos da Terra devem se unir para impedir que o traiçoeiro Loki e seu exército alienígena escravizem a humanidade.', 'Robert Downey Jr., Chris Evans, Chris Hemsworth, Mark Ruffalo'),
('Vingadores: Guerra Infinita', 325000000.00, 14, '02:29:00', 2018, 'https://upload.wikimedia.org/wikipedia/pt/thumb/9/90/Avengers_Infinity_War.jpg/250px-Avengers_Infinity_War.jpg', 'Os Vingadores e seus aliados devem sacrificar tudo para derrotar o poderoso Thanos antes que sua onda de devastação coloque um fim no universo.', 'Robert Downey Jr., Chris Hemsworth, Scarlett Johansson, Mark Ruffalo'),
('Vingadores: Ultimato', 356000000.00, 14, '03:01:00', 2019, 'https://img.elo7.com.br/product/zoom/259A7AA/big-poster-filme-vingadores-ultimato-lo001-tamanho-90x60-cm-poster-marvel.jpg', 'Após os eventos devastadores de "Guerra Infinita", os Vingadores restantes se reúnem para uma última tentativa de reverter as ações de Thanos.', 'Robert Downey Jr., Chris Hemsworth, Scarlett Johansson, Chris Evans'),
('O Cavaleiro das Trevas', 185000000.00, 1, '02:32:00', 2008, 'https://br.web.img3.acsta.net/medias/nmedia/18/86/98/32/19870786.jpg', 'Quando a ameaça conhecida como Coringa emerge, Batman deve aceitar um dos maiores testes de sua capacidade de lutar contra a injustiça.', 'Christian Bale, Heath Ledger, Aaron Eckhart'),
('O Cavaleiro das Trevas Ressurge', 250000000.00, 1, '02:44:00', 2012, 'https://br.web.img3.acsta.net/medias/nmedia/18/90/57/96/20121842.jpg', 'Oito anos após o exílio, Batman é forçado a voltar para salvar Gotham City do terrorista Bane e da enigmática Mulher-Gato.', 'Christian Bale, Tom Hardy, Anne Hathaway'),
('Amnésia', 9000000.00, 1, '01:53:00', 2000, 'https://br.web.img3.acsta.net/pictures/14/05/22/20/00/155413.jpg', 'Um homem com perda de memória de curto prazo usa notas e tatuagens para caçar o homem que ele acredita ter matado sua esposa.', 'Guy Pearce, Carrie-Anne Moss'),
('O Silêncio dos Inocentes', 19000000.00, 16, '01:58:00', 1991, 'https://br.web.img3.acsta.net/pictures/14/10/07/22/16/591185.jpg', 'Uma jovem agente do FBI procura a ajuda de um assassino canibal preso para ajudar a capturar outro serial killer.', 'Anthony Hopkins, Jodie Foster'),
('O Senhor dos Anéis: A Sociedade do Anel', 93000000.00, 10, '02:58:00', 2001, 'https://m.media-amazon.com/images/I/81EBp0vOZZL._AC_UF894,1000_QL80_.jpg', 'Um jovem hobbit, Frodo Bolseiro, herda o Um Anel e deve embarcar em uma jornada à Montanha da Perdição para destruí-lo.', 'Elijah Wood, Ian McKellen, Viggo Mortensen'),
('O Senhor dos Anéis: As Duas Torres', 94000000.00, 10, '02:59:00', 2002, 'https://br.web.img2.acsta.net/medias/nmedia/18/92/34/89/20194741.jpg', 'Frodo e Sam continuam sua jornada para Mordor. Enquanto isso, a Sociedade fragmentada enfrenta os exércitos de Saruman e Sauron.', 'Elijah Wood, Ian McKellen, Viggo Mortensen'),
('O Senhor dos Anéis: O Retorno do Rei', 94000000.00, 10, '03:21:00', 2003, 'https://img.elo7.com.br/product/main/2692896/big-poster-o-senhor-dos-aneis-o-retorno-do-rei-lo02-90x60-cm-poster.jpg', 'Gandalf e Aragorn lideram o Mundo dos Homens contra o exército de Sauron, enquanto Frodo e Sam se aproximam da Montanha da Perdição.', 'Elijah Wood, Ian McKellen, Viggo Mortensen'),
('Matrix', 63000000.00, 17, '02:16:00', 1999, 'https://img.elo7.com.br/product/zoom/2679A17/big-poster-filme-matrix-lo02-tamanho-90x60-cm-poster-de-filme.jpg', 'Um hacker descobre que sua realidade é uma simulação de computador e se junta à rebelião contra as máquinas.', 'Keanu Reeves, Laurence Fishburne'),
('Avatar', 237000000.00, 9, '02:42:00', 2009, 'https://upload.wikimedia.org/wikipedia/pt/thumb/b/b0/Avatar-Teaser-Poster.jpg/250px-Avatar-Teaser-Poster.jpg', 'Um fuzileiro naval paraplégico é enviado à lua Pandora e fica dividido entre seguir ordens e proteger o povo Na vi.', 'Sam Worthington, Zoe Saldana'),
('Titanic', 200000000.00, 9, '03:14:00', 1997, 'https://upload.wikimedia.org/wikipedia/pt/thumb/2/22/Titanic_poster.jpg/250px-Titanic_poster.jpg', 'Um romance épico entre um artista pobre e uma jovem rica a bordo do malfadado R.M.S. Titanic.', 'Leonardo DiCaprio, Kate Winslet'),
('Gladiador', 103000000.00, 12, '02:35:00', 2000, 'https://br.web.img3.acsta.net/medias/nmedia/18/87/29/07/19873973.jpg', 'Um general romano é traído e forçado à escravidão. Ele se torna um gladiador e busca vingança contra o imperador que assassinou sua família.', 'Russell Crowe, Joaquin Phoenix'),
('Blade Runner: O Caçador de Androides', 28000000.00, 12, '01:57:00', 1982, 'https://br.web.img3.acsta.net/medias/nmedia/18/66/01/66/20217906.jpg', 'Em um futuro distópico, um caçador de androides deve perseguir quatro replicantes fugitivos que retornaram à Terra.', 'Harrison Ford, Rutger Hauer'),
('O Lobo de Wall Street', 100000000.00, 11, '03:00:00', 2013, 'https://upload.wikimedia.org/wikipedia/pt/thumb/8/8d/The_Wolf_of_Wall_Street.jpg/250px-The_Wolf_of_Wall_Street.jpg', 'Baseado na história de Jordan Belfort, sua ascensão a um rico corretor da bolsa e sua queda envolvendo crime e corrupção.', 'Leonardo DiCaprio, Jonah Hill, Margot Robbie'),
('Os Bons Companheiros', 25000000.00, 11, '02:26:00', 1990, 'https://br.web.img2.acsta.net/medias/nmedia/18/93/46/41/20258439.jpg', 'A história verídica da ascensão e queda de Henry Hill e seus associados na máfia ítalo-americana.', 'Robert De Niro, Ray Liotta, Joe Pesci'),
('Corra!', 4500000.00, 19, '01:44:00', 2017, 'https://br.web.img3.acsta.net/pictures/17/04/19/21/08/577190.jpg', 'Um jovem afro-americano visita a propriedade da família de sua namorada branca e descobre um segredo sombrio.', 'Daniel Kaluuya, Allison Williams'),
('Nós', 20000000.00, 19, '01:56:00', 2019, 'https://br.web.img3.acsta.net/pictures/19/02/07/14/16/5034340.jpg', 'As férias de uma família se transformam em caos quando seus aterrorizantes "doppelgängers" aparecem.', 'Lupita Nyong''o, Winston Duke'),
('Hereditário', 10000000.00, 20, '02:07:00', 2018, 'https://br.web.img3.acsta.net/pictures/18/06/14/13/11/1751062.jpg', 'Após a morte da matriarca, uma família enlutada é assombrada por ocorrências trágicas e perturbadoras.', 'Toni Collette, Alex Wolff'),
('Midsommar', 9000000.00, 20, '02:28:00', 2019, 'https://br.web.img2.acsta.net/r_1280_720/pictures/23/06/16/23/15/3494148.jpg', 'Um casal viaja para um festival de verão sueco que se transforma em um pesadelo pagão.', 'Florence Pugh, Jack Reynor'),
('Lady Bird: A Hora de Voar', 10000000.00, 2, '01:34:00', 2017, 'https://br.web.img2.acsta.net/pictures/17/12/04/17/15/0839624.jpg', 'Uma jovem de 17 anos navega seu relacionamento turbulento com sua mãe no último ano do ensino médio em Sacramento.', 'Saoirse Ronan, Laurie Metcalf, Timothee Chalamet'),
('Adoráveis Mulheres', 40000000.00, 2, '02:15:00', 2019, 'https://br.web.img3.acsta.net/r_1280_720/pictures/19/10/29/15/15/3552774.jpg', 'Quatro irmãs aprendem sobre amor, vida e perda enquanto crescem na América pós-Guerra Civil, cada uma determinada a viver a vida em seus próprios termos.', 'Saoirse Ronan, Emma Watson, Florence Pugh'),
('Bastardos Inglórios', 70000000.00, 4, '02:33:00', 2009, 'https://m.media-amazon.com/images/M/MV5BN2Y1ZmE1ZWItZjQ1OS00YWQxLWE4NWMtNzJkODA4MmE3NTRmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 'Na França ocupada pelos nazistas, um plano para assassinar líderes nazistas coincide com os planos de vingança de uma proprietária de cinema.', 'Brad Pitt, Mélanie Laurent, Christoph Waltz'),
('Django Livre', 100000000.00, 4, '02:45:00', 2012, 'https://upload.wikimedia.org/wikipedia/pt/8/8b/Django_Unchained_Poster.jpg', 'Com a ajuda de um caçador de recompensas alemão, um escravo liberto parte para resgatar sua esposa de um brutal proprietário de plantação.', 'Jamie Foxx, Christoph Waltz, Leonardo DiCaprio'),
('Kill Bill: Volume 1', 30000000.00, 4, '01:51:00', 2003, 'https://uauposters.com.br/media/catalog/product/1/6/167320140525-uau-posters-filmes-kill-bill-volume-1--kill-bill-vol-1-4-2.jpg', 'A Noiva acorda de um coma e jura vingança contra a equipe de assassinos que a traiu.', 'Uma Thurman, Lucy Liu, David Carradine'),
('Kill Bill: Volume 2', 30000000.00, 4, '02:17:00', 2004, 'https://br.web.img3.acsta.net/medias/nmedia/18/90/95/93/20122143.jpg', 'A Noiva continua sua busca por vingança contra seu ex-chefe e amante, Bill.', 'Uma Thurman, David Carradine, Michael Madsen'),
('Blade Runner 2049', 150000000.00, 7, '02:44:00', 2017, 'https://m.media-amazon.com/images/I/71eXjQQOHML.jpg', 'Um novo Blade Runner, o oficial K, descobre um segredo há muito enterrado que o leva a procurar Rick Deckard, um ex-Blade Runner desaparecido.', 'Ryan Gosling, Harrison Ford, Ana de Armas'),
('A Chegada', 47000000.00, 7, '01:56:00', 2016, 'https://br.web.img3.acsta.net/pictures/16/10/19/01/57/552532.jpg', 'Uma linguista é recrutada pelo exército para traduzir as comunicações de alienígenas que chegaram em 12 locais misteriosos ao redor do mundo.', 'Amy Adams, Jeremy Renner');


insert into filme_ator (id_filme, id_ator) values
(1, 1), (1, 13), (1, 14), (1, 15),
(2, 8), (2, 9),
(3, 32), (3, 33), (3, 34),
(4, 29), (4, 30), (4, 31),
(5, 10), (5, 35),
(6, 6),
(7, 16), (7, 17), (7, 18),
(8, 41), (8, 42), (8, 43), (8, 44),
(9, 2), (9, 26), (9, 7),
(10, 28), (10, 27), (10, 1),
(11, 19), (11, 20), (11, 21), (11, 26),
(12, 21), (12, 22), (12, 23), (12, 24),
(13, 21), (13, 23), (13, 4), (13, 24),
(14, 21), (14, 23), (14, 4), (14, 22),
(15, 25), (15, 15),
(16, 25), (16, 15), (16, 27),
(17, 1), (17, 15),
(18, 36), (18, 37),
(19, 38), (19, 39), (19, 40),
(20, 38), (20, 39), (20, 40),
(21, 38), (21, 39), (21, 40),
(22, 11), (22, 15),
(23, 16), (23, 18),
(24, 1), (24, 27),
(25, 5), (25, 25),
(26, 32), (26, 33), (26, 34),
(27, 1), (27, 8), (27, 26),
(28, 2), (28, 1),
(29, 4), (29, 30),
(30, 4), (30, 24),
(31, 20),
(32, 3), (32, 16),
(33, 3), (33, 16), (33, 18),
(34, 5), (34, 30), (34, 31),
(35, 1), (35, 5),
(36, 30),
(37, 30),
(38, 9), (38, 11),
(39, 12), (39, 3);


insert into filme_genero (id_filme, id_genero) values
(1, 1), (1, 5), (1, 8),
(2, 3), (2, 7), (2, 10),
(3, 2), (3, 5),
(4, 8), (4, 4),
(5, 1), (5, 2), (5, 10),
(6, 4), (6, 8),
(7, 5), (7, 2), (7, 4),
(8, 4), (8, 8),
(9, 4), (9, 1),
(10, 5), (10, 4), (10, 2),
(11, 4), (11, 8),
(12, 1), (12, 2), (12, 5),
(13, 1), (13, 2), (13, 5),
(14, 1), (14, 2), (14, 5),
(15, 1), (15, 4), (15, 8),
(16, 1), (16, 4), (16, 8),
(17, 5), (17, 8),
(18, 6), (18, 8),
(19, 2), (19, 4), (19, 10),
(20, 2), (20, 4), (20, 10),
(21, 2), (21, 4), (21, 10),
(22, 1), (22, 5),
(23, 2), (23, 5), (23, 10),
(24, 4), (24, 7),
(25, 1), (25, 4),
(26, 5), (26, 8),
(27, 3), (27, 4),
(28, 4), (28, 8),
(29, 6), (29, 8), (29, 3),
(30, 6), (30, 8),
(31, 6), (31, 8),
(32, 6), (32, 8),
(33, 3), (33, 4),
(34, 4), (34, 7),
(35, 1), (35, 4), (35, 8),
(36, 1), (36, 4),
(37, 1), (37, 8),
(38, 1), (38, 8),
(39, 5), (39, 8),
(40, 5), (40, 4), (40, 8);


insert into filme_linguagem (id_filme, id_linguagem) values
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1),
(6, 3), (7, 1), (7, 4), (8, 7), (9, 1),
(10, 1), (11, 1), (12, 1), (13, 1), (14, 1),
(15, 1), (16, 1), (17, 1), (18, 1), (19, 1),
(20, 1), (21, 1), (22, 1), (23, 1), (24, 1),
(25, 1), (26, 1), (27, 1), (28, 1), (29, 1),
(30, 1), (31, 1), (32, 1), (33, 1), (34, 1),
(35, 1), (36, 1), (37, 1), (38, 1), (39, 1), (40, 1);


insert into filme_produtora (id_filme, id_produtora) values
(1, 1), (1, 4), (2, 1), (3, 3), (4, 12),
(5, 1), (6, 9), (7, 1), (8, 16), (9, 3), (9, 4),
(10, 1), (10, 4), (11, 3), (12, 5), (13, 5),
(14, 5), (15, 1), (16, 1), (17, 1), (18, 4),
(19, 13), (20, 13), (21, 13), (22, 1), (22, 12),
(23, 1), (24, 1), (25, 1), (26, 3), (27, 4),
(28, 1), (29, 3), (30, 3), (31, 11), (32, 11),
(33, 15), (34, 15), (35, 12), (36, 12), (37, 12),
(38, 12), (39, 6), (40, 6);


insert into adm (nome, senha) values
('mary', 'Mary@1711');

select * from usuario;
select * from filme;
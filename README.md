# Lixs - Plataforma de Catálogo de Filmes

**Lixs** é uma aplicação web desenvolvida com o objetivo de criar uma comunidade cinematográfica. A plataforma permite que usuários naveguem por um catálogo de filmes, visualizem detalhes técnicos e sugiram novos títulos ou edições. O sistema conta com um painel administrativo para fazer a gestão dos filmes , garantindo a qualidade do conteúdo.

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (Versão 18 ou superior)
* [Python](https://www.python.org/) (Versão 3.10 ou superior)
* [MySQL Server](https://dev.mysql.com/downloads/installer/)
* [VS Code](https://code.visualstudio.com/) (Editor de código recomendado)

---

## Passo a Passo para Instalação e Execução

### 1. Abrindo o Projeto no VS Code

1. Baixe ou clone este repositório em seu computador.
2. Abra o **VS Code**.
3. Vá no menu **File > Open Folder...** (Arquivo > Abrir Pasta) e selecione a pasta raiz do projeto.
4. Abra o terminal integrado do VS Code:
   * No menu superior, clique em **Terminal > New Terminal**.
   * Ou use o atalho `Ctrl + J`.

### 2. Configuração do Banco de Dados

1. Abra o seu gerenciador de banco de dados (MySQL Workbench, DBeaver ou terminal externo).
2. Localize o arquivo `banco.sql` na raiz do projeto (você pode vê-lo na aba de arquivos do VS Code).
3. Copie o conteúdo do `banco.sql` e execute no seu banco de dados para criar as tabelas e inserir os dados iniciais.
4. **Verifique a conexão:**
   * Abra o arquivo `back/banco.py` no VS Code.
   * Verifique se a senha (`password`) e o usuário (`user`) correspondem à sua instalação do MySQL.
   * *Padrão configurado: User: `root`, Senha: `senai`.*

### 3. Executando o Backend (API)

No terminal do VS Code (certifique-se de estar na raiz do projeto), execute os comandos:
**Execute Linha por Linha**

1. Entre na pasta do servidor:
   ```bash
   cd back
2. Criando venv e ativando (Ambiente onde baixaremos as biliotecas necessárias).
   ```bash
   py -m venv venv
   .\venv\Scripts\activate
   pip install -r requirements.txt
3. Iniciando Servidor.
   ```bash
    python servidor.py
   
### 4. Executando o Frontend

 Servidor rodando Agora vamos para o Front, na lateral direita na parte de cima do terminal clique no mais para abrir outro terminal.
 Nesse terminal iremos executar os seguintes comandos:

 1. Entre na pasta do Front:
    ```bash
    cd front
  2. Baixe o gerenciador de pacotes Node Modules.
     ```bash
     npm i
  3. Execute o Frontend.
     ```bash
     npm run dev
  4. no terminal será visivel uma URL Clique nela segurando o Ctrl do seu teclado ou acesse http://localhost:5173/

### 5. Credenciais
1. Se quiser logar como usuário comum fique a vontade para criar sua conta na tela de cadastro.
2. Para logar Como administrador use Usuário: "mary" Senha: "Mary@1711" 
 
   

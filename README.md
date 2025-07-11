# Desafio Técnico Sync360.io: Perfil de Usuário 👤

Bem-vindo ao **Desafio Técnico de Gestão de Perfil de Usuário** desenvolvido para a Sync360.io! Este projeto foca na criação de uma aplicação Fullstack que permite aos usuários gerenciar suas informações de perfil de forma intuitiva e persistente.

![Badge](https://img.shields.io/badge/Tecnologias-React%20%7C%20Node.js%20%7C%20MySQL-blue?style=for-the-badge&logo=react&logoColor=white&logo=nodedotjs&logoColor=white&logo=mysql&logoColor=white)

## 📋 Descrição do Projeto

Este projeto é uma aplicação web completa desenvolvida para o desafio técnico da Sync360.io. Ela oferece uma interface de usuário responsiva e um backend robusto para gerenciar informações de perfil de usuário. O principal objetivo foi criar um ambiente onde o usuário pode editar seus dados pessoais, carregar uma foto e ter seu endereço preenchido automaticamente via integração com uma API externa, tudo isso com persistência de dados em um banco de dados MySQL.

## 🚀 Funcionalidades

As funcionalidades implementadas foram baseadas nos requisitos do desafio:

-   **Exibição e Edição de Informações do Usuário:**
    -   **Imagem de Perfil:** Upload e exibição de foto de perfil personalizada.
    -   **Dados Pessoais:** Visualização e edição de nome completo e data de nascimento, com cálculo automático da idade.
    -   **Endereço:** Preenchimento automático de rua, bairro, cidade e estado via integração com a API ViaCEP.
    -   **Biografia:** Um campo de texto livre para o usuário adicionar uma seção "Sobre Mim".
-   **Formulário Interativo:** Interface intuitiva para edição e envio de todas as alterações.
-   **Persistência de Dados:** Salvamento e recuperação de todas as informações do perfil em um banco de dados MySQL.
-   **API RESTful:** Backend em Node.js com as rotas essenciais para buscar (`GET /usuario`) e salvar/atualizar (`POST /usuario`) os dados do perfil.
-   **Interface Responsiva:** Design otimizado para garantir uma excelente experiência de usuário em dispositivos móveis e desktops.

## ✨ Boas Práticas e Considerações Técnicas

Durante o desenvolvimento, priorizei as seguintes práticas:

-   **Estrutura de Projeto Organizada:** Separação clara entre frontend (`frontend/`) e backend (`backend/`) para facilitar a manutenção e escalabilidade.
-   **Componentização (React):** O frontend é modularizado em componentes reutilizáveis, promovendo um código mais limpo e manutenível.
-   **Gerenciamento de Estado (React Hooks):** Uso eficiente de `useState` e `useEffect` para controle do fluxo de dados e interatividade.
-   **Validação de Dados:** Implementação de validações básicas, como a integração com a API ViaCEP para CEPs.
-   **Tratamento de Erros:** Feedback claro ao usuário em caso de dados inválidos ou falhas na comunicação com o servidor.
-   **Segurança de Credenciais:** Uso de variáveis de ambiente (`dotenv`) para gerenciar informações sensíveis do banco de dados no backend.

## 🛠️ Tecnologias Utilizadas

### **Frontend (React com Vite)**
-   **React:** Biblioteca JavaScript para a construção da interface do usuário.
-   **Vite:** Ferramenta de build para um ambiente de desenvolvimento rápido e eficiente.
-   **Axios:** Cliente HTTP para comunicação com a API do backend.
-   **Font Awesome:** Biblioteca de ícones para aprimorar a experiência visual.
-   **CSS:** Estilização personalizada, focando na responsividade com Media Queries.

### **Backend (Node.js com Express)**
-   **Node.js:** Ambiente de execução JavaScript para o servidor.
-   **Express.js:** Framework web para construção da API RESTful.
-   **MySQL2:** Driver para conexão e interação com o banco de dados MySQL.
-   **CORS:** Middleware para permitir requisições de diferentes origens.
-   **Dotenv:** Gerenciamento seguro de variáveis de ambiente.
-   **Nodemon:** Para reinício automático do servidor durante o desenvolvimento.
-   **Multer:** Middleware para lidar com upload de arquivos (fotos de perfil).
-   **Axios:** Utilizado para integração com APIs externas (ex: ViaCEP).

### **Banco de Dados**
-   **MySQL:** Sistema de gerenciamento de banco de dados relacional para persistência de dados.
-   **MySQL Workbench:** Ferramenta visual para gerenciamento do banco de dados.

### **Ferramentas de Desenvolvimento**
-   **Git:** Sistema de controle de versão.
-   **GitHub:** Plataforma de hospedagem de código.
-   **Visual Studio Code:** Editor de código-fonte.

## ⚙️ Como Executar o Projeto Localmente

Siga os passos abaixo para colocar a aplicação em funcionamento em seu ambiente:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

-   **Node.js** (versão 14.x ou superior) e **npm** (ou **Yarn**)
-   **MySQL Server**
-   **Git**

### 1. Clonar o Repositório

Primeiro, clone o projeto para sua máquina local:

```bash
git clone [https://github.com/](https://github.com/)[SEU_USUARIO_GITHUB]/[SEU_NOME_DO_PROJETO].git
cd [SEU_NOME_DO_PROJETO]
2. Configuração do Banco de Dados MySQL
Crie o banco de dados sync360_db:
Abra seu cliente MySQL (ex: MySQL Workbench) e execute o comando SQL:

SQL

CREATE DATABASE IF NOT EXISTS sync360_db;
USE sync360_db;
Crie a tabela usuarios:
No mesmo cliente MySQL, execute o seguinte script SQL para criar a estrutura da tabela:

SQL

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    data_nascimento DATE,
    idade INT,
    cep VARCHAR(10),
    rua VARCHAR(255),
    bairro VARCHAR(255),
    cidade VARCHAR(255),
    estado VARCHAR(5),
    biografia TEXT,
    foto_perfil VARCHAR(255) -- Caminho do arquivo da imagem no servidor
);
3. Configuração e Inicialização do Backend
Navegue até o diretório do backend:

Bash

cd backend
Instale as dependências do projeto:

Bash

npm install
# ou
# yarn install
Configure as variáveis de ambiente:
Crie um arquivo .env na pasta backend com o seguinte conteúdo, substituindo sua_senha_mysql pela sua senha real do MySQL:

Snippet de código

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_mysql
DB_DATABASE=sync360_db
PORT=3001
Inicie o servidor backend:

Bash

npm start
# ou
# yarn start
O servidor estará ativo em http://localhost:3001.

4. Configuração e Inicialização do Frontend
Abra um novo terminal e navegue até o diretório do frontend (a partir da raiz do projeto):

Bash

cd ../frontend
Instale as dependências do projeto:

Bash

npm install
# ou
# yarn install
Inicie a aplicação React:

Bash

npm run dev
# ou
# yarn dev
A aplicação estará acessível em seu navegador através do endereço fornecido pelo Vite (geralmente http://localhost:5173).

Como Utilizar a Aplicação
Com o backend e o frontend em execução, acesse a aplicação no seu navegador. Você poderá:

Preencher e editar suas informações pessoais e data de nascimento.

Clicar no avatar para fazer upload de uma foto de perfil.

Na seção de endereço, inserir um CEP e utilizar o botão de busca (lupa) para preencher automaticamente os detalhes.

Adicionar qualquer informação adicional na área "Sobre Mim".

Clicar em "Salvar Alterações" para persistir todos os dados no banco de dados MySQL.

📂 Estrutura de Pastas
[SEU_NOME_DO_PROJETO]/
├── backend/                  # Contém o código do servidor Node.js (API RESTful).
│   ├── src/                  # Arquivos-fonte do backend.
│   │   ├── controllers/      # Lógica de controle para processar requisições.
│   │   ├── routes/           # Definição das rotas da API.
│   │   ├── services/         # Lógica de interação com DB e APIs externas.
│   │   ├── config/           # Configurações de conexão com o MySQL.
│   │   └── uploads/          # Diretório para imagens de perfil.
│   ├── .env.example          # Modelo de arquivo para variáveis de ambiente.
│   ├── package.json          # Dependências e scripts do backend.
│   └── server.js             # Ponto de entrada do servidor.
├── frontend/                 # Contém o código da aplicação React.
│   ├── public/               # Arquivos estáticos.
│   ├── src/                  # Arquivos-fonte do frontend.
│   │   ├── assets/           # Imagens e outros recursos.
│   │   ├── components/       # Componentes React reutilizáveis.
│   │   ├── App.jsx           # Componente raiz da aplicação.
│   │   └── main.jsx          # Ponto de entrada do React.
│   ├── package.json          # Dependências e scripts do frontend.
│   └── vite.config.js        # Configuração do Vite.
├── .gitignore                # Arquivos e diretórios a serem ignorados pelo Git.
├── README.md                 # Este documento de apresentação do projeto.
└── package.json              # Dependências globais do projeto (se aplicável).
🧑‍💻 Contato
Para quaisquer dúvidas ou para discutir este projeto, sinta-se à vontade para entrar em contato:

Nome: Andrezza Coelho

GitHub: https://github.com/AndrezzaCoelho

LinkedIn: linkedin.com/in/andrezza-coelho

📄 Licença
Este projeto está licenciado sob a Licença MIT.

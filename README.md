# Desafio Técnico Sync360.io: Aplicação de Gestão de Perfil de Usuário

![Badge](https://img.shields.io/badge/Tecnologias-React%20%7C%20Node.js%20%7C%20MySQL-blue?style=for-the-badge&logo=react&logoColor=white&logo=nodedotjs&logoColor=white&logo=mysql&logoColor=white)

## Descrição do Projeto

Este repositório contém a solução desenvolvida para o **Desafio Técnico da Sync360.io**, focado na criação de uma aplicação Fullstack para **Gestão de Perfil de Usuário**. Meu objetivo foi entregar uma interface interativa para edição e salvamento de dados em um banco de dados MySQL, demonstrando minhas habilidades com as tecnologias requisitadas e aderência às boas práticas de desenvolvimento.

A aplicação foi projetada para ser intuitiva e responsiva, proporcionando uma experiência de usuário consistente em diferentes dispositivos.

## Funcionalidades Implementadas

Este projeto aborda todos os requisitos funcionais especificados no desafio:

1.  **Exibição de Informações do Usuário:**
    * Imagem de Perfil: Funcionalidade de upload e exibição de uma imagem de perfil personalizada.
    * Nome Completo: Campo para visualização e edição do nome do usuário.
    * Idade: Calculada automaticamente com base na data de nascimento fornecida.
    * Endereço: Exibição detalhada de Rua, Bairro, Cidade e Estado, com preenchimento automatizado via integração com API externa.
    * Biografia: Área de texto livre para que o usuário adicione informações adicionais sobre si.
2.  **Formulário para Edição e Envio de Dados:** Uma interface intuitiva permite que o usuário modifique suas informações e salve as alterações no sistema.
3.  **Persistência de Dados em MySQL:** Todas as informações do perfil são salvas e recuperadas de um banco de dados MySQL, garantindo a persistência dos dados.
4.  **Aplicação Responsiva:** O design foi cuidadosamente pensado para adaptar-se a diferentes tamanhos de tela, garantindo uma boa aparência e usabilidade tanto em dispositivos móveis quanto em desktops.

## Pontos-Chave e Boas Práticas

Durante o desenvolvimento deste projeto, priorizei as seguintes boas práticas e considerações técnicas:

-   **Estrutura de Projeto Organizada:** Adotei uma separação clara entre o Frontend (na pasta `frontend/`) e o Backend (na pasta `backend/`), facilitando a navegação e o desenvolvimento.
-   **API RESTful:** O backend, construído com Node.js e Express, oferece as rotas essenciais para manipular os dados do perfil (`GET /usuario` para buscar e `POST /usuario` para salvar/atualizar).
-   **Componentização (React):** O frontend é estruturado em componentes React reutilizáveis, o que contribui para a modularidade, manutenção e escalabilidade do código.
-   **Gerenciamento de Estado:** Utilizei os Hooks `useState` e `useEffect` do React para gerenciar o estado da aplicação de forma eficiente e reativa.
-   **Validação de Dados:** Implementei validações básicas, incluindo a verificação e preenchimento de CEP através de integração com uma API externa.
-   **Tratamento de Erros:** O usuário recebe feedback visual claro em caso de erros, como CEP inválido ou problemas na comunicação com o servidor.
-   **Autenticação de Credenciais:** As credenciais Git/GitHub são gerenciadas via Git Credential Manager, garantindo um processo de push seguro e eficiente.

## Tecnologias Utilizadas

Este projeto foi construído utilizando um conjunto de tecnologias modernas e amplamente utilizadas no mercado:

### Frontend (React com Vite)

-   **React:** Biblioteca JavaScript robusta para a construção de interfaces de usuário dinâmicas.
-   **Vite:** Uma ferramenta de build rápida que otimiza o ambiente de desenvolvimento do frontend.
-   **Axios:** Cliente HTTP baseado em Promises, utilizado para realizar requisições assíncronas ao backend.
-   **Font Awesome:** Biblioteca de ícones que enriquece a interface visual da aplicação.
-   **CSS:** Estilização personalizada, com foco em responsividade e uma experiência visual agradável.

### Backend (Node.js com Express)

-   **Node.js:** Ambiente de execução JavaScript que permite construir o servidor da aplicação.
-   **Express.js:** Um framework web minimalista e flexível, utilizado para criar a API RESTful do projeto.
-   **MySQL2:** Driver oficial para uma comunicação eficiente e segura com o banco de dados MySQL.
-   **CORS:** Middleware essencial para gerenciar políticas de segurança, permitindo requisições de diferentes origens.
-   **Dotenv:** Utilizado para carregar variáveis de ambiente de um arquivo `.env`, mantendo configurações sensíveis fora do controle de versão.
-   **Nodemon:** Uma ferramenta de utilidade que monitora alterações no código e reinicia o servidor automaticamente, agilizando o desenvolvimento.
-   **Multer:** Middleware crucial para o tratamento de `multipart/form-data`, viabilizando o upload da imagem de perfil.
-   **Axios:** Também empregado no backend para realizar requisições HTTP, como a integração com a API ViaCEP.

### Banco de Dados

-   **MySQL:** Sistema de gerenciamento de banco de dados relacional, escolhido para a persistência dos dados dos usuários.
-   **MySQL Workbench:** Ferramenta gráfica utilizada para o gerenciamento e interação com o banco de dados.

### Ferramentas de Desenvolvimento

-   **Git:** Sistema de controle de versão fundamental para o gerenciamento do histórico do código.
-   **GitHub:** Plataforma de hospedagem do repositório, facilitando a colaboração e a apresentação do projeto.
-   **Visual Studio Code:** Meu editor de código-fonte preferido para este desenvolvimento.

## Pré-requisitos

Para configurar e executar este projeto em seu ambiente local, certifique-se de ter as seguintes ferramentas instaladas:

-   **Node.js** (versão 14.x ou superior) e **npm** (gerenciador de pacotes do Node.js) ou **Yarn**.
-   **MySQL Server**.
-   **Git**.






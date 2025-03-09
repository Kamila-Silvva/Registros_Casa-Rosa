# Sistema de Gerenciamento de Registros

Este projeto consiste em um sistema de gerenciamento de registros para uma ONG, onde é possível cadastrar, editar, visualizar e excluir registros de atendimentos. O sistema é composto por um backend em Node.js com Express e MySQL, e um frontend em React.

## Funcionalidades

- **Cadastro de Registros**: Permite cadastrar novos registros com informações como nome, CPF, telefone, data de entrada, data de saída, descrição e atendido por.
- **Edição de Registros**: Permite editar registros já cadastrados.
- **Exclusão de Registros**: Permite excluir registros existentes.
- **Listagem de Registros**: Exibe todos os registros cadastrados em uma tabela.
- **Pesquisa de Registros**: Permite pesquisar registros por nome, CPF ou telefone.

## Tecnologias Utilizadas

- **Backend**:
  - Node.js
  - Express
  - MySQL
  - CORS
- **Frontend**:
  - React
  - Axios

## Como Executar o Projeto

### Pré-requisitos

- Node.js instalado
- MySQL instalado e configurado
- Git instalado (opcional)

### Passos para Execução

1. **Clonar o Repositório**

   ```bash
   git clone https://github.com/Kamila-Silvva/Registros_Casa-Rosa
   cd Registros_Casa-Rosa

2. **Configurar o Banco de Dados**

Crie um banco de dados chamado ong no MySQL.

Execute o seguinte comando SQL para criar a tabela registros:

CREATE TABLE registros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  data_entrada DATE NOT NULL,
  data_saida DATE,
  descricao TEXT,
  atendido_por VARCHAR(255),
  cpf VARCHAR(14) NOT NULL,
  telefone VARCHAR(15) NOT NULL
);

3. **Configurar o Backend**

Navegue até a pasta do backend:
    cd backend

Instale as dependências:
    npm install

Configure as variáveis de ambiente no arquivo .env (se necessário):
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_PORT=3306
    DB_NAME=ong

Inicie o servidor:
    npm start

O servidor estará rodando em http://localhost:3001.

4. **Configurar o Frontend**

Navegue até a pasta do frontend:
    cd frontend

Instale as dependências:
    npm install

Inicie o servidor de desenvolvimento:
    npm start

O frontend estará rodando em http://localhost:3000.

# Estrutura do Projeto

#### Backend:

server.js: Configuração do servidor Express e rotas da API.

db.js: Configuração da conexão com o banco de dados MySQL.

#### Frontend:

App.js: Componente principal do React que gerencia o estado e a renderização do formulário e da lista de registros.

index.css e App.css: Estilos CSS para o frontend.

**Contribuição**

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

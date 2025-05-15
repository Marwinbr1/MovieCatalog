# Catálogo de Filmes - Projeto MVC

## Objetivo
Desenvolver um sistema web completo para cadastro, listagem, busca, edição e exclusão de filmes, utilizando o padrão arquitetural MVC (Model-View-Controller), com separação clara de responsabilidades e documentação detalhada.

---

## Equipe
- Marcos Winícios (2466473)
- Valéria Chagas (2458195)

---

## Descrição do Sistema
O Catálogo de Filmes permite ao usuário:
- Adicionar novos filmes (título, capa, sinopse, ano, categoria)
- Listar todos os filmes cadastrados
- Buscar filmes por categoria
- Editar informações de um filme
- Excluir filmes do catálogo
- Visualizar detalhes de cada filme

O sistema foi desenvolvido em grupo, com backend em Node.js/Express, frontend em React.js e banco de dados SQLite, seguindo o padrão MVC.

---

## Requisitos Funcionais Atendidos
1. Cadastro de novo filme
2. Listagem de filmes
3. Busca por categoria
4. Edição de filme
5. Exclusão de filme
6. Visualização de detalhes

---

## Componentes da Arquitetura (MVC)
- Model: Estrutura dos dados e comunicação com o banco (models/Movie.js)
- View: Interface do usuário (componentes React: MovieList, MovieForm, MovieDetail, ConfirmModal)
- Controller: Lógica de negócio e manipulação das requisições (backend/controllers/movieController.js)

---

## Fluxo de Comunicação
Usuário → View (React) → Controller (Express) → Model (SQLite) → Controller → View → Usuário

---

## Prints da Aplicação (Exemplos)
Coloque as imagens reais das telas na pasta 'prints' do projeto e ajuste os nomes conforme necessário.

1. Tela Inicial - Listagem de Filmes
   prints/tela-inicial.png
2. Tela de Cadastro de Filme
   prints/cadastro-filme.png
3. Tela de Edição de Filme
   prints/edicao-filme.png
4. Modal de Confirmação de Atualização
   prints/modal-atualizar.png
5. Tela de Detalhes do Filme
   prints/detalhes-filme.png
6. Tela de Busca por Categoria
   prints/busca-categoria.png

---

## Funcionalidades Detalhadas
- Cadastro: Formulário com validação, campos obrigatórios, feedback visual.
- Listagem: Exibe todos os filmes cadastrados, com opção de editar ou excluir.
- Busca: Filtro por categoria, busca dinâmica.
- Edição: Permite alterar qualquer campo do filme, com modal de confirmação ao atualizar.
- Exclusão: Modal de confirmação antes de remover definitivamente.
- Detalhes: Exibe todas as informações do filme selecionado.
- Feedback visual: Modais, loading, mensagens de sucesso/erro.

---

## Instruções para Executar o Sistema Localmente
Pré-requisitos: Node.js (v16+), npm ou yarn, SQLite (opcional)

1. Clone o repositório:
   git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
   cd NOME_DO_REPOSITORIO
2. Instale as dependências:
   cd backend && npm install
   cd ../frontend && npm install
3. Inicie o backend:
   cd backend && npm start
4. Inicie o frontend:
   cd ../frontend && npm start
5. Acesse em: http://localhost:3000

---

## Organização do Código
- backend/
  - controllers/
  - models/
  - routes/
  - database.sqlite
- frontend/
  - src/
    - components/
    - pages/
    - index.css
  - public/
- prints/ (imagens das telas)

---

## Tecnologias Utilizadas
- Frontend: React.js, CSS
- Backend: Node.js, Express.js
- Banco de Dados: SQLite
- Outros: Fetch API, padrão MVC

---

## Checklist de Entrega
[x] Projeto funcionando localmente
[x] Documentação em PDF anexada
[x] Prints das telas principais
[x] README completo no repositório
[x] Link do GitHub enviado

---

Este README.txt foi elaborado para facilitar a avaliação acadêmica, destacando todos os requisitos, arquitetura, funcionamento e instruções do projeto Catálogo de Filmes. 
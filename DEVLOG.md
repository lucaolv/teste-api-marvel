# DEVLOG - Desafio Front-End

### Dia 1 – Estrutura e Configuração
* Setup inicial do projeto com Vite + React.
* Configuração do ESLint e estrutura de pastas (components, pages, services).
* Configuração do `react-router-dom` no `main.jsx` e `App.jsx`.
* Criação do serviço de API em `marvelApi.js` com `axios` e autenticação (md5, chaves).

### Dia 2 – Página Principal (Home)
* Desenvolvimento da `HomePage` para listar os 20 personagens iniciais.
* Criação do componente `CharacterCard` e estilização básica seguindo o layout.
* Implementação do `SearchBar` e da função de busca (`nameStartsWith`).

### Dia 3 – Favoritos e Filtros
* Criação da `HeroPage` para exibir dados de um herói específico.
* Busca dos 10 últimos quadrinhos (`orderBy: -onsaleDate`).
* Estilização da página de detalhes e integração do botão de favoritar.

### Dia 4 – Página de Detalhes (Hero)
* Implementação do `FilterBar` para ordenação A/Z.
* Criação do sistema de favoritos no `App.jsx`, com persistência no `localStorage`.
* Adição da lógica de limite de 5 favoritos e do filtro "Somente Favoritos" na home.

### Dia 5 – Bônus e Testes
* Implementação da paginação na `HomePage` (Bônus).
* Criação de um `LoadingSpinner` (Bônus).
* Configuração e escrita de testes e2e com Playwright (Bônus).
* Deploy final na Vercel.
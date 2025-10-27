## 🚀 Guia de Instalação e Execução

Para rodar e avaliar este projeto localmente, siga os passos abaixo.

### Pré-requisitos
* **Node.js**: (v20 ou superior, conforme requisitos do Vite)
* **npm** (geralmente instalado com o Node.js)
* **Chaves da API da Marvel**: Você precisará das suas chaves (Pública e Privada) do [portal de desenvolvedores da Marvel](https://developer.marvel.com/).

### 1. Instalação

Primeiro, clone o repositório e instale as dependências.

```bash
# Clone o repositório
git clone <url-do-seu-repositorio>
cd <nome-do-repositorio>

# Instale as dependências
npm install
```

2. Configuração (API da Marvel)
Para que a aplicação se conecte à API da Marvel, você precisa fornecer suas chaves. O projeto está configurado para ler variáveis de ambiente.

Crie um arquivo chamado .env na raiz do projeto (no mesmo nível do package.json).

Adicione o seguinte conteúdo a ele, substituindo pelos seus valores:
```bash
VITE_APP_MARVEL_PUBLIC_KEY=sua_chave_publica_aqui
VITE_APP_MARVEL_PRIVATE_KEY=sua_chave_privada_aqui
```

3. Executando a Aplicação (Modo de Desenvolvimento)
Com tudo instalado e configurado, inicie o servidor de desenvolvimento do Vite:

```bash
npm run dev
```
A aplicação estará disponível em http://localhost:5173 (ou em outra porta, se esta estiver em uso).

4. Testando o Código
O projeto possui duas formas de teste, conforme solicitado no bônus:

A. Lint (Qualidade de Código)
Para verificar erros de padrão de código e boas práticas, rode o ESLint:
```bash
npm run lint
```

B. Testes End-to-End (e2e com Playwright)
Os testes e2e simulam o comportamento real do usuário (busca, clique, favoritar) usando mocking da API.

```bash
# 1. Instale os navegadores para o Playwright (só precisa na primeira vez)
npx playwright install

# 2. Rode os testes e2e
npx playwright test

# 3. (Opcional) Veja o relatório detalhado dos testes
npx playwright show-report
```

---

# Frontend Challenge

### Objetivo
Desenvolver uma aplicação de listagem e detalhe de personagens de quadrinhos.

#### Requisitos
- Deve ser uma SPA “single page application” (dar preferencia ao React);
- Não utilizar bibliotecas de UI como: bootstrap, semantic-ui, antdesign e etc;
- Utilizar API da Marvel (https://developer.marvel.com/docs);
- Disponibilizar em uma URL pública do projeto rodando para avaliação;
- Disponibilizar código em repositório Git de sua preferência, commitando cada fase do seu processo de desenvolvimento;
- Seguir layout da pasta `./assets`, respeitando as páginas, features e componentes (não será avaliado “pixel perfect”).

#### Requisitos funcionais
- Página de listagem de personagens (home):
  - Exibir os 20 primeiros resultados da API;
  - Permitir ordenação por nome do personagem;
  - Permitir filtrar por nome, pelo campo de busca;
  - Permitir mostrar apenas os personagens favoritos;
  - Permitir o usuário favoritar/desfavoritar até 5 personagens;
- Página de detalhe do personagem:
  - Exibir dados do personagem;
  - Exibir últimos 10 quadrinhos lançados deste personagem (onSaleDate);
  - Permitir o usuário favoritar/desfavoritar (dentro do limite de 5).
  
#### `Bônus (não obrigatório)`
- Adicionar paginação a listagem para exibir além dos 20 personagens iniciais;
- Persistir os dados de favoritos (para manter os dados após o reload da página);
- Layout responsivo;
- Utilização de ES6+;
- Utilização de ferramentas para garantir a qualidade do código;
- Teste e2e;
- CI/CD.

### Dicas
- Valorizamos muito testes em nosso processo de desenvolvimento;
- Aqui todos os desenvolvedores podem participar do processo de avaliação técnica então oriente os avaliadores a como instalar, testar e executar seu código.

<br/>
<br/>

---

## 🧠 Critérios de Avaliação

Os projetos serão avaliados com base nos seguintes critérios:

- Organização do código e estrutura de pastas
- Clareza e semântica no uso de HTML/CSS/JS/React
- Gerenciamento de estado e reatividade
- Qualidade de código (ESLint, boas práticas, modularização)
- Experiência do usuário (UX), mesmo sem foco em pixel perfect
- Entendimento do funcionamento da API da Marvel
- Explicações claras no README ou arquivos auxiliares

---

## 🧪 Autenticidade e Raciocínio do Candidato

Como forma de garantir a originalidade do desenvolvimento, solicitamos:

### 1. `DEVLOG.md`
Inclua um arquivo com breve descrição das etapas de desenvolvimento:
```
Dia 1 – Setup do projeto com React e estrutura de pastas.
Dia 2 – Consumo da API e criação da página de listagem.
Dia 3 – Ajuste no filtro por nome e favoritos.
```

### 2. Resposta técnica no `README.md`
Adicione ao final do seu README uma resposta curta (2–3 parágrafos) para a seguinte pergunta:

> *"Como você lidaria com o limite de 5 favoritos se estivesse usando Redux ou Zustand?"*

### 3. Commits descritivos
Utilize mensagens de commit claras e frequentes, demonstrando seu raciocínio ao longo do projeto.

---

## ⏱️ Prazo sugerido

Recomendamos a entrega em até **5 dias úteis** após o recebimento, mas o prazo não é eliminatório. Qualidade e clareza importam mais do que velocidade.

---


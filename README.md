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


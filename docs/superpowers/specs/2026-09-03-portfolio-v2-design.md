# Portfólio Vinicius Duran — v2

**Data:** 2026-09-03
**Branch:** `portfolio-v2`
**Status:** spec aprovada para plano de implementação

---

## 1. Objetivo

Substituir o conteúdo fictício do portfólio por trabalho real e verificável, e refinar
o visual existente sem trocar sua identidade.

O site hoje apresenta quatro projetos que não existem. O autor tem dez repositórios
reais, vários deles trabalho de cliente. O objetivo é fechar essa distância.

---

## 2. Estado atual — achados verificados

Tudo abaixo foi medido nesta sessão, não inferido.

### 2.1 Os projetos exibidos são inventados

`src/data/projects.js` lista *E-commerce Platform* (Stripe), *Task Management* (Vue.js),
*AI Chat Assistant* (OpenAI/LangChain) e *Portfolio Cinemático*. Os três primeiros não
correspondem a nenhum repositório da conta `Vinicius-Duran`. Todos os `links` apontam
para `href: '#'`.

**Risco:** um recrutador que peça o link descobre que os projetos não existem. O dano
de credibilidade é maior que o benefício de parecer ter mais projetos.

### 2.2 A página de case study exibe instruções ao visitante

`src/pages/project/Project.jsx` usa fallbacks `||` para campos vazios. Como
`longDescription`, `challenge`, `solution` e `outcome` são `''` em **todos** os
projetos, o visitante lê o texto de apoio do desenvolvedor:

| Linha | Texto visível hoje |
|---|---|
| `Project.jsx:86` | "Espaço para o cover do projeto" |
| `Project.jsx:88` | "substitua project.cover em src/data/projects.js" |
| `Project.jsx:112` | "[ ESPAÇO PARA TEXTO MAIS LONGO — edite longDescription em src/data/projects.js ]" |
| `Project.jsx:128` | "Descreva aqui o problema central, restrições e contexto…" |
| `Project.jsx:138` | "Explique a abordagem técnica, decisões de arquitetura e…" |
| `Project.jsx:148` | "Conte os resultados, números, feedback e principais apre…" |

É o defeito mais grave do site: não parece bug, parece descuido.

### 2.3 Todos os deploys estão inacessíveis

Sete URLs verificadas com `curl` sem seguir redirect:

| URL | Status |
|---|---|
| `landpage-2cct-six.vercel.app` e as outras 6 aliases curtas | `404` |
| `landpage-…-vinicius-durans-projects.vercel.app` | `302` → login Vercel (SSO) |
| `viniciusduranportifolio-…` | `302` → login Vercel (SSO) |
| `anasite-…` | `302` → login Vercel (SSO) |
| `taki-…`, `toda-producoes-…`, `appmo-…` | `404 DEPLOYMENT_NOT_FOUND` |
| `smarketi-site-…` | `410 GONE` |

São dois problemas somados: as aliases de produção estão desvinculadas, e nos deploys
remanescentes a *Deployment Protection* da Vercel está ativa. **O portfólio do autor
está fora do ar.** A causa raiz exige acesso ao painel da Vercel e está fora do escopo
desta spec; o código-fonte está integralmente preservado no GitHub.

### 2.4 Erro factual de contato

O handle real é **`Vinicius-Duran`**. No site:

- **Texto exibido no card de contato:** `github.com/viniciusduran` — **sem o hífen**.
  Esse handle não existe; quem digitar o que está na tela não chega ao perfil.
- **`href` do card e do rodapé:** `github.com/vinicius-duran` — difere apenas na
  caixa, e o GitHub resolve. **O link funciona**; o texto visível é que está errado.

O erro existe porque e-mail, GitHub e LinkedIn estão escritos à mão em três lugares
distintos (hero, cards de contato, rodapé), sem fonte única.

### 2.5 Conteúdo embutido nos componentes

- `About.jsx`: 19 certificados declarados inline, arquivo com ~600 linhas.
- `Home.jsx`: `skills` e `processSteps` inline.
- As listas de competências de `Home.jsx` e `About.jsx` **divergem entre si**.

### 2.6 Certificados — contagem conferida

- 20 PDFs em `public/`
- 19 entradas no array `certificates`
- 19 referências a PDF no código
- **0 links quebrados** (toda referência tem arquivo correspondente)
- 1 PDF órfão: `certificado-intermediario.pdf` (1,1 MB), nunca exibido

A estatística "19 Certificações" exibida em `About.jsx` está **correta**.

### 2.7 README do repositório é de outro projeto

`README.md` documenta "Perfect English Grammar", um site de exercícios de gramática
inglesa, com estrutura de pastas e funcionalidades que não existem neste repositório.

---

## 3. Decisões do autor

Registradas como tomadas, inclusive as contrárias à recomendação.

| Decisão | Escolha |
|---|---|
| Curadoria | 6 destaques com case study + faixa secundária |
| `appmo` | **Fora** — template `create-vite` com pouco código próprio |
| Repos privados (`smarketi-site`, `Ana-Site`) | **Fora** — "são projetos inacabados" (contra a recomendação de incluir `smarketi-site` só com link) |
| Ambição visual | Refinar o existente, preservando a identidade |
| Origem dos dados | Tudo fixo no código, escrito à mão — sem chamada à API do GitHub |
| Descrição de `landpage` e `Taki` | Extraída dos sites reais pelo assistente |
| `certificado-intermediario.pdf` | Remover do repositório |
| LinkedIn | O autor enviará o PDF do perfil |

---

## 4. Arquitetura de conteúdo

Criar `src/data/` como camada única de conteúdo. Componentes tornam-se apresentação pura.

| Arquivo | Conteúdo | Substitui |
|---|---|---|
| `profile.js` | nome, cargo, empresa, local, bio, e-mail, GitHub, LinkedIn | dados repetidos em Home + rodapé |
| `projects.js` | 6 destaques + 3 secundários, com case study | os 4 fictícios |
| `certificates.js` | os 19 certificados | array inline de `About.jsx` |
| `skills.js` | competências por camada, lista única | listas divergentes de Home e About |
| `experience.js` | trajetória profissional | **novo — depende do LinkedIn** |

**Critério:** nenhum dado de contato pode aparecer literal em JSX. Corrigir o handle do
GitHub passa a ser uma alteração em uma linha.

---

## 5. Projetos — conteúdo real

### 5.1 Destaques

| # | Projeto | Stack verificada | Origem da descrição |
|---|---|---|---|
| 01 | **Sistema Financeiro** (`Finance-front` + `Finance-back` num só case) | React, Vite, MUI, Axios, React Router, SweetAlert2, date-fns · Node, Express, Sequelize, MySQL, JWT, bcryptjs, express-validator · Gherkin/BDD | READMEs dos dois repos |
| 02 | **Todah Produções** | React 19, Vite 6, Tailwind CSS v4 | README do repo |
| 03 | **Loja em C#** | C# (80 KB), ASP.NET, HTML/CSS | leitura do código |
| 04 | **Taki Rastreadores** | HTML, JS, PHP, SEO (sitemap/robots) | site real |
| 05 | **Meta&Marketing** (repo `landpage`) | HTML, TypeScript, CSS, multi-página | site real |
| 06 | **Este portfólio** | React 19, React Router 7, CSS custom properties, IntersectionObserver | este repositório |

**Descrições verificadas:**

- **Taki Rastreadores** — Leme/SP. Software de gestão de frotas, telemetria,
  videotelemetria e controle de jornada do motorista. Site B2B multi-página com
  `sitemap.xml`, `robots.txt`, verificação Google e formulário de contato em PHP.
  H1: *"Controle total da sua frota com tecnologia de ponta"*.
- **Meta&Marketing** — agência de marketing digital para e-commerce, 18 anos.
  Páginas dedicadas a tráfego pago, e-mail marketing, SEO e criação de loja virtual.
  H1: *"Você cuida da sua loja. A gente cuida de tudo que faz ela vender."*

**Por que o 01 abre a lista:** é o único full-stack de ponta a ponta do acervo —
autenticação com JWT, hash de senha, ORM, validação e testes BDD. Hoje não aparece.

**Por que o 03 entra:** a bio do autor afirma "C# | .NET" e nada no site sustenta a
alegação. Sem ele, a competência mais vendável fica sem lastro.

### 5.2 Faixa secundária

`Financeiro` (C#), `CpfRecovery` (Python), `SiteFinance` — nome, stack e link, sem case study.

### 5.3 Regra de redação

Preencher `challenge`, `solution` e `outcome` a partir do código e do site de cada
projeto. **Onde não houver base factual, perguntar ao autor em vez de inventar** — é
exatamente o que produziu os projetos fictícios que esta spec remove.

---

## 6. Refino visual

Preservar: paleta roxo/azul/ciano, `Space Grotesk`, `JetBrains Mono`, reveals por
`IntersectionObserver`, mouse follower, marquee, barra de progresso de scroll.

| Alvo | Problema | Ação |
|---|---|---|
| Cards de projeto | gradientes vazios, sem imagem | screenshot real dos 5 destaques que rodam localmente; `Loja em C#` mantém tratamento tipográfico (ver §8) |
| Página de case study | layout mais fraco, dominado por placeholders | reconstruir com conteúdo real |
| Hierarquia tipográfica | escalas e espaçamentos ad-hoc | tokens de escala consistentes |
| Carrossel de certificados | `cardWidth = 492` fixo em px (`About.jsx`) | medida responsiva |
| Acessibilidade | sem `prefers-reduced-motion`, foco pouco visível | suporte a movimento reduzido, foco visível, contraste |

**Escopo de CSS:** 3.417 linhas em 10 arquivos. O refino altera tokens e os blocos de
projeto/case study; não é reescrita.

---

## 7. Correções factuais

1. Padronizar handle para `github.com/Vinicius-Duran` — corrige o texto exibido
   (hoje sem hífen, inexistente) e alinha a caixa do `href`
2. Preencher os links reais dos projetos, prontos para quando o deploy voltar
3. Reescrever `README.md` para descrever este portfólio
4. Dados reais de perfil: Zicard Digital Business Agency, Florianópolis/SC
5. Remover `public/certificado-intermediario.pdf`
6. Unificar a lista de competências divergente entre Home e About

---

## 8. Restrições e dependências

| Item | Situação | Consequência |
|---|---|---|
| `dotnet` | **ausente na máquina** | Sem screenshot de `Loja-CSharp` e `Financeiro`; esses cases usam apresentação tipográfica e trechos de código |
| MySQL para `Finance-back` | não verificado | O screenshot de `Finance-front` tende a mostrar tela de login/estado vazio; aceitável e honesto |
| LinkedIn | **pendente** | `experience.js` fica de fora se o PDF não chegar; nesse caso a seção de experiência não é criada, e nada é inventado no lugar |
| Deploys Vercel | fora do ar | Links preenchidos, mas nenhuma promessa de demo ao vivo no texto do site até o redeploy |

Ferramentas confirmadas: Node v24.17.0, npm 11.13.0, Python 3.12.10.

---

## 9. Fora de escopo

- Investigar ou consertar a conta Vercel (exige acesso do autor ao painel)
- Otimizar o repositório `toda-produ-es`, que carrega 730,2 MB em 377 arquivos
  versionados, com uma foto de 19,4 MB — problema real, mas de outro repositório
- Tornar públicos os repositórios privados
- Integração em tempo real com a API do GitHub
- Redesign da identidade visual

---

## 10. Critérios de aceite

1. Nenhum projeto fictício em `src/data/projects.js`
2. Nenhum texto de placeholder visível ao usuário em qualquer rota
3. Todo dado de contato origina-se de `profile.js`; nenhum literal em JSX
4. O handle do GitHub está correto em texto e em `href`
5. Os 19 certificados continuam abrindo seus PDFs, sem link quebrado
6. `README.md` descreve este projeto
7. `npm run build` e `npm run lint` passam
8. O site é navegável em 375 px, 768 px e 1440 px
9. `prefers-reduced-motion` suprime as animações
10. Toda afirmação factual do site é rastreável a um repositório, site ou documento real

---

## 11. Pendência aberta

O PDF do LinkedIn (perfil → **Mais** → **Salvar como PDF**), para `experience.js`.
Sem ele, o portfólio fica sem experiência profissional — o que, para quem tem dois anos
de mercado, costuma pesar mais que certificação.

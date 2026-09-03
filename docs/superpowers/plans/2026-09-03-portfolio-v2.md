# Portfólio Vinicius Duran v2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir o conteúdo fictício do portfólio por trabalho real e verificável, extrair o conteúdo dos componentes para uma camada de dados, e refinar o visual sem trocar a identidade.

**Architecture:** Cria-se `src/data/` como fonte única de conteúdo (perfil, projetos, certificados, competências). Os componentes passam a importar dados em vez de declará-los inline. Uma suíte Vitest converte os critérios de aceite da spec em testes executáveis que leem o código-fonte e o sistema de arquivos — é assim que "nenhum placeholder visível" e "nenhum contato literal em JSX" deixam de ser promessa e viram verificação.

**Tech Stack:** React 19, React Router DOM 7, Vite 6, Vitest 5, CSS custom properties, ESLint 9.

**Spec:** `docs/superpowers/specs/2026-09-03-portfolio-v2-design.md`

## Global Constraints

- Branch de trabalho: `portfolio-v2`. Nunca commitar na `main`.
- Idioma de todo texto visível ao usuário: **português do Brasil**.
- Handle do GitHub, em texto e em `href`: **`Vinicius-Duran`** (exato, com hífen e maiúsculas).
- E-mail de contato: `metaemarketing2@gmail.com`.
- Perfil real: Vinicius Duran · Zicard Digital Business Agency · Florianópolis, SC.
- **Proibido inventar fato.** Nenhuma métrica, número de usuários, percentual de performance ou depoimento pode entrar no site sem origem verificável. Onde faltar base, pergunte ao autor — foi exatamente a invenção que esta spec remove.
- **Proibido texto de placeholder em código de produção.** Nada de "descreva aqui", "espaço para", "em breve", "lorem".
- Preservar a identidade visual: paleta roxo/azul/ciano definida em `src/index.css`, `Space Grotesk` (display), `JetBrains Mono` (mono), reveals por `IntersectionObserver`.
- Linha de base já medida e verde: `eslint .` → exit 0; `vite build` → exit 0, bundle 353,45 kB JS / 55,68 kB CSS. **Nenhuma tarefa pode deixar lint ou build vermelhos.**
- Projetos fictícios a eliminar (slugs): `ecommerce-platform`, `task-management`, `ai-chat-assistant`.
- `dotnet` **não está instalado** nesta máquina: os projetos C# não podem ser executados nem capturados em tela.

---

### Task 1: Infraestrutura de teste e `profile.js`

Estabelece a suíte que valida os critérios de aceite e a fonte única de dados de contato. `profile.js` vem primeiro porque a Task 2 depende dele.

**Files:**
- Modify: `package.json` (devDependencies + script `test`)
- Create: `src/data/profile.js`
- Test: `src/data/profile.test.js`

**Interfaces:**
- Consumes: nada (primeira tarefa)
- Produces: `export const profile` — objeto com as chaves `name: string`, `role: string`, `company: string`, `location: string`, `email: string`, `github: { handle: string, url: string, label: string }`, `linkedin: { url: string, label: string }`, `bio: string`. Tasks 2 e 9 importam `profile`.

- [ ] **Step 1: Instalar o Vitest e registrar o script**

```bash
npm install -D vitest --no-audit --no-fund
```

Em `package.json`, dentro de `"scripts"`, acrescente a linha `test` mantendo as demais:

```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest run"
  },
```

- [ ] **Step 2: Escrever o teste que falha**

Crie `src/data/profile.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { profile } from './profile.js';

describe('profile', () => {
  it('expõe os campos de identidade exigidos pela spec', () => {
    expect(profile.name).toBe('Vinicius Duran');
    expect(profile.company).toBe('Zicard Digital Business Agency');
    expect(profile.location).toBe('Florianópolis, SC');
    expect(profile.email).toBe('metaemarketing2@gmail.com');
  });

  it('usa o handle exato do GitHub, com hífen e maiúsculas', () => {
    expect(profile.github.handle).toBe('Vinicius-Duran');
    expect(profile.github.url).toBe('https://github.com/Vinicius-Duran');
  });

  it('exibe o mesmo handle que o link resolve', () => {
    expect(profile.github.label).toBe('github.com/Vinicius-Duran');
    expect(profile.github.url).toContain(profile.github.handle);
  });

  it('aponta o LinkedIn por https', () => {
    expect(profile.linkedin.url).toMatch(/^https:\/\/(www\.)?linkedin\.com\/in\//);
  });
});
```

- [ ] **Step 3: Rodar o teste e confirmar que falha**

Run: `npx vitest run src/data/profile.test.js`
Expected: FAIL — `Error: Cannot find module './profile.js' imported from <caminho>/src/data/profile.test.js`, com o code frame apontando a linha do import. (Mensagem medida nesta base; **não** é `Failed to resolve import`. Cole a saída literal que você obtiver, mesmo divergindo desta.)

- [ ] **Step 4: Criar `src/data/profile.js`**

```js
export const profile = {
  name: 'Vinicius Duran',
  role: 'Desenvolvedor Full-Stack',
  company: 'Zicard Digital Business Agency',
  location: 'Florianópolis, SC',
  email: 'metaemarketing2@gmail.com',
  bio: 'Desenvolvedor full-stack com foco em interfaces vivas e sistemas robustos. Trabalho com React, C#, .NET e Node.js.',
  github: {
    handle: 'Vinicius-Duran',
    url: 'https://github.com/Vinicius-Duran',
    label: 'github.com/Vinicius-Duran',
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/vinicius-duran',
    label: 'linkedin.com/in/vinicius-duran',
  },
};
```

- [ ] **Step 5: Rodar o teste e confirmar que passa**

Run: `npx vitest run src/data/profile.test.js`
Expected: PASS — 4 testes.

- [ ] **Step 6: Verificar que a base continua verde**

Run: `npm run lint` → exit 0
Run: `npm run build` → exit 0

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json src/data/profile.js src/data/profile.test.js
git commit -m "Add test harness and profile data module"
```

---

### Task 2: Eliminar dados de contato literais do JSX

O handle errado (`github.com/viniciusduran`, sem hífen) existe porque contato está escrito à mão em três lugares. Esta tarefa cria a guarda que impede a reincidência e depois corrige a causa.

**Files:**
- Create: `src/data/contact.test.js`
- Modify: `src/pages/home/Home.jsx` (cards de contato ~linhas 380-430 e rodapé ~linhas 440-470)

**Interfaces:**
- Consumes: `profile` de `src/data/profile.js` (Task 1)
- Produces: nenhuma API nova; `Home.jsx` passa a importar `profile`

- [ ] **Step 1: Escrever o teste que falha**

Crie `src/data/contact.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const collectJsx = (dir, acc = []) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) collectJsx(full, acc);
    else if (full.endsWith('.jsx')) acc.push(full);
  }
  return acc;
};

const jsxFiles = collectJsx(resolve('src'));

describe('dados de contato', () => {
  it('encontra arquivos JSX para inspecionar', () => {
    expect(jsxFiles.length).toBeGreaterThan(0);
  });

  it('não deixa endereço de e-mail literal em JSX', () => {
    const offenders = jsxFiles.filter((f) =>
      /[\w.+-]+@[\w-]+\.[\w.]+/.test(readFileSync(f, 'utf8'))
    );
    expect(offenders).toEqual([]);
  });

  it('não deixa URL de GitHub ou LinkedIn literal em JSX', () => {
    const offenders = jsxFiles.filter((f) =>
      /(github\.com|linkedin\.com)/.test(readFileSync(f, 'utf8'))
    );
    expect(offenders).toEqual([]);
  });
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npx vitest run src/data/contact.test.js`
Expected: FAIL — os dois últimos testes apontam `src/pages/home/Home.jsx`.

- [ ] **Step 3: Importar o perfil em `Home.jsx`**

No topo de `src/pages/home/Home.jsx`, junto aos demais imports:

```jsx
import { profile } from '../../data/profile';
```

- [ ] **Step 4: Trocar os três cards de contato por dados do perfil**

Substitua os três `<a className="contact-card ...">` da seção `#contact` por:

```jsx
<a
  href={`mailto:${profile.email}`}
  className="contact-card reveal delay-1 magnetic"
>
  <span className="contact-card-index mono">01</span>
  <span className="contact-card-label">Email</span>
  <span className="contact-card-value">{profile.email}</span>
  <span className="contact-card-cta">
    <span>Enviar mensagem</span>
    <span aria-hidden="true">→</span>
  </span>
</a>
<a
  href={profile.linkedin.url}
  target="_blank"
  rel="noopener noreferrer"
  className="contact-card reveal delay-2 magnetic"
>
  <span className="contact-card-index mono">02</span>
  <span className="contact-card-label">LinkedIn</span>
  <span className="contact-card-value">{profile.linkedin.label}</span>
  <span className="contact-card-cta">
    <span>Conectar</span>
    <span aria-hidden="true">→</span>
  </span>
</a>
<a
  href={profile.github.url}
  target="_blank"
  rel="noopener noreferrer"
  className="contact-card reveal delay-3 magnetic"
>
  <span className="contact-card-index mono">03</span>
  <span className="contact-card-label">GitHub</span>
  <span className="contact-card-value">{profile.github.label}</span>
  <span className="contact-card-cta">
    <span>Ver código</span>
    <span aria-hidden="true">→</span>
  </span>
</a>
```

- [ ] **Step 5: Trocar os links do rodapé**

Substitua o bloco `<div className="footer-links">` por:

```jsx
<div className="footer-links">
  <a href={profile.github.url} target="_blank" rel="noopener noreferrer">GitHub</a>
  <a href={profile.linkedin.url} target="_blank" rel="noopener noreferrer">LinkedIn</a>
  <a href={`mailto:${profile.email}`}>Email</a>
  <a
    href="#top"
    onClick={(e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }}
  >
    Topo ↑
  </a>
</div>
```

- [ ] **Step 6: Rodar e confirmar que passa**

Run: `npx vitest run src/data/contact.test.js`
Expected: PASS — 3 testes.

- [ ] **Step 7: Verificar lint e build**

Run: `npm run lint` → exit 0
Run: `npm run build` → exit 0

- [ ] **Step 8: Commit**

```bash
git add src/data/contact.test.js src/pages/home/Home.jsx
git commit -m "Source contact details from profile module

Fixes the GitHub handle shown in the contact card, which read
github.com/viniciusduran without the hyphen and resolved to nothing."
```

---

### Task 3: Substituir os projetos fictícios pelos reais

**Files:**
- Modify: `src/data/projects.js` (substituição integral do array)
- Test: `src/data/projects.test.js`

**Interfaces:**
- Consumes: nada
- Produces: `export const projects` — array de objetos com `id, slug, title, tagline, role, year, client, duration, status, description, longDescription, challenge, solution, outcome, tech, techDetailed, links, accent, cover, gallery, featured: boolean, repo: string`. Mantém `getProjectBySlug(slug)` e `getAdjacentProjects(slug)` já existentes. Task 4 e Task 7 dependem deste formato.

**Nota sobre `featured`:** campo novo. Projetos com `featured: true` recebem case study; `false` aparecem apenas na faixa secundária. `getAdjacentProjects` deve navegar somente entre destaques.

- [ ] **Step 1: Escrever o teste que falha**

Crie `src/data/projects.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { projects, getProjectBySlug, getAdjacentProjects } from './projects.js';

const FICTIONAL = ['ecommerce-platform', 'task-management', 'ai-chat-assistant'];
const featured = () => projects.filter((p) => p.featured);

describe('projetos', () => {
  it('não contém nenhum dos projetos fictícios', () => {
    const slugs = projects.map((p) => p.slug);
    for (const slug of FICTIONAL) expect(slugs).not.toContain(slug);
  });

  it('tem 6 destaques e 3 secundários', () => {
    expect(featured()).toHaveLength(6);
    expect(projects.filter((p) => !p.featured)).toHaveLength(3);
  });

  it('preenche o case study de todo destaque', () => {
    for (const p of featured()) {
      expect(p.longDescription.length, `${p.slug}.longDescription`).toBeGreaterThan(80);
      expect(p.challenge.length, `${p.slug}.challenge`).toBeGreaterThan(60);
      expect(p.solution.length, `${p.slug}.solution`).toBeGreaterThan(60);
      expect(p.outcome.length, `${p.slug}.outcome`).toBeGreaterThan(40);
    }
  });

  it('não usa href vazio em nenhum link', () => {
    for (const p of projects) {
      for (const link of p.links) {
        expect(link.href, `${p.slug} → ${link.label}`).not.toBe('#');
        expect(link.href.length).toBeGreaterThan(1);
      }
    }
  });

  it('aponta todo repositório para o handle correto', () => {
    for (const p of projects) {
      expect(p.repo).toContain('github.com/Vinicius-Duran/');
    }
  });

  it('usa ids e slugs únicos', () => {
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length);
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  });

  it('navega apenas entre destaques', () => {
    const first = featured()[0];
    const { prev, next } = getAdjacentProjects(first.slug);
    expect(prev.featured).toBe(true);
    expect(next.featured).toBe(true);
  });

  it('resolve projeto por slug', () => {
    expect(getProjectBySlug(featured()[0].slug)).toBeDefined();
    expect(getProjectBySlug('inexistente')).toBeUndefined();
  });
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npx vitest run src/data/projects.test.js`
Expected: FAIL — os slugs fictícios ainda estão presentes e `featured` não existe.

- [ ] **Step 3: Reescrever `src/data/projects.js`**

Substitua o conteúdo inteiro do arquivo por:

```js
export const projects = [
  {
    id: '001',
    slug: 'sistema-financeiro',
    title: 'Sistema Financeiro',
    tagline: 'Aplicação full-stack de gestão financeira, do banco de dados à interface.',
    role: 'Full-Stack',
    year: '2025',
    client: 'Projeto de formação — SENAI/SC',
    duration: 'Front e back em repositórios separados',
    status: 'Código aberto',
    featured: true,
    repo: 'https://github.com/Vinicius-Duran/Finance-front',
    description:
      'Sistema de gestão financeira com CRUD de usuários, centros de custo, receitas, contas bancárias e lançamentos.',
    longDescription:
      'Aplicação dividida em dois repositórios: uma API REST em Node.js e um cliente React. Cobre cinco entidades de negócio — usuários, centros de custo, receitas, contas bancárias e lançamentos — com autenticação por token, validação de entrada no servidor e cenários de teste escritos em Gherkin. É o projeto onde a separação entre camada de dados, regra de negócio e interface aparece de forma mais completa.',
    challenge:
      'Construir um sistema financeiro que não fosse apenas um CRUD de tela: era preciso autenticar usuários com segurança, garantir que dados monetários e relacionamentos entre entidades não fossem corrompidos por entrada inválida, e manter o cliente desacoplado do servidor.',
    solution:
      'A API usa Express com Sequelize sobre MySQL, senhas com hash bcrypt e sessões por JWT, com express-validator barrando entrada malformada antes de chegar ao banco. O cliente React consome a API por Axios, com Material UI na interface, React Router nas rotas e date-fns no tratamento de datas. Os cenários de aceite foram descritos em Gherkin, separando o comportamento esperado da implementação.',
    outcome:
      'Entregou as cinco entidades com CRUD completo, autenticação funcional e cenários de comportamento versionados. É o projeto do acervo que melhor demonstra domínio de uma stack inteira, de esquema de banco a interface.',
    tech: ['React', 'Node.js', 'Express', 'MySQL', 'JWT'],
    techDetailed: {
      Frontend: ['React', 'Vite', 'Material UI', 'Axios', 'React Router DOM', 'date-fns', 'SweetAlert2'],
      Backend: ['Node.js', 'Express', 'Sequelize', 'express-validator'],
      Segurança: ['JWT', 'bcryptjs'],
      Dados: ['MySQL'],
      Testes: ['Gherkin / BDD'],
    },
    links: [
      { label: 'Código do front', href: 'https://github.com/Vinicius-Duran/Finance-front', kind: 'primary' },
      { label: 'Código do back', href: 'https://github.com/Vinicius-Duran/Finance-back', kind: 'ghost' },
    ],
    accent: 'linear-gradient(135deg, #68b2f8, #506ee5, #7037cd)',
    cover: null,
    gallery: [],
  },
  {
    id: '002',
    slug: 'todah-producoes',
    title: 'Todah Produções',
    tagline: 'Site institucional e vitrine de artistas de um agenciamento musical.',
    role: 'Frontend',
    year: '2026',
    client: 'Todah Produções Artísticas',
    duration: 'Projeto de cliente',
    status: 'Código aberto',
    featured: true,
    repo: 'https://github.com/Vinicius-Duran/toda-produ-es',
    description:
      'Site institucional e vitrine de artistas da Todah Produções Artísticas, agenciamento da música gospel brasileira.',
    longDescription:
      'Site institucional construído com React 19 e Vite 6, usando Tailwind CSS v4 pelo plugin oficial do Vite. A tipografia combina Fraunces no display com Plus Jakarta Sans no texto corrido. O conteúdo dos artistas é organizado numa camada de dados própria, separada dos componentes de apresentação.',
    challenge:
      'Apresentar um elenco de artistas de forma que cada um tivesse identidade visual própria sem quebrar a unidade do site, e manter o cadastro de artistas fácil de atualizar por quem não escreve código.',
    solution:
      'Adotei Tailwind v4 pelo plugin do Vite, evitando arquivo de configuração e mantendo o estilo junto do componente. Os dados dos artistas ficam num módulo separado em src/data, de modo que incluir um artista novo é acrescentar uma entrada, não editar JSX. O par tipográfico Fraunces e Plus Jakarta Sans dá o contraste entre título editorial e texto legível.',
    outcome:
      'Site entregue com a vitrine de artistas funcionando e o conteúdo desacoplado da apresentação. O projeto foi minha primeira experiência com Tailwind v4 e com o React 19 em trabalho de cliente.',
    tech: ['React 19', 'Vite 6', 'Tailwind CSS v4'],
    techDetailed: {
      Frontend: ['React 19', 'Vite 6'],
      Estilo: ['Tailwind CSS v4', '@tailwindcss/vite'],
      Tipografia: ['Fraunces', 'Plus Jakarta Sans'],
    },
    links: [
      { label: 'Ver código', href: 'https://github.com/Vinicius-Duran/toda-produ-es', kind: 'primary' },
    ],
    accent: 'linear-gradient(135deg, #8a52ff, #ff3da8, #68b2f8)',
    cover: null,
    gallery: [],
  },
  {
    id: '003',
    slug: 'loja-csharp',
    title: 'Loja em C#',
    tagline: 'Aplicação de loja em C# com ASP.NET, orientada a objetos.',
    role: 'Backend',
    year: '2024',
    client: 'Projeto de formação — SENAI/SC',
    duration: 'Projeto acadêmico',
    status: 'Código aberto',
    featured: true,
    repo: 'https://github.com/Vinicius-Duran/Loja-CSharp',
    description:
      'Aplicação de loja construída em C# sobre ASP.NET, com camadas separadas e interface web.',
    longDescription:
      'Aplicação de loja escrita em C# — cerca de 80 KB de código — sobre ASP.NET, com as camadas de acesso a dados e de regra de negócio separadas da apresentação. É o projeto que sustenta a parte .NET da minha stack, junto com o repositório Financeiro, do mesmo período.',
    challenge:
      'Sair do paradigma de script e estruturar uma aplicação orientada a objetos de verdade, com responsabilidades separadas entre acesso a dados, regra de negócio e interface, em vez de concentrar tudo na camada de tela.',
    solution:
      'Organizei o código em camadas, mantendo as operações de dados isoladas das regras de negócio e ambas isoladas das views. A tipagem forte e as construções de orientação a objetos do C# guiaram a modelagem das entidades da loja.',
    outcome:
      'Entregou a aplicação funcionando com a separação de camadas pretendida. É a base prática da competência em C# e .NET que declaro no perfil, e o ponto de partida para os fundamentos de ASP.NET Core que estudei depois.',
    tech: ['C#', 'ASP.NET', 'POO'],
    techDetailed: {
      Linguagem: ['C#'],
      Plataforma: ['ASP.NET', '.NET'],
      Arquitetura: ['Orientação a objetos', 'Separação em camadas'],
      Interface: ['HTML', 'CSS', 'JavaScript'],
    },
    links: [
      { label: 'Ver código', href: 'https://github.com/Vinicius-Duran/Loja-CSharp', kind: 'primary' },
    ],
    accent: 'linear-gradient(135deg, #7df9ff, #68b2f8, #8a52ff)',
    cover: null,
    gallery: [],
  },
  {
    id: '004',
    slug: 'taki-rastreadores',
    title: 'Taki Rastreadores',
    tagline: 'Site B2B de rastreamento e gestão de frotas, com SEO técnico.',
    role: 'Frontend · SEO',
    year: '2026',
    client: 'Taki Rastreadores — Leme/SP',
    duration: 'Projeto de cliente',
    status: 'Código aberto',
    featured: true,
    repo: 'https://github.com/Vinicius-Duran/Taki',
    description:
      'Site institucional B2B da Taki Rastreadores: gestão de frotas, telemetria, videotelemetria e controle de jornada do motorista.',
    longDescription:
      'Site multi-página para uma empresa de rastreamento veicular de Leme, São Paulo. Além da home e das páginas institucionais, há uma página dedicada a cada produto: gestão de frotas, telemetria, videotelemetria e jornada do motorista. A camada técnica inclui sitemap.xml, robots.txt, verificação de propriedade no Google e um formulário de contato processado em PHP.',
    challenge:
      'Um site B2B de rastreamento precisa ser encontrado por quem procura a solução, não apenas existir. Cada produto tinha público e vocabulário de busca próprios, e uma página única não atenderia a essa variedade de intenção.',
    solution:
      'Estruturei o site em uma página por produto, cada uma com título e descrição próprios, sustentadas por sitemap.xml e robots.txt para orientar a indexação, mais a verificação de propriedade no Google. O formulário de contato é processado no servidor por PHP, com página de confirmação após o envio.',
    outcome:
      'Entregou um site com estrutura de indexação completa e um canal de contato funcionando ponta a ponta. Foi o projeto onde a parte técnica de SEO deixou de ser teoria e virou implementação.',
    tech: ['HTML', 'JavaScript', 'PHP', 'SEO'],
    techDetailed: {
      Frontend: ['HTML', 'CSS', 'JavaScript'],
      Servidor: ['PHP'],
      SEO: ['sitemap.xml', 'robots.txt', 'Google Search Console'],
    },
    links: [
      { label: 'Ver código', href: 'https://github.com/Vinicius-Duran/Taki', kind: 'primary' },
    ],
    accent: 'linear-gradient(135deg, #506ee5, #7df9ff, #68b2f8)',
    cover: null,
    gallery: [],
  },
  {
    id: '005',
    slug: 'meta-marketing',
    title: 'Meta&Marketing',
    tagline: 'Site de agência de marketing digital especializada em e-commerce.',
    role: 'Frontend',
    year: '2026',
    client: 'Meta&Marketing',
    duration: 'Projeto de cliente',
    status: 'Código aberto',
    featured: true,
    repo: 'https://github.com/Vinicius-Duran/landpage',
    description:
      'Site de agência de marketing digital para e-commerce, com uma página dedicada a cada serviço.',
    longDescription:
      'Site multi-página de uma agência de marketing digital voltada a e-commerce. Além da home e do institucional, há uma página por serviço: tráfego pago, e-mail marketing, SEO, mídia social e criação de loja virtual. O repositório também versiona a pasta de marca, mantendo os ativos de identidade junto do código.',
    challenge:
      'Uma agência que vende cinco serviços distintos não cabe numa landing page única: cada serviço tem sua própria promessa e seu próprio público, e amontoá-los na mesma página enfraquece todos.',
    solution:
      'Separei o site em uma página por serviço, cada uma com sua própria argumentação e chamada para ação, mantendo a home como porta de entrada. Os ativos de marca ficam versionados junto ao código, evitando divergência entre o que está no site e o que a agência usa em outras peças.',
    outcome:
      'Entregou sete páginas com identidade consistente e argumentação separada por serviço. Reforçou minha prática de estruturar conteúdo de marketing em arquitetura de informação, não em página única.',
    tech: ['HTML', 'TypeScript', 'CSS'],
    techDetailed: {
      Frontend: ['HTML', 'TypeScript', 'CSS'],
      Estrutura: ['Multi-página', 'Uma página por serviço'],
      Marca: ['Ativos de identidade versionados'],
    },
    links: [
      { label: 'Ver código', href: 'https://github.com/Vinicius-Duran/landpage', kind: 'primary' },
    ],
    accent: 'linear-gradient(135deg, #ff3da8, #8a52ff, #506ee5)',
    cover: null,
    gallery: [],
  },
  {
    id: '006',
    slug: 'portfolio',
    title: 'Este portfólio',
    tagline: 'Portfólio próprio com design system, motion e camada de dados.',
    role: 'Frontend · Motion',
    year: '2026',
    client: 'Pessoal',
    duration: 'Em evolução',
    status: 'Código aberto',
    featured: true,
    repo: 'https://github.com/Vinicius-Duran/ViniciusDuranPortifolio',
    description:
      'O site que você está navegando: React 19, design system em CSS custom properties e animação por IntersectionObserver.',
    longDescription:
      'Portfólio construído do zero em React 19 com React Router 7. O sistema visual é definido por custom properties do CSS — paleta, tipografia e curvas de easing num único ponto — e as animações de entrada usam IntersectionObserver por um hook próprio, sem biblioteca de animação. Todo o conteúdo vive numa camada de dados separada dos componentes.',
    challenge:
      'Um portfólio precisa ser visualmente memorável sem virar um amontoado de efeitos, e precisa ser fácil de atualizar — senão o conteúdo envelhece e o site vira uma vitrine desatualizada de si mesmo.',
    solution:
      'Centralizei paleta, tipografia e easing em custom properties, de modo que ajustar a identidade é editar variáveis, não caçar valores no CSS. Escrevi um hook de reveal sobre IntersectionObserver em vez de importar biblioteca de animação, mantendo o bundle enxuto. O conteúdo — perfil, projetos, certificados, competências — mora em src/data, separado da apresentação.',
    outcome:
      'Resultou num site cujo conteúdo se atualiza sem tocar em JSX, com uma suíte de testes que impede a volta de dados fictícios e de texto de rascunho na interface.',
    tech: ['React 19', 'React Router 7', 'CSS Custom Properties'],
    techDetailed: {
      Frontend: ['React 19', 'React Router DOM 7', 'Vite 6'],
      Estilo: ['CSS Custom Properties', 'Animações próprias'],
      Motion: ['IntersectionObserver', 'Mouse follower em rAF'],
      Qualidade: ['Vitest', 'ESLint'],
    },
    links: [
      { label: 'Ver código', href: 'https://github.com/Vinicius-Duran/ViniciusDuranPortifolio', kind: 'primary' },
    ],
    accent: 'linear-gradient(135deg, #7037cd, #ff3da8, #7df9ff)',
    cover: null,
    gallery: [],
  },
  {
    id: '007',
    slug: 'financeiro-csharp',
    title: 'Financeiro',
    tagline: 'Aplicação financeira em C#, do mesmo ciclo da Loja.',
    role: 'Backend',
    year: '2024',
    client: 'Projeto de formação — SENAI/SC',
    duration: 'Projeto acadêmico',
    status: 'Código aberto',
    featured: false,
    repo: 'https://github.com/Vinicius-Duran/Financeiro',
    description: 'Aplicação de controle financeiro em C# sobre ASP.NET.',
    longDescription: '',
    challenge: '',
    solution: '',
    outcome: '',
    tech: ['C#', 'ASP.NET'],
    techDetailed: { Linguagem: ['C#'], Plataforma: ['ASP.NET'] },
    links: [
      { label: 'Ver código', href: 'https://github.com/Vinicius-Duran/Financeiro', kind: 'primary' },
    ],
    accent: 'linear-gradient(135deg, #506ee5, #7037cd)',
    cover: null,
    gallery: [],
  },
  {
    id: '008',
    slug: 'cpf-recovery',
    title: 'CPF Recovery',
    tagline: 'Utilitário em Python que reconstrói CPFs parciais pelo dígito verificador.',
    role: 'Scripting',
    year: '2025',
    client: 'Estudo próprio',
    duration: 'Script utilitário',
    status: 'Código aberto',
    featured: false,
    repo: 'https://github.com/Vinicius-Duran/CpfRecovery',
    description:
      'Gera as combinações válidas de um CPF parcial aplicando a fórmula oficial dos dígitos verificadores.',
    longDescription: '',
    challenge: '',
    solution: '',
    outcome: '',
    tech: ['Python'],
    techDetailed: { Linguagem: ['Python'], Domínio: ['Algoritmo de dígito verificador'] },
    links: [
      { label: 'Ver código', href: 'https://github.com/Vinicius-Duran/CpfRecovery', kind: 'primary' },
    ],
    accent: 'linear-gradient(135deg, #7df9ff, #506ee5)',
    cover: null,
    gallery: [],
  },
  {
    id: '009',
    slug: 'site-finance',
    title: 'SiteFinance',
    tagline: 'Primeiro exercício de layout em HTML e CSS puros.',
    role: 'Frontend',
    year: '2024',
    client: 'Estudo próprio',
    duration: 'Exercício',
    status: 'Código aberto',
    featured: false,
    repo: 'https://github.com/Vinicius-Duran/SiteFinance',
    description: 'Exercício inicial de estruturação e estilo com HTML e CSS.',
    longDescription: '',
    challenge: '',
    solution: '',
    outcome: '',
    tech: ['HTML', 'CSS'],
    techDetailed: { Frontend: ['HTML', 'CSS'] },
    links: [
      { label: 'Ver código', href: 'https://github.com/Vinicius-Duran/SiteFinance', kind: 'primary' },
    ],
    accent: 'linear-gradient(135deg, #2a0e35, #651f71)',
    cover: null,
    gallery: [],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const secondaryProjects = projects.filter((p) => !p.featured);

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);

export const getAdjacentProjects = (slug) => {
  const list = featuredProjects;
  const index = list.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  const prev = index > 0 ? list[index - 1] : list[list.length - 1];
  const next = index < list.length - 1 ? list[index + 1] : list[0];
  return { prev, next };
};
```

- [ ] **Step 4: Separar destaques de secundários em `Home.jsx`**

`Home.jsx` renderiza hoje o array `projects` inteiro. Com nove projetos, um exercício
de HTML apareceria como igual do projeto full-stack. Troque o import:

```jsx
import { featuredProjects, secondaryProjects } from '../../data/projects';
```

Troque o contador de reveals:

```jsx
  const setProjectRef = useRevealMany(featuredProjects.length, { threshold: 0.12 });
```

Na `<ul className="project-list">`, troque `projects.map(` por `featuredProjects.map(`.

- [ ] **Step 5: Acrescentar a faixa secundária e corrigir o rodapé da seção**

O rodapé diz hoje `{projects.length} projects · mais em breve` — "em breve" é texto de
rascunho, proibido pelas restrições globais.

**Atenção — armadilha medida em runtime.** `src/index.css:155-156` revela um `.reveal`
apenas quando o próprio nó ou um ancestral recebe `is-visible`:

```css
.reveal.is-visible,
.is-visible .reveal {
```

Na seção de projetos, só `.section-header` e cada `.project-row` têm ref de
`IntersectionObserver`; a `<section id="projects">` não tem. Um `.reveal` novo sem ref
próprio fica em `opacity: 0` **para sempre** — foi assim que o `projects-foot` original
ficou invisível sem ninguém notar. Por isso os dois blocos abaixo levam ref.

Declare os dois refs junto aos existentes (perto de `projectsHeaderRef`):

```jsx
  const projectsSecondaryRef = useReveal();
  const projectsFootRef = useReveal();
```

Não ponha o ref na `<section id="projects">`: isso faria as seis linhas de projeto
aparecerem de uma vez e destruiria a entrada escalonada.

Substitua o bloco `projects-foot` inteiro por:

```jsx
          <div className="projects-secondary reveal delay-1" ref={projectsSecondaryRef}>
            <span className="projects-secondary-label mono">Outros repositórios</span>
            <ul className="projects-secondary-list">
              {secondaryProjects.map((project) => (
                <li key={project.id}>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="projects-secondary-link"
                  >
                    <span className="projects-secondary-name">{project.title}</span>
                    <span className="projects-secondary-tech mono">
                      {project.tech.join(' · ')}
                    </span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="projects-foot reveal delay-2" ref={projectsFootRef}>
            <span className="mono">
              {String(featuredProjects.length).padStart(2, '0')} projetos em destaque ·{' '}
              {String(secondaryProjects.length).padStart(2, '0')} outros
            </span>
            <Link to="/about" className="link-ghost magnetic">
              <span>Ver trajetória</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
```

- [ ] **Step 6: Estilizar a faixa secundária em `Home.css`**

Acrescente ao fim de `src/pages/home/Home.css`:

```css
.projects-secondary {
  margin-top: 56px;
  padding-top: 28px;
  border-top: 1px solid var(--white-10);
}

.projects-secondary-label {
  display: block;
  margin-bottom: 16px;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--white-40);
}

.projects-secondary-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 2px;
}

.projects-secondary-link {
  display: grid;
  grid-template-columns: minmax(140px, 1fr) 2fr auto;
  gap: 16px;
  align-items: baseline;
  padding: 14px 4px;
  color: var(--white-60);
  text-decoration: none;
  border-bottom: 1px solid var(--white-06);
  transition: color 0.3s var(--ease-smooth), padding-left 0.3s var(--ease-smooth);
}

.projects-secondary-link:hover {
  color: var(--white);
  padding-left: 12px;
}

.projects-secondary-name {
  font-family: var(--font-display);
  font-size: 1rem;
}

.projects-secondary-tech {
  font-size: 0.74rem;
  color: var(--white-40);
}

@media (max-width: 768px) {
  .projects-secondary-link {
    grid-template-columns: 1fr auto;
    gap: 6px;
  }

  .projects-secondary-tech {
    grid-column: 1 / -1;
  }
}
```

- [ ] **Step 7: Rodar e confirmar que passa**

Run: `npx vitest run src/data/projects.test.js`
Expected: PASS — 8 testes.

- [ ] **Step 8: Conferir a home no navegador**

**O MCP `chrome-devtools` NÃO funciona neste ambiente** (medido: o Chrome não expõe a
porta de depuração; `list_pages` falha com `Could not find DevToolsActivePort`). Use
Playwright, já instalado no scratchpad da sessão em `shotter/`.

Suba o preview e meça o DOM, não só a imagem:

```
& ".\node_modules\.bin\vite.cmd" build
& ".\node_modules\.bin\vite.cmd" preview --port 4181 --strictPort
```

Carregue `http://localhost:4181/`, role até o fim, espere ~2,5 s e leia de volta:

- `document.querySelectorAll('.project-row').length` → **6**
- `document.querySelectorAll('.projects-secondary-link').length` → **3**
- `getComputedStyle(document.querySelector('.projects-secondary')).opacity` → **"1"**
- `getComputedStyle(document.querySelector('.projects-foot')).opacity` → **"1"**
- `document.body.innerText.toLowerCase().includes('em breve')` → **false**
- erros de console → **nenhum**

As duas medições de `opacity` são obrigatórias: um grep no bundle prova que a string
chegou ao cliente, e **não** que o usuário a enxerga. Foi exatamente essa diferença que
deixou a faixa secundária invisível na primeira tentativa desta tarefa.

- [ ] **Step 9: Verificar lint e build**

Run: `npm run lint` → exit 0
Run: `npm run build` → exit 0

- [ ] **Step 10: Commit**

```bash
git add src/data/projects.js src/data/projects.test.js src/pages/home/Home.jsx src/pages/home/Home.css
git commit -m "Replace fictional projects with real repositories

The four listed projects did not exist in the author's GitHub account.
Replaces them with six featured projects and three secondary ones, all
backed by real repositories, each with case study content."
```

---

### Task 4: Remover os placeholders visíveis de `Project.jsx`

Os seis textos de rascunho que o visitante lê hoje. Ver spec §2.2.

**Files:**
- Modify: `src/pages/project/Project.jsx` (linhas 71-95, 107-114, 119-153, 155-189)
- Test: `src/pages/project/Project.test.js`

**Interfaces:**
- Consumes: o formato de projeto da Task 3, incluindo `gallery` como array possivelmente vazio
- Produces: nenhuma API nova

- [ ] **Step 1: Escrever o teste que falha**

Crie `src/pages/project/Project.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const collect = (dir, acc = []) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) collect(full, acc);
    else if (full.endsWith('.jsx')) acc.push(full);
  }
  return acc;
};

const PLACEHOLDERS = [
  /ESPAÇO PARA/i,
  /Espaço para o cover/i,
  /substitua project\./i,
  /Descreva aqui/i,
  /Explique a abordagem/i,
  /Conte os resultados/i,
  /lorem ipsum/i,
  /em breve/i,
];

describe('texto de placeholder', () => {
  it('não aparece em nenhum componente JSX', () => {
    const offenders = [];
    for (const file of collect(resolve('src'))) {
      const src = readFileSync(file, 'utf8');
      for (const pattern of PLACEHOLDERS) {
        if (pattern.test(src)) offenders.push(`${file} :: ${pattern}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npx vitest run src/pages/project/Project.test.js`

Expected: FAIL. As ocorrências foram levantadas por grep e são estas — confira que a
saída bate, e não confie na contagem de cabeça:

| Arquivo | Linhas | Removidas por |
|---|---|---|
| `src/pages/project/Project.jsx` | 86, 88, 112, 128, 138, 148 | **esta tarefa** |
| `src/pages/about/About.jsx` | 227, 512 (`Em breve`) | Task 5 |
| `src/pages/home/Home.jsx` | 364 (`mais em breve`) | Task 3, Step 5 |

Se a Task 3 já foi concluída, `Home.jsx` não deve mais aparecer.

- [ ] **Step 3: Substituir o bloco de capa (linhas 71-95)**

```jsx
      {project.cover && (
        <section className="project-cover reveal-scale">
          <div className="shell">
            <div className="project-cover-frame">
              <img src={project.cover} alt={`${project.title} — captura da interface`} />
            </div>
          </div>
        </section>
      )}
```

- [ ] **Step 4: Substituir o corpo do overview (linhas 107-114)**

```jsx
            <div className="project-overview-body reveal delay-1">
              <p className="project-overview-lead">
                {project.longDescription || project.description}
              </p>
            </div>
```

- [ ] **Step 5: Trocar os três fallbacks do story (linhas 127-129, 137-139, 147-149)**

Cada `<p>` passa a renderizar o campo direto, sem `||`:

```jsx
              <p>{project.challenge}</p>
```

```jsx
              <p>{project.solution}</p>
```

```jsx
              <p>{project.outcome}</p>
```

- [ ] **Step 6: Ocultar a galeria quando não houver imagem (linhas 155-189)**

Envolva a seção inteira numa condição e remova o ramo de placeholder:

```jsx
      {project.gallery.length > 0 && (
        <section className="project-gallery" ref={galleryRef}>
          <div className="shell">
            <div className="section-header reveal">
              <span className="section-index mono">#02 — gallery</span>
              <h2 className="project-section-title display">
                Imagens e <em>capturas</em>
              </h2>
            </div>

            <div className="project-gallery-grid">
              {project.gallery.map((image, index) => (
                <div
                  key={image}
                  ref={setGalleryRef(index)}
                  className={`project-gallery-item reveal delay-${(index % 4) + 1} ${index === 0 ? 'is-wide' : ''}`}
                >
                  <img src={image} alt={`${project.title} — captura ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
```

- [ ] **Step 7: Ajustar o texto da seção de links (linhas 230-233)**

O texto atual promete "projeto ao vivo", mas nenhum deploy está no ar (spec §2.3). Substitua o `<p>`:

```jsx
              <p>
                Explore o código fonte para entender as decisões técnicas tomadas
                durante o desenvolvimento.
              </p>
```

- [ ] **Step 8: Rodar e confirmar que `Project.jsx` saiu da lista**

Run: `npx vitest run src/pages/project/Project.test.js`

Expected: ainda FAIL, apontando somente `About.jsx` (duas ocorrências de "Em breve",
removidas na Task 5). **Nenhuma linha da saída pode citar `Project.jsx`** — esse é o
critério desta tarefa. Se `Home.jsx` ainda aparecer, a Task 3 não foi concluída.

- [ ] **Step 9: Verificar lint e build**

Run: `npm run lint` → exit 0
Run: `npm run build` → exit 0

- [ ] **Step 10: Commit**

```bash
git add src/pages/project/Project.jsx src/pages/project/Project.test.js
git commit -m "Remove draft placeholder text from the case study page

The page rendered the developer's own editing notes to visitors whenever
a project field was empty."
```

---

### Task 5: Extrair `certificates.js` e remover o PDF órfão

**Files:**
- Create: `src/data/certificates.js`
- Modify: `src/pages/about/About.jsx` (remove o array das linhas 5-190, importa o módulo, troca o placeholder "Em breve")
- Delete: `public/certificado-intermediario.pdf`
- Test: `src/data/certificates.test.js`

**Interfaces:**
- Consumes: nada
- Produces: `export const certificates` — array de `{ id: number, name: string, institution: string, period: string, pdf: string, description: string, skills: string[] }`. Mesmo formato já usado em `About.jsx`, apenas movido.

- [ ] **Step 1: Escrever o teste que falha**

Crie `src/data/certificates.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { certificates } from './certificates.js';

describe('certificados', () => {
  it('mantém os 19 certificados', () => {
    expect(certificates).toHaveLength(19);
  });

  it('aponta todo PDF para um arquivo existente em public/', () => {
    const missing = certificates
      .filter((c) => !existsSync(resolve('public', c.pdf.replace(/^\//, ''))))
      .map((c) => c.pdf);
    expect(missing).toEqual([]);
  });

  it('usa ids únicos', () => {
    expect(new Set(certificates.map((c) => c.id)).size).toBe(certificates.length);
  });

  it('preenche nome, instituição e competências em todos', () => {
    for (const c of certificates) {
      expect(c.name.length, `id ${c.id}`).toBeGreaterThan(0);
      expect(c.institution.length, `id ${c.id}`).toBeGreaterThan(0);
      expect(c.skills.length, `id ${c.id}`).toBeGreaterThan(0);
    }
  });

  it('não referencia o PDF removido', () => {
    expect(certificates.some((c) => c.pdf.includes('certificado-intermediario'))).toBe(false);
  });
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npx vitest run src/data/certificates.test.js`
Expected: FAIL — `Error: Cannot find module './certificates.js' imported from <caminho>/src/data/certificates.test.js`, com o code frame apontando a linha do import. (Mensagem medida nesta base; **não** é `Failed to resolve import`. Cole a saída literal que você obtiver, mesmo divergindo desta.)

- [ ] **Step 3: Criar `src/data/certificates.js`**

Recorte o array `certificates` de `src/pages/about/About.jsx` (linhas 5-190) **sem alterar seu conteúdo** e cole no arquivo novo, prefixado por `export`:

```js
export const certificates = [
  // ...as 19 entradas, exatamente como estavam em About.jsx
];
```

- [ ] **Step 4: Importar o módulo em `About.jsx`**

Remova a declaração local do array e acrescente aos imports:

```jsx
import { certificates } from '../../data/certificates';
```

- [ ] **Step 5: Remover o texto "Em breve" do cartão sem PDF**

Como todo certificado tem PDF (verificado no Step 1), o ramo de placeholder é código morto. Em `About.jsx`, substitua o bloco `{cert.pdf ? (...) : (...)}` do cartão por apenas o iframe:

```jsx
                    <iframe src={cert.pdf} title={cert.name} className="pdf-viewer" />
```

Faça o mesmo em `showCertDescription`: a variável `pdfViewer` perde o ramo `else`, ficando apenas o `div` com o `iframe`.

- [ ] **Step 6: Remover o PDF órfão**

```bash
git rm "public/certificado-intermediario.pdf"
```

- [ ] **Step 7: Rodar os testes e confirmar que passam**

Run: `npx vitest run`
Expected: PASS em todos os arquivos, incluindo `Project.test.js` — a ocorrência de "Em breve" foi removida neste passo.

- [ ] **Step 8: Verificar lint e build**

Run: `npm run lint` → exit 0
Run: `npm run build` → exit 0

- [ ] **Step 9: Commit**

```bash
git add src/data/certificates.js src/data/certificates.test.js src/pages/about/About.jsx
git commit -m "Extract certificates into a data module

Moves 19 inline entries out of About.jsx and drops the unused
certificado-intermediario.pdf, which no page referenced."
```

---

### Task 6: Unificar as competências num só módulo

`Home.jsx` e `About.jsx` declaram listas de competências que divergem entre si (spec §2.5).

**Files:**
- Create: `src/data/skills.js`
- Modify: `src/pages/home/Home.jsx` (remove `const skills`, importa), `src/pages/about/About.jsx` (remove `const skillGroups`, importa)
- Test: `src/data/skills.test.js`

**Interfaces:**
- Consumes: nada
- Produces: `export const skillGroups` — array de `{ label: string, items: string[] }`, usado pelas duas páginas. `export const homeSkillGroups` — os três primeiros grupos, para o layout da home, que comporta três cartões.

- [ ] **Step 1: Escrever o teste que falha**

Crie `src/data/skills.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { skillGroups, homeSkillGroups } from './skills.js';

describe('competências', () => {
  it('expõe grupos com rótulo e itens', () => {
    expect(skillGroups.length).toBeGreaterThan(0);
    for (const g of skillGroups) {
      expect(g.label.length).toBeGreaterThan(0);
      expect(g.items.length).toBeGreaterThan(0);
    }
  });

  it('entrega exatamente três grupos para a home', () => {
    expect(homeSkillGroups).toHaveLength(3);
  });

  it('deriva os grupos da home da lista única', () => {
    for (const g of homeSkillGroups) expect(skillGroups).toContain(g);
  });

  it('não declara competências inline nas páginas', () => {
    for (const page of ['src/pages/home/Home.jsx', 'src/pages/about/About.jsx']) {
      const src = readFileSync(resolve(page), 'utf8');
      expect(src, page).not.toMatch(/const\s+skills\s*=\s*\[/);
      expect(src, page).not.toMatch(/const\s+skillGroups\s*=\s*\[/);
    }
  });
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npx vitest run src/data/skills.test.js`
Expected: FAIL — `Error: Cannot find module './skills.js' imported from <caminho>/src/data/skills.test.js`, com o code frame apontando a linha do import. (Mensagem medida nesta base; **não** é `Failed to resolve import`. Cole a saída literal que você obtiver, mesmo divergindo desta.)

- [ ] **Step 3: Criar `src/data/skills.js`**

Lista única, reconciliando as duas versões divergentes:

```js
export const skillGroups = [
  {
    label: 'Frontend',
    items: ['React', 'React Native', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'SCSS', 'Tailwind CSS'],
  },
  {
    label: 'Backend',
    items: ['C#', '.NET', 'ASP.NET Core', 'Node.js', 'Express', 'Python', 'APIs REST', 'POO'],
  },
  {
    label: 'Plataforma',
    items: ['SQL Server', 'MySQL', 'PostgreSQL', 'Docker', 'Git', 'GitHub Actions', 'Azure'],
  },
  {
    label: 'Design & 3D',
    items: ['Modelagem 3D', 'Análise CFD', 'Fusion 360', 'CAD/CAM', 'Design gráfico'],
  },
  {
    label: 'Hardware',
    items: ['Impressão 3D', 'Corte a laser', 'Arduino', 'Robótica', 'Manutenção'],
  },
];

export const homeSkillGroups = skillGroups.slice(0, 3);
```

- [ ] **Step 4: Trocar em `Home.jsx`**

Remova `const skills = [...]` do topo do arquivo e acrescente aos imports:

```jsx
import { homeSkillGroups } from '../../data/skills';
```

No corpo do componente, substitua as referências a `skills` por `homeSkillGroups` — são duas: `useRevealMany(skills.length)` e `skills.map(...)`.

- [ ] **Step 5: Trocar em `About.jsx`**

Remova `const skillGroups = [...]` e acrescente aos imports:

```jsx
import { skillGroups } from '../../data/skills';
```

As referências existentes a `skillGroups` continuam válidas.

- [ ] **Step 6: Rodar e confirmar que passa**

Run: `npx vitest run`
Expected: PASS em todos os arquivos.

- [ ] **Step 7: Verificar lint e build**

Run: `npm run lint` → exit 0
Run: `npm run build` → exit 0

- [ ] **Step 8: Commit**

```bash
git add src/data/skills.js src/data/skills.test.js src/pages/home/Home.jsx src/pages/about/About.jsx
git commit -m "Unify skill lists into a single data module

Home and About declared different skill sets inline."
```

---

### Task 7: Capturas reais dos projetos

Substitui os gradientes vazios por imagem do projeto rodando. Ver spec §6 e a restrição de `dotnet` em §8.

**Files:**
- Create: `public/projects/sistema-financeiro.png`, `public/projects/todah-producoes.png`, `public/projects/taki-rastreadores.png`, `public/projects/meta-marketing.png`, `public/projects/portfolio.png`
- Modify: `src/data/projects.js` (campo `cover` dos cinco destaques capturáveis)
- Modify: `src/data/projects.test.js` (acrescenta a asserção de existência)

**Interfaces:**
- Consumes: `projects` da Task 3
- Produces: `cover` deixa de ser `null` em cinco dos seis destaques

**Restrição:** `loja-csharp` **não recebe captura** — `dotnet` não está instalado. Seu `cover` permanece `null` e o cartão mantém o tratamento em gradiente, que continua suportado pelo CSS.

- [ ] **Step 1: Escrever a asserção que falha**

Acrescente a `src/data/projects.test.js`:

```js
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

describe('capas dos projetos', () => {
  const CAPTURABLE = [
    'sistema-financeiro',
    'todah-producoes',
    'taki-rastreadores',
    'meta-marketing',
    'portfolio',
  ];

  it('define capa para todo destaque que roda localmente', () => {
    for (const slug of CAPTURABLE) {
      const project = projects.find((p) => p.slug === slug);
      expect(project.cover, slug).toBeTruthy();
    }
  });

  it('aponta cada capa para um arquivo existente', () => {
    const missing = projects
      .filter((p) => p.cover)
      .filter((p) => !existsSync(resolve('public', p.cover.replace(/^\//, ''))))
      .map((p) => p.slug);
    expect(missing).toEqual([]);
  });

  it('mantém loja-csharp sem capa, por falta de runtime .NET', () => {
    expect(projects.find((p) => p.slug === 'loja-csharp').cover).toBeNull();
  });
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npx vitest run src/data/projects.test.js`
Expected: FAIL — `cover` é `null` nos cinco.

- [ ] **Step 3: Clonar os repositórios num diretório temporário**

Clone **fora do repositório do portfólio**, no diretório de trabalho temporário da
sessão — nunca dentro de `ViniciusDuranPortifolio`, para não sujar a árvore de trabalho.
Substitua `<SCRATCHPAD>` pelo caminho do scratchpad informado no seu ambiente:

```bash
mkdir -p "<SCRATCHPAD>/shots" && cd "<SCRATCHPAD>/shots"
git clone --depth 1 https://github.com/Vinicius-Duran/Finance-front.git
git clone --depth 1 https://github.com/Vinicius-Duran/toda-produ-es.git
git clone --depth 1 https://github.com/Vinicius-Duran/Taki.git
git clone --depth 1 https://github.com/Vinicius-Duran/landpage.git
```

**Aviso medido:** `toda-produ-es` pesa cerca de 850 MB — são 730,2 MB em 377 arquivos
versionados, fotos sem otimização, uma delas de 19,4 MB. O clone demora vários minutos;
não o interrompa achando que travou. Rode-o em segundo plano.

- [ ] **Step 4: Subir cada projeto e capturar**

Para os dois projetos React (`Finance-front`, `toda-produ-es`):

```bash
cd "<SCRATCHPAD>/shots/<repo>" && npm install --no-audit --no-fund && npm run dev
```

Para os dois estáticos, sirva o diretório que contém o `index.html` — `Taki` na raiz,
`landpage` em `novo layout` (verificado: a raiz de `landpage` **não** tem `index.html`):

```bash
cd "<SCRATCHPAD>/shots/landpage/novo layout" && python -m http.server 4174
```

```bash
cd "<SCRATCHPAD>/shots/Taki" && python -m http.server 4175
```

Para o próprio portfólio, rode `npm run dev` na raiz do repositório.

**Não use o MCP `chrome-devtools` — ele não conecta neste ambiente** (medido: `list_pages`
falha com `Could not find DevToolsActivePort`, e subir o Chrome com
`--remote-debugging-port` não abre a porta). Use o Playwright já instalado no scratchpad
da sessão, em `shotter/`, com o script `shot.mjs` que já está lá:

```
node shot.mjs <url> <caminho-de-saida.png> 1440 900 3000
```

Ele imprime `status`, `title`, `bodyTextLength` e os erros de console junto com a
captura — confira os quatro antes de aceitar a imagem. Salve em
`public/projects/<slug>.png`.

**Regra:** capture a tela inicial real do projeto. Se um projeto subir com erro ou tela vazia, **não maquie** — registre o ocorrido e deixe o `cover` como `null`, ajustando a lista `CAPTURABLE` do teste.

- [ ] **Step 5: Preencher o campo `cover`**

Em `src/data/projects.js`, para cada um dos cinco:

```js
    cover: '/projects/sistema-financeiro.png',
```

```js
    cover: '/projects/todah-producoes.png',
```

```js
    cover: '/projects/taki-rastreadores.png',
```

```js
    cover: '/projects/meta-marketing.png',
```

```js
    cover: '/projects/portfolio.png',
```

- [ ] **Step 6: Rodar e confirmar que passa**

Run: `npx vitest run src/data/projects.test.js`
Expected: PASS.

- [ ] **Step 7: Verificar lint e build**

Run: `npm run lint` → exit 0
Run: `npm run build` → exit 0

- [ ] **Step 8: Commit**

```bash
git add public/projects src/data/projects.js src/data/projects.test.js
git commit -m "Add real screenshots for the five runnable featured projects"
```

---

### Task 8: Refino visual — movimento reduzido, foco e carrossel responsivo

**Files:**
- Modify: `src/index.css` (acrescenta bloco `prefers-reduced-motion` e estilo de foco ao final)
- Modify: `src/pages/about/About.jsx` (`cardWidth` fixo → medida real)
- Modify: `src/pages/about/About.css` (largura do cartão do carrossel)
- Test: `src/index.test.js`

**Interfaces:**
- Consumes: nada
- Produces: nenhuma API nova

- [ ] **Step 1: Escrever o teste que falha**

Crie `src/index.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const css = readFileSync(resolve('src/index.css'), 'utf8');

describe('acessibilidade no CSS base', () => {
  it('respeita prefers-reduced-motion', () => {
    expect(css).toMatch(/@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/);
  });

  it('define indicador de foco visível', () => {
    expect(css).toMatch(/:focus-visible/);
  });
});

describe('carrossel de certificados', () => {
  it('não usa largura de cartão fixa em pixel', () => {
    const src = readFileSync(resolve('src/pages/about/About.jsx'), 'utf8');
    expect(src).not.toMatch(/const\s+cardWidth\s*=\s*\d+\s*;/);
  });
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npx vitest run src/index.test.js`
Expected: FAIL nos três testes.

- [ ] **Step 3: Acrescentar acessibilidade ao fim de `src/index.css`**

```css
:focus-visible {
  outline: 2px solid var(--cyan-300);
  outline-offset: 3px;
  border-radius: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .reveal,
  .reveal-right,
  .reveal-scale {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

- [ ] **Step 4: Medir a largura real do cartão em `About.jsx`**

Substitua `const cardWidth = 492;` por uma medida tirada do DOM, com fallback:

```jsx
  const getCardWidth = useCallback(() => {
    const container = carouselRef.current;
    if (!container) return 492;
    const card = container.querySelector('.certificate-card');
    if (!card) return 492;
    const gap = parseFloat(getComputedStyle(container).columnGap || '0');
    return card.getBoundingClientRect().width + gap;
  }, []);
```

Nas quatro funções que usavam `cardWidth` — `scrollToSlide`, `updateCurrentSlide` e as duas de arraste — troque a constante por `const cardWidth = getCardWidth();` na primeira linha de cada uma. Acrescente `getCardWidth` ao array de dependências de `updateCurrentSlide`.

- [ ] **Step 5: Rodar e confirmar que passa**

Run: `npx vitest run src/index.test.js`
Expected: PASS — 3 testes.

- [ ] **Step 6: Conferir a navegação em três larguras**

Suba `npm run dev` e verifique em 375 px, 768 px e 1440 px que o carrossel avança um cartão por clique e que nenhuma seção provoca rolagem horizontal na página.

- [ ] **Step 7: Verificar lint e build**

Run: `npm run lint` → exit 0
Run: `npm run build` → exit 0

- [ ] **Step 8: Commit**

```bash
git add src/index.css src/index.test.js src/pages/about/About.jsx src/pages/about/About.css
git commit -m "Add reduced-motion support, visible focus and responsive carousel

The carousel stepped by a hardcoded 492px, which broke outside desktop."
```

---

### Task 9: Reescrever o README e conferir a integração

`README.md` documenta hoje um site de gramática inglesa (spec §2.7).

**Files:**
- Modify: `README.md` (substituição integral)
- Test: `README.test.js`

**Interfaces:**
- Consumes: `profile` da Task 1
- Produces: nada

- [ ] **Step 1: Escrever o teste que falha**

Crie `README.test.js` na raiz:

```js
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readme = readFileSync(resolve('README.md'), 'utf8');

describe('README', () => {
  it('não descreve o projeto de gramática inglesa', () => {
    expect(readme).not.toMatch(/Perfect English Grammar/i);
    expect(readme).not.toMatch(/exercícios de gramática/i);
  });

  it('descreve este portfólio', () => {
    expect(readme).toMatch(/portf[óo]lio/i);
    expect(readme).toMatch(/Vinicius Duran/);
  });

  it('documenta os scripts que existem de fato', () => {
    for (const script of ['npm run dev', 'npm run build', 'npm run lint', 'npm test']) {
      expect(readme, script).toContain(script);
    }
  });
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

Run: `npx vitest run README.test.js`
Expected: FAIL — o README menciona "Perfect English Grammar".

- [ ] **Step 3: Reescrever `README.md`**

```markdown
# Portfólio — Vinicius Duran

Portfólio pessoal de Vinicius Duran, desenvolvedor full-stack em Florianópolis/SC.
Construído em React 19 com Vite, design system em CSS custom properties e animações
de entrada por IntersectionObserver.

## Stack

- React 19 · React Router DOM 7
- Vite 6
- CSS custom properties (sem framework de estilo)
- Vitest · ESLint 9

## Rodando

```bash
npm install
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção em dist/
npm run preview  # pré-visualiza o build
npm run lint     # análise estática
npm test         # suíte de testes
```

## Estrutura

```
src/
  components/    Header, Background, Marquee, MouseFollower, ScrollProgress
  data/          conteúdo do site — perfil, projetos, certificados, competências
  hooks/         useReveal, useRevealMany
  pages/         home, about, project
```

## Camada de dados

Todo o conteúdo vive em `src/data/`, separado da apresentação. Atualizar o site é
editar esses arquivos, não os componentes.

| Arquivo | Conteúdo |
|---|---|
| `profile.js` | identidade e canais de contato — fonte única |
| `projects.js` | projetos em destaque e secundários |
| `certificates.js` | certificados e seus PDFs em `public/` |
| `skills.js` | competências por grupo |

## Testes

A suíte não testa aparência: ela protege a integridade do conteúdo. Verifica que
nenhum projeto fictício volte ao site, que nenhum texto de rascunho vaze para a
interface, que os dados de contato venham de `profile.js` e que todo PDF de
certificado referenciado exista no repositório.

```bash
npm test
```
```

- [ ] **Step 4: Rodar a suíte inteira**

Run: `npx vitest run`
Expected: PASS em todos os arquivos.

- [ ] **Step 5: Verificar lint e build**

Run: `npm run lint` → exit 0
Run: `npm run build` → exit 0

- [ ] **Step 6: Percorrer o site em busca de regressão**

Suba `npm run dev` e confira: a home lista seis destaques e três secundários; cada destaque abre um case study com desafio, solução e resultado preenchidos; nenhuma rota exibe texto de rascunho; os 19 certificados abrem seus PDFs; os links de contato levam ao GitHub e ao LinkedIn corretos.

- [ ] **Step 7: Commit**

```bash
git add README.md README.test.js
git commit -m "Rewrite README to describe this portfolio

The file documented an unrelated English grammar exercise site."
```

---

### Task 10: Experiência profissional — **bloqueada por insumo do autor**

**Não inicie esta tarefa sem o PDF do LinkedIn.** A spec (§8) é explícita: se o PDF não chegar, a seção não é criada e nada é inventado no lugar. Nesse caso, encerre o plano na Task 9 e informe o autor.

**Files:**
- Create: `src/data/experience.js`
- Create: `src/data/experience.test.js`
- Modify: `src/pages/about/About.jsx` (nova seção entre formação e certificações)
- Modify: `src/pages/about/About.css` (estilo da linha do tempo)

**Interfaces:**
- Consumes: `useReveal`, `useRevealMany` de `src/hooks/useReveal`
- Produces: `export const experience` — array de `{ company: string, role: string, period: string, location: string, description: string, tech: string[] }`, ordenado do mais recente para o mais antigo

- [ ] **Step 1: Ler o PDF fornecido pelo autor**

Extraia cargo, empresa, período, local e descrição de cada posição. **Transcreva; não interprete.** Onde o PDF estiver ambíguo, pergunte ao autor em vez de preencher por conta própria.

- [ ] **Step 2: Escrever o teste que falha**

Crie `src/data/experience.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { experience } from './experience.js';

describe('experiência profissional', () => {
  it('tem ao menos uma posição', () => {
    expect(experience.length).toBeGreaterThan(0);
  });

  it('preenche todos os campos de cada posição', () => {
    for (const job of experience) {
      expect(job.company.length, job.company).toBeGreaterThan(0);
      expect(job.role.length, job.company).toBeGreaterThan(0);
      expect(job.period.length, job.company).toBeGreaterThan(0);
      expect(job.description.length, job.company).toBeGreaterThan(30);
    }
  });

  it('não deixa texto de rascunho', () => {
    for (const job of experience) {
      expect(job.description).not.toMatch(/descreva|em breve|lorem|TODO/i);
    }
  });
});
```

- [ ] **Step 3: Rodar e confirmar que falha**

Run: `npx vitest run src/data/experience.test.js`
Expected: FAIL — `Error: Cannot find module './experience.js' imported from <caminho>/src/data/experience.test.js`, com o code frame apontando a linha do import. (Mensagem medida nesta base; **não** é `Failed to resolve import`. Cole a saída literal que você obtiver, mesmo divergindo desta.)

- [ ] **Step 4: Criar `src/data/experience.js` já preenchido**

Escreva uma entrada por posição, **transcrevendo o que o PDF diz** — uma entrada por
cargo, da mais recente para a mais antiga. O gabarito abaixo mostra a forma; os valores
saem do PDF, nunca da sua suposição:

```js
export const experience = [
  {
    company: 'Zicard Digital Business Agency',
    role: '<cargo exatamente como consta no PDF>',
    period: '<ex.: Jan 2025 — atual>',
    location: 'Florianópolis, SC',
    description:
      '<uma ou duas frases sobre o que foi feito na posição, derivadas do PDF>',
    tech: ['<tecnologias que o PDF ou o autor confirmarem para esta posição>'],
  },
];
```

O teste do Step 2 exige `description` com mais de 30 caracteres e proíbe texto de
rascunho, justamente para que um gabarito não preenchido não passe despercebido.
**Se algum campo não puder ser preenchido a partir do PDF, pergunte ao autor** — não
complete por dedução.

- [ ] **Step 5: Rodar e confirmar que passa**

Run: `npx vitest run src/data/experience.test.js`
Expected: PASS — 3 testes. Se falhar por campo vazio ou curto, o arquivo ainda está
com gabarito; volte ao Step 4.

- [ ] **Step 6: Renderizar a seção em `About.jsx`**

Importe o módulo e o hook de reveal, e insira a seção logo após `<section className="education">`:

```jsx
      <section className="experience" ref={experienceRef}>
        <div className="shell">
          <div className="section-header reveal">
            <span className="section-index mono">#03 — experiência</span>
            <h2 className="section-title display">
              Experiência <em>profissional</em>
            </h2>
          </div>

          <ol className="experience-list">
            {experience.map((job, index) => (
              <li
                key={`${job.company}-${job.period}`}
                ref={setExperienceRef(index)}
                className={`experience-item reveal delay-${index + 1}`}
              >
                <span className="experience-period mono">{job.period}</span>
                <div className="experience-body">
                  <h3 className="experience-role">{job.role}</h3>
                  <p className="experience-company">
                    {job.company}
                    {job.location ? ` · ${job.location}` : ''}
                  </p>
                  <p className="experience-description">{job.description}</p>
                  {job.tech.length > 0 && (
                    <ul className="experience-tech">
                      {job.tech.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
```

Declare os refs junto aos demais, no topo do componente:

```jsx
  const experienceRef = useReveal();
  const setExperienceRef = useRevealMany(experience.length);
```

**Atenção:** as seções seguintes de `About.jsx` usam índices `#03` (certificações) e `#04` (objetivos). Renumere-as para `#04` e `#05`.

- [ ] **Step 7: Estilizar a linha do tempo em `About.css`**

```css
.experience-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 28px;
}

.experience-item {
  display: grid;
  grid-template-columns: minmax(120px, 160px) 1fr;
  gap: 24px;
  padding: 24px 0;
  border-top: 1px solid var(--white-10);
}

.experience-period {
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  color: var(--cyan-300);
  text-transform: uppercase;
}

.experience-role {
  margin: 0 0 4px;
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--white);
}

.experience-company {
  margin: 0 0 12px;
  color: var(--white-60);
  font-size: 0.95rem;
}

.experience-description {
  margin: 0;
  color: var(--white-80);
  line-height: 1.7;
}

.experience-tech {
  list-style: none;
  margin: 14px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.experience-tech li {
  padding: 4px 10px;
  border: 1px solid var(--white-10);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--white-60);
}

@media (max-width: 768px) {
  .experience-item {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
```

- [ ] **Step 8: Rodar a suíte inteira**

Run: `npx vitest run`
Expected: PASS em todos os arquivos.

- [ ] **Step 9: Verificar lint e build**

Run: `npm run lint` → exit 0
Run: `npm run build` → exit 0

- [ ] **Step 10: Commit**

```bash
git add src/data/experience.js src/data/experience.test.js src/pages/about/About.jsx src/pages/about/About.css
git commit -m "Add professional experience section"
```

---

## Encerramento

Concluídas as tarefas, antes de abrir o PR:

- [ ] `npm test` → todos os arquivos passam
- [ ] `npm run lint` → exit 0
- [ ] `npm run build` → exit 0
- [ ] Nenhum `console.log` ou código comentado introduzido
- [ ] `git log --oneline main..portfolio-v2` mostra um commit por tarefa
- [ ] Abrir o PR pela skill `github-pr`

**A informar ao autor no PR:** os sete deploys da Vercel continuam fora do ar (spec §2.3). É trabalho fora deste escopo, exige acesso ao painel, e sem ele o portfólio permanece inacessível por link — inclusive este.

## Cobertura da spec

| Requisito da spec | Tarefa |
|---|---|
| §2.1 projetos fictícios | Task 3 |
| §2.2 placeholders visíveis | Task 4 |
| §2.3 links de deploy mortos | Task 3 (links de repositório) + aviso no encerramento |
| §2.4 handle do GitHub errado | Tasks 1 e 2 |
| §2.5 conteúdo inline nos componentes | Tasks 5 e 6 |
| §2.6 PDF órfão | Task 5 |
| §2.7 README de outro projeto | Task 9 |
| §4 camada de dados | Tasks 1, 3, 5, 6, 10 |
| §5 projetos reais e case study | Task 3 |
| §6 refino visual | Tasks 7 e 8 |
| §7 correções factuais | Tasks 2, 5, 9 |
| §10 critérios de aceite 1–10 | Tasks 3, 4, 2, 2, 5, 9, todas, 8, 8, todas |
| §11 LinkedIn | Task 10 (bloqueada) |

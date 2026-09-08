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
      'Aplicação dividida em dois repositórios: uma API REST em Node.js e um cliente React, com a interface batizada de CashFlow. Cobre cinco entidades de negócio — usuários, centros de custo, receitas, contas bancárias e lançamentos — com autenticação por token, validação de entrada no servidor e cenários de teste escritos em Gherkin. É o projeto onde a separação entre camada de dados, regra de negócio e interface aparece de forma mais completa.',
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
    cover: '/projects/sistema-financeiro.png',
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
    cover: '/projects/todah-producoes.png',
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
      'Solução de loja em C# com quatro projetos .NET separados por camada: domínio, infraestrutura, API e utilidades.',
    longDescription:
      'Solução .NET 6 dividida em quatro projetos — API, Domain, Infra e Utilidade — com o modelo de domínio e o acesso a dados isolados da camada de API. A parte web ainda é o scaffold padrão do ASP.NET gerado pelo template de Razor Pages, sem telas de loja implementadas. É o projeto que sustenta a parte .NET da minha stack, junto com o repositório Financeiro, do mesmo período.',
    challenge:
      'Sair do paradigma de script e estruturar uma solução .NET real em camadas, separando Domain e Infra da API em vez de concentrar tudo num único projeto.',
    solution:
      'Organizei a solução em quatro projetos .NET 6 — API, Domain, Infra e Utilidade — mantendo o modelo de domínio e o acesso a dados isolados da camada de API. A camada web permanece o scaffold padrão do ASP.NET gerado pelo template de Razor Pages, sem telas de loja implementadas.',
    outcome:
      'Entregou a separação em camadas pretendida, com Domain e Infra isolados da API, mesmo sem a interface da loja construída. É a base prática da competência em C# e .NET que declaro no perfil, e o ponto de partida para os fundamentos de ASP.NET Core que estudei depois.',
    tech: ['C#', 'ASP.NET', 'POO'],
    techDetailed: {
      Linguagem: ['C#'],
      Plataforma: ['ASP.NET', '.NET'],
      Arquitetura: ['Orientação a objetos', 'Separação em camadas'],
      Projetos: ['API', 'Domain', 'Infra', 'Utilidade'],
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
    cover: '/projects/taki-rastreadores.png',
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
    cover: '/projects/meta-marketing.png',
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
      'O site que você está navegando: React 19, design system em CSS custom properties e motion com GSAP e anime.js.',
    longDescription:
      'Portfólio construído do zero em React 19 com React Router 7. O sistema visual é definido por custom properties do CSS — paleta, tipografia e curvas de easing num único ponto — sobre Archivo, uma grotesk técnica, pesada no display. A ideia que organiza o site é a montagem: cada bloco é uma peça que primeiro aparece como quadro de wireframe rotulado, depois recebe o conteúdo e larga a guia, de modo que a página se constrói na frente de quem chega. GSAP cuida da sequência de abertura, da escrita do título caractere a caractere e do embaralhamento de texto no índice de projetos; anime.js cuida dos stagger de lista. Todo o conteúdo vive numa camada de dados separada dos componentes.',
    challenge:
      'Um portfólio precisa ser visualmente memorável sem virar um amontoado de efeitos, e precisa ser fácil de atualizar — senão o conteúdo envelhece e o site vira uma vitrine desatualizada de si mesmo.',
    solution:
      'Centralizei paleta, tipografia e easing em custom properties, de modo que ajustar a identidade é editar variáveis, não caçar valores no CSS. O motion mora num módulo único que registra os plugins do GSAP e expõe as poucas gramáticas de animação que o site usa, em vez de espalhar tween por componente. Nenhum estado inicial de animação vive no CSS: quem esconde para revelar é o JS, então uma falha de script mostra a página inteira em vez de apagá-la. O conteúdo — perfil, projetos, certificados, competências — mora em src/data, separado da apresentação.',
    outcome:
      'Resultou num site cujo conteúdo se atualiza sem tocar em JSX, com uma suíte de testes que impede a volta de dados fictícios e de texto de rascunho na interface.',
    tech: ['React 19', 'GSAP', 'anime.js'],
    techDetailed: {
      Frontend: ['React 19', 'React Router DOM 7', 'Vite 6'],
      Estilo: ['CSS Custom Properties', 'Archivo', 'JetBrains Mono'],
      Motion: ['GSAP', 'ScrollTrigger', 'SplitText', 'ScrambleText', 'anime.js'],
      Qualidade: ['Vitest', 'ESLint'],
    },
    links: [
      { label: 'Ver código', href: 'https://github.com/Vinicius-Duran/ViniciusDuranPortifolio', kind: 'primary' },
    ],
    accent: 'linear-gradient(135deg, #7037cd, #ff3da8, #7df9ff)',
    cover: '/projects/portfolio.png',
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

export const projects = [
  {
    id: '001',
    slug: 'ecommerce-platform',
    title: 'E-commerce Platform',
    tagline: 'Plataforma completa com pagamentos, gestão de produtos e painel administrativo.',
    role: 'Full Stack · UI System',
    year: '2025',
    client: 'Projeto próprio',
    duration: '6 meses',
    status: 'Em produção',
    description:
      'Plataforma completa de e-commerce com sistema de pagamentos, gestão de produtos e painel administrativo.',
    longDescription: '',
    challenge: '',
    solution: '',
    outcome: '',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    techDetailed: {
      Frontend: ['React', 'TypeScript', 'CSS Modules'],
      Backend: ['Node.js', 'Express', 'Stripe API'],
      Database: ['MongoDB'],
      Infra: ['Vercel', 'GitHub Actions'],
    },
    links: [
      { label: 'Live demo', href: '#', kind: 'primary' },
      { label: 'GitHub', href: '#', kind: 'ghost' },
    ],
    accent: 'linear-gradient(135deg, #68b2f8, #506ee5, #7037cd)',
    cover: null,
    gallery: [null, null, null, null],
  },
  {
    id: '002',
    slug: 'task-management',
    title: 'Task Management',
    tagline: 'App de gestão com drag & drop, notificações e sincronização em tempo real.',
    role: 'Frontend · Realtime',
    year: '2025',
    client: 'Projeto próprio',
    duration: '3 meses',
    status: 'MVP',
    description:
      'App de gestão de tarefas com drag & drop, notificações e sincronização em tempo real.',
    longDescription: '',
    challenge: '',
    solution: '',
    outcome: '',
    tech: ['Vue.js', 'Firebase', 'PWA'],
    techDetailed: {
      Frontend: ['Vue.js', 'Pinia', 'Vite'],
      Backend: ['Firebase Firestore', 'Firebase Auth'],
      Features: ['PWA', 'Offline-first', 'Push notifications'],
    },
    links: [
      { label: 'Live demo', href: '#', kind: 'primary' },
      { label: 'GitHub', href: '#', kind: 'ghost' },
    ],
    accent: 'linear-gradient(135deg, #8a52ff, #ff3da8, #68b2f8)',
    cover: null,
    gallery: [null, null, null, null],
  },
  {
    id: '003',
    slug: 'ai-chat-assistant',
    title: 'AI Chat Assistant',
    tagline: 'Assistente virtual integrado com APIs de IA para atendimento automatizado.',
    role: 'Backend · AI Integration',
    year: '2025',
    client: 'Projeto próprio',
    duration: '4 meses',
    status: 'Em desenvolvimento',
    description:
      'Assistente virtual inteligente integrado com APIs de IA para atendimento automatizado e suporte ao cliente.',
    longDescription: '',
    challenge: '',
    solution: '',
    outcome: '',
    tech: ['Python', 'OpenAI', 'FastAPI'],
    techDetailed: {
      Backend: ['Python', 'FastAPI', 'Pydantic'],
      AI: ['OpenAI GPT-4', 'LangChain', 'Embeddings'],
      Infra: ['Docker', 'Redis'],
    },
    links: [
      { label: 'Live demo', href: '#', kind: 'primary' },
      { label: 'GitHub', href: '#', kind: 'ghost' },
    ],
    accent: 'linear-gradient(135deg, #7df9ff, #68b2f8, #8a52ff)',
    cover: null,
    gallery: [null, null, null, null],
  },
  {
    id: '004',
    slug: 'portfolio-cinematico',
    title: 'Portfolio Cinemático',
    tagline: 'Refatoração visual deste portfolio com motion design e reveals em scroll.',
    role: 'Frontend · Motion Design',
    year: '2026',
    client: 'Pessoal',
    duration: '2 semanas',
    status: 'Online',
    description:
      'Refatoração visual deste portfolio, com tipografia editorial, mouse follower e reveals em scroll.',
    longDescription: '',
    challenge: '',
    solution: '',
    outcome: '',
    tech: ['React', 'CSS Custom Properties', 'IntersectionObserver'],
    techDetailed: {
      Frontend: ['React 19', 'React Router'],
      Styling: ['CSS Custom Properties', 'Custom animations'],
      Motion: ['IntersectionObserver', 'rAF mouse follower'],
    },
    links: [
      { label: 'Ver site', href: '/', kind: 'primary' },
      { label: 'GitHub', href: '#', kind: 'ghost' },
    ],
    accent: 'linear-gradient(135deg, #ff3da8, #8a52ff, #506ee5)',
    cover: null,
    gallery: [null, null, null, null],
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);

export const getAdjacentProjects = (slug) => {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  const prev = index > 0 ? projects[index - 1] : projects[projects.length - 1];
  const next = index < projects.length - 1 ? projects[index + 1] : projects[0];
  return { prev, next };
};

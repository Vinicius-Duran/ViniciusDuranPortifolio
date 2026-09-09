/**
 * Formação acadêmica, da mais recente para a mais antiga.
 *
 * Sai da camada de dados como o resto do conteúdo: acrescentar um curso é
 * acrescentar uma entrada, não editar JSX.
 */
export const education = [
  {
    id: 'unisenai-seguranca',
    course: 'Segurança Cibernética',
    level: 'Ensino superior',
    institution: 'UniSENAI',
    period: '2026 — atual',
    ongoing: true,
    description:
      'Graduação em Segurança Cibernética, cobrindo defesa de sistemas, análise de vulnerabilidades e as práticas de proteção que sustentam uma aplicação depois que ela entra no ar.',
  },
  {
    id: 'ebac-cybersecurity',
    course: 'Cybersecurity',
    level: 'Ensino superior',
    institution: 'EBAC — Escola Britânica de Artes Criativas e Tecnologia',
    // Sem ano de início declarado: melhor um período honesto que um chute.
    period: 'Em andamento',
    ongoing: true,
    description:
      'Formação em segurança da informação com foco prático, cursada em paralelo à graduação.',
  },
  {
    id: 'senai-tecnico',
    course: 'Curso Técnico Integrado em Desenvolvimento de Sistemas',
    level: 'Ensino técnico',
    institution: 'SENAI/SC — Serviço Nacional de Aprendizagem Industrial',
    period: '2024 — 2025',
    ongoing: false,
    description:
      'Formação com foco em análise, desenvolvimento e manutenção de sistemas e aplicações, com base em práticas atuais do mercado. A grade abrange desde fundamentos da lógica de programação até o desenvolvimento completo de aplicações web e mobile.',
  },
];

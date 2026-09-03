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
  {
    label: 'Soft Skills',
    items: ['Trabalho em equipe', 'Comunicação', 'Gestão de tempo', 'Resolução de problemas', 'Pair programming', 'Metodologias ágeis'],
  },
];

export const homeSkillGroups = skillGroups.slice(0, 3);

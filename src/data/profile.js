export const profile = {
  name: 'Vinicius Duran',
  role: 'Desenvolvedor Full-Stack',
  // Sem campo de empresa: o vínculo com a Zicard acabou, e um portfólio que
  // anuncia empregador antigo envelhece contra quem o publica.
  location: 'Florianópolis, SC',
  careerStartYear: 2023,
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

// Anos de carreira, contados do ano de início até o ano corrente.
// Fica calculado para o número nunca envelhecer sozinho no site.
export const getYearsOfExperience = (now = new Date()) =>
  Math.max(0, now.getFullYear() - profile.careerStartYear);

/**
 * O tempo de carreira escrito por extenso, sempre com o "+" na frente e a
 * palavra "experiência" no fim.
 *
 * Existe porque "3 anos" solto no meio de uma linha não diz de que são os
 * anos, e o leitor tem de adivinhar. A frase inteira mora aqui para não haver
 * duas redações do mesmo dado em páginas diferentes.
 */
export const formatExperience = (now = new Date()) =>
  `+${getYearsOfExperience(now)} anos de experiência`;

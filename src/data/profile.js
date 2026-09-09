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
  whatsapp: {
    /* Só dígitos, com país e DDD: é o formato que o wa.me exige. Com "+",
       parênteses ou hífen o link abre a conversa em branco. O número
       apresentado é outro campo justamente para o visitante ler como
       telefone sem o link deixar de funcionar. */
    number: '5548992110831',
    label: '(48) 99211-0831',
  },
};

/**
 * O link do WhatsApp, com uma primeira mensagem já escrita.
 *
 * A mensagem pronta não é enfeite: sem ela chega "oi" sem contexto, e ele
 * não sabe de onde veio. Curta de propósito — quem for reescrever, reescreve.
 */
export const whatsappUrl = (
  texto = 'Oi, Vinicius! Vi seu portfólio e queria conversar sobre um projeto.'
) => `https://wa.me/${profile.whatsapp.number}?text=${encodeURIComponent(texto)}`;

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

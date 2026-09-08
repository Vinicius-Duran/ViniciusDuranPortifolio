import React from 'react';
import { featuredProjects } from '../../data/projects';
import './HeroBackdrop.css';

/**
 * Fundo do herói: as capturas reais dos projetos, em duotone âmbar e bem
 * apagadas, deslizando devagar atrás do título.
 *
 * São as imagens do próprio trabalho e não banco de imagens — um "código na
 * tela" genérico é o clichê número um do portfólio de desenvolvedor, e
 * entregaria o contrário do que a página afirma.
 */
/* As posições contornam a faixa central da direita, onde mora o balanço:
   uma placa atrás de "Base / Anos / Projetos" disputa legibilidade com o
   dado, e dado ilegível é pior que fundo vazio. */
const posicoes = [
  // Abaixo dos ~75px da barra fixa, para não competir com a navegação.
  { top: '12%', right: '2%', width: '27vw', rotate: '2deg', depth: 1 },
  { top: '71%', right: '3%', width: '24vw', rotate: '-2.5deg', depth: 2 },
  { top: '74%', right: '31%', width: '16vw', rotate: '1.5deg', depth: 3 },
];

const HeroBackdrop = () => {
  const capas = featuredProjects.filter((p) => p.cover).slice(0, posicoes.length);

  return (
    <div className="hero-backdrop" aria-hidden="true">
      {capas.map((project, index) => {
        const pos = posicoes[index];
        return (
          <figure
            className="hero-plate"
            key={project.id}
            data-depth={pos.depth}
            style={{
              top: pos.top,
              right: pos.right,
              width: pos.width,
              rotate: pos.rotate,
            }}
          >
            <img src={project.cover} alt="" loading="lazy" decoding="async" />
          </figure>
        );
      })}
    </div>
  );
};

export default HeroBackdrop;

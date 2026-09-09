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
/* Um arranjo por herói: o que a página põe em cada canto muda, e placa atrás
   de dado é dado ilegível — pior que fundo vazio. */
const arranjos = {
  /* Na home as posições contornam a faixa central da direita, onde mora o
     balanço "Base / Experiência / Projetos". */
  home: [
    // Abaixo dos ~75px da barra fixa, para não competir com a navegação.
    { top: '12%', right: '2%', width: '27vw', rotate: '2deg', depth: 1 },
    { top: '71%', right: '3%', width: '24vw', rotate: '-2.5deg', depth: 2 },
    { top: '74%', right: '31%', width: '16vw', rotate: '1.5deg', depth: 3 },
  ],

  /* No sobre o pé da tela é a dupla texto + registro, ocupando a largura
     inteira: as placas sobem para a faixa livre à direita do título. A
     terceira mora no entalhe que a manchete deixa depois de "Sobre mim," —
     mais abaixo ela aparecia como caixa solta sob a última linha. */
  about: [
    { top: '12%', right: '2%', width: '25vw', rotate: '-2deg', depth: 1 },
    { top: '33%', right: '-5%', width: '20vw', rotate: '3deg', depth: 2 },
    { top: '20%', right: '30%', width: '14vw', rotate: '1.5deg', depth: 3 },
  ],
};

const HeroBackdrop = ({ variant = 'home' }) => {
  const posicoes = arranjos[variant];
  const comCapa = featuredProjects.filter((p) => p.cover);

  /* O sobre pega pelo fim para não repetir as mesmas três capturas da home
     — mesmo a 13% de opacidade, o par idêntico lê como página copiada. */
  const capas =
    variant === 'about'
      ? comCapa.slice(-posicoes.length).reverse()
      : comCapa.slice(0, posicoes.length);

  return (
    <div className="hero-backdrop" aria-hidden="true">
      {capas.map((project, index) => {
        const pos = posicoes[index];
        return (
          <figure
            className="plate hero-plate"
            key={project.id}
            data-depth={pos.depth}
            /* Quanto mais ao fundo, mais a placa acompanha o ponteiro: é a
               diferença entre as camadas que dá profundidade. */
            data-parallax={pos.depth * 0.55}
            /* Inclinação inversa à profundidade: o que está perto gira mais,
               como um objeto plano que você olha de lado. */
            data-tilt={1.4 - pos.depth * 0.25}
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

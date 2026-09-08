import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap, reducedMotion } from '../../lib/motion';
import { featuredProjects } from '../../data/projects';
import './PagePlates.css';

/**
 * As capturas dos projetos continuam descendo a página, fora do herói e do
 * manifesto, que já têm as suas.
 *
 * Substitui a malha de colunas que existia aqui: régua quadriculada de fundo
 * é uma das assinaturas mais reconhecíveis de página gerada por IA, e este
 * site inteiro foi feito para não parecer isso. Material próprio no lugar de
 * ornamento genérico.
 *
 * As posições são porcentagem da altura do conteúdo, então a distribuição
 * acompanha páginas de tamanhos diferentes sem número mágico por rota.
 */
const posicoes = [
  { top: '31%', left: '-4%', width: '20vw', rotate: '-2deg', depth: 1 },
  { top: '44%', right: '-3%', width: '17vw', rotate: '2.5deg', depth: 2 },
  { top: '58%', left: '2%', width: '15vw', rotate: '1.5deg', depth: 3 },
  { top: '71%', right: '1%', width: '18vw', rotate: '-1.5deg', depth: 4 },
  { top: '85%', left: '-2%', width: '16vw', rotate: '2deg', depth: 5 },
];

const PagePlates = () => {
  const raiz = useRef(null);
  const { pathname } = useLocation();
  const capas = featuredProjects.filter((p) => p.cover);

  useEffect(() => {
    if (!raiz.current || reducedMotion()) return undefined;

    const ctx = gsap.context((self) => {
      // Cada placa sobe num ritmo próprio conforme passa pela tela.
      self.selector('.page-plate').forEach((plate) => {
        const drift = Number(plate.dataset.drift) || 1;
        gsap.fromTo(
          plate,
          { yPercent: 14 + drift * 3 },
          {
            yPercent: -14 - drift * 3,
            ease: 'none',
            scrollTrigger: {
              trigger: plate,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    }, raiz);

    return () => ctx.revert();
  }, [pathname]);

  if (!capas.length) return null;

  return (
    <div className="page-plates" aria-hidden="true" ref={raiz}>
      {posicoes.map((pos, index) => {
        const { depth, ...estilo } = pos;
        const project = capas[index % capas.length];

        return (
          <figure
            className="plate page-plate"
            key={`${project.id}-${index}`}
            data-drift={depth}
            style={estilo}
          >
            <img src={project.cover} alt="" loading="lazy" decoding="async" />
          </figure>
        );
      })}
    </div>
  );
};

export default PagePlates;

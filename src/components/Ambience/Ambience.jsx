import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, reducedMotion } from '../../lib/motion';
import './Ambience.css';

/**
 * Atmosfera do site inteiro, numa camada fixa só: grão, colunas de guia e
 * três clarões que se deslocam com a rolagem.
 *
 * Existe porque fora da primeira dobra a página assentava num plano liso —
 * o fundo precisa continuar acontecendo depois do herói. Como a camada é
 * fixa e os clarões é que se movem, dá a sensação de atravessar um espaço
 * iluminado em vez de rolar sobre um papel preto.
 */
const Ambience = () => {
  const raiz = useRef(null);

  useEffect(() => {
    if (!raiz.current || reducedMotion()) return undefined;

    const ctx = gsap.context((self) => {
      /* Cada clarão percorre a página num sentido e numa velocidade
         próprios. Amarrado ao documento inteiro, não a uma seção: é a luz
         da página que muda, e não um efeito de bloco. */
      self.selector('.ambience-bloom').forEach((bloom) => {
        const drift = Number(bloom.dataset.drift) || 1;
        gsap.to(bloom, {
          yPercent: drift % 2 === 0 ? 34 : -30,
          xPercent: drift * 6 - 12,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });
      });
    }, raiz);

    // A altura do documento muda quando os pins são montados.
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <div className="ambience" aria-hidden="true" ref={raiz}>
      {/* Clarões: gradiente radial puro, sem filtro de desfoque — a essa
          escala o blur custa caro e o gradiente já entrega a borda macia. */}
      <span className="ambience-bloom is-a" data-drift="1" />
      <span className="ambience-bloom is-b" data-drift="2" />
      <span className="ambience-bloom is-c" data-drift="3" />

      <svg className="ambience-grain" xmlns="http://www.w3.org/2000/svg">
        <filter id="ambience-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ambience-noise)" />
      </svg>
    </div>
  );
};

export default Ambience;

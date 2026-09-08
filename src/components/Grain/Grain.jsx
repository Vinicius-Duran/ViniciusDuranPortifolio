import React from 'react';
import './Grain.css';

/**
 * Grão fixo sobre a página inteira. Existe para quebrar a chapa digital do
 * fundo sólido — sem ele, uma superfície escura grande lê como plástico.
 * Fica fora do fluxo e não recebe ponteiro.
 */
const Grain = () => (
  <div className="grain" aria-hidden="true">
    <svg className="grain-svg" xmlns="http://www.w3.org/2000/svg">
      <filter id="grain-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.82"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-noise)" />
    </svg>
  </div>
);

export default Grain;

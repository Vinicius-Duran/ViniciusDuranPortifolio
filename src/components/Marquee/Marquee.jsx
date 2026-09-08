import React from 'react';
import './Marquee.css';

/**
 * Faixa contínua. O conteúdo é duplicado e a animação translada exatamente
 * -50%, então a emenda cai fora da tela e o laço fica invisível.
 */
const Marquee = ({ items, speed = 42 }) => (
  <div className="marquee" aria-hidden="true">
    <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
      {[0, 1].map((copy) => (
        <ul className="marquee-run" key={copy}>
          {items.map((item) => (
            <li key={`${copy}-${item}`}>
              {item}
              <span className="marquee-sep">—</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  </div>
);

export default Marquee;

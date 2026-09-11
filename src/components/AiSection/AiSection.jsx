import React from 'react';
import { Link } from 'react-router-dom';
import Frame from '../Frame/Frame';
import { aiIntro, aiCapabilities, aiPipeline } from '../../data/ai';
import './AiSection.css';

/**
 * Engenharia de IA, em resumo. O diagrama desenha o fluxo — descrição,
 * plano, implementação, revisão, entrega — e o link leva à página /ia, onde
 * cada etapa, as regras e as lições aparecem por inteiro.
 */
const AiSection = () => (
  <section className="ai" id="ai" data-build-step="ai.jsx">
    <div className="shell">
      <div className="part ai-head">
        <Frame tag="h2 · ai" />
        <h2 className="section-title">
          Sistemas que <em>constroem software</em> comigo.
        </h2>
      </div>

      <p className="lede ai-lede">{aiIntro}</p>

      {/* --- Diagrama do fluxo ---------------------------------------- */}
      <figure className="ai-flow" aria-hidden="true">
        <svg className="ai-flow-svg" viewBox="0 0 1000 120" preserveAspectRatio="none">
          <path
            className="ai-flow-track"
            d="M40 60 H 960"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="ai-flow-live"
            d="M40 60 H 960"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <ol className="ai-flow-steps">
          {aiPipeline.map((step, index) => (
            <li className="ai-flow-step" key={step.label}>
              <span className="ai-flow-dot" />
              <span className="ai-flow-n">{String(index + 1).padStart(2, '0')}</span>
              <span className="ai-flow-label">{step.label}</span>
            </li>
          ))}
        </ol>
      </figure>

      {/* --- Capacidades ---------------------------------------------- */}
      <ul className="ai-grid">
        {aiCapabilities.map((item) => (
          <li className="ai-item" key={item.id}>
            <span className="ai-item-id">{item.id}</span>
            <h3 className="ai-item-title">{item.title}</h3>
            <p className="ai-item-text">{item.text}</p>
          </li>
        ))}
      </ul>

      <Link to="/ia" className="link ai-more">
        <span>Como funciona por dentro</span>
        <span className="link-arrow" aria-hidden="true">
          →
        </span>
      </Link>
    </div>
  </section>
);

export default AiSection;

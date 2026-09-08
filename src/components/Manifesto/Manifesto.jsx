import React from 'react';
import { featuredProjects } from '../../data/projects';
import './Manifesto.css';

/* As mesmas capturas do herói continuam aqui para a imagem não terminar num
   corte seco: sem elas a seção volta a ser um retângulo preto logo depois de
   uma primeira dobra cheia. Ficam nas faixas de cima e de baixo, fora da
   altura em que a frase atravessa. */
const placas = [
  { top: '5%', left: '4%', width: '19vw', rotate: '-2deg', depth: 1 },
  { top: '9%', right: '6%', width: '17vw', rotate: '2deg', depth: 2 },
  { bottom: '6%', left: '22%', width: '16vw', rotate: '1.5deg', depth: 3 },
  { bottom: '9%', right: '13%', width: '20vw', rotate: '-1.5deg', depth: 4 },
];

/**
 * A frase corre na horizontal enquanto a seção fica presa na tela. Os termos
 * que importam vêm em chips, e entre eles passam adereços técnicos em ritmo
 * próprio — a leitura vira travessia.
 *
 * A frase é montada a partir desta lista para que a ordem, os destaques e os
 * adereços fiquem num lugar só, em vez de espalhados no JSX.
 */
/* A frase é curta de propósito: o comprimento do trilho é o quanto a página
   fica presa. A 120px por letra, uma frase longa vira dez telas de rolagem
   para dizer uma coisa só. */
const PIECES = [
  { kind: 'text', value: 'Desenho o' },
  { kind: 'chip', value: 'schema', tone: 'outline', tilt: 2 },
  { kind: 'prop', value: 'curve' },
  { kind: 'text', value: ', escrevo a' },
  { kind: 'chip', value: 'API', tone: 'paper', tilt: -2 },
  { kind: 'text', value: ', construo a' },
  { kind: 'chip', value: 'interface', tone: 'amber', tilt: 3 },
  { kind: 'prop', value: 'bracket' },
  { kind: 'text', value: 'e cuido do' },
  { kind: 'chip', value: 'detalhe', tone: 'amber', tilt: -3 },
  { kind: 'text', value: 'que ninguém vê.' },
  { kind: 'prop', value: 'star' },
];

/** Curva de easing com as alças à mostra — o diagrama, não a metáfora. */
const CurveProp = () => (
  <svg className="prop prop-curve" viewBox="0 0 120 120" aria-hidden="true">
    <line className="prop-handle" x1="6" y1="114" x2="46" y2="30" />
    <line className="prop-handle" x1="114" y1="6" x2="74" y2="90" />
    <path className="prop-path" d="M6 114 C 46 30, 74 90, 114 6" fill="none" />
    <circle className="prop-node" cx="6" cy="114" r="4.5" />
    <circle className="prop-node" cx="114" cy="6" r="4.5" />
    <rect className="prop-handle-cap" x="41" y="25" width="9" height="9" />
    <rect className="prop-handle-cap" x="69" y="85" width="9" height="9" />
  </svg>
);

const BracketProp = () => (
  <svg className="prop prop-bracket" viewBox="0 0 90 120" aria-hidden="true">
    <path className="prop-path" d="M34 6 C 16 6, 22 54, 6 60 C 22 66, 16 114, 34 114" fill="none" />
    <path className="prop-path" d="M56 6 C 74 6, 68 54, 84 60 C 68 66, 74 114, 56 114" fill="none" />
  </svg>
);

const StarProp = () => (
  <svg className="prop prop-star" viewBox="0 0 120 120" aria-hidden="true">
    {[0, 45, 90, 135].map((angle) => (
      <line
        key={angle}
        className="prop-ray"
        x1="60"
        y1="12"
        x2="60"
        y2="108"
        transform={`rotate(${angle} 60 60)`}
      />
    ))}
  </svg>
);

const PROPS = { curve: CurveProp, bracket: BracketProp, star: StarProp };

const Manifesto = () => (
  <section className="manifesto" data-build-step="manifesto.jsx">
    {/* O texto corrido fica disponível a leitor de tela e a busca numa linha
        só; a versão em pedaços é decorativa. */}
    <h2 className="visually-hidden">
      Desenho o schema, escrevo a API, construo a interface e cuido do detalhe
      que ninguém vê.
    </h2>

    <div className="manifesto-backdrop" aria-hidden="true">
      {featuredProjects
        .filter((p) => p.cover)
        .slice(0, placas.length)
        .map((project, index) => {
          const { depth, ...posicao } = placas[index];
          return (
            <figure
              className="plate manifesto-plate"
              key={project.id}
              data-depth={depth}
              data-parallax={0.35 + depth * 0.14}
              data-tilt="1"
              style={posicao}
            >
              <img src={project.cover} alt="" loading="lazy" decoding="async" />
            </figure>
          );
        })}
    </div>

    {/* Camada solta: adereços em alturas diferentes, cada um em ritmo
        próprio, para a frase não ficar sozinha no meio de uma tela vazia. */}
    <div className="manifesto-floats" aria-hidden="true">
      <span className="manifesto-float is-curve" data-parallax="0.9" data-tilt="1.2">
        <CurveProp />
      </span>
      <span className="manifesto-float is-star" data-parallax="1.3">
        <StarProp />
      </span>
      <span className="manifesto-float is-square" data-parallax="1.1" data-tilt="1.4" />
      <span className="manifesto-float is-dots" data-parallax="0.7">
        <svg viewBox="0 0 60 60">
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <circle key={`${row}-${col}`} cx={8 + col * 15} cy={8 + row * 15} r="2.5" />
            ))
          )}
        </svg>
      </span>
    </div>

    <div className="manifesto-track" aria-hidden="true">
      {PIECES.map((piece, index) => {
        const key = `${piece.kind}-${index}`;

        if (piece.kind === 'prop') {
          const Prop = PROPS[piece.value];
          return (
            <span className="manifesto-prop" key={key}>
              <Prop />
            </span>
          );
        }

        if (piece.kind === 'chip') {
          return (
            <mark
              className={`manifesto-chip is-${piece.tone}`}
              key={key}
              style={{ '--tilt': `${piece.tilt}deg` }}
            >
              {piece.value}
            </mark>
          );
        }

        return (
          <span className="manifesto-word" key={key}>
            {piece.value}
          </span>
        );
      })}
    </div>
  </section>
);

export default Manifesto;

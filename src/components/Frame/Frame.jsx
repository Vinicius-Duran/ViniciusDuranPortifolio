import React from 'react';

/**
 * O quadro de wireframe e o rótulo que a montagem desenha por cima de uma
 * peça. Ambos são decoração: o conteúdo real é irmão deles e está sempre no
 * DOM, então leitor de tela e busca nunca dependem da animação.
 *
 * Vai sempre como primeiro filho de um elemento `.part` — `assemblePart`
 * trata os demais filhos como o conteúdo a revelar.
 */
const Frame = ({ tag }) => (
  <>
    <span className="part-frame" aria-hidden="true" />
    <span className="part-tag" aria-hidden="true">
      {tag}
    </span>
  </>
);

export default Frame;

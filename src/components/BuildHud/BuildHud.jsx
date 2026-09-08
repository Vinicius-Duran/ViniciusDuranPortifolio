import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger, reducedMotion } from '../../lib/motion';
import './BuildHud.css';

/**
 * Leitor de build. Lê os `data-build-step` que as seções declaram e mostra
 * qual delas está em tela, como saída de um compilador acompanhando a
 * montagem da página.
 *
 * Não inventa nada: se a página não declara passos, ele não aparece.
 */
const BuildHud = () => {
  const [steps, setSteps] = useState([]);
  const [current, setCurrent] = useState(0);
  const barRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const nodes = [...document.querySelectorAll('[data-build-step]')];
    setCurrent(0);

    if (!nodes.length) {
      setSteps([]);
      return undefined;
    }

    setSteps(nodes.map((node) => node.dataset.buildStep));

    const triggers = nodes.map((node, index) =>
      ScrollTrigger.create({
        trigger: node,
        start: 'top 60%',
        end: 'bottom 40%',
        onToggle: (self) => {
          if (self.isActive) setCurrent(index);
        },
      })
    );

    return () => triggers.forEach((trigger) => trigger.kill());
  }, [pathname]);

  /* A barra é escrita direto no nó, fora do ciclo do React: o valor muda a
     cada frame de rolagem e um re-render por frame seria caro à toa. */
  useEffect(() => {
    const bar = barRef.current;
    if (!bar || !steps.length) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      bar.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [steps.length]);

  if (!steps.length || reducedMotion()) return null;

  return (
    <aside className="build-hud" aria-hidden="true">
      <span className="build-hud-dot" />
      <span className="build-hud-count">
        {String(current + 1).padStart(2, '0')}/{String(steps.length).padStart(2, '0')}
      </span>
      <span className="build-hud-name">{steps[current]}</span>
      <span className="build-hud-track">
        <span className="build-hud-bar" ref={barRef} />
      </span>
    </aside>
  );
};

export default BuildHud;

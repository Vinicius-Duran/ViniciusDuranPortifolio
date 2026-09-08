import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { animate, stagger, createScope } from 'animejs';

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

export const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * useLayoutEffect roda antes da pintura, então o estado inicial que o GSAP
 * escreve nunca chega a piscar visível. Em SSR não existe layout: cai para
 * useEffect para não emitir aviso — e lá nada anima de qualquer forma.
 */
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? () => {} : useLayoutEffect;

/**
 * Contexto GSAP com escopo no ref. Todo seletor dentro do callback fica preso
 * à subárvore, e o revert no cleanup desfaz tweens e ScrollTriggers.
 */
export const useGsapScope = (callback, deps = []) => {
  const scope = useRef(null);

  useIsomorphicLayoutEffect(() => {
    if (!scope.current) return undefined;
    const ctx = gsap.context(callback, scope);
    return () => ctx.revert();
  }, deps);

  return scope;
};

/**
 * O momento autoral do site: a assinatura sobe linha a linha por trás de uma
 * máscara, e a régua de acento se desenha por baixo dela. Acontece uma vez,
 * na primeira dobra, e não se repete em nenhuma outra seção.
 */
export const heroIntro = (root) => {
  if (!root || reducedMotion()) return null;

  const timeline = gsap.timeline({
    defaults: { ease: 'power4.out' },
  });

  const headline = root.querySelector('[data-hero-headline]');

  if (headline) {
    SplitText.create(headline, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      linesClass: 'hero-split-line',
      onSplit(self) {
        return timeline.from(
          self.lines,
          { yPercent: 115, duration: 1.15, stagger: 0.085 },
          0
        );
      },
    });
  }

  timeline
    .from(
      root.querySelectorAll('[data-hero-rule]'),
      { scaleX: 0, duration: 1.1, ease: 'expo.out' },
      0.35
    )
    .from(
      root.querySelectorAll('[data-hero-fade]'),
      { y: 18, opacity: 0, duration: 0.8, stagger: 0.09 },
      0.5
    );

  return timeline;
};

/**
 * Título de seção: revelação por máscara horizontal, distinta da entrada do
 * corpo de texto logo abaixo. Duas gramáticas, não uma repetida em tudo.
 */
export const revealHeading = (element) => {
  if (reducedMotion() || !element) return null;

  return gsap.from(element, {
    clipPath: 'inset(0 0 108% 0)',
    y: 22,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: { trigger: element, start: 'top 88%' },
  });
};

/**
 * Corpo e listas: subida curta escalonada. anime.js cuida daqui porque o
 * stagger dele aceita origem e grade — útil nas grades de competência.
 */
export const revealStack = (elements, options = {}) => {
  if (reducedMotion() || !elements?.length) return null;

  const { from = 'first', grid, delayStep = 60, distance = 24 } = options;

  gsap.set(elements, { opacity: 0 });

  return animate(elements, {
    y: [distance, 0],
    opacity: [0, 1],
    duration: 720,
    ease: 'out(3)',
    delay: stagger(delayStep, grid ? { grid, from } : { from }),
    autoplay: false,
  });
};

/**
 * Dispara uma animação do anime.js quando o bloco entra na viewport, uma vez
 * só. ScrollTrigger já está carregado, então não vale um segundo observador.
 */
export const playOnEnter = (trigger, animation) => {
  if (!animation) return null;

  // Sem gatilho não há como esperar a viewport, e o bloco já foi escondido
  // pelo revealStack. Toca na hora em vez de deixar conteúdo invisível.
  if (!trigger) {
    animation.play();
    return null;
  }

  return ScrollTrigger.create({
    trigger,
    start: 'top 85%',
    once: true,
    onEnter: () => animation.play(),
  });
};

/**
 * Embaralha o texto ao entrar na linha do projeto. Só no ponteiro fino: em
 * toque o hover dispara no tap e o efeito viraria ruído.
 */
export const scrambleTo = (element, text) => {
  if (!element || reducedMotion()) return null;

  return gsap.to(element, {
    duration: 0.55,
    scrambleText: { text, chars: '01<>/{}[]#', speed: 0.6, revealDelay: 0.12 },
  });
};

export { gsap, ScrollTrigger, animate, stagger, createScope };

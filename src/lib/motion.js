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

/* =========================================================================
   A MONTAGEM
   Uma peça se constrói em quatro tempos: o quadro é desenhado, o rótulo diz
   o que ela é, o conteúdo entra, e a guia se retira. É a mesma gramática na
   página inteira — o que muda é a duração e o quanto ela se demora.
   ========================================================================= */

/**
 * Monta uma peça. `timeline` é onde os tempos são inseridos, `at` é a posição
 * na linha do tempo, e `pace` multiplica a duração: 1 no herói, onde o
 * espetáculo vale, e ~0.6 nas seções, onde ele só precisa dar ritmo.
 */
export const assemblePart = (timeline, part, at, pace = 1) => {
  const frame = part.querySelector(':scope > .part-frame');
  const tag = part.querySelector(':scope > .part-tag');
  const payload = [...part.children].filter(
    (child) => child !== frame && child !== tag
  );

  // 1 — o quadro é desenhado da esquerda para a direita
  if (frame) {
    timeline
      .fromTo(
        frame,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.32 * pace, ease: 'power3.inOut' },
        at
      )
      // 4 — e some depois que o conteúdo assumiu o lugar dele
      .to(
        frame,
        { opacity: 0, duration: 0.28 * pace, ease: 'power2.out' },
        at + 0.5 * pace
      );
  }

  // 2 — o rótulo aparece com o nome da peça
  if (tag) {
    timeline
      .fromTo(tag, { opacity: 0 }, { opacity: 1, duration: 0.14 * pace }, at + 0.2 * pace)
      .to(tag, { opacity: 0, duration: 0.24 * pace }, at + 0.5 * pace);
  }

  // 3 — o conteúdo entra por dentro do quadro
  if (payload.length) {
    timeline.fromTo(
      payload,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45 * pace,
        ease: 'power3.out',
        stagger: 0.04 * pace,
      },
      at + 0.28 * pace
    );
  }

  return timeline;
};

/**
 * A abertura: a malha de guias se levanta, as peças do herói se montam uma a
 * uma, e o título é compilado caractere a caractere. Roda uma vez, no carregamento.
 */
export const buildIntro = (root) => {
  if (!root || reducedMotion()) return null;

  const timeline = gsap.timeline();
  const guides = root.querySelectorAll('.build-grid span');
  const parts = root.querySelectorAll('.part');
  const headline = root.querySelector('[data-build-headline]');

  if (guides.length) {
    timeline
      .fromTo(
        guides,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.45, ease: 'power2.inOut', stagger: 0.03 },
        0
      )
      .to(guides, { opacity: 0.4, duration: 0.5 }, 0.9);
  }

  /* O ritmo é curto de propósito: a primeira peça começa quase junto com a
     página. Uma abertura que deixa o herói vazio por um segundo não lê como
     construção, lê como site quebrado. */
  parts.forEach((part, index) => {
    assemblePart(timeline, part, 0.12 + index * 0.3, 1);
  });

  // O título não desliza: ele é escrito, como saída de compilador.
  // Dividir em `words,chars`, e não só em `chars`: sem os invólucros de
  // palavra o navegador perde os espaços e quebra linha no meio da frase —
  // "peça a peça" saía "peça apeça", com o ponto final numa linha só dele.
  if (headline) {
    const split = SplitText.create(headline, { type: 'words,chars' });
    timeline.from(
      split.chars,
      {
        opacity: 0,
        duration: 0.01,
        stagger: { each: 0.014, from: 'start' },
        ease: 'none',
      },
      0.34
    );
  }

  return timeline;
};

/**
 * Chegada de seção: a mesma montagem, disparada pela rolagem e mais rápida,
 * porque aqui ela marca o ritmo em vez de ser o número principal.
 */
export const buildOnScroll = (section) => {
  if (!section || reducedMotion()) return null;

  const parts = section.querySelectorAll('.part');
  if (!parts.length) return null;

  const timeline = gsap.timeline({
    paused: true,
    // Ao terminar, limpa tudo que o GSAP escreveu inline: a partir daí o
    // elemento volta a obedecer só o CSS, inclusive nos estados de hover.
    onComplete: () => gsap.set(section.querySelectorAll('.part > *'), { clearProps: 'all' }),
  });

  parts.forEach((part, index) => {
    assemblePart(timeline, part, index * 0.16, 0.6);
  });

  ScrollTrigger.create({
    trigger: section,
    start: 'top 82%',
    once: true,
    onEnter: () => timeline.play(),
  });

  return timeline;
};

/**
 * Stagger de lista pelo anime.js, cujo `stagger()` aceita origem e grade.
 * Fica para as listas longas, onde a montagem peça a peça seria arrastada.
 */
export const revealStack = (elements, options = {}) => {
  if (reducedMotion() || !elements?.length) return null;

  const { from = 'first', grid, delayStep = 55, distance = 22 } = options;

  gsap.set(elements, { opacity: 0 });

  return animate(elements, {
    y: [distance, 0],
    opacity: [0, 1],
    duration: 680,
    ease: 'out(3)',
    delay: stagger(delayStep, grid ? { grid, from } : { from }),
    autoplay: false,
  });
};

export const playOnEnter = (trigger, animation) => {
  if (!animation) return null;

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

/** Embaralha o texto ao entrar na linha do projeto. */
export const scrambleTo = (element, text) => {
  if (!element || reducedMotion()) return null;

  return gsap.to(element, {
    duration: 0.5,
    scrambleText: { text, chars: '01<>/{}[]#', speed: 0.7, revealDelay: 0.1 },
  });
};

/**
 * Parallax vertical amarrado à rolagem.
 */
export const parallax = (element, trigger, amount = 8) => {
  if (!element || reducedMotion()) return null;

  return gsap.fromTo(
    element,
    { yPercent: -amount },
    {
      yPercent: amount,
      ease: 'none',
      scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true },
    }
  );
};

export { gsap, ScrollTrigger, animate, stagger, createScope };

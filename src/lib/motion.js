import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { animate, stagger, createScope } from 'animejs';

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, DrawSVGPlugin);

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

/* =========================================================================
   TRILHOS HORIZONTAIS
   A rolagem vertical vira deslocamento horizontal enquanto a seção fica
   presa na tela. É o movimento central: o scroll deixa de só revelar e passa
   a conduzir.
   ========================================================================= */

/**
 * Prende a seção e arrasta o trilho para a esquerda conforme a página rola.
 * Devolve o tween, que serve de `containerAnimation` para gatilhos dos
 * elementos lá dentro — sem isso, um ScrollTrigger de filho mede a posição
 * vertical dele e nunca dispara.
 *
 * A distância é recalculada em cada refresh: ela depende de larguras que
 * mudam quando a fonte carrega ou a janela muda de tamanho.
 */
export const horizontalTrack = (section, track, options = {}) => {
  if (!section || !track) return null;

  const { endPadding = 0, scrub = 0.8 } = options;
  const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

  return gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${distance() + endPadding}`,
      pin: true,
      scrub,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });
};

/**
 * Entrada de um elemento que vive dentro de um trilho horizontal. As marcas
 * `left ...%` medem a travessia horizontal, e não a vertical.
 */
export const enterFromTrack = (element, containerAnimation, vars = {}) => {
  if (!element || !containerAnimation || reducedMotion()) return null;

  const { rotate = 0, from = {}, to = {} } = vars;

  return gsap.fromTo(
    element,
    { scale: 0.72, rotate: rotate - 6, opacity: 0, ...from },
    {
      scale: 1,
      rotate,
      opacity: 1,
      ease: 'power2.out',
      ...to,
      scrollTrigger: {
        trigger: element,
        containerAnimation,
        start: 'left 92%',
        end: 'left 55%',
        scrub: true,
      },
    }
  );
};

/**
 * Deslocamento em ritmo próprio dentro do trilho: os adereços passam mais
 * rápido ou mais devagar que o texto, e a cena ganha profundidade.
 */
export const driftInTrack = (element, containerAnimation, amount) => {
  if (!element || !containerAnimation || reducedMotion()) return null;

  return gsap.fromTo(
    element,
    { xPercent: -amount, yPercent: amount / 3 },
    {
      xPercent: amount,
      yPercent: -amount / 3,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        containerAnimation,
        start: 'left right',
        end: 'right left',
        scrub: true,
      },
    }
  );
};

/**
 * Cartas que se empilham: cada uma para no topo e a seguinte sobe por cima,
 * enquanto a de baixo encolhe e escurece. `pinSpacing: false` é o que faz
 * elas ocuparem o mesmo espaço em vez de esticar a página.
 */
export const stackCards = (cards, options = {}) => {
  if (!cards?.length || reducedMotion()) return [];

  const { top = 18, container } = options;
  if (!container) return [];

  const lista = [...cards];

  /* Os recuos são criados antes de qualquer pin, e de propósito: um
     ScrollTrigger montado depois mede a carta seguinte já em `position:
     fixed`, e o deslocamento que ele lê no documento não quer dizer nada. */
  const recuos = lista.map((card, index) => {
    /* A carta presa vira `fixed` e passa a pintar por cima da seguinte, que
       ainda está no fluxo. Ordenar a pilha explicitamente é o que garante
       que a que chega fique sempre na frente. */
    gsap.set(card, { zIndex: index + 1 });

    if (index === lista.length - 1) return null;

    /* O recuo é por escurecimento e desfoque, nunca por opacidade: uma carta
       translúcida deixa a de trás atravessá-la, e as duas leem sobrepostas
       em texto ilegível. Opaca, a carta da frente sempre oculta a anterior, e
       o que sobra é a borda superior espiando — que é o efeito de baralho. */
    /* A carta declara `filter: blur(0px) brightness(1)` no CSS de propósito:
       partindo de `none`, o GSAP não tem valor de origem por função e assume
       zero — e `brightness(0)` é preto, então a carta atravessava o scrub
       como um buraco. Escurece só o suficiente para recuar, num fundo que é
       marrom-carvão, não preto. */
    return gsap.to(card, {
      scale: 0.94,
      y: -18,
      filter: 'blur(5px) brightness(0.72)',
      ease: 'none',
      scrollTrigger: {
        trigger: lista[index + 1],
        start: `top ${top + 55}%`,
        end: `top ${top}%`,
        scrub: true,
      },
    });
  });

  /* Só agora os pins. O fim é ancorado no contêiner, e nunca na última
     carta: ela também é presa, então o `bottom` dela para de se mover e o
     fim jamais resolve — a primeira carta ficava presa e recuada da primeira
     à última tela do site. O contêiner nunca é preso, então mede certo. */
  lista.forEach((card) => {
    ScrollTrigger.create({
      trigger: card,
      start: `top ${top}%`,
      endTrigger: container,
      end: 'bottom bottom',
      pin: true,
      pinSpacing: false,
    });
  });

  return recuos;
};

/** Desenha um traço SVG conforme a rolagem. */
export const drawOnScroll = (path, trigger) => {
  if (!path || reducedMotion()) return null;

  return gsap.fromTo(
    path,
    { drawSVG: '0%' },
    {
      drawSVG: '100%',
      ease: 'none',
      scrollTrigger: { trigger: trigger || path, start: 'top 85%', end: 'bottom 55%', scrub: true },
    }
  );
};

/**
 * Conta um número até o valor final conforme ele entra na tela. Escreve no
 * nó direto, sem passar pelo estado do React.
 */
export const countTo = (element, value, trigger) => {
  if (!element || reducedMotion()) return null;

  const counter = { n: 0 };

  return gsap.to(counter, {
    n: value,
    ease: 'power2.out',
    duration: 1.4,
    onUpdate: () => {
      element.textContent = Math.round(counter.n);
    },
    scrollTrigger: { trigger: trigger || element, start: 'top 88%', once: true },
  });
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

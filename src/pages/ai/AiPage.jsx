import React from 'react';
import { Link } from 'react-router-dom';
import Frame from '../../components/Frame/Frame';
import {
  useGsapScope,
  buildIntro,
  buildOnScroll,
  revealStack,
  playOnEnter,
  stackCards,
  gsap,
} from '../../lib/motion';
import {
  aiPage,
  aiStages,
  aiRules,
  aiHumanLoop,
  aiMemory,
  aiLessons,
} from '../../data/ai';
import { profile } from '../../data/profile';
import './AiPage.css';

/* A tarefa atravessa as etapas nesta ordem, e a revisão a devolve uma vez à
   implementação. Os índices seguem `aiStages`, cuja ordem o teste trava. */
const IMPLEMENTACAO = 2;
const REVISAO = 3;

const Titulo = ({ texto }) => (
  <>
    {texto.lead}
    <em>{texto.emphasis}</em>
    {texto.tail}
  </>
);

const Grade = ({ className, step, secao, itens }) => (
  <section className={className} data-build-step={step}>
    <div className="shell">
      <div className="part aip-head">
        <Frame tag={secao.tag} />
        <h2 className="section-title">
          <Titulo texto={secao.title} />
        </h2>
      </div>

      <ul className="aip-grid">
        {itens.map((item) => (
          <li className="aip-item" key={item.title}>
            <h3 className="aip-item-title">{item.title}</h3>
            <p className="aip-item-text">{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/**
 * O pipeline ao vivo. A seção fica presa e a rolagem conduz a tarefa pelo
 * trilho: o traço se desenha até a etapa, o ponto acende, o princípio troca.
 * Na revisão a tarefa é reprovada, volta à implementação e refaz o caminho.
 *
 * Posições são funções, e não números: dependem da largura da janela, e o
 * `invalidateOnRefresh` só recalcula o que foi escrito como função.
 */
const montarPipeline = (secao) => {
  const trilho = secao.querySelector('.aip-rail');
  const vivo = secao.querySelector('.aip-rail-live');
  const marcador = secao.querySelector('.aip-token');
  const selo = secao.querySelector('.aip-token-pr');
  const aviso = secao.querySelector('.aip-rejected');
  const etapas = [...secao.querySelectorAll('.aip-stage')];
  const pontos = etapas.map((etapa) => etapa.querySelector('.aip-stage-fill'));
  const principios = etapas.map((etapa) => etapa.querySelector('.aip-stage-principle'));

  const centro = (indice) => {
    const caixaTrilho = trilho.getBoundingClientRect();
    const caixaPonto = etapas[indice].querySelector('.aip-stage-dot').getBoundingClientRect();
    return caixaPonto.left + caixaPonto.width / 2 - caixaTrilho.left;
  };

  const ate = (indice) =>
    `0% ${(centro(indice) / trilho.getBoundingClientRect().width) * 100}%`;

  gsap.set(principios, { autoAlpha: 0, y: 16 });
  gsap.set(pontos, { scale: 0 });
  gsap.set(aviso, { autoAlpha: 0 });
  gsap.set(selo, { autoAlpha: 0, xPercent: -50, scale: 0.6 });
  gsap.set(marcador, { xPercent: -50 });

  const linha = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: secao,
      start: 'top top',
      end: () => `+=${window.innerHeight * 3.2}`,
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      // Acima das lições na página: precisa medir antes do pin delas.
      refreshPriority: 2,
    },
  });

  linha
    .set(marcador, { x: () => centro(0) }, 0)
    .set(vivo, { drawSVG: () => ate(0) }, 0)
    .to(pontos[0], { scale: 1, duration: 0.25 }, 0)
    .to(principios[0], { autoAlpha: 1, y: 0, duration: 0.35 }, 0)
    .to({}, { duration: 0.6 });

  const avancar = (de, para) => {
    linha
      .to(principios[de], { autoAlpha: 0, y: -16, duration: 0.3 })
      .to(marcador, { x: () => centro(para), duration: 1 }, '<')
      .to(vivo, { drawSVG: () => ate(para), duration: 1 }, '<')
      .to(pontos[para], { scale: 1, duration: 0.25 }, '>-0.25')
      .to(principios[para], { autoAlpha: 1, y: 0, duration: 0.35 }, '<')
      // Respiro: o princípio fica parado e legível antes da etapa seguinte.
      .to({}, { duration: 0.6 });
  };

  avancar(0, 1);
  avancar(1, IMPLEMENTACAO);
  avancar(IMPLEMENTACAO, REVISAO);

  // A reprovação: o aviso acende, a tarefa volta e o traço recolhe junto.
  linha
    .to(aviso, { autoAlpha: 1, duration: 0.25 })
    .to(marcador, { x: () => centro(IMPLEMENTACAO), duration: 0.8 })
    .to(vivo, { drawSVG: () => ate(IMPLEMENTACAO), duration: 0.8 }, '<')
    .to(pontos[REVISAO], { scale: 0, duration: 0.2 }, '<')
    .to({}, { duration: 0.4 })
    .to(aviso, { autoAlpha: 0, duration: 0.25 })
    .to(marcador, { x: () => centro(REVISAO), duration: 0.8 }, '<')
    .to(vivo, { drawSVG: () => ate(REVISAO), duration: 0.8 }, '<')
    .to(pontos[REVISAO], { scale: 1, duration: 0.2 }, '>-0.2')
    .to({}, { duration: 0.4 });

  avancar(REVISAO, 4);
  linha.to(selo, { autoAlpha: 1, scale: 1, duration: 0.3 }, '<');

  return linha;
};

const AiPage = () => {
  const { hero, pipeline, rules, humanLoop, memory, lessons, closing } = aiPage;

  const root = useGsapScope((self) => {
    const el = (selector) => self.selector(selector)[0];
    const all = (selector) => self.selector(selector);

    buildIntro(el('.aip-hero'));

    all('[data-build-step]').forEach((secao) => {
      if (!secao.classList.contains('aip-hero')) buildOnScroll(secao);
    });

    playOnEnter(el('.aip-rules'), revealStack(all('.aip-rules .aip-item'), { delayStep: 60 }));
    playOnEnter(el('.aip-loop'), revealStack(all('.aip-loop .aip-item'), { delayStep: 80 }));
    playOnEnter(el('.aip-memory'), revealStack(all('.aip-memory .aip-item'), { delayStep: 80 }));

    const mm = gsap.matchMedia();

    /* Prender só onde há tela larga e movimento permitido. Fora disso as
       etapas ficam empilhadas, com todos os princípios à vista. */
    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const secao = el('.aip-pipeline');
      secao.classList.add('is-live');
      montarPipeline(secao);
      stackCards(all('.aip-lesson'), { container: el('.aip-lessons'), refreshPriority: 1 });

      return () => secao.classList.remove('is-live');
    });

    mm.add('(max-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      playOnEnter(el('.aip-stages'), revealStack(all('.aip-stage'), { delayStep: 90 }));
    });
  });

  return (
    <div className="aip" ref={root}>
      {/* ---------------------------------------------------------------- */}
      <section className="aip-hero" data-build-step="ia.jsx">
        <div className="build-grid" aria-hidden="true">
          <span style={{ left: '8%' }} />
          <span style={{ left: '50%' }} />
          <span style={{ left: '92%' }} />
        </div>

        <div className="shell">
          <div className="part">
            <Frame tag={hero.tag} />
            <h1 className="aip-hero-title display" data-build-headline>
              <Titulo texto={hero.title} />
            </h1>
          </div>

          <div className="part aip-hero-foot">
            <Frame tag="section · intro" />
            <p className="lede">{hero.intro}</p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="aip-pipeline" data-build-step="pipeline.jsx">
        <div className="shell">
          <div className="part aip-head">
            <Frame tag={pipeline.tag} />
            <h2 className="section-title">
              <Titulo texto={pipeline.title} />
            </h2>
          </div>

          <div className="aip-track">
            <div className="aip-rail" aria-hidden="true">
              {/* Sem vector-effect: esticado só na horizontal, o traço mantém a
                  espessura, e o DrawSVG precisa medir o comprimento do path —
                  com non-scaling-stroke o navegador se recusa a medir. */}
              <svg className="aip-rail-svg" viewBox="0 0 1000 14" preserveAspectRatio="none">
                <path className="aip-rail-track" d="M0 7 H 1000" fill="none" />
                <path className="aip-rail-live" d="M0 7 H 1000" fill="none" />
              </svg>
              <span className="aip-token">
                <span className="aip-token-core" />
                <span className="aip-token-pr">{pipeline.delivered}</span>
              </span>
            </div>

            <ol className="aip-stages">
              {aiStages.map((etapa, indice) => (
                <li className="aip-stage" key={etapa.n}>
                  <span className="aip-stage-dot" aria-hidden="true">
                    <span className="aip-stage-fill" />
                  </span>
                  <span className="aip-stage-n">{etapa.n}</span>
                  <h3 className="aip-stage-label">{etapa.label}</h3>
                  {indice === REVISAO && (
                    <span className="aip-rejected" aria-hidden="true">
                      {pipeline.rejected}
                    </span>
                  )}
                  <p className="aip-stage-principle">{etapa.principle}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <Grade className="aip-rules" step="regras.jsx" secao={rules} itens={aiRules} />
      <Grade className="aip-loop" step="circuito.jsx" secao={humanLoop} itens={aiHumanLoop} />
      <Grade className="aip-memory" step="memoria.jsx" secao={memory} itens={aiMemory} />

      {/* ---------------------------------------------------------------- */}
      <section className="aip-lessons-section" data-build-step="licoes.jsx">
        <div className="shell">
          <div className="part aip-head">
            <Frame tag={lessons.tag} />
            <h2 className="section-title">
              <Titulo texto={lessons.title} />
            </h2>
          </div>
        </div>

        <div className="shell aip-lessons">
          {aiLessons.map((licao, indice) => (
            <article className="aip-lesson" key={licao.title}>
              <span className="aip-lesson-n">{String(indice + 1).padStart(2, '0')}</span>
              <h3 className="aip-lesson-title">{licao.title}</h3>
              <p className="aip-lesson-text">{licao.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="aip-closing" data-build-step="contato.jsx">
        <div className="shell">
          <div className="part aip-head">
            <Frame tag={closing.tag} />
            <h2 className="section-title">
              <Titulo texto={closing.title} />
            </h2>
          </div>

          <p className="lede aip-closing-text">{closing.text}</p>

          <div className="aip-closing-row">
            <a href={`mailto:${profile.email}`} className="btn btn-solid">
              {closing.email}
            </a>
            <Link to="/#contact" className="btn btn-line">
              {closing.more}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AiPage;

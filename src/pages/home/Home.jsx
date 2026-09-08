import React from 'react';
import { Link } from 'react-router-dom';
import Marquee from '../../components/Marquee/Marquee';
import Frame from '../../components/Frame/Frame';
import Manifesto from '../../components/Manifesto/Manifesto';
import AiSection from '../../components/AiSection/AiSection';
import HeroBackdrop from '../../components/HeroBackdrop/HeroBackdrop';
import ProjectWheel from '../../components/ProjectWheel/ProjectWheel';
import {
  useGsapScope,
  buildIntro,
  buildOnScroll,
  revealStack,
  playOnEnter,
  horizontalTrack,
  enterFromTrack,
  driftInTrack,
  stackCards,
  countTo,
  drawOnScroll,
  gsap,
  ScrollTrigger,
} from '../../lib/motion';
import { featuredProjects, secondaryProjects } from '../../data/projects';
import { profile, getYearsOfExperience } from '../../data/profile';
import { homeSkillGroups } from '../../data/skills';
import './Home.css';

const processSteps = [
  {
    n: '01',
    label: 'Discovery',
    title: 'Entender o problema',
    text: 'Conversa, leitura, pesquisa. Mapeio requisitos, restrições e o público antes de escrever uma linha.',
  },
  {
    n: '02',
    label: 'Architecture',
    title: 'Desenhar a estrutura',
    text: 'Defino stack, camadas, contratos de API e modelos de dados. Documentação curta, decisões claras.',
  },
  {
    n: '03',
    label: 'Build',
    title: 'Construir com ritmo',
    text: 'Componentização, testes onde importam, commits pequenos. Iteração rápida em features.',
  },
  {
    n: '04',
    label: 'Polish',
    title: 'Refinar até brilhar',
    text: 'Motion, micro-interações, performance, acessibilidade. O detalhe é onde mora a diferença.',
  },
];

const Home = () => {
  const anosDeExperiencia = getYearsOfExperience();
  const totalProjetos = featuredProjects.length + secondaryProjects.length;

  const root = useGsapScope((self) => {
    const el = (selector) => self.selector(selector)[0];
    const all = (selector) => self.selector(selector);

    buildIntro(el('.hero'));

    all('[data-build-step]').forEach((section) => {
      if (!section.classList.contains('hero')) buildOnScroll(section);
    });

    playOnEnter(el('.about-grid'), revealStack(all('.skill-line'), { delayStep: 55 }));
    playOnEnter(el('.contact-list'), revealStack(all('.contact-row'), { delayStep: 80 }));

    // Os números do balanço sobem quando o bloco entra.
    all('[data-count]').forEach((node) =>
      countTo(node, Number(node.dataset.count), el('.hero-ledger'))
    );

    drawOnScroll(el('.about-underline path'), el('.about-lead'));

    // O fio do fluxo de IA se desenha, e cada etapa acende quando ele chega.
    drawOnScroll(el('.ai-flow-live'), el('.ai-flow'));
    playOnEnter(el('.ai-grid'), revealStack(all('.ai-item'), { delayStep: 60 }));

    const etapas = all('.ai-flow-step');
    etapas.forEach((etapa, index) => {
      ScrollTrigger.create({
        trigger: el('.ai-flow'),
        start: `top ${72 - index * 4}%`,
        once: true,
        onEnter: () => etapa.classList.add('is-on'),
      });
    });

    /* Prender e arrastar só faz sentido onde há tela larga e ponteiro fino.
       No toque, os mesmos blocos existem empilhados e sem pin. */
    const mm = gsap.matchMedia();

    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      /* As placas do herói sobem em ritmos diferentes: é o que separa elas do
         fundo e evita que leiam como um adesivo colado atrás do título. */
      all('.hero-plate').forEach((plate) => {
        const depth = Number(plate.dataset.depth) || 1;
        gsap.to(plate, {
          yPercent: -9 * depth,
          ease: 'none',
          scrollTrigger: {
            trigger: el('.hero'),
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      /* Prioridades em ordem de página: manifesto (3) mede antes do processo
         (2), que mede antes da roda (1). Fora dessa ordem os pins leem
         posições que os de cima ainda vão mudar, e as seções se sobrepõem. */
      const manifesto = horizontalTrack(el('.manifesto'), el('.manifesto-track'), {
        refreshPriority: 3,
      });

      all('.manifesto-chip').forEach((chip) => {
        const tilt = parseFloat(getComputedStyle(chip).getPropertyValue('--tilt')) || 0;
        enterFromTrack(chip, manifesto, { rotate: tilt });
      });

      all('.manifesto-prop').forEach((prop, index) =>
        driftInTrack(prop, manifesto, 30 + index * 18)
      );

      /* As placas do manifesto sobem devagar durante o pin: a imagem continua
         viva enquanto a frase atravessa, em vez de ficar parada no fundo. */
      all('.manifesto-plate').forEach((plate) => {
        const depth = Number(plate.dataset.depth) || 1;
        gsap.to(plate, {
          yPercent: -6 * depth,
          ease: 'none',
          scrollTrigger: {
            trigger: el('.manifesto'),
            start: 'top top',
            end: () => manifesto.scrollTrigger.end,
            scrub: 0.8,
          },
        });
      });

      /* Os adereços soltos ficam fora do trilho, então seguem a rolagem do
         próprio pin — cada um numa direção e num ritmo. */
      all('.manifesto-float').forEach((node, index) => {
        const sobe = index % 2 === 0;
        gsap.fromTo(
          node,
          { yPercent: sobe ? 70 : -70, rotate: sobe ? -35 : 25, opacity: 0 },
          {
            yPercent: sobe ? -70 : 70,
            rotate: sobe ? 35 : -25,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el('.manifesto'),
              start: 'top top',
              end: () => manifesto.scrollTrigger.end,
              scrub: 0.6,
            },
          }
        );
      });

      stackCards(all('.process-card'), {
        container: el('.process-stack'),
        refreshPriority: 2,
      });

    });
  });


  return (
    <div className="home" ref={root}>
      {/* ---------------------------------------------------------------- */}
      <section className="hero" data-build-step="hero.jsx">
        <HeroBackdrop />

        <div className="build-grid" aria-hidden="true">
          <span style={{ left: '8%' }} data-parallax="0.3" />
          <span style={{ left: '28%' }} data-parallax="0.24" />
          <span style={{ left: '50%' }} data-parallax="0.18" />
          <span style={{ left: '72%' }} data-parallax="0.24" />
          <span style={{ left: '92%' }} data-parallax="0.3" />
        </div>

        <div className="shell hero-shell">
          <div className="part hero-title-part">
            <Frame tag="h1 · hero" />
            {/* O espaço antes do <br> é obrigatório: em telas estreitas a
                quebra é escondida, e sem ele as palavras colam. */}
            {/* Negativo: o título anda contra o cursor, e é essa oposição
                que o coloca na frente das placas. */}
            <h1
              className="hero-headline display"
              data-build-headline
              data-parallax="-0.2"
            >
              Construo software{' '}
              <br />
              inteiro, <em>peça a peça</em>.
            </h1>
          </div>

          <div className="part hero-intro-part">
            <Frame tag="section · intro" />
            <p className="lede">
              {profile.bio} Do modelo de dados à última micro-interação — front,
              back e o banco que sustenta os dois.
            </p>

            <dl className="hero-ledger">
              <div>
                <dt>Base</dt>
                <dd>{profile.location}</dd>
              </div>
              {/* O valor já sai preenchido com zero à esquerda para que o
                  número nasça com a largura final, mesmo antes da contagem
                  e mesmo se o JS não rodar. */}
              <div>
                <dt>Anos</dt>
                <dd>
                  <span data-count={anosDeExperiencia}>
                    {String(anosDeExperiencia).padStart(2, '0')}
                  </span>
                </dd>
              </div>
              <div>
                <dt>Projetos</dt>
                <dd>
                  <span data-count={totalProjetos}>
                    {String(totalProjetos).padStart(2, '0')}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="part hero-cta-part">
            <Frame tag="nav · cta" />
            <Link to="/#projects" className="btn btn-solid">
              Ver o trabalho
            </Link>
            <Link to="/#contact" className="btn btn-line">
              Falar comigo
            </Link>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          'React',
          'TypeScript',
          'C# / .NET',
          'Node.js',
          'CSS Architecture',
          'Motion Design',
          'UI Systems',
          'Disponível para freelas',
        ]}
        speed={46}
      />

      {/* ---------------------------------------------------------------- */}
      <Manifesto />

      {/* ---------------------------------------------------------------- */}
      <section id="about" className="about" data-build-step="about.jsx">
        <div className="shell about-grid">
          <div className="part about-lead">
            <Frame tag="h2 · about" />
            <h2 className="section-title">
              Código, design e <em>narrativa visual</em> na mesma mesa.
            </h2>

            <svg
              className="about-underline"
              viewBox="0 0 400 12"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M2 8 C 90 2, 150 11, 240 5 S 350 2, 398 7" fill="none" />
            </svg>

            <div className="prose">
              <p>
                Sou um desenvolvedor apaixonado por criar soluções digitais que fazem a
                diferença. Tenho experiência em desenvolvimento full-stack, sempre buscando
                aprender novas tecnologias e aplicar as melhores práticas em cada projeto.
              </p>
              <p>
                Tenho uma forte paixão por aprender e encarar desafios — principalmente
                quando se trata de soluções criativas. Além do desenvolvimento de software,
                tenho habilidades em modelagem 3D, análise CFD, impressão 3D, corte a laser
                e manutenção de hardware.
              </p>
            </div>

            <Link to="/about" className="link">
              <span>Trajetória completa</span>
              <span className="link-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          <div className="part about-skills">
            <Frame tag="ul · stack" />
            {homeSkillGroups.map((group) => (
              <div className="skill-line" key={group.label}>
                <h3 className="skill-line-label">{group.label}</h3>
                <p className="skill-line-items">{group.items.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="process" data-build-step="process.jsx">
        <div className="shell">
          <div className="part process-head">
            <Frame tag="h2 · process" />
            <h2 className="section-title">
              Como eu trabalho, em <em>quatro movimentos</em>.
            </h2>
          </div>
        </div>

        <div className="shell process-stack">
          {processSteps.map((step) => (
            <article className="process-card" key={step.n}>
              <header className="process-card-head">
                <span className="process-card-n">{step.n}</span>
                <span className="process-card-label">{step.label}</span>
              </header>
              <h3 className="process-card-title">{step.title}</h3>
              <p className="process-card-text">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <AiSection />

      {/* ---------------------------------------------------------------- */}
      <ProjectWheel />

      {/* ---------------------------------------------------------------- */}
      <section className="index-more-section" data-build-step="repos.jsx">
        <div className="shell index-more">
          <h3 className="index-more-label">Outros repositórios</h3>
          <ul>
            {secondaryProjects.map((project) => (
              <li key={project.id}>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="index-more-link"
                >
                  <span>{project.title}</span>
                  <span className="index-more-tech">{project.tech.join(' · ')}</span>
                  <span className="link-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="contact" className="contact" data-build-step="contact.jsx">
        {/* O monograma como marca-d'água: é a seção com menos matéria na
            página, e um símbolo grande e apagado sustenta o vazio melhor
            que mais texto. */}
        {/* O quadrado de 512 em vez do original de 630KB: mesmo desenho, e
            aqui ele nunca é exibido maior que isso. */}
        <img
          className="contact-mark"
          src="/favicon-512.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          width="512"
          height="512"
          data-parallax="0.8"
        />

        <div className="shell">
          <div className="part contact-head">
            <Frame tag="h2 · contact" />
            <h2 className="section-title contact-title">
              Vamos criar algo <em>memorável</em> juntos.
            </h2>
          </div>

          <ul className="contact-list">
            <li className="contact-row">
              <a href={`mailto:${profile.email}`} className="contact-link">
                <span className="contact-kind">Email</span>
                <span className="contact-value">{profile.email}</span>
                <span className="link-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </li>
            <li className="contact-row">
              <a
                href={profile.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-kind">LinkedIn</span>
                <span className="contact-value">{profile.linkedin.label}</span>
                <span className="link-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
            <li className="contact-row">
              <a
                href={profile.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-kind">GitHub</span>
                <span className="contact-value">{profile.github.label}</span>
                <span className="link-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <footer className="colophon">
        <div className="shell colophon-inner">
          <p className="colophon-name">{profile.name}</p>
          <p className="colophon-meta">
            {profile.role} · {anosDeExperiencia} anos · {profile.location}
          </p>
          <p className="colophon-year">© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Marquee from '../../components/Marquee/Marquee';
import Frame from '../../components/Frame/Frame';
import Manifesto from '../../components/Manifesto/Manifesto';
import {
  useGsapScope,
  buildIntro,
  buildOnScroll,
  revealStack,
  playOnEnter,
  scrambleTo,
  horizontalTrack,
  enterFromTrack,
  driftInTrack,
  stackCards,
  countTo,
  drawOnScroll,
  gsap,
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
  const roleRefs = useRef({});
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

    /* Prender e arrastar só faz sentido onde há tela larga e ponteiro fino.
       No toque, os mesmos blocos existem empilhados e sem pin. */
    const mm = gsap.matchMedia();

    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const manifesto = horizontalTrack(el('.manifesto'), el('.manifesto-track'));

      all('.manifesto-chip').forEach((chip) => {
        const tilt = parseFloat(getComputedStyle(chip).getPropertyValue('--tilt')) || 0;
        enterFromTrack(chip, manifesto, { rotate: tilt });
      });

      all('.manifesto-prop').forEach((prop, index) =>
        driftInTrack(prop, manifesto, 30 + index * 18)
      );

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

      const work = horizontalTrack(el('.work'), el('.work-track'), { scrub: 0.6 });

      all('.work-card').forEach((card) =>
        enterFromTrack(card, work, {
          from: { scale: 0.86, opacity: 0.25, rotate: 0 },
          to: { scale: 1, opacity: 1 },
        })
      );

      stackCards(all('.process-card'));
    });
  });

  const handleEnter = (project) => {
    scrambleTo(roleRefs.current[project.id], project.role);
  };

  return (
    <div className="home" ref={root}>
      {/* ---------------------------------------------------------------- */}
      <section className="hero" data-build-step="hero.jsx">
        <div className="build-grid" aria-hidden="true">
          <span style={{ left: '8%' }} />
          <span style={{ left: '28%' }} />
          <span style={{ left: '50%' }} />
          <span style={{ left: '72%' }} />
          <span style={{ left: '92%' }} />
        </div>

        <div className="shell hero-shell">
          <div className="part hero-title-part">
            <Frame tag="h1 · hero" />
            {/* O espaço antes do <br> é obrigatório: em telas estreitas a
                quebra é escondida, e sem ele as palavras colam. */}
            <h1 className="hero-headline display" data-build-headline>
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
              <div>
                <dt>Anos</dt>
                <dd>
                  <span data-count={anosDeExperiencia}>{anosDeExperiencia}</span>
                </dd>
              </div>
              <div>
                <dt>Projetos</dt>
                <dd>
                  <span data-count={totalProjetos}>{totalProjetos}</span>
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
      <section id="projects" className="work" data-build-step="projects.jsx">
        <div className="work-head shell">
          <h2 className="section-title">
            Trabalho <em>selecionado</em>
          </h2>
          <p className="work-hint">
            <span className="work-hint-line" aria-hidden="true" />
            Role para atravessar
          </p>
        </div>

        <div className="work-track">
          {featuredProjects.map((project) => (
            <article
              className="work-card"
              key={project.id}
              onMouseEnter={() => handleEnter(project)}
            >
              <Link
                to={`/projects/${project.slug}`}
                className="work-card-link"
                onFocus={() => handleEnter(project)}
              >
                <figure className="work-card-cover">
                  {project.cover ? (
                    <img src={project.cover} alt="" loading="lazy" />
                  ) : (
                    <span className="work-card-blank" aria-hidden="true">
                      {project.id}
                    </span>
                  )}
                  <span className="work-card-index">{project.id}</span>
                </figure>

                <div className="work-card-body">
                  <h3 className="work-card-title">{project.title}</h3>
                  <p
                    className="work-card-role"
                    ref={(node) => {
                      roleRefs.current[project.id] = node;
                    }}
                  >
                    {project.role}
                  </p>
                  <p className="work-card-tech">{project.tech.join(' · ')}</p>
                  <span className="work-card-foot">
                    <span>{project.year}</span>
                    <span className="work-card-arrow" aria-hidden="true">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

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

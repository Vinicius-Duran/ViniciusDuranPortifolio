import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Marquee from '../../components/Marquee/Marquee';
import Frame from '../../components/Frame/Frame';
import {
  useGsapScope,
  buildIntro,
  buildOnScroll,
  revealStack,
  playOnEnter,
  scrambleTo,
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
  const [activeProject, setActiveProject] = useState(featuredProjects[0]?.id ?? null);
  const [isBrowsing, setIsBrowsing] = useState(false);
  const roleRefs = useRef({});
  const anosDeExperiencia = getYearsOfExperience();

  const root = useGsapScope((self) => {
    const el = (selector) => self.selector(selector)[0];
    const all = (selector) => self.selector(selector);

    // A abertura: a única vez que a montagem roda por inteiro e devagar.
    buildIntro(el('.hero'));

    // As seções chegam montando, mais rápido.
    all('[data-build-step]').forEach((section) => {
      if (!section.classList.contains('hero')) buildOnScroll(section);
    });

    // Listas longas entram por stagger, que é mais leve que montar item a item.
    playOnEnter(el('.index-list'), revealStack(all('.index-row'), { delayStep: 70 }));
    playOnEnter(el('.contact-list'), revealStack(all('.contact-row'), { delayStep: 80 }));
  });

  const handleEnter = (project) => {
    setIsBrowsing(true);
    if (project.id === activeProject) return;
    setActiveProject(project.id);
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
                <dt>Desde</dt>
                <dd>{profile.careerStartYear}</dd>
              </div>
              <div>
                <dt>Projetos</dt>
                <dd>{featuredProjects.length + secondaryProjects.length}</dd>
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
      <section id="about" className="about" data-build-step="about.jsx">
        <div className="shell about-grid">
          <div className="part about-lead">
            <Frame tag="h2 · about" />
            <h2 className="section-title">
              Código, design e <em>narrativa visual</em> na mesma mesa.
            </h2>

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

          <ol className="process-list">
            {processSteps.map((step) => (
              <li className="part process-step" key={step.n}>
                <Frame tag={`step · ${step.n}`} />
                <span className="process-step-n">{step.n}</span>
                <div className="process-step-body">
                  <h3 className="process-step-title">{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                <span className="process-step-label">{step.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section id="projects" className="index" data-build-step="projects.jsx">
        <div className="shell">
          <div className="part index-head">
            <Frame tag="h2 · work" />
            <h2 className="section-title">
              Trabalho <em>selecionado</em>
            </h2>
          </div>

          <div className="index-body">
            <ul
              className={`index-list ${isBrowsing ? 'is-focused' : ''}`}
              onMouseLeave={() => setIsBrowsing(false)}
            >
              {featuredProjects.map((project) => (
                <li
                  key={project.id}
                  className="index-row"
                  data-active={
                    isBrowsing && activeProject === project.id ? 'true' : undefined
                  }
                  onMouseEnter={() => handleEnter(project)}
                >
                  <Link
                    to={`/projects/${project.slug}`}
                    className="index-link"
                    onFocus={() => handleEnter(project)}
                    onBlur={() => setIsBrowsing(false)}
                  >
                    <span className="index-n">{project.id}</span>

                    <span className="index-main">
                      <span className="index-title">{project.title}</span>
                      <span
                        className="index-role"
                        ref={(node) => {
                          roleRefs.current[project.id] = node;
                        }}
                      >
                        {project.role}
                      </span>
                    </span>

                    <span className="index-tech">{project.tech.join(' · ')}</span>
                    <span className="index-year">{project.year}</span>
                    <span className="index-arrow" aria-hidden="true">
                      →
                    </span>

                    <span className="index-inline-cover" aria-hidden="true">
                      {project.cover ? (
                        <img src={project.cover} alt="" loading="lazy" />
                      ) : (
                        <span className="index-cover-blank">{project.title}</span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="index-preview" aria-hidden="true">
              {featuredProjects.map((project) => (
                <figure
                  key={project.id}
                  className="index-preview-frame"
                  data-active={activeProject === project.id ? 'true' : undefined}
                >
                  {project.cover ? (
                    <img src={project.cover} alt="" loading="lazy" />
                  ) : (
                    <span className="index-cover-blank">{project.title}</span>
                  )}
                </figure>
              ))}
            </div>
          </div>

          <div className="index-more">
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

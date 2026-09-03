import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Marquee from '../../components/Marquee/Marquee';
import { useReveal, useRevealMany } from '../../hooks/useReveal';
import { featuredProjects, secondaryProjects } from '../../data/projects';
import { profile } from '../../data/profile';
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
  const heroRef = useReveal({ threshold: 0.15 });
  const aboutRef = useReveal();
  const processRef = useReveal();
  const projectsHeaderRef = useReveal();
  const projectsSecondaryRef = useReveal();
  const projectsFootRef = useReveal();
  const contactRef = useReveal();
  const setSkillRef = useRevealMany(homeSkillGroups.length);
  const setProcessRef = useRevealMany(processSteps.length);
  const setProjectRef = useRevealMany(featuredProjects.length, { threshold: 0.12 });

  const [activeProject, setActiveProject] = useState(null);
  const [now, setNow] = useState('');
  const heroTitleRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      const date = new Date();
      const time = date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'America/Sao_Paulo',
      });
      setNow(time);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (event, target) => {
    event.preventDefault();
    const node = document.querySelector(target);
    if (node) node.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home">
      <section className="hero" ref={heroRef}>
        <div className="shell hero-shell">
          <div className="hero-meta reveal">
            <span className="eyebrow">Portfolio · 2026</span>
            <span className="hero-coords mono">
              <span>BR · 27.6° S</span>
              <span className="dot" aria-hidden="true">·</span>
              <span>48.5° W</span>
            </span>
          </div>

          <div className="hero-grid">
            <div className="hero-left">
              <h1 className="hero-title display reveal delay-1" ref={heroTitleRef}>
                <span className="hero-line">Vinicius</span>
                <span className="hero-line hero-line--accent">
                  <span className="hero-line-text">Duran</span>
                  <span className="hero-line-bar" aria-hidden="true" />
                </span>
                <span className="hero-line hero-line--soft">
                  <em>Building</em> digital experiences
                </span>
              </h1>
            </div>

            <aside className="hero-panel reveal-right delay-2">
              <div className="hero-panel-head">
                <span className="hero-panel-dot" aria-hidden="true" />
                <span className="hero-panel-label mono">SYS · STATUS</span>
                <span className="hero-panel-id mono">001</span>
              </div>

              <div className="hero-panel-rows">
                <div className="hero-panel-row">
                  <span className="hero-panel-key mono">LOCAL</span>
                  <span className="hero-panel-value">Florianópolis · BR</span>
                </div>
                <div className="hero-panel-row">
                  <span className="hero-panel-key mono">ROLE</span>
                  <span className="hero-panel-value">Full-Stack Developer</span>
                </div>
                <div className="hero-panel-row">
                  <span className="hero-panel-key mono">FOCUS</span>
                  <span className="hero-panel-value">UI Systems · Motion · .NET</span>
                </div>
                <div className="hero-panel-row">
                  <span className="hero-panel-key mono">CLOCK</span>
                  <span className="hero-panel-value">{now} BRT</span>
                </div>
              </div>

              <div className="hero-panel-bars">
                <div className="hero-panel-bar">
                  <span className="hero-panel-bar-label mono">FRONTEND</span>
                  <span className="hero-panel-bar-track">
                    <span className="hero-panel-bar-fill" style={{ width: '92%' }} />
                  </span>
                  <span className="hero-panel-bar-value mono">92</span>
                </div>
                <div className="hero-panel-bar">
                  <span className="hero-panel-bar-label mono">BACKEND</span>
                  <span className="hero-panel-bar-track">
                    <span className="hero-panel-bar-fill alt" style={{ width: '78%' }} />
                  </span>
                  <span className="hero-panel-bar-value mono">78</span>
                </div>
                <div className="hero-panel-bar">
                  <span className="hero-panel-bar-label mono">MOTION</span>
                  <span className="hero-panel-bar-track">
                    <span className="hero-panel-bar-fill alt2" style={{ width: '70%' }} />
                  </span>
                  <span className="hero-panel-bar-value mono">70</span>
                </div>
              </div>

              <div className="hero-panel-foot">
                <span className="hero-panel-foot-dot" aria-hidden="true" />
                <span className="mono">Disponível para novos projetos</span>
              </div>
            </aside>
          </div>

          <div className="hero-bottom">
            <p className="hero-description reveal delay-3">
              Desenvolvedor full-stack focado em interfaces vivas e sistemas robustos.
              <br />
              Transformo ideias em produtos digitais com código limpo, motion e atenção
              obsessiva aos detalhes.
            </p>

            <div className="hero-actions reveal delay-4">
              <a
                href="#projects"
                className="cta cta-primary magnetic"
                onClick={(e) => scrollTo(e, '#projects')}
              >
                <span className="cta-label">Ver projetos</span>
                <span className="cta-arrow" aria-hidden="true">↗</span>
              </a>
              <a
                href="#contact"
                className="cta cta-ghost magnetic"
                onClick={(e) => scrollTo(e, '#contact')}
              >
                <span className="cta-label">Falar comigo</span>
              </a>
            </div>
          </div>

          <div className="hero-scroll reveal delay-5">
            <span className="hero-scroll-text mono">Scroll</span>
            <span className="hero-scroll-line" aria-hidden="true">
              <span className="hero-scroll-dot" />
            </span>
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
        speed={36}
      />

      <section id="about" className="about" ref={aboutRef}>
        <div className="shell about-shell">
          <div className="section-header reveal">
            <span className="section-index mono">#01 — sobre</span>
            <h2 className="section-title display">
              Construo na <em>interseção</em> entre código,
              design e <span className="text-accent">narrativa visual</span>.
            </h2>
          </div>

          <div className="about-grid">
            <div className="about-text reveal delay-1">
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

              <Link to="/about" className="link-ghost magnetic">
                <span>Trajetória completa</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="skills-stack">
              {homeSkillGroups.map((group, index) => (
                <div
                  key={group.label}
                  ref={setSkillRef(index)}
                  className={`skill-card reveal-right delay-${index + 1}`}
                >
                  <div className="skill-card-head">
                    <span className="skill-card-index mono">0{index + 1}</span>
                    <h3>{group.label}</h3>
                  </div>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="process" ref={processRef}>
        <div className="shell">
          <div className="section-header reveal">
            <span className="section-index mono">#02 — processo</span>
            <h2 className="section-title display">
              Como eu <em>trabalho</em>,
              <br />
              em <span className="text-accent">quatro movimentos</span>.
            </h2>
          </div>

          <div className="process-grid">
            {processSteps.map((step, index) => (
              <article
                key={step.n}
                ref={setProcessRef(index)}
                className={`process-step reveal delay-${index + 1}`}
              >
                <header className="process-step-head">
                  <span className="process-step-number mono">{step.n}</span>
                  <span className="process-step-label mono">{step.label}</span>
                </header>
                <h3 className="process-step-title display">{step.title}</h3>
                <p className="process-step-text">{step.text}</p>
                <span className="process-step-line" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="projects">
        <div className="shell projects-shell">
          <div className="section-header reveal" ref={projectsHeaderRef}>
            <span className="section-index mono">#03 — selected works</span>
            <h2 className="section-title display">
              Projetos <em>selecionados</em>
              <br />
              <span className="text-accent">2024 — 2026</span>
            </h2>
          </div>

          <ul
            className={`project-list ${activeProject ? 'is-hovering' : ''}`}
            onMouseLeave={() => setActiveProject(null)}
          >
            {featuredProjects.map((project, index) => (
              <li
                key={project.id}
                ref={setProjectRef(index)}
                className="project-row reveal"
                data-state={
                  activeProject === project.id
                    ? 'active'
                    : activeProject
                      ? 'dim'
                      : 'idle'
                }
                onMouseEnter={() => setActiveProject(project.id)}
                onFocus={() => setActiveProject(project.id)}
                onBlur={() => setActiveProject(null)}
              >
                <Link to={`/projects/${project.slug}`} className="project-link">
                  <span className="project-index mono">{project.id}</span>
                  <span className="project-main">
                    <span className="project-title display">{project.title}</span>
                    <span className="project-role">{project.role}</span>
                  </span>
                  <span className="project-tech-list">
                    {project.tech.map((t) => (
                      <span key={t} className="project-tech-pill">{t}</span>
                    ))}
                  </span>
                  <span className="project-year mono">{project.year}</span>
                  <span className="project-thumb" aria-hidden="true">
                    <span
                      className="project-thumb-inner"
                      style={{ background: project.accent }}
                    >
                      <span className="project-thumb-grid" />
                      <span className="project-thumb-noise" />
                      <span className="project-thumb-label mono">{project.id}</span>
                    </span>
                  </span>
                  <span className="project-arrow" aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="projects-secondary reveal delay-1" ref={projectsSecondaryRef}>
            <span className="projects-secondary-label mono">Outros repositórios</span>
            <ul className="projects-secondary-list">
              {secondaryProjects.map((project) => (
                <li key={project.id}>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="projects-secondary-link"
                  >
                    <span className="projects-secondary-name">{project.title}</span>
                    <span className="projects-secondary-tech mono">
                      {project.tech.join(' · ')}
                    </span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="projects-foot reveal delay-2" ref={projectsFootRef}>
            <span className="mono">
              {String(featuredProjects.length).padStart(2, '0')} projetos em destaque ·{' '}
              {String(secondaryProjects.length).padStart(2, '0')} outros
            </span>
            <Link to="/about" className="link-ghost magnetic">
              <span>Ver trajetória</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="contact" ref={contactRef}>
        <div className="shell contact-shell">
          <div className="section-header reveal">
            <span className="section-index mono">#04 — contato</span>
            <h2 className="section-title display">
              Vamos criar algo
              <br />
              <em className="text-accent">memorável</em> juntos.
            </h2>
          </div>

          <div className="contact-grid">
            <a
              href={`mailto:${profile.email}`}
              className="contact-card reveal delay-1 magnetic"
            >
              <span className="contact-card-index mono">01</span>
              <span className="contact-card-label">Email</span>
              <span className="contact-card-value">{profile.email}</span>
              <span className="contact-card-cta">
                <span>Enviar mensagem</span>
                <span aria-hidden="true">→</span>
              </span>
            </a>
            <a
              href={profile.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card reveal delay-2 magnetic"
            >
              <span className="contact-card-index mono">02</span>
              <span className="contact-card-label">LinkedIn</span>
              <span className="contact-card-value">{profile.linkedin.label}</span>
              <span className="contact-card-cta">
                <span>Conectar</span>
                <span aria-hidden="true">→</span>
              </span>
            </a>
            <a
              href={profile.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card reveal delay-3 magnetic"
            >
              <span className="contact-card-index mono">03</span>
              <span className="contact-card-label">GitHub</span>
              <span className="contact-card-value">{profile.github.label}</span>
              <span className="contact-card-cta">
                <span>Ver código</span>
                <span aria-hidden="true">→</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-shell">
          <div className="footer-row">
            <div className="footer-brand">
              <span className="footer-mark" aria-hidden="true" />
              <div>
                <strong>Vinícius Duran</strong>
                <span className="footer-tag mono">© {new Date().getFullYear()} — All rights reserved</span>
              </div>
            </div>
            <div className="footer-links">
              <a href={profile.github.url} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={profile.linkedin.url} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={`mailto:${profile.email}`}>Email</a>
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Topo ↑
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

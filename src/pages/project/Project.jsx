import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  useGsapScope,
  heroIntro,
  revealHeading,
  revealStack,
  playOnEnter,
  gsap,
  reducedMotion,
} from '../../lib/motion';
import { getProjectBySlug, getAdjacentProjects } from '../../data/projects';
import './Project.css';

const Project = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const exists = Boolean(project && project.featured);

  const root = useGsapScope(
    (self) => {
      if (!exists) return;

      const el = (selector) => self.selector(selector)[0];
      const all = (selector) => self.selector(selector);

      heroIntro(el('.case-hero'));

      all('.section-title').forEach(revealHeading);

      playOnEnter(el('.case-beats'), revealStack(all('.case-beat'), { delayStep: 110 }));
      playOnEnter(el('.case-stack'), revealStack(all('.case-stack-entry'), { delayStep: 60 }));

      /* A capa desliza mais devagar que a página enquanto rola: dá
         profundidade sem tirar a imagem do lugar. */
      const cover = el('.case-cover-image');
      if (cover && !reducedMotion()) {
        gsap.fromTo(
          cover,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: el('.case-cover'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    },
    [slug, exists]
  );

  if (!project || !project.featured) {
    return <Navigate to="/#projects" replace />;
  }

  const { prev, next } = getAdjacentProjects(slug);
  const stackEntries = Object.entries(project.techDetailed);
  const beats = [
    { n: '01', label: 'Desafio', body: project.challenge },
    { n: '02', label: 'Solução', body: project.solution },
    { n: '03', label: 'Resultado', body: project.outcome },
  ];

  return (
    <article className="case" ref={root}>
      {/* ---------------------------------------------------------------- */}
      <header className="case-hero">
        <div className="shell">
          <Link to="/#projects" className="link case-back">
            <span aria-hidden="true">←</span>
            <span>Todos os projetos</span>
          </Link>

          <h1 className="case-title display" data-hero-headline>
            {project.title}
          </h1>

          <span className="hero-rule" data-hero-rule aria-hidden="true" />

          <div className="case-hero-foot">
            <p className="lede" data-hero-fade>
              {project.tagline}
            </p>

            <dl className="case-record" data-hero-fade>
              <div>
                <dt>Cliente</dt>
                <dd>{project.client}</dd>
              </div>
              <div>
                <dt>Ano</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>Papel</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Escopo</dt>
                <dd>{project.duration}</dd>
              </div>
            </dl>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      {project.cover && (
        <div className="case-cover">
          <div className="shell">
            <figure className="case-cover-frame">
              <img
                className="case-cover-image"
                src={project.cover}
                alt={`${project.title} — captura da interface`}
              />
            </figure>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      <section className="case-overview">
        <div className="shell case-overview-grid">
          <h2 className="section-title">
            Sobre o <em>projeto</em>
          </h2>
          <div className="prose">
            <p>{project.longDescription || project.description}</p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="case-beats-section">
        <div className="shell">
          <ol className="case-beats">
            {beats.map((beat) => (
              <li className="case-beat" key={beat.n}>
                <span className="case-beat-n">{beat.n}</span>
                <h3 className="case-beat-label">{beat.label}</h3>
                <p className="case-beat-body">{beat.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {project.gallery.length > 0 && (
        <section className="case-gallery">
          <div className="shell">
            <h2 className="section-title">
              Imagens e <em>capturas</em>
            </h2>
            <div className="case-gallery-grid">
              {project.gallery.map((image, index) => (
                <figure key={image} className={index === 0 ? 'is-wide' : ''}>
                  <img src={image} alt={`${project.title} — captura ${index + 1}`} />
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      <section className="case-stack-section">
        <div className="shell">
          <h2 className="section-title">
            Stack <em>técnica</em>
          </h2>

          <div className="case-stack">
            {stackEntries.map(([category, items]) => (
              <div className="case-stack-entry" key={category}>
                <h3 className="case-stack-label">{category}</h3>
                <ul>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="case-links">
        <div className="shell">
          <h2 className="section-title">
            Quer ver de <em>perto</em>?
          </h2>
          <p className="lede case-links-lede">
            Explore o código fonte para entender as decisões técnicas tomadas durante o
            desenvolvimento.
          </p>
          <div className="case-links-row">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${link.kind === 'primary' ? 'btn-solid' : 'btn-line'}`}
              >
                <span>{link.label}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <nav className="case-next" aria-label="Outros projetos">
        <div className="shell case-next-row">
          {prev && (
            <Link to={`/projects/${prev.slug}`} className="case-next-link is-prev">
              <span className="case-next-dir">← Anterior</span>
              <span className="case-next-title">{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link to={`/projects/${next.slug}`} className="case-next-link is-next">
              <span className="case-next-dir">Próximo →</span>
              <span className="case-next-title">{next.title}</span>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
};

export default Project;

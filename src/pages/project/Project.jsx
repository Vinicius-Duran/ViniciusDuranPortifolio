import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import Frame from '../../components/Frame/Frame';
import {
  useGsapScope,
  buildIntro,
  buildOnScroll,
  revealStack,
  playOnEnter,
  parallax,
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

      buildIntro(el('.case-hero'));

      all('[data-build-step]').forEach((section) => {
        if (!section.classList.contains('case-hero')) buildOnScroll(section);
      });

      playOnEnter(el('.case-beats'), revealStack(all('.case-beat'), { delayStep: 110 }));
      playOnEnter(el('.case-stack'), revealStack(all('.case-stack-entry'), { delayStep: 60 }));

      /* A capa desliza mais devagar que a página enquanto rola: dá
         profundidade sem tirar a imagem do lugar. */
      parallax(el('.case-cover-image'), el('.case-cover'));
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
      <header className="case-hero" data-build-step={`${project.slug}.jsx`}>
        <div className="shell">
          <Link to="/#projects" className="link case-back">
            <span aria-hidden="true">←</span>
            <span>Todos os projetos</span>
          </Link>

          <div className="part">
            <Frame tag="h1 · case" />
            <h1 className="case-title display" data-build-headline>
              {project.title}
            </h1>
          </div>

          <div className="part case-hero-foot">
            <Frame tag="section · record" />
            <p className="lede">{project.tagline}</p>

            <dl className="case-record">
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
      <section className="case-overview" data-build-step="overview.jsx">
        <div className="shell case-overview-grid">
          <div className="part">
            <Frame tag="h2 · overview" />
            <h2 className="section-title">
              Sobre o <em>projeto</em>
            </h2>
          </div>
          <div className="prose">
            <p>{project.longDescription || project.description}</p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="case-beats-section" data-build-step="story.jsx">
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
      <section className="case-stack-section" data-build-step="stack.jsx">
        <div className="shell">
          <div className="part">
            <Frame tag="h2 · stack" />
            <h2 className="section-title">
              Stack <em>técnica</em>
            </h2>
          </div>

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
      <section className="case-links" data-build-step="links.jsx">
        <div className="shell">
          <div className="part">
            <Frame tag="h2 · links" />
            <h2 className="section-title">
              Quer ver de <em>perto</em>?
            </h2>
          </div>
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

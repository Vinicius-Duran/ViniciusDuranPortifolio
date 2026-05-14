import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useReveal, useRevealMany } from '../../hooks/useReveal';
import { getProjectBySlug, getAdjacentProjects } from '../../data/projects';
import './Project.css';

const Project = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  const heroRef = useReveal({ threshold: 0.15 });
  const overviewRef = useReveal();
  const galleryRef = useReveal();
  const stackRef = useReveal();
  const storyRef = useReveal();
  const nextRef = useReveal();
  const setGalleryRef = useRevealMany(project ? project.gallery.length : 0);
  const setStackRef = useRevealMany(project ? Object.keys(project.techDetailed).length : 0);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const { prev, next } = getAdjacentProjects(slug);
  const stackEntries = Object.entries(project.techDetailed);

  return (
    <div className="project-page">
      <section className="project-hero" ref={heroRef}>
        <div className="shell">
          <Link to="/#projects" className="project-back reveal magnetic">
            <span aria-hidden="true">←</span>
            <span>Voltar para projetos</span>
          </Link>

          <div className="project-hero-meta reveal delay-1">
            <span className="eyebrow">Project · {project.id}</span>
            <span className="mono project-hero-status">
              <span className="project-hero-status-dot" aria-hidden="true" />
              {project.status}
            </span>
          </div>

          <h1 className="project-hero-title display reveal delay-2">
            {project.title}
          </h1>

          <p className="project-hero-tagline reveal delay-3">{project.tagline}</p>

          <div className="project-hero-data reveal delay-4">
            <div>
              <span className="project-hero-data-key mono">CLIENT</span>
              <span className="project-hero-data-value">{project.client}</span>
            </div>
            <div>
              <span className="project-hero-data-key mono">YEAR</span>
              <span className="project-hero-data-value">{project.year}</span>
            </div>
            <div>
              <span className="project-hero-data-key mono">ROLE</span>
              <span className="project-hero-data-value">{project.role}</span>
            </div>
            <div>
              <span className="project-hero-data-key mono">DURATION</span>
              <span className="project-hero-data-value">{project.duration}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="project-cover reveal-scale">
        <div className="shell">
          <div className="project-cover-frame">
            {project.cover ? (
              <img src={project.cover} alt={project.title} />
            ) : (
              <div
                className="project-cover-placeholder"
                style={{ background: project.accent }}
              >
                <span className="project-cover-grid" aria-hidden="true" />
                <span className="project-cover-noise" aria-hidden="true" />
                <div className="project-cover-info">
                  <span className="mono project-cover-info-id">{project.id} · COVER</span>
                  <span className="project-cover-info-text">
                    Espaço para o cover do projeto
                    <br />
                    <span className="mono">substitua project.cover em src/data/projects.js</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="project-overview" ref={overviewRef}>
        <div className="shell">
          <div className="project-overview-grid">
            <div className="reveal">
              <span className="section-index mono">#01 — overview</span>
              <h2 className="project-section-title display">
                Sobre o <em>projeto</em>
              </h2>
            </div>

            <div className="project-overview-body reveal delay-1">
              <p className="project-overview-lead">
                {project.longDescription || project.description}
              </p>
              <p className="project-placeholder-note mono">
                [ ESPAÇO PARA TEXTO MAIS LONGO — edite longDescription em src/data/projects.js ]
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="project-story" ref={storyRef}>
        <div className="shell">
          <div className="project-story-grid">
            <article className="project-story-card reveal">
              <header>
                <span className="project-story-index mono">01 · Desafio</span>
                <h3 className="display">O que precisava ser resolvido</h3>
              </header>
              <p>
                {project.challenge || 'Descreva aqui o problema central, restrições e contexto que motivaram o projeto.'}
              </p>
            </article>

            <article className="project-story-card reveal delay-1">
              <header>
                <span className="project-story-index mono">02 · Solução</span>
                <h3 className="display">A abordagem escolhida</h3>
              </header>
              <p>
                {project.solution || 'Explique a abordagem técnica, decisões de arquitetura e por que essa solução foi a escolhida.'}
              </p>
            </article>

            <article className="project-story-card reveal delay-2">
              <header>
                <span className="project-story-index mono">03 · Resultado</span>
                <h3 className="display">Impacto e aprendizados</h3>
              </header>
              <p>
                {project.outcome || 'Conte os resultados, números, feedback e principais aprendizados levados para os próximos projetos.'}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="project-gallery" ref={galleryRef}>
        <div className="shell">
          <div className="section-header reveal">
            <span className="section-index mono">#02 — gallery</span>
            <h2 className="project-section-title display">
              Imagens e <em>capturas</em>
            </h2>
          </div>

          <div className="project-gallery-grid">
            {project.gallery.map((image, index) => (
              <div
                key={index}
                ref={setGalleryRef(index)}
                className={`project-gallery-item reveal delay-${(index % 4) + 1} ${index === 0 ? 'is-wide' : ''}`}
              >
                {image ? (
                  <img src={image} alt={`${project.title} — capture ${index + 1}`} />
                ) : (
                  <div
                    className="project-gallery-placeholder"
                    style={{ background: project.accent }}
                  >
                    <span className="project-cover-grid" aria-hidden="true" />
                    <span className="project-cover-noise" aria-hidden="true" />
                    <span className="project-gallery-label mono">
                      {String(index + 1).padStart(2, '0')} · imagem
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="project-stack" ref={stackRef}>
        <div className="shell">
          <div className="section-header reveal">
            <span className="section-index mono">#03 — stack</span>
            <h2 className="project-section-title display">
              Stack <em>técnica</em>
            </h2>
          </div>

          <div className="project-stack-grid">
            {stackEntries.map(([category, items], index) => (
              <div
                key={category}
                ref={setStackRef(index)}
                className={`project-stack-card reveal delay-${index + 1}`}
              >
                <div className="project-stack-card-head">
                  <span className="project-stack-card-index mono">{String(index + 1).padStart(2, '0')}</span>
                  <h4>{category}</h4>
                </div>
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

      <section className="project-cta">
        <div className="shell">
          <div className="project-cta-card reveal-scale">
            <div>
              <span className="section-index mono">#04 — links</span>
              <h2 className="project-section-title display">
                Quer ver de <em>perto</em>?
              </h2>
              <p>
                Acesse o projeto ao vivo ou explore o código fonte para entender melhor
                as decisões técnicas tomadas durante o desenvolvimento.
              </p>
            </div>
            <div className="project-cta-buttons">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`cta ${link.kind === 'primary' ? 'cta-primary' : 'cta-ghost'} magnetic`}
                >
                  <span className="cta-label">{link.label}</span>
                  <span className="cta-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="project-next" ref={nextRef}>
        <div className="shell">
          <div className="project-next-row">
            {prev && (
              <Link to={`/projects/${prev.slug}`} className="project-next-link prev reveal">
                <span className="mono project-next-direction">← Anterior</span>
                <span className="project-next-id mono">{prev.id}</span>
                <span className="project-next-title display">{prev.title}</span>
              </Link>
            )}
            {next && (
              <Link to={`/projects/${next.slug}`} className="project-next-link next reveal delay-1">
                <span className="mono project-next-direction">Próximo →</span>
                <span className="project-next-id mono">{next.id}</span>
                <span className="project-next-title display">{next.title}</span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Project;

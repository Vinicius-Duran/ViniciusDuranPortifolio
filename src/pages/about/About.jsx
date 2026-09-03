import React, { useState, useRef, useCallback, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useReveal, useRevealMany } from '../../hooks/useReveal';
import { certificates } from '../../data/certificates';
import { skillGroups } from '../../data/skills';
import './About.css';

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const heroRef = useReveal({ threshold: 0.18 });
  const aboutSectionRef = useReveal();
  const educationRef = useReveal();
  const certificatesHeadRef = useReveal();
  const goalsRef = useReveal();

  const setSkillRef = useRevealMany(skillGroups.length);

  const showCertDescription = (cert) => {
    const skillsHtml = cert.skills
      .map((skill) => `<span class="skill-tag-modal">${skill}</span>`)
      .join('');

    const isMobile = window.innerWidth <= 768;

    const pdfViewer = `<div style="width:100%;height:400px;border-radius:12px;overflow:hidden;border:1px solid rgba(245,241,255,0.1)">
          <iframe src="${cert.pdf}" width="100%" height="100%" style="border:none;border-radius:12px;${cert.id === 1 ? 'transform:rotate(90deg) scale(1.0,1.0);transform-origin:center;height:450px;' : ''}"></iframe>
        </div>`;

    const modalHtml = isMobile
      ? `<div style="text-align:left;color:#f5f1ff">
          <div style="margin-bottom:14px"><strong style="color:#7df9ff;font-family:'JetBrains Mono',monospace;font-size:0.75rem;letter-spacing:0.18em;text-transform:uppercase;">Instituição</strong><br><span style="color:#f5f1ff;display:block;margin-top:4px">${cert.institution}</span></div>
          <div style="margin-bottom:14px"><strong style="color:#7df9ff;font-family:'JetBrains Mono',monospace;font-size:0.75rem;letter-spacing:0.18em;text-transform:uppercase;">Período</strong><br><span style="color:#f5f1ff;display:block;margin-top:4px">${cert.period}</span></div>
          <div style="margin-bottom:14px"><strong style="color:#7df9ff;font-family:'JetBrains Mono',monospace;font-size:0.75rem;letter-spacing:0.18em;text-transform:uppercase;">Descrição</strong><p style="margin-top:8px;line-height:1.7;color:rgba(245,241,255,0.85)">${cert.description}</p></div>
          <div><strong style="color:#7df9ff;font-family:'JetBrains Mono',monospace;font-size:0.75rem;letter-spacing:0.18em;text-transform:uppercase;">Habilidades</strong><div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:8px;">${skillsHtml}</div></div>
        </div>`
      : `<div style="display:flex;gap:24px;align-items:flex-start;">
          <div style="flex:1;min-width:0;">${pdfViewer}</div>
          <div style="flex:1;text-align:left;color:#f5f1ff;padding-left:8px;">
            <div style="margin-bottom:14px"><strong style="color:#7df9ff;font-family:'JetBrains Mono',monospace;font-size:0.75rem;letter-spacing:0.18em;text-transform:uppercase;">Instituição</strong><br><span style="display:block;margin-top:4px">${cert.institution}</span></div>
            <div style="margin-bottom:14px"><strong style="color:#7df9ff;font-family:'JetBrains Mono',monospace;font-size:0.75rem;letter-spacing:0.18em;text-transform:uppercase;">Período</strong><br><span style="display:block;margin-top:4px">${cert.period}</span></div>
            <div style="margin-bottom:14px"><strong style="color:#7df9ff;font-family:'JetBrains Mono',monospace;font-size:0.75rem;letter-spacing:0.18em;text-transform:uppercase;">Descrição</strong><p style="margin-top:8px;line-height:1.7;color:rgba(245,241,255,0.85)">${cert.description}</p></div>
            <div><strong style="color:#7df9ff;font-family:'JetBrains Mono',monospace;font-size:0.75rem;letter-spacing:0.18em;text-transform:uppercase;">Habilidades</strong><div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:8px;">${skillsHtml}</div></div>
          </div>
        </div>`;

    Swal.fire({
      title: cert.name,
      html: modalHtml,
      width: isMobile ? '92%' : '1000px',
      background: '#0a0414',
      color: '#f5f1ff',
      confirmButtonColor: '#8a52ff',
      confirmButtonText: 'Fechar',
      customClass: {
        popup: 'swal-modal-custom',
        title: 'swal-title-custom',
        htmlContainer: 'swal-content-custom',
      },
    });
  };

  const getCardWidth = useCallback(() => {
    const container = carouselRef.current;
    if (!container) return 492;
    const card = container.querySelector('.certificate-card');
    if (!card) return 492;
    const gap = parseFloat(getComputedStyle(container).columnGap || '0');
    return card.getBoundingClientRect().width + gap;
  }, []);

  const scrollToSlide = (slideIndex) => {
    if (carouselRef.current && !isDragging) {
      const cardWidth = getCardWidth();
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      const target = Math.min(slideIndex * cardWidth, maxScroll);
      carouselRef.current.classList.add('smooth');
      carouselRef.current.classList.remove('dragging');
      carouselRef.current.scrollTo({ left: target, behavior: 'smooth' });
    }
  };

  const nextSlide = () => {
    const max = certificates.length - 2;
    const next = currentSlide < max ? currentSlide + 1 : 0;
    setCurrentSlide(next);
    scrollToSlide(next);
  };

  const prevSlide = () => {
    const max = certificates.length - 2;
    const next = currentSlide > 0 ? currentSlide - 1 : max;
    setCurrentSlide(next);
    scrollToSlide(next);
  };

  const updateCurrentSlide = useCallback(() => {
    if (carouselRef.current && !isDragging) {
      const cardWidth = getCardWidth();
      const scrollLeft = carouselRef.current.scrollLeft;
      const threshold = cardWidth * 0.3;
      const candidate = Math.floor((scrollLeft + threshold) / cardWidth);
      const max = certificates.length - 2;
      const clamped = Math.min(Math.max(candidate, 0), max);
      setCurrentSlide((prev) => (prev !== clamped ? clamped : prev));
    }
  }, [isDragging, getCardWidth]);

  const debouncedUpdate = useCallback(() => {
    clearTimeout(debouncedUpdate.timeoutId);
    debouncedUpdate.timeoutId = setTimeout(() => updateCurrentSlide(), 100);
  }, [updateCurrentSlide]);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return undefined;
    container.addEventListener('scroll', debouncedUpdate);
    return () => container.removeEventListener('scroll', debouncedUpdate);
  }, [debouncedUpdate]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollStart(carouselRef.current.scrollLeft);
    carouselRef.current.classList.add('dragging');
    carouselRef.current.classList.remove('smooth');
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      carouselRef.current.classList.remove('dragging');
      carouselRef.current.classList.add('smooth');
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      carouselRef.current.classList.remove('dragging');
      carouselRef.current.classList.add('smooth');
      setTimeout(() => updateCurrentSlide(), 100);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollStart - walk;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollStart(carouselRef.current.scrollLeft);
    carouselRef.current.classList.add('dragging');
    carouselRef.current.classList.remove('smooth');
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollStart - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      carouselRef.current.classList.remove('dragging');
      carouselRef.current.classList.add('smooth');
      setTimeout(() => updateCurrentSlide(), 100);
    }
  };

  return (
    <div className="about-page">
      <section className="about-hero" ref={heroRef}>
        <div className="shell">
          <div className="about-hero-meta reveal">
            <span className="eyebrow">Trajetória — Vol. 02</span>
            <span className="mono about-hero-coord">DEV · BR · 2024 — 2026</span>
          </div>

          <h1 className="about-hero-title display reveal delay-1">
            Sobre <em>mim</em>,
            <br />
            <span className="text-accent">linhas de código</span>
            <br />
            e curiosidade.
          </h1>

          <p className="about-hero-description reveal delay-2">
            Desenvolvedor júnior com 2 anos de experiência em desenvolvimento de APIs,
            manutenção de projetos e construção de interfaces. Trabalho fluentemente com
            C#, SQL, Node.js, .NET, React e CSS — sempre buscando a combinação certa
            entre engenharia robusta e design intencional.
          </p>

          <div className="about-hero-stats reveal delay-3">
            <div className="stat">
              <span className="stat-value display">2+</span>
              <span className="stat-label">Anos de experiência</span>
            </div>
            <div className="stat">
              <span className="stat-value display">19</span>
              <span className="stat-label">Certificações</span>
            </div>
            <div className="stat">
              <span className="stat-value display">10+</span>
              <span className="stat-label">Tecnologias</span>
            </div>
            <div className="stat">
              <span className="stat-value display">∞</span>
              <span className="stat-label">Curiosidade</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-skills" ref={aboutSectionRef}>
        <div className="shell">
          <div className="section-header reveal">
            <span className="section-index mono">#01 — competências</span>
            <h2 className="section-title display">
              Toolbox <em>técnica</em>
              <br />
              em <span className="text-accent">camadas</span>.
            </h2>
          </div>

          <p className="about-paragraph reveal delay-1">
            Tenho uma forte paixão por aprender e encarar desafios — principalmente quando
            se trata de soluções criativas. Além do desenvolvimento, atuo em modelagem 3D,
            análise CFD, impressão 3D, corte a laser e manutenção de hardware.
          </p>

          <div className="skill-grid">
            {skillGroups.map((group, index) => (
              <div
                key={group.label}
                ref={setSkillRef(index)}
                className={`skill-block reveal delay-${index + 1}`}
              >
                <div className="skill-block-head">
                  <span className="skill-block-index mono">0{index + 1}</span>
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
      </section>

      <section className="education" ref={educationRef}>
        <div className="shell">
          <div className="section-header reveal">
            <span className="section-index mono">#02 — formação</span>
            <h2 className="section-title display">
              Formação <em>acadêmica</em>
            </h2>
          </div>

          <div className="education-card reveal delay-1">
            <div className="education-side">
              <span className="education-tag mono">2024 — 2025</span>
              <span className="education-stripe" aria-hidden="true" />
            </div>
            <div className="education-body">
              <h3>Curso Técnico Integrado em Desenvolvimento de Sistemas</h3>
              <p className="education-institution">SENAI/SC — Serviço Nacional de Aprendizagem Industrial</p>
              <p className="education-description">
                Formação com foco em análise, desenvolvimento e manutenção de sistemas e
                aplicações, com base em práticas atuais do mercado. A grade abrange desde
                fundamentos da lógica de programação até o desenvolvimento completo de
                aplicações web e mobile.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="certificates" ref={certificatesHeadRef}>
        <div className="shell">
          <div className="section-header reveal">
            <span className="section-index mono">#03 — certificações</span>
            <h2 className="section-title display">
              Certificados e <em>cursos</em>
            </h2>
          </div>

          <div className="certificates-carousel reveal delay-1">
            <div
              className="certificates-container smooth"
              ref={carouselRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              {certificates.map((cert, index) => (
                <div key={cert.id} className="certificate-card">
                  <div className="certificate-pdf">
                    <iframe src={cert.pdf} title={cert.name} className="pdf-viewer" />
                    <span className="certificate-pdf-glow" aria-hidden="true" />
                  </div>

                  <div className="certificate-info">
                    <div className="certificate-meta">
                      <span className="certificate-index mono">{String(index + 1).padStart(2, '0')}</span>
                      <span className="certificate-institution">{cert.institution}</span>
                    </div>
                    <h4 className="certificate-name">{cert.name}</h4>
                    <span className="certificate-period">{cert.period}</span>

                    <button
                      className="certificate-btn magnetic"
                      onClick={() => showCertDescription(cert)}
                    >
                      <span>Ver descrição</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="carousel-controls">
              <button
                className="carousel-btn magnetic"
                onClick={prevSlide}
                aria-label="Anterior"
              >
                ←
              </button>
              <div className="carousel-progress mono">
                <span>{String(currentSlide + 1).padStart(2, '0')}</span>
                <span className="carousel-progress-bar">
                  <span
                    className="carousel-progress-fill"
                    style={{ width: `${((currentSlide + 1) / (certificates.length - 1)) * 100}%` }}
                  />
                </span>
                <span>{String(certificates.length - 1).padStart(2, '0')}</span>
              </div>
              <button
                className="carousel-btn magnetic"
                onClick={nextSlide}
                aria-label="Próximo"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="goals" ref={goalsRef}>
        <div className="shell">
          <div className="section-header reveal">
            <span className="section-index mono">#04 — objetivos</span>
            <h2 className="section-title display">
              Objetivos <em>profissionais</em>
            </h2>
          </div>

          <div className="goals-card reveal delay-1">
            <p>
              Continuar minha evolução como desenvolvedor, aprender novas tecnologias e
              colaborar em projetos inovadores. Busco aplicar minhas habilidades técnicas
              e criativas para resolver problemas complexos, sempre focando na entrega de
              soluções eficientes e de alta qualidade.
            </p>
            <div className="goals-bullets">
              <div>
                <span className="mono">→ 2026</span>
                <p>Aprofundar em arquitetura .NET e sistemas distribuídos</p>
              </div>
              <div>
                <span className="mono">→ Curto prazo</span>
                <p>Contribuir em produtos com motion design e UX rico</p>
              </div>
              <div>
                <span className="mono">→ Sempre</span>
                <p>Continuar aprendendo e compartilhando conhecimento</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

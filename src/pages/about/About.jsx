import React, { useState, useRef, useCallback, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useReveal, useRevealMany } from '../../hooks/useReveal';
import './About.css';

const certificates = [
  {
    id: 1,
    name: 'Curso Técnico em Desenvolvimento de Sistemas',
    institution: 'SENAI/SC',
    period: 'Jan 2024 - Jul 2025',
    pdf: '/diploma-tecnico-vinicius.pdf',
    description:
      'Formação com foco em análise, desenvolvimento e manutenção de sistemas e aplicações, com base em práticas atuais do mercado. A grade abrange desde fundamentos da lógica de programação até o desenvolvimento completo de aplicações web e mobile.',
    skills: ['JavaScript', 'HTML', 'CSS', 'React', 'React Native', 'C++', 'Node.js', 'SQL', 'JSON', 'POO', 'Full Stack', 'APIs', 'Testes de Software', 'Git'],
  },
  {
    id: 2,
    name: 'Fundamentos de TypeScript',
    institution: 'LinkedIn Learning',
    period: '2025',
    pdf: '/CertificadoDeConclusao_Fundamentos de TypeScript.pdf',
    description: 'Curso focado nos fundamentos da linguagem TypeScript, incluindo tipagem estática, interfaces, classes e integração com JavaScript.',
    skills: ['TypeScript', 'Tipagem Estática', 'Interfaces', 'Classes'],
  },
  {
    id: 3,
    name: 'Fundamentos de React',
    institution: 'LinkedIn Learning',
    period: '2025',
    pdf: '/CertificadoDeConclusao_Fundamentos de React.pdf',
    description: 'Aprendizado dos conceitos fundamentais do React, incluindo componentes, props, state, hooks e ciclo de vida.',
    skills: ['React', 'Componentes', 'Props', 'State', 'Hooks'],
  },
  {
    id: 4,
    name: 'Fundamentos de APIs REST',
    institution: 'LinkedIn Learning',
    period: '2025',
    pdf: '/CertificadoDeConclusao_Fundamentos de APIs Rest.pdf',
    description: 'Conceitos fundamentais sobre APIs REST, incluindo métodos HTTP, status codes, autenticação e documentação.',
    skills: ['APIs REST', 'HTTP', 'JSON', 'Autenticação'],
  },
  {
    id: 5,
    name: 'C#: Formação Básica',
    institution: 'LinkedIn Learning',
    period: '2025',
    pdf: '/CertificadoDeConclusao_C Formacao Basica.pdf',
    description: 'Formação básica em C#, cobrindo sintaxe, orientação a objetos, coleções e desenvolvimento de aplicações.',
    skills: ['C#', 'POO', 'Sintaxe', 'Coleções'],
  },
  {
    id: 6,
    name: 'Aprendendo Programação SQL',
    institution: 'LinkedIn Learning',
    period: '2025',
    pdf: '/CertificadoDeConclusao_Aprendendo Programacao SQL.pdf',
    description: 'Fundamentos de SQL para manipulação de bancos de dados, incluindo consultas, joins, subconsultas e otimização.',
    skills: ['SQL', 'Banco de Dados', 'Consultas', 'Joins', 'Subconsultas'],
  },
  {
    id: 7,
    name: 'Fundamentos da Programação',
    institution: 'LinkedIn Learning',
    period: '2025',
    pdf: '/CertificadoDeConclusao_Fundamentos da Programacao.pdf',
    description: 'Conceitos fundamentais de programação, incluindo algoritmos, estruturas de dados, lógica de programação e boas práticas.',
    skills: ['Algoritmos', 'Estruturas de Dados', 'Lógica', 'Boas Práticas'],
  },
  {
    id: 8,
    name: 'Boas Práticas em CSS',
    institution: 'LinkedIn Learning',
    period: '2025',
    pdf: '/CertificadoDeConclusao_Fundamentos das Boas Praticas em CSS.pdf',
    description: 'Melhores práticas para desenvolvimento CSS, incluindo organização, manutenibilidade, responsividade e performance.',
    skills: ['CSS', 'Responsividade', 'Performance', 'Manutenibilidade'],
  },
  {
    id: 9,
    name: 'Fundamentos de ASP.NET Core',
    institution: 'LinkedIn Learning',
    period: '2025',
    pdf: '/CertificadoDeConclusao_Fundamentos de ASP.NET Core.pdf',
    description: 'Desenvolvimento de aplicações web com ASP.NET Core, incluindo MVC, APIs, autenticação e deploy.',
    skills: ['ASP.NET Core', 'MVC', 'APIs', 'Autenticação', 'Deploy'],
  },
  {
    id: 10,
    name: 'Fundamentos de HTTP para Desenvolvedores',
    institution: 'LinkedIn Learning',
    period: '2025',
    pdf: '/CertificadoDeConclusao_Fundamentos de HTTP para Desenvolvedores.pdf',
    description: 'Compreensão profunda do protocolo HTTP, incluindo métodos, headers, status codes e segurança.',
    skills: ['HTTP', 'Protocolos', 'Headers', 'Status Codes', 'Segurança'],
  },
  {
    id: 11,
    name: 'APIs e Serviços da Web',
    institution: 'LinkedIn Learning',
    period: '2025',
    pdf: '/CertificadoDeConclusao_Fundamentos de Programacao APIs e Servicos da Web.pdf',
    description: 'Desenvolvimento de APIs e serviços web, incluindo REST, SOAP, autenticação e documentação.',
    skills: ['APIs', 'Serviços Web', 'REST', 'SOAP', 'Documentação'],
  },
  {
    id: 12,
    name: 'Estruturas de Dados',
    institution: 'LinkedIn Learning',
    period: '2025',
    pdf: '/CertificadoDeConclusao_Fundamentos de Programacao Estruturas de Dados.pdf',
    description: 'Estruturas de dados fundamentais, incluindo arrays, listas, pilhas, filas, árvores e grafos.',
    skills: ['Estruturas de Dados', 'Arrays', 'Listas', 'Pilhas', 'Filas', 'Árvores'],
  },
  {
    id: 13,
    name: 'Git e GitHub: Formação Básica',
    institution: 'LinkedIn Learning',
    period: '2025',
    pdf: '/CertificadoDeConclusao_Git e GitHub Formacao Basica.pdf',
    description: 'Controle de versão com Git e GitHub, incluindo branches, merges, pull requests e colaboração.',
    skills: ['Git', 'GitHub', 'Controle de Versão', 'Branches', 'Pull Requests'],
  },
  {
    id: 14,
    name: 'GitHub Actions: Formação Básica',
    institution: 'LinkedIn Learning',
    period: '2025',
    pdf: '/CertificadoDeConclusao_GitHub Actions Formacao Basica.pdf',
    description: 'Automação de workflows com GitHub Actions, incluindo CI/CD, testes automatizados e deploy.',
    skills: ['GitHub Actions', 'CI/CD', 'Automação', 'Deploy', 'Testes'],
  },
  {
    id: 15,
    name: 'Competências Essenciais para Desenvolvimento',
    institution: 'LinkedIn Learning',
    period: '2025',
    pdf: '/CertificadoDeConclusao_Introducao as Competencias Essenciais para a Carreira de Desenvolvimento de Software.pdf',
    description: 'Competências essenciais para carreira em desenvolvimento de software, incluindo soft skills e metodologias.',
    skills: ['Soft Skills', 'Metodologias', 'Carreira', 'Desenvolvimento'],
  },
  {
    id: 16,
    name: 'HTML5 e CSS3',
    institution: 'LinkedIn Learning',
    period: '2025',
    pdf: '/CertificadoDeConclusao_Primeiros Passos na Criacao de Sites com HTML5 e CSS3.pdf',
    description: 'Fundamentos de desenvolvimento web com HTML5 e CSS3, incluindo semântica, responsividade e acessibilidade.',
    skills: ['HTML5', 'CSS3', 'Semântica', 'Responsividade', 'Acessibilidade'],
  },
  {
    id: 17,
    name: 'Trabalho Remoto: Colaboração e Produtividade',
    institution: 'LinkedIn Learning',
    period: '2025',
    pdf: '/CertificadoDeConclusao_Trabalho Remoto Colaboracao foco e produtividade.pdf',
    description: 'Desenvolvimento de habilidades para trabalho remoto, incluindo colaboração virtual, gestão de tempo e produtividade.',
    skills: ['Trabalho Remoto', 'Colaboração', 'Gestão de Tempo', 'Produtividade'],
  },
  {
    id: 18,
    name: 'Gestão de Tempo e Produtividade',
    institution: 'LinkedIn Learning',
    period: '2025',
    pdf: '/CertificadoDeConclusao_Como melhorar a Gestao de Tempo e aumentar a Produtividade.pdf',
    description: 'Técnicas e ferramentas para melhorar a gestão de tempo e aumentar a produtividade no trabalho.',
    skills: ['Gestão de Tempo', 'Produtividade', 'Organização', 'Foco'],
  },
  {
    id: 19,
    name: 'Programação em Pares e em Grupo',
    institution: 'LinkedIn Learning',
    period: '2025',
    pdf: '/CertificadoDeConclusao_Desenvolvimento Agil de Software Programacao em Pares e em Grupo.pdf',
    description: 'Metodologias ágeis e técnicas de programação colaborativa, incluindo pair programming e trabalho em equipe.',
    skills: ['Metodologias Ágeis', 'Pair Programming', 'Trabalho em Equipe', 'Colaboração'],
  },
];

const skillGroups = [
  {
    label: 'Software',
    items: ['C#', '.NET', 'SQL', 'Node.js', 'React', 'React Native', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
  },
  {
    label: 'Design & 3D',
    items: ['Modelagem 3D', 'Análise CFD', 'Fusion 360', 'CAD/CAM', 'Design Gráfico'],
  },
  {
    label: 'Hardware',
    items: ['Impressão 3D', 'Corte a Laser', 'Arduino', 'Robótica', 'Manutenção'],
  },
  {
    label: 'Soft Skills',
    items: ['Trabalho em Equipe', 'Comunicação', 'Gestão de Tempo', 'Resolução de Problemas'],
  },
];

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

    const pdfViewer = cert.pdf
      ? `<div style="width:100%;height:400px;border-radius:12px;overflow:hidden;border:1px solid rgba(245,241,255,0.1)">
          <iframe src="${cert.pdf}" width="100%" height="100%" style="border:none;border-radius:12px;${cert.id === 1 ? 'transform:rotate(90deg) scale(1.0,1.0);transform-origin:center;height:450px;' : ''}"></iframe>
        </div>`
      : `<div style="width:100%;height:400px;background:linear-gradient(135deg,#68b2f8,#8a52ff);border-radius:12px;display:flex;align-items:center;justify-content:center;color:white;">
          <div style="text-align:center;"><span style="font-size:3rem;display:block;margin-bottom:1rem;">📄</span><p>PDF do Certificado</p><small style="opacity:0.7">Em breve</small></div>
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

  const cardWidth = 492;

  const scrollToSlide = (slideIndex) => {
    if (carouselRef.current && !isDragging) {
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
      const scrollLeft = carouselRef.current.scrollLeft;
      const threshold = cardWidth * 0.3;
      const candidate = Math.floor((scrollLeft + threshold) / cardWidth);
      const max = certificates.length - 2;
      const clamped = Math.min(Math.max(candidate, 0), max);
      setCurrentSlide((prev) => (prev !== clamped ? clamped : prev));
    }
  }, [isDragging]);

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
                    {cert.pdf ? (
                      <iframe src={cert.pdf} title={cert.name} className="pdf-viewer" />
                    ) : (
                      <div className="pdf-placeholder">
                        <span>📄</span>
                        <p>PDF do Certificado</p>
                        <small>Em breve</small>
                      </div>
                    )}
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

import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import './About.css';

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const certificates = [
    {
      id: 1,
      name: "Curso Técnico em Desenvolvimento de Sistemas",
      institution: "SENAI/SC",
      period: "Jan 2024 - Jul 2025",
      pdf: "/diploma-tecnico-vinicius.pdf",
      description: "Formação com foco em análise, desenvolvimento e manutenção de sistemas e aplicações, com base em práticas atuais do mercado. A grade abrange desde fundamentos da lógica de programação até o desenvolvimento completo de aplicações web e mobile.",
      skills: ["JavaScript", "HTML", "CSS", "React", "React Native", "C++", "Node.js", "SQL", "JSON", "POO", "Full Stack", "APIs", "Testes de Software", "Git"]
    },
    {
      id: 2,
      name: "Fundamentos de TypeScript",
      institution: "LinkedIn Learning",
      period: "2025",
      pdf: "/CertificadoDeConclusao_Fundamentos de TypeScript.pdf",
      description: "Curso focado nos fundamentos da linguagem TypeScript, incluindo tipagem estática, interfaces, classes e integração com JavaScript.",
      skills: ["TypeScript", "Tipagem Estática", "Interfaces", "Classes"]
    },
    {
      id: 3,
      name: "Fundamentos de React",
      institution: "LinkedIn Learning",
      period: "2025",
      pdf: "/CertificadoDeConclusao_Fundamentos de React.pdf",
      description: "Aprendizado dos conceitos fundamentais do React, incluindo componentes, props, state, hooks e ciclo de vida.",
      skills: ["React", "Componentes", "Props", "State", "Hooks"]
    },
    {
      id: 4,
      name: "Fundamentos de APIs REST",
      institution: "LinkedIn Learning",
      period: "2025",
      pdf: "/CertificadoDeConclusao_Fundamentos de APIs Rest.pdf",
      description: "Conceitos fundamentais sobre APIs REST, incluindo métodos HTTP, status codes, autenticação e documentação.",
      skills: ["APIs REST", "HTTP", "JSON", "Autenticação"]
    },
    {
      id: 5,
      name: "C#: Formação Básica",
      institution: "LinkedIn Learning",
      period: "2025",
      pdf: "/CertificadoDeConclusao_C Formacao Basica.pdf",
      description: "Formação básica em C#, cobrindo sintaxe, orientação a objetos, coleções e desenvolvimento de aplicações.",
      skills: ["C#", "POO", "Sintaxe", "Coleções"]
    },
    {
      id: 6,
      name: "Aprendendo Programação SQL",
      institution: "LinkedIn Learning",
      period: "2025",
      pdf: "/CertificadoDeConclusao_Aprendendo Programacao SQL.pdf",
      description: "Fundamentos de SQL para manipulação de bancos de dados, incluindo consultas, joins, subconsultas e otimização.",
      skills: ["SQL", "Banco de Dados", "Consultas", "Joins", "Subconsultas"]
    },
    {
      id: 7,
      name: "Fundamentos da Programação",
      institution: "LinkedIn Learning",
      period: "2025",
      pdf: "/CertificadoDeConclusao_Fundamentos da Programacao.pdf",
      description: "Conceitos fundamentais de programação, incluindo algoritmos, estruturas de dados, lógica de programação e boas práticas.",
      skills: ["Algoritmos", "Estruturas de Dados", "Lógica", "Boas Práticas"]
    },
    {
      id: 8,
      name: "Fundamentos das Boas Práticas em CSS",
      institution: "LinkedIn Learning",
      period: "2025",
      pdf: "/CertificadoDeConclusao_Fundamentos das Boas Praticas em CSS.pdf",
      description: "Melhores práticas para desenvolvimento CSS, incluindo organização, manutenibilidade, responsividade e performance.",
      skills: ["CSS", "Responsividade", "Performance", "Manutenibilidade"]
    },
    {
      id: 9,
      name: "Fundamentos de ASP.NET Core",
      institution: "LinkedIn Learning",
      period: "2025",
      pdf: "/CertificadoDeConclusao_Fundamentos de ASP.NET Core.pdf",
      description: "Desenvolvimento de aplicações web com ASP.NET Core, incluindo MVC, APIs, autenticação e deploy.",
      skills: ["ASP.NET Core", "MVC", "APIs", "Autenticação", "Deploy"]
    },
    {
      id: 10,
      name: "Fundamentos de HTTP para Desenvolvedores",
      institution: "LinkedIn Learning",
      period: "2025",
      pdf: "/CertificadoDeConclusao_Fundamentos de HTTP para Desenvolvedores.pdf",
      description: "Compreensão profunda do protocolo HTTP, incluindo métodos, headers, status codes e segurança.",
      skills: ["HTTP", "Protocolos", "Headers", "Status Codes", "Segurança"]
    },
    {
      id: 11,
      name: "Fundamentos de Programação: APIs e Serviços da Web",
      institution: "LinkedIn Learning",
      period: "2025",
      pdf: "/CertificadoDeConclusao_Fundamentos de Programacao APIs e Servicos da Web.pdf",
      description: "Desenvolvimento de APIs e serviços web, incluindo REST, SOAP, autenticação e documentação.",
      skills: ["APIs", "Serviços Web", "REST", "SOAP", "Documentação"]
    },
    {
      id: 12,
      name: "Fundamentos de Programação: Estruturas de Dados",
      institution: "LinkedIn Learning",
      period: "2025",
      pdf: "/CertificadoDeConclusao_Fundamentos de Programacao Estruturas de Dados.pdf",
      description: "Estruturas de dados fundamentais, incluindo arrays, listas, pilhas, filas, árvores e grafos.",
      skills: ["Estruturas de Dados", "Arrays", "Listas", "Pilhas", "Filas", "Árvores"]
    },
    {
      id: 13,
      name: "Git e GitHub: Formação Básica",
      institution: "LinkedIn Learning",
      period: "2025",
      pdf: "/CertificadoDeConclusao_Git e GitHub Formacao Basica.pdf",
      description: "Controle de versão com Git e GitHub, incluindo branches, merges, pull requests e colaboração.",
      skills: ["Git", "GitHub", "Controle de Versão", "Branches", "Pull Requests"]
    },
    {
      id: 14,
      name: "GitHub Actions: Formação Básica",
      institution: "LinkedIn Learning",
      period: "2025",
      pdf: "/CertificadoDeConclusao_GitHub Actions Formacao Basica.pdf",
      description: "Automação de workflows com GitHub Actions, incluindo CI/CD, testes automatizados e deploy.",
      skills: ["GitHub Actions", "CI/CD", "Automação", "Deploy", "Testes"]
    },
    {
      id: 15,
      name: "Introdução às Competências Essenciais para Desenvolvimento de Software",
      institution: "LinkedIn Learning",
      period: "2025",
      pdf: "/CertificadoDeConclusao_Introducao as Competencias Essenciais para a Carreira de Desenvolvimento de Software.pdf",
      description: "Competências essenciais para carreira em desenvolvimento de software, incluindo soft skills e metodologias.",
      skills: ["Soft Skills", "Metodologias", "Carreira", "Desenvolvimento"]
    },
    {
      id: 16,
      name: "Primeiros Passos na Criação de Sites com HTML5 e CSS3",
      institution: "LinkedIn Learning",
      period: "2025",
      pdf: "/CertificadoDeConclusao_Primeiros Passos na Criacao de Sites com HTML5 e CSS3.pdf",
      description: "Fundamentos de desenvolvimento web com HTML5 e CSS3, incluindo semântica, responsividade e acessibilidade.",
      skills: ["HTML5", "CSS3", "Semântica", "Responsividade", "Acessibilidade"]
    },
    {
      id: 17,
      name: "Trabalho Remoto: Colaboração, foco e produtividade",
      institution: "LinkedIn Learning",
      period: "2025",
      pdf: "/CertificadoDeConclusao_Trabalho Remoto Colaboracao foco e produtividade.pdf",
      description: "Desenvolvimento de habilidades para trabalho remoto, incluindo colaboração virtual, gestão de tempo e produtividade.",
      skills: ["Trabalho Remoto", "Colaboração", "Gestão de Tempo", "Produtividade"]
    },
    {
      id: 18,
      name: "Como melhorar a Gestão de Tempo e aumentar a Produtividade",
      institution: "LinkedIn Learning",
      period: "2025",
      pdf: "/CertificadoDeConclusao_Como melhorar a Gestao de Tempo e aumentar a Produtividade.pdf",
      description: "Técnicas e ferramentas para melhorar a gestão de tempo e aumentar a produtividade no trabalho.",
      skills: ["Gestão de Tempo", "Produtividade", "Organização", "Foco"]
    },
    {
      id: 19,
      name: "Desenvolvimento Ágil de Software: Programação em Pares e em Grupo",
      institution: "LinkedIn Learning",
      period: "2025",
      pdf: "/CertificadoDeConclusao_Desenvolvimento Agil de Software Programacao em Pares e em Grupo.pdf",
      description: "Metodologias ágeis e técnicas de programação colaborativa, incluindo pair programming e trabalho em equipe.",
      skills: ["Metodologias Ágeis", "Pair Programming", "Trabalho em Equipe", "Colaboração"]
    }
  ];

  const showCertDescription = (cert) => {
    const skillsHtml = cert.skills.map(skill => 
      `<span class="skill-tag-modal">${skill}</span>`
    ).join('');

    // Detecta se é mobile
    const isMobile = window.innerWidth <= 768;

    const pdfViewer = cert.pdf ? 
      `<div style="width: 100%; height: 400px; border-radius: 8px; overflow: hidden;">
        <iframe src="${cert.pdf}" width="100%" height="100%" style="border: none; border-radius: 8px; ${cert.id === 1 ? 'transform: rotate(90deg) scale(1.0, 1.0); transform-origin: center; height: 450px;' : ''}"></iframe>
      </div>` : 
      `<div style="width: 100%; height: 400px; background: linear-gradient(135deg, #64ffda, #7c4dff); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white;">
        <div style="text-align: center;">
          <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">📄</span>
          <p style="font-size: 1.1rem; font-weight: 600;">PDF do Certificado</p>
          <small style="opacity: 0.7;">Será adicionado em breve</small>
        </div>
      </div>`;

    // HTML do modal baseado no dispositivo
    const modalHtml = isMobile ? `
      <div style="text-align: left; color: #ffffff;">
        <div style="margin-bottom: 15px;">
          <strong style="color: #64ffda;">Instituição:</strong> <span style="color: #e4e6ea;">${cert.institution}</span>
        </div>
        <div style="margin-bottom: 15px;">
          <strong style="color: #64ffda;">Período:</strong> <span style="color: #e4e6ea;">${cert.period}</span>
        </div>
        <div style="margin-bottom: 15px;">
          <strong style="color: #64ffda;">Descrição:</strong><br>
          <p style="margin-top: 8px; line-height: 1.6; color: #e4e6ea;">${cert.description}</p>
        </div>
        <div>
          <strong style="color: #64ffda;">Habilidades Desenvolvidas:</strong><br>
          <div style="margin-top: 8px; display: flex; flex-wrap: wrap; gap: 8px;">
            ${skillsHtml}
          </div>
        </div>
      </div>
    ` : `
      <div style="display: flex; gap: 20px; align-items: flex-start;">
        <div style="flex: 1; min-width: 0;">
          ${pdfViewer}
        </div>
        <div style="flex: 1; text-align: left; color: #ffffff; padding-left: 20px;">
          <div style="margin-bottom: 15px;">
            <strong style="color: #64ffda;">Instituição:</strong> <span style="color: #e4e6ea;">${cert.institution}</span>
          </div>
          <div style="margin-bottom: 15px;">
            <strong style="color: #64ffda;">Período:</strong> <span style="color: #e4e6ea;">${cert.period}</span>
          </div>
          <div style="margin-bottom: 15px;">
            <strong style="color: #64ffda;">Descrição:</strong><br>
            <p style="margin-top: 8px; line-height: 1.6; color: #e4e6ea;">${cert.description}</p>
          </div>
          <div>
            <strong style="color: #64ffda;">Habilidades Desenvolvidas:</strong><br>
            <div style="margin-top: 8px; display: flex; flex-wrap: wrap; gap: 8px;">
              ${skillsHtml}
            </div>
          </div>
        </div>
      </div>
    `;

    Swal.fire({
      title: cert.name,
      html: modalHtml,
      width: isMobile ? '90%' : '1000px',
      background: '#1a1a2e',
      color: '#ffffff',
      confirmButtonColor: '#64ffda',
      confirmButtonText: 'Fechar',
      customClass: {
        popup: 'swal-modal-custom',
        title: 'swal-title-custom',
        content: 'swal-content-custom'
      }
    });
  };

  const nextSlide = () => {
    const maxSlides = certificates.length - 2; // 18 slides (19 certificados - 1)
    const newSlide = currentSlide < maxSlides ? currentSlide + 1 : 0;
    setCurrentSlide(newSlide);
    scrollToSlide(newSlide);
  };

  const prevSlide = () => {
    const maxSlides = certificates.length - 2; // 18 slides (19 certificados - 1)
    const newSlide = currentSlide > 0 ? currentSlide - 1 : maxSlides;
    setCurrentSlide(newSlide);
    scrollToSlide(newSlide);
  };

  const scrollToSlide = (slideIndex) => {
    if (carouselRef.current && !isDragging) {
      const cardWidth = 492; // Largura do card + gap (460px + 32px)
      const maxScrollLeft = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      const targetScrollLeft = Math.min(slideIndex * cardWidth, maxScrollLeft);
      
      carouselRef.current.classList.add('smooth');
      carouselRef.current.classList.remove('dragging');
      carouselRef.current.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  };


  // Atualiza o slide atual baseado na posição do scroll
  const updateCurrentSlide = React.useCallback(() => {
    if (carouselRef.current && !isDragging) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const cardWidth = 492; // Largura do card + gap (460px + 32px)
      const threshold = cardWidth * 0.3; // 30% do card para mudar de slide
      const newSlide = Math.floor((scrollLeft + threshold) / cardWidth);
      const maxSlides = certificates.length - 2; // 18 slides (19 certificados - 1)
      const clampedSlide = Math.min(Math.max(newSlide, 0), maxSlides);
      
      
      setCurrentSlide(prevSlide => {
        // Só atualiza se realmente mudou para evitar piscadas
        if (prevSlide !== clampedSlide) {
          return clampedSlide;
        }
        return prevSlide;
      });
    }
  }, [certificates.length, isDragging]);

  // Debounced version com timeout para evitar muitas atualizações
  const debouncedUpdateCurrentSlide = React.useCallback(() => {
    clearTimeout(debouncedUpdateCurrentSlide.timeoutId);
    debouncedUpdateCurrentSlide.timeoutId = setTimeout(() => {
      updateCurrentSlide();
    }, 100); // 100ms de delay
  }, [updateCurrentSlide]);

  // Adiciona listener para scroll
  React.useEffect(() => {
    const container = carouselRef.current;
    if (container) {
      container.addEventListener('scroll', debouncedUpdateCurrentSlide);
      return () => container.removeEventListener('scroll', debouncedUpdateCurrentSlide);
    }
  }, [debouncedUpdateCurrentSlide]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
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
      // Atualiza as bolinhas após o drag
      setTimeout(() => {
        updateCurrentSlide();
      }, 100);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.classList.add('dragging');
    carouselRef.current.classList.remove('smooth');
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      carouselRef.current.classList.remove('dragging');
      carouselRef.current.classList.add('smooth');
      // Atualiza as bolinhas após o swipe
      setTimeout(() => {
        updateCurrentSlide();
      }, 100);
    }
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="container">
          <div className="about-hero-content">
            <div className="about-hero-text">
              <h1 className="about-hero-title">
                <span className="gradient-text">Sobre Mim</span>
              </h1>
              <h2 className="about-hero-subtitle">
                Desenvolvedor Júnior | Técnico em Desenvolvimento de Sistemas | Apaixonado por Tecnologia e Inovação
              </h2>
              <p className="about-hero-description">
                Sou um desenvolvedor com 2 anos de experiência, onde atuo no desenvolvimento de APIs, 
                manutenção de projetos e sites, além de trabalhar com diversas linguagens e tecnologias 
                como C#, SQL, Node.js, .NET, React e CSS.
              </p>
            </div>
            <div className="about-hero-visual">
              <div className="about-image-placeholder">
                <span>📸</span>
                <p>Foto do Vinicius</p>
                <small>Será adicionada em breve</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="about-content-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <p className="about-text-p">
                Tenho uma forte paixão por aprender e encarar desafios, principalmente quando se trata 
                de soluções criativas e inovadoras. Além do desenvolvimento de software, tenho habilidades 
                em diversas áreas como modelagem 3D, análise de CFD (Computational Fluid Dynamics), 
                manuseio de impressoras 3D, cortadoras a laser e manutenção de hardware. Meu foco está 
                em trabalhar bem em equipe e buscar sempre a melhor solução para os problemas técnicos 
                que enfrento.
              </p>

              <div className="skill-category">
                <h3>Soft Skills</h3>
                <div className="skill-items">
                  <span className="skill-item">Trabalho em Equipe</span>
                  <span className="skill-item">Comunicação</span>
                  <span className="skill-item">Gestão de Tempo</span>
                  <span className="skill-item">Trabalho Remoto</span>
                  <span className="skill-item">Resolução de Problemas</span>
                </div>
              </div>
            </div>
            
            <div className="skills-grid">
              <div className="skill-category">
                <h3>Desenvolvimento de Software</h3>
                <div className="skill-items">
                  <span className="skill-item">C#</span>
                  <span className="skill-item">SQL</span>
                  <span className="skill-item">Node.js</span>
                  <span className="skill-item">.NET</span>
                  <span className="skill-item">React</span>
                  <span className="skill-item">React Native</span>
                  <span className="skill-item">JavaScript</span>
                  <span className="skill-item">HTML</span>
                  <span className="skill-item">CSS</span>
                  <span className="skill-item">TypeScript</span>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>Modelagem e Design</h3>
                <div className="skill-items">
                  <span className="skill-item">Modelagem 3D</span>
                  <span className="skill-item">Análise CFD</span>
                  <span className="skill-item">Autodesk Fusion 360</span>
                  <span className="skill-item">CAD/CAM</span>
                  <span className="skill-item">Design Gráfico</span>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>Hardware e Fabricação</h3>
                <div className="skill-items">
                  <span className="skill-item">Impressão 3D</span>
                  <span className="skill-item">Corte a Laser</span>
                  <span className="skill-item">Arduino</span>
                  <span className="skill-item">Robótica</span>
                  <span className="skill-item">Manutenção de Hardware</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="education-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Formação Acadêmica</h2>
            <div className="section-line"></div>
          </div>
          <div className="education-card">
            <div className="education-header">
              <h3>Curso Técnico Integrado em Desenvolvimento de Sistemas</h3>
              <span className="education-period">Jan 2024 - Jul 2025</span>
            </div>
            <div className="education-institution">SENAI/SC - Serviço Nacional de Aprendizagem Industrial</div>
            <p className="education-description">
              Formação com foco em análise, desenvolvimento e manutenção de sistemas e aplicações, 
              com base em práticas atuais do mercado. A grade abrange desde fundamentos da lógica 
              de programação até o desenvolvimento completo de aplicações web e mobile.
            </p>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="certificates-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Certificados e Cursos</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="certificates-carousel">
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
              {certificates.map((cert) => (
                <div key={cert.id} className="certificate-card">
                  <div className="certificate-pdf">
                    {cert.pdf ? (
                      <iframe 
                        src={cert.pdf} 
                        title={cert.name}
                        className="pdf-viewer"
                      />
                    ) : (
                      <div className="pdf-placeholder">
                        <span>📄</span>
                        <p>PDF do Certificado</p>
                        <small>Será adicionado em breve</small>
                      </div>
                    )}
                  </div>
                  
                  <div className="certificate-info">
                    <h4 className="certificate-name">{cert.name}</h4>
                    <div className="certificate-details">
                      <span className="certificate-institution">{cert.institution}</span>
                      <span className="certificate-period">{cert.period}</span>
                    </div>
                    
                    <button 
                      className="expand-btn"
                      onClick={() => showCertDescription(cert)}
                    >
                      <span className="btn-text">Ver Descrição</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="carousel-controls">
              <button 
                className="carousel-btn prev" 
                onClick={prevSlide}
                disabled={currentSlide === 0}
              >
                ‹
              </button>
              <div className="carousel-dots">
                {Array.from({ length: certificates.length - 1 }).map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentSlide(index);
                      scrollToSlide(index);
                    }}
                  />
                ))}
              </div>
              <button 
                className="carousel-btn next" 
                onClick={nextSlide}
                disabled={currentSlide === certificates.length - 2}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="goals-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Objetivos Profissionais</h2>
            <div className="section-line"></div>
          </div>
          <div className="goals-content">
            <p>
              Continuar minha evolução como desenvolvedor, aprender novas tecnologias e colaborar 
              em projetos inovadores. Busco aplicar minhas habilidades técnicas e criativas para 
              resolver problemas complexos, sempre focando na entrega de soluções eficientes e 
              de alta qualidade.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

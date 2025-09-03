import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="gradient-text">Vinícius Duran</span>
            </h1>
            <h2 className="hero-subtitle">Desenvolvedor | React | C# |</h2>
            <p className="hero-description">
              Transformando ideias em experiências digitais incríveis através de código limpo e design inovador
            </p>
            <div className="hero-buttons">
              <a
                href="#projects"
                className="btn btn-primary"
                onClick={(e) => { e.preventDefault(); document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' }); }}
              >
                Ver Projetos
              </a>
              <a
                href="#contact"
                className="btn btn-secondary"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }); }}
              >
                Contato
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card">
              <div className="card-content">
                <div className="tech-stack">
                  <span className="tech-item">React</span>
                  <span className="tech-item">C#</span>
                  <span className="tech-item">Node.js</span>
                  <span className="tech-item">TypeScript</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Sobre Mim</h2>
            <div className="section-line"></div>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p>
                Sou um desenvolvedor apaixonado por criar soluções digitais que fazem a diferença.
                Com experiência em desenvolvimento full-stack, busco sempre aprender novas tecnologias
                e aplicar as melhores práticas em cada projeto.
              </p>
              <p>
                Tenho uma forte paixão por aprender e encarar desafios, principalmente quando se trata de
                soluções criativas e inovadoras. Além do desenvolvimento de software, tenho habilidades
                em diversas áreas como modelagem 3D, análise de CFD (Computational Fluid Dynamics),
                manuseio de impressoras 3D, cortadoras a laser e manutenção de hardware.
              </p>
            </div>
            <div className="skills-grid">
              <div className="skill-category">
                <h3>Frontend</h3>
                <div className="skill-items">
                  <span className="skill-item">React/React Native</span>
                  <span className="skill-item">JavaScript</span>
                  <span className="skill-item">TypeScript</span>
                  <span className="skill-item">CSS</span>
                </div>
              </div>
              <div className="skill-category">
                <h3>Backend</h3>
                <div className="skill-items">
                  <span className="skill-item">C#</span>
                  <span className="skill-item">Node.js</span>
                  <span className="skill-item">Python</span>
                </div>
              </div>
              <div className="skill-category">
                <h3>Banco de Dados</h3>
                <div className="skill-items">
                  <span className="skill-item">SQL Server</span>
                  <span className="skill-item">Azure</span>
                  <span className="skill-item">Git</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Projetos</h2>
            <div className="section-line"></div>
          </div>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image">
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="#" className="project-link">Demo</a>
                    <a href="#" className="project-link">GitHub</a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">E-commerce Platform</h3>
                <p className="project-description">
                  Plataforma completa de e-commerce com sistema de pagamentos,
                  gestão de produtos e painel administrativo.
                </p>
                <div className="project-tech">
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">MongoDB</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="#" className="project-link">Demo</a>
                    <a href="#" className="project-link">GitHub</a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">Task Management App</h3>
                <p className="project-description">
                  Aplicativo de gestão de tarefas com drag & drop,
                  notificações e sincronização em tempo real.
                </p>
                <div className="project-tech">
                  <span className="tech-tag">Vue.js</span>
                  <span className="tech-tag">Firebase</span>
                  <span className="tech-tag">PWA</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">
                <div className="project-overlay">
                  <div className="project-links">
                    <a href="#" className="project-link">Demo</a>
                    <a href="#" className="project-link">GitHub</a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">AI Chat Assistant</h3>
                <p className="project-description">
                  Assistente virtual inteligente integrado com APIs de IA
                  para atendimento automatizado e suporte ao cliente.
                </p>
                <div className="project-tech">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">OpenAI</span>
                  <span className="tech-tag">FastAPI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Contato e Social</h2>
            <div className="section-line"></div>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <a href="mailto:metaemarketing2@gmail.com" className="contact-link">
                    metaemarketing2@gmail.com
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">💼</div>
                <div className="contact-details">
                  <h4>LinkedIn</h4>
                  <a href="https://linkedin.com/in/vinicius-duran" target="_blank" rel="noopener noreferrer" className="contact-link">
                    linkedin.com/in/vinicius-duran
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🐙</div>
                <div className="contact-details">
                  <h4>GitHub</h4>
                  <a href="https://github.com/vinicius-duran" target="_blank" rel="noopener noreferrer" className="contact-link">
                    github.com/viniciusduran
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; {new Date().getFullYear()} Vinícius Duran. Todos os direitos reservados.</p>
            <div className="footer-social">
              <a href="https://github.com/vinicius-duran" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
              <a href="https://linkedin.com/in/vinicius-duran" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
              <a href="mailto:metaemarketing2@gmail.com" className="social-link">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Frame from '../../components/Frame/Frame';
import {
  useGsapScope,
  buildIntro,
  buildOnScroll,
  revealStack,
  playOnEnter,
  gsap,
  reducedMotion,
} from '../../lib/motion';
import { certificates } from '../../data/certificates';
import { education } from '../../data/education';
import { skillGroups } from '../../data/skills';
import { profile, getYearsOfExperience, formatExperience } from '../../data/profile';
import './About.css';

const goals = [
  { when: '2026', what: 'Aprofundar em arquitetura .NET e sistemas distribuídos' },
  { when: 'Curto prazo', what: 'Contribuir em produtos com motion design e UX rico' },
  { when: 'Sempre', what: 'Continuar aprendendo e compartilhando conhecimento' },
];

const About = () => {
  const anosDeExperiencia = getYearsOfExperience();
  const [openCert, setOpenCert] = useState(null);
  const dialogRef = useRef(null);

  const root = useGsapScope((self) => {
    const el = (selector) => self.selector(selector)[0];
    const all = (selector) => self.selector(selector);

    buildIntro(el('.about-hero'));

    all('[data-build-step]').forEach((section) => {
      if (!section.classList.contains('about-hero')) buildOnScroll(section);
    });

    /* O trilho da formação cresce com a rolagem, e cada curso entra em
       seguida: a seção estava sem movimento nenhum e lia como página parada
       no meio de um site que se move. */
    const trilho = el('.education-rail-fill');
    if (trilho && !reducedMotion()) {
      gsap.fromTo(
        trilho,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el('.education-list'),
            start: 'top 78%',
            end: 'bottom 72%',
            scrub: 0.6,
          },
        }
      );
    }

    playOnEnter(
      el('.education-list'),
      revealStack(all('.education-entry'), { delayStep: 130, distance: 26 })
    );

    playOnEnter(el('.toolbox'), revealStack(all('.toolbox-entry'), { delayStep: 55 }));
    playOnEnter(el('.credential-list'), revealStack(all('.credential'), { delayStep: 45 }));
    playOnEnter(el('.goal-list'), revealStack(all('.goal'), { delayStep: 80 }));
  });

  /* <dialog> nativo: o navegador já entrega foco preso, Escape e camada
     superior. Só precisamos manter o estado do React em sincronia. */
  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return undefined;

    if (openCert && !node.open) node.showModal();
    if (!openCert && node.open) node.close();

    const onClose = () => setOpenCert(null);
    node.addEventListener('close', onClose);
    return () => node.removeEventListener('close', onClose);
  }, [openCert]);

  return (
    <div className="about-page" ref={root}>
      {/* ---------------------------------------------------------------- */}
      <section className="about-hero" data-build-step="about.jsx">
        <div className="shell">
          <div className="part">
            <Frame tag="h1 · about" />
            <h1 className="about-hero-title display" data-build-headline>
              Sobre mim, linhas de código e <em>curiosidade</em>.
            </h1>
          </div>

          <div className="part about-hero-foot">
            <Frame tag="section · record" />
            <p className="lede">
              Desenvolvedor full-stack com {formatExperience()} — APIs, manutenção de
              projetos em produção e construção de interfaces. Trabalho fluentemente
              com C#, SQL, Node.js, .NET, React e CSS, e estudo segurança cibernética
              em duas frentes ao mesmo tempo, porque sistema que ninguém defende não
              está pronto.
            </p>

            <dl className="about-record">
              <div>
                <dt>Base</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>Experiência</dt>
                <dd>+{anosDeExperiencia} anos</dd>
              </div>
              <div>
                <dt>Disponível</dt>
                <dd>Para novos projetos</dd>
              </div>
              <div>
                <dt>Certificações</dt>
                <dd>{String(certificates.length).padStart(2, '0')}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="toolbox-section" data-build-step="stack.jsx">
        <div className="shell">
          <div className="part">
            <Frame tag="h2 · stack" />
            <h2 className="section-title">
              Toolbox técnica em <em>camadas</em>.
            </h2>
          </div>

          <p className="lede toolbox-lede">
            Tenho uma forte paixão por aprender e encarar desafios — principalmente quando
            se trata de soluções criativas. Além do desenvolvimento, atuo em modelagem 3D,
            análise CFD, impressão 3D, corte a laser e manutenção de hardware.
          </p>

          <div className="toolbox">
            {skillGroups.map((group) => (
              <div className="toolbox-entry" key={group.label}>
                <h3 className="toolbox-label">{group.label}</h3>
                <ul className="toolbox-items">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="education" data-build-step="education.jsx">
        <div className="shell">
          <div className="part">
            <Frame tag="h2 · education" />
            <h2 className="section-title">
              Formação <em>acadêmica</em>
            </h2>
          </div>

          <ol className="education-list">
            {/* O trilho é desenhado pela rolagem e liga as três formações numa
                linha do tempo, em vez de deixá-las como blocos soltos. */}
            <span className="education-rail" aria-hidden="true">
              <span className="education-rail-fill" />
            </span>

            {education.map((curso) => (
              <li className="education-entry" key={curso.id}>
                <div className="education-side">
                  <p className="education-period">{curso.period}</p>
                  <p className="education-level">{curso.level}</p>
                  {curso.ongoing && (
                    <p className="education-ongoing">
                      <span className="education-ongoing-dot" aria-hidden="true" />
                      Cursando
                    </p>
                  )}
                </div>

                <div className="education-body-col">
                  <h3 className="education-title">{curso.course}</h3>
                  <p className="education-place">{curso.institution}</p>
                  <p className="education-body">{curso.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="credentials" data-build-step="certificates.jsx">
        <div className="shell">
          <div className="part">
            <Frame tag="h2 · certificates" />
            <h2 className="section-title">
              Certificados e <em>cursos</em>
            </h2>
          </div>

          <ul className="credential-list">
            {certificates.map((cert, index) => (
              <li className="credential" key={cert.id}>
                <button
                  type="button"
                  className="credential-button"
                  onClick={() => setOpenCert(cert)}
                >
                  <span className="credential-n">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="credential-main">
                    <span className="credential-name">{cert.name}</span>
                    <span className="credential-place">{cert.institution}</span>
                  </span>
                  <span className="credential-period">{cert.period}</span>
                  <span className="credential-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="goals" data-build-step="goals.jsx">
        <div className="shell">
          <div className="part">
            <Frame tag="h2 · goals" />
            <h2 className="section-title">
              Objetivos <em>profissionais</em>
            </h2>
          </div>

          <p className="lede goals-lede">
            Continuar minha evolução como desenvolvedor, aprender novas tecnologias e
            colaborar em projetos inovadores. Busco aplicar minhas habilidades técnicas e
            criativas para resolver problemas complexos, sempre focando na entrega de
            soluções eficientes e de alta qualidade.
          </p>

          <ul className="goal-list">
            {goals.map((goal) => (
              <li className="goal" key={goal.when}>
                <span className="goal-when">{goal.when}</span>
                <span className="goal-what">{goal.what}</span>
              </li>
            ))}
          </ul>

          <Link to="/#contact" className="btn btn-solid goals-cta">
            Falar comigo
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <dialog className="cert-dialog" ref={dialogRef}>
        {openCert && (
          <div className="cert-dialog-inner">
            <header className="cert-dialog-head">
              <div>
                <h2 className="cert-dialog-title">{openCert.name}</h2>
                <p className="cert-dialog-meta">
                  {openCert.institution} · {openCert.period}
                </p>
              </div>
              <button
                type="button"
                className="cert-dialog-close"
                onClick={() => setOpenCert(null)}
              >
                Fechar
              </button>
            </header>

            <div className="cert-dialog-body">
              <iframe
                className="cert-dialog-pdf"
                src={openCert.pdf}
                title={`Certificado — ${openCert.name}`}
              />

              <div className="cert-dialog-side">
                <p className="cert-dialog-description">{openCert.description}</p>

                <h3 className="cert-dialog-subhead">Habilidades</h3>
                <ul className="cert-dialog-skills">
                  {openCert.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>

                <a
                  className="link cert-dialog-download"
                  href={openCert.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Abrir o PDF em nova aba</span>
                  <span className="link-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default About;

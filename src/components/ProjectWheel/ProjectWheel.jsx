import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useGsapScope,
  gsap,
  ScrollTrigger,
  reducedMotion,
} from '../../lib/motion';
import { featuredProjects } from '../../data/projects';
import './ProjectWheel.css';

/**
 * Roda de projetos: as cartas distribuídas num anel e giradas no eixo Y.
 *
 * É CSS 3D, e não WebGL. A referência que originou isto usa Three.js para
 * espalhar as capas numa esfera; com seis projetos um anel diz a mesma coisa,
 * fica legível em vez de decorativo, e não custa uma biblioteca de 3D inteira
 * num site cujo bundle já carrega GSAP e anime.js.
 *
 * A rotação é função de UMA coisa: a posição da rolagem dentro do intervalo
 * da seção. Setas e arrasto também escrevem nessa mesma posição, então não
 * existem duas fontes de verdade brigando pelo ângulo.
 */
const ProjectWheel = () => {
  const [ativo, setAtivo] = useState(0);
  const total = featuredProjects.length;
  const passoAngular = 360 / total;
  const anel = useRef(null);

  /* Exige `pin`: o leitor de build também registra um gatilho nesta mesma
     seção, e sem esse filtro as setas passariam a mirar o intervalo dele. */
  const gatilho = () => {
    const secao = document.querySelector('.wheel-section');
    if (!secao) return null;
    return ScrollTrigger.getAll().find((t) => t.pin && t.trigger === secao) || null;
  };

  const raiz = useGsapScope((self) => {
    /* O seletor do contexto procura DENTRO do escopo, e o escopo é a própria
       seção — `self.selector('.wheel-section')` volta vazio. A seção vem do
       documento; os filhos continuam vindo do escopo. */
    const secao = document.querySelector('.wheel-section');
    const roda = self.selector('.wheel')[0];
    const cartas = self.selector('.wheel-card');
    if (!secao || !roda || !cartas.length) return;

    if (reducedMotion()) {
      // Sem movimento: o anel vira uma grade legível, tratada no CSS.
      secao.dataset.estatico = 'true';
      return;
    }

    const estado = { giro: 0 };

    /* Uma volta completa por travessia. Cada carta passa pela frente uma vez,
       e o fim do intervalo coincide com o começo — não há salto. */
    const aplicar = () => {
      roda.style.transform = `rotateX(-7deg) rotateY(${estado.giro}deg)`;

      cartas.forEach((carta, i) => {
        // Ângulo da carta em relação a quem olha.
        const theta = ((i * passoAngular + estado.giro) % 360 + 360) % 360;
        const radianos = (theta * Math.PI) / 180;
        // 1 de frente, -1 atrás. É o que gradua nitidez e presença.
        const frente = Math.cos(radianos);

        const proximidade = (frente + 1) / 2;
        carta.style.opacity = String(0.18 + proximidade * 0.82);
        carta.style.filter = `blur(${(1 - proximidade) * 3.2}px)`;
        carta.style.zIndex = String(Math.round(proximidade * 100));
      });

      const indice = ((Math.round(-estado.giro / passoAngular) % total) + total) % total;
      setAtivo((anterior) => (anterior === indice ? anterior : indice));
    };

    /* `onUpdate` fica no TWEEN, e não no ScrollTrigger. Com scrub quem muda
       o ângulo é o tween, que continua suavizando depois que a rolagem para;
       pendurado no gatilho, o desenho lê o valor antes da suavização aplicar
       e a roda fica parada num ângulo só. */
    gsap.to(estado, {
      giro: -360,
      ease: 'none',
      onUpdate: aplicar,
      scrollTrigger: {
        trigger: secao,
        start: 'top top',
        end: () => `+=${window.innerHeight * 2.4}`,
        pin: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // Última da página entre os pins: mede depois de manifesto e processo.
        refreshPriority: 1,
        onRefresh: aplicar,
      },
    });

    aplicar();

    /* A roda é montada por um componente diferente do que monta os pins de
       cima. Um refresh depois de todos existirem é o que garante que a ordem
       de prioridade seja de fato aplicada. */
    ScrollTrigger.refresh();
  }, []);

  /* Setas e arrasto movem a rolagem dentro do intervalo da seção, nunca fora
     dele: é o mesmo limite da galeria antiga, pelo mesmo motivo — sem ele o
     controle da roda vira rolagem geral do site. */
  const limitar = (alvo) => {
    const st = gatilho();
    if (!st) return null;
    return Math.min(Math.max(alvo, st.start), st.end);
  };

  const girar = (direcao) => {
    const st = gatilho();
    if (!st) return;
    const passo = (st.end - st.start) / total;
    const alvo = limitar(window.scrollY + passo * direcao);
    if (alvo !== null) window.scrollTo({ top: alvo, behavior: 'smooth' });
  };

  const arrasto = useRef({ ativo: false, x: 0, andou: 0 });

  const aoPressionar = (event) => {
    if (event.button !== 0) return;
    arrasto.current = { ativo: true, x: event.clientX, andou: 0 };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const aoMover = (event) => {
    if (!arrasto.current.ativo) return;
    const delta = event.clientX - arrasto.current.x;
    arrasto.current.x = event.clientX;
    arrasto.current.andou += Math.abs(delta);

    const alvo = limitar(window.scrollY - delta * 1.6);
    if (alvo !== null) window.scrollTo({ top: alvo });
  };

  const aoSoltar = (event) => {
    arrasto.current.ativo = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  // Um arrasto termina em clique no link sob o ponteiro; o limiar separa os dois.
  const aoClicar = (event) => {
    if (arrasto.current.andou > 8) {
      event.preventDefault();
      arrasto.current.andou = 0;
    }
  };

  const projetoAtivo = featuredProjects[ativo];

  return (
    <section
      id="projects"
      className="wheel-section"
      data-build-step="projects.jsx"
      ref={raiz}
    >
      <div className="shell wheel-head">
        <h2 className="section-title">
          Trabalho <em>selecionado</em>
        </h2>

        <div className="wheel-nav">
          <p className="wheel-hint">Arraste ou use as setas</p>
          <button
            type="button"
            className="wheel-nav-btn"
            onClick={() => girar(-1)}
            aria-label="Projeto anterior"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="wheel-nav-btn"
            onClick={() => girar(1)}
            aria-label="Próximo projeto"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div
        className="wheel-stage"
        onPointerDown={aoPressionar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
      >
        <div className="wheel" ref={anel}>
          {featuredProjects.map((project, i) => (
            <article
              className="wheel-card"
              key={project.id}
              style={{ '--giro-carta': `${i * passoAngular}deg` }}
            >
              <Link
                to={`/projects/${project.slug}`}
                className="wheel-card-link"
                onClick={aoClicar}
                draggable={false}
                tabIndex={i === ativo ? 0 : -1}
                aria-hidden={i === ativo ? undefined : 'true'}
              >
                <figure className="wheel-card-cover">
                  {project.cover ? (
                    <img src={project.cover} alt="" loading="lazy" />
                  ) : (
                    <span className="wheel-card-blank" aria-hidden="true">
                      {project.id}
                    </span>
                  )}
                </figure>
                <span className="wheel-card-index">{project.id}</span>
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* Leitura do projeto na frente. É aqui que a roda vira informação: sem
          isto ela seria bonita e muda. */}
      <div className="shell wheel-readout">
        <p className="wheel-readout-n">{projetoAtivo.id}</p>
        <h3 className="wheel-readout-title">{projetoAtivo.title}</h3>
        <p className="wheel-readout-meta">
          {projetoAtivo.role} · {projetoAtivo.year}
        </p>
        <p className="wheel-readout-tech">{projetoAtivo.tech.join(' · ')}</p>
        <Link to={`/projects/${projetoAtivo.slug}`} className="link wheel-readout-link">
          <span>Ver o projeto</span>
          <span className="link-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
};

export default ProjectWheel;

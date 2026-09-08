import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGsapScope, gsap, ScrollTrigger, reducedMotion } from '../../lib/motion';
import { projects } from '../../data/projects';
import './ProjectWheel.css';

/**
 * Globo de projetos: as capas distribuídas na superfície de uma esfera que
 * gira. CSS 3D, sem WebGL.
 *
 * A referência (bleibtgleich.dev) faz isso em Three.js. Aqui a esfera é
 * construída com transformações encadeadas: `rotateY(lon) rotateX(-lat)
 * translateZ(raio)` leva cada carta ao ponto certo da superfície já com a
 * face apontando para fora, que é o que dá a inclinação das cartas laterais.
 */

/* Distribuição em espiral de Fibonacci: pontos espaçados de forma pareja na
   esfera. Anéis de latitude fixa deixariam aglomerado nos polos. */
const distribuir = (quantidade) => {
  const anguloDourado = Math.PI * (3 - Math.sqrt(5));

  return Array.from({ length: quantidade }, (_, i) => {
    // De 1 (polo norte) a -1 (polo sul), evitando os polos exatos.
    const y = quantidade === 1 ? 0 : 1 - (i / (quantidade - 1)) * 1.72 - 0.14;
    const theta = anguloDourado * i;

    /* Latitudes comprimidas a 0.78: a esfera fica levemente oblata e cabe na
       faixa entre o título e a leitura. Sem isso as cartas do topo encostam
       no "Trabalho selecionado". Continua lendo como globo. */
    return {
      lat: ((Math.asin(Math.max(-1, Math.min(1, y))) * 180) / Math.PI) * 0.78,
      lon: ((theta * 180) / Math.PI) % 360,
    };
  });
};

const ProjectWheel = () => {
  const [ativo, setAtivo] = useState(0);
  const pontos = useMemo(() => distribuir(projects.length), []);

  /* Três parcelas somam o ângulo: a rolagem conduz, a inércia mantém vivo
     parado, e o arrasto é o que a mão faz. Vive num ref para que os
     manipuladores de ponteiro cheguem nele fora do contexto do GSAP. */
  const estado = useRef({ rolagem: 0, inercia: 0, arrasto: 0 });
  const desenhar = useRef(null);

  const raiz = useGsapScope((self) => {
    /* O seletor do contexto procura DENTRO do escopo, e o escopo é a própria
       seção — buscá-la por ele volta vazio. */
    const secao = document.querySelector('.globe-section');
    const globo = self.selector('.globe')[0];
    const cartas = self.selector('.globe-card');
    if (!secao || !globo || !cartas.length) return;

    if (reducedMotion()) {
      secao.dataset.estatico = 'true';
      return;
    }

    const valores = estado.current;

    const aplicar = () => {
      const giro = valores.rolagem + valores.inercia + valores.arrasto;
      globo.style.transform = `rotateX(-12deg) rotateY(${giro}deg)`;

      let melhor = 0;
      let melhorFrente = -2;

      cartas.forEach((carta, i) => {
        const { lat, lon } = pontos[i];
        const rad = (v) => (v * Math.PI) / 180;

        /* Componente Z da normal da carta depois do giro. cos(lat) achata a
           contribuição de quem está perto dos polos, que é o que faz o polo
           parecer polo e não borda de disco. */
        const frente = Math.cos(rad(lat)) * Math.cos(rad(lon + giro));
        const proximidade = (frente + 1) / 2;

        /* O piso é alto o bastante para as cartas do fundo continuarem
           visíveis: sobre um fundo escuro, apagar até quase zero desmancha a
           esfera e sobram três cartas soltas no vazio. */
        carta.style.opacity = String(0.24 + proximidade * 0.76);
        carta.style.filter = `blur(${(1 - proximidade) * 2.6}px)`;
        carta.style.zIndex = String(Math.round(proximidade * 100));

        if (frente > melhorFrente) {
          melhorFrente = frente;
          melhor = i;
        }
      });

      // A carta da frente se marca: é o elo visual com a leitura embaixo.
      cartas.forEach((carta, i) => carta.classList.toggle('is-front', i === melhor));

      setAtivo((anterior) => (anterior === melhor ? anterior : melhor));
    };

    // Os manipuladores de ponteiro precisam redesenhar fora deste contexto.
    desenhar.current = aplicar;

    /* Giro contínuo, independente da rolagem: um globo parado quando a página
       está parada lê como imagem, não como objeto. */
    gsap.to(valores, {
      inercia: 360,
      duration: 90,
      ease: 'none',
      repeat: -1,
      onUpdate: aplicar,
    });

    // Uma volta e meia ao atravessar a seção, somada à inércia.
    gsap.to(valores, {
      rolagem: -540,
      ease: 'none',
      onUpdate: aplicar,
      scrollTrigger: {
        trigger: secao,
        start: 'top top',
        end: () => `+=${window.innerHeight * 2.6}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // Último pin da página: mede depois do manifesto e do baralho.
        refreshPriority: 1,
      },
    });

    aplicar();

    /* O globo é montado por um componente diferente do que monta os pins de
       cima. Um refresh depois de todos existirem aplica a ordem de fato. */
    ScrollTrigger.refresh();
  }, []);

  /* Setas e arrasto giram o globo direto, e não a rolagem da página. Mexer na
     rolagem funcionava, mas arrastar empurrava a página meio milhar de pixels
     e o giro chegava atrasado pelo scrub — parecia arrastar a página, não
     agarrar o objeto. Escrevendo no ângulo, a resposta é imediata e a página
     fica parada onde está. */

  const girar = (direcao) => {
    const valores = estado.current;
    gsap.to(valores, {
      arrasto: valores.arrasto - direcao * (360 / projects.length),
      duration: 0.9,
      ease: 'power3.out',
      overwrite: 'auto',
      onUpdate: () => desenhar.current?.(),
    });
  };

  const arrasto = useRef({ ativo: false, x: 0, andou: 0, velocidade: 0 });

  const aoPressionar = (event) => {
    if (event.button !== 0) return;
    // Um arrasto novo interrompe a inércia do anterior.
    gsap.killTweensOf(estado.current, 'arrasto');
    arrasto.current = { ativo: true, x: event.clientX, andou: 0, velocidade: 0 };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const aoMover = (event) => {
    if (!arrasto.current.ativo) return;
    const delta = event.clientX - arrasto.current.x;
    arrasto.current.x = event.clientX;
    arrasto.current.andou += Math.abs(delta);
    // Graus por pixel: o suficiente para a travessia da tela dar meia volta.
    arrasto.current.velocidade = delta * 0.22;

    estado.current.arrasto += arrasto.current.velocidade;
    desenhar.current?.();
  };

  const aoSoltar = (event) => {
    if (!arrasto.current.ativo) return;
    arrasto.current.ativo = false;
    event.currentTarget.releasePointerCapture?.(event.pointerId);

    /* Continua girando com a velocidade que a mão deixou e desacelera. Sem
       isso o globo trava no instante em que o dedo levanta, que é a diferença
       entre um objeto com massa e um controle deslizante. */
    const restante = arrasto.current.velocidade * 14;
    if (Math.abs(restante) < 1) return;

    gsap.to(estado.current, {
      arrasto: estado.current.arrasto + restante,
      duration: 1.4,
      ease: 'power3.out',
      overwrite: 'auto',
      onUpdate: () => desenhar.current?.(),
    });
  };

  // Um arrasto termina em clique no link sob o ponteiro; o limiar separa os dois.
  const aoClicar = (event) => {
    if (arrasto.current.andou > 8) {
      event.preventDefault();
      arrasto.current.andou = 0;
    }
  };

  const projetoAtivo = projects[ativo];

  return (
    <section
      id="projects"
      className="globe-section"
      data-build-step="projects.jsx"
      ref={raiz}
    >
      <div className="shell globe-head">
        <h2 className="section-title">
          Trabalho <em>selecionado</em>
        </h2>

        <div className="globe-nav">
          <p className="globe-hint">Arraste ou use as setas</p>
          <button
            type="button"
            className="globe-nav-btn"
            onClick={() => girar(-1)}
            aria-label="Projeto anterior"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="globe-nav-btn"
            onClick={() => girar(1)}
            aria-label="Próximo projeto"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div
        className="globe-stage"
        onPointerDown={aoPressionar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
      >
        <div className="globe">
          {projects.map((project, i) => (
            <article
              className="globe-card"
              key={project.id}
              style={{
                '--lat': `${pontos[i].lat}deg`,
                '--lon': `${pontos[i].lon}deg`,
              }}
            >
              <Link
                to={project.featured ? `/projects/${project.slug}` : project.repo}
                target={project.featured ? undefined : '_blank'}
                rel={project.featured ? undefined : 'noopener noreferrer'}
                className="globe-card-link"
                onClick={aoClicar}
                draggable={false}
                tabIndex={i === ativo ? 0 : -1}
                aria-hidden={i === ativo ? undefined : 'true'}
              >
                {/* Moldura de navegador: é o que faz nove capturas soltas
                    lerem como nove sites, e dá casa para as que não têm
                    captura em vez de deixá-las como retângulo vazio. */}
                <span className="globe-card-chrome" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <em>{project.id}</em>
                </span>

                <span className="globe-card-screen">
                  {project.cover ? (
                    <img src={project.cover} alt="" loading="lazy" />
                  ) : (
                    <span className="globe-card-fallback" aria-hidden="true">
                      <strong>{project.title}</strong>
                      <small>{project.tech.join(' · ')}</small>
                    </span>
                  )}
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* Leitura do projeto de frente: é o que transforma o globo de enfeite
          em navegação. */}
      <div className="shell globe-readout">
        <p className="globe-readout-n">{projetoAtivo.id}</p>
        <h3 className="globe-readout-title">{projetoAtivo.title}</h3>
        <p className="globe-readout-meta">
          {projetoAtivo.role} · {projetoAtivo.year}
        </p>
        <p className="globe-readout-tech">{projetoAtivo.tech.join(' · ')}</p>
        <Link
          to={projetoAtivo.featured ? `/projects/${projetoAtivo.slug}` : '/#projects'}
          className="link globe-readout-link"
        >
          <span>{projetoAtivo.featured ? 'Ver o projeto' : 'Repositório'}</span>
          <span className="link-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
};

export default ProjectWheel;

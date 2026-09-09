import React, { useMemo, useRef, useState } from 'react';
import { useGsapScope, spinDrag, gsap, reducedMotion } from '../../lib/motion';
import { anguloMaisProximo } from './angulo';
import { certificates } from '../../data/certificates';
import './CertificateWheel.css';

/**
 * Roda de certificados: as placas distribuídas num anel deitado que gira.
 *
 * É o mesmo motor do globo de projetos, com a esfera trocada por um círculo —
 * uma latitude só. Os certificados não têm capa, então o que gira é
 * tipografia, e um anel de plaquinhas lê melhor que capas de texto espalhadas
 * numa superfície esférica.
 *
 * Diferente do globo, esta seção NÃO prende a rolagem. Um segundo pin na
 * página cobraria mais duas telas de rolagem para atravessar uma lista, e a
 * ordem de medição dos pins já é a parte frágil deste site.
 */

const PASSO = 360 / certificates.length;

const CertificateWheel = ({ onOpen }) => {
  const [ativo, setAtivo] = useState(0);

  /* Três parcelas somam o ângulo: a rolagem conduz, a deriva mantém a roda
     viva com a página parada, e o arrasto é o que a mão faz. */
  const estado = useRef({ rolagem: 0, deriva: 0, arrasto: 0 });
  const desenhar = useRef(null);
  const derivaTween = useRef(null);
  // Quanto a mão andou no arrasto corrente: separa girar de clicar.
  const andou = useRef(0);

  const raiz = useGsapScope((self) => {
    const secao = document.querySelector('.cert-wheel-section');
    const anel = self.selector('.cert-wheel')[0];
    const cartas = self.selector('.cert-card');
    if (!secao || !anel || !cartas.length) return;

    if (reducedMotion()) {
      secao.dataset.estatico = 'true';
      return;
    }

    const valores = estado.current;

    const aplicar = () => {
      const giro = valores.rolagem + valores.deriva + valores.arrasto;
      anel.style.transform = `rotateX(-9deg) rotateY(${giro}deg)`;

      let melhor = 0;
      let melhorFrente = -2;

      cartas.forEach((carta, i) => {
        // Anel: uma latitude só, então a frente é o cosseno da longitude.
        const frente = Math.cos(((i * PASSO + giro) * Math.PI) / 180);
        const proximidade = (frente + 1) / 2;

        carta.style.opacity = String(0.16 + proximidade * 0.84);
        carta.style.filter = `blur(${(1 - proximidade) * 2.4}px)`;
        carta.style.zIndex = String(Math.round(proximidade * 100));

        if (frente > melhorFrente) {
          melhorFrente = frente;
          melhor = i;
        }
      });

      cartas.forEach((carta, i) => carta.classList.toggle('is-front', i === melhor));
      setAtivo((anterior) => (anterior === melhor ? anterior : melhor));
    };

    desenhar.current = aplicar;

    // Deriva contínua: roda parada com a página parada lê como imagem.
    derivaTween.current = gsap.to(valores, {
      deriva: 360,
      duration: 120,
      ease: 'none',
      repeat: -1,
      onUpdate: aplicar,
    });

    /* Meia volta ao atravessar a seção. Sem pin: a rolagem passa direto e a
       roda acompanha, em vez de a página parar para ela. */
    gsap.to(valores, {
      rolagem: -180,
      ease: 'none',
      onUpdate: aplicar,
      scrollTrigger: {
        trigger: secao,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    aplicar();
  }, []);

  const arrasto = useMemo(
    () =>
      spinDrag(estado.current, (pixels = 0) => {
        andou.current += pixels;
        desenhar.current?.();
      }),
    []
  );

  /* Leva uma carta à frente pelo caminho mais curto: o alvo é o arrasto que
     zera a longitude dela, na volta mais perto de onde a roda já está. */
  const irPara = (indice) => {
    const valores = estado.current;
    const bruto = -indice * PASSO - (valores.rolagem + valores.deriva);

    gsap.to(valores, {
      arrasto: anguloMaisProximo(valores.arrasto, bruto),
      duration: 0.9,
      ease: 'power3.out',
      overwrite: 'auto',
      onUpdate: () => desenhar.current?.(),
    });
  };

  const girar = (direcao) => {
    const valores = estado.current;
    gsap.to(valores, {
      arrasto: valores.arrasto - direcao * PASSO,
      duration: 0.7,
      ease: 'power3.out',
      overwrite: 'auto',
      onUpdate: () => desenhar.current?.(),
    });
  };

  const certificado = certificates[ativo];

  return (
    <div className="cert-wheel-section" ref={raiz}>
      <div className="cert-wheel-nav">
        <p className="cert-wheel-hint">Arraste ou use as setas</p>
        <button
          type="button"
          className="wheel-nav-btn"
          onClick={() => girar(-1)}
          aria-label="Certificado anterior"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className="wheel-nav-btn"
          onClick={() => girar(1)}
          aria-label="Próximo certificado"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div
        className="cert-wheel-stage"
        {...arrasto}
        onPointerDown={(event) => {
          andou.current = 0;
          arrasto.onPointerDown(event);
        }}
        /* A deriva para enquanto a mão está sobre a roda: ler um texto que
           se afasta sozinho é a diferença entre vivo e inquieto. */
        onPointerEnter={() => derivaTween.current?.pause()}
        onPointerLeave={() => derivaTween.current?.resume()}
      >
        {/* A contagem chega ao CSS: é dela que sai o raio do anel. */}
        <ul className="cert-wheel" style={{ '--total': certificates.length }}>
          {certificates.map((cert, i) => (
            <li
              className="cert-card"
              key={cert.id}
              style={{ '--lon': `${i * PASSO}deg` }}
            >
              <button
                type="button"
                className="cert-card-face"
                /* Girar não é clicar: só abre se a mão praticamente não
                   andou entre o pressionar e o soltar. */
                onClick={() => andou.current < 4 && onOpen(cert)}
                /* Chegar por teclado traz a carta à frente — sem isso o foco
                   pousaria numa placa desfocada nas costas do anel. */
                onFocus={() => irPara(i)}
              >
                <span className="cert-card-n">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="cert-card-name">{cert.name}</span>
                <span className="cert-card-place">{cert.institution}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Leitura do certificado à frente: é o que transforma a roda em
          navegação, e é onde ela diz o que a placa não cabe. */}
      <div className="cert-wheel-readout" aria-live="polite">
        <p className="cert-wheel-readout-n">
          {String(ativo + 1).padStart(2, '0')} / {certificates.length}
        </p>
        <h3 className="cert-wheel-readout-title">{certificado.name}</h3>
        <p className="cert-wheel-readout-meta">
          {certificado.institution} · {certificado.period}
        </p>
        <ul className="cert-wheel-readout-skills">
          {certificado.skills.slice(0, 5).map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <button
          type="button"
          className="link cert-wheel-readout-link"
          onClick={() => onOpen(certificado)}
        >
          <span>Ver o certificado</span>
          <span className="link-arrow" aria-hidden="true">
            →
          </span>
        </button>
      </div>
    </div>
  );
};

export default CertificateWheel;

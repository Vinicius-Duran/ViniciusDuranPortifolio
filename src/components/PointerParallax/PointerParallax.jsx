import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pointerParallax } from '../../lib/motion';

/**
 * Paralaxe do ponteiro para o site inteiro.
 *
 * Um sistema só, no nível da aplicação, em vez de um por seção: qualquer
 * elemento que declare `data-parallax` entra, venha de onde vier. A área de
 * referência é a janela, então o centro do gesto é o centro da tela — o que
 * é o certo para camadas fixas e continua correto para as que rolam.
 *
 * Elementos que também declaram `data-tilt` giram nos próprios eixos além de
 * deslizar.
 *
 * Não renderiza nada: existe só pelo efeito.
 */
const PointerParallax = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    /* A consulta acontece depois da rota montar, e de novo a cada troca:
       cada página traz o seu próprio conjunto de camadas. */
    const alvos = document.querySelectorAll('[data-parallax]');
    if (!alvos.length) return undefined;

    return pointerParallax(document.documentElement, alvos);
  }, [pathname]);

  return null;
};

export default PointerParallax;

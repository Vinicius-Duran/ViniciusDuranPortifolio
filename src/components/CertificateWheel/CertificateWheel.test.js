import { describe, it, expect } from 'vitest';
import { anguloMaisProximo } from './angulo.js';

describe('anguloMaisProximo', () => {
  it('nunca faz a roda andar mais que meia volta', () => {
    const casos = [
      [0, 350],
      [0, -350],
      [720, 15],
      [-1000, 37],
      [123.456, -900.1],
    ];

    for (const [atual, alvo] of casos) {
      expect(Math.abs(anguloMaisProximo(atual, alvo) - atual)).toBeLessThanOrEqual(180);
    }
  });

  it('mantém o alvo no mesmo ponto do círculo', () => {
    for (const [atual, alvo] of [
      [0, 350],
      [720, 15],
      [-1000, 37],
    ]) {
      const ajustado = anguloMaisProximo(atual, alvo);
      // A diferença é sempre um número inteiro de voltas.
      expect(Math.abs(((ajustado - alvo) / 360) % 1)).toBeLessThan(1e-9);
    }
  });

  it('vai para trás quando a carta está atrás, e não pela volta longa', () => {
    // 350° à frente é o mesmo que 10° atrás.
    expect(anguloMaisProximo(0, 350)).toBe(-10);
  });

  it('não mexe no alvo que já é o mais perto', () => {
    expect(anguloMaisProximo(0, 20)).toBe(20);
    expect(anguloMaisProximo(0, -20)).toBe(-20);
  });
});

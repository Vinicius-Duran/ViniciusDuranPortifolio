import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const css = readFileSync(resolve('src/index.css'), 'utf8');

describe('acessibilidade no CSS base', () => {
  it('respeita prefers-reduced-motion', () => {
    expect(css).toMatch(/@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/);
  });

  it('define indicador de foco visível', () => {
    expect(css).toMatch(/:focus-visible/);
  });
});

describe('carrossel de certificados', () => {
  it('não usa largura de cartão fixa em pixel', () => {
    const src = readFileSync(resolve('src/pages/about/About.jsx'), 'utf8');
    expect(src).not.toMatch(/const\s+cardWidth\s*=\s*\d+\s*;/);
  });
});

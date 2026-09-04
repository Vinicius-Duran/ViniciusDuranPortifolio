import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readme = readFileSync(resolve('README.md'), 'utf8');

describe('README', () => {
  it('não descreve o projeto de gramática inglesa', () => {
    expect(readme).not.toMatch(/Perfect English Grammar/i);
    expect(readme).not.toMatch(/exercícios de gramática/i);
  });

  it('descreve este portfólio', () => {
    expect(readme).toMatch(/portf[óo]lio/i);
    expect(readme).toMatch(/Vinicius Duran/);
  });

  it('documenta os scripts que existem de fato', () => {
    for (const script of ['npm run dev', 'npm run build', 'npm run lint', 'npm test']) {
      expect(readme, script).toContain(script);
    }
  });
});

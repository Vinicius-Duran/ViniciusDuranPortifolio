import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const collectJsx = (dir, acc = []) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) collectJsx(full, acc);
    else if (full.endsWith('.jsx')) acc.push(full);
  }
  return acc;
};

const jsxFiles = collectJsx(resolve('src'));

describe('dados de contato', () => {
  it('encontra arquivos JSX para inspecionar', () => {
    expect(jsxFiles.length).toBeGreaterThan(0);
  });

  it('não deixa endereço de e-mail literal em JSX', () => {
    const offenders = jsxFiles.filter((f) =>
      /[\w.+-]+@[\w-]+\.[\w.]+/.test(readFileSync(f, 'utf8'))
    );
    expect(offenders).toEqual([]);
  });

  it('não deixa URL de GitHub ou LinkedIn literal em JSX', () => {
    const offenders = jsxFiles.filter((f) =>
      /(github\.com|linkedin\.com)/.test(readFileSync(f, 'utf8'))
    );
    expect(offenders).toEqual([]);
  });
});

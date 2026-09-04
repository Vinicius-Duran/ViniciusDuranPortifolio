import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { projects, getProjectBySlug } from '../../data/projects.js';

const collect = (dir, acc = []) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) collect(full, acc);
    else if (full.endsWith('.jsx')) acc.push(full);
  }
  return acc;
};

const PLACEHOLDERS = [
  /ESPAÇO PARA/i,
  /Espaço para o cover/i,
  /substitua project\./i,
  /Descreva aqui/i,
  /Explique a abordagem/i,
  /Conte os resultados/i,
  /lorem ipsum/i,
  /em breve/i,
];

describe('texto de placeholder', () => {
  it('não aparece em nenhum componente JSX', () => {
    const offenders = [];
    for (const file of collect(resolve('src'))) {
      const src = readFileSync(file, 'utf8');
      for (const pattern of PLACEHOLDERS) {
        if (pattern.test(src)) offenders.push(`${file} :: ${pattern}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});

describe('rota de projeto secundário', () => {
  it('exclui todo slug secundário do case study — nenhum tem conteúdo de história', () => {
    const secondarySlugs = ['financeiro-csharp', 'cpf-recovery', 'site-finance'];
    for (const slug of secondarySlugs) {
      const project = getProjectBySlug(slug);
      expect(project, slug).toBeDefined();
      expect(project.featured, slug).toBe(false);
      expect(project.longDescription, `${slug}.longDescription`).toBe('');
      expect(project.challenge, `${slug}.challenge`).toBe('');
      expect(project.solution, `${slug}.solution`).toBe('');
      expect(project.outcome, `${slug}.outcome`).toBe('');
    }
  });

  it('todo projeto alcançável como case study (featured) tem challenge, solution e outcome preenchidos', () => {
    for (const p of projects.filter((p) => p.featured)) {
      expect(p.challenge.length, `${p.slug}.challenge`).toBeGreaterThan(0);
      expect(p.solution.length, `${p.slug}.solution`).toBeGreaterThan(0);
      expect(p.outcome.length, `${p.slug}.outcome`).toBeGreaterThan(0);
    }
  });

  it('Project.jsx redireciona projetos não-destacados em vez de renderizar o case study', () => {
    const src = readFileSync(resolve('src/pages/project/Project.jsx'), 'utf8');
    expect(src).toMatch(/!project\.featured/);
    expect(src).toMatch(/<Navigate to="\/#projects"/);
  });
});

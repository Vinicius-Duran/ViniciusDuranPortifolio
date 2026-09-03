import { describe, it, expect } from 'vitest';
import { projects, getProjectBySlug, getAdjacentProjects } from './projects.js';

const FICTIONAL = ['ecommerce-platform', 'task-management', 'ai-chat-assistant'];
const featured = () => projects.filter((p) => p.featured);

describe('projetos', () => {
  it('não contém nenhum dos projetos fictícios', () => {
    const slugs = projects.map((p) => p.slug);
    for (const slug of FICTIONAL) expect(slugs).not.toContain(slug);
  });

  it('tem 6 destaques e 3 secundários', () => {
    expect(featured()).toHaveLength(6);
    expect(projects.filter((p) => !p.featured)).toHaveLength(3);
  });

  it('preenche o case study de todo destaque', () => {
    for (const p of featured()) {
      expect(p.longDescription.length, `${p.slug}.longDescription`).toBeGreaterThan(80);
      expect(p.challenge.length, `${p.slug}.challenge`).toBeGreaterThan(60);
      expect(p.solution.length, `${p.slug}.solution`).toBeGreaterThan(60);
      expect(p.outcome.length, `${p.slug}.outcome`).toBeGreaterThan(40);
    }
  });

  it('não usa href vazio em nenhum link', () => {
    for (const p of projects) {
      for (const link of p.links) {
        expect(link.href, `${p.slug} → ${link.label}`).not.toBe('#');
        expect(link.href.length).toBeGreaterThan(1);
      }
    }
  });

  it('aponta todo repositório para o handle correto', () => {
    for (const p of projects) {
      expect(p.repo).toContain('github.com/Vinicius-Duran/');
    }
  });

  it('usa ids e slugs únicos', () => {
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length);
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  });

  it('navega apenas entre destaques', () => {
    const first = featured()[0];
    const { prev, next } = getAdjacentProjects(first.slug);
    expect(prev.featured).toBe(true);
    expect(next.featured).toBe(true);
  });

  it('resolve projeto por slug', () => {
    expect(getProjectBySlug(featured()[0].slug)).toBeDefined();
    expect(getProjectBySlug('inexistente')).toBeUndefined();
  });
});

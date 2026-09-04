import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { skillGroups, homeSkillGroups } from './skills.js';

describe('competências', () => {
  it('expõe grupos com rótulo e itens', () => {
    expect(skillGroups.length).toBeGreaterThan(0);
    for (const g of skillGroups) {
      expect(g.label.length).toBeGreaterThan(0);
      expect(g.items.length).toBeGreaterThan(0);
    }
  });

  it('entrega exatamente três grupos para a home', () => {
    expect(homeSkillGroups).toHaveLength(3);
  });

  it('deriva os grupos da home da lista única', () => {
    for (const g of homeSkillGroups) expect(skillGroups).toContain(g);
  });

  it('não declara competências inline nas páginas', () => {
    for (const page of ['src/pages/home/Home.jsx', 'src/pages/about/About.jsx']) {
      const src = readFileSync(resolve(page), 'utf8');
      expect(src, page).not.toMatch(/const\s+skills\s*=\s*\[/);
      expect(src, page).not.toMatch(/const\s+skillGroups\s*=\s*\[/);
    }
  });
});

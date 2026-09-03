import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { certificates } from './certificates.js';

describe('certificados', () => {
  it('mantém os 19 certificados', () => {
    expect(certificates).toHaveLength(19);
  });

  it('aponta todo PDF para um arquivo existente em public/', () => {
    const missing = certificates
      .filter((c) => !existsSync(resolve('public', c.pdf.replace(/^\//, ''))))
      .map((c) => c.pdf);
    expect(missing).toEqual([]);
  });

  it('usa ids únicos', () => {
    expect(new Set(certificates.map((c) => c.id)).size).toBe(certificates.length);
  });

  it('preenche nome, instituição e competências em todos', () => {
    for (const c of certificates) {
      expect(c.name.length, `id ${c.id}`).toBeGreaterThan(0);
      expect(c.institution.length, `id ${c.id}`).toBeGreaterThan(0);
      expect(c.skills.length, `id ${c.id}`).toBeGreaterThan(0);
    }
  });

  it('não referencia o PDF removido', () => {
    expect(certificates.some((c) => c.pdf.includes('certificado-intermediario'))).toBe(false);
  });
});

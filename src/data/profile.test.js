import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { profile, getYearsOfExperience } from './profile.js';

describe('profile', () => {
  it('expõe os campos de identidade exigidos pela spec', () => {
    expect(profile.name).toBe('Vinícius Duran');
    expect(profile.company).toBe('Zicard Digital Business Agency');
    expect(profile.location).toBe('Florianópolis, SC');
    expect(profile.email).toBe('metaemarketing2@gmail.com');
  });

  it('usa o handle exato do GitHub, com hífen e maiúsculas', () => {
    expect(profile.github.handle).toBe('Vinicius-Duran');
    expect(profile.github.url).toBe('https://github.com/Vinicius-Duran');
  });

  it('exibe o mesmo handle que o link resolve', () => {
    expect(profile.github.label).toBe('github.com/Vinicius-Duran');
    expect(profile.github.url).toContain(profile.github.handle);
  });

  it('aponta o LinkedIn por https', () => {
    expect(profile.linkedin.url).toMatch(/^https:\/\/(www\.)?linkedin\.com\/in\//);
  });

  it('registra 2023 como ano de início de carreira', () => {
    expect(profile.careerStartYear).toBe(2023);
  });
});

describe('getYearsOfExperience', () => {
  it('conta do ano de início até o ano informado', () => {
    expect(getYearsOfExperience(new Date('2026-01-01T00:00:00'))).toBe(3);
    expect(getYearsOfExperience(new Date('2027-06-15T00:00:00'))).toBe(4);
    expect(getYearsOfExperience(new Date('2030-12-31T00:00:00'))).toBe(7);
  });

  it('acompanha a virada de ano sem ninguém editar o código', () => {
    const antes = getYearsOfExperience(new Date('2028-12-31T00:00:00'));
    const depois = getYearsOfExperience(new Date('2029-01-01T00:00:00'));
    expect(depois).toBe(antes + 1);
  });

  it('usa a data corrente por padrão', () => {
    expect(getYearsOfExperience()).toBe(new Date().getFullYear() - 2023);
  });

  it('nunca devolve número negativo', () => {
    expect(getYearsOfExperience(new Date('2020-01-01T00:00:00'))).toBe(0);
  });

  it('não deixa o tempo de carreira escrito à mão no JSX', () => {
    const src = readFileSync(resolve('src/pages/about/About.jsx'), 'utf8');
    expect(src).not.toMatch(/\d+\s*\+?\s*anos de experiência/i);
    expect(src).toContain('anosDeExperiencia');
  });
});

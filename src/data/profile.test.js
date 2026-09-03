import { describe, it, expect } from 'vitest';
import { profile } from './profile.js';

describe('profile', () => {
  it('expõe os campos de identidade exigidos pela spec', () => {
    expect(profile.name).toBe('Vinicius Duran');
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
});

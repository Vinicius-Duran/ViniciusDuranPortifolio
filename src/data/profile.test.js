import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { profile, getYearsOfExperience, formatExperience } from './profile.js';

describe('profile', () => {
  it('expõe os campos de identidade exigidos pela spec', () => {
    expect(profile.name).toBe('Vinicius Duran');
    expect(profile.location).toBe('Florianópolis, SC');
    expect(profile.email).toBe('metaemarketing2@gmail.com');
  });

  it('não anuncia empregador: o vínculo com a Zicard acabou', () => {
    expect(profile.company).toBeUndefined();
  });

  it('não deixa o empregador antigo voltar por nenhum arquivo de src', () => {
    const varrer = (dir, achados = []) => {
      for (const entrada of readdirSync(dir)) {
        const caminho = join(dir, entrada);
        if (statSync(caminho).isDirectory()) varrer(caminho, achados);
        else if (/\.(jsx?|css)$/.test(caminho)) {
          // O próprio arquivo de teste cita o nome ao descrever a regra.
          if (caminho.endsWith('profile.test.js')) continue;
          const texto = readFileSync(caminho, 'utf8');
          if (/zicard/i.test(texto)) achados.push(caminho);
        }
      }
      return achados;
    };

    // A menção no comentário de profile.js explica a ausência; qualquer
    // outra é o nome vazando de volta para a interface.
    const ofensores = varrer(resolve('src')).filter(
      (f) => !f.endsWith(join('data', 'profile.js'))
    );
    expect(ofensores).toEqual([]);
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

  it('escreve a frase com o "+" na frente e "experiência" no fim', () => {
    expect(formatExperience(new Date('2026-06-01T00:00:00'))).toBe(
      '+3 anos de experiência'
    );
    expect(formatExperience(new Date('2030-01-01T00:00:00'))).toBe(
      '+7 anos de experiência'
    );
  });

  it('nunca devolve número negativo', () => {
    expect(getYearsOfExperience(new Date('2020-01-01T00:00:00'))).toBe(0);
  });

  it('não deixa o tempo de carreira escrito à mão no JSX', () => {
    const src = readFileSync(resolve('src/pages/about/About.jsx'), 'utf8');
    expect(src).not.toMatch(/\d+\s*\+?\s*anos de experiência/i);
    // Vale derivar pelo número ou pela frase pronta; o que não vale é digitar.
    expect(src).toMatch(/anosDeExperiencia|formatExperience/);
  });
});

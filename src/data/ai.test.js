import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import * as ai from './ai.js';

/* A página é pública. O que ela pode dizer é a arquitetura em alto nível —
   papéis, regras, lições. Nome de agente, de modelo, de ferramenta, de
   arquivo ou de projeto fica de fora, e é este teste que garante isso. */
const TERMOS_PROIBIDOS = [
  'Hermes',
  'Claude',
  'Anthropic',
  'Opus',
  'Sonnet',
  'Haiku',
  'GPT',
  'Telegram',
  'GitHub',
  'MCP',
  'Playwright',
  'Lighthouse',
  'Vitest',
  'superpowers',
  'oh-my-claudecode',
  'Guardians',
  'redesigns',
  'contexto-empresa',
  'em-code-review',
  'em-desenvolvimento',
];

const ARQUIVOS_PUBLICOS = ['src/data/ai.js', 'src/components/AiSection/AiSection.jsx'];

// As linhas de import citam arquivos do próprio projeto; não são conteúdo.
const semImports = (src) =>
  src
    .split(/\r?\n/)
    .filter((linha) => !/^\s*import\b/.test(linha))
    .join('\n');

const escapar = (texto) => texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const strings = (valor, acc = []) => {
  if (typeof valor === 'string') acc.push(valor);
  else if (Array.isArray(valor)) valor.forEach((item) => strings(item, acc));
  else if (valor && typeof valor === 'object') Object.values(valor).forEach((item) => strings(item, acc));
  return acc;
};

const NOME_DE_ARQUIVO = /[\w-]*\.(md|json|mjs|js|jsx|ts|yml|yaml|env)\b/i;

describe('a linha do que é público na engenharia de IA', () => {
  it('não cita nome de agente, modelo, ferramenta ou projeto', () => {
    const achados = [];
    for (const arquivo of ARQUIVOS_PUBLICOS) {
      const src = semImports(readFileSync(resolve(arquivo), 'utf8'));
      for (const termo of TERMOS_PROIBIDOS) {
        if (new RegExp(`\\b${escapar(termo)}\\b`, 'i').test(src)) {
          achados.push(`${arquivo} :: ${termo}`);
        }
      }
    }
    expect(achados).toEqual([]);
  });

  it('não cita nome de arquivo no conteúdo', () => {
    const achados = strings(ai).filter((texto) => NOME_DE_ARQUIVO.test(texto));
    expect(achados).toEqual([]);
  });
});

describe('conteúdo da página de engenharia de IA', () => {
  it('tem as cinco etapas, na ordem que o pipeline anima', () => {
    expect(ai.aiStages.map((etapa) => etapa.label)).toEqual([
      'Supervisão',
      'Coordenação',
      'Implementação',
      'Revisão',
      'Entrega',
    ]);
  });

  it('toda etapa tem número e princípio', () => {
    ai.aiStages.forEach((etapa) => {
      expect(etapa.n, etapa.label).toMatch(/^\d{2}$/);
      expect(etapa.principle.trim().length, etapa.label).toBeGreaterThan(0);
    });
  });

  it('todo item de regra, circuito, memória e lição tem título e texto', () => {
    const listas = {
      aiRules: ai.aiRules,
      aiHumanLoop: ai.aiHumanLoop,
      aiMemory: ai.aiMemory,
      aiLessons: ai.aiLessons,
    };
    for (const [nome, lista] of Object.entries(listas)) {
      expect(lista?.length, nome).toBeGreaterThan(0);
      lista.forEach((item, indice) => {
        expect(item.title.trim().length, `${nome}[${indice}].title`).toBeGreaterThan(0);
        expect(item.text.trim().length, `${nome}[${indice}].text`).toBeGreaterThan(0);
      });
    }
  });
});

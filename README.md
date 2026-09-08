# Portfólio — Vinicius Duran

Portfólio pessoal de Vinicius Duran, desenvolvedor full-stack em Florianópolis/SC.
Construído em React 19 com Vite, design system em CSS custom properties e motion
com GSAP e anime.js.

Direção visual editorial: fundo carvão quente, um único acento âmbar, Instrument
Serif no display contra Instrument Sans no texto. Sem gradiente de marca.

## Stack

- React 19 · React Router DOM 7
- Vite 6
- CSS custom properties (sem framework de estilo)
- GSAP (ScrollTrigger, SplitText, ScrambleText) · anime.js 4
- Vitest · ESLint 9

## Motion

Toda a animação sai de `src/lib/motion.js`, que registra os plugins do GSAP e
expõe as poucas gramáticas que o site usa — a linha do tempo de abertura, a
revelação por máscara dos títulos, o stagger das listas e o embaralhamento de
texto no índice de projetos.

Duas regras sustentam esse módulo:

- **Nenhum estado inicial de animação mora no CSS.** Quem esconde para revelar é
  o JS, em `useLayoutEffect`. Um `opacity: 0` escrito na folha de estilo apaga a
  seção de vez quando o observador não dispara — já aconteceu neste repositório.
- **Só `transform`, `opacity`, `filter`, `clip-path` e `mask` animam.** Animar
  `padding` ou `width` recalcula layout a cada frame.

`prefers-reduced-motion` é respeitado no ponto de entrada de cada animação: sob
essa preferência elas não são criadas, e o conteúdo simplesmente aparece.

## Rodando

```bash
npm install
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção em dist/
npm run preview  # pré-visualiza o build
npm run lint     # análise estática
npm test         # suíte de testes
```

## Estrutura

```
src/
  components/    Header, Grain, Marquee, ScrollProgress
  data/          conteúdo do site — perfil, projetos, certificados, competências
  lib/           motion.js — registro do GSAP e as gramáticas de animação
  pages/         home, about, project, notfound
```

## Camada de dados

Todo o conteúdo vive em `src/data/`, separado da apresentação. Atualizar o site é
editar esses arquivos, não os componentes.

| Arquivo | Conteúdo |
|---|---|
| `profile.js` | identidade e canais de contato — fonte única |
| `projects.js` | nove projetos: seis em destaque, com case study completo (desafio, solução, resultado), e três secundários, listados só como link de repositório |
| `certificates.js` | 19 certificados e seus PDFs em `public/` |
| `skills.js` | competências por grupo |

Uma rota de case study (`/projects/:slug`) só existe para os projetos em destaque;
acessar o slug de um projeto secundário redireciona de volta para a seção de
projetos da home.

## Testes

A suíte não testa aparência: ela protege a integridade do conteúdo. Verifica que
nenhum projeto fictício volte ao site, que nenhum texto de rascunho vaze para a
interface, que os dados de contato venham de `profile.js` e que todo PDF de
certificado referenciado exista no repositório.

```bash
npm test
```

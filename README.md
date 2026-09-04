# Portfólio — Vinicius Duran

Portfólio pessoal de Vinicius Duran, desenvolvedor full-stack em Florianópolis/SC.
Construído em React 19 com Vite, design system em CSS custom properties e animações
de entrada por IntersectionObserver.

## Stack

- React 19 · React Router DOM 7
- Vite 6
- CSS custom properties (sem framework de estilo)
- Vitest · ESLint 9

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
  components/    Header, Background, Marquee, MouseFollower, ScrollProgress
  data/          conteúdo do site — perfil, projetos, certificados, competências
  hooks/         useReveal, useRevealMany
  pages/         home, about, project
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

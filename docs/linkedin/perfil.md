# Kit de LinkedIn

O LinkedIn não renderiza README nem animação: o que existe lá é a capa (imagem
estática), a manchete, a seção "Sobre" e os Destaques. Este diretório traz as
quatro coisas, escritas na mesma voz do portfólio.

| Arquivo | O que é |
|---|---|
| `cover.svg` | fonte da capa, editável, 1584×396 |
| `cover.png` | o que se envia ao LinkedIn, exportado do SVG |

Para trocar a capa: **Perfil → ícone da câmera na foto de capa → Alterar foto →**
enviar `cover.png`.

A composição já considera duas coisas que o LinkedIn faz com a capa: a foto de
perfil cobre o canto inferior esquerdo no desktop, e o celular corta as
laterais. Por isso o texto começa a 520px da borda e nada essencial encosta nas
extremidades.

---

## Manchete

O campo aceita 220 caracteres. Esta usa 118:

```
Desenvolvedor Full-Stack · React, C#, .NET e Node · o front, o back e o banco que sustenta os dois
```

Se preferir uma que diga o alvo em vez da stack:

```
Desenvolvedor Full-Stack em Florianópolis · Construo o front, o back e o banco que sustenta os dois
```

---

## Sobre

Colar no campo "Sobre" (limite de 2.600 caracteres; este texto usa cerca de 1.100).

```
Sou desenvolvedor full-stack em Florianópolis, e trabalho nas três camadas: a
interface que as pessoas usam, a API que a sustenta e o banco onde o dado de
fato mora.

No front, React com Vite, design system em CSS custom properties e motion com
GSAP e anime.js. No back, C# com ASP.NET Core e Node com Express, sobre SQL
Server ou MySQL. Trabalho com o conteúdo separado da apresentação, e deixo
teste escrito onde a regra é de negócio.

Alguns projetos que mostram isso:

• Sistema Financeiro — CRUD de usuários, centros de custo, receitas, contas
  bancárias e lançamentos, com autenticação por token, validação no servidor e
  cenários de aceite em Gherkin. React no cliente, Express e Sequelize sobre
  MySQL no servidor.

• Todah Produções — site institucional e vitrine de artistas de um agenciamento
  musical, em React 19, Vite 6 e Tailwind v4, com o cadastro de artistas numa
  camada de dados que quem não escreve código consegue atualizar.

• Taki Rastreadores — site B2B de rastreamento e gestão de frotas, com SEO
  técnico.

• Loja em C# — solução .NET 6 dividida em API, Domain, Infra e Utilidade, com o
  modelo de domínio e o acesso a dados isolados da camada de API.

Meu portfólio, com os casos completos:
https://vinicius-duran-portifolio.vercel.app

GitHub: https://github.com/Vinicius-Duran
WhatsApp: (48) 99211-0831
```

---

## Destaques

A seção Destaques aceita links com imagem própria. Vale fixar, nesta ordem:

1. **Portfólio** — https://vinicius-duran-portifolio.vercel.app
2. **Todah Produções** — https://toda-producoes.vercel.app
3. **Taki Rastreadores** — https://taki-eta.vercel.app
4. **GitHub** — https://github.com/Vinicius-Duran

---

## Refazer o `cover.png` depois de editar o SVG

O PNG é uma captura do SVG no tamanho exato da capa:

```bash
npx vite --port 5200 docs/linkedin
# abrir http://localhost:5200/cover.svg numa janela de 1584x396 e capturar
```

Qualquer conversor de SVG para PNG serve, desde que a saída fique em 1584×396 —
o LinkedIn recorta o que fugir dessa proporção.

# Página de engenharia de IA — desenho

**Data:** 2026-09-10
**Branch:** `pagina-ia`, criada a partir de `main`
**Status:** desenho aprovado pelo autor em 2026-09-10; spec aguardando revisão

---

## 1. Objetivo

Uma página pública, `/ia`, que mostra como funciona o sistema de agentes de IA com que o autor
automatiza o desenvolvimento — com substância suficiente para convencer quem contrata para
engenharia de IA, e sem entregar a receita.

É o destino do link que vai no e-mail de candidatura. A seção de IA da home continua existindo,
curta, e passa a apontar para cá.

---

## 2. Decisões do autor

| # | Decisão | Quando |
|---|---|---|
| 1 | **Até onde a página vai:** arquitetura em alto nível — papéis dos agentes, agente de supervisão, regra de dependência, canal humano e lições. Sem prompt, configuração, nome de arquivo nem cliente. | 2026-09-10 |
| 2 | **Formato:** pipeline ao vivo — uma tarefa atravessa as etapas conforme a rolagem, e cada etapa abre o princípio dela. Recusados: ensaio em capítulos, terminal simulado. | 2026-09-10 |
| 3 | **Nenhum nome de IA.** O agente de plantão é "agente de supervisão", o modelo é "modelo principal", e os demais são nomeados pelo papel. | 2026-09-10 |
| 4 | Estrutura, motion e verificação aprovados como apresentados. | 2026-09-10 |

---

## 3. A linha do que é público

A regra do topo de `src/data/ai.js` hoje diz "capacidade e resultado, nunca o mecanismo". Ela é
**reescrita** para a decisão 1, e passa a valer para a home e para `/ia`:

**Pode aparecer:** os papéis (supervisão, coordenação, implementação, revisão, entrega), as regras
que governam o sistema, como a pessoa entra no circuito, e as lições que viraram regra.

**Não pode aparecer:**

- nome de agente ou de modelo (inclusive o do agente de supervisão);
- nome de ferramenta, plataforma, biblioteca ou serviço;
- nome de arquivo, label, script, comando ou formato de configuração;
- nome de projeto, cliente ou organização;
- número interno de repositório (contagens de tarefa, issue, teste, commit).

A linha é **verificada por teste** (seção 7), não só prometida.

---

## 4. Estrutura

### 4.1 Arquivos

| Arquivo | Mudança |
|---|---|
| `src/pages/ai/AiPage.jsx` e `AiPage.css` | novos — a página |
| `src/data/ai.js` | ampliado com o conteúdo da página; regra do topo reescrita |
| `src/App.jsx` | rota `/ia` |
| `src/components/Header/Header.jsx` | item "IA" no `NAV` |
| `src/components/AiSection/AiSection.jsx` | link "Como funciona por dentro →" para `/ia`; sai a nota "o funcionamento interno não é publicado aqui" |
| `src/data/ai.test.js` | novo — a linha do público, a rota e o menu |
| `README.md` | a rota nova na lista de rotas e na estrutura |

`vercel.json` não muda: o rewrite para `/index.html` já cobre `/ia`.

### 4.2 Blocos da página, em ordem

Todos marcados com `data-build-step`, como as outras páginas, para o leitor de build e a montagem
por rolagem.

1. **Abertura** (`ia.jsx`) — título, parágrafo de abertura. Monta com `buildIntro`.
2. **Pipeline ao vivo** (`pipeline.jsx`) — as cinco etapas e o painel de princípio. Ver seção 5.
3. **Regras do sistema** (`regras.jsx`) — grade de seis itens.
4. **A pessoa no circuito** (`circuito.jsx`) — três itens.
5. **Memória e verificação** (`memoria.jsx`) — três itens.
6. **Lições** (`licoes.jsx`) — cartas empilhadas, reaproveitando `stackCards`.
7. **Contato** (`contato.jsx`) — chamada curta com e-mail e link para `/#contact`. O e-mail sai
   de `profile.email`: `contact.test.js` já reprova contato digitado direto no JSX.

Todo texto da página mora em `src/data/ai.js`, como o resto do site mantém conteúdo em
`src/data/`. `AiPage.jsx` só renderiza.

### 4.3 Conteúdo — rascunho para revisão

O texto final sai no plano, mas a **exposição** se decide aqui. Rascunho:

**Abertura.** Título: "Agentes que entregam, e *sabem quando parar*." Parágrafo: o autor constrói
um sistema em que agentes de IA levam uma tarefa da descrição ao pull request revisado; o difícil
não é gerar código, é tornar um sistema autônomo confiável.

**Etapas do pipeline:**

| # | Etapa | Princípio |
|---|---|---|
| 00 | Supervisão | Um agente de supervisão fica de plantão, acompanhando a integração contínua e a fila de tarefas aprovadas. Vigiar é contínuo e barato; o modelo principal só é acionado quando há trabalho real, e só pega o que foi aprovado por uma pessoa. |
| 01 | Coordenação | O coordenador não escreve nem revisa código. Despacha cada etapa, registra o estado da tarefa antes de despachar — assim uma queda no meio tem de onde retomar — e decide: avançar, repetir ou parar. |
| 02 | Implementação | Um agente implementa a partir da própria tarefa, e não de um resumo dela; roda a verificação e deixa por escrito o que fez. |
| 03 | Revisão | Outro agente, sem o contexto de quem implementou, compara a mudança com o que foi pedido. Reprovada, a tarefa volta com as pendências na íntegra. |
| 04 | Entrega | Aprovada, a tarefa é publicada e fechada. As tarefas de uma fila saem numa única PR, e é essa PR que uma pessoa revisa. |

**Regras do sistema:**

- **Quem escreve não aprova.** Implementação e revisão são agentes diferentes, sem contexto comum.
- **Prova é arquivo, não frase.** Cada etapa entrega um artefato e um veredito; "deu certo" em texto não avança a tarefa.
- **Girar em falso tem limite.** Há teto de ciclos, e a mesma pendência devolvida duas vezes bloqueia antes do teto.
- **Autonomia com freio.** Tarefa travada é registrada e a fila segue — exceto se outra tarefa depende dela. Aí o sistema para e pergunta.
- **Uma fila, uma PR.** A revisão humana continua possível mesmo com dezenas de tarefas.
- **Agentes genéricos, contexto por projeto.** Trocar de projeto é trocar um documento, não reescrever o sistema.

**A pessoa no circuito:**

- Toda pergunta chega por dois canais ao mesmo tempo — terminal e celular — e vale a primeira resposta.
- A sessão parada acorda sozinha quando a resposta chega.
- Avisos são só três: pergunta, início do trabalho, entrega pronta. O resto fica no registro, não no bolso de ninguém.

**Memória e verificação:**

- Lições viram regra escrita, com o porquê e o jeito de aplicar, e são lidas nas sessões seguintes.
- Nada de interface é dado por pronto sem ser aberto e olhado no navegador, em mais de uma largura.
- Teste que carrega peso precisa provar que falha: um defeito é injetado de propósito, e quem escolhe o defeito é o revisor.

**Lições** (cartas):

1. **Teste descrito não é teste rodado.** Um plano honesto trouxe testes que passariam com a guarda apagada.
2. **Silêncio não prova que um agente morreu.** Redespachar uma tarefa pôs dois agentes escrevendo os mesmos arquivos.
3. **Deploy quebrado pode parecer saudável.** O build passava, o upload falhava, e o site seguiu dias servindo a versão velha.
4. **Número ausente não é zero.** Uma ferramenta mostra zero onde não mediu, e publicar esse zero é afirmar algo falso.
5. **Medir, não ler.** Trocar "abrir no navegador" por "ler o CSS" entregou um elemento que engolia cliques.

---

## 5. Motion

### 5.1 Pipeline ao vivo

**Onde:** `(min-width: 901px) and (prefers-reduced-motion: no-preference)` — o mesmo recorte de
`gsap.matchMedia()` que a home usa para pins.

**O que acontece:** a seção é presa na tela e uma linha do tempo com `scrub` conduz a tarefa (um
marcador) por um trilho horizontal com as cinco etapas:

1. o trilho se desenha até a etapa atual (`DrawSVGPlugin`, já registrado);
2. ao chegar numa etapa, o ponto dela acende e o painel troca o princípio (saída e entrada por
   `opacity` e `transform`);
3. na **Revisão**, o marcador **volta** até a Implementação por um traço de retorno em outra cor —
   a reprovação — e depois refaz o caminho até a Entrega;
4. na Entrega, o marcador vira o selo "PR".

**Regras:**

- anima só `transform`, `opacity`, `clip-path` e o `stroke` do SVG via DrawSVG;
- o conteúdo das cinco etapas **existe inteiro no HTML**; quem esconde para revelar é o JS, com
  `gsap.from`/`fromTo` dentro de `useGsapScope`, e sem JS a página aparece completa;
- o trilho é escrito dentro de `AiPage.jsx`. Não vira helper em `motion.js`: não se repete em outro
  lugar.

### 5.2 Fora do recorte (celular e movimento reduzido)

Sem pin. As etapas são uma lista vertical, cada uma com o princípio visível abaixo do rótulo — a
mesma regra de empilhamento que `AiSection.css` já aplica ao fluxo abaixo de 720px.

### 5.3 Resto da página

`buildIntro` na abertura, `buildOnScroll` nas seções, `revealStack` nas grades, `stackCards` nas
lições. Nada novo em `motion.js`.

---

## 6. Processo de design

Trabalho de front: as cinco skills entram, nesta ordem — direção (taste, auditando o que existe),
referência visual (21st.dev no lugar do Refero, que responde sem assinatura), polimento de
interação (Emil), passe de qualidade (impeccable) e componentes prontos (21st.dev). A identidade
do site não muda: Archivo, âmbar sobre carvão, a gramática de montagem.

---

## 7. Verificação

### 7.1 Testes novos — `src/data/ai.test.js`

- **A linha do público — termos.** Lê `src/data/ai.js`, `src/pages/ai/AiPage.jsx` e
  `src/components/AiSection/AiSection.jsx`, **descartando as linhas de `import`**, e reprova se
  aparecer qualquer destes termos, sem distinguir maiúscula: `Hermes`, `Claude`, `Anthropic`,
  `Opus`, `Sonnet`, `Haiku`, `GPT`, `Telegram`, `GitHub`, `MCP`, `Playwright`, `Lighthouse`,
  `Vitest`, `superpowers`, `oh-my-claudecode`, `Guardians`, `redesigns`, `contexto-empresa`,
  `em-code-review`, `em-desenvolvimento`.
- **A linha do público — arquivos.** Importa os exports de `src/data/ai.js`, percorre todo valor
  string (inclusive dentro de listas e objetos) e reprova se algum contiver nome de arquivo com
  uma destas extensões: `.md`, `.json`, `.mjs`, `.js`, `.jsx`, `.ts`, `.yml`, `.yaml`, `.env`.
  O conteúdo público mora todo em `ai.js`; os `.jsx` só o renderizam.
- **Prova por mutação do teste acima:** inserir `Hermes` num princípio faz o teste falhar;
  remover restaura. As duas saídas vão no relatório.
- **A rota existe:** `App.jsx` declara `path="/ia"`.
- **O menu aponta para ela:** `Header.jsx` tem um item com `to: '/ia'`.
- **Todo item de conteúdo está preenchido:** cada etapa tem rótulo e princípio; cada regra, lição e
  item tem título e texto.

O teste de placeholder de `Project.test.js` já cobre todo `.jsx` de `src/`, inclusive a página nova.

### 7.2 Antes da PR

- `npm run lint`, `npm run build` e `npm test` verdes.
- Playwright em **1440** e **390**: screenshot de cada bloco, console sem erro, e a rolagem inteira
  do pipeline percorrida no desktop (tarefa chega à Entrega, painel troca nas cinco etapas, retorno
  na Revisão acontece).
- Movimento reduzido emulado: página inteira legível, sem pin.
- A página aberta a partir do link da home e do item do menu.

---

## 8. Fora de escopo

- Tradução para inglês.
- Mudar o currículo ou o e-mail (ficam em outra pasta, fora deste repositório).
- Qualquer métrica, contagem ou print de repositório real.
- Mexer na PR #10 (`linkedin-kit`).

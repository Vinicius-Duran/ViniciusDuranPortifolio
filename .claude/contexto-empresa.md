# Contexto do projeto — fonte da verdade do pipeline

Este arquivo é a **única** fonte de configuração do pipeline de tarefas. Os quatro agentes
(`coordenador`, `desenvolvedor`, `code-reviewer-task`, `finalizador`) leem este documento antes de
qualquer outra coisa.

---

## 1. Identidade

| Item | Valor |
|---|---|
| Empresa | Projeto pessoal — portfólio de Vinicius Duran |
| Organização (owner) no GitHub | `Vinicius-Duran` |
| Repositório padrão das issues | `Vinicius-Duran/ViniciusDuranPortifolio` |
| Responsável das tarefas | `Vinicius-Duran` |
| Raiz dos repositórios na máquina | `C:\Users\metae\OneDrive\Documents\dev` |
| Idioma de artefatos e comentários | Português do Brasil |

O pipeline conversa com o GitHub pela CLI `gh`. Antes de qualquer leitura, confirme a autenticação
com `gh auth status`. Se `gh` não estiver instalado ou autenticado, isso é **falha de ambiente**:
bloqueie as tarefas afetadas. Nunca tente autenticar por conta própria nem gravar token.

### Como uma tarefa é identificada

O usuário informa números de issue; o repositório é o padrão da tabela acima. Repositório de issue e
de código são **o mesmo**, então `#{issue}` na mensagem de commit referencia corretamente.

## 2. Repositórios de código

| Repositório | Caminho local | Stack | Domínio / responsabilidade |
|---|---|---|---|
| `ViniciusDuranPortifolio` | `C:\Users\metae\OneDrive\Documents\dev\ViniciusDuranPortifolio` | React + Vite (ver 3.1) | O portfólio inteiro: páginas, componentes, camada de dados em `src/data/`, animação em `src/lib/motion.js` |

Repositório único. Não há ambiguidade de repositório a resolver.

## 3. Stacks e comandos

### 3.1 Stack: React + Vite

| Item | Valor |
|---|---|
| Detecção | existe `package.json` na raiz e ele contém `"vite"` e `"react"` |
| Build | `& .\node_modules\.bin\vite.cmd build` |
| Typecheck | não se aplica — o projeto é JavaScript |
| Lint | `& .\node_modules\.bin\eslint.cmd .` |
| Testes | `& .\node_modules\.bin\vitest.cmd run` — suíte única, Vitest, em `src/**/*.test.js` e `README.test.js` |
| Biblioteca compartilhada | nenhuma |

Pontos de entrada típicos: `src/App.jsx` (rotas), `src/pages/` (páginas), `src/components/`,
`src/data/` (todo o conteúdo do site), `src/lib/motion.js` (toda a animação).

Não há CI no repositório: o deploy é a integração da Vercel a partir de `main`. Os portões são
lint, testes e build, rodados localmente — **os três** precisam estar verdes.

### 3.2 Trabalho de interface exige navegador

Toda tarefa que muda o que o visitante vê só está pronta depois de aberta num navegador, em pelo
menos **1440** e **390** de largura, com o console conferido. Servidor de desenvolvimento:
`& .\node_modules\.bin\vite.cmd --port 5188 --strictPort`, em segundo plano.

O MCP do Playwright pode estar preso por outra instância ("Browser is already in use") e o do Chrome
DevTools exige Chrome com depuração remota. Quando nenhum servir, use a biblioteca Playwright direto
por script `.mjs` fora do repositório — o plano de cada tarefa traz o script quando precisa.

### 3.3 A ferramenta Bash deste ambiente corrompe saída

Há um hook que reescreve comandos e devolve saída corrompida: busca vazia ou com milhares de acertos
falsos, listagem omitindo diretórios, testes reprovando sem ter rodado.

**Use `Grep`, `Glob` e `Read` para arquivos, e a ferramenta `PowerShell` para comandos.** `git` pelo
Bash funciona normal. Quando uma saída parecer catastrófica, confirme pelo PowerShell antes de agir
ou de relatar.

**Não escreva arquivo com `node -e` nem `Set-Content` pelo PowerShell:** acentos e travessões são
corrompidos, e `Set-Content -Encoding utf8` grava BOM. Escreva com a ferramenta `Write`, ou num
script `.mjs`.

### 3.4 Gerenciador de pacotes

`package-lock.json` existe → **`npm`**. Nunca troque de gerenciador.

### 3.5 Regra que prevalece sobre tudo acima

O `README.md` do repositório documenta as decisões do site — as duas regras de animação, a camada
de dados, os testes. Ele é a autoridade sobre arquitetura e convenções.

Para cada tarefa, a autoridade adicional é o par **spec + plano** citado no corpo da issue, em
`docs/superpowers/specs/` e `docs/superpowers/plans/`. **As restrições globais do plano valem para
toda tarefa dele.**

## 4. Git

| Item | Valor |
|---|---|
| Branch padrão do repositório | `main` |
| Branch base do pipeline | `pagina-ia` — é dela que a branch de trabalho nasce, porque é nela que estão a spec e o plano |
| Origem da branch de trabalho | criada a partir de `pagina-ia` |
| Padrão de nome de branch | `{issue}-{até-duas-palavras-kebab-case}` |
| Regra sobre a `main` | nunca commite direto nela; só entra por PR revisado pelo autor |
| Estilo de commit | Verbo no infinitivo, em português, como o histórico (`Adicionar…`, `Dar ao…`), com corpo explicando o porquê, e referenciando a issue |
| Exemplo de commit | `Adicionar a página de engenharia de IA (#12)` |
| Atribuição | os commits do repositório terminam com as linhas `Co-Authored-By:` e `Claude-Session:` que o ambiente fornecer — siga o que `git log main -5` mostra |
| Push da branch | Feito pelo `finalizador` |
| Criação de PR | Feita pelo `finalizador`, via skill `github-pr` |

Antes de commitar, confira o estilo real com `git log main --format='%s%n%b' -5`.

## 4.1 Pull request

| Item | Valor |
|---|---|
| Branch alvo do PR | **`main`** — a PR leva junto os commits de spec e plano de `pagina-ia` |
| **Unidade de entrega** | **a EXECUÇÃO** — todas as tarefas de uma fila compartilham uma branch e rendem **uma** PR |
| Reviewers padrão | nenhum: o autor revisa direto |
| Vínculo com a issue | obrigatório — o corpo do PR referencia as issues da fila |
| Idioma do título e da descrição | Português do Brasil |

Não use palavra-chave de fechamento automático (`Closes #123`): quem fecha a issue é o
`finalizador`. Referencie com `Ref #123`.

## 5. GitHub — issues e labels

| Papel | Nome neste projeto | Significado | Pipeline escreve? |
|---|---|---|---|
| `{label-desenvolvimento}` | `em-desenvolvimento` | Em implementação | **sim** |
| `{label-code-review}` | `em-code-review` | Em revisão de código | **sim** |
| `{label-bloqueio}` | `bloqueado` | Bloqueada — precisa de decisão humana | **sim** |
| `{label-fora-do-pipeline}` | `rascunho` | Ainda em descrição — não entra no pipeline | **não** |

Os demais labels do repositório não são do pipeline e nunca devem ser alterados por ele.

| Item | Valor |
|---|---|
| Desfecho de sucesso | issue **fechada** |
| Quem aplica e remove label de estágio | **apenas o `coordenador`** |
| Quem fecha a issue | **apenas o `finalizador`** |
| Campos que o pipeline pode alterar | labels de estágio e o estado aberta/fechada |
| Campos que o pipeline nunca altera | título, corpo, responsável, milestone, projeto, demais labels |

## 5.1 Elegibilidade da tarefa

| Critério | Regra |
|---|---|
| Estado | aberta |
| Responsável | `assignees` contém `Vinicius-Duran` |
| Labels | não pode ter `rascunho` nem `bloqueado` |

### Onde estão os critérios de aceite

O corpo da issue descreve a tarefa e aponta a tarefa correspondente do **plano**, que traz os passos,
os arquivos inteiros, os comandos e as saídas esperadas — todos executados antes de escritos. Leia
os dois: a issue diz o quê e por quê; o plano diz como, e traz a evidência.

Na falta de seção de critérios, cada afirmação verificável do corpo é um critério.

## 6. Artefatos do pipeline

| Item | Valor |
|---|---|
| Pasta por tarefa | `.tarefas/{issue}/` |
| Implementação | `IMPLEMENTACAO.md` |
| Code review | `CODE-REVIEW.md` |
| Fechamento | `FECHAMENTO.md` |
| Bloqueio | `BLOQUEIO.md` |
| Estado do pipeline | `ESTADO.json` |
| Máx. ciclos de correção de código | 3 |

`.tarefas/` não é versionada (está no `.gitignore`).

## 7. Regras invioláveis

1. Push e PR são exclusividade do `finalizador`, e só depois do code review aprovado.
2. **Nunca** commite segredo, credencial ou `.env`.
3. **Nunca** amplie o escopo além do que a issue e a tarefa do plano pedem.
4. **Nunca** descarte ou faça stash de trabalho não relacionado que já estava na árvore.
5. Artefatos e comentários em português, com quebras de linha reais.
6. Execução desassistida: o que não puder ser resolvido vira `BLOQUEIO.md`, label `bloqueado`, e a
   fila segue — **exceto** se outra tarefa da fila depender da bloqueada; aí a fila para.
7. **Nada é inventado.** Número, texto público ou valor que o plano não traz é pergunta, não
   suposição.
8. **A linha do público da engenharia de IA** (spec `2026-09-10-pagina-ia-design.md`, seção 3):
   nenhum nome de agente, modelo, ferramenta, arquivo, label ou projeto no conteúdo do site. O teste
   `src/data/ai.test.js` a verifica, e ele nunca é afrouxado para uma tarefa passar.

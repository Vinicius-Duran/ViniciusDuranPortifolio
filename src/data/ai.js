/**
 * Engenharia de IA — o que é dito publicamente.
 *
 * Regra deste arquivo: descreve a CAPACIDADE e o RESULTADO, nunca o
 * mecanismo. Nada de nomes de ferramenta, formato de prompt, topologia dos
 * agentes ou trecho de configuração. Quem lê entende o que sei fazer; quem
 * quer copiar não sai daqui com a receita.
 */

export const aiIntro =
  'Além de escrever software, eu construo os sistemas que escrevem software comigo. ' +
  'Automação de processos de desenvolvimento com agentes de IA: tarefas que saem da ' +
  'descrição e chegam em código revisado sem eu digitar cada passo, com verificação ' +
  'no caminho em vez de confiança no final.';

export const aiCapabilities = [
  {
    id: 'A',
    title: 'Pipelines de agentes',
    text: 'Uma tarefa entra como descrição e sai como alteração revisada. As etapas — implementar, revisar, entregar — são papéis separados, e nenhuma delas se aprova sozinha.',
  },
  {
    id: 'B',
    title: 'Orquestração por peso',
    text: 'Nem toda tarefa merece o mesmo esforço. O trabalho é roteado conforme o tamanho do problema, o que mantém custo e tempo sob controle sem perder profundidade onde ela importa.',
  },
  {
    id: 'C',
    title: 'Autonomia com freio',
    text: 'O sistema roda sem supervisão até encontrar uma decisão que não é dele — de produto, de escopo, de dependência que não existe. Aí ele para e pergunta, em vez de inventar e seguir.',
  },
  {
    id: 'D',
    title: 'Verificação como etapa',
    text: 'Nada é dado por pronto sem evidência: a suíte roda, a interface é aberta e olhada, e o que falha volta para a fila. Afirmação sem medição não fecha tarefa.',
  },
  {
    id: 'E',
    title: 'Contexto versionado',
    text: 'As regras de operação moram junto do repositório e mudam com ele. Trocar de projeto é trocar esse contexto, não reescrever o sistema.',
  },
  {
    id: 'F',
    title: 'Rastro de decisão',
    text: 'Cada escolha feita no meio do caminho fica registrada onde a equipe acompanha, e não perdida num histórico de conversa que ninguém relê.',
  },
];

/** Etapas do diagrama: o desenho do fluxo, sem o conteúdo dele. */
export const aiPipeline = [
  { label: 'Descrição' },
  { label: 'Plano' },
  { label: 'Implementação' },
  { label: 'Revisão' },
  { label: 'Entrega' },
];

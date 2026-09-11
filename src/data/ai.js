/**
 * Engenharia de IA — o que é dito publicamente, na home e na página /ia.
 *
 * Regra deste arquivo: descreve a ARQUITETURA EM ALTO NÍVEL — os papéis, as
 * regras que governam o sistema, onde a pessoa entra no circuito e as lições
 * que viraram regra. Nunca nome de agente, de modelo, de ferramenta, de
 * arquivo, de label ou de projeto, e nenhum número interno de repositório.
 * Quem lê entende como o sistema pensa; quem quer copiar não sai daqui com a
 * receita. O teste ao lado reprova o que passar dessa linha.
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

/** Etapas do diagrama da home: o desenho do fluxo, sem o conteúdo dele. */
export const aiPipeline = [
  { label: 'Descrição' },
  { label: 'Plano' },
  { label: 'Implementação' },
  { label: 'Revisão' },
  { label: 'Entrega' },
];

/* =========================================================================
   PÁGINA /ia
   Títulos vêm partidos em três pedaços porque a ênfase é por peso e cor, num
   <em> no meio da frase, e o texto continua morando aqui e não no JSX.
   ========================================================================= */

export const aiPage = {
  hero: {
    tag: 'h1 · ia',
    title: { lead: 'Agentes que entregam, e ', emphasis: 'sabem quando parar', tail: '.' },
    intro:
      'Construo sistemas em que agentes de IA levam uma tarefa da descrição ao pull request ' +
      'revisado. Gerar código é a parte fácil. O difícil é tornar um sistema autônomo ' +
      'confiável: saber quando ele segue sozinho, quando para e pergunta, e como prova que ' +
      'o que entregou funciona.',
  },
  pipeline: {
    tag: 'h2 · pipeline',
    title: { lead: 'Uma tarefa, ', emphasis: 'do plantão à entrega', tail: '.' },
    rejected: 'Reprovada, volta',
    delivered: 'PR',
  },
  rules: {
    tag: 'h2 · regras',
    title: { lead: 'Regras que ', emphasis: 'nenhum agente pula', tail: '.' },
  },
  humanLoop: {
    tag: 'h2 · circuito',
    title: { lead: 'Uma pessoa no circuito, ', emphasis: 'sem ruído', tail: '.' },
  },
  memory: {
    tag: 'h2 · memória',
    title: { lead: 'Memória que ', emphasis: 'vira regra', tail: '.' },
  },
  lessons: {
    tag: 'h2 · lições',
    title: { lead: 'O que os agentes ', emphasis: 'me ensinaram', tail: '.' },
  },
  closing: {
    tag: 'h2 · contato',
    title: { lead: 'Quer ver ', emphasis: 'funcionando', tail: '?' },
    text: 'Esta página mostra o desenho. O sistema rodando eu mostro ao vivo, numa conversa.',
    email: 'Escrever um e-mail',
    more: 'Outros contatos',
  },
};

/**
 * As cinco etapas, na ordem em que a tarefa as atravessa. A ordem é contrato:
 * o pipeline animado da página devolve a tarefa da Revisão à Implementação.
 */
export const aiStages = [
  {
    n: '00',
    label: 'Supervisão',
    principle:
      'Um agente de supervisão fica de plantão, acompanhando a integração contínua e a fila de ' +
      'tarefas aprovadas. Vigiar é contínuo e barato; o modelo principal só é acionado quando há ' +
      'trabalho real, e só pega o que uma pessoa aprovou.',
  },
  {
    n: '01',
    label: 'Coordenação',
    principle:
      'O coordenador não escreve nem revisa código. Despacha cada etapa, registra o estado da ' +
      'tarefa antes de despachar — assim uma queda no meio tem de onde retomar — e decide: ' +
      'avançar, repetir ou parar.',
  },
  {
    n: '02',
    label: 'Implementação',
    principle:
      'Um agente implementa a partir da própria tarefa, e não de um resumo dela; roda a ' +
      'verificação e deixa por escrito o que fez.',
  },
  {
    n: '03',
    label: 'Revisão',
    principle:
      'Outro agente, sem o contexto de quem implementou, compara a mudança com o que foi pedido. ' +
      'Reprovada, a tarefa volta com as pendências na íntegra.',
  },
  {
    n: '04',
    label: 'Entrega',
    principle:
      'Aprovada, a tarefa é publicada e fechada. As tarefas de uma fila saem numa única PR, e é ' +
      'essa PR que uma pessoa revisa.',
  },
];

export const aiRules = [
  {
    title: 'Quem escreve não aprova',
    text: 'Implementação e revisão são agentes diferentes, sem contexto em comum. Nenhuma etapa se aprova sozinha.',
  },
  {
    title: 'Prova é arquivo, não frase',
    text: 'Cada etapa entrega um artefato e um veredito. "Deu certo" escrito numa resposta não avança tarefa nenhuma.',
  },
  {
    title: 'Girar em falso tem limite',
    text: 'Há teto de ciclos, e a mesma pendência devolvida duas vezes seguidas bloqueia a tarefa antes do teto.',
  },
  {
    title: 'Autonomia com freio',
    text: 'Tarefa travada é registrada e a fila segue — exceto se outra tarefa depende dela. Aí o sistema para e pergunta.',
  },
  {
    title: 'Uma fila, uma PR',
    text: 'As tarefas de uma execução dividem a mesma entrega, e a revisão humana continua possível mesmo com dezenas delas.',
  },
  {
    title: 'Agentes genéricos',
    text: 'Os agentes não conhecem projeto nem convenção. O contexto de cada projeto mora num documento, e trocar de projeto é trocar esse documento.',
  },
];

export const aiHumanLoop = [
  {
    title: 'Dois canais, uma resposta',
    text: 'Toda pergunta chega ao mesmo tempo no terminal e no celular, e vale a primeira resposta que voltar.',
  },
  {
    title: 'A sessão acorda sozinha',
    text: 'Parada à espera de uma decisão, a sessão retoma o trabalho assim que a resposta chega, venha ela de onde vier.',
  },
  {
    title: 'Três avisos, e só',
    text: 'Pergunta, início do trabalho e entrega pronta. Progresso, etapa concluída e teste verde ficam no registro, não no bolso de ninguém.',
  },
];

export const aiMemory = [
  {
    title: 'Lição vira regra escrita',
    text: 'Cada erro que custou caro vira uma regra com o porquê e o jeito de aplicar, lida no começo das sessões seguintes.',
  },
  {
    title: 'Interface se olha',
    text: 'Nada de tela é dado por pronto sem ser aberto no navegador e visto em mais de uma largura.',
  },
  {
    title: 'Teste precisa provar que falha',
    text: 'Um defeito é injetado de propósito para ver o teste reprovar, e quem escolhe o defeito é o revisor, não quem escreveu o teste.',
  },
];

export const aiLessons = [
  {
    title: 'Teste descrito não é teste rodado',
    text: 'Um plano honesto, com todo o código executado, ainda trouxe testes que passariam com a guarda apagada. Desde então, teste que carrega peso é quebrado de propósito antes de valer.',
  },
  {
    title: 'Silêncio não prova que um agente morreu',
    text: 'Uma sessão caiu no meio de uma tarefa, e redespachá-la pôs dois agentes escrevendo os mesmos arquivos. Antes de redespachar, agora se confere se o anterior ainda trabalha.',
  },
  {
    title: 'Deploy quebrado pode parecer saudável',
    text: 'O build passava e só o envio falhava, então o site seguiu no ar servindo a versão velha por dias. Estado de entrega passou a ser conferido, e não presumido.',
  },
  {
    title: 'Número ausente não é zero',
    text: 'Uma ferramenta mostra zero onde não conseguiu medir. Publicar esse zero é afirmar algo falso, e o sistema distingue medido, não pontuado e não medido.',
  },
  {
    title: 'Medir, não ler',
    text: 'Trocar "abrir no navegador" por "ler o CSS" entregou um elemento que engolia cliques. A leitura diz o que o código pretende; só a medição diz o que ele faz.',
  },
];

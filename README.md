# Perfect English Grammar

Um site moderno e interativo para aprender gramática inglesa através de exercícios práticos, inspirado no design do [Perfect English Grammar](https://www.perfect-english-grammar.com/).

## 🎯 Sobre o Projeto

Este projeto é uma réplica fiel do site Perfect English Grammar, oferecendo:

- **Página inicial** com design atrativo e call-to-actions
- **25 exercícios de gramática** organizados por categoria
- **Exercícios interativos** com formulários funcionais
- **Interface responsiva** para desktop e mobile
- **Navegação intuitiva** com header fixo

## ✨ Funcionalidades

### 📚 Exercícios Disponíveis
- **Verb Tenses** (Present, Past, Future)
- **Conditionals** (Zero, First, Second, Third, Mixed)
- **Reported Speech** (Statements, Questions, Commands)
- **Phrasal Verbs** (Get, Take)
- **Modal Verbs** (Can/Could, May/Might, Must/Have to)
- **Passive Voice** (Present, Past)

### 🎮 Características dos Exercícios
- **3 exercícios completos** implementados com até 20 questões cada
- **Campos de resposta inline** no meio das frases

- **Barra de progresso** visual
- **Navegação entre questões** (anterior/próximo)
- **Grid de navegação rápida** entre questões
- **Página de resultados** com pontuação e porcentagem
- **Sistema de pontuação** automático

### 📱 Design Responsivo
- **Desktop**: Layout completo com sidebar de categorias
- **Tablet**: Layout adaptado com navegação otimizada
- **Mobile**: Menu hambúrguer e layout vertical

## 🚀 Tecnologias Utilizadas

- **React 19** - Framework principal
- **React Router DOM** - Navegação entre páginas
- **Vite** - Build tool e desenvolvimento
- **CSS3** - Estilização moderna e responsiva
- **JavaScript ES6+** - Funcionalidades interativas

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
```bash
git clone [url-do-repositorio]
cd ana-site
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto**
```bash
npm run dev
```

4. **Acesse no navegador**
```
http://localhost:5173
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   └── Header/              # Header de navegação
│       ├── Header.jsx       # Componente do header
│       └── Header.css       # Estilos do header
├── pages/
│   ├── home/                # Página inicial
│   │   ├── Home.jsx         # Componente da home
│   │   └── Home.css         # Estilos da home
│   ├── exercises/           # Lista de exercícios
│   │   ├── Exercises.jsx    # Componente da lista
│   │   └── Exercises.css    # Estilos da lista
│   └── exercise/            # Página individual de exercício
│       ├── Exercise.jsx     # Componente do exercício
│       └── Exercise.css     # Estilos do exercício
├── App.jsx                  # Componente principal
├── App.css                  # Estilos globais
├── index.css                # Estilos base
└── main.jsx                 # Ponto de entrada
```

## 🎨 Características do Design

### Paleta de Cores
- **Primária**: Gradiente roxo/azul (#667eea → #764ba2)
- **Secundária**: Dourado (#ffd700)
- **Fundo**: Cinza claro (#f8f9fa)
- **Texto**: Cinza escuro (#333)

### Elementos Visuais
- **Gradientes modernos** nos headers e botões
- **Sombras sutis** para profundidade
- **Bordas arredondadas** para modernidade
- **Animações suaves** nas transições
- **Tipografia clara** e legível

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Cria build de produção
npm run preview      # Visualiza o build de produção
npm run lint         # Executa o linter
```

## 📱 Responsividade

O site é totalmente responsivo e funciona perfeitamente em:

- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🎯 Exercícios Implementados

### 1. Present Simple (15 questões)
- Foco em verbos no presente simples
- Formas afirmativas, negativas e interrogativas

### 2. Present Continuous (18 questões)
- Ações em progresso no momento
- Uso correto do "be + verb + ing"

### 3. Present Perfect (20 questões)
- Ações completadas com relevância no presente
- Uso de "have/has + past participle"

## 🔮 Próximas Funcionalidades

- [ ] Implementar os 22 exercícios restantes
- [ ] Sistema de login/registro
- [ ] Progresso salvo no localStorage
- [ ] Modo escuro/claro
- [ ] Exercícios com áudio
- [ ] Certificados de conclusão

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido como projeto de estudo e prática de React.

---

**Perfect English Grammar** - Aprenda inglês de forma interativa e divertida! 🎓✨

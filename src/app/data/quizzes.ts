export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  color: string;
  bgColor: string;
  emoji: string;
  xpReward: number;
  questions: QuizQuestion[];
}

export const quizzes: Quiz[] = [
  {
    id: "js-quiz",
    title: "JavaScript Básico",
    description: "Teste seus conhecimentos em JavaScript",
    category: "JavaScript",
    color: "#F7DF1E",
    bgColor: "#FFF9C4",
    emoji: "⚡",
    xpReward: 50,
    questions: [
      {
        id: "js-q1",
        question: "Qual palavra-chave declara uma variável que NÃO pode ser reatribuída?",
        options: ["var", "let", "const", "static"],
        correctIndex: 2,
        explanation: "const declara uma constante — seu valor não pode ser reatribuído após a declaração.",
      },
      {
        id: "js-q2",
        question: "Qual o resultado de: typeof null?",
        options: ["null", "undefined", "object", "string"],
        correctIndex: 2,
        explanation: "typeof null retorna 'object'. É um bug histórico do JavaScript que foi mantido por compatibilidade.",
      },
      {
        id: "js-q3",
        question: "O que console.log(1 + '2') exibe?",
        options: ["3", "12", "'12'", "NaN"],
        correctIndex: 1,
        explanation: "Quando somamos um número com uma string, o JavaScript converte o número para string e concatena. Resultado: '12'.",
      },
      {
        id: "js-q4",
        question: "Qual método adiciona um elemento ao final de um array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctIndex: 0,
        explanation: "push() adiciona um ou mais elementos ao final do array e retorna o novo tamanho.",
      },
      {
        id: "js-q5",
        question: "O que é uma função arrow (=>)?",
        options: [
          "Uma função que aponta para outro arquivo",
          "Uma forma curta de escrever funções",
          "Uma função que só roda uma vez",
          "Um operador de comparação",
        ],
        correctIndex: 1,
        explanation: "Arrow functions são uma forma mais curta de escrever funções em JavaScript, introduzidas no ES6.",
      },
      {
        id: "js-q6",
        question: "Qual operador verifica igualdade de valor E tipo?",
        options: ["==", "===", "!=", "="],
        correctIndex: 1,
        explanation: "=== é a igualdade estrita — compara valor e tipo. Já == faz coerção de tipos antes de comparar.",
      },
    ],
  },
  {
    id: "react-quiz",
    title: "React Fundamentals",
    description: "Você conhece bem o React?",
    category: "React",
    color: "#61DAFB",
    bgColor: "#E0F7FA",
    emoji: "⚛️",
    xpReward: 75,
    questions: [
      {
        id: "r-q1",
        question: "O que é JSX?",
        options: [
          "Uma linguagem de programação separada",
          "Uma extensão de sintaxe do JavaScript para escrever HTML",
          "Um banco de dados do React",
          "Um gerenciador de pacotes",
        ],
        correctIndex: 1,
        explanation: "JSX é uma extensão de sintaxe que permite escrever elementos HTML dentro do JavaScript.",
      },
      {
        id: "r-q2",
        question: "Qual hook é usado para guardar estado em um componente?",
        options: ["useEffect", "useRef", "useState", "useContext"],
        correctIndex: 2,
        explanation: "useState retorna um par: o valor do estado atual e uma função para atualizá-lo.",
      },
      {
        id: "r-q3",
        question: "Para que serve o hook useEffect?",
        options: [
          "Para criar estilos CSS",
          "Para executar efeitos colaterais (fetch, timers, DOM)",
          "Para guardar valores sem re-renderizar",
          "Para criar contextos globais",
        ],
        correctIndex: 1,
        explanation: "useEffect é usado para side effects: chamadas de API, manipulação do DOM, timers e assinaturas.",
      },
      {
        id: "r-q4",
        question: "O que é uma prop no React?",
        options: [
          "Uma variável de estado interna",
          "Um dado passado de pai para filho",
          "Um método do ciclo de vida",
          "Um tipo especial de hook",
        ],
        correctIndex: 1,
        explanation: "Props (propriedades) são dados passados de um componente pai para um filho — são somente leitura.",
      },
      {
        id: "r-q5",
        question: "Por que usamos key em listas de elementos?",
        options: [
          "Para estilizar os itens",
          "Para nomear variáveis",
          "Para o React identificar quais itens mudaram",
          "Para ordenar os itens automaticamente",
        ],
        correctIndex: 2,
        explanation: "key ajuda o React a identificar elementos únicos na lista para otimizar atualizações do Virtual DOM.",
      },
    ],
  },
  {
    id: "html-css-quiz",
    title: "HTML & CSS",
    description: "Fundamentos de web para iniciantes",
    category: "Web",
    color: "#E44D26",
    bgColor: "#FBE9E7",
    emoji: "🎨",
    xpReward: 40,
    questions: [
      {
        id: "hc-q1",
        question: "Qual tag HTML define o título principal de uma página?",
        options: ["<title>", "<h1>", "<header>", "<head>"],
        correctIndex: 1,
        explanation: "<h1> define o cabeçalho/título principal do conteúdo. <title> define o título da aba do navegador.",
      },
      {
        id: "hc-q2",
        question: "Qual propriedade CSS centraliza um elemento horizontalmente?",
        options: ["text-align: center", "align: center", "margin: 0 auto", "position: center"],
        correctIndex: 2,
        explanation: "margin: 0 auto centraliza um bloco horizontalmente quando a largura está definida.",
      },
      {
        id: "hc-q3",
        question: "O que significa CSS?",
        options: [
          "Computer Style Sheets",
          "Cascading Style Sheets",
          "Creative Style System",
          "Colorful Styling Syntax",
        ],
        correctIndex: 1,
        explanation: "CSS significa Cascading Style Sheets (Folhas de Estilo em Cascata).",
      },
      {
        id: "hc-q4",
        question: "Qual seletor CSS aplica estilo a todos os parágrafos com classe 'destaque'?",
        options: ["p#destaque", "p.destaque", "#p destaque", ".p.destaque"],
        correctIndex: 1,
        explanation: "p.destaque seleciona parágrafos que possuem a classe 'destaque'. O ponto (.) indica classe.",
      },
      {
        id: "hc-q5",
        question: "Qual valor de display cria um layout flexível?",
        options: ["block", "inline", "flex", "grid"],
        correctIndex: 2,
        explanation: "display: flex ativa o Flexbox, permitindo alinhar e distribuir elementos de forma flexível.",
      },
    ],
  },
  {
    id: "logic-quiz",
    title: "Lógica de Programação",
    description: "Teste sua lógica e raciocínio",
    category: "Fundamentos",
    color: "#9C27B0",
    bgColor: "#F3E5F5",
    emoji: "🧠",
    xpReward: 60,
    questions: [
      {
        id: "l-q1",
        question: "O que é um algoritmo?",
        options: [
          "Um tipo de linguagem de programação",
          "Um conjunto de passos para resolver um problema",
          "Um erro no código",
          "Um banco de dados",
        ],
        correctIndex: 1,
        explanation: "Um algoritmo é uma sequência finita de passos bem definidos para resolver um problema.",
      },
      {
        id: "l-q2",
        question: "Qual estrutura repete um bloco de código um número fixo de vezes?",
        options: ["if/else", "switch", "for", "try/catch"],
        correctIndex: 2,
        explanation: "O laço for é ideal quando sabemos exatamente quantas vezes o código deve repetir.",
      },
      {
        id: "l-q3",
        question: "O que é uma função recursiva?",
        options: [
          "Uma função que nunca termina",
          "Uma função que chama a si mesma",
          "Uma função sem parâmetros",
          "Uma função que retorna outra função",
        ],
        correctIndex: 1,
        explanation: "Uma função recursiva é aquela que chama a si mesma, geralmente com um caso base para parar.",
      },
      {
        id: "l-q4",
        question: "Qual estrutura de dados funciona como uma pilha (LIFO)?",
        options: ["Fila (Queue)", "Pilha (Stack)", "Árvore (Tree)", "Grafo (Graph)"],
        correctIndex: 1,
        explanation: "Stack (pilha) segue o princípio LIFO: Last In, First Out — o último a entrar é o primeiro a sair.",
      },
      {
        id: "l-q5",
        question: "O que significa 'depurar' (debug) um código?",
        options: [
          "Escrever código mais rápido",
          "Traduzir código para outra linguagem",
          "Encontrar e corrigir erros no código",
          "Comentar partes do código",
        ],
        correctIndex: 2,
        explanation: "Depurar (debug) é o processo de encontrar, analisar e corrigir erros (bugs) em um programa.",
      },
    ],
  },
];

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id);
}

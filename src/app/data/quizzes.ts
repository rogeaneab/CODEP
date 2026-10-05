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
        question: "Qual estrutura você usa quando precisa repetir uma ação várias vezes sem copiar e colar o código?",
        options: ["if/else", "const", "um laço de repetição (for/while)", "console.log"],
        correctIndex: 2,
        explanation: "Laços como for e while repetem um bloco de código, controlando a condição de parada.",
      },
      {
        id: "js-q3",
        question: "Dado const frutas = ['maçã', 'banana', 'uva'], o que frutas[0] retorna?",
        options: ["'banana'", "'maçã'", "3", "undefined"],
        correctIndex: 1,
        explanation: "O índice começa em 0, então frutas[0] é o primeiro elemento: 'maçã'.",
      },
      {
        id: "js-q4",
        question: "Num array notas com 4 números, como você acessa a ÚLTIMA nota?",
        options: ["notas[4]", "notas[-1]", "notas[notas.length - 1]", "notas.last()"],
        correctIndex: 2,
        explanation: "notas.length - 1 é o índice do último elemento, já que os índices vão de 0 até length - 1.",
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
    id: "logic-quiz",
    title: "Lógica de Programação",
    description: "Teste o que você aprendeu sobre sequência, condição, repetição e pseudocódigo",
    category: "Lógica",
    color: "#9C27B0",
    bgColor: "#F3E5F5",
    emoji: "🧠",
    xpReward: 60,
    questions: [
      {
        id: "l-q1",
        question: "Todo algoritmo, em qualquer linguagem, é formado por 3 blocos. Quais são eles?",
        options: [
          "Variável, função e classe",
          "Sequência, condição e repetição",
          "Entrada, processamento e saída",
          "Compilação, execução e depuração",
        ],
        correctIndex: 1,
        explanation: "Sequência (passos em ordem), condição (se... então... senão...) e repetição são os 3 blocos que formam qualquer algoritmo.",
      },
      {
        id: "l-q2",
        question: "Qual bloco você usa quando precisa escolher um caminho dependendo de uma situação (ex.: 'se estiver chovendo, leve guarda-chuva')?",
        options: ["Sequência", "Condição", "Repetição", "Pseudocódigo"],
        correctIndex: 1,
        explanation: "Condição é o bloco que escolhe um caminho com base numa comparação — o 'se... então... senão...'.",
      },
      {
        id: "l-q3",
        question: "O que é pseudocódigo?",
        options: [
          "Um código que tem erro de sintaxe",
          "Uma descrição de um algoritmo em texto simples, sem sintaxe de nenhuma linguagem específica",
          "Um tipo de linguagem compilada",
          "Um comentário dentro do código",
        ],
        correctIndex: 1,
        explanation: "Pseudocódigo é um rascunho da lógica em texto simples, que qualquer programador entende antes de traduzir para uma linguagem real.",
      },
      {
        id: "l-q4",
        question: "No pseudocódigo \"seja N = 7; se N for maior que 5, escreva 'grande'; senão, escreva 'pequeno'\", o que é exibido?",
        options: ["grande", "pequeno", "7", "Dá erro"],
        correctIndex: 0,
        explanation: "Como 7 é maior que 5, a condição é verdadeira e o algoritmo escreve 'grande'.",
      },
      {
        id: "l-q5",
        question: "Qual bloco você usa pra fazer a mesma coisa várias vezes, até algo acontecer (ex.: 'bata o ovo até ficar homogêneo')?",
        options: ["Sequência", "Condição", "Repetição", "Entrada e saída"],
        correctIndex: 2,
        explanation: "Repetição é o bloco que repete uma ação várias vezes, até uma condição de parada ser satisfeita.",
      },
    ],
  },
];

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id);
}

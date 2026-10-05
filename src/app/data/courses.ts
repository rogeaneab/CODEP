export interface Course {
  id: string;
  title: string;
  description: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
  duration: string;
  lessons: number;
  image: string;
  category: string;
  enrolled: boolean;
  progress: number;
  /** Trilha visível na biblioteca, mas ainda travada (conteúdo não revisado
   * para o nível introdutório). Aparece como "Em breve". */
  comingSoon?: boolean;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: string;
  code: string;
  solution: string;
  completed: boolean;
  type: "theory" | "practice" | "quiz";
  videoUrl?: string;
}

export const courses: Course[] = [
  {
    id: "javascript-basics",
    title: "JavaScript para Iniciantes",
    description: "Aprenda os fundamentos da programação JavaScript do zero",
    level: "Iniciante",
    duration: "8 horas",
    lessons: 10,
    image: "programming laptop code",
    category: "JavaScript",
    enrolled: true,
    progress: 0,
  },
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    description: "Construa aplicações web modernas com React",
    level: "Intermediário",
    duration: "12 horas",
    lessons: 5,
    image: "web development interface",
    category: "React",
    enrolled: false,
    progress: 0,
    comingSoon: true,
  },
  {
    id: "python-data-science",
    title: "Python para Data Science",
    description: "Análise de dados e visualização com Python",
    level: "Intermediário",
    duration: "15 horas",
    lessons: 5,
    image: "data analytics graphs",
    category: "Python",
    enrolled: false,
    progress: 0,
    comingSoon: true,
  },
  {
    id: "nodejs-backend",
    title: "Node.js Backend Development",
    description: "Crie APIs robustas com Node.js e Express",
    level: "Avançado",
    duration: "20 horas",
    lessons: 5,
    image: "server technology code",
    category: "Node.js",
    enrolled: false,
    progress: 0,
    comingSoon: true,
  },
  {
    id: "css-advanced",
    title: "CSS Avançado e Animações",
    description: "Domine CSS Grid, Flexbox e animações complexas",
    level: "Intermediário",
    duration: "10 horas",
    lessons: 4,
    image: "design interface creative",
    category: "CSS",
    enrolled: false,
    progress: 0,
    comingSoon: true,
  },
  {
    id: "typescript-mastery",
    title: "TypeScript Mastery",
    description: "TypeScript avançado para projetos escaláveis",
    level: "Avançado",
    duration: "18 horas",
    lessons: 4,
    image: "coding typescript developer",
    category: "TypeScript",
    enrolled: false,
    progress: 0,
    comingSoon: true,
  },
];

const JS_VIDEO = "https://www.youtube.com/embed/PkZNo7MFNFg";
const REACT_VIDEO = "https://www.youtube.com/embed/bMknfKXIFA8";
const PYTHON_VIDEO = "https://www.youtube.com/embed/rfscVS0vtbw";
const NODE_VIDEO = "https://www.youtube.com/embed/Oe421EPjeBE";
const CSS_VIDEO = "https://www.youtube.com/embed/OXGznpKZ_sA";
const TS_VIDEO = "https://www.youtube.com/embed/30LWjhZzeSQ";

export const lessons: Lesson[] = [
  // ── JAVASCRIPT ──────────────────────────────────────────
  {
    id: "js-1", courseId: "javascript-basics",
    title: "Introdução ao JavaScript",
    description: "O que é JavaScript, onde é usado e por que aprender em 2026.",
    content: `# Introdução ao JavaScript\n\nJavaScript é a linguagem da web moderna.\n\n## Por que aprender?\n\n- Roda em todos os navegadores\n- Usado no frontend e backend\n- Grande ecossistema e comunidade`,
    code: "console.log('Olá, mundo!');", solution: "console.log('Olá, mundo!');",
    completed: false, type: "theory", videoUrl: JS_VIDEO,
  },
  {
    id: "js-ex-1", courseId: "javascript-basics",
    title: "Exercício: Olá Mundo",
    description: "Exiba sua primeira mensagem no console.",
    content: `# Olá Mundo\n\nUse \`console.log()\` para exibir uma mensagem.\n\n## Tarefa\n\nExiba a mensagem **"Olá, mundo!"** no console.`,
    code: "// Escreva seu código aqui\n",
    solution: `console.log("Olá, mundo!");`,
    completed: false, type: "practice",
  },
  {
    id: "js-2", courseId: "javascript-basics",
    title: "Variáveis e Tipos de Dados",
    description: "let, const, var e os tipos primitivos do JavaScript.",
    content: `# Variáveis\n\nUsamos variáveis para armazenar dados.\n\n## let e const\n\n\`\`\`js\nlet nome = "Maria";\nconst PI = 3.14;\n\`\`\``,
    code: "let nome = 'Maria';\nconsole.log(nome);", solution: "let nome = 'Maria';\nconsole.log(nome);",
    completed: false, type: "theory", videoUrl: JS_VIDEO,
  },
  {
    id: "js-ex-2", courseId: "javascript-basics",
    title: "Exercício: Calculadora Simples",
    description: "Crie variáveis e faça operações matemáticas.",
    content: `# Calculadora\n\n## Tarefa\n\n1. Declare duas variáveis numéricas \`a\` e \`b\`\n2. Calcule a soma, subtração, multiplicação e divisão\n3. Exiba cada resultado no console`,
    code: "const a = 10;\nconst b = 3;\n\n// Calcule e exiba os resultados\n",
    solution: `const a = 10;\nconst b = 3;\nconsole.log("Soma:", a + b);\nconsole.log("Subtração:", a - b);\nconsole.log("Multiplicação:", a * b);\nconsole.log("Divisão:", a / b);`,
    completed: false, type: "practice",
  },
  {
    id: "js-3", courseId: "javascript-basics",
    title: "Condicionais: if, else e else if",
    description: "Tome decisões no código comparando valores com if/else.",
    content: `# Condicionais\n\nCondicionais decidem qual trecho de código roda, a partir de uma comparação.\n\n## if / else if / else\n\n\`\`\`js\nconst idade = 16;\n\nif (idade >= 18) {\n  console.log("Maior de idade");\n} else {\n  console.log("Menor de idade");\n}\n\`\`\`\n\n## Operadores de comparação\n\n- \`===\` igual\n- \`!==\` diferente\n- \`>\`, \`<\`, \`>=\`, \`<=\``,
    code: "const idade = 16;\n\nif (idade >= 18) {\n  console.log('Maior de idade');\n} else {\n  console.log('Menor de idade');\n}",
    solution: "const idade = 16;\n\nif (idade >= 18) {\n  console.log('Maior de idade');\n} else {\n  console.log('Menor de idade');\n}",
    completed: false, type: "theory", videoUrl: JS_VIDEO,
  },
  {
    id: "js-ex-3", courseId: "javascript-basics",
    title: "Exercício: Verificador de Idade",
    description: "Use condicionais para classificar uma idade.",
    content: `# Verificador de Idade\n\n## Tarefa\n\nDada uma variável \`idade\`, exiba:\n- "Menor de idade" se menor que 18\n- "Maior de idade" se 18 ou mais\n- "Idoso" se 60 ou mais`,
    code: "const idade = 25;\n\n// Escreva sua lógica aqui\n",
    solution: `const idade = 25;\nif (idade >= 60) {\n  console.log("Idoso");\n} else if (idade >= 18) {\n  console.log("Maior de idade");\n} else {\n  console.log("Menor de idade");\n}`,
    completed: false, type: "practice",
  },
  {
    id: "js-4", courseId: "javascript-basics",
    title: "Funções e Escopo",
    description: "Como declarar funções, arrow functions e entender escopo.",
    content: `# Funções\n\nFunções são blocos de código reutilizáveis.\n\n## Arrow Function\n\n\`\`\`js\nconst somar = (a, b) => a + b;\n\`\`\``,
    code: "const somar = (a, b) => a + b;\nconsole.log(somar(2, 3));", solution: "const somar = (a, b) => a + b;\nconsole.log(somar(2, 3));",
    completed: false, type: "theory", videoUrl: JS_VIDEO,
  },
  {
    id: "js-ex-4", courseId: "javascript-basics",
    title: "Exercício: Função de Saudação",
    description: "Crie uma função que recebe um nome e retorna uma saudação.",
    content: `# Função de Saudação\n\n## Tarefa\n\nCrie uma função \`saudar(nome)\` que retorna a string \`"Olá, [nome]!"\` e exiba o resultado no console.`,
    code: "// Crie a função saudar aqui\n\nconsole.log(saudar('Maria'));",
    solution: `function saudar(nome) {\n  return "Olá, " + nome + "!";\n}\nconsole.log(saudar('Maria'));`,
    completed: false, type: "practice",
  },
  {
    id: "js-5", courseId: "javascript-basics",
    title: "Arrays e Objetos",
    description: "Estruturas de dados fundamentais: arrays e objetos literais.",
    content: `# Arrays e Objetos\n\n## Array\n\n\`\`\`js\nconst frutas = ['maçã', 'banana'];\n\`\`\`\n\n## Objeto\n\n\`\`\`js\nconst pessoa = { nome: 'Ana', idade: 25 };\n\`\`\``,
    code: "const frutas = ['maçã', 'banana'];\nconsole.log(frutas[0]);", solution: "const frutas = ['maçã', 'banana'];\nconsole.log(frutas[0]);",
    completed: false, type: "theory", videoUrl: JS_VIDEO,
  },
  {
    id: "js-6", courseId: "javascript-basics",
    title: "DOM e Eventos",
    description: "Manipule elementos HTML com JavaScript e responda a eventos.",
    content: `# DOM\n\nO Document Object Model representa a página como uma árvore.\n\n\`\`\`js\ndocument.getElementById('btn').addEventListener('click', () => {\n  alert('Clicou!');\n});\n\`\`\``,
    code: "// No browser:\n// document.querySelector('h1').textContent = 'Olá!';", solution: "",
    completed: false, type: "theory", videoUrl: JS_VIDEO,
  },

  // ── REACT ────────────────────────────────────────────────
  {
    id: "react-1", courseId: "react-fundamentals",
    title: "Introdução ao React",
    description: "O que é React, Virtual DOM e por que usar componentes.",
    content: `# React\n\nBiblioteca para criar interfaces declarativas baseadas em componentes.`,
    code: "function App() {\n  return <h1>Olá React!</h1>;\n}", solution: "function App() {\n  return <h1>Olá React!</h1>;\n}",
    completed: true, type: "theory", videoUrl: REACT_VIDEO,
  },
  {
    id: "react-2", courseId: "react-fundamentals",
    title: "JSX e Props",
    description: "A sintaxe JSX e como passar dados entre componentes via props.",
    content: `# JSX\n\nPermite escrever HTML dentro do JavaScript.\n\n\`\`\`jsx\nfunction Card({ titulo }) {\n  return <h2>{titulo}</h2>;\n}\n\`\`\``,
    code: "function Card({ titulo }) {\n  return <h2>{titulo}</h2>;\n}", solution: "function Card({ titulo }) {\n  return <h2>{titulo}</h2>;\n}",
    completed: true, type: "theory", videoUrl: REACT_VIDEO,
  },
  {
    id: "react-3", courseId: "react-fundamentals",
    title: "useState e Reatividade",
    description: "Gerencie estado local com o hook useState.",
    content: `# useState\n\n\`\`\`jsx\nconst [count, setCount] = useState(0);\n\`\`\``,
    code: "// const [count, setCount] = useState(0);", solution: "",
    completed: false, type: "theory", videoUrl: REACT_VIDEO,
  },
  {
    id: "react-4", courseId: "react-fundamentals",
    title: "useEffect e Ciclo de Vida",
    description: "Execute efeitos colaterais e busque dados com useEffect.",
    content: `# useEffect\n\n\`\`\`jsx\nuseEffect(() => {\n  fetch('/api/data').then(...);\n}, []);\n\`\`\``,
    code: "// useEffect(() => { console.log('montou!'); }, []);", solution: "",
    completed: false, type: "theory", videoUrl: REACT_VIDEO,
  },
  {
    id: "react-5", courseId: "react-fundamentals",
    title: "Listas e Renderização Condicional",
    description: "Renderize listas com map() e condicionais com operador ternário.",
    content: `# Listas\n\n\`\`\`jsx\nitems.map(item => <li key={item.id}>{item.nome}</li>)\n\`\`\``,
    code: "const items = ['A', 'B', 'C'];\n// items.map(...)", solution: "",
    completed: false, type: "theory", videoUrl: REACT_VIDEO,
  },

  // ── PYTHON ───────────────────────────────────────────────
  {
    id: "py-1", courseId: "python-data-science",
    title: "Introdução ao Python",
    description: "Sintaxe básica, variáveis e tipos de dados em Python.",
    content: `# Python\n\nLinguagem simples, poderosa e ideal para ciência de dados.`,
    code: "print('Olá, Python!')", solution: "print('Olá, Python!')",
    completed: false, type: "theory", videoUrl: PYTHON_VIDEO,
  },
  {
    id: "py-2", courseId: "python-data-science",
    title: "Listas, Tuplas e Dicionários",
    description: "As principais estruturas de dados do Python.",
    content: `# Estruturas de Dados\n\n\`\`\`python\nlista = [1, 2, 3]\ndic = {'nome': 'Ana'}\n\`\`\``,
    code: "lista = [1, 2, 3]\nprint(lista[0])", solution: "lista = [1, 2, 3]\nprint(lista[0])",
    completed: false, type: "theory", videoUrl: PYTHON_VIDEO,
  },
  {
    id: "py-3", courseId: "python-data-science",
    title: "NumPy e Pandas",
    description: "As bibliotecas fundamentais para análise de dados.",
    content: `# NumPy e Pandas\n\n\`\`\`python\nimport pandas as pd\ndf = pd.read_csv('dados.csv')\n\`\`\``,
    code: "# import pandas as pd\n# df = pd.DataFrame({'A': [1,2,3]})", solution: "",
    completed: false, type: "theory", videoUrl: PYTHON_VIDEO,
  },
  {
    id: "py-4", courseId: "python-data-science",
    title: "Visualização com Matplotlib",
    description: "Crie gráficos e visualizações com Matplotlib e Seaborn.",
    content: `# Matplotlib\n\n\`\`\`python\nimport matplotlib.pyplot as plt\nplt.plot([1, 2, 3], [4, 5, 6])\nplt.show()\n\`\`\``,
    code: "# import matplotlib.pyplot as plt\n# plt.bar(['A','B'], [10,20])", solution: "",
    completed: false, type: "theory", videoUrl: PYTHON_VIDEO,
  },
  {
    id: "py-5", courseId: "python-data-science",
    title: "Machine Learning com Scikit-learn",
    description: "Primeiros passos com modelos de machine learning.",
    content: `# Scikit-learn\n\n\`\`\`python\nfrom sklearn.linear_model import LinearRegression\nmodel = LinearRegression()\n\`\`\``,
    code: "# from sklearn.linear_model import LinearRegression", solution: "",
    completed: false, type: "theory", videoUrl: PYTHON_VIDEO,
  },

  // ── NODE.JS ──────────────────────────────────────────────
  {
    id: "node-1", courseId: "nodejs-backend",
    title: "Introdução ao Node.js",
    description: "O que é Node.js, event loop e como instalar.",
    content: `# Node.js\n\nAmbiente de execução JavaScript no servidor.`,
    code: "console.log('Servidor Node.js!');", solution: "console.log('Servidor Node.js!');",
    completed: false, type: "theory", videoUrl: NODE_VIDEO,
  },
  {
    id: "node-2", courseId: "nodejs-backend",
    title: "Express e Roteamento",
    description: "Crie um servidor HTTP com Express e defina rotas.",
    content: `# Express\n\n\`\`\`js\nconst app = express();\napp.get('/', (req, res) => res.send('Olá!'));\n\`\`\``,
    code: "// const express = require('express');", solution: "",
    completed: false, type: "theory", videoUrl: NODE_VIDEO,
  },
  {
    id: "node-3", courseId: "nodejs-backend",
    title: "APIs REST com Express",
    description: "Construa uma API RESTful com os métodos GET, POST, PUT e DELETE.",
    content: `# REST API\n\nMétodos HTTP: GET (ler), POST (criar), PUT (atualizar), DELETE (apagar).`,
    code: "// app.post('/users', (req, res) => { ... });", solution: "",
    completed: false, type: "theory", videoUrl: NODE_VIDEO,
  },
  {
    id: "node-4", courseId: "nodejs-backend",
    title: "Banco de Dados com MongoDB",
    description: "Conecte sua API a um banco de dados NoSQL com Mongoose.",
    content: `# MongoDB\n\n\`\`\`js\nconst mongoose = require('mongoose');\nmongoose.connect('mongodb://localhost/mydb');\n\`\`\``,
    code: "// mongoose.connect('...');", solution: "",
    completed: false, type: "theory", videoUrl: NODE_VIDEO,
  },
  {
    id: "node-5", courseId: "nodejs-backend",
    title: "Autenticação com JWT",
    description: "Implemente autenticação segura com JSON Web Tokens.",
    content: `# JWT\n\n\`\`\`js\nconst token = jwt.sign({ id: user._id }, process.env.SECRET);\n\`\`\``,
    code: "// const jwt = require('jsonwebtoken');", solution: "",
    completed: false, type: "theory", videoUrl: NODE_VIDEO,
  },

  // ── CSS ──────────────────────────────────────────────────
  {
    id: "css-1", courseId: "css-advanced",
    title: "Flexbox Completo",
    description: "Domine o modelo de layout Flexbox do início ao fim.",
    content: `# Flexbox\n\n\`\`\`css\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\`\`\``,
    code: "/* display: flex; justify-content: center; */", solution: "",
    completed: false, type: "theory", videoUrl: CSS_VIDEO,
  },
  {
    id: "css-2", courseId: "css-advanced",
    title: "CSS Grid Layout",
    description: "Crie layouts complexos de duas dimensões com CSS Grid.",
    content: `# CSS Grid\n\n\`\`\`css\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}\n\`\`\``,
    code: "/* display: grid; grid-template-columns: repeat(3, 1fr); */", solution: "",
    completed: false, type: "theory", videoUrl: CSS_VIDEO,
  },
  {
    id: "css-3", courseId: "css-advanced",
    title: "Animações e Transitions",
    description: "Crie animações suaves com transition e @keyframes.",
    content: `# Animações\n\n\`\`\`css\n.btn {\n  transition: background 0.3s ease;\n}\n@keyframes fadeIn {\n  from { opacity: 0; }\n  to   { opacity: 1; }\n}\n\`\`\``,
    code: "/* transition: all 0.3s ease; */", solution: "",
    completed: false, type: "theory", videoUrl: CSS_VIDEO,
  },
  {
    id: "css-4", courseId: "css-advanced",
    title: "Responsividade e Media Queries",
    description: "Adapte seu layout para mobile, tablet e desktop.",
    content: `# Media Queries\n\n\`\`\`css\n@media (max-width: 768px) {\n  .container { flex-direction: column; }\n}\n\`\`\``,
    code: "/* @media (max-width: 768px) { ... } */", solution: "",
    completed: false, type: "theory", videoUrl: CSS_VIDEO,
  },

  // ── TYPESCRIPT ───────────────────────────────────────────
  {
    id: "ts-1", courseId: "typescript-mastery",
    title: "Introdução ao TypeScript",
    description: "O que é TypeScript e como ele melhora o JavaScript.",
    content: `# TypeScript\n\nSuperset do JavaScript com tipagem estática.`,
    code: "const nome: string = 'Maria';\nconsole.log(nome);", solution: "const nome: string = 'Maria';\nconsole.log(nome);",
    completed: true, type: "theory", videoUrl: TS_VIDEO,
  },
  {
    id: "ts-2", courseId: "typescript-mastery",
    title: "Tipos e Interfaces",
    description: "Defina contratos de dados com types e interfaces.",
    content: `# Interfaces\n\n\`\`\`ts\ninterface User {\n  id: number;\n  name: string;\n}\n\`\`\``,
    code: "interface User {\n  id: number;\n  name: string;\n}", solution: "",
    completed: false, type: "theory", videoUrl: TS_VIDEO,
  },
  {
    id: "ts-3", courseId: "typescript-mastery",
    title: "Generics",
    description: "Escreva código reutilizável e tipado com Generics.",
    content: `# Generics\n\n\`\`\`ts\nfunction identity<T>(arg: T): T {\n  return arg;\n}\n\`\`\``,
    code: "function identity<T>(arg: T): T {\n  return arg;\n}", solution: "",
    completed: false, type: "theory", videoUrl: TS_VIDEO,
  },
  {
    id: "ts-4", courseId: "typescript-mastery",
    title: "TypeScript com React",
    description: "Como usar TypeScript em projetos React com tipagem de props.",
    content: `# TS + React\n\n\`\`\`tsx\ninterface Props {\n  title: string;\n}\nfunction Card({ title }: Props) {\n  return <h1>{title}</h1>;\n}\n\`\`\``,
    code: "// interface Props { title: string; }", solution: "",
    completed: false, type: "theory", videoUrl: TS_VIDEO,
  },

  // ── EXERCÍCIOS REACT ──────────────────────────────────────
  {
    id: "react-ex-1", courseId: "react-fundamentals",
    title: "Exercício: Primeiro Componente",
    description: "Crie um componente funcional simples.",
    content: `# Componente React\n\n## Tarefa\n\nCrie um componente \`Ola\` que renderiza \`<h1>Olá, React!</h1>\`.`,
    code: "function Ola() {\n  // Complete o return\n  return null;\n}\n\nconsole.log('Componente criado!');",
    solution: `function Ola() {\n  return '<h1>Olá, React!</h1>';\n}\nconsole.log('Componente criado!');`,
    completed: false, type: "practice",
  },
  {
    id: "react-ex-2", courseId: "react-fundamentals",
    title: "Exercício: Props e Dados",
    description: "Passe dados para um componente via props.",
    content: `# Props\n\n## Tarefa\n\nCrie uma função \`Card\` que recebe \`titulo\` e \`descricao\` como parâmetros e retorna uma string formatada.`,
    code: "function Card(titulo, descricao) {\n  // Retorne uma string formatada\n}\n\nconsole.log(Card('React', 'Biblioteca JS'));",
    solution: `function Card(titulo, descricao) {\n  return titulo + ": " + descricao;\n}\nconsole.log(Card('React', 'Biblioteca JS'));`,
    completed: false, type: "practice",
  },

  // ── EXERCÍCIOS PYTHON ─────────────────────────────────────
  {
    id: "py-ex-1", courseId: "python-data-science",
    title: "Exercício: Variáveis Python",
    description: "Declare variáveis e exiba no console.",
    content: `# Variáveis Python\n\n## Tarefa\n\nDeclare uma variável \`nome\` com seu nome e \`ano\` com o ano atual. Exiba a mensagem: \`"[nome] em [ano]"\``,
    code: "nome = 'Ana'\nano = 2026\n\n# Exiba a mensagem formatada\n",
    solution: `nome = 'Ana'\nano = 2026\nprint(nome + ' em ' + str(ano))`,
    completed: false, type: "practice",
  },
  {
    id: "py-ex-2", courseId: "python-data-science",
    title: "Exercício: Soma de Lista",
    description: "Percorra uma lista e calcule a soma dos elementos.",
    content: `# Soma de Lista\n\n## Tarefa\n\nDada a lista \`numeros\`, calcule e exiba a soma de todos os elementos.`,
    code: "numeros = [10, 20, 30, 40, 50]\n\n# Calcule a soma\n",
    solution: `numeros = [10, 20, 30, 40, 50]\ntotal = sum(numeros)\nprint('Soma:', total)`,
    completed: false, type: "practice",
  },

  // ── EXERCÍCIOS NODE ───────────────────────────────────────
  {
    id: "node-ex-1", courseId: "nodejs-backend",
    title: "Exercício: Função de Rota",
    description: "Simule o handler de uma rota Express.",
    content: `# Handler de Rota\n\n## Tarefa\n\nCrie uma função \`handleGet\` que recebe um objeto \`req\` com \`req.params.id\` e retorna a string \`"Usuário ID: [id]"\`.`,
    code: "function handleGet(req) {\n  // Retorne a string correta\n}\n\nconsole.log(handleGet({ params: { id: 42 } }));",
    solution: `function handleGet(req) {\n  return 'Usuário ID: ' + req.params.id;\n}\nconsole.log(handleGet({ params: { id: 42 } }));`,
    completed: false, type: "practice",
  },
  {
    id: "node-ex-2", courseId: "nodejs-backend",
    title: "Exercício: Validação de Dados",
    description: "Valide se um objeto possui os campos obrigatórios.",
    content: `# Validação\n\n## Tarefa\n\nCrie uma função \`validar(dados)\` que retorna \`true\` se o objeto tiver \`nome\` e \`email\`, ou \`false\` caso contrário.`,
    code: "function validar(dados) {\n  // Retorne true ou false\n}\n\nconsole.log(validar({ nome: 'Ana', email: 'ana@email.com' }));\nconsole.log(validar({ nome: 'Bob' }));",
    solution: `function validar(dados) {\n  return !!(dados.nome && dados.email);\n}\nconsole.log(validar({ nome: 'Ana', email: 'ana@email.com' }));\nconsole.log(validar({ nome: 'Bob' }));`,
    completed: false, type: "practice",
  },

  // ── EXERCÍCIOS CSS ────────────────────────────────────────
  {
    id: "css-ex-1", courseId: "css-advanced",
    title: "Exercício: Flexbox Center",
    description: "Use Flexbox para centralizar um elemento.",
    content: `# Centralize com Flexbox\n\n## Tarefa\n\nComplete o CSS para centralizar \`.box\` horizontal e verticalmente dentro de \`.container\` usando Flexbox.`,
    code: "/* Complete o CSS */\n.container {\n  width: 400px;\n  height: 300px;\n  /* adicione display flex aqui */\n}\n\n.box {\n  width: 100px;\n  height: 100px;\n  background: blue;\n}",
    solution: `.container {\n  width: 400px;\n  height: 300px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.box {\n  width: 100px;\n  height: 100px;\n  background: blue;\n}`,
    completed: false, type: "practice",
  },
  {
    id: "css-ex-2", courseId: "css-advanced",
    title: "Exercício: Grid de 3 Colunas",
    description: "Crie um layout de 3 colunas iguais com CSS Grid.",
    content: `# Grid Layout\n\n## Tarefa\n\nComplete o CSS para criar um grid com 3 colunas de tamanhos iguais e espaçamento de 16px entre elas.`,
    code: "/* Complete o CSS */\n.grid {\n  /* adicione display grid */\n  /* 3 colunas iguais */\n  /* gap de 16px */\n}",
    solution: `.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}`,
    completed: false, type: "practice",
  },

  // ── EXERCÍCIOS TYPESCRIPT ─────────────────────────────────
  {
    id: "ts-ex-1", courseId: "typescript-mastery",
    title: "Exercício: Tipagem Básica",
    description: "Adicione tipos às variáveis e função.",
    content: `# Tipos TypeScript\n\n## Tarefa\n\nComplete o código adicionando os tipos corretos às variáveis e ao retorno da função \`somar\`.`,
    code: "const nome = 'Maria';\nconst idade = 25;\nconst ativo = true;\n\nfunction somar(a, b) {\n  return a + b;\n}\n\nconsole.log(somar(10, 20));",
    solution: `const nome: string = 'Maria';\nconst idade: number = 25;\nconst ativo: boolean = true;\n\nfunction somar(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(somar(10, 20));`,
    completed: false, type: "practice",
  },
  {
    id: "ts-ex-2", courseId: "typescript-mastery",
    title: "Exercício: Interface de Usuário",
    description: "Crie uma interface e use-a para tipar um objeto.",
    content: `# Interface\n\n## Tarefa\n\nCrie uma interface \`Usuario\` com \`id: number\`, \`nome: string\` e \`email: string\`. Depois crie um objeto que respeite essa interface.`,
    code: "// Crie a interface Usuario aqui\n\n// Crie o objeto usuario aqui\n\nconsole.log('Interface criada!');",
    solution: `interface Usuario {\n  id: number;\n  nome: string;\n  email: string;\n}\n\nconst usuario: Usuario = {\n  id: 1,\n  nome: 'Ana',\n  email: 'ana@email.com'\n};\n\nconsole.log('Interface criada!');`,
    completed: false, type: "practice",
  },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find(course => course.id === id);
}

export function getLessonsByCourseId(courseId: string): Lesson[] {
  return lessons.filter(lesson => lesson.courseId === courseId);
}

export function getLessonById(lessonId: string): Lesson | undefined {
  return lessons.find(lesson => lesson.id === lessonId);
}

/** Uma unidade de aprendizado: teoria + prática da mesma lição, exibidas
 * juntas na mesma tela (ver Lesson.tsx). */
export interface Unit {
  theory?: Lesson;
  practice?: Lesson;
}

/** Agrupa a sequência de aulas de um curso em unidades teoria+prática. */
export function getCourseUnits(courseId: string): Unit[] {
  const courseLessons = getLessonsByCourseId(courseId);
  const units: Unit[] = [];
  for (const l of courseLessons) {
    if (l.videoUrl) {
      units.push({ theory: l });
    } else {
      const last = units[units.length - 1];
      if (last && !last.practice) last.practice = l;
      else units.push({ practice: l });
    }
  }
  return units;
}

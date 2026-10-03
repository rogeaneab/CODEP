import { useState } from "react";
import { Trophy, Zap, Clock, Code2, CheckCircle2, Lock, Target, Star, ChevronRight, Flame, ArrowLeft, RotateCcw, Play, Lightbulb, X } from "lucide-react";

type Difficulty = "Iniciante" | "Intermediário" | "Avançado";

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  xp: number;
  timeEstimate: string;
  topics: string[];
  status: "available" | "completed" | "locked";
  weekly?: boolean;
  starterCode: string;
  solution: string;
  hints: string[];
  testDescription: string;
}

const challenges: Challenge[] = [
  {
    id: "fizzbuzz",
    title: "FizzBuzz Clássico",
    description: "Imprima os números de 1 a 100. Para múltiplos de 3 imprima 'Fizz', para múltiplos de 5 imprima 'Buzz', e para múltiplos de ambos imprima 'FizzBuzz'.",
    category: "Lógica",
    difficulty: "Iniciante",
    xp: 100,
    timeEstimate: "15 min",
    topics: ["loops", "condicionais", "módulo"],
    status: "available",
    weekly: true,
    starterCode: `// Desafio: FizzBuzz
// Percorra de 1 a 100 e imprima:
// - "FizzBuzz" para múltiplos de 3 E 5
// - "Fizz" para múltiplos de 3
// - "Buzz" para múltiplos de 5
// - O número nos outros casos

for (let i = 1; i <= 100; i++) {
  // seu código aqui
}`,
    solution: `for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) console.log("FizzBuzz");
  else if (i % 3 === 0) console.log("Fizz");
  else if (i % 5 === 0) console.log("Buzz");
  else console.log(i);
}`,
    hints: [
      "Verifique múltiplos de 3 E 5 primeiro (antes de checar cada um separado)",
      "Use o operador módulo % para verificar divisibilidade: i % 3 === 0",
      "Estruture como: if (3 e 5) / else if (3) / else if (5) / else",
    ],
    testDescription: "A saída deve começar com 1, 2, Fizz, 4, Buzz, Fizz... e terminar com ...98, Fizz, Buzz.",
  },
  {
    id: "palindrome",
    title: "Verificador de Palíndromo",
    description: "Crie uma função que verifica se uma palavra ou frase é um palíndromo (lida igual de frente e de trás), ignorando espaços e maiúsculas.",
    category: "Strings",
    difficulty: "Iniciante",
    xp: 150,
    timeEstimate: "20 min",
    topics: ["strings", "funções", "arrays"],
    status: "available",
    starterCode: `// Desafio: Verificador de Palíndromo
// Retorne true se a string for palíndromo, false caso contrário
// Ignore espaços e diferença de maiúsculas/minúsculas

function ehPalindromo(texto) {
  // seu código aqui
}

// Testes
console.log(ehPalindromo("arara"));       // true
console.log(ehPalindromo("A man a plan")); // true
console.log(ehPalindromo("hello"));       // false
console.log(ehPalindromo("Anilina"));     // true`,
    solution: `function ehPalindromo(texto) {
  const limpo = texto.toLowerCase().replace(/\\s/g, "");
  return limpo === limpo.split("").reverse().join("");
}

console.log(ehPalindromo("arara"));
console.log(ehPalindromo("A man a plan"));
console.log(ehPalindromo("hello"));
console.log(ehPalindromo("Anilina"));`,
    hints: [
      "Normalize o texto: .toLowerCase() e .replace(/\\s/g, '') para remover espaços",
      "Uma forma simples: reverta a string e compare com o original",
      "Para reverter: texto.split('').reverse().join('')",
    ],
    testDescription: "ehPalindromo('arara') → true, ehPalindromo('hello') → false",
  },
  {
    id: "calculator",
    title: "Calculadora de IMC",
    description: "Desenvolva uma calculadora de Índice de Massa Corporal que receba peso e altura, calcule o IMC e exiba a classificação correspondente.",
    category: "Cálculos",
    difficulty: "Iniciante",
    xp: 120,
    timeEstimate: "20 min",
    topics: ["variáveis", "condicionais", "funções"],
    status: "completed",
    starterCode: `// Desafio: Calculadora de IMC
// IMC = peso / (altura * altura)
// Classificações:
//   < 18.5  → "Abaixo do peso"
//   < 25    → "Peso normal"
//   < 30    → "Sobrepeso"
//   >= 30   → "Obesidade"

function calcularIMC(peso, altura) {
  // seu código aqui
}

console.log(calcularIMC(70, 1.75)); // Peso normal
console.log(calcularIMC(50, 1.75)); // Abaixo do peso
console.log(calcularIMC(90, 1.70)); // Sobrepeso`,
    solution: `function calcularIMC(peso, altura) {
  const imc = peso / (altura * altura);
  let classificacao;
  if (imc < 18.5) classificacao = "Abaixo do peso";
  else if (imc < 25) classificacao = "Peso normal";
  else if (imc < 30) classificacao = "Sobrepeso";
  else classificacao = "Obesidade";
  return \`IMC: \${imc.toFixed(1)} → \${classificacao}\`;
}

console.log(calcularIMC(70, 1.75));
console.log(calcularIMC(50, 1.75));
console.log(calcularIMC(90, 1.70));`,
    hints: [
      "Fórmula: imc = peso / (altura * altura)",
      "Use .toFixed(1) para exibir 1 casa decimal",
      "Verifique os limites em ordem crescente com if/else if",
    ],
    testDescription: "calcularIMC(70, 1.75) deve retornar algo como 'IMC: 22.9 → Peso normal'",
  },
  {
    id: "todo-list",
    title: "Lista de Tarefas",
    description: "Crie uma mini aplicação de to-do list com HTML, CSS e JavaScript puro. Deve permitir adicionar, marcar como concluída e remover tarefas.",
    category: "HTML/CSS/JS",
    difficulty: "Intermediário",
    xp: 250,
    timeEstimate: "45 min",
    topics: ["DOM", "eventos", "localStorage"],
    status: "available",
    starterCode: `// Desafio: Gerenciador de Tarefas
// Simule o comportamento de um to-do list usando um array

let tarefas = [];
let proximoId = 1;

function adicionarTarefa(texto) {
  // Adicione ao array tarefas com id, texto e concluida: false
}

function concluirTarefa(id) {
  // Marque a tarefa como concluida: true
}

function removerTarefa(id) {
  // Remova do array
}

function listarTarefas() {
  // Exiba cada tarefa no console
  tarefas.forEach(t => {
    console.log(\`[\${t.concluida ? "X" : " "}] #\${t.id} - \${t.texto}\`);
  });
}

// Teste
adicionarTarefa("Aprender JavaScript");
adicionarTarefa("Fazer exercícios");
adicionarTarefa("Revisar código");
concluirTarefa(1);
removerTarefa(2);
listarTarefas();`,
    solution: `let tarefas = [];
let proximoId = 1;

function adicionarTarefa(texto) {
  tarefas.push({ id: proximoId++, texto, concluida: false });
}

function concluirTarefa(id) {
  const t = tarefas.find(t => t.id === id);
  if (t) t.concluida = true;
}

function removerTarefa(id) {
  tarefas = tarefas.filter(t => t.id !== id);
}

function listarTarefas() {
  tarefas.forEach(t => {
    console.log(\`[\${t.concluida ? "X" : " "}] #\${t.id} - \${t.texto}\`);
  });
}

adicionarTarefa("Aprender JavaScript");
adicionarTarefa("Fazer exercícios");
adicionarTarefa("Revisar código");
concluirTarefa(1);
removerTarefa(2);
listarTarefas();`,
    hints: [
      "Use tarefas.push({ id: proximoId++, texto, concluida: false }) para adicionar",
      "Para concluir: use .find() para achar a tarefa e setar .concluida = true",
      "Para remover: use tarefas.filter(t => t.id !== id) e reassine o array",
    ],
    testDescription: "Deve exibir '[X] #1 - Aprender JavaScript' e '[ ] #3 - Revisar código'",
  },
  {
    id: "prime-numbers",
    title: "Números Primos",
    description: "Implemente o Crivo de Eratóstenes para encontrar todos os números primos até N. Otimize para trabalhar com N até 1.000.000.",
    category: "Algoritmos",
    difficulty: "Intermediário",
    xp: 200,
    timeEstimate: "30 min",
    topics: ["algoritmos", "arrays", "otimização"],
    status: "available",
    starterCode: `// Desafio: Crivo de Eratóstenes
// Encontre todos os números primos até N

function crivoEratostenes(n) {
  // Crie um array de booleanos [true, true, true, ...]
  // Marque 0 e 1 como false
  // Para cada número primo p, marque seus múltiplos como false
  // Retorne os índices que ainda são true
}

const primos = crivoEratostenes(50);
console.log(primos);
// Esperado: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
console.log("Total de primos até 50:", primos.length);`,
    solution: `function crivoEratostenes(n) {
  const ehPrimo = new Array(n + 1).fill(true);
  ehPrimo[0] = ehPrimo[1] = false;
  for (let i = 2; i * i <= n; i++) {
    if (ehPrimo[i]) {
      for (let j = i * i; j <= n; j += i) {
        ehPrimo[j] = false;
      }
    }
  }
  return ehPrimo.reduce((acc, v, i) => (v ? [...acc, i] : acc), []);
}

const primos = crivoEratostenes(50);
console.log(primos);
console.log("Total de primos até 50:", primos.length);`,
    hints: [
      "Crie um array de N+1 posições preenchidas com true: new Array(n+1).fill(true)",
      "Comece do 2 e marque todos os múltiplos (i*2, i*3...) como false",
      "Otimização: só vá até √n no loop externo (i * i <= n)",
    ],
    testDescription: "crivoEratostenes(50) deve retornar [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]",
  },
  {
    id: "binary-search",
    title: "Busca Binária",
    description: "Implemente o algoritmo de busca binária que encontra a posição de um elemento em um array ordenado com complexidade O(log n).",
    category: "Algoritmos",
    difficulty: "Intermediário",
    xp: 220,
    timeEstimate: "30 min",
    topics: ["algoritmos", "recursão", "arrays"],
    status: "locked",
    starterCode: `// Desafio: Busca Binária
function buscaBinaria(arr, alvo) {
  // seu código aqui
}`,
    solution: `function buscaBinaria(arr, alvo) {
  let inicio = 0, fim = arr.length - 1;
  while (inicio <= fim) {
    const meio = Math.floor((inicio + fim) / 2);
    if (arr[meio] === alvo) return meio;
    if (arr[meio] < alvo) inicio = meio + 1;
    else fim = meio - 1;
  }
  return -1;
}`,
    hints: ["Use dois ponteiros: inicio e fim", "Calcule o meio: Math.floor((inicio + fim) / 2)"],
    testDescription: "buscaBinaria([1,3,5,7,9], 5) → 2",
  },
  {
    id: "weather-app",
    title: "App de Clima",
    description: "Construa uma interface de previsão do tempo consumindo uma API pública. Exiba temperatura, umidade, condição e previsão para 3 dias.",
    category: "APIs",
    difficulty: "Avançado",
    xp: 400,
    timeEstimate: "90 min",
    topics: ["fetch", "async/await", "DOM", "APIs"],
    status: "locked",
    starterCode: `// Desafio: App de Clima`,
    solution: "",
    hints: [],
    testDescription: "",
  },
  {
    id: "auth-system",
    title: "Sistema de Autenticação",
    description: "Implemente um sistema de login e cadastro com validação de formulário, armazenamento em localStorage e proteção de rotas.",
    category: "HTML/CSS/JS",
    difficulty: "Avançado",
    xp: 500,
    timeEstimate: "2h",
    topics: ["localStorage", "validação", "eventos", "rotas"],
    status: "locked",
    starterCode: `// Desafio: Sistema de Autenticação`,
    solution: "",
    hints: [],
    testDescription: "",
  },
];

const difficultyConfig: Record<Difficulty, { color: string; bg: string; border: string }> = {
  Iniciante: { color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-100" },
  Intermediário: { color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-100" },
  Avançado: { color: "text-red-700", bg: "bg-red-50", border: "border-red-100" },
};

function ChallengePlayer({ challenge, onClose, onComplete }: {
  challenge: Challenge;
  onClose: () => void;
  onComplete: (id: string) => void;
}) {
  const [code, setCode] = useState(challenge.starterCode);
  const [output, setOutput] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [solved, setSolved] = useState(challenge.status === "completed");

  const runCode = () => {
    try {
      const logs: string[] = [];
      const orig = console.log;
      console.log = (...args) =>
        logs.push(args.map(a => (typeof a === "object" ? JSON.stringify(a, null, 2) : String(a))).join(" "));
      // eslint-disable-next-line no-new-func
      new Function(code)();
      console.log = orig;
      setOutput(logs.length > 0 ? logs.join("\n") : "Código executado (sem output).");
    } catch (e) {
      setOutput(`Erro: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  const verify = () => {
    try {
      const logs: string[] = [];
      const orig = console.log;
      console.log = (...args) =>
        logs.push(args.map(a => String(a)).join(" "));
      // eslint-disable-next-line no-new-func
      new Function(code)();
      console.log = orig;
      if (logs.length > 0) {
        setSolved(true);
        onComplete(challenge.id);
        setOutput(`✅ Parabéns! Desafio concluído! +${challenge.xp} XP\n\n--- Output ---\n${logs.join("\n")}`);
      } else {
        setOutput("❌ Nenhum output detectado. Certifique-se de usar console.log() para exibir resultados.");
      }
    } catch (e) {
      setOutput(`❌ Erro ao verificar: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button onClick={onClose}
              className="flex items-center gap-1.5 text-slate-400 hover:text-slate-900 transition font-semibold text-sm flex-shrink-0">
              <ArrowLeft size={16} /><span className="hidden sm:inline">Voltar</span>
            </button>
            <div className="w-px h-5 bg-gray-100 hidden sm:block" />
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Code2 className="text-white" size={13} />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-slate-400">Desafio · {challenge.category}</div>
                <div className="font-bold text-slate-900 truncate text-sm">{challenge.title}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="hidden sm:flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">
              <Star size={11} />+{challenge.xp} XP
            </span>
            {solved && (
              <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg">
                <CheckCircle2 size={15} /><span className="hidden sm:inline text-xs font-semibold">Concluído</span>
              </div>
            )}
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-900 transition rounded-lg hover:bg-slate-100">
              <X size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Split layout */}
      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* Left — instructions */}
        <div className="bg-white border-b lg:border-b-0 lg:border-r border-gray-100 overflow-y-auto p-6">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${difficultyConfig[challenge.difficulty].color} ${difficultyConfig[challenge.difficulty].bg} ${difficultyConfig[challenge.difficulty].border}`}>
              {challenge.difficulty}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-50 border border-gray-100 px-2.5 py-1 rounded-full font-medium">
              <Clock size={11} />{challenge.timeEstimate}
            </span>
          </div>

          <h2 className="text-lg font-extrabold text-slate-900 mb-2">{challenge.title}</h2>
          <p className="text-sm text-slate-500 leading-relaxed mb-5">{challenge.description}</p>

          {challenge.testDescription && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
              <p className="text-xs font-bold text-blue-800 mb-1">Critério de aceitação</p>
              <p className="text-xs text-blue-700">{challenge.testDescription}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mb-5">
            {challenge.topics.map(t => (
              <span key={t} className="text-xs text-slate-500 bg-slate-50 border border-gray-100 px-2 py-0.5 rounded-full font-medium">
                {t}
              </span>
            ))}
          </div>

          {/* Hints */}
          {challenge.hints.length > 0 && (
            <div className="mb-4">
              <button
                onClick={() => setShowHints(v => !v)}
                className="flex items-center gap-2 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-2 rounded-lg transition w-full"
              >
                <Lightbulb size={14} className="flex-shrink-0" />
                <span className="flex-1 text-left">Dicas ({challenge.hints.length})</span>
                <ChevronRight size={13} className={`transition-transform ${showHints ? "rotate-90" : ""}`} />
              </button>
              {showHints && (
                <div className="mt-2 bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <ul className="space-y-2">
                    {challenge.hints.map((hint, i) => (
                      <li key={i} className="text-xs text-amber-700 flex gap-2">
                        <span className="font-bold flex-shrink-0">{i + 1}.</span>
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Solution */}
          {challenge.solution && (
            showSolution ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                <p className="text-xs font-bold text-emerald-800 mb-2">Solução</p>
                <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg text-xs overflow-x-auto"><code>{challenge.solution}</code></pre>
              </div>
            ) : (
              <button onClick={() => setShowSolution(true)}
                className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                Ver solução
              </button>
            )
          )}
        </div>

        {/* Right — editor */}
        <div className="bg-slate-950 flex flex-col min-h-[480px] lg:min-h-0">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-slate-500 text-xs font-semibold ml-2">desafio.js</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setCode(challenge.starterCode); setOutput(""); }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition text-xs font-semibold">
                <RotateCcw size={12} />Resetar
              </button>
              <button onClick={runCode}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-xs font-semibold">
                <Play size={12} />Executar
              </button>
              <button onClick={verify}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-xs font-semibold">
                <CheckCircle2 size={12} />Verificar
              </button>
            </div>
          </div>

          <textarea value={code} onChange={e => setCode(e.target.value)}
            className="flex-1 p-4 bg-slate-950 text-slate-100 font-mono text-sm resize-none focus:outline-none min-h-[240px]"
            spellCheck={false} style={{ tabSize: 2 }} />

          {output && (
            <div className="border-t border-slate-800 p-4 bg-slate-900 max-h-48 overflow-y-auto flex-shrink-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Output</span>
                <button onClick={() => setOutput("")} className="text-slate-600 hover:text-slate-400 transition">
                  <X size={13} />
                </button>
              </div>
              <pre className="text-slate-200 text-sm whitespace-pre-wrap">{output}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Challenges() {
  const [filter, setFilter] = useState<"all" | Difficulty>("all");
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    () => new Set(challenges.filter(c => c.status === "completed").map(c => c.id))
  );

  const handleComplete = (id: string) => {
    setCompletedIds(prev => new Set([...prev, id]));
  };

  const getStatus = (c: Challenge) => {
    if (completedIds.has(c.id)) return "completed";
    return c.status;
  };

  const filtered = filter === "all" ? challenges : challenges.filter(c => c.difficulty === filter);
  const weeklyChallenge = challenges.find(c => c.weekly);
  const completedCount = completedIds.size;
  const totalXp = challenges.filter(c => completedIds.has(c.id)).reduce((acc, c) => acc + c.xp, 0);

  if (activeChallenge) {
    return (
      <ChallengePlayer
        challenge={{ ...activeChallenge, status: getStatus(activeChallenge) }}
        onClose={() => setActiveChallenge(null)}
        onComplete={handleComplete}
      />
    );
  }

  return (
    <div className="pb-24 md:pb-8">
      {/* Header */}
      <div className="bg-slate-50 border-b border-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(to right, #e2e8f0 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.6,
          }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Target size={14} className="text-blue-500" />
            Desafios de Programação
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">Desafios</h1>
          <p className="text-slate-500 text-sm">Resolva desafios e ganhe XP enquanto pratica o que aprendeu.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-50 border border-amber-100 rounded-lg flex items-center justify-center">
              <Trophy className="text-amber-500" size={15} />
            </div>
            <span className="font-bold text-slate-900 text-sm">{totalXp} XP</span>
            <span className="text-slate-400 text-xs font-medium">ganhos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="text-emerald-500" size={15} />
            </div>
            <span className="font-bold text-slate-900 text-sm">{completedCount}</span>
            <span className="text-slate-400 text-xs font-medium">concluídos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center">
              <Flame className="text-blue-500" size={15} />
            </div>
            <span className="font-bold text-slate-900 text-sm">{challenges.length}</span>
            <span className="text-slate-400 text-xs font-medium">disponíveis</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* Weekly Challenge */}
        {weeklyChallenge && (
          <div className="bg-blue-600 rounded-2xl p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, white, transparent)", transform: "translate(30%, -30%)" }} />
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                <Flame size={12} />
                Desafio da Semana
              </div>
              <h2 className="text-xl font-extrabold text-white mb-2">{weeklyChallenge.title}</h2>
              <p className="text-blue-100 text-sm mb-4 leading-relaxed max-w-2xl">{weeklyChallenge.description}</p>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full">{weeklyChallenge.category}</span>
                <span className="flex items-center gap-1 text-blue-100 text-xs font-medium">
                  <Clock size={12} /> {weeklyChallenge.timeEstimate}
                </span>
                <span className="flex items-center gap-1 text-blue-100 text-xs font-medium">
                  <Zap size={12} /> +{weeklyChallenge.xp} XP
                </span>
              </div>
              <button
                onClick={() => setActiveChallenge(weeklyChallenge)}
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-5 py-2.5 rounded-xl font-bold hover:bg-blue-50 transition text-sm shadow-sm">
                Aceitar Desafio
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Filter */}
        <div className="flex items-center gap-2 mb-6">
          {(["all", "Iniciante", "Intermediário", "Avançado"] as const).map(f => (
            <button key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 text-slate-600 hover:bg-slate-50"
              }`}>
              {f === "all" ? "Todos" : f}
            </button>
          ))}
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(challenge => {
            const status = getStatus(challenge);
            const diff = difficultyConfig[challenge.difficulty];
            const isLocked = status === "locked";
            const isCompleted = status === "completed";

            return (
              <div key={challenge.id}
                className={`bg-white rounded-xl border border-gray-200 p-5 transition ${
                  isLocked ? "opacity-50" : "hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                }`}
                onClick={() => !isLocked && setActiveChallenge(challenge)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${diff.color} ${diff.bg} ${diff.border}`}>
                      {challenge.difficulty}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 bg-slate-50 border border-gray-100 px-2.5 py-1 rounded-full">
                      {challenge.category}
                    </span>
                    {challenge.weekly && (
                      <span className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                        <Flame size={10} />Semana
                      </span>
                    )}
                  </div>
                  {isCompleted && <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={20} />}
                  {isLocked && <Lock className="text-slate-300 flex-shrink-0" size={18} />}
                </div>

                <h3 className="font-bold text-slate-900 mb-2">{challenge.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">{challenge.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {challenge.topics.map(t => (
                    <span key={t} className="text-xs text-slate-500 bg-slate-50 border border-gray-100 px-2 py-0.5 rounded-full font-medium">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1"><Clock size={12} />{challenge.timeEstimate}</span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold"><Star size={12} />+{challenge.xp} XP</span>
                  </div>

                  {!isLocked && (
                    <span className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                      isCompleted
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}>
                      {isCompleted ? (
                        <><CheckCircle2 size={13} />Refazer</>
                      ) : (
                        <>Iniciar<ChevronRight size={13} /></>
                      )}
                    </span>
                  )}
                  {isLocked && (
                    <span className="text-xs text-slate-300 font-semibold flex items-center gap-1">
                      <Lock size={12} />Bloqueado
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

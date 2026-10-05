export interface Course {
  id: string;
  title: string;
  description: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
  duration: string;
  lessons: number;
  image: string;
  category: string;
  /** Progresso-semente (não usado para exibição — o progresso real vem de
   * lib/progress.ts/getCourseProgress, calculado a partir do localStorage).
   * Mantido só por compatibilidade de dados antigos. */
  progress: number;
  /** Trilha visível na biblioteca, mas travada de forma fixa (conteúdo
   * ainda não revisado para o nível introdutório). Aparece como "Em breve"
   * e não entra no desbloqueio progressivo — ver isCourseUnlocked. */
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
  /** Tipo de exercício prático. Padrão "code" (editor com console.log).
   * "order" = arrastar/ordenar passos de um algoritmo sem código.
   * "predict" = múltipla escolha prevendo o resultado de um pseudocódigo. */
  exerciseKind?: "code" | "order" | "predict";
  /** Pra exerciseKind "order": a ordem correta dos passos (exibidos embaralhados). */
  orderSteps?: string[];
  /** Pra exerciseKind "predict": alternativas e qual é a correta. */
  predict?: { options: string[]; correctIndex: number };
}

// A ordem deste array é a trilha de evolução do aluno: do básico ao
// avançado. Entre os cursos ativos (sem comingSoon), cada um só
// desbloqueia quando o anterior é 100% concluído (ver isCourseUnlocked em
// lib/progress.ts) — o primeiro da lista está sempre liberado. Cursos com
// comingSoon:true ficam travados como "Em breve", fora dessa progressão.
export const courses: Course[] = [
  {
    id: "programacao-basica",
    title: "Programação Básica",
    description: "Do conceito ao código: história da programação, como o computador processa dados, tipos de linguagens, lógica de programação e seus primeiros programas em JavaScript — incluindo banco de dados, SQL, PHP e frameworks. A base completa pra quem nunca programou, inclusive pra quem é de marketing digital, UX, design ou áreas correlatas.",
    level: "Iniciante",
    duration: "3 horas",
    lessons: 27,
    image: "programming laptop code",
    category: "Programação Básica",
    progress: 0,
  },
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    description: "Construa aplicações web modernas com React.",
    level: "Intermediário",
    duration: "12 horas",
    lessons: 5,
    image: "web development interface",
    category: "React",
    progress: 0,
    comingSoon: true,
  },
  {
    id: "css-advanced",
    title: "CSS Avançado e Animações",
    description: "Domine CSS Grid, Flexbox e animações complexas.",
    level: "Intermediário",
    duration: "10 horas",
    lessons: 4,
    image: "design interface creative",
    category: "CSS",
    progress: 0,
    comingSoon: true,
  },
  {
    id: "python-data-science",
    title: "Python para Data Science",
    description: "Análise de dados e visualização com Python.",
    level: "Intermediário",
    duration: "15 horas",
    lessons: 5,
    image: "data analytics graphs",
    category: "Python",
    progress: 0,
    comingSoon: true,
  },
  {
    id: "nodejs-backend",
    title: "Node.js Backend Development",
    description: "Crie APIs robustas com Node.js e Express.",
    level: "Avançado",
    duration: "20 horas",
    lessons: 5,
    image: "server technology code",
    category: "Node.js",
    progress: 0,
    comingSoon: true,
  },
  {
    id: "typescript-mastery",
    title: "TypeScript Mastery",
    description: "TypeScript avançado para projetos escaláveis.",
    level: "Avançado",
    duration: "18 horas",
    lessons: 4,
    image: "coding typescript developer",
    category: "TypeScript",
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
  // ── PROGRAMAÇÃO BÁSICA ──────────────────────────────────
  {
    id: "pb-1", courseId: "programacao-basica",
    title: "Conceitos e História",
    description: "De onde vem a programação: das primeiras máquinas de calcular até o software que usamos hoje.",
    content: `# Conceitos e História\n\nProgramar é dar instruções pra um computador executar. Isso existe desde muito antes dos computadores modernos.\n\n## Um pouco de história\n\n- **Ada Lovelace** (século 19) é considerada a primeira programadora da história — escreveu o primeiro algoritmo pensado pra ser executado por uma máquina.\n- Nos anos 1940, surgiram os primeiros computadores eletrônicos, programados fisicamente com cabos e interruptores.\n- Nas décadas seguintes vieram as linguagens de programação, que trocaram "fiação" por texto — tornando programar muito mais acessível.\n- Hoje existem milhares de linguagens, cada uma criada pra resolver um tipo de problema melhor que as outras.\n\n## Por que isso importa?\n\nEntender que programação é, no fundo, "dar instruções claras pra uma máquina" tira o mistério da coisa — é a mesma ideia desde Ada Lovelace, só que hoje com ferramentas muito mais poderosas.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "pb-2", courseId: "programacao-basica",
    title: "Processamento de Dados",
    description: "Como um computador recebe, processa e devolve informação.",
    content: `# Processamento de Dados\n\nTodo programa, por mais complexo que pareça, segue o mesmo ciclo básico:\n\n## Entrada → Processamento → Saída\n\n- **Entrada**: dados que o programa recebe (um clique, um texto digitado, um arquivo)\n- **Processamento**: o que o programa faz com esses dados (calcula, organiza, compara)\n- **Saída**: o resultado que o programa devolve (uma tela, um som, um arquivo salvo)\n\n## Exemplo do dia a dia\n\nUma calculadora: você digita dois números (entrada), ela soma (processamento) e mostra o resultado (saída). Todo app, por mais sofisticado, é essa ideia repetida muitas vezes.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "pb-3", courseId: "programacao-basica",
    title: "Processamento de Dados – Parte 2",
    description: "Como a informação é representada por dentro do computador: bits e bytes.",
    content: `# Processamento de Dados — Parte 2\n\nPor dentro, um computador só entende duas coisas: **ligado** e **desligado**. Isso é representado como 0 e 1 — o chamado sistema **binário**.\n\n## Bit e Byte\n\n- **Bit**: a menor unidade de informação (0 ou 1)\n- **Byte**: um grupo de 8 bits, suficiente pra representar, por exemplo, uma letra\n\n## Por que isso importa pra quem programa?\n\nVocê não precisa pensar em binário no dia a dia — as linguagens de programação escondem essa parte. Mas é bom saber que, por trás de todo texto, imagem ou vídeo que você vê na tela, existe só uma sequência enorme de 0s e 1s sendo processada muito rápido.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "pb-4", courseId: "programacao-basica",
    title: "Tipos de Linguagens",
    description: "Linguagem de baixo nível vs. alto nível, e onde cada uma é usada.",
    content: `# Tipos de Linguagens\n\nNem toda linguagem de programação é igualmente "próxima" do que o computador entende.\n\n## Baixo nível\n\nMais próxima da máquina (ex.: Assembly). Rápida e eficiente, mas difícil de escrever e ler.\n\n## Alto nível\n\nMais próxima da linguagem humana (ex.: Python, JavaScript, Java). Mais fácil de aprender e escrever — é com essas que a maioria das pessoas começa.\n\nQuanto mais alto o nível, mais a linguagem "traduz" pra gente; quanto mais baixo, mais controle direto sobre a máquina — com mais complexidade.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "pb-5", courseId: "programacao-basica",
    title: "Compiladas",
    description: "O que são linguagens compiladas e como elas viram um programa executável.",
    content: `# Linguagens Compiladas\n\nUma linguagem **compilada** passa por um programa (o compilador) que traduz todo o código de uma vez para linguagem de máquina, gerando um arquivo executável, antes de rodar.\n\n## Exemplos\n\nC, C++, Java (parcialmente), Go.\n\n## Vantagens e desvantagens\n\n- ✅ Geralmente roda mais rápido, já que já está traduzido\n- ✅ Erros de sintaxe são pegos antes de rodar\n- ❌ Precisa recompilar toda vez que o código muda, antes de testar`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "pb-6", courseId: "programacao-basica",
    title: "Interpretadas",
    description: "O que são linguagens interpretadas, como JavaScript e Python, e como elas diferem das compiladas.",
    content: `# Linguagens Interpretadas\n\nUma linguagem **interpretada** é lida e executada linha por linha, em tempo real, por um programa chamado interpretador — sem um passo de compilação separado antes.\n\n## Exemplos\n\nJavaScript, Python, Ruby, PHP.\n\n## Vantagens e desvantagens\n\n- ✅ Mais rápido pra testar — escreveu, já roda\n- ✅ Geralmente mais fácil pra quem está aprendendo\n- ❌ Tende a rodar um pouco mais devagar que uma linguagem compilada\n\nA partir daqui, você vai praticar com **JavaScript** — uma linguagem interpretada, perfeita pra ver resultado na hora.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "pb-7", courseId: "programacao-basica",
    title: "Internet e Mobilidade",
    description: "Como a programação conecta computadores, sites e aplicativos de celular.",
    content: `# Internet e Mobilidade\n\nProgramar hoje não é só sobre um programa rodando sozinho numa máquina — a maior parte do software que usamos se comunica pela internet.\n\n## Cliente e servidor\n\n- **Cliente**: o app ou site que você usa (no navegador ou no celular)\n- **Servidor**: o computador que guarda os dados e responde aos pedidos do cliente\n\nQuando você abre um app e ele mostra suas mensagens, o celular (cliente) pediu essa informação pra um servidor, em algum lugar do mundo, que respondeu.\n\n## Web vs. mobile\n\n- **Site/aplicação web**: roda no navegador, em qualquer dispositivo\n- **App nativo**: instalado no celular (Android/iOS), geralmente com acesso mais direto aos recursos do aparelho (câmera, GPS)`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "pb-8", courseId: "programacao-basica",
    title: "Banco de Dados",
    description: "Onde e como os programas guardam informação de forma organizada.",
    content: `# Banco de Dados\n\nUm programa raramente guarda informação só na memória — ele precisa persistir dados mesmo depois de desligado. É pra isso que existe o **banco de dados**.\n\n## O que é\n\nUm sistema organizado pra guardar, buscar e atualizar informação de forma estruturada e confiável — pense numa versão muito mais poderosa de uma planilha.\n\n## Exemplo\n\nUm app de rede social guarda cada usuário, cada post e cada curtida como registros num banco de dados, pra poder buscar e mostrar tudo isso rapidamente depois.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "pb-9", courseId: "programacao-basica",
    title: "Banco de Dados – Parte 2",
    description: "Bancos de dados relacionais: tabelas, linhas, colunas e relações entre elas.",
    content: `# Banco de Dados — Parte 2\n\nO tipo de banco de dados mais comum é o **relacional**, organizado em tabelas.\n\n## Tabelas, linhas e colunas\n\n- Cada **tabela** guarda um tipo de informação (ex.: "usuários", "pedidos")\n- Cada **linha** é um registro (ex.: um usuário específico)\n- Cada **coluna** é um atributo desse registro (ex.: nome, e-mail)\n\n## Relações\n\nTabelas podem se conectar entre si — por exemplo, a tabela "pedidos" pode referenciar qual usuário fez cada pedido. É daí que vem o nome "relacional".`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "pb-10", courseId: "programacao-basica",
    title: "Lógica de Programação",
    description: "Antes de escrever qualquer linha de código, entenda os 3 blocos que formam todo algoritmo.",
    content: `# Lógica de Programação\n\nProgramar não é, no fundo, escrever numa linguagem — é descrever um processo passo a passo, de forma que não deixe dúvida sobre o que fazer. Isso é a **lógica de programação**, e ela existe antes e independente de qualquer linguagem.\n\nTodo algoritmo, não importa a linguagem, é feito de só 3 blocos:\n\n## 1. Sequência\n\nPassos em ordem, um depois do outro. Ex.: uma receita de bolo — você não pode colocar no forno antes de misturar os ingredientes.\n\n## 2. Condição (se... então... senão...)\n\nEscolher um caminho dependendo de uma situação. Ex.: "se estiver chovendo, leve guarda-chuva; senão, não leve."\n\n## 3. Repetição\n\nFazer a mesma coisa várias vezes, até algo acontecer. Ex.: "bata o ovo até ficar homogêneo."\n\nNo próximo exercício você vai praticar isso sem escrever código nenhum — só organizando passos, como quem resolve um quebra-cabeça.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "pb-ex-10", courseId: "programacao-basica",
    title: "Exercício: Ordene os passos",
    description: "Coloque em ordem lógica os passos de uma tarefa do dia a dia.",
    content: `# Ordene os passos\n\nAbaixo estão os passos de "como fazer um miojo", fora de ordem.\n\n## Tarefa\n\nUse as setas pra colocar os passos na sequência lógica correta — a mesma ideia de organizar um algoritmo.`,
    code: "", solution: "",
    completed: false, type: "practice",
    exerciseKind: "order",
    orderSteps: [
      "Colocar água numa panela",
      "Ferver a água",
      "Colocar o macarrão na água fervendo",
      "Esperar 3 minutos",
      "Adicionar o tempero",
      "Escorrer o excesso de água e servir",
    ],
  },
  {
    id: "pb-11", courseId: "programacao-basica",
    title: "Lógica de Programação – Parte 2",
    description: "Pseudocódigo: como esboçar um algoritmo em texto simples, antes de escrever código de verdade.",
    content: `# Lógica de Programação — Parte 2\n\nAntes de escrever código numa linguagem real, programadores costumam rascunhar a ideia em **pseudocódigo** — uma descrição em texto simples, sem se preocupar com a sintaxe exata de nenhuma linguagem.\n\n## Exemplo de pseudocódigo\n\n\`\`\`\nseja N = 7\n\nse N for maior que 5:\n    escreva "grande"\nsenão:\n    escreva "pequeno"\n\`\`\`\n\nQualquer programador, de qualquer linguagem, entende esse pseudocódigo. Só depois ele é "traduzido" pra sintaxe de JavaScript, Python, ou qualquer outra linguagem.\n\nNo próximo exercício, você vai ler um pseudocódigo como esse e prever o resultado, sem executar nada — só pensando.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "pb-ex-11", courseId: "programacao-basica",
    title: "Exercício: Preveja o resultado",
    description: "Leia o algoritmo em pseudocódigo (sem rodar nada) e descubra o que ele vai mostrar.",
    content: `# Preveja o resultado\n\nLeia o algoritmo abaixo com atenção, sem executar nada — só pensando.\n\n\`\`\`\nseja N = 7\n\nse N for maior que 5:\n    escreva "grande"\nsenão:\n    escreva "pequeno"\n\`\`\`\n\n## Tarefa\n\nO que esse algoritmo vai mostrar na tela?`,
    code: "", solution: "",
    completed: false, type: "practice",
    exerciseKind: "predict",
    predict: { options: ["grande", "pequeno", "7", "Dá erro"], correctIndex: 0 },
  },
  {
    id: "pb-12", courseId: "programacao-basica",
    title: "Olá, Mundo!",
    description: "Seu primeiro contato com JavaScript de verdade — rodando código e vendo o resultado na hora.",
    content: `# Olá, Mundo!\n\nChegou a hora de sair do papel e escrever código de verdade. A partir de agora você vai praticar com **JavaScript**, uma das linguagens mais populares do mundo.\n\n## console.log()\n\nA forma mais simples de um programa "falar" com você é exibindo uma mensagem. Em JavaScript, isso se faz com \`console.log()\`:\n\n\`\`\`js\nconsole.log("Olá, mundo!");\n\`\`\`\n\nEscrever um programa que só mostra "Olá, mundo!" é uma tradição entre programadores — é o primeiro passo em praticamente qualquer linguagem nova.`,
    code: "console.log('Olá, mundo!');", solution: "console.log('Olá, mundo!');",
    completed: false, type: "theory", videoUrl: JS_VIDEO,
  },
  {
    id: "pb-ex-12", courseId: "programacao-basica",
    title: "Exercício: Olá Mundo",
    description: "Exiba sua primeira mensagem no console.",
    content: `# Olá Mundo\n\nUse \`console.log()\` para exibir uma mensagem.\n\n## Tarefa\n\nExiba a mensagem **"Olá, mundo!"** no console.`,
    code: "// Escreva seu código aqui\n",
    solution: `console.log("Olá, mundo!");`,
    completed: false, type: "practice",
  },
  {
    id: "pb-13", courseId: "programacao-basica",
    title: "Variáveis e Constantes",
    description: "Como guardar e nomear valores no seu código com let e const.",
    content: `# Variáveis e Constantes\n\nUsamos variáveis para armazenar dados que o programa vai usar depois.\n\n## let e const\n\n\`\`\`js\nlet nome = "Maria";   // pode mudar depois\nconst PI = 3.14;      // não muda mais\n\`\`\`\n\nUse \`let\` quando o valor pode mudar ao longo do programa, e \`const\` quando ele é fixo. Na dúvida, prefira \`const\` — é mais seguro.`,
    code: "let nome = 'Maria';\nconsole.log(nome);", solution: "let nome = 'Maria';\nconsole.log(nome);",
    completed: false, type: "theory", videoUrl: JS_VIDEO,
  },
  {
    id: "pb-ex-13", courseId: "programacao-basica",
    title: "Exercício: Calculadora Simples",
    description: "Crie variáveis e faça operações matemáticas.",
    content: `# Calculadora\n\n## Tarefa\n\n1. Declare duas variáveis numéricas \`a\` e \`b\`\n2. Calcule a soma, subtração, multiplicação e divisão\n3. Exiba cada resultado no console`,
    code: "const a = 10;\nconst b = 3;\n\n// Calcule e exiba os resultados\n",
    solution: `const a = 10;\nconst b = 3;\nconsole.log("Soma:", a + b);\nconsole.log("Subtração:", a - b);\nconsole.log("Multiplicação:", a * b);\nconsole.log("Divisão:", a / b);`,
    completed: false, type: "practice",
  },
  {
    id: "pb-14", courseId: "programacao-basica",
    title: "Laços de Repetição",
    description: "Como fazer o computador repetir uma tarefa várias vezes, sem copiar e colar código.",
    content: `# Laços de Repetição\n\nQuando você precisa repetir uma ação várias vezes, não escreve o código várias vezes — usa um **laço de repetição** (loop).\n\n## for\n\n\`\`\`js\nfor (let i = 1; i <= 5; i++) {\n  console.log(i);\n}\n\`\`\`\n\nIsso imprime 1, 2, 3, 4, 5 — o \`for\` repete o bloco enquanto a condição (\`i <= 5\`) for verdadeira, aumentando \`i\` a cada volta.\n\n## while\n\n\`\`\`js\nlet i = 1;\nwhile (i <= 5) {\n  console.log(i);\n  i++;\n}\n\`\`\`\n\nFaz a mesma coisa, mas verificando a condição antes de cada repetição — útil quando você não sabe de antemão quantas vezes vai repetir.`,
    code: "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}", solution: "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}",
    completed: false, type: "theory", videoUrl: JS_VIDEO,
  },
  {
    id: "pb-ex-14", courseId: "programacao-basica",
    title: "Exercício: Contador",
    description: "Use um laço de repetição pra exibir uma sequência de números.",
    content: `# Contador\n\n## Tarefa\n\nUse um laço \`for\` pra exibir no console todos os números de 1 até 10, um por linha.`,
    code: "// Escreva seu laço aqui\n",
    solution: `for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}`,
    completed: false, type: "practice",
  },
  {
    id: "pb-15", courseId: "programacao-basica",
    title: "Estruturas Condicionais",
    description: "Tome decisões no código comparando valores com if/else.",
    content: `# Estruturas Condicionais\n\nCondicionais decidem qual trecho de código roda, a partir de uma comparação.\n\n## if / else if / else\n\n\`\`\`js\nconst idade = 16;\n\nif (idade >= 18) {\n  console.log("Maior de idade");\n} else {\n  console.log("Menor de idade");\n}\n\`\`\`\n\n## Operadores de comparação\n\n- \`===\` igual\n- \`!==\` diferente\n- \`>\`, \`<\`, \`>=\`, \`<=\``,
    code: "const idade = 16;\n\nif (idade >= 18) {\n  console.log('Maior de idade');\n} else {\n  console.log('Menor de idade');\n}",
    solution: "const idade = 16;\n\nif (idade >= 18) {\n  console.log('Maior de idade');\n} else {\n  console.log('Menor de idade');\n}",
    completed: false, type: "theory", videoUrl: JS_VIDEO,
  },
  {
    id: "pb-ex-15", courseId: "programacao-basica",
    title: "Exercício: Verificador de Idade",
    description: "Use condicionais para classificar uma idade.",
    content: `# Verificador de Idade\n\n## Tarefa\n\nDada uma variável \`idade\`, exiba:\n- "Menor de idade" se menor que 18\n- "Maior de idade" se 18 ou mais\n- "Idoso" se 60 ou mais`,
    code: "const idade = 25;\n\n// Escreva sua lógica aqui\n",
    solution: `const idade = 25;\nif (idade >= 60) {\n  console.log("Idoso");\n} else if (idade >= 18) {\n  console.log("Maior de idade");\n} else {\n  console.log("Menor de idade");\n}`,
    completed: false, type: "practice",
  },
  {
    id: "pb-16", courseId: "programacao-basica",
    title: "SQL – MySQL",
    description: "A linguagem usada pra conversar com um banco de dados relacional.",
    content: `# SQL — MySQL\n\n**SQL** (Structured Query Language) é a linguagem usada pra buscar e manipular dados dentro de um banco de dados relacional, como o **MySQL**.\n\n## A consulta mais comum: SELECT\n\n\`\`\`sql\nSELECT nome, email FROM usuarios WHERE idade >= 18;\n\`\`\`\n\nEssa consulta busca, na tabela \`usuarios\`, o nome e o e-mail de todo mundo com 18 anos ou mais. SQL é declarativo: você descreve **o que** quer, não **como** buscar — quem decide o "como" é o banco de dados.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "pb-17", courseId: "programacao-basica",
    title: "PHP",
    description: "Uma linguagem interpretada muito usada pra criar sites dinâmicos no lado do servidor.",
    content: `# PHP\n\nPHP é uma linguagem interpretada criada especificamente pra web, muito usada no **lado do servidor** — ou seja, roda no servidor antes da página chegar até você.\n\n## Onde é usado\n\nPHP move uma parte enorme da web — inclusive o WordPress, que sozinho é usado em mais de 40% dos sites do mundo, é escrito em PHP.\n\n## Exemplo\n\n\`\`\`php\n<?php\n  echo "Olá, mundo!";\n?>\n\`\`\`\n\nRepare na semelhança com o "Olá, mundo!" que você já fez em JavaScript — a ideia de exibir uma mensagem se repete em praticamente toda linguagem.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "pb-18", courseId: "programacao-basica",
    title: "Frameworks",
    description: "Ferramentas prontas que aceleram o desenvolvimento, em vez de programar tudo do zero.",
    content: `# Frameworks\n\nUm **framework** é um conjunto de ferramentas e regras prontas que ajuda a construir um programa mais rápido, sem reinventar tudo do zero.\n\n## Alguns exemplos conhecidos\n\n- **React** — interfaces web (JavaScript)\n- **Laravel** — aplicações web no servidor (PHP)\n- **Django** — aplicações web no servidor (Python)\n- **Angular** — interfaces web (JavaScript/TypeScript)\n\n## Por que usar um framework?\n\nEm vez de resolver os mesmos problemas de novo em cada projeto (organização de arquivos, segurança, navegação), o framework já resolveu isso — e você foca no que é específico do seu projeto.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "pb-19", courseId: "programacao-basica",
    title: "Atividade Prática",
    description: "Crie sua primeira função: um bloco de código reutilizável.",
    content: `# Atividade Prática: Funções\n\nUma **função** é um bloco de código reutilizável, que você define uma vez e pode chamar quantas vezes quiser.\n\n\`\`\`js\nconst somar = (a, b) => a + b;\nconsole.log(somar(2, 3)); // 5\n\`\`\`\n\n## Tarefa\n\nCrie uma função \`saudar(nome)\` que retorna a string \`"Olá, [nome]!"\` e exiba o resultado no console.`,
    code: "// Crie a função saudar aqui\n\nconsole.log(saudar('Maria'));",
    solution: `function saudar(nome) {\n  return "Olá, " + nome + "!";\n}\nconsole.log(saudar('Maria'));`,
    completed: false, type: "practice",
  },
  {
    id: "pb-20", courseId: "programacao-basica",
    title: "Atividade Prática – Parte 2",
    description: "Trabalhe com arrays: uma lista de valores dentro de uma única variável.",
    content: `# Atividade Prática: Arrays\n\nUm **array** guarda uma lista de valores numa única variável.\n\n\`\`\`js\nconst frutas = ['maçã', 'banana', 'uva'];\nconsole.log(frutas[0]); // 'maçã'\n\`\`\`\n\n## Tarefa\n\n1. Crie um array \`notas\` com 4 números (notas de 0 a 10)\n2. Exiba o array inteiro no console\n3. Exiba a primeira e a última nota separadamente`,
    code: "// Escreva seu código aqui\n",
    solution: `const notas = [8, 6, 9, 7];\nconsole.log(notas);\nconsole.log("Primeira:", notas[0]);\nconsole.log("Última:", notas[notas.length - 1]);`,
    completed: false, type: "practice",
  },
  {
    id: "pb-21", courseId: "programacao-basica",
    title: "Atividade Prática – Parte Final",
    description: "Uma última atividade juntando laço, condicional e array — tudo que você aprendeu até aqui.",
    content: `# Atividade Prática Final\n\nHora de juntar tudo: laço de repetição, condicional e array na mesma atividade.\n\n## Tarefa\n\nDado o array \`notas\`, use um laço \`for\` pra percorrer cada nota e exibir "Aprovado" se ela for maior ou igual a 6, ou "Reprovado" caso contrário.`,
    code: "const notas = [8, 5, 9, 4, 7];\n\n// Escreva seu laço + condicional aqui\n",
    solution: `const notas = [8, 5, 9, 4, 7];\nfor (let i = 0; i < notas.length; i++) {\n  if (notas[i] >= 6) {\n    console.log("Aprovado");\n  } else {\n    console.log("Reprovado");\n  }\n}`,
    completed: false, type: "practice",
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

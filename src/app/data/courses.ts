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
    id: "fundamentos-computacao",
    title: "Fundamentos da Computação",
    description: "A base de tudo: história da programação, como o computador processa dados e tipos de linguagens.",
    level: "Iniciante",
    duration: "50 min",
    lessons: 7,
    image: "programming laptop code",
    category: "Fundamentos",
    progress: 0,
  },
  {
    id: "logica-programacao",
    title: "Lógica de Programação",
    description: "Os blocos de todo algoritmo: sequência, condição e repetição.",
    level: "Iniciante",
    duration: "30 min",
    lessons: 4,
    image: "puzzle logic blocks",
    category: "Lógica",
    progress: 0,
  },
  {
    id: "javascript-basics",
    title: "JavaScript para Iniciantes",
    description: "Seus primeiros programas: variáveis, laços, condicionais, funções e arrays.",
    level: "Iniciante",
    duration: "2 horas",
    lessons: 11,
    image: "javascript code editor",
    category: "JavaScript",
    progress: 0,
  },
  {
    id: "banco-de-dados",
    title: "Banco de Dados",
    description: "Como os programas guardam dados: tabelas relacionais e a linguagem SQL.",
    level: "Iniciante",
    duration: "30 min",
    lessons: 3,
    image: "database server tables",
    category: "Banco de Dados",
    progress: 0,
  },
  {
    id: "desenvolvimento-web",
    title: "Desenvolvimento Web: PHP e Frameworks",
    description: "Como sites dinâmicos funcionam no servidor com PHP e frameworks.",
    level: "Intermediário",
    duration: "20 min",
    lessons: 2,
    image: "web development interface",
    category: "Desenvolvimento Web",
    progress: 0,
  },
];

const JS_VIDEO = "https://www.youtube.com/embed/PkZNo7MFNFg";

export const lessons: Lesson[] = [
  // ── FUNDAMENTOS DA COMPUTAÇÃO ────────────────────────────
  {
    id: "fc-1", courseId: "fundamentos-computacao",
    title: "Conceitos e História",
    description: "De onde vem a programação: das primeiras máquinas de calcular até o software que usamos hoje.",
    content: `# Conceitos e História\n\nProgramar é dar instruções pra um computador executar. Isso existe desde muito antes dos computadores modernos.\n\n## Um pouco de história\n\n- **Ada Lovelace** (século 19) é considerada a primeira programadora da história — escreveu o primeiro algoritmo pensado pra ser executado por uma máquina.\n- Nos anos 1940, surgiram os primeiros computadores eletrônicos, programados fisicamente com cabos e interruptores.\n- Nas décadas seguintes vieram as linguagens de programação, que trocaram "fiação" por texto — tornando programar muito mais acessível.\n- Hoje existem milhares de linguagens, cada uma criada pra resolver um tipo de problema melhor que as outras.\n\n## Por que isso importa?\n\nEntender que programação é, no fundo, "dar instruções claras pra uma máquina" tira o mistério da coisa — é a mesma ideia desde Ada Lovelace, só que hoje com ferramentas muito mais poderosas.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "fc-2", courseId: "fundamentos-computacao",
    title: "Processamento de Dados",
    description: "Como um computador recebe, processa e devolve informação.",
    content: `# Processamento de Dados\n\nTodo programa, por mais complexo que pareça, segue o mesmo ciclo básico:\n\n## Entrada → Processamento → Saída\n\n- **Entrada**: dados que o programa recebe (um clique, um texto digitado, um arquivo)\n- **Processamento**: o que o programa faz com esses dados (calcula, organiza, compara)\n- **Saída**: o resultado que o programa devolve (uma tela, um som, um arquivo salvo)\n\n## Exemplo do dia a dia\n\nUma calculadora: você digita dois números (entrada), ela soma (processamento) e mostra o resultado (saída). Todo app, por mais sofisticado, é essa ideia repetida muitas vezes.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "fc-3", courseId: "fundamentos-computacao",
    title: "Processamento de Dados – Parte 2",
    description: "Como a informação é representada por dentro do computador: bits e bytes.",
    content: `# Processamento de Dados — Parte 2\n\nPor dentro, um computador só entende duas coisas: **ligado** e **desligado**. Isso é representado como 0 e 1 — o chamado sistema **binário**.\n\n## Bit e Byte\n\n- **Bit**: a menor unidade de informação (0 ou 1)\n- **Byte**: um grupo de 8 bits, suficiente pra representar, por exemplo, uma letra\n\n## Por que isso importa pra quem programa?\n\nVocê não precisa pensar em binário no dia a dia — as linguagens de programação escondem essa parte. Mas é bom saber que, por trás de todo texto, imagem ou vídeo que você vê na tela, existe só uma sequência enorme de 0s e 1s sendo processada muito rápido.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "fc-4", courseId: "fundamentos-computacao",
    title: "Tipos de Linguagens",
    description: "Linguagem de baixo nível vs. alto nível, e onde cada uma é usada.",
    content: `# Tipos de Linguagens\n\nNem toda linguagem de programação é igualmente "próxima" do que o computador entende.\n\n## Baixo nível\n\nMais próxima da máquina (ex.: Assembly). Rápida e eficiente, mas difícil de escrever e ler.\n\n## Alto nível\n\nMais próxima da linguagem humana (ex.: Python, JavaScript, Java). Mais fácil de aprender e escrever — é com essas que a maioria das pessoas começa.\n\nQuanto mais alto o nível, mais a linguagem "traduz" pra gente; quanto mais baixo, mais controle direto sobre a máquina — com mais complexidade.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "fc-5", courseId: "fundamentos-computacao",
    title: "Compiladas",
    description: "O que são linguagens compiladas e como elas viram um programa executável.",
    content: `# Linguagens Compiladas\n\nUma linguagem **compilada** passa por um programa (o compilador) que traduz todo o código de uma vez para linguagem de máquina, gerando um arquivo executável, antes de rodar.\n\n## Exemplos\n\nC, C++, Java (parcialmente), Go.\n\n## Vantagens e desvantagens\n\n- ✅ Geralmente roda mais rápido, já que já está traduzido\n- ✅ Erros de sintaxe são pegos antes de rodar\n- ❌ Precisa recompilar toda vez que o código muda, antes de testar`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "fc-6", courseId: "fundamentos-computacao",
    title: "Interpretadas",
    description: "O que são linguagens interpretadas, como JavaScript e Python, e como elas diferem das compiladas.",
    content: `# Linguagens Interpretadas\n\nUma linguagem **interpretada** é lida e executada linha por linha, em tempo real, por um programa chamado interpretador — sem um passo de compilação separado antes.\n\n## Exemplos\n\nJavaScript, Python, Ruby, PHP.\n\n## Vantagens e desvantagens\n\n- ✅ Mais rápido pra testar — escreveu, já roda\n- ✅ Geralmente mais fácil pra quem está aprendendo\n- ❌ Tende a rodar um pouco mais devagar que uma linguagem compilada\n\nA partir daqui, você vai praticar com **JavaScript** — uma linguagem interpretada, perfeita pra ver resultado na hora.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "fc-7", courseId: "fundamentos-computacao",
    title: "Internet e Mobilidade",
    description: "Como a programação conecta computadores, sites e aplicativos de celular.",
    content: `# Internet e Mobilidade\n\nProgramar hoje não é só sobre um programa rodando sozinho numa máquina — a maior parte do software que usamos se comunica pela internet.\n\n## Cliente e servidor\n\n- **Cliente**: o app ou site que você usa (no navegador ou no celular)\n- **Servidor**: o computador que guarda os dados e responde aos pedidos do cliente\n\nQuando você abre um app e ele mostra suas mensagens, o celular (cliente) pediu essa informação pra um servidor, em algum lugar do mundo, que respondeu.\n\n## Web vs. mobile\n\n- **Site/aplicação web**: roda no navegador, em qualquer dispositivo\n- **App nativo**: instalado no celular (Android/iOS), geralmente com acesso mais direto aos recursos do aparelho (câmera, GPS)`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "bd-1", courseId: "banco-de-dados",
    title: "Banco de Dados",
    description: "Onde e como os programas guardam informação de forma organizada.",
    content: `# Banco de Dados\n\nUm programa raramente guarda informação só na memória — ele precisa persistir dados mesmo depois de desligado. É pra isso que existe o **banco de dados**.\n\n## O que é\n\nUm sistema organizado pra guardar, buscar e atualizar informação de forma estruturada e confiável — pense numa versão muito mais poderosa de uma planilha.\n\n## Exemplo\n\nUm app de rede social guarda cada usuário, cada post e cada curtida como registros num banco de dados, pra poder buscar e mostrar tudo isso rapidamente depois.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "bd-2", courseId: "banco-de-dados",
    title: "Banco de Dados – Parte 2",
    description: "Bancos de dados relacionais: tabelas, linhas, colunas e relações entre elas.",
    content: `# Banco de Dados — Parte 2\n\nO tipo de banco de dados mais comum é o **relacional**, organizado em tabelas.\n\n## Tabelas, linhas e colunas\n\n- Cada **tabela** guarda um tipo de informação (ex.: "usuários", "pedidos")\n- Cada **linha** é um registro (ex.: um usuário específico)\n- Cada **coluna** é um atributo desse registro (ex.: nome, e-mail)\n\n## Relações\n\nTabelas podem se conectar entre si — por exemplo, a tabela "pedidos" pode referenciar qual usuário fez cada pedido. É daí que vem o nome "relacional".`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "log-1", courseId: "logica-programacao",
    title: "Lógica de Programação",
    description: "Antes de escrever qualquer linha de código, entenda os 3 blocos que formam todo algoritmo.",
    content: `# Lógica de Programação\n\nProgramar não é, no fundo, escrever numa linguagem — é descrever um processo passo a passo, de forma que não deixe dúvida sobre o que fazer. Isso é a **lógica de programação**, e ela existe antes e independente de qualquer linguagem.\n\nTodo algoritmo, não importa a linguagem, é feito de só 3 blocos:\n\n## 1. Sequência\n\nPassos em ordem, um depois do outro. Ex.: uma receita de bolo — você não pode colocar no forno antes de misturar os ingredientes.\n\n## 2. Condição (se... então... senão...)\n\nEscolher um caminho dependendo de uma situação. Ex.: "se estiver chovendo, leve guarda-chuva; senão, não leve."\n\n## 3. Repetição\n\nFazer a mesma coisa várias vezes, até algo acontecer. Ex.: "bata o ovo até ficar homogêneo."\n\nNo próximo exercício você vai praticar isso sem escrever código nenhum — só organizando passos, como quem resolve um quebra-cabeça.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "log-ex-1", courseId: "logica-programacao",
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
    id: "log-2", courseId: "logica-programacao",
    title: "Lógica de Programação – Parte 2",
    description: "Pseudocódigo: como esboçar um algoritmo em texto simples, antes de escrever código de verdade.",
    content: `# Lógica de Programação — Parte 2\n\nAntes de escrever código numa linguagem real, programadores costumam rascunhar a ideia em **pseudocódigo** — uma descrição em texto simples, sem se preocupar com a sintaxe exata de nenhuma linguagem.\n\n## Exemplo de pseudocódigo\n\n\`\`\`\nseja N = 7\n\nse N for maior que 5:\n    escreva "grande"\nsenão:\n    escreva "pequeno"\n\`\`\`\n\nQualquer programador, de qualquer linguagem, entende esse pseudocódigo. Só depois ele é "traduzido" pra sintaxe de JavaScript, Python, ou qualquer outra linguagem.\n\nNo próximo exercício, você vai ler um pseudocódigo como esse e prever o resultado, sem executar nada — só pensando.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "log-ex-2", courseId: "logica-programacao",
    title: "Exercício: Preveja o resultado",
    description: "Leia o algoritmo em pseudocódigo (sem rodar nada) e descubra o que ele vai mostrar.",
    content: `# Preveja o resultado\n\nLeia o algoritmo abaixo com atenção, sem executar nada — só pensando.\n\n\`\`\`\nseja N = 7\n\nse N for maior que 5:\n    escreva "grande"\nsenão:\n    escreva "pequeno"\n\`\`\`\n\n## Tarefa\n\nO que esse algoritmo vai mostrar na tela?`,
    code: "", solution: "",
    completed: false, type: "practice",
    exerciseKind: "predict",
    predict: { options: ["grande", "pequeno", "7", "Dá erro"], correctIndex: 0 },
  },
  {
    id: "js-1", courseId: "javascript-basics",
    title: "Olá, Mundo!",
    description: "Seu primeiro contato com JavaScript de verdade — rodando código e vendo o resultado na hora.",
    content: `# Olá, Mundo!\n\nChegou a hora de sair do papel e escrever código de verdade. A partir de agora você vai praticar com **JavaScript**, uma das linguagens mais populares do mundo.\n\n## console.log()\n\nA forma mais simples de um programa "falar" com você é exibindo uma mensagem. Em JavaScript, isso se faz com \`console.log()\`:\n\n\`\`\`js\nconsole.log("Olá, mundo!");\n\`\`\`\n\nEscrever um programa que só mostra "Olá, mundo!" é uma tradição entre programadores — é o primeiro passo em praticamente qualquer linguagem nova.`,
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
    title: "Variáveis e Constantes",
    description: "Como guardar e nomear valores no seu código com let e const.",
    content: `# Variáveis e Constantes\n\nUsamos variáveis para armazenar dados que o programa vai usar depois.\n\n## let e const\n\n\`\`\`js\nlet nome = "Maria";   // pode mudar depois\nconst PI = 3.14;      // não muda mais\n\`\`\`\n\nUse \`let\` quando o valor pode mudar ao longo do programa, e \`const\` quando ele é fixo. Na dúvida, prefira \`const\` — é mais seguro.`,
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
    title: "Laços de Repetição",
    description: "Como fazer o computador repetir uma tarefa várias vezes, sem copiar e colar código.",
    content: `# Laços de Repetição\n\nQuando você precisa repetir uma ação várias vezes, não escreve o código várias vezes — usa um **laço de repetição** (loop).\n\n## for\n\n\`\`\`js\nfor (let i = 1; i <= 5; i++) {\n  console.log(i);\n}\n\`\`\`\n\nIsso imprime 1, 2, 3, 4, 5 — o \`for\` repete o bloco enquanto a condição (\`i <= 5\`) for verdadeira, aumentando \`i\` a cada volta.\n\n## while\n\n\`\`\`js\nlet i = 1;\nwhile (i <= 5) {\n  console.log(i);\n  i++;\n}\n\`\`\`\n\nFaz a mesma coisa, mas verificando a condição antes de cada repetição — útil quando você não sabe de antemão quantas vezes vai repetir.`,
    code: "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}", solution: "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}",
    completed: false, type: "theory", videoUrl: JS_VIDEO,
  },
  {
    id: "js-ex-3", courseId: "javascript-basics",
    title: "Exercício: Contador",
    description: "Use um laço de repetição pra exibir uma sequência de números.",
    content: `# Contador\n\n## Tarefa\n\nUse um laço \`for\` pra exibir no console todos os números de 1 até 10, um por linha.`,
    code: "// Escreva seu laço aqui\n",
    solution: `for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}`,
    completed: false, type: "practice",
  },
  {
    id: "js-4", courseId: "javascript-basics",
    title: "Estruturas Condicionais",
    description: "Tome decisões no código comparando valores com if/else.",
    content: `# Estruturas Condicionais\n\nCondicionais decidem qual trecho de código roda, a partir de uma comparação.\n\n## if / else if / else\n\n\`\`\`js\nconst idade = 16;\n\nif (idade >= 18) {\n  console.log("Maior de idade");\n} else {\n  console.log("Menor de idade");\n}\n\`\`\`\n\n## Operadores de comparação\n\n- \`===\` igual\n- \`!==\` diferente\n- \`>\`, \`<\`, \`>=\`, \`<=\``,
    code: "const idade = 16;\n\nif (idade >= 18) {\n  console.log('Maior de idade');\n} else {\n  console.log('Menor de idade');\n}",
    solution: "const idade = 16;\n\nif (idade >= 18) {\n  console.log('Maior de idade');\n} else {\n  console.log('Menor de idade');\n}",
    completed: false, type: "theory", videoUrl: JS_VIDEO,
  },
  {
    id: "js-ex-4", courseId: "javascript-basics",
    title: "Exercício: Verificador de Idade",
    description: "Use condicionais para classificar uma idade.",
    content: `# Verificador de Idade\n\n## Tarefa\n\nDada uma variável \`idade\`, exiba:\n- "Menor de idade" se menor que 18\n- "Maior de idade" se 18 ou mais\n- "Idoso" se 60 ou mais`,
    code: "const idade = 25;\n\n// Escreva sua lógica aqui\n",
    solution: `const idade = 25;\nif (idade >= 60) {\n  console.log("Idoso");\n} else if (idade >= 18) {\n  console.log("Maior de idade");\n} else {\n  console.log("Menor de idade");\n}`,
    completed: false, type: "practice",
  },
  {
    id: "bd-3", courseId: "banco-de-dados",
    title: "SQL – MySQL",
    description: "A linguagem usada pra conversar com um banco de dados relacional.",
    content: `# SQL — MySQL\n\n**SQL** (Structured Query Language) é a linguagem usada pra buscar e manipular dados dentro de um banco de dados relacional, como o **MySQL**.\n\n## A consulta mais comum: SELECT\n\n\`\`\`sql\nSELECT nome, email FROM usuarios WHERE idade >= 18;\n\`\`\`\n\nEssa consulta busca, na tabela \`usuarios\`, o nome e o e-mail de todo mundo com 18 anos ou mais. SQL é declarativo: você descreve **o que** quer, não **como** buscar — quem decide o "como" é o banco de dados.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "web-1", courseId: "desenvolvimento-web",
    title: "PHP",
    description: "Uma linguagem interpretada muito usada pra criar sites dinâmicos no lado do servidor.",
    content: `# PHP\n\nPHP é uma linguagem interpretada criada especificamente pra web, muito usada no **lado do servidor** — ou seja, roda no servidor antes da página chegar até você.\n\n## Onde é usado\n\nPHP move uma parte enorme da web — inclusive o WordPress, que sozinho é usado em mais de 40% dos sites do mundo, é escrito em PHP.\n\n## Exemplo\n\n\`\`\`php\n<?php\n  echo "Olá, mundo!";\n?>\n\`\`\`\n\nRepare na semelhança com o "Olá, mundo!" que você já fez em JavaScript — a ideia de exibir uma mensagem se repete em praticamente toda linguagem.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "web-2", courseId: "desenvolvimento-web",
    title: "Frameworks",
    description: "Ferramentas prontas que aceleram o desenvolvimento, em vez de programar tudo do zero.",
    content: `# Frameworks\n\nUm **framework** é um conjunto de ferramentas e regras prontas que ajuda a construir um programa mais rápido, sem reinventar tudo do zero.\n\n## Alguns exemplos conhecidos\n\n- **React** — interfaces web (JavaScript)\n- **Laravel** — aplicações web no servidor (PHP)\n- **Django** — aplicações web no servidor (Python)\n- **Angular** — interfaces web (JavaScript/TypeScript)\n\n## Por que usar um framework?\n\nEm vez de resolver os mesmos problemas de novo em cada projeto (organização de arquivos, segurança, navegação), o framework já resolveu isso — e você foca no que é específico do seu projeto.`,
    code: "", solution: "",
    completed: false, type: "theory",
  },
  {
    id: "js-ex-5", courseId: "javascript-basics",
    title: "Atividade Prática",
    description: "Crie sua primeira função: um bloco de código reutilizável.",
    content: `# Atividade Prática: Funções\n\nUma **função** é um bloco de código reutilizável, que você define uma vez e pode chamar quantas vezes quiser.\n\n\`\`\`js\nconst somar = (a, b) => a + b;\nconsole.log(somar(2, 3)); // 5\n\`\`\`\n\n## Tarefa\n\nCrie uma função \`saudar(nome)\` que retorna a string \`"Olá, [nome]!"\` e exiba o resultado no console.`,
    code: "// Crie a função saudar aqui\n\nconsole.log(saudar('Maria'));",
    solution: `function saudar(nome) {\n  return "Olá, " + nome + "!";\n}\nconsole.log(saudar('Maria'));`,
    completed: false, type: "practice",
  },
  {
    id: "js-ex-6", courseId: "javascript-basics",
    title: "Atividade Prática – Parte 2",
    description: "Trabalhe com arrays: uma lista de valores dentro de uma única variável.",
    content: `# Atividade Prática: Arrays\n\nUm **array** guarda uma lista de valores numa única variável.\n\n\`\`\`js\nconst frutas = ['maçã', 'banana', 'uva'];\nconsole.log(frutas[0]); // 'maçã'\n\`\`\`\n\n## Tarefa\n\n1. Crie um array \`notas\` com 4 números (notas de 0 a 10)\n2. Exiba o array inteiro no console\n3. Exiba a primeira e a última nota separadamente`,
    code: "// Escreva seu código aqui\n",
    solution: `const notas = [8, 6, 9, 7];\nconsole.log(notas);\nconsole.log("Primeira:", notas[0]);\nconsole.log("Última:", notas[notas.length - 1]);`,
    completed: false, type: "practice",
  },
  {
    id: "js-ex-7", courseId: "javascript-basics",
    title: "Atividade Prática – Parte Final",
    description: "Uma última atividade juntando laço, condicional e array — tudo que você aprendeu até aqui.",
    content: `# Atividade Prática Final\n\nHora de juntar tudo: laço de repetição, condicional e array na mesma atividade.\n\n## Tarefa\n\nDado o array \`notas\`, use um laço \`for\` pra percorrer cada nota e exibir "Aprovado" se ela for maior ou igual a 6, ou "Reprovado" caso contrário.`,
    code: "const notas = [8, 5, 9, 4, 7];\n\n// Escreva seu laço + condicional aqui\n",
    solution: `const notas = [8, 5, 9, 4, 7];\nfor (let i = 0; i < notas.length; i++) {\n  if (notas[i] >= 6) {\n    console.log("Aprovado");\n  } else {\n    console.log("Reprovado");\n  }\n}`,
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

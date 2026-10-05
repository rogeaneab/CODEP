import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { getLessonById, getCourseById, getCourseUnits } from "../data/courses";
import { isLessonComplete, markLessonComplete, POINTS_PER_LESSON_VALUE } from "../lib/progress";
import { QuizGame } from "./QuizGame";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Layers, Code2, Video,
  RotateCcw, Play, Lightbulb, ChevronRight, Sparkles, Zap,
} from "lucide-react";

// Trilha → quiz de avaliação final, embutido na última unidade do curso.
const QUIZ_BY_COURSE: Record<string, string> = {
  "javascript-basics": "js-quiz",
};

type Tab = "theory" | "practice" | "quiz";

export function Lesson() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const lesson = getLessonById(lessonId || "");
  const course = getCourseById(courseId || "");

  const units = getCourseUnits(courseId || "");
  const unitIndex = units.findIndex(u => u.theory?.id === lessonId || u.practice?.id === lessonId);
  const currentUnit = unitIndex >= 0 ? units[unitIndex] : units[0];
  const previousUnit = unitIndex > 0 ? units[unitIndex - 1] : null;
  const nextUnit = unitIndex < units.length - 1 ? units[unitIndex + 1] : null;
  const isLastUnit = !nextUnit;
  const quizId = course ? QUIZ_BY_COURSE[course.id] : undefined;
  const showQuizTab = isLastUnit && !!quizId;

  const unitKey = `${currentUnit?.theory?.id ?? ""}|${currentUnit?.practice?.id ?? ""}`;

  const [activeTab, setActiveTab] = useState<Tab>("theory");
  const [theoryWatched, setTheoryWatched] = useState(false);
  const [theoryJustEarned, setTheoryJustEarned] = useState(false);
  const [practiceCode, setPracticeCode] = useState("");
  const [practiceOutput, setPracticeOutput] = useState("");
  const [practiceShowSolution, setPracticeShowSolution] = useState(false);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [practiceJustEarned, setPracticeJustEarned] = useState(false);
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    if (!currentUnit) return;
    const t = currentUnit.theory;
    const p = currentUnit.practice;
    setTheoryWatched(t ? isLessonComplete(t.id) : false);
    setTheoryJustEarned(false);
    setPracticeCode(p ? p.code : "");
    setPracticeOutput("");
    setPracticeShowSolution(false);
    setPracticeCompleted(p ? isLessonComplete(p.id) : false);
    setPracticeJustEarned(false);
    setShowHints(false);
    setActiveTab(lessonId === p?.id ? "practice" : "theory");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitKey]);

  if (!lesson || !course || !currentUnit) return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Aula não encontrada</h2>
      <Link to="/app/courses" className="text-blue-600 hover:text-blue-700 font-semibold">Voltar para cursos</Link>
    </div>
  );

  const theory = currentUnit.theory;
  const practice = currentUnit.practice;
  const unitTitle = theory?.title ?? practice?.title ?? lesson.title;

  const unitLessonIdFor = (u: Unit) => u.theory?.id ?? u.practice?.id ?? "";

  const runCode = () => {
    try {
      const logs: string[] = [];
      const orig = console.log;
      console.log = (...args) => logs.push(args.map(a => typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)).join(" "));
      new Function(practiceCode)();
      console.log = orig;
      setPracticeOutput(logs.length > 0 ? logs.join("\n") : "Código executado com sucesso!");
    } catch (e) {
      setPracticeOutput(`Erro: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  const checkSolution = () => {
    if (!practice) return;
    const norm = (s: string) => s.trim().replace(/\s+/g, " ");
    if (norm(practiceCode) === norm(practice.solution)) {
      const { alreadyDone } = markLessonComplete(practice.id);
      setPracticeOutput("✅ Parabéns! Solução correta!");
      setPracticeCompleted(true);
      setPracticeJustEarned(!alreadyDone);
    } else {
      setPracticeOutput("❌ Ainda não está correto. Tente novamente ou veja a solução.");
    }
  };

  const markTheoryWatched = () => {
    if (!theory) return;
    const { alreadyDone } = markLessonComplete(theory.id);
    setTheoryWatched(true);
    setTheoryJustEarned(!alreadyDone);
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    ...(theory ? [{ key: "theory" as Tab, label: "Teoria", icon: <Video size={14} /> }] : []),
    ...(practice ? [{ key: "practice" as Tab, label: "Prática", icon: <Code2 size={14} /> }] : []),
    ...(showQuizTab ? [{ key: "quiz" as Tab, label: "Avaliação", icon: <Zap size={14} /> }] : []),
  ];

  const unitDone = (u: Unit) =>
    (!u.theory || isLessonComplete(u.theory.id)) && (!u.practice || isLessonComplete(u.practice.id));

  return (
    <div className="flex flex-col pb-16 lg:pb-0">
      {/* Top bar: título da unidade + abas teoria/prática/avaliação */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <button onClick={() => navigate(`/app/courses/${courseId}`)}
                className="flex items-center gap-1.5 text-slate-400 hover:text-slate-900 transition font-semibold text-sm flex-shrink-0">
                <ArrowLeft size={16} /><span className="hidden sm:inline">Voltar</span>
              </button>
              <div className="w-px h-5 bg-gray-100 hidden sm:block" />
              <div className="min-w-0">
                <div className="text-xs text-slate-400 truncate">{course.title}</div>
                <div className="font-bold text-slate-900 truncate text-sm">{unitTitle}</div>
              </div>
            </div>
            <span className="text-xs text-slate-400 flex-shrink-0 ml-2">Unidade {unitIndex + 1}/{units.length}</span>
          </div>

          {tabs.length > 1 && (
            <div className="flex gap-1.5">
              {tabs.map(t => (
                <button key={t.key} onClick={() => setActiveTab(t.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeTab === t.key
                      ? "bg-blue-600 text-white"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  }`}>
                  {t.icon}{t.label}
                  {t.key === "theory" && theoryWatched && <CheckCircle2 size={12} className={activeTab === t.key ? "text-white" : "text-emerald-500"} />}
                  {t.key === "practice" && practiceCompleted && <CheckCircle2 size={12} className={activeTab === t.key ? "text-white" : "text-emerald-500"} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── ABA TEORIA ─────────────────────────────────────────────────── */}
      {activeTab === "theory" && theory && (
        <div className="bg-slate-950 flex-1">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
            <div className="rounded-2xl overflow-hidden bg-black aspect-video w-full mb-6 shadow-2xl">
              <iframe src={theory.videoUrl} title={theory.title} className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Video size={13} className="text-rose-400" />
                    <span className="text-xs text-slate-500">Teoria</span>
                  </div>
                  <h2 className="font-extrabold text-white mb-1">{theory.title}</h2>
                  <p className="text-sm text-slate-400">{theory.description}</p>
                </div>
                {!theoryWatched && (
                  <button onClick={markTheoryWatched}
                    className="flex-shrink-0 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition">
                    <CheckCircle2 size={15} />Assistida
                  </button>
                )}
              </div>
            </div>

            {theoryWatched && (
              <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-xl p-5 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Teoria concluída! Boa.</p>
                    {theoryJustEarned && (
                      <p className="text-xs text-emerald-300 font-semibold flex items-center gap-1 mt-0.5">
                        <Sparkles size={12} />+{POINTS_PER_LESSON_VALUE} pontos
                      </p>
                    )}
                  </div>
                </div>
                {practice ? (
                  <button onClick={() => setActiveTab("practice")}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition">
                    Ir para a prática<ArrowRight size={15} />
                  </button>
                ) : nextUnit ? (
                  <Link to={`/app/courses/${courseId}/lessons/${unitLessonIdFor(nextUnit)}`}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition">
                    Próxima unidade<ArrowRight size={15} />
                  </Link>
                ) : showQuizTab ? (
                  <button onClick={() => setActiveTab("quiz")}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition">
                    Ir para a avaliação<ArrowRight size={15} />
                  </button>
                ) : null}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── ABA PRÁTICA ────────────────────────────────────────────────── */}
      {activeTab === "practice" && practice && (
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[calc(100vh-10rem)]">
          {/* Left — instructions */}
          <div className="bg-white border-b lg:border-b-0 lg:border-r border-gray-100 overflow-y-auto p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-1 rounded-full">
                Exercício prático
              </span>
            </div>

            <div className="prose max-w-none mb-6">
              {practice.content.split("\n").map((line, i) => {
                if (line.startsWith("# ")) return <h1 key={i} className="text-xl font-extrabold mb-3 text-slate-900">{line.slice(2)}</h1>;
                if (line.startsWith("## ")) return <h2 key={i} className="text-base font-bold mb-2 mt-5 text-slate-900">{line.slice(3)}</h2>;
                if (line.startsWith("- ")) return <li key={i} className="ml-4 text-slate-500 text-sm">{line.slice(2)}</li>;
                if (line.trim() === "" || line.startsWith("```")) return <br key={i} />;
                return <p key={i} className="text-slate-500 text-sm leading-relaxed">{line}</p>;
              })}
            </div>

            <div className="mb-4">
              <button
                onClick={() => setShowHints(prev => !prev)}
                className="flex items-center gap-2 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-2 rounded-lg transition w-full"
              >
                <Lightbulb size={14} className="flex-shrink-0" />
                <span className="flex-1 text-left">Dicas</span>
                <ChevronRight size={13} className={`transition-transform ${showHints ? "rotate-90" : ""}`} />
              </button>
              {showHints && (
                <div className="mt-2 bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <ul className="space-y-1.5 text-xs text-amber-700">
                    <li>• Leia o enunciado com atenção</li>
                    <li>• Use console.log() para debugar</li>
                    <li>• Execute frequentemente para ver o output</li>
                  </ul>
                </div>
              )}
            </div>

            {practiceCompleted && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-emerald-800">Exercício concluído! Boa.</p>
                    {practiceJustEarned && (
                      <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                        <Sparkles size={11} />+{POINTS_PER_LESSON_VALUE} pontos
                      </p>
                    )}
                  </div>
                </div>
                {nextUnit ? (
                  <Link to={`/app/courses/${courseId}/lessons/${unitLessonIdFor(nextUnit)}`}
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition flex-shrink-0">
                    Próxima unidade<ArrowRight size={13} />
                  </Link>
                ) : showQuizTab ? (
                  <button onClick={() => setActiveTab("quiz")}
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition flex-shrink-0">
                    Ir para a avaliação<ArrowRight size={13} />
                  </button>
                ) : null}
              </div>
            )}

            {practiceShowSolution ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                <p className="text-xs font-bold text-emerald-800 mb-2">Solução</p>
                <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg text-xs overflow-x-auto"><code>{practice.solution}</code></pre>
              </div>
            ) : (
              <button onClick={() => setPracticeShowSolution(true)}
                className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                Ver solução
              </button>
            )}
          </div>

          {/* Right — code editor */}
          <div className="bg-slate-950 flex flex-col min-h-[480px] lg:min-h-0">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
                <span className="text-slate-500 text-xs font-semibold ml-2">script.js</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setPracticeCode(practice.code); setPracticeOutput(""); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition text-xs font-semibold">
                  <RotateCcw size={12} />Resetar
                </button>
                <button onClick={runCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition text-xs font-semibold">
                  <Play size={12} />Executar
                </button>
                <button onClick={checkSolution}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-xs font-semibold">
                  <CheckCircle2 size={12} />Verificar
                </button>
              </div>
            </div>

            <textarea value={practiceCode} onChange={e => setPracticeCode(e.target.value)}
              className="flex-1 p-4 bg-slate-950 text-slate-100 font-mono text-sm resize-none focus:outline-none min-h-[240px]"
              spellCheck={false} style={{ tabSize: 2 }} />

            {practiceOutput && (
              <div className="border-t border-slate-800 p-4 bg-slate-900 max-h-40 overflow-y-auto flex-shrink-0">
                <div className="text-xs text-slate-500 mb-1.5 font-semibold uppercase tracking-wide">Output</div>
                <pre className="text-slate-200 text-sm whitespace-pre-wrap">{practiceOutput}</pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── ABA AVALIAÇÃO (quiz embutido) ─────────────────────────────── */}
      {activeTab === "quiz" && quizId && (
        <QuizGame quizIdProp={quizId} embedded onExit={() => setActiveTab(practice ? "practice" : "theory")} />
      )}

      {/* Bottom nav: navega por unidade (teoria+prática juntas) */}
      <div className="bg-white border-t border-gray-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {previousUnit
            ? <Link to={`/app/courses/${courseId}/lessons/${unitLessonIdFor(previousUnit)}`}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition font-semibold text-sm">
                <ArrowLeft size={16} /><span className="hidden sm:inline">Anterior</span>
              </Link>
            : <div />}
          <div className="flex gap-1">
            {units.map((u, i) => (
              <Link key={unitLessonIdFor(u)} to={`/app/courses/${courseId}/lessons/${unitLessonIdFor(u)}`}>
                <div className={`h-2 rounded-full transition-all ${
                  i === unitIndex ? "bg-blue-500 w-4" : unitDone(u) ? "bg-emerald-500 w-2" : "bg-slate-200 w-2"
                }`} />
              </Link>
            ))}
          </div>
          {nextUnit
            ? <Link to={`/app/courses/${courseId}/lessons/${unitLessonIdFor(nextUnit)}`}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition">
                Próxima<ArrowRight size={16} />
              </Link>
            : showQuizTab
              ? <button onClick={() => setActiveTab("quiz")}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition">
                  <Zap size={15} />Avaliação
                </button>
              : <Link to={`/app/courses/${courseId}`}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition">
                  <Layers size={15} />Concluir
                </Link>
          }
        </div>
      </div>
    </div>
  );
}

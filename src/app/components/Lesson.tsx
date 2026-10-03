import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { getLessonById, getLessonsByCourseId, getCourseById } from "../data/courses";
import { ArrowLeft, ArrowRight, CheckCircle2, Layers, Code2, Video, RotateCcw, Play, Lightbulb, ChevronRight } from "lucide-react";

export function Lesson() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const lesson = getLessonById(lessonId || "");
  const course = getCourseById(courseId || "");

  // For video mode: filter only video lessons; for practice: all lessons without video
  const isVideo = !!lesson?.videoUrl;
  const allLessons = getLessonsByCourseId(courseId || "").filter(l => !!l.videoUrl === isVideo);

  const [watched, setWatched] = useState(false);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (lesson) {
      setWatched(lesson.completed);
      setCode(lesson.code);
      setIsCompleted(lesson.completed);
      setOutput("");
      setShowSolution(false);
    }
  }, [lessonId, lesson]);

  if (!lesson || !course) return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Aula não encontrada</h2>
      <Link to="/app/courses" className="text-blue-600 hover:text-blue-700 font-semibold">Voltar para cursos</Link>
    </div>
  );

  const currentIndex = allLessons.findIndex(l => l.id === lessonId);
  const previousLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const isLastLesson = !nextLesson;

  const runCode = () => {
    try {
      const logs: string[] = [];
      const orig = console.log;
      console.log = (...args) => logs.push(args.map(a => typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)).join(" "));
      new Function(code)();
      console.log = orig;
      setOutput(logs.length > 0 ? logs.join("\n") : "Código executado com sucesso!");
    } catch (e) {
      setOutput(`Erro: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  const checkSolution = () => {
    const norm = (s: string) => s.trim().replace(/\s+/g, " ");
    if (norm(code) === norm(lesson.solution)) {
      setOutput("✅ Parabéns! Solução correta!");
      setIsCompleted(true);
    } else {
      setOutput("❌ Ainda não está correto. Tente novamente ou veja a solução.");
    }
  };

  // ── VIDEO LAYOUT ──────────────────────────────────────────────────────────
  if (isVideo) {
    return (
      <div className="h-screen flex flex-col bg-slate-950">
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex-shrink-0">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <button onClick={() => navigate(`/app/courses/${courseId}`)}
                className="flex items-center gap-1.5 text-slate-400 hover:text-white transition font-semibold text-sm flex-shrink-0">
                <ArrowLeft size={16} /><span className="hidden sm:inline">Voltar</span>
              </button>
              <div className="w-px h-5 bg-slate-700 hidden sm:block" />
              <div className="min-w-0">
                <div className="text-xs text-slate-500 truncate">{course.title}</div>
                <div className="text-sm font-bold text-white truncate">{lesson.title}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-slate-500 hidden sm:block">{currentIndex + 1}/{allLessons.length}</span>
              {watched && (
                <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-lg">
                  <CheckCircle2 size={14} /><span className="text-xs font-semibold hidden sm:inline">Assistida</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
            <div className="rounded-2xl overflow-hidden bg-black aspect-video w-full mb-6 shadow-2xl">
              <iframe src={lesson.videoUrl} title={lesson.title} className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Video size={13} className="text-rose-400" />
                    <span className="text-xs text-slate-500">Aula {currentIndex + 1} de {allLessons.length}</span>
                  </div>
                  <h2 className="font-extrabold text-white mb-1">{lesson.title}</h2>
                  <p className="text-sm text-slate-400">{lesson.description}</p>
                </div>
                {!watched && (
                  <button onClick={() => setWatched(true)}
                    className="flex-shrink-0 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition">
                    <CheckCircle2 size={15} />Assistida
                  </button>
                )}
              </div>
            </div>

            {isLastLesson && (
              <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Layers size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white mb-1">Você concluiu todas as videoaulas!</p>
                    <p className="text-sm text-slate-400 mb-3">Agora pratique com os exercícios interativos nas Trilhas.</p>
                    <Link to="/app/trails"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition">
                      <Layers size={15} />Ir para os Exercícios
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-900 border-t border-slate-800 px-4 py-3 flex-shrink-0">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            {previousLesson
              ? <Link to={`/app/courses/${courseId}/lessons/${previousLesson.id}`}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition font-semibold text-sm">
                  <ArrowLeft size={16} /><span className="hidden sm:inline">Anterior</span>
                </Link>
              : <div />}
            <div className="flex gap-1">
              {allLessons.map(l => (
                <Link key={l.id} to={`/app/courses/${courseId}/lessons/${l.id}`}>
                  <div className={`h-2 rounded-full transition-all ${l.id === lessonId ? "bg-blue-500 w-4" : l.completed ? "bg-emerald-500 w-2" : "bg-slate-700 w-2"}`} />
                </Link>
              ))}
            </div>
            {nextLesson
              ? <Link to={`/app/courses/${courseId}/lessons/${nextLesson.id}`}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition">
                  Próxima<ArrowRight size={16} />
                </Link>
              : <Link to="/app/trails"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition">
                  <Layers size={15} />Exercícios
                </Link>
            }
          </div>
        </div>
      </div>
    );
  }

  // ── PRACTICE / EXERCISE LAYOUT ────────────────────────────────────────────
  return (
    <div className="flex flex-col pb-16 lg:pb-0">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-slate-400 hover:text-slate-900 transition font-semibold text-sm flex-shrink-0">
              <ArrowLeft size={16} /><span className="hidden sm:inline">Voltar</span>
            </button>
            <div className="w-px h-5 bg-gray-100 hidden sm:block" />
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Code2 className="text-white" size={13} />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-slate-400 truncate">{course.title}</div>
                <div className="font-bold text-slate-900 truncate text-sm">{lesson.title}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-slate-400 hidden sm:block">{currentIndex + 1}/{allLessons.length}</span>
            {isCompleted && (
              <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg">
                <CheckCircle2 size={15} /><span className="hidden sm:inline text-xs font-semibold">Concluída</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Split layout: stacked on mobile, side-by-side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[calc(100vh-8rem)]">

        {/* Left — instructions */}
        <div className="bg-white border-b lg:border-b-0 lg:border-r border-gray-100 overflow-y-auto p-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-1 rounded-full">
              Exercício {currentIndex + 1} de {allLessons.length}
            </span>
          </div>

          <div className="prose max-w-none mb-6">
            {lesson.content.split("\n").map((line, i) => {
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

          {showSolution ? (
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <p className="text-xs font-bold text-emerald-800 mb-2">Solução</p>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg text-xs overflow-x-auto"><code>{lesson.solution}</code></pre>
            </div>
          ) : (
            <button onClick={() => setShowSolution(true)}
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
              Ver solução
            </button>
          )}

          {/* Mobile nav buttons */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100 lg:hidden">
            {previousLesson
              ? <Link to={`/app/courses/${courseId}/lessons/${previousLesson.id}`}
                  className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition font-semibold text-sm">
                  <ArrowLeft size={16} />Anterior
                </Link>
              : <div />}
            {nextLesson
              ? <Link to={`/app/courses/${courseId}/lessons/${nextLesson.id}`}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition text-sm font-bold">
                  Próximo<ArrowRight size={16} />
                </Link>
              : <Link to={`/app/courses/${courseId}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition text-sm font-bold">
                  Concluir
                </Link>
            }
          </div>
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
              <button onClick={() => { setCode(lesson.code); setOutput(""); }}
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

          <textarea value={code} onChange={e => setCode(e.target.value)}
            className="flex-1 p-4 bg-slate-950 text-slate-100 font-mono text-sm resize-none focus:outline-none min-h-[240px]"
            spellCheck={false} style={{ tabSize: 2 }} />

          {output && (
            <div className="border-t border-slate-800 p-4 bg-slate-900 max-h-40 overflow-y-auto flex-shrink-0">
              <div className="text-xs text-slate-500 mb-1.5 font-semibold uppercase tracking-wide">Output</div>
              <pre className="text-slate-200 text-sm whitespace-pre-wrap">{output}</pre>
            </div>
          )}
        </div>
      </div>

      {/* Desktop bottom nav */}
      <div className="hidden lg:block bg-white border-t border-gray-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {previousLesson
            ? <Link to={`/app/courses/${courseId}/lessons/${previousLesson.id}`}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition font-semibold text-sm">
                <ArrowLeft size={16} />Anterior
              </Link>
            : <div />}
          <span className="text-sm text-slate-400 font-medium">{currentIndex + 1} / {allLessons.length}</span>
          {nextLesson
            ? <Link to={`/app/courses/${courseId}/lessons/${nextLesson.id}`}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition font-semibold text-sm">
                Próximo<ArrowRight size={16} />
              </Link>
            : <Link to={`/app/courses/${courseId}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition text-sm font-bold">
                Concluir
              </Link>
          }
        </div>
      </div>
    </div>
  );
}

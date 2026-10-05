import { Link, useParams, useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getCourseById, getCourseUnits } from "../data/courses";
import { isLessonComplete } from "../lib/progress";
import { ArrowLeft, BookOpen, Clock, CheckCircle2, Play, GraduationCap, BarChart2, Video, Layers, Lock, BookOpenCheck, Code2 } from "lucide-react";

export function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = getCourseById(courseId || "");
  const units = getCourseUnits(courseId || "");

  if (!course) return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Curso não encontrado</h2>
      <Link to="/app/courses" className="text-blue-600 hover:text-blue-700 font-semibold">Voltar para cursos</Link>
    </div>
  );

  if (course.comingSoon) return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Lock className="text-slate-400" size={24} />
      </div>
      <h2 className="text-xl font-extrabold text-slate-900 mb-2">{course.title} — em breve</h2>
      <p className="text-slate-500 text-sm mb-6">
        Esta trilha ainda está em revisão. Por enquanto, foque em JavaScript para Iniciantes.
      </p>
      <Link to="/app/courses/javascript-basics"
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition">
        <Play size={15} />Ir para JavaScript para Iniciantes
      </Link>
    </div>
  );

  const getImageUrl = (id: string) => {
    const map: Record<string, string> = {
      "javascript-basics": "https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?w=1200&h=500&fit=crop",
      "git-github": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200&h=500&fit=crop",
      "react-fundamentals": "https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?w=1200&h=500&fit=crop",
      "python-data-science": "https://images.unsplash.com/photo-1738996747326-65b5d7d7fe9b?w=1200&h=500&fit=crop",
      "nodejs-backend": "https://images.unsplash.com/photo-1763128516808-785e80c1dd68?w=1200&h=500&fit=crop",
      "css-advanced": "https://images.unsplash.com/photo-1661246627162-feb0269e0c07?w=1200&h=500&fit=crop",
      "typescript-mastery": "https://images.unsplash.com/photo-1699885960867-56d5f5262d38?w=1200&h=500&fit=crop",
    };
    return map[id] || map["javascript-basics"];
  };

  const isUnitDone = (u: typeof units[number]) =>
    (!u.theory || isLessonComplete(u.theory.id)) && (!u.practice || isLessonComplete(u.practice.id));

  const completedUnits = units.filter(isUnitDone).length;
  const progressPct = units.length > 0 ? Math.round((completedUnits / units.length) * 100) : 0;

  const levelBadge: Record<string, string> = {
    "Iniciante": "bg-emerald-50 text-emerald-700 border border-emerald-200",
    "Intermediário": "bg-amber-50 text-amber-700 border border-amber-200",
    "Avançado": "bg-red-50 text-red-700 border border-red-200",
  };

  const firstUnpaired = (u: typeof units[number]) =>
    (u.theory && !isLessonComplete(u.theory.id)) ? u.theory
    : (u.practice && !isLessonComplete(u.practice.id)) ? u.practice
    : undefined;

  const nextUnit = units.find(u => !isUnitDone(u)) || units[0];
  const nextLesson = nextUnit ? (firstUnpaired(nextUnit) || nextUnit.theory || nextUnit.practice) : undefined;

  return (
    <div className="pb-20 md:pb-8">
      {/* Hero */}
      <div className="relative h-52 md:h-64 bg-slate-900 overflow-hidden">
        <ImageWithFallback src={getImageUrl(course.id)} alt={course.title}
          className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
            <button onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/70 hover:text-white mb-3 transition text-sm font-semibold">
              <ArrowLeft size={16} /> Voltar
            </button>
            <div className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 ${levelBadge[course.level] || "bg-slate-100 text-slate-700"}`}>
              {course.level}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-1">{course.title}</h1>
            <p className="text-slate-300 text-sm">{course.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Playlist */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Playlist header */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-rose-500" />
                    <h2 className="font-extrabold text-slate-900">Unidades</h2>
                  </div>
                  <span className="text-sm text-slate-400 font-medium">{completedUnits}/{units.length} concluídas</span>
                </div>
                {completedUnits > 0 && (
                  <div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
                    </div>
                    <p className="text-xs text-slate-400 mt-1 font-medium">{progressPct}% concluído</p>
                  </div>
                )}
                <p className="text-xs text-slate-400 mt-2">
                  {units.length} {units.length === 1 ? "unidade" : "unidades"} · teoria + prática em cada uma
                </p>
              </div>

              {/* Unit items */}
              <div className="divide-y divide-gray-50">
                {units.map((unit, index) => {
                  const openId = unit.theory?.id ?? unit.practice?.id ?? "";
                  const title = unit.theory?.title ?? unit.practice?.title ?? "";
                  const done = isUnitDone(unit);
                  const theoryDone = unit.theory ? isLessonComplete(unit.theory.id) : false;
                  const practiceDone = unit.practice ? isLessonComplete(unit.practice.id) : false;
                  return (
                    <Link key={openId}
                      to={`/app/courses/${course.id}/lessons/${openId}`}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition group">

                      {/* Unit number / status */}
                      <div className="relative w-12 h-12 rounded-lg flex-shrink-0 bg-slate-100 flex items-center justify-center">
                        {done
                          ? <CheckCircle2 size={22} className="text-emerald-500" />
                          : <span className="text-sm font-extrabold text-slate-400">{index + 1}</span>
                        }
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-400 font-medium mb-0.5">Unidade {index + 1}</p>
                        <h3 className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition line-clamp-1 mb-1.5">
                          {title}
                        </h3>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {unit.theory && (
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${
                              theoryDone ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-50 text-slate-500 border-slate-200"
                            }`}>
                              <BookOpenCheck size={11} /> Teoria {theoryDone && "✓"}
                            </span>
                          )}
                          {unit.practice && (
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${
                              practiceDone ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-50 text-slate-500 border-slate-200"
                            }`}>
                              <Code2 size={11} /> Prática {practiceDone && "✓"}
                            </span>
                          )}
                        </div>
                      </div>

                      <Play size={16} className="text-slate-300 group-hover:text-blue-600 transition flex-shrink-0" />
                    </Link>
                  );
                })}
              </div>

              {/* After course info */}
              <div className="p-5 bg-slate-50 border-t border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Layers size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-0.5">Teoria e prática juntas</p>
                    <p className="text-xs text-slate-500">
                      Cada aula já abre com teoria e exercício prático na mesma tela — sem precisar trocar de página.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-20">
              <div className="space-y-3 mb-6">
                {[
                  { icon: <GraduationCap size={15} className="text-blue-600" />, label: "Nível", value: course.level },
                  { icon: <Clock size={15} className="text-sky-600" />, label: "Duração", value: course.duration },
                  { icon: <Video size={15} className="text-rose-500" />, label: "Unidades", value: `${units.length} unidades` },
                  { icon: <BarChart2 size={15} className="text-amber-500" />, label: "Categoria", value: course.category },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">{item.icon}{item.label}</div>
                    <span className="font-semibold text-slate-900 text-sm">{item.value}</span>
                  </div>
                ))}
              </div>

              {course.enrolled ? (
                <>
                  {completedUnits > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-500 font-medium">Seu progresso</span>
                        <span className="text-sm font-extrabold text-blue-600">{progressPct}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
                      </div>
                    </div>
                  )}
                  <Link to={nextLesson ? `/app/courses/${course.id}/lessons/${nextLesson.id}` : `/app/courses/${course.id}`}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-sm">
                    <Play size={16} />
                    {completedUnits === 0 ? "Começar Curso" : "Continuar Assistindo"}
                  </Link>
                </>
              ) : (
                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-sm">
                  Inscrever-se no Curso
                </button>
              )}
              <p className="text-center text-xs text-slate-400 mt-3">Acesso vitalício ao conteúdo</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

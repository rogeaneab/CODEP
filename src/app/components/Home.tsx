import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  BookOpen, Zap, Target, Award, Play, ArrowRight,
  CheckCircle2, Clock, TrendingUp, ChevronRight,
  Code2, BarChart2, Sparkles,
} from "lucide-react";
import { courses, getLessonsByCourseId } from "../data/courses";
import { getCourseProgress, isLessonComplete, getTotalPoints, getCurrentLevelInfo, isCourseUnlocked } from "../lib/progress";

const imageMap: Record<string, string> = {
  "javascript-basics": "https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?w=600&h=360&fit=crop",
  "git-github": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=360&fit=crop",
  "react-fundamentals": "https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?w=600&h=360&fit=crop",
  "python-data-science": "https://images.unsplash.com/photo-1738996747326-65b5d7d7fe9b?w=600&h=360&fit=crop",
  "nodejs-backend": "https://images.unsplash.com/photo-1763128516808-785e80c1dd68?w=600&h=360&fit=crop",
  "css-advanced": "https://images.unsplash.com/photo-1661246627162-feb0269e0c07?w=600&h=360&fit=crop",
  "typescript-mastery": "https://images.unsplash.com/photo-1699885960867-56d5f5262d38?w=600&h=360&fit=crop",
};

export function Home() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const firstName = user.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : "Aluno";

  // Cursos liberados até agora na trilha (o resto aparece travado em
  // /app/courses e vai sendo revelado conforme o aluno evolui).
  const enrolledCourses = courses.filter(c => isCourseUnlocked(c.id));
  // Progresso real, vindo do que o aluno de fato completou (localStorage),
  // não do valor estático de data/courses.ts.
  const progressByCourse = new Map(enrolledCourses.map(c => [c.id, getCourseProgress(c.id)]));
  const totalLessons = enrolledCourses.reduce((acc, c) => acc + c.lessons, 0);
  const completedLessons = Math.floor(
    enrolledCourses.reduce((acc, c) => acc + (c.lessons * (progressByCourse.get(c.id) ?? 0)) / 100, 0)
  );
  const avgProgress =
    enrolledCourses.length > 0
      ? Math.round(enrolledCourses.reduce((acc, c) => acc + (progressByCourse.get(c.id) ?? 0), 0) / enrolledCourses.length)
      : 0;
  const totalPoints = getTotalPoints();
  const levelInfo = getCurrentLevelInfo();

  const nextCourse = enrolledCourses.find(c => {
    const p = progressByCourse.get(c.id) ?? 0;
    return p < 100 && p > 0;
  }) || enrolledCourses[0];
  const nextCourseProgress = nextCourse ? (progressByCourse.get(nextCourse.id) ?? 0) : 0;

  // Primeira aula não concluída da próxima trilha — usada para levar o
  // aluno direto pra prática, sem passar pela tela de detalhes do curso.
  const nextCourseLessons = nextCourse ? getLessonsByCourseId(nextCourse.id) : [];
  const nextLesson = nextCourseLessons.find(l => !isLessonComplete(l.id)) || nextCourseLessons[0];
  const isNewLearner = nextCourse && nextCourseProgress === 0;

  const quickActions = [
    { to: "/app/courses", icon: <BookOpen size={20} />, label: "Cursos", desc: "Ver biblioteca", bg: "bg-blue-50", color: "text-blue-600" },
    { to: "/app/quizzes", icon: <Zap size={20} />, label: "Quiz", desc: "Testar conhecimento", bg: "bg-amber-50", color: "text-amber-600" },
    { to: "/app/challenges", icon: <Target size={20} />, label: "Desafios", desc: "Praticar código", bg: "bg-emerald-50", color: "text-emerald-600" },
    { to: "/app/certificates", icon: <Award size={20} />, label: "Certificados", desc: "Suas conquistas", bg: "bg-sky-50", color: "text-sky-600" },
  ];

  const recentActivity = [
    { icon: <CheckCircle2 size={14} className="text-emerald-500" />, text: "Completou \"Introdução ao JavaScript\"", time: "Hoje" },
    { icon: <Zap size={14} className="text-amber-500" />, text: "Quiz de JavaScript — 8/10 corretas", time: "Ontem" },
    { icon: <CheckCircle2 size={14} className="text-emerald-500" />, text: "Completou \"Variáveis e Tipos de Dados\"", time: "2 dias atrás" },
    { icon: <Target size={14} className="text-blue-500" />, text: "Desafio FizzBuzz resolvido", time: "3 dias atrás" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-12">

      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Olá, {firstName}! 👋
        </h1>
        <p className="text-slate-500 text-sm mt-1">Aqui está um resumo do seu progresso.</p>
      </div>

      {/* Nível e XP — ligado a exercícios de fato concluídos/acertados,
          não decorativo. */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-5 mb-6 text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-xs text-blue-100 font-semibold uppercase tracking-wide">Nível {levelInfo.level}</p>
              <p className="text-lg font-extrabold leading-tight">{totalPoints} XP</p>
            </div>
          </div>
          <span className="text-xs text-blue-100 font-medium">
            {levelInfo.xpInLevel}/{levelInfo.xpToNextLevel} XP pro próximo nível
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div className="bg-white h-2 rounded-full transition-all" style={{ width: `${levelInfo.pct}%` }} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { icon: <BookOpen size={17} />, color: "text-blue-600", bg: "bg-blue-50", label: "Cursos ativos", value: enrolledCourses.length },
          { icon: <CheckCircle2 size={17} />, color: "text-emerald-600", bg: "bg-emerald-50", label: "Aulas concluídas", value: `${completedLessons}/${totalLessons}` },
          { icon: <TrendingUp size={17} />, color: "text-sky-600", bg: "bg-sky-50", label: "Progresso médio", value: `${avgProgress}%` },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium">{s.label}</span>
              <div className={`w-7 h-7 ${s.bg} rounded-lg flex items-center justify-center ${s.color}`}>
                {s.icon}
              </div>
            </div>
            <div className="text-xl font-extrabold text-slate-900">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Continue studying / Start here */}
          {nextCourse && nextLesson && (
            <div>
              <h2 className="text-base font-extrabold text-slate-900 mb-3">
                {isNewLearner ? "Comece aqui" : "Continue de onde parou"}
              </h2>
              <Link to={`/app/courses/${nextCourse.id}/lessons/${nextLesson.id}`}
                className="flex gap-4 bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all group">
                <div className="relative w-36 flex-shrink-0 overflow-hidden">
                  <ImageWithFallback
                    src={imageMap[nextCourse.id]}
                    alt={nextCourse.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{nextCourse.category}</span>
                    <h3 className="font-bold text-slate-900 text-sm mt-0.5 mb-1">
                      {isNewLearner ? nextLesson.title : nextCourse.title}
                    </h3>
                    <p className="text-xs text-slate-400 mb-3">
                      {isNewLearner ? nextCourse.title : `${nextCourse.lessons} aulas · ${nextCourse.duration}`}
                    </p>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mb-1">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${nextCourseProgress}%` }} />
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{nextCourseProgress}% concluído</span>
                  </div>
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                      <Play size={11} />
                      {isNewLearner ? "Começar agora" : "Continuar"}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* All enrolled courses */}
          {enrolledCourses.length > 1 && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-base font-extrabold text-slate-900">Meus cursos</h2>
                <Link to="/app/profile" className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:text-blue-700">
                  Ver todos <ArrowRight size={13} />
                </Link>
              </div>
              <div className="space-y-2">
                {enrolledCourses.map(course => {
                  const pct = progressByCourse.get(course.id) ?? 0;
                  return (
                    <Link key={course.id} to={`/app/courses/${course.id}`}
                      className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3 hover:border-blue-200 hover:bg-blue-50/30 transition group">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={imageMap[course.id]}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-slate-900 truncate">{course.title}</span>
                          <span className="text-xs font-bold text-blue-600 ml-2 flex-shrink-0">{pct}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1">
                          <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500 transition flex-shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick actions */}
          <div>
            <h2 className="text-base font-extrabold text-slate-900 mb-3">Acesso rápido</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickActions.map(action => (
                <Link key={action.to} to={action.to}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all text-center group">
                  <div className={`w-10 h-10 ${action.bg} rounded-xl flex items-center justify-center mx-auto mb-2 ${action.color}`}>
                    {action.icon}
                  </div>
                  <p className="text-sm font-bold text-slate-900">{action.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{action.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">

          {/* Overall progress */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 size={16} className="text-blue-600" />
              <h2 className="text-sm font-extrabold text-slate-900">Progresso geral</h2>
            </div>
            <div className="space-y-3">
              {enrolledCourses.map(course => {
                const pct = progressByCourse.get(course.id) ?? 0;
                return (
                  <div key={course.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-slate-600 truncate max-w-[140px]">{course.title}</span>
                      <span className="text-xs font-bold text-slate-900 ml-1">{pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${pct === 100 ? "bg-emerald-500" : "bg-blue-500"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              {enrolledCourses.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-4">Nenhum curso ainda</p>
              )}
            </div>
            {enrolledCourses.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Progresso total</span>
                <span className="text-sm font-extrabold text-blue-600">{avgProgress}%</span>
              </div>
            )}
          </div>

          {/* Recent activity */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-slate-400" />
              <h2 className="text-sm font-extrabold text-slate-900">Atividade recente</h2>
            </div>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-600 font-medium leading-snug">{item.text}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tip card */}
          <div className="bg-blue-600 rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Code2 size={16} className="text-blue-200" />
              <span className="text-xs font-bold text-blue-200 uppercase tracking-wide">Dica do dia</span>
            </div>
            <p className="text-sm font-semibold leading-snug mb-3">
              Estudar 30 minutos por dia é mais eficaz do que 3 horas uma vez por semana.
            </p>
            <Link to="/app/quizzes"
              className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 transition text-white text-xs font-bold px-3 py-1.5 rounded-lg">
              <Zap size={12} />
              Fazer um quiz agora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

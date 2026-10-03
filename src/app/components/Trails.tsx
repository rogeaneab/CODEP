import { useState } from "react";
import { Link } from "react-router";
import { courses, lessons } from "../data/courses";
import {
  CheckCircle2, Lock, Globe, BarChart2, Server,
  Palette, Award, Clock, BookOpen, ChevronRight, Play,
  Layers,
} from "lucide-react";

interface Trail {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  accent: string;
  courseIds: string[];
  level: string;
  tag: string;
}

const trails: Trail[] = [
  {
    id: "web-frontend",
    title: "Desenvolvimento Frontend",
    desc: "Do zero ao desenvolvedor web. JavaScript, CSS, React e TypeScript em ordem ideal.",
    icon: <Globe size={20} />,
    color: "text-blue-600",
    bg: "bg-blue-600",
    accent: "border-blue-500",
    courseIds: ["javascript-basics", "css-advanced", "react-fundamentals", "typescript-mastery"],
    level: "Iniciante → Avançado",
    tag: "Mais popular",
  },
  {
    id: "data-science",
    title: "Ciência de Dados",
    desc: "Lógica de programação e Python para análise e visualização de dados.",
    icon: <BarChart2 size={20} />,
    color: "text-emerald-600",
    bg: "bg-emerald-600",
    accent: "border-emerald-500",
    courseIds: ["javascript-basics", "python-data-science"],
    level: "Iniciante → Intermediário",
    tag: "Novo",
  },
  {
    id: "backend",
    title: "Desenvolvimento Backend",
    desc: "APIs robustas com JavaScript, TypeScript e Node.js do básico ao avançado.",
    icon: <Server size={20} />,
    color: "text-sky-600",
    bg: "bg-sky-600",
    accent: "border-sky-500",
    courseIds: ["javascript-basics", "typescript-mastery", "nodejs-backend"],
    level: "Intermediário → Avançado",
    tag: "",
  },
];

const levelColor: Record<string, { bg: string; text: string }> = {
  "Iniciante":    { bg: "bg-emerald-100", text: "text-emerald-700" },
  "Intermediário": { bg: "bg-amber-100",  text: "text-amber-700" },
  "Avançado":     { bg: "bg-red-100",     text: "text-red-700" },
};

export function Trails() {
  const [activeTrail, setActiveTrail] = useState(trails[0].id);
  const enrolledIds = new Set(courses.filter(c => c.enrolled).map(c => c.id));

  const trail = trails.find(t => t.id === activeTrail)!;
  const trailCourses = trail.courseIds
    .map(id => courses.find(c => c.id === id))
    .filter(Boolean) as typeof courses;

  const totalHours = trailCourses.reduce((acc, c) => acc + parseInt(c.duration), 0);
  const completedCount = trailCourses.filter(c => c.progress === 100).length;
  const progressPct = Math.round((completedCount / trailCourses.length) * 100);

  // Find the first non-completed course to highlight as "current"
  const currentIndex = trailCourses.findIndex(c => c.progress < 100);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-24 md:pb-12">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Trilhas de Aprendizagem</h1>
        <p className="text-slate-500 text-sm">Escolha um caminho e siga em sequência até o certificado.</p>
      </div>

      {/* Trail selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {trails.map(t => {
          const tCourses = t.courseIds.map(id => courses.find(c => c.id === id)).filter(Boolean) as typeof courses;
          const tCompleted = tCourses.filter(c => c.progress === 100).length;
          const tPct = Math.round((tCompleted / tCourses.length) * 100);
          const isActive = t.id === activeTrail;

          return (
            <button
              key={t.id}
              onClick={() => setActiveTrail(t.id)}
              className={`text-left p-4 rounded-xl border-2 transition-all ${
                isActive
                  ? `${t.accent} bg-white shadow-md`
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className={`w-8 h-8 rounded-lg ${isActive ? t.bg : "bg-slate-100"} flex items-center justify-center ${isActive ? "text-white" : "text-slate-400"}`}>
                  {t.icon}
                </div>
                {t.tag && (
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{t.tag}</span>
                )}
              </div>
              <p className={`text-sm font-bold leading-tight mb-1 ${isActive ? "text-slate-900" : "text-slate-600"}`}>{t.title}</p>
              <p className="text-xs text-slate-400 mb-2">{t.level}</p>
              {tPct > 0 && (
                <div className="w-full bg-slate-100 rounded-full h-1">
                  <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${tPct}%` }} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Active trail info bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className={`w-12 h-12 ${trail.bg} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
            {trail.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-extrabold text-slate-900 mb-0.5">{trail.title}</h2>
            <p className="text-sm text-slate-500">{trail.desc}</p>
          </div>
          <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 flex-shrink-0">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Clock size={12} /> {totalHours}h
            </span>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <BookOpen size={12} /> {trailCourses.length} cursos
            </span>
          </div>
        </div>

        {completedCount > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-slate-500 font-medium">Progresso da trilha</span>
              <span className="text-xs font-extrabold text-blue-600">{progressPct}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
            </div>
            <p className="text-xs text-slate-400 mt-1">{completedCount} de {trailCourses.length} cursos concluídos</p>
          </div>
        )}
      </div>

      {/* Roadmap */}
      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200" />

        <div className="space-y-4">
          {trailCourses.map((course, index) => {
            const isDone = course.progress === 100;
            const isCurrent = index === currentIndex;
            const lc = levelColor[course.level] || { bg: "bg-slate-100", text: "text-slate-600" };
            const exercises = lessons.filter(l => l.courseId === course.id && !l.videoUrl);
            const firstExercise = exercises[0];
            const doneExercises = exercises.filter(l => l.completed).length;

            return (
              <div key={course.id} className="relative flex gap-5">
                {/* Node */}
                <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white shadow-sm font-extrabold text-sm ${
                  isDone ? "bg-emerald-500 text-white"
                    : isCurrent ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-400"
                }`}>
                  {isDone ? <CheckCircle2 size={20} /> : index + 1}
                </div>

                {/* Card */}
                <div className={`flex-1 mb-1 rounded-xl border overflow-hidden ${
                  isDone ? "bg-emerald-50 border-emerald-200"
                    : isCurrent ? "bg-blue-50 border-blue-200"
                    : "bg-white border-gray-200"
                }`}>
                  {/* Course header */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${lc.bg} ${lc.text}`}>{course.level}</span>
                        {isCurrent && !isDone && <span className="text-xs font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">Atual</span>}
                        {isDone && <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Concluído ✓</span>}
                      </div>
                      <span className="text-xs text-slate-400 font-medium">{doneExercises}/{exercises.length} exercícios</span>
                    </div>
                    <h3 className={`font-bold text-sm mb-0.5 ${isDone ? "text-emerald-800" : isCurrent ? "text-blue-900" : "text-slate-900"}`}>
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{course.description}</p>
                  </div>

                  {/* Exercise list */}
                  <div className="divide-y divide-gray-100">
                    {exercises.map((ex, ei) => (
                      <Link key={ex.id} to={`/app/courses/${course.id}/lessons/${ex.id}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50/50 transition group">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                          ex.completed ? "bg-emerald-500 text-white" : "bg-blue-100 text-blue-600"
                        }`}>
                          {ex.completed ? <CheckCircle2 size={14} /> : ei + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-900 truncate group-hover:text-blue-600 transition">{ex.title}</p>
                          <p className="text-xs text-slate-400 truncate">{ex.description}</p>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold bg-blue-600 text-white px-2.5 py-1 rounded-lg flex-shrink-0 group-hover:bg-blue-700 transition">
                          <Play size={10} className="fill-white" />
                          Abrir
                        </span>
                      </Link>
                    ))}
                    {exercises.length === 0 && (
                      <p className="text-xs text-slate-400 px-4 py-3">Exercícios em breve.</p>
                    )}
                  </div>

                  {firstExercise && (
                    <div className="px-4 py-3 bg-blue-600 border-t border-blue-700">
                      <Link to={`/app/courses/${course.id}/lessons/${firstExercise.id}`}
                        className="flex items-center justify-center gap-2 text-sm font-bold text-white hover:text-blue-100 transition">
                        <Play size={13} className="fill-white" />
                        {doneExercises > 0 ? "Continuar Exercícios" : "Começar Exercícios"}
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Certificate node */}
          <div className="relative flex gap-5">
            <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white shadow-sm ${
              completedCount === trailCourses.length
                ? "bg-amber-400 text-white"
                : "bg-slate-100 text-slate-300"
            }`}>
              <Award size={20} />
            </div>
            <div className={`flex-1 mb-1 rounded-xl border p-4 ${
              completedCount === trailCourses.length
                ? "bg-amber-50 border-amber-200"
                : "bg-slate-50 border-dashed border-slate-200"
            }`}>
              <div className="flex items-center gap-2 mb-1">
                {completedCount === trailCourses.length
                  ? <span className="text-xs font-bold bg-amber-400 text-white px-2 py-0.5 rounded-full">Desbloqueado!</span>
                  : <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><Lock size={11} />Bloqueado</span>
                }
              </div>
              <h3 className={`font-bold text-sm mb-0.5 ${completedCount === trailCourses.length ? "text-amber-800" : "text-slate-400"}`}>
                Certificado de {trail.title}
              </h3>
              <p className={`text-xs ${completedCount === trailCourses.length ? "text-amber-700" : "text-slate-400"}`}>
                {completedCount === trailCourses.length
                  ? "Parabéns! Seu certificado está disponível."
                  : `Conclua todos os ${trailCourses.length} cursos para desbloquear.`}
              </p>
              {completedCount === trailCourses.length && (
                <Link to="/app/certificates"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-amber-700 hover:text-amber-800 transition">
                  Ver meu certificado <ChevronRight size={13} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Coming soon */}
      <div className="mt-10 bg-white border border-dashed border-gray-200 rounded-2xl p-8 text-center">
        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
          <Layers size={22} className="text-slate-300" />
        </div>
        <h3 className="font-bold text-slate-900 mb-1">Mais trilhas em breve</h3>
        <p className="text-sm text-slate-400">Mobile, UI/UX e Inteligência Artificial chegando em breve.</p>
      </div>
    </div>
  );
}

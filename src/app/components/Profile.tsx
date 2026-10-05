import { useState } from "react";
import { Link } from "react-router";
import { courses } from "../data/courses";
import { getCourseProgress, getTotalPoints } from "../lib/progress";
import {
  BookOpen, Award, TrendingUp, Clock, Settings, Flame,
  CheckCircle2, Lock, Mail, User, Calendar, ChevronRight,
  Star, Target, Zap, GraduationCap, Edit3, X, Save, Sparkles,
} from "lucide-react";

export function Profile() {
  const enrolledCourses = courses.filter(c => c.enrolled);
  const progressByCourse = new Map(enrolledCourses.map(c => [c.id, getCourseProgress(c.id)]));
  const totalLessons = enrolledCourses.reduce((acc, c) => acc + c.lessons, 0);
  const completedLessons = Math.floor(
    enrolledCourses.reduce((acc, c) => acc + (c.lessons * (progressByCourse.get(c.id) ?? 0)) / 100, 0)
  );
  const totalHours = enrolledCourses.reduce((acc, c) => acc + parseInt(c.duration), 0);
  const totalPoints = getTotalPoints();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState<string>(user.name || "");
  const [nameInput, setNameInput] = useState(user.name || "");

  const name = displayName
    ? displayName.charAt(0).toUpperCase() + displayName.slice(1)
    : "Aluno CODEP";
  const initials = name.substring(0, 2).toUpperCase();

  const saveProfile = () => {
    const newName = nameInput.trim() || displayName;
    const updated = { ...user, name: newName };
    localStorage.setItem("user", JSON.stringify(updated));
    setDisplayName(newName);
    setEditing(false);
  };

  const achievements = [
    { icon: <Star size={20} />, bg: "bg-amber-50", color: "text-amber-500", border: "border-amber-200", title: "Primeira Aula", desc: "Completou a primeira aula", unlocked: completedLessons >= 1 },
    { icon: <Flame size={20} />, bg: "bg-orange-50", color: "text-orange-500", border: "border-orange-200", title: "7 Dias Seguidos", desc: "Estudou por 7 dias consecutivos", unlocked: true },
    { icon: <TrendingUp size={20} />, bg: "bg-emerald-50", color: "text-emerald-600", border: "border-emerald-200", title: "Em Progresso", desc: "50% de um curso concluído", unlocked: enrolledCourses.some(c => (progressByCourse.get(c.id) ?? 0) >= 50) },
    { icon: <Target size={20} />, bg: "bg-blue-50", color: "text-blue-600", border: "border-blue-200", title: "Desafiante", desc: "Resolveu um desafio de código", unlocked: false },
    { icon: <Zap size={20} />, bg: "bg-yellow-50", color: "text-yellow-600", border: "border-yellow-200", title: "Quiz Master", desc: "10/10 num quiz", unlocked: false },
    { icon: <GraduationCap size={20} />, bg: "bg-sky-50", color: "text-sky-600", border: "border-sky-200", title: "Graduado", desc: "Concluiu um curso completo", unlocked: enrolledCourses.some(c => (progressByCourse.get(c.id) ?? 0) === 100) },
    { icon: <BookOpen size={20} />, bg: "bg-indigo-50", color: "text-indigo-600", border: "border-indigo-200", title: "Estudioso", desc: "3 cursos matriculados", unlocked: enrolledCourses.length >= 3 },
    { icon: <Award size={20} />, bg: "bg-rose-50", color: "text-rose-600", border: "border-rose-200", title: "Certificado", desc: "Recebeu um certificado", unlocked: false },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 md:pb-12">

      {/* Profile card */}
      <div className="bg-white border border-gray-200 rounded-2xl mb-6">
        {/* Cover */}
        <div className="h-24 bg-gradient-to-r from-slate-800 to-slate-700 rounded-t-2xl" />

        {/* Avatar + info */}
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-8 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-extrabold border-4 border-white shadow-sm flex-shrink-0">
              {initials}
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition"
            >
              {editing ? <X size={14} /> : <Edit3 size={14} />}
              {editing ? "Cancelar" : "Editar"}
            </button>
          </div>

          {editing ? (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Nome</label>
                <input
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-400"
                />
              </div>
              <button
                onClick={saveProfile}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition"
              >
                <Save size={14} />
                Salvar alterações
              </button>
            </div>
          ) : (
            <>
              <h1 className="font-extrabold text-slate-900 mb-0.5">{name}</h1>
              <p className="text-sm text-slate-400 mb-4">Estudante CODEP · Membro desde Março 2026</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2.5 text-sm text-slate-500">
                  <div className="w-8 h-8 bg-slate-50 border border-gray-200 rounded-lg flex items-center justify-center">
                    <Mail size={14} className="text-slate-400" />
                  </div>
                  <span className="truncate">{user.email || "sem email"}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-500">
                  <div className="w-8 h-8 bg-slate-50 border border-gray-200 rounded-lg flex items-center justify-center">
                    <User size={14} className="text-slate-400" />
                  </div>
                  <span>Estudante</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-500">
                  <div className="w-8 h-8 bg-slate-50 border border-gray-200 rounded-lg flex items-center justify-center">
                    <Calendar size={14} className="text-slate-400" />
                  </div>
                  <span>Março 2026</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Cursos", value: enrolledCourses.length, color: "text-blue-600" },
          { label: "Aulas feitas", value: completedLessons, color: "text-emerald-600" },
          { label: "Horas", value: `${totalHours}h`, color: "text-sky-600" },
          { label: "Sequência", value: "7d", color: "text-amber-500" },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className={`font-extrabold text-xl ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Cursos matriculados */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-extrabold text-slate-900 text-sm">Cursos matriculados</h2>
            <Link to="/app/courses" className="text-xs text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1">
              Explorar <ChevronRight size={12} />
            </Link>
          </div>
          {enrolledCourses.length > 0 ? (
            <div className="space-y-3">
              {enrolledCourses.map(course => (
                <Link key={course.id} to={`/app/courses/${course.id}`}
                  className="flex items-center gap-3 group">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    (progressByCourse.get(course.id) ?? 0) === 100 ? "bg-emerald-50" : "bg-blue-50"
                  }`}>
                    {(progressByCourse.get(course.id) ?? 0) === 100
                      ? <CheckCircle2 size={16} className="text-emerald-500" />
                      : <BookOpen size={16} className="text-blue-600" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-blue-600 transition">{course.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-slate-100 rounded-full h-1">
                        <div
                          className={`h-1 rounded-full ${(progressByCourse.get(course.id) ?? 0) === 100 ? "bg-emerald-500" : "bg-blue-500"}`}
                          style={{ width: `${(progressByCourse.get(course.id) ?? 0)}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400 font-medium flex-shrink-0">{(progressByCourse.get(course.id) ?? 0)}%</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-slate-400 mb-3">Nenhum curso ainda</p>
              <Link to="/app/courses" className="text-sm font-bold text-blue-600 hover:text-blue-700">Explorar cursos →</Link>
            </div>
          )}
        </div>

        {/* Certificados */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-extrabold text-slate-900 text-sm">Certificados</h2>
            <Link to="/app/certificates" className="text-xs text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1">
              Ver todos <ChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {enrolledCourses.map(course => (
              <div key={course.id} className={`flex items-center gap-3 p-3 rounded-xl border ${
                (progressByCourse.get(course.id) ?? 0) === 100 ? "border-emerald-100 bg-emerald-50/50" : "border-gray-100 bg-slate-50"
              }`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  (progressByCourse.get(course.id) ?? 0) === 100 ? "bg-emerald-100" : "bg-slate-200"
                }`}>
                  {(progressByCourse.get(course.id) ?? 0) === 100
                    ? <Award size={16} className="text-emerald-600" />
                    : <Lock size={14} className="text-slate-400" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold truncate ${(progressByCourse.get(course.id) ?? 0) === 100 ? "text-slate-900" : "text-slate-400"}`}>
                    {course.title}
                  </p>
                  <p className="text-xs mt-0.5 text-slate-400">
                    {(progressByCourse.get(course.id) ?? 0) === 100 ? "Certificado disponível" : `${(progressByCourse.get(course.id) ?? 0)}% concluído`}
                  </p>
                </div>
                {(progressByCourse.get(course.id) ?? 0) === 100 && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">Pronto</span>
                )}
              </div>
            ))}
            {enrolledCourses.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-6">Conclua um curso para ganhar certificados</p>
            )}
          </div>
        </div>

        {/* Conquistas */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-extrabold text-slate-900 text-sm">Conquistas</h2>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              {unlockedCount}/{achievements.length} desbloqueadas
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {achievements.map(a => (
              <div key={a.title}
                className={`rounded-xl border p-4 text-center transition ${
                  a.unlocked ? `${a.border} bg-white` : "border-gray-100 bg-slate-50 opacity-50"
                }`}>
                <div className={`w-10 h-10 ${a.unlocked ? a.bg : "bg-slate-100"} rounded-xl flex items-center justify-center mx-auto mb-2 ${a.unlocked ? a.color : "text-slate-300"}`}>
                  {a.icon}
                </div>
                <p className="text-xs font-bold text-slate-900 leading-tight mb-0.5">{a.title}</p>
                <p className="text-xs text-slate-400 leading-tight">{a.desc}</p>
                {a.unlocked && (
                  <span className="inline-block mt-2 text-xs text-emerald-600 font-bold">✓ Desbloqueada</span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

import { courses } from "../data/courses";
import { Award, BookOpen, Clock, Download, Lock, GraduationCap, CheckCircle2, Code2 } from "lucide-react";

function generateCredentialId(courseId: string) {
  return `CODEP-2026-${courseId.toUpperCase().replace(/-/g, "").slice(0, 8)}`;
}

function CertificateCard({ course, unlocked }: { course: typeof courses[0]; unlocked: boolean }) {
  const credentialId = generateCredentialId(course.id);

  if (!unlocked) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden opacity-50">
        <div className="bg-slate-100 h-3" />
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <Lock className="text-slate-300" size={20} />
            </div>
            <span className="text-xs text-slate-400 bg-slate-50 border border-gray-100 px-2.5 py-1 rounded-full font-semibold">
              Bloqueado
            </span>
          </div>
          <h3 className="font-bold text-slate-900 mb-1 text-sm">{course.title}</h3>
          <p className="text-xs text-slate-400 mb-3">{course.category}</p>
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400 font-medium">Progresso</span>
              <span className="text-slate-500 font-bold">{course.progress}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: `${course.progress}%` }} />
            </div>
          </div>
          <p className="text-xs text-slate-400">Complete 100% do curso para desbloquear o certificado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all group">
      {/* Certificate color bar */}
      <div className="bg-blue-600 h-3" />

      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center">
            <Award className="text-amber-500" size={24} />
          </div>
          <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
            <CheckCircle2 size={11} />
            Conquistado
          </span>
        </div>

        {/* Certificate preview */}
        <div className="border border-gray-100 rounded-xl p-4 mb-4 bg-slate-50 text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Code2 className="text-white" size={14} />
            </div>
          </div>
          <p className="text-xs text-slate-400 font-medium mb-1">CODEP — Certificado de Conclusão</p>
          <h4 className="font-extrabold text-slate-900 text-sm mb-1">{course.title}</h4>
          <p className="text-xs text-slate-400">{course.category} · {course.level}</p>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-slate-400 font-mono">{credentialId}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-4">
          <span className="flex items-center gap-1"><BookOpen size={12} />{course.lessons} aulas</span>
          <span className="flex items-center gap-1"><Clock size={12} />{course.duration}</span>
          <span className="flex items-center gap-1"><GraduationCap size={12} />{course.level}</span>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl font-bold hover:bg-blue-700 transition text-sm shadow-sm">
          <Download size={15} />
          Baixar Certificado
        </button>
      </div>
    </div>
  );
}

export function Certificates() {
  const enrolledCourses = courses.filter(c => c.enrolled);
  const unlockedCerts = enrolledCourses.filter(c => c.progress >= 100);
  const inProgressCerts = enrolledCourses.filter(c => c.progress < 100);

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
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-700 px-3 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Award size={14} className="text-amber-500" />
            Certificados Digitais
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">Certificados</h1>
          <p className="text-slate-500 text-sm">Conclua os cursos para ganhar certificados digitais reconhecidos.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-50 border border-amber-100 rounded-lg flex items-center justify-center">
              <Award className="text-amber-500" size={15} />
            </div>
            <span className="font-bold text-slate-900 text-sm">{unlockedCerts.length}</span>
            <span className="text-slate-400 text-xs font-medium">conquistados</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="text-blue-600" size={15} />
            </div>
            <span className="font-bold text-slate-900 text-sm">{inProgressCerts.length}</span>
            <span className="text-slate-400 text-xs font-medium">em andamento</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* Empty state */}
        {enrolledCourses.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="text-slate-300" size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Nenhum certificado ainda</h3>
            <p className="text-slate-500 text-sm mb-6">Inscreva-se em cursos e complete-os para ganhar seus certificados.</p>
          </div>
        )}

        {/* Unlocked */}
        {unlockedCerts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-extrabold text-slate-900 mb-5 flex items-center gap-2">
              <CheckCircle2 className="text-emerald-500" size={20} />
              Conquistados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {unlockedCerts.map(course => (
                <CertificateCard key={course.id} course={course} unlocked={true} />
              ))}
            </div>
          </div>
        )}

        {/* In progress */}
        {inProgressCerts.length > 0 && (
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 mb-5 flex items-center gap-2">
              <Lock className="text-slate-300" size={20} />
              Em Andamento
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {inProgressCerts.map(course => (
                <CertificateCard key={course.id} course={course} unlocked={false} />
              ))}
            </div>
          </div>
        )}

        {/* How it works */}
        <div className="mt-10 bg-slate-50 rounded-2xl border border-gray-200 p-6">
          <h3 className="font-extrabold text-slate-900 mb-4">Como funciona?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: <BookOpen size={20} className="text-blue-600" />, bg: "bg-blue-50", title: "Inscreva-se", desc: "Escolha um curso e comece a estudar no seu ritmo." },
              { icon: <GraduationCap size={20} className="text-emerald-600" />, bg: "bg-emerald-50", title: "Complete 100%", desc: "Assista todas as aulas e conclua os exercícios práticos." },
              { icon: <Award size={20} className="text-amber-500" />, bg: "bg-amber-50", title: "Baixe o Certificado", desc: "Receba seu certificado digital com número de credencial único." },
            ].map(step => (
              <div key={step.title} className="flex items-start gap-3">
                <div className={`w-10 h-10 ${step.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  {step.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-0.5">{step.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

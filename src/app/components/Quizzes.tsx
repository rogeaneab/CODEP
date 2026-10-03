import { Link } from "react-router";
import { quizzes } from "../data/quizzes";
import { Trophy, Zap, Star, ChevronRight } from "lucide-react";

export function Quizzes() {
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
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Zap size={14} className="text-blue-500" />
            Quizzes Interativos
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">Quizzes</h1>
          <p className="text-slate-500 text-sm">
            Teste seus conhecimentos e ganhe XP!
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-50 border border-amber-100 rounded-lg flex items-center justify-center">
              <Trophy className="text-amber-500" size={16} />
            </div>
            <span className="font-bold text-slate-900 text-sm">0 XP</span>
            <span className="text-slate-400 text-xs font-medium">total</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center">
              <Star className="text-blue-600" size={16} />
            </div>
            <span className="font-bold text-slate-900 text-sm">0</span>
            <span className="text-slate-400 text-xs font-medium">concluídos</span>
          </div>
        </div>
      </div>

      {/* Quiz Cards */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {quizzes.map((quiz) => (
            <Link
              key={quiz.id}
              to={`/app/quizzes/${quiz.id}`}
              className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all overflow-hidden"
            >
              {/* Card Top */}
              <div
                className="p-6 flex items-center gap-4"
                style={{ backgroundColor: quiz.bgColor }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ backgroundColor: quiz.color + "22" }}
                >
                  {quiz.emoji}
                </div>
                <div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: quiz.color + "22", color: quiz.color }}
                  >
                    {quiz.category}
                  </span>
                  <h3 className="font-bold text-slate-900 mt-1.5 text-sm">{quiz.title}</h3>
                </div>
              </div>

              {/* Card Bottom */}
              <div className="px-5 py-4 flex items-center justify-between">
                <div className="flex-1 min-w-0 mr-3">
                  <p className="text-slate-500 text-xs">{quiz.description}</p>
                  <p className="text-slate-400 text-xs mt-0.5">
                    {quiz.questions.length} perguntas
                  </p>
                </div>
                <div className="flex flex-col items-center bg-amber-50 rounded-xl px-3 py-2 border border-amber-100 flex-shrink-0">
                  <span className="text-amber-500 text-xs font-semibold">+XP</span>
                  <span className="text-amber-600 font-extrabold text-base leading-none">
                    {quiz.xpReward}
                  </span>
                </div>
              </div>

              {/* Start button */}
              <div className="px-5 pb-5">
                <div className="w-full bg-blue-600 group-hover:bg-blue-700 text-white text-center py-2.5 rounded-xl font-bold transition text-sm flex items-center justify-center gap-1.5">
                  Começar Quiz
                  <ChevronRight size={15} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getQuizById } from "../data/quizzes";
import { X, Heart, Zap, Trophy, RotateCcw, ArrowRight } from "lucide-react";

type Phase = "playing" | "feedback" | "finished" | "gameover";

export function QuizGame() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const quiz = getQuizById(quizId || "");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("playing");
  const [hearts, setHearts] = useState(3);
  const [xp, setXp] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  if (!quiz) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <p className="text-slate-400">Quiz não encontrado.</p>
      </div>
    );
  }

  const question = quiz.questions[currentIndex];
  const progress = ((currentIndex) / quiz.questions.length) * 100;
  const isCorrect = selected === question.correctIndex;

  const handleSelect = (idx: number) => {
    if (phase !== "playing") return;
    setSelected(idx);
  };

  const handleCheck = () => {
    if (selected === null) return;
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      setXp((x) => x + Math.floor(quiz.xpReward / quiz.questions.length));
    } else {
      const newHearts = hearts - 1;
      setHearts(newHearts);
      if (newHearts <= 0) {
        setPhase("feedback");
        setTimeout(() => setPhase("gameover"), 1200);
        return;
      }
    }
    setPhase("feedback");
  };

  const handleContinue = () => {
    if (currentIndex + 1 >= quiz.questions.length) {
      setPhase("finished");
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setPhase("playing");
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setPhase("playing");
    setHearts(3);
    setXp(0);
    setCorrectCount(0);
  };

  /* ── Game Over ── */
  if (phase === "gameover") {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center max-w-sm w-full">
          <div className="text-6xl mb-5">💔</div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Você perdeu!</h2>
          <p className="text-slate-400 text-sm mb-7">Sem vidas restantes. Tente novamente!</p>
          <button
            onClick={handleRestart}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-sm mb-3"
          >
            <RotateCcw size={18} />
            Tentar Novamente
          </button>
          <button
            onClick={() => navigate("/app/quizzes")}
            className="w-full text-slate-500 hover:text-slate-700 font-semibold text-sm py-2"
          >
            Voltar aos Quizzes
          </button>
        </div>
      </div>
    );
  }

  /* ── Resultado Final ── */
  if (phase === "finished") {
    const accuracy = Math.round((correctCount / quiz.questions.length) * 100);
    const perfect = correctCount === quiz.questions.length;

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center max-w-sm w-full">
          <div className="text-6xl mb-4">{perfect ? "🏆" : accuracy >= 60 ? "🎉" : "📚"}</div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-1">
            {perfect ? "Perfeito!" : accuracy >= 60 ? "Muito bem!" : "Continue praticando!"}
          </h2>
          <p className="text-slate-400 text-sm mb-7">
            {correctCount} de {quiz.questions.length} corretas
          </p>

          <div className="grid grid-cols-3 gap-3 mb-7">
            <div className="bg-amber-50 rounded-xl border border-amber-100 px-3 py-4 text-center">
              <div className="text-2xl font-extrabold text-amber-500">+{xp}</div>
              <div className="text-xs text-slate-400 font-semibold mt-1">XP Ganho</div>
            </div>
            <div className="bg-blue-50 rounded-xl border border-blue-100 px-3 py-4 text-center">
              <div className="text-2xl font-extrabold text-blue-600">{accuracy}%</div>
              <div className="text-xs text-slate-400 font-semibold mt-1">Precisão</div>
            </div>
            <div className="bg-red-50 rounded-xl border border-red-100 px-3 py-4 text-center">
              <div className="text-2xl font-extrabold text-red-500">{hearts}</div>
              <div className="text-xs text-slate-400 font-semibold mt-1">Vidas</div>
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-sm mb-3"
          >
            <RotateCcw size={18} />
            Jogar Novamente
          </button>
          <button
            onClick={() => navigate("/app/quizzes")}
            className="w-full flex items-center justify-center gap-2 border border-gray-200 bg-white text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition"
          >
            Outros Quizzes
          </button>
        </div>
      </div>
    );
  }

  /* ── Jogo ── */
  const feedbackCorrect = phase === "feedback" && isCorrect;
  const feedbackWrong = phase === "feedback" && !isCorrect;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Bar */}
      <div className="flex items-center gap-3 px-4 pt-5 pb-3 border-b border-gray-100">
        <button
          onClick={() => navigate("/app/quizzes")}
          className="text-slate-300 hover:text-slate-500 transition p-1"
        >
          <X size={22} />
        </button>

        {/* Progress Bar */}
        <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-1">
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              size={20}
              className={i < hearts ? "text-red-500 fill-red-500" : "text-slate-200 fill-slate-200"}
            />
          ))}
        </div>
      </div>

      {/* XP Badge */}
      <div className="px-4 pt-3 flex justify-end">
        <div className="flex items-center gap-1 text-amber-500 font-bold text-sm bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-lg">
          <Zap size={14} className="fill-amber-500" />
          {xp} XP
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 px-4 pt-6 pb-4 max-w-xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">{quiz.emoji}</span>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
              {quiz.title}
            </p>
            <p className="text-xs text-slate-400 font-medium">
              {currentIndex + 1} / {quiz.questions.length}
            </p>
          </div>
        </div>

        <h2 className="text-lg font-bold text-slate-900 mb-6 leading-snug">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, idx) => {
            let classes = "w-full text-left px-5 py-4 rounded-xl border-2 font-semibold transition-all text-slate-800 text-sm ";

            if (phase === "playing") {
              classes += selected === idx
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50";
            } else {
              if (idx === question.correctIndex) {
                classes += "border-emerald-400 bg-emerald-50 text-emerald-700";
              } else if (idx === selected && selected !== question.correctIndex) {
                classes += "border-red-300 bg-red-50 text-red-600";
              } else {
                classes += "border-gray-100 bg-white opacity-40";
              }
            }

            return (
              <button key={idx} className={classes} onClick={() => handleSelect(idx)}>
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      phase === "playing" && selected === idx
                        ? "border-blue-500 bg-blue-500 text-white"
                        : phase !== "playing" && idx === question.correctIndex
                        ? "border-emerald-400 bg-emerald-400 text-white"
                        : phase !== "playing" && idx === selected
                        ? "border-red-300 bg-red-300 text-white"
                        : "border-gray-200 text-slate-400"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback Banner + Button */}
      <div
        className={`transition-all duration-300 ${
          phase === "feedback"
            ? feedbackCorrect
              ? "bg-emerald-50 border-t-2 border-emerald-300"
              : "bg-red-50 border-t-2 border-red-300"
            : "bg-white border-t border-gray-100"
        }`}
      >
        {phase === "feedback" && (
          <div className="max-w-xl mx-auto px-4 pt-4">
            <div
              className={`flex items-start gap-3 ${
                feedbackCorrect ? "text-emerald-700" : "text-red-600"
              }`}
            >
              <span className="text-xl">{feedbackCorrect ? "✅" : "❌"}</span>
              <div>
                <p className="font-bold">
                  {feedbackCorrect ? "Correto!" : "Errado!"}
                </p>
                <p className="text-sm mt-0.5 opacity-80">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-xl mx-auto px-4 py-4">
          {phase === "playing" ? (
            <button
              onClick={handleCheck}
              disabled={selected === null}
              className={`w-full py-3.5 rounded-xl font-bold transition text-sm ${
                selected !== null
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                  : "bg-slate-100 text-slate-300 cursor-not-allowed"
              }`}
            >
              Verificar
            </button>
          ) : (
            <button
              onClick={handleContinue}
              className={`w-full py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 text-sm ${
                feedbackCorrect
                  ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm"
                  : "bg-red-500 text-white hover:bg-red-600 shadow-sm"
              }`}
            >
              {currentIndex + 1 >= quiz.questions.length ? (
                <>
                  <Trophy size={18} />
                  Ver Resultado
                </>
              ) : (
                <>
                  Continuar
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

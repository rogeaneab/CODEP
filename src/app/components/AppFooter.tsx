import { Link } from "react-router";
import { Code2, Instagram, Youtube, Linkedin, Github } from "lucide-react";

export function AppFooter() {
  return (
    <footer style={{ backgroundColor: "#0F172A" }} className="text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Code2 className="text-white" size={16} />
              </div>
              <span className="font-extrabold text-white">CODEP</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 mb-4 max-w-xs">
              Plataforma educacional de programação para quem está dando os primeiros passos na tecnologia.
            </p>
            <div className="flex gap-2">
              {[
                { icon: <Instagram size={14} />, label: "Instagram" },
                { icon: <Youtube size={14} />, label: "YouTube" },
                { icon: <Linkedin size={14} />, label: "LinkedIn" },
                { icon: <Github size={14} />, label: "GitHub" },
              ].map(s => (
                <a key={s.label} href="#" aria-label={s.label}
                  className="w-8 h-8 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Plataforma */}
          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Plataforma</h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: "Início", to: "/app" },
                { label: "Cursos", to: "/app/courses" },
                { label: "Quizzes", to: "/app/quizzes" },
                { label: "Desafios", to: "/app/challenges" },
                { label: "Certificados", to: "/app/certificates" },
                { label: "Perfil", to: "/app/profile" },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-blue-400 transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Conteúdo */}
          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Conteúdo</h4>
            <ul className="space-y-2 text-xs">
              {["Lógica de Programação", "Desenvolvimento Web", "Estruturas de Dados", "Boas Práticas", "Fluxogramas", "Projetos Práticos"].map(l => (
                <li key={l}>
                  <Link to="/app/courses" className="hover:text-blue-400 transition">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Suporte</h4>
            <ul className="space-y-2 text-xs">
              {["Sobre o CODEP", "Como Funciona", "Perguntas Frequentes", "Política de Privacidade", "Termos de Uso", "Contato"].map(l => (
                <li key={l}>
                  <a href="#" className="hover:text-blue-400 transition">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-600">© 2026 CODEP — Plataforma de Ensino de Programação para Iniciantes</p>
          <p className="text-xs text-slate-700">Projeto TCC · Análise e Desenvolvimento de Sistemas</p>
        </div>
      </div>
    </footer>
  );
}

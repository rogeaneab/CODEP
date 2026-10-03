import { Link } from "react-router";
import { Home, Code2 } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-slate-50">
      <div className="text-center">
        <div className="inline-flex items-center justify-center gap-2 mb-6">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-sm">
            <Code2 className="text-white" size={26} />
          </div>
        </div>
        <h1 className="text-8xl font-extrabold text-slate-200 leading-none mb-4">404</h1>
        <h2 className="text-xl font-extrabold text-slate-900 mb-3">Página não encontrada</h2>
        <p className="text-slate-500 text-sm mb-8 max-w-sm mx-auto">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link
          to="/app"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-sm"
        >
          <Home size={16} />
          Voltar para o Início
        </Link>
      </div>
    </div>
  );
}

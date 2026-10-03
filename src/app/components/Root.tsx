import { Outlet, Link, useLocation, Navigate } from "react-router";
import { BookOpen, Home, User, Code2, LogOut, Zap, Menu, X, Target, Award, Layers } from "lucide-react";
import { useState } from "react";
import { AppFooter } from "./AppFooter";

export function Root() {
  const location = useLocation();
  const user = localStorage.getItem("user");
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "#/login";
  };

  const navItems = [
    { to: "/app", label: "Início", icon: <Home size={17} />, exact: true },
    { to: "/app/courses", label: "Cursos", icon: <BookOpen size={17} /> },
    { to: "/app/trails", label: "Trilhas", icon: <Layers size={17} /> },
    { to: "/app/quizzes", label: "Quizzes", icon: <Zap size={17} /> },
    { to: "/app/challenges", label: "Desafios", icon: <Target size={17} /> },
    { to: "/app/certificates", label: "Certificados", icon: <Award size={17} /> },
    { to: "/app/profile", label: "Perfil", icon: <User size={17} /> },
  ];

  const bottomNavItems = [
    { to: "/app", label: "Início", icon: <Home size={18} />, exact: true },
    { to: "/app/courses", label: "Cursos", icon: <BookOpen size={18} /> },
    { to: "/app/trails", label: "Trilhas", icon: <Layers size={18} /> },
    { to: "/app/quizzes", label: "Quizzes", icon: <Zap size={18} /> },
    { to: "/app/challenges", label: "Desafios", icon: <Target size={18} /> },
    { to: "/app/profile", label: "Perfil", icon: <User size={18} /> },
  ];

  const isLessonPage = location.pathname.includes("/lessons/");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            <Link to="/app" className="flex items-center gap-2 flex-shrink-0">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Code2 className="text-white" size={19} />
              </div>
              <div>
                <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none">
                  CODEP
                </span>
                <p className="text-xs text-slate-400 leading-none hidden sm:block">Aprenda programação</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => {
                const active = item.exact
                  ? location.pathname === item.to
                  : isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      active
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop actions */}
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-sm text-slate-500 font-medium">
                {JSON.parse(localStorage.getItem("user") || "{}").name || "Aluno"}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut size={15} />
                Sair
              </button>
            </div>

            <button
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const active = item.exact
                ? location.pathname === item.to
                : isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                    active ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
            <div className="border-t border-gray-100 pt-2 mt-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 w-full transition"
              >
                <LogOut size={17} />
                Sair
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer — hidden on lesson pages */}
      {!isLessonPage && <AppFooter />}

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
        <div className="flex justify-around items-center h-16">
          {bottomNavItems.map((item) => {
            const active = item.exact
              ? location.pathname === item.to
              : isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition ${
                  active ? "text-blue-600" : "text-slate-400"
                }`}
              >
                {item.icon}
                <span className="text-xs font-semibold">{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-0.5 px-2 py-1 text-slate-400 hover:text-red-500 transition"
          >
            <LogOut size={18} />
            <span className="text-xs font-semibold">Sair</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

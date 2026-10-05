import { useState } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { courses } from "../data/courses";
import { getCourseProgress, isCourseUnlocked, getPreviousCourse } from "../lib/progress";
import { BookOpen, Clock, Search, SlidersHorizontal, Lock } from "lucide-react";

export function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = Array.from(new Set(courses.map(c => c.category)));
  const levels = ["Iniciante", "Intermediário", "Avançado"];

  const filtered = courses.filter(course => {
    const matchSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLevel = selectedLevel === "all" || course.level === selectedLevel;
    const matchCat = selectedCategory === "all" || course.category === selectedCategory;
    return matchSearch && matchLevel && matchCat;
  });

  const getImageUrl = (id: string) => {
    const map: Record<string, string> = {
      "javascript-basics": "https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?w=600&h=360&fit=crop",
      "git-github": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=360&fit=crop",
      "react-fundamentals": "https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?w=600&h=360&fit=crop",
      "python-data-science": "https://images.unsplash.com/photo-1738996747326-65b5d7d7fe9b?w=600&h=360&fit=crop",
      "nodejs-backend": "https://images.unsplash.com/photo-1763128516808-785e80c1dd68?w=600&h=360&fit=crop",
      "css-advanced": "https://images.unsplash.com/photo-1661246627162-feb0269e0c07?w=600&h=360&fit=crop",
      "typescript-mastery": "https://images.unsplash.com/photo-1699885960867-56d5f5262d38?w=600&h=360&fit=crop",
    };
    return map[id] || map["javascript-basics"];
  };

  const levelBadge: Record<string, string> = {
    "Iniciante": "bg-emerald-50 text-emerald-700 border border-emerald-100",
    "Intermediário": "bg-amber-50 text-amber-700 border border-amber-100",
    "Avançado": "bg-red-50 text-red-700 border border-red-100",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1">Todos os Cursos</h1>
        <p className="text-slate-500 text-sm">Explore nossa biblioteca de cursos de programação</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-8">
        <div className="flex items-center gap-2 mb-4 text-slate-700 font-semibold text-sm">
          <SlidersHorizontal size={15} className="text-blue-600" />
          Filtrar cursos
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Buscar cursos..." value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition" />
          </div>
          <select value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-700">
            <option value="all">Todos os Níveis</option>
            {levels.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-700">
            <option value="all">Todas as Categorias</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-5 font-medium">
        <span className="text-slate-900 font-bold">{filtered.length}</span> curso{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(course => {
          const pct = getCourseProgress(course.id);
          const unlocked = isCourseUnlocked(course.id);
          const previousCourse = getPreviousCourse(course.id);
          const card = (
            <div className="relative h-48 overflow-hidden">
              <ImageWithFallback src={getImageUrl(course.id)} alt={course.title}
                className={`w-full h-full object-cover transition-transform duration-300 ${!unlocked ? "grayscale opacity-60" : "group-hover:scale-105"}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${levelBadge[course.level] || "bg-slate-100 text-slate-700"}`}>
                {course.level}
              </div>
              {!unlocked ? (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-900/80 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  <Lock size={11} />Trancado
                </div>
              ) : (
                <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {pct}%
                </div>
              )}
            </div>
          );

          const body = (
            <div className="p-5 flex flex-col flex-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">{course.category}</span>
              <h3 className="font-bold text-slate-900 mb-1.5 text-sm line-clamp-2">{course.title}</h3>
              <p className="text-slate-400 text-xs mb-3 line-clamp-2 flex-1">{course.description}</p>
              {!unlocked ? (
                <p className="text-xs text-slate-400 mb-3 font-medium">
                  {previousCourse ? `Conclua "${previousCourse.title}" pra liberar` : "Ainda não disponível"}
                </p>
              ) : (
                <div className="mb-3">
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full"
                      style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-medium">{pct}% concluído</p>
                </div>
              )}
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium pt-3 border-t border-gray-100">
                <span className="flex items-center gap-1"><BookOpen size={12} />{course.lessons} aulas</span>
                <span className="flex items-center gap-1"><Clock size={12} />{course.duration}</span>
              </div>
            </div>
          );

          if (!unlocked) {
            return (
              <div key={course.id} aria-disabled
                className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col cursor-not-allowed">
                {card}{body}
              </div>
            );
          }

          return (
            <Link key={course.id} to={`/app/courses/${course.id}`}
              className="bg-white rounded-xl hover:shadow-md transition-all border border-gray-200 overflow-hidden group flex flex-col">
              {card}{body}
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="text-slate-300" size={26} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Nenhum curso encontrado</h3>
          <p className="text-slate-500 text-sm">Tente ajustar seus filtros de busca</p>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  BookOpen, Code2, Zap, Trophy, BarChart2,
  CheckCircle, Star, ArrowUp, Menu, X, ChevronRight,
  PlayCircle, Users, Award, Target, Layers, Cpu,
  Instagram, Youtube, Linkedin, Facebook, Mail, Send,
  GraduationCap, Lightbulb, Monitor, Brain, ArrowRight,
  Clock, BarChart,
} from "lucide-react";
import { courses } from "../data/courses";

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
    </svg>
  );
}

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Sobre", href: "#sobre" },
    { label: "Cursos", href: "#cursos" },
    { label: "Recursos", href: "#recursos" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <div className="bg-white" id="inicio">

      {/* ── HEADER ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-sm border-b border-gray-100" : "bg-white/95 border-b border-gray-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Code2 className="text-white" size={20} />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                CODEP
              </span>
            </button>

            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((n) => (
                <a key={n.label} href={n.href}
                  className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition">
                  {n.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link to="/login"
                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition">
                Entrar
              </Link>
              <Link to="/login"
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm">
                Inscrever-se
              </Link>
            </div>

            <button className="md:hidden p-2 text-slate-700" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4">
            {navLinks.map((n) => (
              <a key={n.label} href={n.href} onClick={() => setMenuOpen(false)}
                className="block py-2.5 text-slate-700 font-semibold hover:text-blue-600 border-b border-gray-50 last:border-0">
                {n.label}
              </a>
            ))}
            <div className="flex gap-3 mt-4">
              <Link to="/login" className="flex-1 text-center py-2.5 border border-gray-200 text-slate-700 rounded-lg font-semibold text-sm hover:bg-gray-50 transition">Entrar</Link>
              <Link to="/login" className="flex-1 text-center py-2.5 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition">Inscrever-se</Link>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-slate-50 pt-16">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(to right, #e2e8f0 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.5,
          }} />
        {/* Soft radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Zap size={14} className="text-blue-500" />
              Plataforma educacional para iniciantes
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
              Aprenda Programação de Forma{" "}
              <span className="text-blue-600">Simples e Interativa</span>
            </h1>

            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
              Entenda a lógica de programação com uma das linguagens mais populares do mundo e aprenda a usar o GitHub — a base para criar, analisar e resolver problemas computacionais, mesmo se você vem de marketing digital, UX, design ou áreas correlatas.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/login"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-sm">
                Começar Agora
                <ChevronRight size={18} />
              </Link>
              <button
                onClick={() => document.getElementById("cursos")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 border border-gray-200 bg-white text-slate-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition shadow-sm">
                <PlayCircle size={18} className="text-blue-500" />
                Conhecer os Cursos
              </button>
            </div>

            <div className="flex flex-wrap gap-5">
              {[
                { icon: <Users size={15} />, label: "+500 alunos" },
                { icon: <BookOpen size={15} />, label: "+50 aulas" },
                { icon: <Target size={15} />, label: "+100 exercícios" },
                { icon: <Award size={15} />, label: "Certificado" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                  <span className="text-blue-500">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=520&fit=crop"
                  alt="Código no computador"
                  className="w-full h-72 object-cover"
                />
              </div>
              <div className="absolute -top-3 -right-3 bg-blue-600 text-white px-3 py-1.5 rounded-xl shadow-md text-xs font-bold border-2 border-white">
                &lt;/&gt; Lógica + GitHub
              </div>
              <div className="absolute -bottom-3 -left-3 bg-white text-slate-800 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-sm font-bold border border-gray-100">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                  <GraduationCap className="text-blue-600" size={16} />
                </div>
                Novo aluno inscrito!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "500+", label: "Alunos cadastrados", color: "text-blue-600" },
              { num: "50+", label: "Aulas disponíveis", color: "text-sky-600" },
              { num: "100+", label: "Exercícios práticos", color: "text-blue-600" },
              { num: "95%", label: "Satisfação geral", color: "text-sky-600" },
            ].map((s) => (
              <div key={s.label}>
                <div className={`text-2xl font-extrabold ${s.color}`}>{s.num}</div>
                <div className="text-slate-500 text-xs mt-0.5 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE ── */}
      <section id="sobre" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-blue-100">Por que o CODEP?</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Por que escolher o <span className="text-blue-600">CODEP</span>?
            </h2>
            <p className="text-slate-500 text-base max-w-2xl mx-auto leading-relaxed">
              A plataforma foi criada para ensinar a lógica de programação de forma estruturada, usando linguagens populares e o GitHub como ferramenta de colaboração. Também ajuda quem atua em marketing digital, UX, design ou áreas correlatas a entender como a área de tecnologia funciona e se comunicar melhor com o time de desenvolvimento.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Layers size={22} />, color: "bg-blue-50 text-blue-600", title: "Aprendizado passo a passo", desc: "Conteúdo estruturado para você evoluir no seu ritmo, do básico ao avançado." },
              { icon: <GraduationCap size={22} />, color: "bg-sky-50 text-sky-600", title: "Conteúdo para iniciantes", desc: "Linguagem simples, exemplos práticos e contextualizados para quem está começando." },
              { icon: <Target size={22} />, color: "bg-emerald-50 text-emerald-600", title: "Exercícios práticos", desc: "Pratique o que aprendeu com exercícios e desafios do mundo real." },
              { icon: <Monitor size={22} />, color: "bg-sky-50 text-sky-600", title: "Interface intuitiva", desc: "Design limpo e moderno que facilita o foco total no aprendizado." },
              { icon: <Brain size={22} />, color: "bg-pink-50 text-pink-600", title: "Quizzes interativos", desc: "Teste seus conhecimentos com quizzes dinâmicos." },
              { icon: <BarChart2 size={22} />, color: "bg-orange-50 text-orange-500", title: "Acompanhamento de progresso", desc: "Visualize sua evolução, conquistas e metas de aprendizado." },
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${card.color}`}>
                  {card.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{card.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURSOS ── */}
      <section id="cursos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-sky-50 text-sky-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-sky-100">Cursos disponíveis</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              O Que Você Vai <span className="text-sky-600">Aprender?</span>
            </h2>
            <p className="text-slate-500 text-base max-w-2xl mx-auto leading-relaxed">
              Trilhas completas do básico ao avançado, com projetos práticos e certificado.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course) => {
              const imageMap: Record<string, string> = {
                "javascript-basics": "https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?w=600&h=360&fit=crop",
                "git-github": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=360&fit=crop",
                "react-fundamentals": "https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?w=600&h=360&fit=crop",
                "python-data-science": "https://images.unsplash.com/photo-1738996747326-65b5d7d7fe9b?w=600&h=360&fit=crop",
                "nodejs-backend": "https://images.unsplash.com/photo-1763128516808-785e80c1dd68?w=600&h=360&fit=crop",
                "css-advanced": "https://images.unsplash.com/photo-1661246627162-feb0269e0c07?w=600&h=360&fit=crop",
                "typescript-mastery": "https://images.unsplash.com/photo-1699885960867-56d5f5262d38?w=600&h=360&fit=crop",
              };
              const levelColor: Record<string, string> = {
                "Iniciante": "bg-emerald-50 text-emerald-700 border-emerald-200",
                "Intermediário": "bg-amber-50 text-amber-700 border-amber-200",
                "Avançado": "bg-red-50 text-red-700 border-red-200",
              };
              return (
                <Link key={course.id} to="/login"
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all group">
                  <div className="relative h-40 overflow-hidden">
                    <ImageWithFallback
                      src={imageMap[course.id]}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full border ${levelColor[course.level] || "bg-slate-100 text-slate-700"}`}>
                      {course.level}
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{course.category}</span>
                    <h3 className="font-bold text-slate-900 mt-1 mb-1.5 text-sm">{course.title}</h3>
                    <p className="text-slate-400 text-xs mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                      <span className="flex items-center gap-1"><BookOpen size={12} />{course.lessons} aulas</span>
                      <span className="flex items-center gap-1"><Clock size={12} />{course.duration}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link to="/login"
              className="inline-flex items-center gap-2 border border-gray-200 bg-white text-slate-700 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 transition shadow-sm text-sm">
              Ver todos os cursos
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── RECURSOS ── */}
      <section id="recursos" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-blue-100">Recursos</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Recursos <span className="text-blue-600">Interativos</span>
            </h2>
            <p className="text-slate-500 text-base max-w-2xl mx-auto leading-relaxed">
              Tudo que você precisa para aprender de forma eficiente em um só lugar.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { emoji: "📚", title: "Aulas Interativas", desc: "Conteúdo com exercícios práticos de código em tempo real.", color: "border-blue-100 hover:border-blue-200" },
              { emoji: "📝", title: "Exercícios", desc: "Pratique com centenas de exercícios comentados.", color: "border-emerald-100 hover:border-emerald-200" },
              { emoji: "🎯", title: "Quizzes", desc: "Teste seus conhecimentos com quizzes gamificados.", color: "border-sky-100 hover:border-sky-200" },
              { emoji: "🏆", title: "Desafios", desc: "Desafios semanais para testar suas habilidades.", color: "border-amber-100 hover:border-amber-200" },
              { emoji: "📊", title: "Progresso", desc: "Dashboard com métricas da sua evolução.", color: "border-sky-100 hover:border-sky-200" },
              { emoji: "📜", title: "Certificados", desc: "Certificados digitais ao concluir cada trilha.", color: "border-pink-100 hover:border-pink-200" },
            ].map((r) => (
              <div key={r.title}
                className={`bg-white border ${r.color} rounded-xl p-6 hover:shadow-md transition-all duration-200`}>
                <div className="text-3xl mb-3">{r.emoji}</div>
                <h3 className="text-slate-900 font-bold mb-1.5">{r.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRILHA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-blue-100">Trilha</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Trilha de <span className="text-blue-600">Aprendizagem</span>
            </h2>
            <p className="text-slate-500 text-base">Um caminho estruturado do zero ao certificado.</p>
          </div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 transform md:-translate-x-px" />
            <div className="space-y-8">
              {[
                { num: "01", title: "Introdução à Programação", desc: "Entenda o que é programação, como computadores pensam e por onde começar.", color: "bg-blue-600", icon: <Lightbulb size={13} /> },
                { num: "02", title: "Lógica de Programação", desc: "Aprenda variáveis, condições, laços e a base do pensamento algorítmico.", color: "bg-sky-500", icon: <Brain size={13} /> },
                { num: "03", title: "Algoritmos e Fluxogramas", desc: "Resolva problemas de forma estruturada, criando algoritmos e fluxogramas.", color: "bg-blue-500", icon: <Cpu size={13} /> },
                { num: "04", title: "Desenvolvimento Web", desc: "Crie páginas web com HTML, CSS e JavaScript do zero.", color: "bg-blue-600", icon: <Monitor size={13} /> },
                { num: "05", title: "Projetos Práticos", desc: "Aplique tudo em projetos reais para montar seu portfólio.", color: "bg-sky-500", icon: <Code2 size={13} /> },
                { num: "06", title: "Certificação", desc: "Conclua a trilha e receba seu certificado de conclusão.", color: "bg-blue-600", icon: <Award size={13} /> },
              ].map((step, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={step.num} className={`relative flex items-start ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className={`flex-1 ml-20 md:ml-0 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                      <div className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition duration-200">
                        <div className={`inline-flex items-center gap-1.5 text-white text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${step.color}`}>
                          {step.icon} Etapa {step.num}
                        </div>
                        <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                        <p className="text-slate-500 text-sm">{step.desc}</p>
                      </div>
                    </div>
                    <div className={`absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full ${step.color} flex items-center justify-center text-white text-xs font-extrabold shadow border-4 border-white z-10`}>
                      {step.num}
                    </div>
                    <div className="hidden md:block flex-1" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="text-center mt-12">
            <Link to="/login"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-sm text-sm">
              Começar pela trilha
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-amber-50 text-amber-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-amber-100">Depoimentos</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              O que nossos <span className="text-blue-600">alunos dizem</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { avatar: "👩‍💻", name: "Mariana Costa", role: "Estudante de ADS",
                text: "Eu nunca tinha programado antes. O CODEP me ajudou a entender lógica de programação de forma simples e divertida. Hoje consigo criar pequenos projetos!" },
              { avatar: "👨‍🎓", name: "Lucas Ferreira", role: "Ensino médio",
                text: "Os quizzes e exercícios tornaram o aprendizado muito mais fácil e dinâmico. A explicação passo a passo é incrível para quem está começando do zero." },
              { avatar: "👩‍🏫", name: "Juliana Alves", role: "Professora & aluna",
                text: "Recomendo para todos os meus alunos! A plataforma é intuitiva, o conteúdo é bem estruturado e os desafios mantêm a motivação em alta." },
              { avatar: "🧑‍💻", name: "Carlos Eduardo", role: "Desenvolvedor júnior",
                text: "Comecei pelo CODEP sem saber nada de programação. Em três meses consegui minha primeira oportunidade de estágio. A trilha é fantástica!" },
              { avatar: "👩‍🔬", name: "Fernanda Lima", role: "Estudante de TI",
                text: "A forma como os conceitos de lógica são apresentados é muito visual e didática. Os fluxogramas e exercícios práticos fizeram toda a diferença." },
              { avatar: "🧑‍🎓", name: "Rafael Souza", role: "Recém-formado",
                text: "O certificado do CODEP agregou muito ao meu currículo. A plataforma é moderna, bonita e o conteúdo é de altíssima qualidade." },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
                <Stars />
                <p className="text-slate-600 mt-4 mb-5 leading-relaxed text-sm">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-xl">{t.avatar}</div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESTATÍSTICAS ── */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "500+", label: "Alunos cadastrados" },
              { num: "50+", label: "Aulas disponíveis" },
              { num: "100+", label: "Exercícios práticos" },
              { num: "95%", label: "Satisfação geral" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-4xl md:text-5xl font-extrabold text-white mb-1">{s.num}</div>
                <div className="text-blue-100 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-10 md:p-14">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="text-blue-600" size={28} />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Pronto para começar sua jornada na programação?
            </h2>
            <p className="text-slate-500 text-base mb-8 max-w-xl mx-auto leading-relaxed">
              Junte-se a centenas de estudantes que estão aprendendo programação de forma simples, prática e interativa.
            </p>
            <Link to="/login"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-lg font-bold text-base hover:bg-blue-700 transition shadow-sm">
              Criar Conta Gratuitamente
              <ArrowRight size={18} />
            </Link>
            <p className="text-slate-400 text-xs mt-4">Gratuito · Sem cartão de crédito</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contato" style={{ backgroundColor: "#0F172A" }} className="text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                  <Code2 className="text-white" size={18} />
                </div>
                <span className="font-extrabold text-xl text-white">CODEP</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
                Plataforma educacional de programação criada especialmente para quem está dando os primeiros passos na tecnologia.
              </p>
              <div className="flex gap-2.5">
                {[
                  { icon: <Instagram size={16} />, label: "Instagram" },
                  { icon: <Youtube size={16} />, label: "YouTube" },
                  { icon: <Linkedin size={16} />, label: "LinkedIn" },
                  { icon: <Facebook size={16} />, label: "Facebook" },
                  { icon: <TikTokIcon />, label: "TikTok" },
                ].map((s) => (
                  <a key={s.label} href="#" aria-label={s.label}
                    className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-wider">Institucional</h4>
              <ul className="space-y-2 text-sm">
                {["Sobre Nós", "Nossa Missão", "Equipe", "Política de Privacidade", "Termos de Uso", "Contato"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-blue-400 transition">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-wider">Plataforma</h4>
              <ul className="space-y-2 text-sm">
                {["Como Funciona", "Cursos", "Trilhas", "Certificados", "FAQ", "Suporte"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-blue-400 transition">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-wider">Conteúdos</h4>
              <ul className="space-y-2 text-sm mb-6">
                {["Blog", "Artigos", "Tutoriais", "Projetos", "Recursos Gratuitos"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-blue-400 transition">{l}</a></li>
                ))}
              </ul>
              <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Novidades</h4>
              <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                Receba dicas e novos cursos no seu e-mail.
              </p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full pl-8 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg transition flex items-center">
                  <Send size={13} />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p className="text-gray-500 text-sm mb-1">© 2026 CODEP — Plataforma de Ensino de Programação para Iniciantes</p>
            <p className="text-gray-600 text-xs">Projeto desenvolvido como Trabalho de Conclusão de Curso (TCC) do curso de Análise e Desenvolvimento de Sistemas.</p>
          </div>
        </div>
      </footer>

      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg flex items-center justify-center transition"
          aria-label="Voltar ao topo">
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}

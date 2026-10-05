// Progresso real do aluno, persistido no navegador (localStorage).
// Substitui os campos estáticos `lesson.completed` / `course.progress`
// de data/courses.ts, que são só uma semente inicial fictícia.

import { getLessonsByCourseId, getLessonById, courses } from "../data/courses";

const STORAGE_KEY = "codep_progress_v1";
const ACTIVITY_KEY = "codep_activity_v1";
const POINTS_PER_LESSON = 10;
const MAX_ACTIVITY_ENTRIES = 30;

interface ProgressState {
  completedLessonIds: string[];
  completedChallengeIds: string[];
  points: number;
}

function readState(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completedLessonIds: [], completedChallengeIds: [], points: 0 };
    const parsed = JSON.parse(raw);
    return {
      completedLessonIds: Array.isArray(parsed.completedLessonIds) ? parsed.completedLessonIds : [],
      completedChallengeIds: Array.isArray(parsed.completedChallengeIds) ? parsed.completedChallengeIds : [],
      points: typeof parsed.points === "number" ? parsed.points : 0,
    };
  } catch {
    return { completedLessonIds: [], completedChallengeIds: [], points: 0 };
  }
}

function writeState(state: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage indisponível (modo privado, etc.) — segue sem persistir
  }
}

export function isLessonComplete(lessonId: string): boolean {
  return readState().completedLessonIds.includes(lessonId);
}

/** Marca a aula/exercício como concluído e soma pontos (só na primeira vez). */
export function markLessonComplete(lessonId: string): { alreadyDone: boolean; points: number } {
  const state = readState();
  if (state.completedLessonIds.includes(lessonId)) {
    return { alreadyDone: true, points: state.points };
  }
  state.completedLessonIds.push(lessonId);
  state.points += POINTS_PER_LESSON;
  writeState(state);
  const lesson = getLessonById(lessonId);
  if (lesson) {
    logActivity("lesson", `Completou "${lesson.title}"`);
  }
  return { alreadyDone: false, points: state.points };
}

export function isChallengeComplete(challengeId: string): boolean {
  return readState().completedChallengeIds.includes(challengeId);
}

/** Marca o desafio como resolvido e soma o XP dele (só na primeira vez) —
 * usa o mesmo XP/nível/atividade recente da Home, em vez de um contador
 * isolado só na tela de Desafios. */
export function markChallengeComplete(challengeId: string, title: string, xp: number): { alreadyDone: boolean; points: number } {
  const state = readState();
  if (state.completedChallengeIds.includes(challengeId)) {
    return { alreadyDone: true, points: state.points };
  }
  state.completedChallengeIds.push(challengeId);
  state.points += xp;
  writeState(state);
  logActivity("challenge", `Desafio "${title}" resolvido`);
  return { alreadyDone: false, points: state.points };
}

export function getTotalPoints(): number {
  return readState().points;
}

/** Soma XP direto (ex.: resposta certa em quiz), sem depender de uma aula. */
export function addXp(amount: number): number {
  const state = readState();
  state.points += amount;
  writeState(state);
  return state.points;
}

// Sistema de nível: cada nível exige um pouco mais de XP que o anterior,
// pra dar sensação de progresso sem ficar fácil demais nem impossível.
const XP_PER_LEVEL = 50;

export interface LevelInfo {
  level: number;
  xpInLevel: number;
  xpToNextLevel: number;
  pct: number;
}

/** Calcula nível + progresso dentro do nível a partir do XP total. */
export function getLevelInfo(xp: number): LevelInfo {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const xpInLevel = xp % XP_PER_LEVEL;
  const pct = Math.round((xpInLevel / XP_PER_LEVEL) * 100);
  return { level, xpInLevel, xpToNextLevel: XP_PER_LEVEL, pct };
}

export function getCurrentLevelInfo(): LevelInfo {
  return getLevelInfo(getTotalPoints());
}

export function getCompletedCount(lessonIds: string[]): number {
  const state = readState();
  return lessonIds.filter(id => state.completedLessonIds.includes(id)).length;
}

/** Progresso (0-100) de um curso, com base nas aulas realmente concluídas. */
export function getCourseProgress(courseId: string): number {
  const all = getLessonsByCourseId(courseId);
  if (all.length === 0) return 0;
  const done = getCompletedCount(all.map(l => l.id));
  return Math.round((done / all.length) * 100);
}

export const POINTS_PER_LESSON_VALUE = POINTS_PER_LESSON;

// A posição de um curso em data/courses.ts é a trilha de evolução: do
// básico ao avançado. Entre os cursos ativos (sem comingSoon), um curso só
// libera quando o anterior está 100% concluído — o primeiro da trilha
// ativa está sempre liberado. Curso com comingSoon:true fica travado como
// "Em breve", fora dessa progressão (não libera por progresso nenhum).
function activeCourseOrder(): string[] {
  return courses.filter(c => !c.comingSoon).map(c => c.id);
}

export function isCourseUnlocked(courseId: string): boolean {
  const course = courses.find(c => c.id === courseId);
  if (!course) return false;
  if (course.comingSoon) return false;
  const order = activeCourseOrder();
  const idx = order.indexOf(courseId);
  if (idx <= 0) return true;
  const previousCourseId = order[idx - 1];
  return getCourseProgress(previousCourseId) === 100;
}

/** Curso anterior na trilha ativa (para mensagens de "conclua X pra liberar"). */
export function getPreviousCourse(courseId: string) {
  const order = activeCourseOrder();
  const idx = order.indexOf(courseId);
  if (idx <= 0) return undefined;
  return courses.find(c => c.id === order[idx - 1]);
}

// ── Atividade recente ───────────────────────────────────────────────────
// Histórico real do que o aluno fez (aula concluída, quiz finalizado),
// pra exibir na Home em vez de dados fictícios. Guardado separado do
// progresso pra não misturar "o que foi feito" com "o que está feito".

export interface ActivityEntry {
  id: string;
  type: "lesson" | "quiz" | "challenge";
  text: string;
  timestamp: number;
}

function readActivity(): ActivityEntry[] {
  try {
    const raw = localStorage.getItem(ACTIVITY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeActivity(entries: ActivityEntry[]) {
  try {
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(entries));
  } catch {
    // localStorage indisponível — segue sem persistir
  }
}

/** Registra um evento real (aula concluída, quiz finalizado) no topo do
 * histórico, mantendo só os mais recentes. */
export function logActivity(type: ActivityEntry["type"], text: string): void {
  const entries = readActivity();
  entries.unshift({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, type, text, timestamp: Date.now() });
  writeActivity(entries.slice(0, MAX_ACTIVITY_ENTRIES));
}

/** Últimas N atividades reais do aluno, mais recente primeiro. */
export function getRecentActivity(limit = 4): ActivityEntry[] {
  return readActivity().slice(0, limit);
}

/** Formata um timestamp como "Hoje", "Ontem", "X dias atrás" etc. */
export function formatRelativeTime(timestamp: number): string {
  const diffMs = Date.now() - timestamp;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "Hoje";
  if (diffDays === 1) return "Ontem";
  if (diffDays < 7) return `${diffDays} dias atrás`;
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks === 1) return "1 semana atrás";
  if (diffDays < 30) return `${diffWeeks} semanas atrás`;
  return new Date(timestamp).toLocaleDateString("pt-BR");
}

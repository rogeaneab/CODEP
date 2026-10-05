// Progresso real do aluno, persistido no navegador (localStorage).
// Substitui os campos estáticos `lesson.completed` / `course.progress`
// de data/courses.ts, que são só uma semente inicial fictícia.

import { getLessonsByCourseId, courses } from "../data/courses";

const STORAGE_KEY = "codep_progress_v1";
const POINTS_PER_LESSON = 10;

interface ProgressState {
  completedLessonIds: string[];
  points: number;
}

function readState(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completedLessonIds: [], points: 0 };
    const parsed = JSON.parse(raw);
    return {
      completedLessonIds: Array.isArray(parsed.completedLessonIds) ? parsed.completedLessonIds : [],
      points: typeof parsed.points === "number" ? parsed.points : 0,
    };
  } catch {
    return { completedLessonIds: [], points: 0 };
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
// básico ao avançado. Um curso só libera quando o anterior está 100%
// concluído — o primeiro da lista está sempre liberado.
export function isCourseUnlocked(courseId: string): boolean {
  const order = courses.map(c => c.id);
  const idx = order.indexOf(courseId);
  if (idx <= 0) return true;
  const previousCourseId = order[idx - 1];
  return getCourseProgress(previousCourseId) === 100;
}

/** Curso anterior na trilha (para mensagens de "conclua X pra liberar"). */
export function getPreviousCourse(courseId: string) {
  const order = courses.map(c => c.id);
  const idx = order.indexOf(courseId);
  if (idx <= 0) return undefined;
  return courses.find(c => c.id === order[idx - 1]);
}

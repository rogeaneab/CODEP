// Dados reais da conta (digitados no cadastro), não mais fictícios.
// Sem backend, a "conta" ainda vive em localStorage — mas agora guarda o
// nome que a pessoa realmente digitou e a data real em que ela entrou.

export interface StoredUser {
  email?: string;
  name?: string;
  /** ISO timestamp de quando a conta foi criada nesse navegador. */
  memberSince?: string;
}

export function getStoredUser(): StoredUser {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
}

/** Deixa cada palavra do nome com a primeira letra maiúscula, pra quem
 * digitou tudo minúsculo ou tudo maiúsculo no cadastro. */
export function capitalizeName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

/** Iniciais a partir do nome completo (primeira + última palavra). */
export function getInitials(name: string): string {
  const parts = capitalizeName(name).split(" ").filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Formata a data real de cadastro como "Outubro 2026". */
export function formatMemberSince(iso?: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (isNaN(date.getTime())) return "";
  const formatted = date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

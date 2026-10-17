/**
 * Lecture synchronisée, logique pure : les repères de mots de Polly
 * (`[tempsMs, débutCaractère, finCaractère]`) découpent le texte en
 * segments ; le mot actif est le dernier repère déjà atteint.
 */

export type WordMark = readonly [timeMs: number, start: number, end: number];

export type Segment =
  | { readonly kind: 'text'; readonly text: string }
  | { readonly kind: 'word'; readonly text: string; readonly index: number };

export function segment(text: string, marks: readonly WordMark[]): Segment[] {
  const out: Segment[] = [];
  let cursor = 0;
  marks.forEach(([, start, end], index) => {
    if (start > cursor) out.push({ kind: 'text', text: text.slice(cursor, start) });
    out.push({ kind: 'word', text: text.slice(start, end), index });
    cursor = end;
  });
  if (cursor < text.length) out.push({ kind: 'text', text: text.slice(cursor) });
  return out;
}

/** Index du mot prononcé à `timeMs` ; -1 avant le premier mot. */
export function activeWordAt(marks: readonly WordMark[], timeMs: number): number {
  let low = 0;
  let high = marks.length - 1;
  let found = -1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    const mark = marks[mid];
    if (mark !== undefined && mark[0] <= timeMs) {
      found = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return found;
}

/** Durée parlée approximative : dernier repère + une syllabe. */
export function spokenDurationMs(marks: readonly WordMark[]): number {
  const last = marks.at(-1);
  return last === undefined ? 0 : last[0] + 450;
}

export function formatClock(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

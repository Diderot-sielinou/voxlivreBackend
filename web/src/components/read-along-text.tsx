import { segment, type WordMark } from '@/lib/read-along';

/**
 * Texte en Atkinson Hyperlegible, mot actif en ambre (texte #1A1205), mots
 * déjà lus en couleur pleine, la suite en couleur secondaire — comme le
 * lecteur de l'app. `aria-hidden` : le texte lisible est fourni à part.
 */
export function ReadAlongText({
  text,
  marks,
  active,
  className = '',
}: {
  text: string;
  marks: readonly WordMark[];
  active: number;
  className?: string;
}) {
  return (
    <p aria-hidden className={`font-reading text-ink-2 ${className}`}>
      {segment(text, marks).map((part, i) =>
        part.kind === 'text' ? (
          <span key={i}>{part.text}</span>
        ) : (
          <span
            key={i}
            className="word"
            data-active={part.index === active}
            data-read={active >= 0 && part.index < active}
          >
            {part.text}
          </span>
        ),
      )}
    </p>
  );
}

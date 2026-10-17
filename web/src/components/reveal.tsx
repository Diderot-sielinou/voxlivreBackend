import type { ReactNode } from 'react';

/**
 * Apparition au défilement, en CSS seulement (`animation-timeline: view()`,
 * classe `.reveal` de globals.css). Le contenu est visible par défaut : sur
 * un navigateur sans cette fonction, sans JavaScript ou en mouvement réduit,
 * rien n'est caché — essentiel sur un réseau lent.
 */
export function Reveal({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
}) {
  return <Tag className={`reveal ${className}`}>{children}</Tag>;
}

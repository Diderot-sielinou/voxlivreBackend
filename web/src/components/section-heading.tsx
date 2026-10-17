import type { ReactNode } from 'react';

/** Titre de section : surtitre ambre, titre, chapeau. */
export function SectionHeading({
  eyebrow,
  title,
  children,
  id,
  align = 'center',
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id: string;
  align?: 'center' | 'left';
}) {
  const centered = align === 'center';
  return (
    <div className={`max-w-2xl space-y-4 ${centered ? 'mx-auto text-center' : ''}`}>
      <p className="text-sm font-semibold tracking-[0.14em] text-accent uppercase">{eyebrow}</p>
      <h2 id={id} className="text-[clamp(1.9rem,4.4vw,2.9rem)] leading-[1.1] font-bold text-ink">
        {title}
      </h2>
      {children ? <p className="text-lg leading-relaxed text-ink-2">{children}</p> : null}
    </div>
  );
}

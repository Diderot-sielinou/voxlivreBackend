import { useId } from 'react';

/**
 * Logo Voxlivre : une onde sonore posée sur un livre ouvert. Transposition
 * exacte de `VoxLogoPainter` de l'app (même géométrie, viewBox 100).
 */
export function Logo({ className, title }: { className?: string; title?: string }) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={id} x1="0" x2="100" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7C3AED" />
          <stop offset=".5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${id})`} strokeWidth="4.5" strokeLinecap="round">
        <path d="M50 80Q32 68 10 74" />
        <path d="M50 80Q68 68 90 74" />
      </g>
      <rect x="25" y="50" width="5" height="16" rx="2.5" fill="#7C3AED" />
      <rect x="32.5" y="38" width="5" height="28" rx="2.5" fill="#F59E0B" />
      <rect x="40" y="26" width="5" height="40" rx="2.5" fill="#F97316" />
      <rect x="47.5" y="14" width="5" height="52" rx="2.5" fill="currentColor" />
      <rect x="55" y="26" width="5" height="40" rx="2.5" fill="#F97316" />
      <rect x="62.5" y="38" width="5" height="28" rx="2.5" fill="#F59E0B" />
      <rect x="70" y="50" width="5" height="16" rx="2.5" fill="#7C3AED" />
      <circle cx="50" cy="7" r="2.5" fill="#F59E0B" />
    </svg>
  );
}

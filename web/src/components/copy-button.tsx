'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

/** Copie une valeur (empreinte SHA-256) ; confirmation annoncée aux lecteurs d'écran. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard?.writeText(value).then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2_000);
        });
      }}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium text-ink-2 transition-colors hover:bg-elevated hover:text-ink"
    >
      {copied ? (
        <Check aria-hidden className="size-4 text-success" strokeWidth={2} />
      ) : (
        <Copy aria-hidden className="size-4" strokeWidth={1.75} />
      )}
      <span aria-live="polite">{copied ? 'Copiée' : label}</span>
    </button>
  );
}

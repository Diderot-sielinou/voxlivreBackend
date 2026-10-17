import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Page introuvable' };

export default function NotFound() {
  return (
    <section className="bg-grid mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-5 py-24 text-center">
      <p className="font-reading text-lg text-ink-2">
        Cette page{' '}
        <span className="word" data-active="true">
          n’existe
        </span>{' '}
        pas, ou elle a été déplacée.
      </p>
      <h1 className="mt-4 text-[clamp(2.2rem,6vw,3.6rem)] font-bold text-ink">Page introuvable</h1>
      <Link
        href="/"
        className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-on-primary"
      >
        <ArrowLeft aria-hidden className="size-4" strokeWidth={2} />
        Retour à l’accueil
      </Link>
    </section>
  );
}

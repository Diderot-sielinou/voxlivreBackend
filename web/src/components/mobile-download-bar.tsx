'use client';

import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';

import { APK, formatMegabytes, PRIMARY_APK } from '@/content/apk';

import { Logo } from './logo';

/**
 * Barre collante en bas d'écran (mobile) : visible quand ni le bouton du
 * hero ni la section d'installation ne sont à l'écran. Zone sûre respectée.
 */
export function MobileDownloadBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const targets = ['hero-cta', 'installer-zone']
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setShow(visible.size === 0 && window.scrollY > 200);
    });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`glass fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-3 rounded-[24px] p-2 pl-3 shadow-[var(--shadow-vx)] transition-[transform,opacity] duration-300 ease-(--ease-vx) lg:hidden ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-24 opacity-0'
      }`}
    >
      <Logo className="size-9 shrink-0 text-ink" />
      <div className="min-w-0 flex-1 leading-tight">
        <p className="truncate text-sm font-semibold text-ink">Voxlivre pour Android</p>
        <p className="tabular text-xs text-ink-2">
          v{APK.version} · {formatMegabytes(PRIMARY_APK.bytes)}
        </p>
      </div>
      <a
        href={PRIMARY_APK.path}
        download
        tabIndex={show ? 0 : -1}
        className="bg-braise inline-flex min-h-12 items-center gap-2 rounded-[18px] px-4 text-sm font-semibold text-[#1a1205]"
      >
        <Download aria-hidden className="size-4" strokeWidth={2} />
        Télécharger
      </a>
    </div>
  );
}

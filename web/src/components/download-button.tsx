import { Download } from 'lucide-react';

import { APK, formatMegabytes, PRIMARY_APK } from '@/content/apk';

/**
 * Appel à l'action principal (dégradé Braise, texte #1A1205 = AA). `download`
 * garde le nom de fichier versionné sur le téléphone.
 */
export function DownloadButton({
  size = 'lg',
  className = '',
}: {
  size?: 'md' | 'lg';
  className?: string;
}) {
  const big = size === 'lg';
  return (
    <a
      href={PRIMARY_APK.path}
      download
      className={`bg-braise group inline-flex items-center justify-center gap-3 rounded-full font-semibold text-[#1a1205] shadow-[0_10px_30px_-10px_rgb(245_158_11/0.7)] transition-[transform,box-shadow] duration-200 ease-(--ease-vx) hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgb(249_115_22/0.8)] active:translate-y-0 ${
        big ? 'min-h-14 px-7 text-base' : 'min-h-12 px-5 text-sm'
      } ${className}`}
    >
      <Download
        aria-hidden
        strokeWidth={2}
        className={`${big ? 'size-5' : 'size-4'} transition-transform duration-200 group-hover:translate-y-0.5`}
      />
      <span className="flex flex-col items-start leading-tight">
        <span>Télécharger l’APK</span>
        <span className="tabular text-xs font-medium opacity-75">
          Android · v{APK.version} · {formatMegabytes(PRIMARY_APK.bytes)}
        </span>
      </span>
    </a>
  );
}

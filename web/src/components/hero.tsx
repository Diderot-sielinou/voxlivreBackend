import { Gift, Headphones, ShieldCheck, WifiOff } from 'lucide-react';

import { APK } from '@/content/apk';
import { formatNumber, WELCOME_VALUE_XAF } from '@/content/site';

import { DownloadButton } from './download-button';
import { PhonePlayer } from './phone-player';

export function Hero() {
  return (
    <section id="accueil" className="bg-grid relative isolate overflow-hidden">
      {/* Halo « Aube » derrière la maquette : le seul dégradé fort de l'écran. */}
      <div
        aria-hidden
        className="bg-aube absolute top-1/2 right-[-20%] -z-10 size-[44rem] -translate-y-1/2 rounded-full opacity-30 blur-[120px] lg:right-[-6%]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-bg to-transparent"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pt-14 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20 lg:pb-28">
        <div className="hero-in space-y-7 text-center lg:text-left">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-1.5 text-sm text-ink-2 lg:mx-0">
            <span className="size-2 rounded-full bg-success" aria-hidden />
            Essai ouvert · Android {APK.minAndroid} et plus
          </p>

          <h1 className="text-[clamp(2.6rem,7vw,4.6rem)] leading-[1.02] font-bold text-ink">
            Lisez. Écoutez.
            <br />
            <span className="text-aube">Vivez le livre.</span>
          </h1>

          <p className="mx-auto max-w-xl text-lg leading-relaxed text-ink-2 lg:mx-0">
            Voxlivre transforme vos PDF en livres audio. Pendant l’écoute, chaque mot s’illumine au
            moment où il est prononcé : vous ne perdez jamais le fil, même dans le taxi.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <DownloadButton />
            <a
              href="#voix"
              className="inline-flex min-h-14 items-center gap-2 rounded-full border border-line px-6 font-semibold text-ink transition-colors hover:bg-elevated"
            >
              <Headphones aria-hidden className="size-5" strokeWidth={1.75} />
              Écouter les voix
            </a>
          </div>

          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-ink-2 lg:justify-start">
            <li className="flex items-center gap-2">
              <Gift aria-hidden className="size-4 text-accent" strokeWidth={1.75} />
              {formatNumber(WELCOME_VALUE_XAF)} FCFA d’unités offerts
            </li>
            <li className="flex items-center gap-2">
              <WifiOff aria-hidden className="size-4 text-accent" strokeWidth={1.75} />
              Écoute hors connexion
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck aria-hidden className="size-4 text-accent" strokeWidth={1.75} />
              Sans publicité ni traceur
            </li>
          </ul>
        </div>

        <div className="hero-in-late relative">
          <PhonePlayer />
        </div>
      </div>
    </section>
  );
}

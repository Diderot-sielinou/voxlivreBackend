import {
  CheckCircle2,
  Download,
  FolderOpen,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  type LucideIcon,
} from 'lucide-react';
import Image from 'next/image';

import { APK, formatMegabytes, PRIMARY_APK } from '@/content/apk';

import { CopyButton } from './copy-button';
import { DownloadButton } from './download-button';
import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

const STEPS: readonly {
  icon: LucideIcon;
  title: string;
  text: string;
  warning?: boolean;
}[] = [
  {
    icon: Download,
    title: 'Téléchargez le fichier',
    text: 'Appuyez sur « Télécharger l’APK ». Si Chrome demande confirmation, choisissez « Télécharger quand même ».',
  },
  {
    icon: FolderOpen,
    title: 'Ouvrez-le',
    text: 'Depuis la notification de fin de téléchargement, ou dans l’app Fichiers, dossier « Téléchargements ».',
  },
  {
    icon: ShieldAlert,
    title: 'Autorisez l’installation',
    text: 'Android affiche « Sources inconnues » : touchez « Paramètres », activez « Autoriser cette source », puis revenez.',
  },
  {
    icon: ShieldQuestion,
    title: 'Passez l’avertissement de Play Protect',
    text: 'Google affiche « Application bloquée pour protéger votre appareil » : Voxlivre est nouveau, Google ne le connaît pas encore. Ne touchez pas « Compris », qui annule. Touchez « Plus de détails », puis le texte « Installer quand même ».',
    warning: true,
  },
  {
    icon: CheckCircle2,
    title: 'Installez et connectez-vous',
    text: 'Touchez « Installer », puis « Ouvrir ». Choisissez « Continuer avec Google » : vos unités offertes vous attendent.',
  },
];

export function InstallGuide() {
  const published = new Date(`${APK.publishedAt}T12:00:00Z`).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    <section aria-labelledby="installer" className="border-y border-line bg-surface/50">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHeading
          id="installer"
          eyebrow="Installation"
          title="Installé en moins de deux minutes"
        >
          Voxlivre n’est pas encore sur le Play Store : vous l’installez directement, comme le font
          déjà nos testeurs.
        </SectionHeading>

        <div id="installer-zone" className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <ol className="space-y-4">
            {STEPS.map((step, i) => (
              <Reveal as="li" key={step.title}>
                <div
                  className={`flex gap-5 rounded-[var(--radius-card)] border bg-bg p-5 ${
                    step.warning ? 'border-warning/60' : 'border-line'
                  }`}
                >
                  <span className="tabular grid size-10 shrink-0 place-items-center rounded-full bg-primary font-bold text-on-primary">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="flex items-center gap-2 font-semibold text-ink">
                      <step.icon
                        aria-hidden
                        className="size-5 shrink-0 text-accent"
                        strokeWidth={1.75}
                      />
                      {step.title}
                    </h3>
                    <p className="mt-1.5 leading-relaxed text-ink-2">{step.text}</p>
                    {step.warning ? <PlayProtectPath /> : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal>
            <aside
              aria-label="Fichier à télécharger"
              className="space-y-6 rounded-[var(--radius-sheet)] border border-line bg-bg p-7"
            >
              <div>
                <p className="text-sm text-ink-2">Version actuelle</p>
                <p className="tabular mt-1 text-3xl font-bold text-ink">v{APK.version}</p>
              </div>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-ink-2">Taille</dt>
                  <dd className="tabular font-semibold text-ink">
                    {formatMegabytes(PRIMARY_APK.bytes)}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-2">Android</dt>
                  <dd className="font-semibold text-ink">{APK.minAndroid} et plus</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-ink-2">Publiée le</dt>
                  <dd className="font-semibold text-ink">{published}</dd>
                </div>
              </dl>
              <DownloadButton className="w-full" />
              <p className="text-xs text-ink-2">Le fichier est lourd : un Wi-Fi est conseillé.</p>

              <div className="space-y-3 border-t border-line pt-6">
                <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <ShieldCheck aria-hidden className="size-4 text-success" strokeWidth={1.75} />
                  Empreinte SHA-256
                </p>
                <p className="rounded-[var(--radius-chip)] bg-elevated p-3 font-mono text-xs leading-relaxed break-all text-ink-2">
                  {PRIMARY_APK.sha256}
                </p>
                <CopyButton value={PRIMARY_APK.sha256} label="Copier l’empreinte" />
              </div>

              <div className="hidden items-center gap-4 border-t border-line pt-6 lg:flex">
                <Image
                  src="/qr-installer.svg"
                  alt="QR code vers cette page d’installation"
                  width={96}
                  height={96}
                  className="rounded-lg bg-white p-2"
                />
                <p className="text-sm text-ink-2">
                  Sur ordinateur ? Scannez ce code avec votre téléphone pour ouvrir cette page.
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Chemin dans la boîte de Play Protect : le gros bouton annule, l'issue est un texte. */
function PlayProtectPath() {
  return (
    <ol
      aria-label="Chemin à suivre dans la fenêtre de Play Protect"
      className="mt-4 flex flex-wrap items-center gap-2 text-sm"
    >
      <li className="rounded-full border border-line bg-elevated px-3 py-1.5 text-ink">
        Plus de détails ▾
      </li>
      <li aria-hidden className="text-ink-2">
        →
      </li>
      <li className="rounded-full border-2 border-accent px-3 py-1.5 font-semibold text-ink">
        Installer quand même
      </li>
      <li className="w-full text-xs text-ink-2">
        Le bouton « Compris » ferme la fenêtre sans installer.
      </li>
    </ol>
  );
}

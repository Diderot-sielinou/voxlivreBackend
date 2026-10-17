import { Logo } from './logo';
import { DownloadButton } from './download-button';

export function FinalCta() {
  return (
    <section aria-labelledby="commencer" className="mx-auto max-w-6xl px-5 pb-24">
      <div className="relative isolate overflow-hidden rounded-[32px] border border-line bg-surface px-6 py-16 text-center sm:px-12">
        <div
          aria-hidden
          className="bg-aube absolute -bottom-40 left-1/2 -z-10 size-[36rem] -translate-x-1/2 rounded-full opacity-25 blur-[110px]"
        />
        <Logo className="mx-auto size-16 text-ink" />
        <h2
          id="commencer"
          className="mx-auto mt-6 max-w-2xl text-[clamp(1.9rem,4.4vw,2.9rem)] leading-[1.1] font-bold text-ink"
        >
          Votre prochain livre vous attend. Écoutez-le.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink-2">
          Installez Voxlivre, connectez-vous avec Google, et profitez de vos unités offertes.
        </p>
        <div className="mt-9 flex justify-center">
          <DownloadButton />
        </div>
      </div>
    </section>
  );
}

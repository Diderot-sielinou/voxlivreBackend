import apk from './apk.json';

/**
 * Dernière version publiée de l'APK. `apk.json` est réécrit par
 * `scripts/publish-apk.sh` à chaque publication (ADR-0031).
 */
export interface ApkFile {
  readonly abi: string;
  readonly path: string;
  readonly bytes: number;
  readonly sha256: string;
}

export const APK = apk as {
  readonly version: string;
  readonly build: number;
  readonly minAndroid: string;
  readonly publishedAt: string;
  readonly files: readonly ApkFile[];
};

/** Lien stable vers la dernière version (copie publiée à chaque version). */
export const APK_LATEST_PATH = '/telecharger/voxlivre.apk';

export const PRIMARY_APK: ApkFile = APK.files[0] ?? {
  abi: 'universal',
  path: APK_LATEST_PATH,
  bytes: 0,
  sha256: '',
};

export function formatMegabytes(bytes: number): string {
  return `${Math.round(bytes / 1_000_000)} Mo`;
}

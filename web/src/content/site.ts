/**
 * Contenu de la page d'accueil. Les chiffres viennent du backend et doivent
 * suivre ses changements :
 * - offres : migrations `0010`/`0018` (table `offers`, ADR-0019, ADR-0030) ;
 * - palier gratuit : `FREE_TIER_UNITS_PER_MONTH` (50 000) ;
 * - PDF : `DOCUMENT_MAX_SIZE_BYTES` (50 Mo), OCR 300 pages par scan (ADR-0024).
 */

export const CONTACT_EMAIL = 'contact@voxlivre.store';
export const SITE_URL = 'https://voxlivre.store';

/** Unités par caractère selon la voix (ADR-0019 §2). */
export const UNITS_PER_CHAR = { standard: 1, natural: 4 } as const;

/** Une page de livre ≈ 2 000 caractères (ordre de grandeur affiché). */
export const CHARS_PER_PAGE = 2_000;

export const FREE_TIER_UNITS = 50_000;
export const WELCOME_UNITS = 220_000;
export const WELCOME_VALUE_XAF = 2_000;

export interface Offer {
  readonly code: string;
  readonly name: string;
  readonly priceXaf: number;
  readonly units: number;
  readonly detail: string;
}

export const OFFERS: readonly Offer[] = [
  {
    code: 'credits-s',
    name: 'Crédits S',
    priceXaf: 500,
    units: 50_000,
    detail: 'Sans date d’expiration',
  },
  {
    code: 'credits-m',
    name: 'Crédits M',
    priceXaf: 1_000,
    units: 110_000,
    detail: 'Sans date d’expiration · 10 % offerts',
  },
  {
    code: 'credits-l',
    name: 'Crédits L',
    priceXaf: 2_500,
    units: 300_000,
    detail: 'Sans date d’expiration · 20 % offerts',
  },
  {
    code: 'pass-30d',
    name: 'Pass 30 jours',
    priceXaf: 2_000,
    units: 250_000,
    detail: 'Valable 30 jours, renouvelable',
  },
];

/** Pages approximatives pour un nombre d'unités et une gamme de voix. */
export function pagesFor(units: number, tier: keyof typeof UNITS_PER_CHAR): number {
  return Math.floor(units / UNITS_PER_CHAR[tier] / CHARS_PER_PAGE);
}

export function formatXaf(value: number): string {
  return `${formatNumber(value)} FCFA`;
}

/** Nombres à la française, espace fine insécable (comme dans l'app). */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('fr-FR').format(value).replace(/\s/g, ' ');
}

export interface Faq {
  readonly q: string;
  readonly a: string;
}

export const FAQ: readonly Faq[] = [
  {
    q: 'Pourquoi l’application n’est-elle pas sur le Play Store ?',
    a: 'Voxlivre est en phase d’essai : nous la distribuons d’abord directement, pour recueillir vos avis et corriger vite. La publication sur le Play Store suivra. Les mises à jour s’installent par-dessus, sans perdre vos livres.',
  },
  {
    q: 'Est-ce sûr d’installer un fichier APK ?',
    a: 'Oui, si vous le téléchargez ici et nulle part ailleurs. Chaque version est signée par Voxlivre et son empreinte SHA-256 est affichée sur cette page : vous pouvez la comparer. Google Play Protect affiche « Application bloquée » parce que Voxlivre est nouveau et pas encore sur le Play Store : touchez « Plus de détails » puis « Installer quand même ». N’installez jamais un APK Voxlivre reçu d’une autre source.',
  },
  {
    q: 'Combien ça coûte ?',
    a: 'Chaque mois, 50 000 unités sont offertes pour les voix standard. Pendant l’essai, chaque nouveau compte reçoit en plus l’équivalent de 2 000 FCFA d’unités, utilisables avec toutes les voix. Ensuite, des crédits et des pass seront payables par Orange Money et MTN MoMo.',
  },
  {
    q: 'Quels documents puis-je importer ?',
    a: 'Des PDF jusqu’à 50 Mo : cours, mémoires, livres, rapports. Les PDF scannés sont lus par reconnaissance de caractères ; vous relisez les pages douteuses avant la synthèse vocale. Importez seulement des documents dont vous avez les droits ou pour votre usage personnel.',
  },
  {
    q: 'Faut-il une connexion pour écouter ?',
    a: 'Non. Une fois un livre téléchargé dans l’application, vous l’écoutez hors connexion, avec le texte synchronisé. Votre position est envoyée au retour du réseau.',
  },
  {
    q: 'Mes documents restent-ils privés ?',
    a: 'Oui. Votre PDF est supprimé dès que son texte est extrait. Le texte et l’audio ne sont accessibles qu’à vous. Pas de publicité, pas de traceur, pas de revente de données.',
  },
  {
    q: 'Comment me connecter ?',
    a: 'Avec votre compte Google, en un geste : c’est la méthode recommandée pendant l’essai. La connexion par code SMS ou e-mail reste proposée et s’ouvrira à tous prochainement.',
  },
];

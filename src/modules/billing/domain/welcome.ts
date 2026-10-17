/**
 * Crédits de bienvenue (ADR-0030) : une offre du catalogue, accordée une
 * fois à chaque compte. La référence d'achat dérive de l'identifiant du
 * compte : c'est elle qui rend l'octroi unique (clé primaire de `purchases`).
 */
export const WELCOME_REFERENCE_PREFIX = 'welcome:';

export function welcomeReference(userId: string): string {
  return `${WELCOME_REFERENCE_PREFIX}${userId}`;
}

export interface WelcomePolicy {
  /** Offre accordée ; `null` : aucun crédit de bienvenue (offre arrêtée). */
  readonly offerCode: string | null;
}

export const WELCOME_POLICY = Symbol('WelcomePolicy');

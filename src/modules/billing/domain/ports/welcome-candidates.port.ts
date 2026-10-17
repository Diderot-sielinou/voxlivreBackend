export const WELCOME_CANDIDATES = Symbol('WelcomeCandidates');

/** Comptes qui n'ont pas encore reçu leurs crédits de bienvenue (ADR-0030). */
export interface WelcomeCandidatesPort {
  /** Identifiants des comptes sans achat `welcome:<id>`, plus anciens d'abord. */
  listWithoutWelcome(limit: number): Promise<readonly string[]>;
}

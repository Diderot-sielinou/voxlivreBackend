import { Inject, Injectable } from '@nestjs/common';

import {
  WELCOME_CANDIDATES,
  type WelcomeCandidatesPort,
} from '../../domain/ports/welcome-candidates.port';
import { WELCOME_POLICY, type WelcomePolicy } from '../../domain/welcome';

import { GrantWelcomeCreditsUseCase } from './grant-welcome-credits.use-case';

/** Comptes traités par passage : le balayage suivant reprend la suite. */
export const WELCOME_SWEEP_BATCH = 100;

export interface WelcomeSweepReport {
  readonly examined: number;
  readonly granted: number;
  /** Codes d'erreur rencontrés (offre inconnue…), sans identifiant de compte. */
  readonly failures: readonly string[];
}

/**
 * Balayage des crédits de bienvenue (ADR-0030 §9) : crédite les comptes
 * créés avant l'offre et rattrape un événement de création perdu.
 */
@Injectable()
export class GrantPendingWelcomeCreditsUseCase {
  constructor(
    @Inject(WELCOME_POLICY) private readonly policy: WelcomePolicy,
    @Inject(WELCOME_CANDIDATES) private readonly candidates: WelcomeCandidatesPort,
    private readonly grantWelcome: GrantWelcomeCreditsUseCase,
  ) {}

  async execute(): Promise<WelcomeSweepReport> {
    if (this.policy.offerCode === null) return { examined: 0, granted: 0, failures: [] };
    const userIds = await this.candidates.listWithoutWelcome(WELCOME_SWEEP_BATCH);
    let granted = 0;
    const failures: string[] = [];
    for (const userId of userIds) {
      const result = await this.grantWelcome.execute(userId);
      if (result.isErr()) failures.push(result.error.code);
      else if (result.value) granted += 1;
    }
    return { examined: userIds.length, granted, failures };
  }
}

import { Inject, Injectable } from '@nestjs/common';

import { Result, type DomainError } from '@/shared/kernel';

import { WELCOME_POLICY, welcomeReference, type WelcomePolicy } from '../../domain/welcome';

import { GrantOfferUseCase } from './grant-offer.use-case';

/**
 * Accorde les crédits de bienvenue d'un compte (ADR-0030). Idempotent : la
 * référence `welcome:<userId>` n'est accordée qu'une fois, que l'appel vienne
 * de l'événement de création ou du balayage. Renvoie `true` si des crédits
 * viennent d'être ajoutés.
 */
@Injectable()
export class GrantWelcomeCreditsUseCase {
  constructor(
    @Inject(WELCOME_POLICY) private readonly policy: WelcomePolicy,
    private readonly grantOffer: GrantOfferUseCase,
  ) {}

  async execute(userId: string): Promise<Result<boolean, DomainError>> {
    if (this.policy.offerCode === null) return Result.ok(false);
    const granted = await this.grantOffer.execute({
      userId,
      offerCode: this.policy.offerCode,
      paymentReference: welcomeReference(userId),
    });
    return granted.isErr() ? Result.err(granted.error) : Result.ok(granted.value.granted);
  }
}

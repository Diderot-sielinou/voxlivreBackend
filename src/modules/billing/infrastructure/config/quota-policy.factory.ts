import { type ConfigService } from '@nestjs/config';

import { type Env } from '@/shared/config';

import { type QuotaPolicy } from '../../domain/quota-policy';
import { type WelcomePolicy } from '../../domain/welcome';

/** Limites du quota depuis l'env (ADR-0010, ADR-0019). */
export function buildQuotaPolicy(config: ConfigService<Env, true>): QuotaPolicy {
  return {
    freeTierUnitsPerMonth: config.get('FREE_TIER_UNITS_PER_MONTH', { infer: true }),
    maxCharsPerConversion: config.get('MAX_CHARS_PER_CONVERSION', { infer: true }),
  };
}

/** Offre de bienvenue depuis l'env (ADR-0030) ; absente → aucune. */
export function buildWelcomePolicy(config: ConfigService<Env, true>): WelcomePolicy {
  return { offerCode: config.get('WELCOME_OFFER_CODE', { infer: true }) ?? null };
}

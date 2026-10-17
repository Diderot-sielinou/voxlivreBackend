import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { type Env } from '@/shared/config';

import { IdentityModule } from '../identity/identity.module';

import { GetBillingAccountUseCase } from './application/use-cases/get-billing-account.use-case';
import { GrantOfferUseCase } from './application/use-cases/grant-offer.use-case';
import { GrantPendingWelcomeCreditsUseCase } from './application/use-cases/grant-pending-welcome-credits.use-case';
import { GrantWelcomeCreditsUseCase } from './application/use-cases/grant-welcome-credits.use-case';
import { ListOffersUseCase } from './application/use-cases/list-offers.use-case';
import { ListWalletEntriesUseCase } from './application/use-cases/list-wallet-entries.use-case';
import { RefundQuotaUseCase } from './application/use-cases/refund-quota.use-case';
import { ReserveQuotaUseCase } from './application/use-cases/reserve-quota.use-case';
import { OFFER_CATALOG } from './domain/ports/offer-catalog.port';
import { PURCHASE_LEDGER } from './domain/ports/purchase-ledger.port';
import { UNITS_LEDGER } from './domain/ports/units-ledger.port';
import { WALLET_HISTORY } from './domain/ports/wallet-history.port';
import { WELCOME_CANDIDATES } from './domain/ports/welcome-candidates.port';
import { QUOTA_POLICY, type QuotaPolicy } from './domain/quota-policy';
import { WELCOME_POLICY, type WelcomePolicy } from './domain/welcome';
import { buildQuotaPolicy, buildWelcomePolicy } from './infrastructure/config/quota-policy.factory';
import { UserSignedUpListener } from './infrastructure/events/user-signed-up.listener';
import { DrizzleOfferCatalog } from './infrastructure/persistence/offer-catalog.drizzle-repository';
import { DrizzlePurchaseLedger } from './infrastructure/persistence/purchase-ledger.drizzle-repository';
import { DrizzleUnitsLedger } from './infrastructure/persistence/units-ledger.drizzle-repository';
import { DrizzleWalletHistory } from './infrastructure/persistence/wallet-history.drizzle-repository';
import { DrizzleWelcomeCandidates } from './infrastructure/persistence/welcome-candidates.drizzle-query';
import { GrantWelcomeCreditsJob } from './infrastructure/scheduling/grant-welcome-credits.job';
import { BillingController } from './interface/http/billing.controller';

/**
 * Module billing (ADR-0010, ADR-0019) : unités pondérées par la voix, prises
 * au palier gratuit, au pass puis aux crédits au lancement d'une conversion,
 * rendues si elle échoue. Exporte la réservation et le remboursement
 * (`conversion`), le catalogue et l'octroi d'une offre payée (`payment`).
 * Crédits de bienvenue à la création d'un compte, puis par balayage
 * (ADR-0030).
 */
@Module({
  imports: [IdentityModule],
  controllers: [BillingController],
  providers: [
    { provide: UNITS_LEDGER, useClass: DrizzleUnitsLedger },
    { provide: PURCHASE_LEDGER, useClass: DrizzlePurchaseLedger },
    { provide: OFFER_CATALOG, useClass: DrizzleOfferCatalog },
    { provide: WALLET_HISTORY, useClass: DrizzleWalletHistory },
    { provide: WELCOME_CANDIDATES, useClass: DrizzleWelcomeCandidates },
    {
      provide: QUOTA_POLICY,
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>): QuotaPolicy => buildQuotaPolicy(config),
    },
    {
      provide: WELCOME_POLICY,
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>): WelcomePolicy => buildWelcomePolicy(config),
    },
    ReserveQuotaUseCase,
    RefundQuotaUseCase,
    GrantOfferUseCase,
    GetBillingAccountUseCase,
    ListOffersUseCase,
    ListWalletEntriesUseCase,
    GrantWelcomeCreditsUseCase,
    GrantPendingWelcomeCreditsUseCase,
    UserSignedUpListener,
    GrantWelcomeCreditsJob,
  ],
  exports: [
    ReserveQuotaUseCase,
    RefundQuotaUseCase,
    GrantOfferUseCase,
    ListOffersUseCase,
    // Pass ou crédits : plafond mensuel d'OCR des comptes gratuits (ADR-0024).
    GetBillingAccountUseCase,
  ],
})
export class BillingModule {}

import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { GrantPendingWelcomeCreditsUseCase } from '../../application/use-cases/grant-pending-welcome-credits.use-case';

/**
 * Toutes les 5 minutes : crédits de bienvenue des comptes qui ne les ont pas
 * (comptes créés avant l'offre, événement perdu — ADR-0030). Sans verrou
 * entre instances : l'octroi est idempotent par sa référence.
 */
@Injectable()
export class GrantWelcomeCreditsJob {
  private readonly logger = new Logger(GrantWelcomeCreditsJob.name);

  constructor(private readonly sweep: GrantPendingWelcomeCreditsUseCase) {}

  @Cron('*/5 * * * *', { name: 'billing-grant-welcome-credits' })
  async run(): Promise<void> {
    try {
      const report = await this.sweep.execute();
      if (report.failures.length > 0) {
        this.logger.error({ ...report }, 'billing.welcome-credits');
      } else if (report.granted > 0) {
        this.logger.log({ ...report }, 'billing.welcome-credits');
      }
    } catch (error) {
      // Un cron qui throw est avalé par le scheduler : on logge nous-mêmes.
      this.logger.error({ err: error }, 'Welcome credits sweep failed');
    }
  }
}

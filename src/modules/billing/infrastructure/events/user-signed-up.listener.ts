import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { UserSignedUpEvent } from '@/modules/identity/domain/events/user-signed-up.event';

import { GrantWelcomeCreditsUseCase } from '../../application/use-cases/grant-welcome-credits.use-case';

/**
 * Crédits de bienvenue dès la création du compte (ADR-0030). Ne lève
 * jamais : un échec est journalisé et rattrapé par le balayage.
 */
@Injectable()
export class UserSignedUpListener {
  private readonly logger = new Logger(UserSignedUpListener.name);

  constructor(private readonly grantWelcome: GrantWelcomeCreditsUseCase) {}

  @OnEvent(UserSignedUpEvent.NAME)
  async handle(event: UserSignedUpEvent): Promise<void> {
    try {
      const result = await this.grantWelcome.execute(event.userId);
      if (result.isErr()) {
        this.logger.error({ code: result.error.code }, 'Welcome credits refused');
      }
    } catch (error) {
      this.logger.error({ err: error }, 'Welcome credits failed');
    }
  }
}

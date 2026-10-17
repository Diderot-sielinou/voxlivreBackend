import { Inject, Injectable } from '@nestjs/common';
import { asc, sql } from 'drizzle-orm';

import { user } from '@/modules/identity/infrastructure/persistence/schema/auth.schema';
import { DRIZZLE_CLIENT, type DrizzleClient } from '@/shared/persistence';

import { type WelcomeCandidatesPort } from '../../domain/ports/welcome-candidates.port';
import { WELCOME_REFERENCE_PREFIX } from '../../domain/welcome';

import { purchases } from './schema/billing.schema';

/**
 * Comptes sans achat `welcome:<id>` (ADR-0030). Lit la table `user`
 * d'`identity`, que les clés étrangères de billing référencent déjà ; la
 * recherche de l'achat passe par la clé primaire de `purchases`.
 */
@Injectable()
export class DrizzleWelcomeCandidates implements WelcomeCandidatesPort {
  constructor(@Inject(DRIZZLE_CLIENT) private readonly db: DrizzleClient) {}

  async listWithoutWelcome(limit: number): Promise<readonly string[]> {
    const rows = await this.db
      .select({ id: user.id })
      .from(user)
      .where(
        sql`not exists (select 1 from ${purchases} where ${purchases.paymentReference} = ${WELCOME_REFERENCE_PREFIX} || ${user.id})`,
      )
      .orderBy(asc(user.createdAt))
      .limit(limit);
    return rows.map((row) => row.id);
  }
}

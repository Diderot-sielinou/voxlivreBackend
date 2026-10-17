import {
  DEFAULT_OFFERS,
  FixedClock,
  ImmediateUnitOfWork,
  InMemoryBilling,
} from '../../../../../test/support/fakes';
import { BILLING_ERROR_CODES } from '../../domain/errors/error-codes';
import { type WelcomeCandidatesPort } from '../../domain/ports/welcome-candidates.port';
import { Money } from '../../domain/value-objects/money.vo';
import { Units } from '../../domain/value-objects/units.vo';

import { GrantOfferUseCase } from './grant-offer.use-case';
import { GrantPendingWelcomeCreditsUseCase } from './grant-pending-welcome-credits.use-case';
import { GrantWelcomeCreditsUseCase } from './grant-welcome-credits.use-case';

const WELCOME = {
  code: 'welcome',
  kind: 'credits',
  price: Money.xaf(0),
  units: Units.of(220_000),
  active: false,
} as const;

function setup(offerCode: string | null = 'welcome') {
  const billing = new InMemoryBilling([...DEFAULT_OFFERS, WELCOME]);
  const grant = new GrantOfferUseCase(
    billing,
    billing,
    new ImmediateUnitOfWork(),
    new FixedClock(new Date('2026-10-17T12:00:00Z')),
  );
  const policy = { offerCode };
  const welcome = new GrantWelcomeCreditsUseCase(policy, grant);
  const pending: string[] = [];
  const candidates: WelcomeCandidatesPort = {
    listWithoutWelcome: (limit) =>
      Promise.resolve(
        pending.filter((id) => !billing.purchases.has(`welcome:${id}`)).slice(0, limit),
      ),
  };
  return {
    billing,
    welcome,
    pending,
    sweep: new GrantPendingWelcomeCreditsUseCase(policy, candidates, welcome),
  };
}

describe('GrantWelcomeCreditsUseCase (ADR-0030)', () => {
  it('grants the welcome offer once per account, under the welcome:<id> reference', async () => {
    const { welcome, billing } = setup();
    expect(await welcome.execute('alice')).toMatchObject({ value: true });
    expect(await welcome.execute('alice')).toMatchObject({ value: false });
    expect(billing.wallets.get('alice')).toBe(220_000);
    expect([...billing.purchases.keys()]).toStrictEqual(['welcome:alice']);
  });

  it('grants nothing when the offer is switched off', async () => {
    const { welcome, billing } = setup(null);
    expect(await welcome.execute('alice')).toMatchObject({ value: false });
    expect(billing.purchases.size).toBe(0);
  });

  it('reports a misconfigured offer code', async () => {
    const { welcome } = setup('nope');
    expect(await welcome.execute('alice')).toMatchObject({
      error: { code: BILLING_ERROR_CODES.OFFER_NOT_FOUND },
    });
  });
});

describe('GrantPendingWelcomeCreditsUseCase (ADR-0030 §9)', () => {
  it('credits the accounts that missed it, then finds nobody left', async () => {
    const { welcome, sweep, pending, billing } = setup();
    pending.push('alice', 'bob');
    await welcome.execute('alice');
    expect(await sweep.execute()).toStrictEqual({ examined: 1, granted: 1, failures: [] });
    expect(await sweep.execute()).toStrictEqual({ examined: 0, granted: 0, failures: [] });
    expect(billing.wallets.get('bob')).toBe(220_000);
  });

  it('reports failures by error code, without account identifiers', async () => {
    const { sweep, pending } = setup('nope');
    pending.push('alice');
    expect(await sweep.execute()).toStrictEqual({
      examined: 1,
      granted: 0,
      failures: [BILLING_ERROR_CODES.OFFER_NOT_FOUND],
    });
  });

  it('does not even look for accounts when the offer is switched off', async () => {
    const { sweep, pending } = setup(null);
    pending.push('alice');
    expect(await sweep.execute()).toStrictEqual({ examined: 0, granted: 0, failures: [] });
  });
});

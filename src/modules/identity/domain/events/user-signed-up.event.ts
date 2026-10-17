/**
 * Un compte vient d'être créé (première connexion, OTP ou Google). Payload
 * minimal : l'identifiant seulement. Écouté par `billing` pour les crédits
 * de bienvenue (ADR-0030).
 */
export class UserSignedUpEvent {
  static readonly NAME = 'identity.user.signed-up';

  constructor(readonly userId: string) {}
}

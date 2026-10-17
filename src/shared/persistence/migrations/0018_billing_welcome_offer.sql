-- Crédits de bienvenue de la version d'essai (ADR-0030) : 220 000 unités
-- (2 000 FCFA au tarif des Crédits M), gratuits, hors catalogue
-- (`active = false` : jamais en vente). Accordés si `WELCOME_OFFER_CODE=welcome`.
-- Changer le montant = une nouvelle migration (ADR-0019 §7).
INSERT INTO "offers" ("code", "kind", "price_xaf", "units", "duration_days", "active") VALUES
  ('welcome', 'credits', 0, 220000, NULL, false)
ON CONFLICT ("code") DO NOTHING;

# 0030. Connexion Google et crédits de bienvenue pour la version d'essai

- Statut : accepted
- Date : 2026-10-17
- Tags : `identity`, `billing`, `mobile`, `essai`
- Complète : ADR-0004 (OTP e-mail/téléphone, qui reste en place) et
  ADR-0019 (sources d'unités : les crédits de bienvenue sont des crédits
  ordinaires).

## Contexte

- La première version de l'app doit être essayée par de vrais utilisateurs
  (APK envoyé directement) pour recueillir leurs avis avant le lancement.
- Aucun des deux canaux de code ne marche pour eux : SES est encore en bac à
  sable (seule l'adresse de test du porteur reçoit les codes), le SMS Orange
  n'a ni identifiants valides ni pack. ADR-0004 avait mis Google hors
  périmètre « à décider si le besoin apparaît » : il est là.
- Le paiement Campay attend son « Go Live » : personne ne peut acheter de
  crédits, donc personne ne peut essayer une voix naturelle (le palier
  gratuit ne finance que les voix standard, ADR-0019 §2).
- Le porteur veut que chaque testeur puisse écouter toutes les voix, avec
  l'équivalent de **2 000 FCFA** d'unités offert, puis acheter quand Campay
  sera en production.

## Options

**Connexion** : (1) **Google par jeton d'identité** : l'app obtient un ID
token avec le SDK Google d'Android, le backend le vérifie (signature,
émetteur, audience) avec le fournisseur `google` de better-auth et ouvre
une session comme pour l'OTP ; (2) flux OAuth par redirection : navigateur
dans l'app, URL de rappel, secret client côté serveur — plus long et plus
fragile sur mobile ; (3) attendre SES/Orange — bloque l'essai.

**Montant offert** : (1) **une offre `welcome` du catalogue**, en base,
non vendue ; (2) un nombre d'unités en variable d'env — contraire à
ADR-0019 §7 (un montant change par migration).

**Moment de l'octroi** : (1) **à la création du compte** (événement), avec
un **balayage** qui rattrape les comptes existants et les octrois manqués ;
(2) un script ops à lancer à la main — oubli facile, rien pour les
octrois manqués ; (3) au premier appel de billing — dépend de l'ordre des
appels du client.

## Décision

1. **Google par ID token** : `socialProviders.google` de better-auth avec
   l'identifiant du client OAuth **Web** (`GOOGLE_CLIENT_ID`), qui est
   l'audience des ID tokens obtenus par l'app (`serverClientId`). L'app
   appelle `POST /api/auth/sign-in/social`
   `{ provider: 'google', idToken: { token } }` et reçoit le même jeton
   signé `set-auth-token` que pour l'OTP. Aucun secret client n'est lu par
   l'API (le flux par jeton n'en a pas besoin) ; celui qui est rangé dans
   SSM ne servira qu'à une connexion web éventuelle.
2. **Google désactivé sans `GOOGLE_CLIENT_ID`** (dev, e2e) : le fournisseur
   n'est pas déclaré, la route répond « fournisseur inconnu ».
3. **Rattachement** : better-auth relie un compte Google à un compte
   existant de **même adresse e-mail vérifiée** (Google ne renvoie que des
   adresses vérifiées) : un testeur passé par l'OTP e-mail garde sa
   bibliothèque. Un compte téléphone (adresse technique) n'est jamais
   rattaché.
4. **Rate-limit** de `/sign-in/social` : 15 par 10 minutes et par IP, comme
   les vérifications d'OTP.
5. **OTP e-mail et SMS restent ouverts** : l'app les affiche et recommande
   Google tant qu'ils ne marchent pas pour tous.
6. **Offre `welcome`** (migration) : crédits, **0 FCFA**, **220 000
   unités** — le tarif des Crédits M (1 000 FCFA = 110 000 unités) appliqué à
   2 000 FCFA —, `active = false` : jamais au catalogue, jamais payable.
   Coût Polly au pire : ≈ 1 050 FCFA par compte (≈ 55 000 caractères en
   voix naturelle).
7. **Octroi par `GrantOfferUseCase`** avec la référence `welcome:<userId>` :
   idempotent par la clé primaire de `purchases` (une fois par compte, même
   si l'événement et le balayage se croisent). Crédits sans expiration,
   utilisables par toutes les voix, comptés et remboursés comme des crédits
   achetés.
8. **Déclenchement** : le hook `databaseHooks.user.create.after` de
   better-auth publie l'événement `identity.user.signed-up` (`userId`
   seulement) ; `billing` l'écoute et accorde l'offre. Une erreur est
   journalisée, jamais remontée : la connexion n'échoue pas pour un crédit.
9. **Balayage** toutes les 5 minutes : comptes sans achat `welcome:<id>`,
   100 par passage. Il crédite les comptes existants au déploiement et
   rattrape un événement perdu (redémarrage, panne de base).
10. **Interrupteur** : `WELCOME_OFFER_CODE` (`welcome` en production). Sans
    valeur, ni l'événement ni le balayage n'accordent rien. Pas de date de
    fin pour l'instant (choix du porteur) : arrêter l'offre = vider la
    variable ; changer le montant = une migration.

## Conséquences

- Les testeurs se connectent sans SES ni Orange, et chaque compte peut
  essayer les voix naturelles avant que Campay soit en production.
- **Abus** : un compte Google se crée en quelques minutes, chaque compte
  reçoit 220 000 unités (≈ 1 050 FCFA de Polly). À surveiller pendant
  l'essai (nombre de comptes, dépense Polly) ; l'interrupteur coupe l'offre
  sans déploiement de code.
- Désactiver l'offre ne reprend rien : les crédits accordés restent.
- `billing` lit la table `user` d'`identity` pour le balayage, comme ses
  clés étrangères le font déjà ; aucun autre module ne dépend de `billing`.
- La suppression de compte (ADR-0023) détache l'achat `welcome` comme un
  achat payé ; un compte recréé avec la même adresse a un nouvel
  identifiant, donc un nouvel octroi. Ce contournement n'est pas plus
  facile que créer une autre adresse Gmail : accepté pour l'essai, à
  fermer (clé d'octroi par adresse) avant une offre de bienvenue durable.

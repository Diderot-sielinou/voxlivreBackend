# 0031. Page d'accueil en Next.js (export statique) et téléchargement direct de l'APK

- Statut : accepted
- Date : 2026-10-17
- Tags : `site`, `infra`, `mobile`, `essai`
- Modifie : ADR-0020 (site sans JavaScript, CSP stricte, `site/` publié tel
  quel). Complète : ADR-0030 (version d'essai distribuée hors Play Store).

## Contexte

- La version d'essai de l'app est distribuée en APK, directement (ADR-0030,
  ADR-0015 du mobile). Les testeurs ont besoin d'une page qui présente
  l'app, rassure sur l'installation d'un APK (sources inconnues, Play
  Protect, empreinte) et donne le fichier.
- La page actuelle (ADR-0020) est un HTML minimal « bientôt disponible »,
  sans JavaScript, au style éloigné de l'app. Le porteur veut une vraie
  landing, au design system de l'app (« Encre & Aurore »), avec la stack de
  `cinaf-engine-front` (Next.js, Tailwind, motion, lucide), et des extraits
  audio des voix avec le texte surligné mot à mot.
- Contraintes : hébergement S3 + CloudFront inchangé (rien à exploiter),
  visiteurs sur Android d'entrée de gamme et données mobiles chères, aucune
  mesure d'audience ni cookie (ADR-0020 §5).

## Options

**Construction** : (1) **Next.js 16 en export statique** (`output:
'export'`) dans `web/` : composants, Tailwind 4, même outillage que cinaf,
résultat = fichiers statiques ; (2) garder du HTML/CSS écrit à la main —
pas de composants, pas d'extraits interactifs, s'écarte de la stack
demandée ; (3) Next.js avec serveur (Amplify, Vercel) — un service de plus
à payer et surveiller pour un contenu qui ne change qu'au déploiement.

**CSP** (Next.js insère des scripts inline pour l'hydratation) :
(1) **`script-src 'self' 'unsafe-inline'`** ; (2) hachages calculés à
chaque build et CSP en `<meta>` — l'en-tête CloudFront est fixe, il
faudrait le retirer et maintenir un script de hachage fragile ; (3) zéro
JavaScript — impossible avec les extraits synchronisés.

**APK** : (1) **dans le bucket du site**, sous `telecharger/`, envoyé par
un script, hors de git ; (2) dans le dépôt — 66 Mo par version dans
l'historique ; (3) GitHub Releases — dépôt du mobile, domaine tiers, lien
moins rassurant pour un testeur.

## Décision

1. **`web/`** remplace `site/` : Next.js 16 (App Router) en export statique
   (`out/`), Tailwind 4, `lucide-react`, TypeScript strict, ESLint
   `next/core-web-vitals`, Prettier, tests Playwright + axe. Projet pnpm
   autonome (son `pnpm-workspace.yaml`), exclu du tsconfig, d'ESLint et du
   contexte Docker de l'API.
2. **Design system de l'app** transposé en variables CSS : sombre « Nuit
   d'encre » par défaut, « Papier » si le téléphone est en clair
   (`prefers-color-scheme`), polices de l'app auto-hébergées (OFL, sous-
   ensemble latin en WOFF2, 10-16 Ko par graisse), logo redessiné en SVG
   depuis `VoxLogoPainter`.
3. **Sobriété réseau** : contenu visible sans JavaScript (animations
   d'apparition en CSS `animation-timeline`, désactivées en mouvement
   réduit ; `motion` de cinaf écarté : à l'export statique il écrit
   `opacity: 0` dans le HTML, le contenu resterait caché jusqu'au
   chargement du JavaScript), extraits audio (~70 Ko) chargés seulement au premier ▶, vidéo
   jamais en lecture automatique (`preload="none"`).
4. **Extraits des voix** : les 4 voix de l'app (Polly : Léa, Rémi, Céline,
   Mathieu) lisent un passage du domaine public (Jules Verne), générés une
   fois avec leurs repères de mots ; le surlignage suit `currentTime`.
5. **CSP** : `default-src 'none'; script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';
media-src 'self'; connect-src 'self'; manifest-src 'self'; base-uri
'none'; form-action 'none'; frame-ancestors 'none'`. Le risque XSS reste
   faible : aucune donnée d'utilisateur affichée, aucun formulaire, aucun
   cookie, aucune ressource tierce.
6. **APK** : `web/scripts/publish-apk.sh <apk>` calcule taille et SHA-256,
   envoie `telecharger/voxlivre-<version>.apk` (versionné, cache long) et
   `telecharger/voxlivre.apk` (dernière version, cache court), type
   `application/vnd.android.package-archive`, puis réécrit
   `web/src/content/apk.json` que la page affiche (version, taille,
   empreinte) ; commit + merge publient la page. Le porteur le lance (écrit
   en production).
7. **Publication** (workflow `site.yml`) : `pnpm build` puis `aws s3 sync
web/out/ --delete --exclude 'telecharger/*'` (sinon chaque publication
   effacerait les APK) ; fichiers `_next/static/` (nom haché) en cache
   immuable d'un an, le reste 5 minutes ; invalidation CloudFront.
8. **Pages légales** portées telles quelles dans le même gabarit (sommaire,
   typographie de lecture), plus deux ajouts factuels liés à ADR-0030 : la
   connexion Google (données reçues, Google comme prestataire) dans la
   confidentialité, et dans les conditions (§2).

## Conséquences

- La page présente l'app comme elle est, avec un téléchargement et une
  procédure d'installation ; une vidéo promotionnelle peut être ajoutée par
  configuration (`web/src/content/video.ts`), sans autre code.
- Le site exécute du JavaScript (≈ 100 Ko compressés avec React) : la CSP
  est assouplie sur les scripts et styles inline. À revoir si le site
  affiche un jour des données saisies par des visiteurs.
- Un APK de 66 Mo coûte cher en données ; des APK par architecture
  (`--split-per-abi`, ~20 Mo) sont possibles plus tard, `apk.json` accepte
  déjà plusieurs fichiers.
- La CI compile et vérifie le site (lint, types, build, accessibilité) ;
  publier une nouvelle version de l'APK reste un geste manuel du porteur.

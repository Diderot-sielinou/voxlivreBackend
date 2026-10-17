#!/usr/bin/env bash
# Publie une version de l'APK sur voxlivre.store (ADR-0031).
#
#   AWS_PROFILE=voxlivre web/scripts/publish-apk.sh <fichier.apk> <version> [build]
#
# - envoie telecharger/voxlivre-<version>.apk (cache long) et
#   telecharger/voxlivre.apk (dernière version, cache court) dans le bucket du
#   site, avec le type MIME Android ;
# - invalide le lien stable dans CloudFront ;
# - réécrit web/src/content/apk.json (version, taille, SHA-256) : committer et
#   merger ensuite pour que la page affiche la nouvelle version.
#
# Écrit en production : à lancer par le porteur, après avoir vérifié l'APK.
set -euo pipefail

apk="${1:?usage: publish-apk.sh <fichier.apk> <version> [build]}"
version="${2:?version manquante (ex. 0.1.0)}"
build="${3:-1}"
[[ "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] || { echo "version invalide : $version" >&2; exit 2; }
[[ -f "$apk" ]] || { echo "fichier introuvable : $apk" >&2; exit 2; }

here="$(cd "$(dirname "$0")" && pwd)"
repo="$(cd "$here/../.." && pwd)"
tf="$repo/infra/envs/main"

bucket="${SITE_BUCKET:-$(terraform -chdir="$tf" output -raw site_bucket_name)}"
distribution="${SITE_DISTRIBUTION_ID:-$(terraform -chdir="$tf" output -raw site_distribution_id)}"

bytes="$(stat -c %s "$apk")"
sha256="$(sha256sum "$apk" | cut -d' ' -f1)"
key="telecharger/voxlivre-${version}.apk"
mime='application/vnd.android.package-archive'

echo "APK $version ($bytes octets) sha256=$sha256 → s3://$bucket/$key"
aws s3 cp "$apk" "s3://$bucket/$key" --content-type "$mime" \
  --cache-control 'public, max-age=31536000, immutable' \
  --content-disposition "attachment; filename=\"voxlivre-${version}.apk\""
aws s3 cp "s3://$bucket/$key" "s3://$bucket/telecharger/voxlivre.apk" --content-type "$mime" \
  --metadata-directive REPLACE --cache-control 'public, max-age=300' \
  --content-disposition "attachment; filename=\"voxlivre-${version}.apk\""
aws cloudfront create-invalidation --distribution-id "$distribution" \
  --paths '/telecharger/voxlivre.apk' --query 'Invalidation.Id' --output text

# Le programme est du JavaScript : `${version}` est un gabarit JS, pas une
# expansion bash (valeurs passées en arguments) — d'où les guillemets simples.
# shellcheck disable=SC2016
node -e '
const fs = require("node:fs");
const [file, version, build, bytes, sha256] = process.argv.slice(1);
const apk = JSON.parse(fs.readFileSync(file, "utf8"));
Object.assign(apk, {
  version,
  build: Number(build),
  publishedAt: new Date().toISOString().slice(0, 10),
  files: [{ abi: "universal", path: `/telecharger/voxlivre-${version}.apk`, bytes: Number(bytes), sha256 }],
});
fs.writeFileSync(file, JSON.stringify(apk, null, 2) + "\n");
' "$here/../src/content/apk.json" "$version" "$build" "$bytes" "$sha256"

echo "OK. web/src/content/apk.json mis à jour : committer et merger pour publier la page."

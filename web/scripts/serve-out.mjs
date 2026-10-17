// Sert `out/` comme CloudFront (router.js, ADR-0020) : `/conditions` →
// `conditions.html`, `/dossier/` → `index.html`, sinon 404.html. Pour les
// tests Playwright et la vérification sur téléphone (adb reverse).
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const root = join(import.meta.dirname, '..', 'out');
const port = Number(process.env.PORT ?? 4173);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.apk': 'application/vnd.android.package-archive',
};

function resolve(url) {
  let path = decodeURIComponent(new URL(url, 'http://x').pathname);
  if (path.endsWith('/')) path += 'index.html';
  else if (!extname(path)) path += '.html';
  const file = normalize(join(root, path));
  return file.startsWith(root) && existsSync(file) && statSync(file).isFile() ? file : null;
}

createServer((req, res) => {
  const file = resolve(req.url ?? '/');
  const target = file ?? join(root, '404.html');
  res.writeHead(file ? 200 : 404, {
    'content-type': types[extname(target)] ?? 'application/octet-stream',
  });
  createReadStream(target).pipe(res);
}).listen(port, () => console.log(`out/ sur http://localhost:${port}`));

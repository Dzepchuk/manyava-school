/* global console */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { URL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const errors = [];
const external = new Set();

function files(directory, extension) {
  return fs
    .readdirSync(directory, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(extension))
    .map((entry) => path.join(entry.parentPath, entry.name));
}

function localTarget(url) {
  const pathname = decodeURIComponent(new URL(url, 'https://manyava-school.if.ua').pathname);
  if (path.extname(pathname)) return path.join(dist, pathname.replace(/^\/+/, ''));
  return path.join(dist, pathname.replace(/^\/+/, ''), 'index.html');
}

for (const file of files(dist, '.html')) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (!url || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:')) {
      continue;
    }
    if (url.startsWith('https://')) {
      external.add(url);
      continue;
    }
    if (/^[a-z][a-z0-9+.-]*:/i.test(url)) {
      errors.push(`${path.relative(root, file)}: недозволена схема ${url}`);
      continue;
    }
    const target = localTarget(url);
    if (!fs.existsSync(target)) {
      errors.push(
        `${path.relative(root, file)}: внутрішнє посилання не існує ${url} → ${path.relative(root, target)}`,
      );
    }
  }
}

if (errors.length) {
  console.error(`Перевірка посилань: помилок ${errors.length}.`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(
    `Перевірка посилань: внутрішні цілі існують; HTTPS-посилань зафіксовано ${external.size}.`,
  );
}

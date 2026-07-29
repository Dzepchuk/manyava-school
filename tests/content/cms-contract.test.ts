import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';
import {
  validateMarkdownPolicy,
  validateMediaReference,
} from '../../src/lib/validation/content-policy';

const configPath = path.resolve('public/admin/config.yml');
const config = parse(fs.readFileSync(configPath, 'utf8'));

function fieldNames(collectionName: string): Set<string> {
  const collection = config.collections.find(
    ({ name }: { name: string }) => name === collectionName,
  );
  return new Set(collection.fields.map(({ name }: { name: string }) => name));
}

function nestedFieldNames(collectionName: string, name: string): Set<string> {
  const collection = config.collections.find(
    ({ name: value }: { name: string }) => value === collectionName,
  );
  const field = collection.fields.find(({ name: value }: { name: string }) => value === name);
  return new Set(field.fields.map(({ name: value }: { name: string }) => value));
}

function fileFieldNames(collectionName: string, fileName: string): Set<string> {
  const collection = config.collections.find(
    ({ name }: { name: string }) => name === collectionName,
  );
  const file = collection.files.find(({ name }: { name: string }) => name === fileName);
  return new Set(file.fields.map(({ name }: { name: string }) => name));
}

describe('контракт Decap CMS', () => {
  it('використовує GitHub editorial workflow без секретів', () => {
    expect(config.backend).toMatchObject({
      name: 'github',
      repo: 'Dzepchuk/manyava-school',
      branch: 'main',
    });
    expect(config.publish_mode).toBe('editorial_workflow');
    expect(JSON.stringify(config)).not.toMatch(/client_secret|access_token|private_key/i);
  });

  it.each([
    ['news', ['title', 'description', 'publishedAt', 'authorDisplayName', 'review', 'body']],
    ['notices', ['title', 'description', 'startsAt', 'expiresAt', 'review', 'body']],
    ['events', ['title', 'description', 'startsAt', 'timeStatus', 'review', 'body']],
  ])('%s відповідає content schema', (collection, requiredFields) => {
    const names = fieldNames(collection);
    requiredFields.forEach((name) => expect(names.has(name)).toBe(true));
  });

  it('медіа вимагає alt, права та підставу для публікації дітей', () => {
    const coverFields = nestedFieldNames('news', 'cover');
    for (const field of [
      'src',
      'alt',
      'license',
      'approvedBy',
      'approvedAt',
      'containsChildren',
      'publicationBasis',
    ]) {
      expect(coverFields.has(field)).toBe(true);
    }
  });

  it('дозволяє змінювати офіційні контакти без редагування коду', () => {
    const names = fileFieldNames('site-settings', 'official-contacts');
    for (const field of [
      'officialName',
      'shortName',
      'tagline',
      'address',
      'phones',
      'email',
      'workingHours',
      'contactPublication',
      'siteUrl',
      'socialLinks',
      'defaultSeo',
      'analyticsEnabled',
      'updatedAt',
      'approvedBy',
    ]) {
      expect(names.has(field)).toBe(true);
    }
  });

  it('build policy блокує небезпечний HTML і неповні права на медіа', () => {
    expect(validateMarkdownPolicy('<script>alert(1)</script>', 'unsafe.md')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'POLICY-MARKDOWN-SCRIPT', file: 'unsafe.md' }),
      ]),
    );

    const issues = validateMediaReference(
      {
        src: '/media/missing.webp',
        alt: '',
        containsChildren: true,
      },
      'news.md',
      'cover',
      process.cwd(),
    );
    expect(issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'POLICY-MEDIA-ALT' }),
        expect.objectContaining({ code: 'POLICY-MEDIA-LICENSE' }),
        expect.objectContaining({ code: 'POLICY-CHILD-BASIS' }),
      ]),
    );
  });
});

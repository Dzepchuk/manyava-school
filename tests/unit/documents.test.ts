import { describe, expect, it } from 'vitest';
import {
  filterDocuments,
  getCurrentDocument,
  type DocumentListItem,
} from '../../src/lib/content/documents';

const documents: DocumentListItem[] = [
  {
    id: 'rules-2025',
    title: 'Правила внутрішнього розпорядку',
    categoryId: 'organizational-documents',
    documentDate: new Date('2025-09-01'),
    versionStatus: 'superseded',
    seriesId: 'rules',
  },
  {
    id: 'rules-2026',
    title: 'Правила внутрішнього розпорядку',
    categoryId: 'organizational-documents',
    documentDate: new Date('2026-09-01'),
    versionStatus: 'current',
    seriesId: 'rules',
    supersedes: 'rules-2025',
  },
  {
    id: 'strategy',
    title: 'Стратегія розвитку ліцею',
    categoryId: 'planning',
    documentDate: new Date('2026-01-15'),
    versionStatus: 'current',
    seriesId: 'strategy',
  },
];

describe('document queries', () => {
  it('фільтрує за частиною назви, категорією та роком', () => {
    expect(filterDocuments(documents, { query: 'правила', year: 2026 })).toEqual([documents[1]]);
    expect(filterDocuments(documents, { categoryId: 'planning' })).toEqual([documents[2]]);
  });

  it('знаходить чинну версію для архівної редакції', () => {
    expect(getCurrentDocument(documents, 'rules-2025')?.id).toBe('rules-2026');
  });
});

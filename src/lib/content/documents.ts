export interface DocumentListItem {
  id: string;
  title: string;
  categoryId: string;
  documentDate: Date;
  versionStatus: 'current' | 'superseded' | 'withdrawn';
  seriesId?: string;
  supersedes?: string;
}

export interface DocumentFilters {
  query?: string;
  categoryId?: string;
  year?: number;
}

export function filterDocuments<T extends DocumentListItem>(
  documents: T[],
  filters: DocumentFilters,
): T[] {
  const query = filters.query?.trim().toLocaleLowerCase('uk');

  return documents
    .filter((document) => !query || document.title.toLocaleLowerCase('uk').includes(query))
    .filter((document) => !filters.categoryId || document.categoryId === filters.categoryId)
    .filter((document) => !filters.year || document.documentDate.getFullYear() === filters.year)
    .sort((left, right) => right.documentDate.getTime() - left.documentDate.getTime());
}

export function getCurrentDocument<T extends DocumentListItem>(
  documents: T[],
  documentId: string,
): T | undefined {
  const selected = documents.find(({ id }) => id === documentId);
  if (!selected) return undefined;

  const seriesId = selected.seriesId ?? selected.id;
  return documents.find(
    (document) =>
      (document.seriesId ?? document.id) === seriesId && document.versionStatus === 'current',
  );
}

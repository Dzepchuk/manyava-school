import { describe, expect, it } from 'vitest';
import {
  assertDocumentSeries,
  documentCategorySchema,
  documentFrontmatterSchema,
  legalPublicationSchema,
} from '../../src/lib/validation/documents';

const review = {
  ownerId: 'director',
  createdAt: '2026-07-29',
  updatedAt: '2026-07-29',
  reviewedAt: '2026-07-29',
  reviewDueAt: '2027-01-29',
  status: 'published',
} as const;

const validDocument = {
  title: 'Правила внутрішнього розпорядку',
  description:
    'Чинні правила внутрішнього розпорядку Манявського ліцею для ознайомлення учасників освітнього процесу.',
  documentDate: '2026-07-29',
  publishedAt: '2026-07-29',
  categoryId: 'organizational-documents',
  file: {
    path: '/documents/pravyla-vnutrishnoho-rozporiadku.pdf',
    mimeType: 'application/pdf',
    bytes: 250_000,
    available: true,
  },
  accessibleSummary:
    'Документ визначає основні правила організації роботи та поведінки у Манявському ліцеї.',
  versionStatus: 'current',
  review,
} as const;

describe('documentFrontmatterSchema', () => {
  it('приймає документ із метаданими файла й доступним описом', () => {
    const result = documentFrontmatterSchema.parse(validDocument);

    expect(result.file.mimeType).toBe('application/pdf');
    expect(result.versionStatus).toBe('current');
  });

  it('відхиляє файл понад 10 МБ і недозволений MIME', () => {
    expect(() =>
      documentFrontmatterSchema.parse({
        ...validDocument,
        file: { ...validDocument.file, bytes: 10 * 1024 * 1024 + 1 },
      }),
    ).toThrow(/10 МБ/i);

    expect(() =>
      documentFrontmatterSchema.parse({
        ...validDocument,
        file: { ...validDocument.file, mimeType: 'application/x-msdownload' },
      }),
    ).toThrow(/тип файла/i);
  });

  it('дозволяє обов’язкове оприлюднення лише з confirmed legal basis', () => {
    expect(() =>
      documentFrontmatterSchema.parse({
        ...validDocument,
        legalPublicationId: 'unverified-publication',
        mandatoryPublication: true,
        legalPublicationStatus: 'unverified',
      }),
    ).toThrow(/підтверджен/i);
  });
});

describe('document reference data', () => {
  it('валідує категорію та нормативний запис', () => {
    expect(
      documentCategorySchema.parse({
        id: 'organizational-documents',
        label: 'Організаційні документи',
        description: 'Документи з організації роботи ліцею.',
        order: 1,
        active: true,
      }).active,
    ).toBe(true);

    expect(
      legalPublicationSchema.parse({
        id: 'education-law-transparency',
        title: 'Відкритість і прозорість діяльності закладу освіти',
        sourceTitle: 'Закон України «Про освіту»',
        sourceUrl: 'https://zakon.rada.gov.ua/laws/show/2145-19',
        sourceSection: 'Стаття 30',
        verifiedAt: '2026-07-29',
        verifiedBy: 'technical-administrator',
        reviewDueAt: '2026-10-29',
        responsibleOwnerId: 'director',
        publicationPath: '/transparency/',
        status: 'confirmed',
      }).status,
    ).toBe('confirmed');
  });

  it('блокує дві чинні версії однієї серії', () => {
    expect(() =>
      assertDocumentSeries([
        { id: 'v1', seriesId: 'rules', versionStatus: 'current' },
        { id: 'v2', seriesId: 'rules', versionStatus: 'current' },
      ]),
    ).toThrow(/одна чинна/i);
  });
});

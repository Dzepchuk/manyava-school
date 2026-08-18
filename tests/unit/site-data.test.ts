import { describe, expect, it } from 'vitest';
import {
  assertSafeMarkdown,
  assertUniquePagePaths,
  pageFrontmatterSchema,
} from '../../src/lib/validation/pages';
import { navigationSchema, siteSettingsSchema } from '../../src/lib/validation/site-data';

const review = {
  ownerId: 'director',
  createdAt: '2026-07-29',
  updatedAt: '2026-07-29',
  reviewedAt: '2026-07-29',
  reviewDueAt: '2027-01-29',
  status: 'published',
} as const;

describe('pageFrontmatterSchema', () => {
  it('приймає опубліковану сторінку зі стабільним canonical path і review metadata', () => {
    const page = pageFrontmatterSchema.parse({
      title: 'Вступ до ліцею',
      description:
        'Основна інформація про вступ до Манявського ліцею та порядок уточнення документів.',
      path: '/admission/',
      section: 'about',
      review,
      showInNavigation: true,
      searchKeywords: ['вступ', 'прийом'],
    });

    expect(page.path).toBe('/admission/');
    expect(page.review.ownerId).toBe('director');
  });

  it('відхиляє нестабільний шлях і невідомі поля', () => {
    expect(() =>
      pageFrontmatterSchema.parse({
        title: 'Вступ',
        description:
          'Основна інформація про вступ до Манявського ліцею та порядок уточнення документів.',
        path: '/Вступ?year=2026',
        section: 'about',
        review,
        showInNavigation: true,
        unexpected: true,
      }),
    ).toThrow();
  });

  it('блокує небезпечний Markdown і дублікати canonical path', () => {
    expect(() => assertSafeMarkdown('<script>alert(1)</script>')).toThrow(/script/i);
    expect(() =>
      assertUniquePagePaths([
        { id: 'first', path: '/admission/' },
        { id: 'second', path: '/admission/' },
      ]),
    ).toThrow(/admission/);
  });
});

describe('siteSettingsSchema', () => {
  it('вимагає явних дозволів на публікацію контактних полів', () => {
    expect(() =>
      siteSettingsSchema.parse({
        officialName: 'Манявський ліцей Солотвинської селищної ради',
        shortName: 'Манявський ліцей',
        englishName: 'Manyavskyi lyceum of the Solotvyn Village Council',
        registrationCode: '23805692',
        institutionType: 'Заклад загальної середньої освіти',
        ownership: 'Комунальна власність Солотвинської територіальної громади',
        founder: 'Солотвинська селищна рада Івано-Франківської області',
        governingBody: 'Управління освіти, молоді та спорту Солотвинської селищної ради',
        tagline: 'Простір знань, взаємоповаги та розвитку',
        address: 'с. Манява, Івано-Франківська область, Україна',
        phones: [],
        email: 'school@example.invalid',
        workingHours: 'Години уточнюються',
        siteUrl: 'https://manyava-school.if.ua',
        socialLinks: [],
        defaultSeo: {
          title: 'Манявський ліцей — офіційний сайт',
          description:
            'Офіційний сайт Манявського ліцею з актуальними новинами, документами та інформацією для громади.',
        },
        analyticsEnabled: false,
        updatedAt: '2026-07-29',
        approvedBy: 'technical-administrator',
      }),
    ).toThrow();
  });
});

describe('navigationSchema', () => {
  it('приймає навігацію глибиною не більше трьох рівнів', () => {
    const result = navigationSchema.parse([
      navigationItem('about', '/about/'),
      navigationItem('leadership', '/about/leadership/', 'about'),
      navigationItem('team', '/about/leadership/team/', 'leadership'),
    ]);

    expect(result).toHaveLength(3);
  });

  it('відхиляє четвертий рівень і циклічні зв’язки', () => {
    expect(() =>
      navigationSchema.parse([
        navigationItem('about', '/about/'),
        navigationItem('leadership', '/about/leadership/', 'about'),
        navigationItem('team', '/about/leadership/team/', 'leadership'),
        navigationItem('archive', '/about/leadership/team/archive/', 'team'),
      ]),
    ).toThrow(/три рівні/i);

    expect(() =>
      navigationSchema.parse([
        navigationItem('about', '/about/', 'leadership'),
        navigationItem('leadership', '/about/leadership/', 'about'),
      ]),
    ).toThrow(/цикл/i);
  });
});

function navigationItem(id: string, path: string, parentId?: string) {
  return {
    id,
    label: id === 'about' ? 'Про ліцей' : 'Керівництво',
    path,
    parentId,
    order: 1,
    audiences: ['all'] as const,
    visible: true,
  };
}

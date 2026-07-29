import { describe, expect, it } from 'vitest';
import { getPublishedContacts } from '../../src/lib/content/contacts';
import type { SiteSettings } from '../../src/lib/validation/site-data';

const site = {
  officialName: 'Манявський ліцей Солотвинської селищної ради',
  shortName: 'Манявський ліцей',
  tagline: 'Простір знань, взаємоповаги та розвитку',
  address: 'с. Манява, Івано-Франківська область, Україна',
  phones: [{ label: 'Приймальня', value: '+380000000000' }],
  email: 'school@example.invalid',
  workingHours: 'Понеділок–п’ятниця, години уточнюються',
  siteUrl: 'http://localhost:4321',
  socialLinks: [],
  defaultSeo: {
    title: 'Манявський ліцей — офіційний сайт',
    description:
      'Офіційний сайт Манявського ліцею з актуальними новинами, документами та інформацією для громади.',
  },
  analyticsEnabled: false,
  updatedAt: new Date('2026-07-29'),
  approvedBy: 'technical-administrator',
  contactPublication: {
    address: true,
    phones: false,
    email: false,
    workingHours: false,
  },
} satisfies SiteSettings;

describe('getPublishedContacts', () => {
  it('повертає лише підтверджені для публікації контактні дані', () => {
    const contacts = getPublishedContacts(site);

    expect(contacts.address).toBe(site.address);
    expect(contacts.phones).toEqual([]);
    expect(contacts.email).toBeNull();
    expect(contacts.workingHours).toBeNull();
  });
});

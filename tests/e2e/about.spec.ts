import { expect, test } from '@playwright/test';

test('сторінка про ліцей показує підтверджені відомості та посилання на джерела', async ({
  page,
}) => {
  await page.goto('/about/');

  await expect(page).toHaveTitle(/Про ліцей/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Ліцей, що зростає разом із Манявою' }),
  ).toBeVisible();
  await expect(page.getByText('Опорний заклад', { exact: true })).toBeVisible();
  await expect(page.getByText('Комунальна власність')).toBeVisible();
  await expect(page.getByText('Українська мова навчання')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Запис ліцею в АІКОМ' })).toHaveAttribute(
    'href',
    'https://aikom.iea.gov.ua/zzso/view?zzsoId=10585',
  );
  await expect(
    page.getByRole('link', { name: 'Публічна сторінка ліцею у Facebook' }),
  ).toHaveAttribute('href', 'https://www.facebook.com/profile.php?id=100068140848284');

  await expect(page.locator('form')).toHaveCount(0);
  await expect(page.locator('iframe')).toHaveCount(0);
  const schoolPhoto = page.getByRole('img', { name: 'Будівля Манявського ліцею' });
  await expect(schoolPhoto).toHaveAttribute('src', '/media/manyava-lyceum-building.webp');
  await expect(schoolPhoto).toHaveAttribute('width', '592');
  await expect(schoolPhoto).toHaveAttribute('height', '299');
  await expect(page.locator('img')).toHaveCount(1);
});

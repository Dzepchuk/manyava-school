import { expect, test } from '@playwright/test';

test('контактна сторінка показує підтверджені контакти без форми й карти', async ({ page }) => {
  await page.goto('/contacts/');

  await expect(page).toHaveTitle(/Контакти/);
  await expect(page.getByRole('heading', { level: 1, name: 'Контакти ліцею' })).toBeVisible();
  await expect(
    page.getByText(
      'вул. Незалежності, 10, с. Манява, Івано-Франківський район, Івано-Франківська область, 77772',
    ),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'manyavanvk@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:manyavanvk@gmail.com',
  );
  await expect(page.getByRole('link', { name: '+380 97 236 78 52' })).toHaveAttribute(
    'href',
    'tel:+380972367852',
  );
  await expect(page.getByText('Години роботи уточнюються')).toBeVisible();
  await expect(page.locator('form')).toHaveCount(0);
  await expect(page.locator('iframe')).toHaveCount(0);
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(1);
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(1);
});

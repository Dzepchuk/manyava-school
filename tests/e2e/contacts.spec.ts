import { expect, test } from '@playwright/test';

test('контактна сторінка показує лише підтверджені дані без форми й карти', async ({ page }) => {
  await page.goto('/contacts/');

  await expect(page).toHaveTitle(/Контакти/);
  await expect(page.getByRole('heading', { level: 1, name: 'Контакти ліцею' })).toBeVisible();
  await expect(page.getByText('с. Манява, Івано-Франківська область, Україна')).toBeVisible();
  await expect(page.getByText('Контактні дані уточнюються')).toBeVisible();
  await expect(page.locator('form')).toHaveCount(0);
  await expect(page.locator('iframe')).toHaveCount(0);
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
});

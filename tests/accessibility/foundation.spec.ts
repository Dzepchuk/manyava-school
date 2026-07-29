import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('базова сторінка має коректну семантику й не містить автоматично виявлених бар’єрів', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('lang', 'uk');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.getByRole('navigation', { name: 'Основна навігація' })).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

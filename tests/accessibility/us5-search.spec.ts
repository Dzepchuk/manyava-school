import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('пошук доступний із клавіатури й має aria-live status', async ({ page }) => {
  await page.goto('/search/');

  const input = page.getByRole('searchbox', { name: 'Ключові слова' });
  await input.focus();
  await expect(input).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Знайти' })).toBeFocused();
  await expect(page.locator('#search-status')).toHaveAttribute('aria-live', 'polite');

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

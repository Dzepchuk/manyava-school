import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('контактна сторінка доступна з клавіатури та при масштабі 200%', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/contacts/');

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);

  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('довгий заголовок картки не виходить за її межі при 200% zoom', async ({ page }) => {
  await page.setViewportSize({ width: 700, height: 960 });
  await page.goto('/contacts/');
  await page.evaluate(() => {
    document.documentElement.style.zoom = '2';
  });

  const card = await page.locator('.visit-panel').boundingBox();
  const heading = await page.getByRole('heading', { name: 'Перед відвідуванням' }).boundingBox();

  expect(card).not.toBeNull();
  expect(heading).not.toBeNull();
  expect(heading!.x).toBeGreaterThanOrEqual(card!.x);
  expect(heading!.x + heading!.width).toBeLessThanOrEqual(card!.x + card!.width + 1);
});

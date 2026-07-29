import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('сторінка про ліцей доступна та не має горизонтального прокручування', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/about/');

  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('сторінка зберігає читабельність при масштабі 200%', async ({ page }) => {
  // WCAG reflow equivalent: a 1280 px desktop viewport viewed at 200% has
  // approximately 640 CSS pixels available for layout.
  await page.setViewportSize({ width: 640, height: 960 });
  await page.goto('/about/');

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);

  await expect(
    page.getByRole('heading', { level: 1, name: 'Ліцей, що зростає разом із Манявою' }),
  ).toBeVisible();
});

test('заголовок життя спільноти не заходить на картки', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/about/');

  const heading = await page
    .getByRole('heading', { name: 'Навчання, відповідальність і зв’язок із громадою' })
    .boundingBox();
  const headingOverflow = await page
    .getByRole('heading', { name: 'Навчання, відповідальність і зв’язок із громадою' })
    .evaluate((element) => element.scrollWidth > element.clientWidth);
  const cards = await page.locator('.value-grid').boundingBox();

  expect(heading).not.toBeNull();
  expect(cards).not.toBeNull();
  expect(headingOverflow).toBe(false);
  expect(heading!.x + heading!.width).toBeLessThanOrEqual(cards!.x);
});

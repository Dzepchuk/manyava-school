import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const path of ['/documents/', '/transparency/']) {
  test(`${path} не має автоматично виявлених порушень доступності`, async ({ page }) => {
    await page.goto(path);

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

test('фільтри каталогу доступні з клавіатури при вузькому viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/documents/');

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);

  await page.getByRole('searchbox', { name: 'Назва' }).focus();
  await expect(page.getByRole('searchbox', { name: 'Назва' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByLabel('Категорія')).toBeFocused();
});

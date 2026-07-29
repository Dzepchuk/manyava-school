import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('основні сторінки US1 доступні при вузькому viewport і 200% reflow', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });

  for (const path of ['/', '/about/', '/contacts/', '/admission/', '/about/leadership/']) {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow, `Горизонтальне прокручування на ${path}`).toBe(false);

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, `Порушення доступності на ${path}`).toEqual([]);
  }
});

test('мобільне меню й skip-link доступні з клавіатури', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');

  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Манявський ліцей', exact: true })).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByText('Меню', { exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('navigation', { name: 'Основна навігація' })).toBeVisible();
});

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const path of ['/parents/', '/students/', '/bullying-prevention/']) {
  test(`${path} доступний на мобільному viewport`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(path);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

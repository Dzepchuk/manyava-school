import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Гуртки та позашкільні заняття', () => {
  test('показує обидва розклади та затверджені документи', async ({ page, request }) => {
    await page.goto('/students/clubs/');

    await expect(
      page.getByRole('heading', { level: 1, name: 'Гуртки та позашкільні заняття' }),
    ).toBeVisible();
    await expect(page.locator('section').first().locator('.club-card')).toHaveCount(10);
    await expect(page.locator('section').nth(1).locator('.club-card')).toHaveCount(2);
    await expect(page.getByText('Четвер · 16:15–18:15')).toHaveCount(2);
    await expect(
      page.getByText('Субота · практичні заняття, екскурсії та походи; час не зазначено'),
    ).toHaveCount(2);

    for (const path of [
      '/documents/clubs-schedule-2026-2027.pdf',
      '/documents/extracurricular-clubs-schedule-2026-2027.pdf',
    ]) {
      await expect(page.locator(`a[href="${path}"]`)).toBeVisible();
      const response = await request.get(path);
      expect(response.ok()).toBe(true);
      expect(response.headers()['content-type']).toContain('application/pdf');
    }
  });

  test('доступна з розділів для учнів і батьків', async ({ page }) => {
    for (const path of ['/students/', '/parents/']) {
      await page.goto(path);
      await expect(page.getByRole('link', { name: /Гуртки/ })).toHaveAttribute(
        'href',
        '/students/clubs/',
      );
    }
  });

  test('не має порушень доступності або горизонтального переповнення', async ({ page }) => {
    await page.goto('/students/clubs/');
    const accessibility = await new AxeBuilder({ page }).analyze();
    expect(accessibility.violations).toEqual([]);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflow).toBe(false);
  });
});

import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Сторінка харчування', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/parents/meals/');
  });

  test('показує чотириденний цикл, страви, графік і документи', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: 'Харчування учнів' })).toBeVisible();
    await expect(page.getByText('Після четвертого дня меню')).toBeVisible();
    await expect(
      page.getByRole('list', { name: 'Чотириденне ротаційне меню' }).locator(':scope > li'),
    ).toHaveCount(4);
    await expect(page.getByText('Пюре картопляне')).toBeVisible();
    await expect(page.getByText('Нагетси курячі')).toBeVisible();
    await expect(page.getByText('Рис розсипчастий')).toBeVisible();
    await expect(page.getByText('Узвар зі суміші сухофруктів')).toBeVisible();
    await expect(page.getByText('Гречка розсипчаста з маслом')).toBeVisible();
    await expect(page.getByText('Понеділок')).toHaveCount(0);
    await expect(page.getByText('5–7 класи')).toBeVisible();
    await expect(page.getByText('9:35–9:50')).toBeVisible();

    await expect(page.getByRole('link', { name: /Переглянути документ-джерело/ })).toHaveAttribute(
      'href',
      '/documents/four-week-autumn-menu-2026-2027.pdf',
    );
    await expect(
      page.getByRole('link', { name: /Завантажити затверджений графік/ }),
    ).toHaveAttribute('href', '/documents/student-meal-schedule.pdf');
    await expect(page.locator('.gallery img')).toHaveCount(4);
  });

  test('не має критичних порушень доступності або горизонтального переповнення', async ({
    page,
  }) => {
    const accessibility = await new AxeBuilder({ page }).analyze();
    expect(accessibility.violations).toEqual([]);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflow).toBe(false);
  });
});

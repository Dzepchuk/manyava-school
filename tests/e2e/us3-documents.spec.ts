import { expect, test } from '@playwright/test';

test('каталог документів має пошук, фільтри й чесний порожній стан', async ({ page }) => {
  await page.goto('/documents/');

  await expect(page.getByRole('heading', { level: 1, name: 'Офіційні документи' })).toBeVisible();
  await expect(page.getByRole('searchbox', { name: 'Назва' })).toBeVisible();
  await expect(page.getByLabel('Категорія')).toBeVisible();
  await expect(page.getByLabel('Рік')).toBeVisible();
  await expect(
    page.getByRole('heading', { level: 2, name: 'Каталог готується до наповнення' }),
  ).toBeVisible();
  await expect(page.getByText(/не показуємо неперевірені файли/i)).toBeVisible();
});

test('сторінка прозорості не подає непідтверджені вимоги як законодавчі', async ({ page }) => {
  await page.goto('/transparency/');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Прозорість та обов’язкові публікації' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { level: 2, name: 'Нормативний реєстр очікує затвердження' }),
  ).toBeVisible();
});

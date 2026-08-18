import { expect, test } from '@playwright/test';

test('каталог документів публікує статут і стратегію розвитку', async ({ page }) => {
  await page.goto('/documents/');

  await expect(page.getByRole('heading', { level: 1, name: 'Офіційні документи' })).toBeVisible();
  await expect(page.getByRole('searchbox', { name: 'Назва' })).toBeVisible();
  await expect(page.getByLabel('Категорія')).toBeVisible();
  await expect(page.getByLabel('Рік')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Статут Манявського ліцею' })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Стратегія розвитку Манявського ліцею на 2022–2029 роки' }),
  ).toBeVisible();
  await expect(page.getByText('Знайдено документів: 2')).toBeVisible();

  await page.getByRole('link', { name: 'Статут Манявського ліцею' }).click();
  await expect(
    page.getByRole('heading', { level: 1, name: 'Статут Манявського ліцею' }),
  ).toBeVisible();
  await expect(page.getByText('23805692', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Завантажити документ' })).toHaveAttribute(
    'href',
    '/documents/statut-maniavskoho-litseiu-2026.pdf',
  );
});

test('стратегія розвитку має доступний опис і посилання на оригінальний PDF', async ({ page }) => {
  await page.goto('/documents/stratehiia-rozvytku-maniavskoho-litseiu/');

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Стратегія розвитку Манявського ліцею на 2022–2029 роки',
    }),
  ).toBeVisible();
  await expect(page.getByText('31 серпня 2022 р.', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Завантажити документ' })).toHaveAttribute(
    'href',
    '/documents/stratehiia-rozvytku-maniavskoho-litseiu-2022-2029.pdf',
  );
});

test('сторінка прозорості не подає непідтверджені вимоги як законодавчі', async ({ page }) => {
  await page.goto('/transparency/');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Прозорість та обов’язкові публікації' }),
  ).toBeVisible();
  await expect(page.getByText('Підтверджено', { exact: true })).toBeVisible();
  await expect(
    page.getByRole('heading', {
      level: 2,
      name: 'Прозорість та інформаційна відкритість закладу освіти',
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: '/documents/statut-maniavskoho-litseiu/' }),
  ).toHaveAttribute('href', '/documents/statut-maniavskoho-litseiu/');
});

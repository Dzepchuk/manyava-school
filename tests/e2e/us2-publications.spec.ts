import { expect, test } from '@playwright/test';

test('новина доступна зі списку та має окрему сторінку', async ({ page }) => {
  await page.goto('/news/');
  await expect(page.getByRole('heading', { level: 1, name: 'Новини ліцею' })).toBeVisible();

  const link = page.getByRole('link', {
    name: 'Офіційний сайт Манявського ліцею готується до запуску',
  });
  await link.click();

  await expect(page).toHaveURL('/news/ofitsiinyi-sait-hotuietsia-do-zapusku/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('готується до запуску');
  await expect(page.getByRole('img', { name: 'Будівля Манявського ліцею' })).toBeVisible();
});

test('новина про правила доступу містить перевірене нормативне джерело', async ({ page }) => {
  await page.goto('/news/');

  const link = page.getByRole('link', {
    name: 'Нові правила доступу до закладів освіти: що важливо знати',
  });
  await expect(link).toBeVisible();
  await link.click();

  await expect(page).toHaveURL('/news/novi-pravyla-dostupu-do-litseiu/');
  await expect(
    page.getByRole('heading', { level: 2, name: 'Як організовано вхід до ліцею' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'базі законодавства Верховної Ради України' }),
  ).toHaveAttribute('href', 'https://zakon.rada.gov.ua/laws/show/z0436-26#Text');
});

test('календар подій має актуальний список та архів', async ({ page }) => {
  await page.goto('/events/');
  await expect(page.getByRole('heading', { level: 1, name: 'Події ліцею' })).toBeVisible();
  await expect(page.getByText('Наразі немає підтверджених майбутніх подій.')).toBeVisible();

  await page.getByRole('link', { name: 'Архів подій' }).click();
  await expect(page).toHaveURL('/events/archive/');
  await expect(page.getByRole('heading', { level: 1, name: 'Архів подій' })).toBeVisible();
});

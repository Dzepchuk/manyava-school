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

test('календар подій має актуальний список та архів', async ({ page }) => {
  await page.goto('/events/');
  await expect(page.getByRole('heading', { level: 1, name: 'Події ліцею' })).toBeVisible();
  await expect(page.getByText('Наразі немає підтверджених майбутніх подій.')).toBeVisible();

  await page.getByRole('link', { name: 'Архів подій' }).click();
  await expect(page).toHaveURL('/events/archive/');
  await expect(page.getByRole('heading', { level: 1, name: 'Архів подій' })).toBeVisible();
});

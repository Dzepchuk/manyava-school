import { expect, test } from '@playwright/test';

test('головна розповідає про ліцей замість технічних принципів сайту', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { level: 2, name: 'Освіта, розвиток і спільнота в серці Маняви' }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Освітній шлях' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Безпечне середовище' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Разом із громадою' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Дізнатися більше про ліцей' })).toHaveAttribute(
    'href',
    '/about/',
  );

  await expect(page.getByText('Mobile-first')).toHaveCount(0);
  await expect(page.getByText('Швидко. Доступно. Відповідально.')).toHaveCount(0);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);
});

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const path of [
  '/news/',
  '/news/archive/',
  '/news/ofitsiinyi-sait-hotuietsia-do-zapusku/',
  '/notices/',
  '/notices/archive/',
  '/events/',
  '/events/archive/',
]) {
  test(`${path} не має автоматично виявлених порушень доступності`, async ({ page }) => {
    await page.goto(path);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
}

test('картка новини та її змістове зображення доступні з клавіатури й скринридера', async ({
  page,
}) => {
  await page.goto('/news/');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible();

  const image = page.getByRole('img', { name: 'Будівля Манявського ліцею' });
  await expect(image).toHaveAttribute('alt', 'Будівля Манявського ліцею');
});

import { expect, test } from '@playwright/test';

test('/admin/ має доступний noindex shell без production credentials', async ({ page }) => {
  // Astro dev не виконує directory-index для public/, тому локально перевіряємо
  // той самий файл явно. Netlify обслуговує його за канонічним /admin/.
  const response = await page.goto('/admin/index.html');
  expect(response?.ok()).toBe(true);

  await expect(page).toHaveTitle('Редактор сайту — Манявський ліцей');
  await expect(page.locator('html')).toHaveAttribute('lang', 'uk');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.locator('script[src]')).toHaveAttribute(
    'src',
    'https://unpkg.com/decap-cms@3.15.1/dist/decap-cms.js',
  );

  const html = await page.content();
  expect(html).not.toMatch(/client_secret|access_token|private_key/i);
});

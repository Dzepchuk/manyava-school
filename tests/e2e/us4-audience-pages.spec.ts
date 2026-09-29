import { expect, test } from '@playwright/test';

test('батьки знаходять вступ і тематичні сторінки з hub', async ({ page }) => {
  await page.goto('/parents/');

  await expect(page.getByRole('heading', { level: 1, name: 'Інформація для родин' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Вступ до ліцею/ })).toHaveAttribute(
    'href',
    '/admission/',
  );
  await expect(page.getByRole('link', { name: /Харчування/ })).toHaveAttribute(
    'href',
    '/parents/meals/',
  );
});

test('учень знаходить безпечний канал повідомлення про булінг', async ({ page }) => {
  await page.goto('/students/');

  await expect(
    page.getByRole('heading', { level: 2, name: 'Як повідомити про булінг або небезпеку' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: '+380 97 236 78 52' })).toHaveAttribute(
    'href',
    'tel:+380972367852',
  );
  await expect(page.getByRole('link', { name: 'manyavanvk@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:manyavanvk@gmail.com',
  );

  await page.goto('/bullying-prevention/');
  await expect(page.getByRole('heading', { level: 1, name: 'Протидія булінгу' })).toBeVisible();
  await expect(page.getByText(/немає відкритої форми звернень/i)).toBeVisible();
});

test('на сторінці безпеки доступні презентація та Кібер Брама', async ({ page, request }) => {
  await page.goto('/parents/safety/');

  await expect(page.getByRole('heading', { level: 2, name: 'Безпека в інтернеті' })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'презентації «Як забезпечити себе в мережі Інтернет»' }),
  ).toHaveAttribute('href', '/documents/bezpeka-v-interneti.pdf');
  await expect(page.getByRole('link', { name: '«Кібер Брама»' })).toHaveAttribute(
    'href',
    'https://stopfraud.gov.ua/cybersecurity-in-life/shahrajski-shemy',
  );

  const response = await request.get('/documents/bezpeka-v-interneti.pdf');
  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toContain('application/pdf');
  expect((await response.body()).length).toBe(5360967);
});

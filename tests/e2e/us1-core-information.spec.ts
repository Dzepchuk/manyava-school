import { expect, test } from '@playwright/test';

test('контакти, відомості про ліцей і вступ доступні з головної за один перехід', async ({
  page,
}) => {
  await page.goto('/');

  const destinations = [
    {
      name: 'Дізнатися більше про ліцей',
      path: '/about/',
      heading: 'Ліцей, що зростає разом із Манявою',
    },
    {
      name: 'Вступ до ліцею',
      path: '/admission/',
      heading: 'Вступ до ліцею',
    },
    {
      name: 'Контакти ліцею',
      path: '/contacts/',
      heading: 'Контакти ліцею',
    },
  ];

  for (const destination of destinations) {
    await page.goto('/');
    const link = page.getByRole('link', { name: destination.name, exact: true });
    await expect(link).toHaveAttribute('href', destination.path);
    await link.click();
    await expect(page).toHaveURL(destination.path);
    await expect(page.getByRole('heading', { level: 1, name: destination.heading })).toBeVisible();
  }
});

test('сторінки вступу й керівництва мають breadcrumb та review metadata', async ({ page }) => {
  for (const destination of [
    { path: '/admission/', heading: 'Вступ до ліцею' },
    { path: '/about/leadership/', heading: 'Керівництво ліцею' },
  ]) {
    await page.goto(destination.path);
    await expect(page.getByRole('heading', { level: 1, name: destination.heading })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Навігаційний шлях' })).toBeVisible();
    await expect(page.getByText('Відповідальний за зміст')).toBeVisible();
    await expect(page.getByText('Перевірено')).toBeVisible();
  }
});

test('сторінка керівництва показує директорку та заступниць', async ({ page }) => {
  await page.goto('/about/leadership/');

  await expect(
    page.getByRole('heading', { level: 2, name: 'Директор', exact: true }),
  ).toBeVisible();
  await expect(page.getByText('Мельник Наталія Володимирівна')).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Заступники директора' })).toBeVisible();
  await expect(page.getByText('Варварук Галина Василівна')).toBeVisible();
  await expect(page.getByText('Гаванюк Наталія Романівна')).toBeVisible();
  await expect(page.getByText(/заступник директора з навчально-виховної роботи/i)).toHaveCount(2);
});

test('невідомий маршрут показує доступні наступні кроки', async ({ page }) => {
  const response = await page.goto('/missing-school-page/');

  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1, name: 'Сторінку не знайдено' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'На головну' })).toHaveAttribute('href', '/');
  await expect(page.getByRole('link', { name: 'Контакти ліцею' })).toHaveAttribute(
    'href',
    '/contacts/',
  );
});

test('навігація відкриває сторінку керівництва на desktop і mobile', async ({ page }) => {
  await page.goto('/');

  if ((page.viewportSize()?.width ?? 0) <= 928) {
    await page.locator('.mobile-navigation > summary').click();
    await page
      .locator('.mobile-accordion > li > details > summary')
      .filter({ hasText: 'Про ліцей' })
      .click();
    await page.locator('.mobile-list').getByRole('link', { name: 'Керівництво' }).click();
  } else {
    await page.locator('.desktop-navigation summary').filter({ hasText: 'Про ліцей' }).click();
    await page
      .locator('.desktop-navigation details')
      .filter({ hasText: 'Про ліцей' })
      .getByRole('link', { name: 'Керівництво' })
      .click();
  }

  await expect(page).toHaveURL('/about/leadership/');
  await expect(page.getByRole('heading', { level: 1, name: 'Керівництво ліцею' })).toBeVisible();
});

test('desktop навігація тримає відкритим лише одне меню', async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) <= 928, 'Перевірка desktop навігації');
  await page.goto('/');

  const about = page.locator('.desktop-navigation > .root-list > li > details').filter({
    has: page.locator('summary', { hasText: 'Про ліцей' }),
  });
  const news = page.locator('.desktop-navigation > .root-list > li > details').filter({
    has: page.locator('summary', { hasText: 'Новини' }),
  });

  await about.locator(':scope > summary').click();
  await expect(about).toHaveAttribute('open', '');

  await news.locator(':scope > summary').click();
  await expect(news).toHaveAttribute('open', '');
  await expect(about).not.toHaveAttribute('open', '');
});

test('mobile навігація використовує single-open accordion', async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) > 928, 'Перевірка mobile навігації');
  await page.goto('/');

  await page.locator('.mobile-navigation > summary').click();
  const about = page.locator('.mobile-accordion > li > details').filter({
    has: page.locator('summary', { hasText: 'Про ліцей' }),
  });
  const news = page.locator('.mobile-accordion > li > details').filter({
    has: page.locator('summary', { hasText: 'Новини' }),
  });

  await about.locator(':scope > summary').click();
  await expect(about).toHaveAttribute('open', '');
  await expect(about.getByRole('link', { name: 'Огляд розділу Про ліцей' })).toBeVisible();

  await news.locator(':scope > summary').click();
  await expect(news).toHaveAttribute('open', '');
  await expect(about).not.toHaveAttribute('open', '');
});

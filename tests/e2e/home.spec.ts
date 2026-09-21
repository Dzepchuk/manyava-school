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

test('підвал фіксується на desktop і прокручується разом зі сторінкою на телефоні', async ({
  page,
}) => {
  await page.goto('/');

  const layout = await page.evaluate(async () => {
    const footer = document.querySelector('.site-footer');

    if (!footer) throw new Error('Не знайдено підвал');

    const beforeScroll = footer.getBoundingClientRect();
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const afterScroll = footer.getBoundingClientRect();

    return {
      afterBottom: afterScroll.bottom,
      afterTop: afterScroll.top,
      beforeBottom: beforeScroll.bottom,
      beforeTop: beforeScroll.top,
      bodyBottomPadding: Number.parseFloat(getComputedStyle(document.body).paddingBottom),
      footerHeight: afterScroll.height,
      position: getComputedStyle(footer).position,
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
    };
  });

  if (layout.viewportWidth <= 640) {
    expect(layout.position).toBe('static');
    expect(layout.bodyBottomPadding).toBe(0);
    expect(layout.beforeBottom).toBeGreaterThan(layout.viewportHeight);
    expect(layout.afterBottom).toBeCloseTo(layout.viewportHeight, 0);
    expect(layout.afterTop).toBeLessThan(layout.beforeTop);
    return;
  }

  expect(layout.position).toBe('fixed');
  expect(layout.beforeBottom).toBeCloseTo(layout.viewportHeight, 0);
  expect(layout.afterBottom).toBeCloseTo(layout.viewportHeight, 0);
  expect(layout.afterTop).toBeCloseTo(layout.beforeTop, 0);
  expect(layout.bodyBottomPadding).toBeGreaterThanOrEqual(layout.footerHeight);
});

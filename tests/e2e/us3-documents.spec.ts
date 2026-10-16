import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

test('каталог документів публікує дванадцять офіційних документів', async ({ page }) => {
  await page.goto('/documents/');

  await expect(page.getByRole('heading', { level: 1, name: 'Офіційні документи' })).toBeVisible();
  await expect(page.getByRole('searchbox', { name: 'Назва' })).toBeVisible();
  await expect(page.getByLabel('Категорія')).toBeVisible();
  await expect(page.getByLabel('Рік')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Статут Манявського ліцею' })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Стратегія розвитку Манявського ліцею на 2022–2029 роки' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', {
      name: 'Освітня програма Манявського ліцею на 2026–2027 навчальний рік',
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Виписка з Єдиного державного реєстру від 3 серпня 2026 року' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', {
      name: 'Свідоцтво про атестацію Манявського навчально-виховного комплексу',
    }),
  ).toBeVisible();
  await expect(page.getByText('Знайдено документів: 12')).toBeVisible();

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

for (const slug of [
  'pravyla-dostupu-do-litseiu',
  'pravyla-vnutrishnoho-trudovoho-rozporiadku',
  'polozhennia-pro-vebsait',
  'polozhennia-pro-indyvidualnu-formu-osvity',
  'polozhennia-pro-rozghliad-vypadkiv-bulinhu',
  'polozhennia-pro-zapobihannia-nasylstvu',
  'polozhennia-pro-doshkilnyi-pidrozdil',
]) {
  test(`${slug}: документ має доступний опис і повний PDF`, async ({ page, request }) => {
    await page.goto(`/documents/${slug}/`);

    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).not.toBeEmpty();
    await expect(page.getByRole('heading', { level: 2, name: 'Доступний опис' })).toBeVisible();
    await expect(page.locator('article .summary')).toBeVisible();
    await expect(page.locator('article .summary')).not.toBeEmpty();

    const download = page.getByRole('link', { name: 'Завантажити документ' });
    await expect(download).toBeVisible();
    await expect(download).toHaveAttribute('download', '');
    await expect(download).toHaveAttribute('href', /^\/documents\/[^/]+\.pdf$/);
    const filePath = (await download.getAttribute('href'))!;
    const response = await request.get(filePath);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('application/pdf');

    const body = await response.body();
    expect(body.subarray(0, 5).toString()).toBe('%PDF-');
    expect(body).toEqual(await readFile(resolve('public', `.${filePath}`)));
  });
}

test('освітня програма має опис і доступний PDF', async ({ page, request }) => {
  await page.goto('/documents/osvitnia-prohrama-2026-2027/');

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Освітня програма Манявського ліцею на 2026–2027 навчальний рік',
    }),
  ).toBeVisible();
  await expect(page.getByText('31 серпня 2026 р.', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Завантажити документ' })).toHaveAttribute(
    'href',
    '/documents/osvitnia-prohrama-2026-2027.pdf',
  );

  const response = await request.get('/documents/osvitnia-prohrama-2026-2027.pdf');
  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toContain('application/pdf');
  expect((await response.body()).length).toBe(390488);
});

test('виписка з ЄДР і архівне свідоцтво мають правильні статуси та файли', async ({ page }) => {
  await page.goto('/documents/vypyska-z-yedr-2026/');
  await expect(page.getByText('23805692', { exact: true })).toBeVisible();
  await expect(page.getByText('Чинний', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Завантажити документ' })).toHaveAttribute(
    'href',
    '/documents/vypyska-z-yedr-maniavskoho-litseiu-2026.pdf',
  );

  await page.goto('/documents/svidotstvo-pro-atestatsiiu-2014/');
  await expect(page.getByText('Архівний', { exact: true })).toBeVisible();
  await expect(
    page.getByText(
      'Свідоцтво публікується як архівне підтвердження атестації закладу в попередній організаційній формі. Строк його дії завершився, тому документ не подається як підтвердження чинної атестації ліцею.',
      { exact: true },
    ),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Завантажити документ' })).toHaveAttribute(
    'href',
    '/documents/svidotstvo-pro-atestatsiiu-2014.pdf',
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

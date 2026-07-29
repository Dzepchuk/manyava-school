import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    (
      window as typeof window & {
        __PAGEFIND_TEST__: {
          search(query: string): Promise<{
            results: { data(): Promise<Record<string, unknown>> }[];
          }>;
        };
      }
    ).__PAGEFIND_TEST__ = {
      async search(query) {
        if (query.toLocaleLowerCase('uk').includes('вступ')) {
          return {
            results: [
              {
                async data() {
                  return {
                    url: '/admission/',
                    excerpt: 'Основна інформація про <mark>вступ</mark> до ліцею.',
                    meta: {
                      title: 'Вступ до ліцею',
                      type: 'Сторінка',
                      date: '2026-07-29',
                    },
                  };
                },
              },
            ],
          };
        }
        return { results: [] };
      },
    };
  });
});

test('пошук показує тип, дату, контекст і оновлює query state', async ({ page }) => {
  await page.goto('/search/');

  const input = page.getByRole('searchbox', { name: 'Ключові слова' });
  await input.fill('вступ');
  await page.getByRole('button', { name: 'Знайти' }).click();

  await expect(page).toHaveURL('/search/?q=%D0%B2%D1%81%D1%82%D1%83%D0%BF');
  await expect(page.getByRole('link', { name: 'Вступ до ліцею' })).toHaveAttribute(
    'href',
    '/admission/',
  );
  await expect(page.getByText('Сторінка · 2026-07-29')).toBeVisible();
  await expect(page.getByText('Основна інформація про вступ до ліцею.')).toBeVisible();
  await expect(page.getByText('Знайдено результатів: 1')).toBeVisible();
});

test('пошук без результатів пропонує безпечні наступні кроки', async ({ page }) => {
  await page.goto('/search/?q=невідомийматеріал');

  await expect(page.getByRole('heading', { level: 2, name: 'Нічого не знайдено' })).toBeVisible();
  await expect(
    page.getByRole('region', { name: 'Пошук на сайті' }).getByRole('link', { name: 'Контакти' }),
  ).toHaveAttribute('href', '/contacts/');
});

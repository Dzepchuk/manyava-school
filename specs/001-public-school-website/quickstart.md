# Quickstart перевірки

Цей документ описує очікувану наскрізну перевірку після реалізації. Він не
замінює `tasks.md`.

## Передумови

- Node.js ≥ 22.12, парна LTS;
- npm, що постачається з Node;
- доступ до repository для локального clone;
- для CMS workflow: окремі тестові GitHub accounts із ролями Admin і Write;
- preview site у Netlify.

## Локальний запуск

```bash
npm ci
npm run dev
```

Очікування:

- локальна адреса відкриває головну українською;
- `/admin/` завантажує CMS shell;
- публічні сторінки не потребують authentication.

## Повна локальна перевірка

```bash
npm run format:check
npm run lint
npm run check
npm run test
npm run build
npm run test:e2e
```

`npm run build` повинен:

1. validate content schemas;
2. reject unsafe Markdown/media/document metadata;
3. build static Astro output;
4. generate sitemap/RSS/robots;
5. create Pagefind index only from public content.

## Scenario A — Публікація новини

1. EditorApprover входить у preview `/admin/`.
2. Створює новину з title, description, body, owner, dates і ліцензованим image.
3. Зберігає Draft.
4. Перевіряє pull request і preview.
5. Публікує після green quality gates.
6. Перевіряє production news list/detail/search.

Очікування:

- draft не доступний у production/search/sitemap;
- preview показує draft;
- missing alt або media licence блокує publish;
- після merge новина має canonical URL, date, metadata й доступний content.

## Scenario B — Офіційний документ

1. Створити confirmed LegalPublication fixture.
2. Додати Document із category, date, file, accessible summary і link на
   LegalPublication.
3. Переконатися, що broken/missing metadata блокує build.
4. Опублікувати valid document.
5. Перевірити catalog filter, detail, download, search і transparency page.

## Scenario C — Доступність

- пройти header/navigation/news/document/search лише клавіатурою;
- перевірити visible focus і logical order;
- масштабувати до 200%;
- запустити Playwright + axe;
- виконати screen-reader smoke test;
- перевірити reduced motion і mobile viewport.

Критерій: zero critical/high automated violations та відсутність блокуючих
ручних бар'єрів.

## Scenario D — Ролі

- EditorApprover може створювати й публікувати content;
- EditorApprover не може змінювати repository users, OAuth або secrets;
- TechnicalAdministrator може додати test editor, а потім revoke access;
- жоден flow не використовує shared account.

## Scenario E — Failure and recovery

1. Змоделювати failed preview build — production не змінюється.
2. Змоделювати unavailable external link — core content працює.
3. Revert останній content commit і розгорнути попередню version.
4. Відновити repository/content із independent backup.

Критерій: recovery ≤ 4 години, втрата confirmed content ≤ 24 години.

## Production acceptance

- domain і HTTPS підтверджені;
- legal publication registry затверджений;
- стартові news/documents approved;
- media rights register complete;
- privacy/security/accessibility audits accepted;
- director отримав коротку інструкцію й успішно опублікував training draft;
- backup restore drill documented.

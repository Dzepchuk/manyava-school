# План реалізації: Публічний сайт Манявського ліцею

**Branch**: `001-public-school-website` | **Date**: 2026-07-29 |
**Spec**: [spec.md](./spec.md)

**Input**: продуктова специфікація
`specs/001-public-school-website/spec.md`

## Резюме

Створити швидкий статичний сайт українською мовою на Astro з контентом у
типізованих Markdown/YAML/JSON-файлах. Директор працює через вебінтерфейс Decap
CMS, а зміни проходять Git-based editorial workflow у GitHub. Публічна частина
не має runtime-бази даних і серверних форм. Пошук генерується під час складання
через Pagefind. Netlify збирає preview для змін і автоматично розгортає
підтверджений `main`.

Перший вертикальний зріз: головна → список новин → сторінка новини → створення
чернетки директором → preview → затвердження → публікація → автоматичні
перевірки доступності й розгортання.

## Технічний контекст

**Мова/версія**: TypeScript у strict mode; Node.js 22.12 або новіша парна LTS;
Astro 7.1.x

**Основні залежності**: Astro, Decap CMS, Pagefind, `@astrojs/sitemap`,
Playwright, `@axe-core/playwright`, Vitest

**Зберігання**: Git-репозиторій; Markdown для текстового контенту, YAML/JSON для
довідників і налаштувань, звичайні файли для дозволених зображень і документів;
runtime-база даних відсутня

**Тестування**: `astro check`, Vitest, Playwright, axe-core, Lighthouse CI або
еквівалентна перевірка Web Vitals, перевірка посилань і контентних схем

**Цільова платформа**: сучасні мобільні й десктопні браузери; статичне
розгортання на Netlify з GitHub integration і custom domain

**Тип проєкту**: content-driven static web application із Git-based CMS

**Цілі продуктивності**: LCP ≤ 2,5 с, INP ≤ 200 мс, CLS ≤ 0,1 на 75-му
перцентилі; перші результати пошуку ≤ 2 с для 95% контрольних запитів

**Обмеження**: українська мова; mobile-first; WCAG 2.2 AA як інженерна ціль;
масштабування 200%; без вбудованих форм і АІКОМ у MVP; без автоматичного
перенесення старого сайту; тільки ліцензовані або дозволені медіа; відновлення
≤ 4 годин, втрата підтвердженого контенту ≤ 24 годин

**Масштаб MVP**: 2 користувачі CMS на старті з можливістю розширення; до 1 000
опублікованих контентних записів; не більше 10 МБ на окремий документ і 5 МБ на
вихідне зображення; цільовий сумарний обсяг медіа в Git ≤ 1 ГБ

## Constitution Check

*GATE: перевірено до Phase 0 і повторно після Phase 1.*

- [x] Законодавчі вимоги мають перевірені джерела або явно позначені
  припущення. Точний перелік публікацій винесено в окремий нормативний реєстр.
- [x] Рішення мінімізує персональні дані та враховує безпеку дітей. Публічний
  runtime не має бази персональних даних або форм.
- [x] Для кожної історії визначено критерії доступності. План включає axe,
  Playwright і ручні перевірки клавіатури та скринрідера.
- [x] Основні сценарії спроєктовано для мобільних пристроїв і слабкого
  з'єднання. Публічна частина є статичною і використовує мінімум JavaScript.
- [x] Регулярні операції з контентом не потребують зміни коду. Decap CMS надає
  редакторські форми для визначених колекцій.
- [x] Вимоги, критерії, задачі та тести мають відновлювані зв'язки.
  Ідентифікатори вимог переносяться в задачі й назви приймальних тестів.
- [x] Рішення є найпростішим достатнім і відтворювано розгортається. Окремий
  backend і runtime-база даних не створюються.

**Post-design re-check**: PASS. Контентні контракти, модель даних і workflow не
порушують принципів конституції.

## Архітектурне рішення

### Потік публікації

1. Директор входить у `/admin/` через GitHub OAuth.
2. Decap CMS створює гілку та pull request для чернетки.
3. Netlify створює preview deployment.
4. Директор перевіряє зміст і preview; технічний адміністратор контролює
   автоматичні quality gates.
5. Після затвердження pull request зливається в `main`.
6. Netlify запускає перевірки, складає Astro-сайт, створює Pagefind index і
   розгортає production.
7. Попередня версія залишається в Git і deployment history та може бути
   відновлена revert-операцією.

### Межі компонентів

- **Astro public site**: маршрути, шаблони, доступність, SEO, RSS, sitemap і
  відображення лише опублікованого контенту.
- **Content layer**: схеми, валідація, стани, зв'язки, правила дат і медіа.
- **Decap CMS**: українські редакторські форми, editorial workflow, media
  library та preview links.
- **Pagefind**: статичний індекс лише публічного `main`-контенту.
- **GitHub**: ролі, історія, pull requests, аудит змін і резервна копія.
- **Netlify**: OAuth для CMS, preview builds, production build і custom domain.

## Проєктна структура

### Документація функції

```text
specs/001-public-school-website/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── content-schema.md
│   ├── cms-workflow.md
│   └── route-map.md
└── tasks.md
```

### Код

```text
/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── netlify.toml
├── public/
│   ├── admin/
│   │   ├── index.html
│   │   └── config.yml
│   ├── documents/
│   ├── media/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── content/
│   │   ├── navigation/
│   │   └── search/
│   ├── content/
│   │   ├── documents/
│   │   ├── events/
│   │   ├── news/
│   │   ├── notices/
│   │   └── pages/
│   ├── data/
│   │   ├── legal-publications.yml
│   │   ├── navigation.yml
│   │   └── site.yml
│   ├── layouts/
│   ├── lib/
│   │   ├── content/
│   │   ├── dates/
│   │   ├── seo/
│   │   └── validation/
│   ├── pages/
│   │   ├── admin.astro
│   │   ├── documents/
│   │   ├── events/
│   │   ├── news/
│   │   ├── search.astro
│   │   └── [...slug].astro
│   ├── styles/
│   └── content.config.ts
└── tests/
    ├── accessibility/
    ├── content/
    ├── e2e/
    ├── fixtures/
    └── unit/
```

**Структурне рішення**: один Astro-проєкт. Публічний сайт, CMS-конфігурація й
контент зберігаються разом, бо це забезпечує атомарні preview, версіонування та
відновлення без окремої синхронізації систем.

## Правила безпеки й експлуатації

- `main` — єдине джерело production; прямі контентні зміни в production
  заборонені організаційним workflow.
- Власник проєкту отримує GitHub `Admin`, директор — `Write`; тільки `Admin`
  керує користувачами та repository settings.
- Кожен користувач має окремий GitHub-акаунт із MFA; спільні облікові записи
  заборонені.
- Secrets зберігаються лише в налаштуваннях GitHub/Netlify, не в репозиторії.
- `/admin/` має `noindex`, суворі security headers і не потрапляє в Pagefind.
- CMS не дозволяє довільні script/iframe/HTML-поля; збірка блокується при
  небезпечному HTML, URL або відсутніх обов'язкових полях.
- Документи перевіряються за дозволеним MIME/type, розміром і назвою файла.
- Ліцензія, джерело, авторство й alt є обов'язковими полями для стартових
  інтернет-зображень.
- GitHub є основною резервною копією контенту; щоденний mirror/export до
  окремого сховища додається до production readiness.

## CI та quality gates

Кожен pull request повинен пройти:

1. встановлення залежностей із lockfile;
2. formatting і lint;
3. `astro check`;
4. валідацію контентних схем, нормативного реєстру, посилань і медіаліцензій;
5. unit tests;
6. production build;
7. Pagefind indexing;
8. Playwright для ключових сценаріїв;
9. axe для автоматично виявлюваних WCAG-порушень;
10. performance budget для ключових сторінок.

Ручне приймання перед production:

- навігація лише клавіатурою;
- масштаб 200%;
- скринрідер для головної, новини, документа, пошуку й CMS workflow;
- перевірка мобільних viewport;
- юридичне й редакторське затвердження стартових документів та медіа;
- контрольне відновлення попереднього контентного commit.

## Фази реалізації

### Phase A — Foundation

Astro skeleton, design tokens, базові layout і navigation, content schemas, CI,
Netlify preview, security headers.

### Phase B — Перший вертикальний зріз

Головна, news collection, список і detail, Decap editor, editorial workflow,
preview, publish, accessibility та deployment.

### Phase C — Офіційні документи

Document collection, legal publication registry, категорії, фільтри, метадані,
доступне представлення та архів версій.

### Phase D — Решта MVP

Notices, events, тематичні сторінки, contacts, search, SEO, sitemap, RSS,
privacy-friendly analytics.

### Phase E — Production readiness

Контентне наповнення, ліцензійний реєстр медіа, backup restore drill,
редакторське навчання, ручний accessibility audit і запуск домену.

## Complexity Tracking

| Відхилення | Чому потрібне | Простішу альтернативу відхилено, бо |
|---|---|---|
| Decap CMS потребує OAuth | Директору потрібен безпечний вебредактор із власним акаунтом | Редагування Markdown або GitHub UI не відповідає вимозі простого адміністрування |
| Netlify замість чистого GitHub Pages | Потрібні CMS OAuth і preview deployments без власного сервера | Окремий OAuth proxy для GitHub Pages або Cloudflare збільшує код і операційний ризик |

Інших порушень конституції немає.

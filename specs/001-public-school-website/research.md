# Дослідження технічних рішень

**Feature**: `001-public-school-website`

**Date**: 2026-07-29

## 1. Архітектура публічного сайту

**Decision**: Astro 7.1 у режимі статичної генерації з TypeScript strict.

**Rationale**:

- сайт є переважно контентним і не потребує runtime backend;
- Astro за замовчуванням підтримує повністю статичний output;
- content collections разом зі схемами забезпечують build-time validation;
- мінімум клієнтського JavaScript допомагає mobile performance й доступності;
- sitemap, canonical URLs, RSS і image optimization мають стандартні рішення.

**Alternatives considered**:

- Next.js: значно більша runtime і client-side складність без потреби MVP;
- WordPress: зручний редактор, але вимагає постійного runtime, оновлень,
  database backup і більшого security maintenance;
- звичайний HTML: простий runtime, але слабка content model і незручна підтримка
  багатьох типів матеріалів.

**Sources**:

- [Astro configuration: static output](https://docs.astro.build/en/reference/configuration-reference/)
- [Astro 7.1 announcement](https://astro.build/blog/)
- [Astro content schemas](https://docs.astro.build/en/reference/modules/astro-zod/)

## 2. Керування контентом

**Decision**: Decap CMS із GitHub backend та `editorial_workflow`.

**Rationale**:

- контент залишається у власному GitHub-репозиторії;
- директор отримує браузерний редактор замість роботи з кодом;
- кожна чернетка створює окрему гілку й pull request;
- Git зберігає автора, історію змін і відновлювані версії;
- admin і editor розділяються GitHub repository roles;
- схема CMS може повторювати ті самі обов'язкові поля, що й content schemas.

**Constraints**:

- директору потрібен окремий GitHub-акаунт із `Write`;
- Decap GitHub backend потребує OAuth;
- усі CMS-користувачі повинні мати push access;
- Decap GitHub backend не підтримує Git LFS, тому медіа мають обмеження розміру
  й потребують майбутнього перегляду при зростанні.

**Alternatives considered**:

- зовнішня API-based headless CMS: добрий редактор, але додає vendor lock-in,
  окремі backup/export, pricing risk і синхронізацію preview;
- редагування GitHub-файлів напряму: менше компонентів, але неприйнятний UX для
  нетехнічного редактора;
- власна admin-панель: дублює CMS, потребує backend, authentication, database і
  значно більших security витрат.

**Sources**:

- [Decap CMS with Astro](https://docs.astro.build/en/guides/cms/decap-cms/)
- [Decap GitHub backend](https://decapcms.org/docs/github-backend/)
- [Decap editorial workflow](https://decapcms.org/docs/editorial-workflows/)
- [GitHub repository roles](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization)

## 3. Хостинг і OAuth

**Decision**: Netlify Git integration для MVP і production.

**Rationale**:

- Decap має прямий документований шлях GitHub authentication через Netlify;
- preview deployment створюється для pull requests;
- production автоматично збирається з `main`;
- static hosting не потребує обслуговування сервера чи database;
- custom domain і HTTPS керуються платформою.

**Alternatives considered**:

- Cloudflare Pages: сильний static hosting і Git previews, але для Decap потрібно
  створити й підтримувати власні OAuth routes;
- GitHub Pages: простий static hosting, але немає готового CMS OAuth і preview
  workflow такого рівня;
- self-hosted server: не відповідає принципу простоти й мінімальної
  інфраструктури.

**Operational note**: тариф, ліміти build minutes, bandwidth, identity/OAuth і
правила fair use MUST бути повторно перевірені безпосередньо перед production.
Архітектура не повинна залежати від безстрокової наявності безплатного тарифу.

**Sources**:

- [Netlify Deploy Previews](https://docs.netlify.com/deploy/deploy-types/deploy-previews/)
- [Decap external OAuth guidance](https://docs.astro.build/en/guides/cms/decap-cms/)
- [Cloudflare Pages Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/)

## 4. Пошук

**Decision**: Pagefind, згенерований після Astro build.

**Rationale**:

- не потребує search server або database;
- індексує готовий статичний HTML, отже не бачить CMS drafts;
- підтримує український UI;
- індекс завантажується частинами й підходить для слабких мобільних з'єднань;
- indexing можна обмежити основним змістом і типами матеріалів.

**Known limitation**: для української є переклад UI, але немає stemming.
Пошук перевіряється контрольним набором відмінків і синонімів; за потреби
використовуються редакторські keywords.

**Alternatives considered**:

- hosted search: краща морфологія, але додає зовнішній сервіс, ключі, privacy і
  pricing;
- власний search API: не виправданий масштабом MVP;
- простий client-side JSON index: більше власного коду й гірше масштабування.

**Sources**:

- [Pagefind overview](https://pagefind.app/docs/)
- [Pagefind Ukrainian support](https://pagefind.app/docs/multilingual/)
- [Pagefind indexing controls](https://pagefind.app/docs/indexing/)

## 5. Тестування й доступність

**Decision**: layered quality gates — schema validation, Vitest, Playwright,
axe-core, manual accessibility audit і Web Vitals budget.

**Rationale**:

- схеми блокують неповний або небезпечний контент до deployment;
- Vitest перевіряє чисті функції фільтрації, дат, URL і SEO;
- Playwright перевіряє незалежні користувацькі сценарії;
- axe автоматично виявляє частину WCAG-порушень;
- ручні keyboard/screen-reader/zoom перевірки потрібні, бо automation не
  покриває всю доступність;
- Core Web Vitals відповідають вимірюваним критеріям специфікації.

**Sources**:

- [Playwright web server testing](https://playwright.dev/docs/test-webserver)
- [Playwright accessibility testing](https://playwright.dev/docs/next/accessibility-testing)
- [Vitest TypeScript tests](https://vitest.dev/guide/learn/writing-tests.html)
- [Core Web Vitals thresholds](https://web.dev/articles/vitals)

## 6. Резервне копіювання і відновлення

**Decision**: GitHub є primary versioned store; Netlify зберігає deployment
history; production readiness додає автоматизований щоденний mirror/export до
окремого сховища та щоквартальний restore drill.

**Rationale**:

- кожна опублікована зміна є Git commit;
- revert відновлює контент і код разом;
- окрема копія захищає від видалення або втрати GitHub repository/account;
- restore drill перевіряє фактичну досяжність RTO/RPO, а не лише наявність
  backup.

**Alternatives considered**:

- лише GitHub: просто, але не є незалежною резервною копією;
- database backup: база даних у вибраній архітектурі відсутня;
- ручне архівування: не гарантує 24-годинний RPO.

## 7. Відкладені рішення

- Точний production domain.
- Актуальний нормативний реєстр обов'язкових публікацій.
- Privacy-friendly analytics provider або рішення відмовитися від analytics.
- Майбутня інтеграція АІКОМ.
- Перехід медіа в object storage, якщо Git наблизиться до встановлених меж.

Ці рішення не блокують Phase A–C, але domain і нормативний реєстр блокують
production launch.

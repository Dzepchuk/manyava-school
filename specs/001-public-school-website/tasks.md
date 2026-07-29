# Задачі: Публічний сайт Манявського ліцею

**Вхідні дані**: проєктні документи з
`specs/001-public-school-website/`

**Передумови**: `plan.md`, `spec.md`, `research.md`, `data-model.md`,
`contracts/`, `quickstart.md`

**Тести**: автоматизовані тести є обов'язковими для критичних сценаріїв,
контролю доступу, публікації контенту, доступності та захисту даних. У кожній
користувацькій історії тестові задачі виконуються до реалізації та спочатку
мають падати з очікуваної причини.

**Організація**: задачі згруповані за користувацькими історіями, щоб кожну
історію можна було реалізувати й перевірити як окремий інкремент.

## Формат: `[ID] [P?] [Story] Опис`

- **[P]**: задачу можна виконувати паралельно з іншими позначеними задачами,
  оскільки вони змінюють різні файли й не залежать від незавершеної роботи.
- **[Story]**: користувацька історія зі `spec.md`.
- Кожна задача містить точний шлях до файла або каталогу.

## Phase 1: Setup — каркас проєкту

**Мета**: створити відтворюване середовище Astro та базову структуру файлів.

- [x] T001 Ініціалізувати Astro 7.1.x проєкт із TypeScript strict у `package.json`, `astro.config.mjs` і `tsconfig.json`
- [x] T002 Додати зафіксовані залежності Astro, Pagefind, sitemap, Vitest, Playwright, axe-core і Lighthouse CI до `package.json` та `package-lock.json`; безпечний спосіб підключення Decap CMS визначити в T046 після усунення high-severity advisory його поточного npm-пакета
- [x] T003 [P] Налаштувати форматування, lint і перевірку Markdown/YAML у `eslint.config.js`, `.prettierrc.mjs` і `.prettierignore`
- [x] T004 [P] Створити структуру каталогів із placeholder-файлами в `src/components/`, `src/content/`, `src/data/`, `src/layouts/`, `src/lib/`, `src/pages/`, `src/styles/`, `public/admin/`, `public/documents/`, `public/media/` і `tests/`
- [x] T005 [P] Налаштувати команди `dev`, `check`, `test`, `test:e2e`, `build`, `index` і `validate` у `package.json`
- [x] T006 [P] Налаштувати Vitest і Playwright з локальним Astro web server у `vitest.config.ts` і `playwright.config.ts`
- [x] T007 [P] Додати правила ігнорування build output, локальних секретів і тестових артефактів у `.gitignore`
- [x] T008 Створити початкову Netlify-конфігурацію статичної збірки та Pagefind indexing у `netlify.toml`

**Checkpoint**: залежності встановлюються з lockfile, а порожній проєкт
відтворювано проходить базові команди.

---

## Phase 2: Foundation — спільні блокувальні компоненти

**Мета**: реалізувати основу, без якої не можна починати жодну користувацьку
історію.

**⚠️ КРИТИЧНО**: усі задачі цієї фази мають бути завершені до story phases.

- [x] T009 Створити спільні Zod-схеми `ContentStatus`, `ContentOwner`, `ReviewMetadata` і безпечних URL у `src/lib/validation/common.ts`
- [x] T010 [P] Реалізувати українські date/time formatters із timezone `Europe/Kyiv` у `src/lib/dates/format.ts`
- [x] T011 [P] Реалізувати canonical URL, title, description, Open Graph і robots helpers у `src/lib/seo/metadata.ts`
- [x] T012 [P] Створити mobile-first design tokens, видимий focus, reduced-motion і базові правила масштабу 200% у `src/styles/global.css`
- [x] T013 Створити семантичний базовий layout з `lang="uk"`, skip-link, header, main і footer у `src/layouts/BaseLayout.astro`
- [x] T014 [P] Створити доступні базові компоненти `Container`, `Breadcrumbs`, `ContentMeta`, `ExternalLink` і `Pagination` у `src/components/common/`
- [x] T015 Створити схеми `SiteSettings`, `NavigationItem` і `ContentOwner` у `src/lib/validation/site-data.ts`
- [x] T016 Створити валідні початкові налаштування, власників і трирівневу навігацію у `src/data/site.yml`, `src/data/owners.yml` і `src/data/navigation.yml`
- [x] T017 Реалізувати завантаження та build-blocking валідацію YAML-даних у `src/lib/content/load-site-data.ts`
- [x] T018 [P] Додати CSP, HSTS, Referrer-Policy, Permissions-Policy, MIME protection і правила `/admin/` у `public/_headers`
- [x] T019 [P] Налаштувати sitemap, canonical site URL placeholder і image service у `astro.config.mjs`
- [x] T020 Створити CI workflow з install, format, lint, Astro check, validation, unit tests, build, Pagefind, Playwright, axe і performance gates у `.github/workflows/ci.yml`

**Checkpoint**: foundation збирається, спільні дані валідовуються, layout
доступний із клавіатури, а CI запускає всі погоджені quality gates.

---

## Phase 3: User Story 1 — основна інформація про ліцей (Priority: P1)

**Мета**: відвідувач без авторизації знаходить відомості про ліцей, контакти,
керівництво та правила прийому не більше ніж за три змістовні переходи.

**Незалежна перевірка**: з головної сторінки на мобільному viewport відкрити
«Про ліцей», контакти й правила прийому; при масштабі 200% зміст читається без
горизонтального прокручування, а контакти працюють без зовнішньої карти.

### Тести User Story 1

- [x] T021 [P] [US1] Написати unit-тести валідації сторінок, site settings і navigation depth для FR-PAGE-001–003 та FR-CONTACT-001 у `tests/unit/site-data.test.ts`
- [x] T022 [P] [US1] Написати Playwright-сценарій пошуку контактів і правил прийому за ≤3 переходи у `tests/e2e/us1-core-information.spec.ts`
- [x] T023 [P] [US1] Написати accessibility-тест клавіатури, focus order і масштабу 200% для головної та контактів у `tests/accessibility/us1-core-information.spec.ts`

### Реалізація User Story 1

- [x] T024 [US1] Визначити колекцію `pages` з унікальним canonical path, review metadata і безпечним Markdown у `src/content.config.ts`
- [x] T025 [P] [US1] Додати затверджені placeholder-сторінки «Про ліцей», «Керівництво» і «Вступ» у `src/content/pages/`
- [x] T026 [P] [US1] Створити головну сторінку з основними маршрутами, контактним блоком і місцями для актуального контенту у `src/pages/index.astro`
- [x] T027 [P] [US1] Створити автономну контактну сторінку без форм і залежності від карти у `src/pages/contacts.astro`
- [x] T028 [US1] Реалізувати генерацію стабільних сторінок із breadcrumb і review metadata у `src/pages/[...slug].astro`
- [x] T029 [US1] Реалізувати desktop/mobile navigation із максимум трьома рівнями у `src/components/navigation/SiteNavigation.astro`
- [x] T030 [US1] Створити доступну сторінку 404 з основними переходами у `src/pages/404.astro`

**Checkpoint**: US1 повністю працює й перевіряється незалежно без CMS, пошуку
та зовнішніх сервісів.

---

## Phase 4: User Story 2 — новини, оголошення й події (Priority: P1)

**Мета**: відвідувач бачить актуальні новини, оголошення й події, їхні дати,
статус актуальності та повний зміст.

**Незалежна перевірка**: додати валідну новину у fixture, зібрати сайт,
переконатися, що вона перша у списку, має окрему сторінку, дату, повний текст і
доступне змістове зображення; прострочене оголошення й минула подія доступні
лише у відповідних архівах.

### Тести User Story 2

- [x] T031 [P] [US2] Написати unit-тести сортування новин, строку оголошень і поділу подій на майбутні/архівні для FR-NEWS-001, FR-NOTICE-001 і FR-EVENT-001–002 у `tests/unit/publications.test.ts`
- [x] T032 [P] [US2] Написати content contract tests обов'язкових полів, alt і унікальних slug для News, Notice та Event у `tests/content/publication-schemas.test.ts`
- [x] T033 [P] [US2] Написати Playwright-сценарій списку й detail новини та календаря подій у `tests/e2e/us2-publications.spec.ts`
- [x] T034 [P] [US2] Написати axe і keyboard-тести карток, списків, архівів та змістового зображення у `tests/accessibility/us2-publications.spec.ts`

### Реалізація User Story 2

- [x] T035 [US2] Додати схеми й колекції `news`, `notices` та `events` відповідно до data model у `src/content.config.ts`
- [x] T036 [P] [US2] Реалізувати сортування, фільтрацію published/archived, expiry і event time status у `src/lib/content/publications.ts`
- [x] T037 [P] [US2] Створити доступні картки News, Notice та Event з датами й статусами у `src/components/content/`
- [x] T038 [US2] Створити список, архів і detail маршрути новин у `src/pages/news/index.astro`, `src/pages/news/archive.astro` і `src/pages/news/[slug].astro`
- [x] T039 [P] [US2] Створити поточний список і архів оголошень у `src/pages/notices/index.astro` і `src/pages/notices/archive.astro`
- [x] T040 [P] [US2] Створити список майбутніх подій, архів і detail у `src/pages/events/index.astro`, `src/pages/events/archive.astro` і `src/pages/events/[slug].astro`
- [x] T041 [US2] Додати останні новини, актуальні оголошення й найближчі події на головну у `src/pages/index.astro`

**Checkpoint**: US2 працює незалежно з Git-контентом; CMS workflow додається в
US6.

---

## Phase 5: User Story 6 — керування контентом без коду (Priority: P1)

**Мета**: директор створює, перевіряє та публікує дозволений контент через
браузерний редактор; технічний адміністратор окремо керує доступом і може
відновити версію.

**Незалежна перевірка**: директор з окремим GitHub Write-акаунтом створює
новину з фото менш ніж за п'ять хвилин, отримує preview, проходить валідацію й
публікує; чернетка не потрапляє в production або Pagefind, а попередня версія
відновлюється через Git revert.

### Тести User Story 6

- [x] T042 [P] [US6] Написати contract tests відповідності Decap-полів content schemas і блокування відсутніх alt/license/legal fields у `tests/content/cms-contract.test.ts`
- [x] T043 [P] [US6] Написати тест, що build і Pagefind не включають draft/archived записи та `/admin/`, у `tests/content/publication-boundary.test.ts`
- [x] T044 [P] [US6] Створити документований тестовий сценарій Admin/Write, MFA, denied role management і revoke access у `tests/e2e/us6-role-workflow.md`
- [x] T045 [P] [US6] Написати Playwright smoke test доступності й `noindex` CMS shell без використання production credentials у `tests/e2e/us6-admin-shell.spec.ts`

### Реалізація User Story 6

- [x] T046 [US6] Створити `/admin/` shell із Decap CMS, українською локалізацією, `noindex` і без вбудованих секретів у `public/admin/index.html`
- [x] T047 [US6] Налаштувати GitHub backend, `editorial_workflow`, preview context, media paths і collections Page/News/Notice/Event у `public/admin/config.yml`
- [x] T048 [US6] Додати CMS fields для owner, review dates, alt, source, license, child-publication basis і безпечного Markdown у `public/admin/config.yml`
- [x] T049 [US6] Реалізувати build validator небезпечного HTML, iframe/script, URL, MIME, file/image size та media rights у `src/lib/validation/content-policy.ts`
- [x] T050 [US6] Підключити content-policy validation і зрозумілий український error contract до `scripts/validate-content.mjs`
- [x] T051 [US6] Налаштувати CMS OAuth redirect, preview headers і production contexts без секретів у `netlify.toml`
- [x] T052 [US6] Документувати початкові ролі Admin/Write, MFA, onboarding, revocation, conflict resolution і revert у `docs/cms-operations.md`
- [ ] T053 [US6] Провести навчальний publish-preview-approve-revert сценарій і записати фактичний час та результат у `tests/e2e/us6-role-workflow.md`

**Checkpoint**: перший вертикальний зріз завершено: директор публікує новину
через preview, а публічний сайт, доступність і deployment проходять перевірки.

---

## Phase 6: User Story 3 — офіційні документи та прозорість (Priority: P1)

**Мета**: відвідувач знаходить офіційний документ за назвою, категорією та
роком, бачить метадані й статус версії та отримує файл або зрозуміле
повідомлення про його недоступність.

**Незалежна перевірка**: із набором поточного, заміненого й тимчасово
недоступного документа знайти потрібний запис, перевірити категорію, дату,
чинність, доступний summary і відкрити файл без авторизації.

### Тести User Story 3

- [x] T054 [P] [US3] Написати contract tests схем Document, DocumentCategory і LegalPublication, MIME/size та єдиної current version у `tests/content/document-schemas.test.ts`
- [x] T055 [P] [US3] Написати unit-тести фільтрації за назвою, категорією й роком та зв'язку supersedes у `tests/unit/documents.test.ts`
- [ ] T056 [P] [US3] Написати Playwright-сценарій каталогу, фільтрів, detail, unavailable file і version status у `tests/e2e/us3-documents.spec.ts`
- [x] T057 [P] [US3] Написати accessibility-тест каталогу, фільтрів і доступного summary документа у `tests/accessibility/us3-documents.spec.ts`

### Реалізація User Story 3

- [x] T058 [US3] Додати колекцію `documents` і схеми DocumentFile та version relationship у `src/content.config.ts`
- [x] T059 [P] [US3] Створити валідовані довідники категорій і нормативного реєстру у `src/data/document-categories.yml` і `src/data/legal-publications.yml`
- [x] T060 [US3] Реалізувати валідацію confirmed legal basis, current version, allowlist, 10 МБ і accessible summary у `src/lib/validation/documents.ts`
- [x] T061 [P] [US3] Реалізувати document query/filter/version helpers у `src/lib/content/documents.ts`
- [x] T062 [US3] Створити каталог документів із URL-параметрами назви, категорії й року у `src/pages/documents/index.astro`
- [x] T063 [US3] Створити detail документа зі статусом, історією версій, summary і fallback недоступного файла у `src/pages/documents/[slug].astro`
- [x] T064 [US3] Додати Document, DocumentCategory і LegalPublication collections та conditional fields до `public/admin/config.yml`
- [x] T065 [US3] Створити сторінку прозорості з підтвердженими категоріями, власниками й review dates у `src/pages/transparency.astro`

**Checkpoint**: US3 незалежно виконує обов'язковий сценарій офіційних
документів; непідтверджена правова підстава не може маскуватися як confirmed.

---

## Phase 7: User Story 4 — тематична інформація для батьків і учнів (Priority: P2)

**Мета**: батьки й учні знаходять вступ, навчання, харчування, безпеку,
психологічну підтримку, протидію булінгу та перевірені зовнішні сервіси.

**Незалежна перевірка**: з головної сторінки за ≤3 переходи знайти вступ і
безпечний канал повідомлення про булінг; зовнішні посилання пояснюють сервіс і
мету, а жодна сторінка не збирає персональні дані.

### Тести User Story 4

- [x] T066 [P] [US4] Написати Playwright-сценарії маршрутів для батьків, учнів, вступу й протидії булінгу за ≤3 переходи у `tests/e2e/us4-audience-pages.spec.ts`
- [x] T067 [P] [US4] Написати privacy/content test відсутності форм, дитячих списків і неописаних зовнішніх переходів у `tests/content/us4-privacy.test.ts`
- [x] T068 [P] [US4] Написати accessibility-тест callout-блоків, контактів допомоги й external-link disclosure у `tests/accessibility/us4-audience-pages.spec.ts`

### Реалізація User Story 4

- [x] T069 [P] [US4] Додати затверджені тематичні сторінки для батьків у `src/content/pages/parents/`
- [x] T070 [P] [US4] Додати затверджені тематичні сторінки для учнів у `src/content/pages/students/`
- [x] T071 [US4] Створити доступний компонент безпечного звернення без форми у `src/components/content/SafeguardingContacts.astro`
- [x] T072 [US4] Додати audience hubs і зрозумілі external-service disclosures у `src/pages/parents/index.astro` і `src/pages/students/index.astro`

**Checkpoint**: US4 працює без форм, персональних даних і залежності від
доступності зовнішнього сервісу.

---

## Phase 8: User Story 5 — пошук і навігація (Priority: P2)

**Мета**: відвідувач знаходить опубліковані сторінки, новини, оголошення, події
й документи за ключовими словами та отримує безпечний стан без результатів.

**Незалежна перевірка**: після production build відома назва матеріалу входить
до перших п'яти результатів не пізніше ніж за дві секунди; draft, archived,
`/admin/` і службові дані відсутні в індексі.

### Тести User Story 5

- [x] T073 [P] [US5] Створити контрольний набір українських запитів, відмінків, синонімів і очікуваних top-5 результатів у `tests/fixtures/search-cases.json`
- [x] T074 [P] [US5] Написати integration test складу Pagefind index і виключення draft/archived/admin у `tests/content/search-index.test.ts`
- [x] T075 [P] [US5] Написати Playwright-сценарій результатів, типу, дати, контексту, empty state і межі 2 с у `tests/e2e/us5-search.spec.ts`
- [x] T076 [P] [US5] Написати keyboard/axe test пошукового поля, результатів і announcements у `tests/accessibility/us5-search.spec.ts`

### Реалізація User Story 5

- [x] T077 [US5] Налаштувати Pagefind indexing лише для `main` content і `lang="uk"` у `pagefind.yml`
- [x] T078 [P] [US5] Додати тип, дату, keywords і data-pagefind metadata до публічних layout/components у `src/components/search/SearchMetadata.astro`
- [x] T079 [US5] Реалізувати доступний клієнтський Pagefind UI з debounce, нормалізацією та безпечним rendering у `src/components/search/SiteSearch.astro`
- [x] T080 [US5] Створити сторінку пошуку з query state, empty state і переходами до основних розділів у `src/pages/search.astro`
- [x] T081 [US5] Додати пошук до desktop/mobile navigation і сторінки 404 у `src/components/navigation/SiteNavigation.astro` та `src/pages/404.astro`

**Checkpoint**: US5 працює на статичному сайті без search server і не розкриває
непублічний контент.

---

## Phase 9: Polish і наскрізна production readiness

**Мета**: завершити вимоги, що охоплюють кілька історій, і довести готовність
повного MVP до публікації.

- [x] T082 [P] Додати RSS для новин і коректний production `robots.txt` у `src/pages/rss.xml.ts` і `public/robots.txt`
- [x] T083 [P] Створити favicon, default social image та перевірку унікальних title/description/canonical у `public/favicon.svg`, `public/media/default-social.webp` і `tests/content/seo.test.ts`
- [x] T084 Реалізувати image pipeline, width/height, responsive variants і budget вихідного файла 5 МБ у `src/components/common/ApprovedImage.astro` і `src/lib/validation/media.ts`
- [x] T085 Створити реєстр прав на стартові зображення й перевірку відсутності оманливих documentary captions у `src/data/media-rights.yml` і `tests/content/media-rights.test.ts`
- [x] T086 [P] Додати automated link checker для внутрішніх, зовнішніх і document URLs у `scripts/check-links.mjs`
- [x] T087 [P] Налаштувати Lighthouse budgets LCP ≤2,5 с, INP ≤200 мс і CLS ≤0,1 для ключових маршрутів у `lighthouserc.cjs`
- [ ] T088 Провести ручну перевірку клавіатури, screen reader, reduced motion, mobile viewports і масштабу 200% та записати результати у `docs/accessibility-audit.md`
- [x] T089 Прийняти рішення щодо privacy-friendly analytics або її відсутності та зафіксувати конфігурацію у `docs/analytics-decision.md` і `src/data/site.yml`
- [ ] T090 Налаштувати щоденний незалежний mirror/export без секретів у репозиторії та описати retention у `.github/workflows/backup.yml` і `docs/backup-recovery.md`
- [ ] T091 Виконати контрольне відновлення в межах RTO 4 год / RPO 24 год і записати докази у `docs/backup-recovery.md`
- [ ] T092 Після придбання домену налаштувати canonical `https://manyava-school.if.ua`, DNS, HTTPS і redirect alias у `astro.config.mjs`, `netlify.toml` і `docs/domain-runbook.md`
- [x] T093 Повторно перевірити актуальні Netlify pricing/limits/OAuth умови й зафіксувати production рішення у `docs/hosting-review.md`
- [ ] T094 Заповнити й затвердити нормативний реєстр, стартові офіційні документи та відповідальних у `src/data/legal-publications.yml`
- [ ] T095 Виконати повний `quickstart.md`, усі CI gates і шість незалежних acceptance journeys та записати production sign-off у `docs/release-checklist.md`
- [x] T096 Перевірити трасованість `requirement → acceptance scenario → task → code → test` і зафіксувати матрицю у `docs/traceability.md`

**Checkpoint**: усі критерії production launch виконано; домен, нормативний
реєстр, резервне відновлення, медіаправа, доступність і редакційне навчання
мають документоване підтвердження.

---

## Покриття вимог задачами

| Вимоги                                                              | Основні задачі                                | Перевірки                          |
| ------------------------------------------------------------------- | --------------------------------------------- | ---------------------------------- |
| FR-LAUNCH-001                                                       | T035–T041, T058–T065, T094                    | T033, T056, T095                   |
| FR-PAGE-001, FR-PAGE-002, FR-PAGE-003, FR-PAGE-004, FR-CONTACT-001  | T024–T030                                     | T021–T023                          |
| FR-NEWS-001, FR-NEWS-002, FR-NOTICE-001, FR-EVENT-001, FR-EVENT-002 | T035–T041                                     | T031–T034                          |
| FR-DOC-001, FR-DOC-002, FR-DOC-003, FR-DOC-004, FR-TRANS-001        | T058–T065                                     | T054–T057                          |
| FR-SEARCH-001, FR-SEARCH-002, FR-SEARCH-003, FR-SEARCH-004          | T077–T081                                     | T073–T076                          |
| FR-CMS-001, FR-CMS-002, FR-CMS-003, FR-CMS-004                      | T046–T053                                     | T042–T045, T053                    |
| FR-ROLE-001, FR-ROLE-002, FR-ROLE-003, FR-ROLE-004                  | T047, T051–T053                               | T044–T045, T053                    |
| FR-EXT-001, FR-EXT-002                                              | T071–T072                                     | T066–T068                          |
| QR-LEGAL-001, QR-LEGAL-002                                          | T059–T060, T064–T065, T094                    | T054, T056, T095                   |
| QR-PRIV-001, QR-PRIV-002, QR-PRIV-003                               | T048–T050, T069–T072, T085                    | T042, T067, T095                   |
| QR-A11Y-001, QR-A11Y-002, QR-A11Y-003                               | T012–T014, T023, T034, T057, T068, T076, T088 | T023, T034, T057, T068, T076, T088 |
| QR-PERF-001, QR-PERF-002                                            | T077–T080, T084, T087                         | T075, T087, T095                   |
| QR-CONTENT-001, QR-CONTENT-002                                      | T009, T024, T035, T058, T060                  | T021, T032, T054                   |
| QR-SEC-001, QR-SEC-002                                              | T018, T020, T043, T046–T052                   | T043–T045, T095                    |
| QR-RECOVERY-001                                                     | T052, T090–T091                               | T091, T095                         |
| QR-ANALYTICS-001                                                    | T089                                          | T095                               |
| QR-SEO-001, QR-SEO-002                                              | T011, T019, T043, T077, T082–T083             | T043, T074, T083                   |
| QR-MEDIA-001, QR-MEDIA-002, QR-MEDIA-003                            | T048–T050, T084–T085                          | T042, T085, T095                   |
| SC-001–SC-011                                                       | T021–T096 відповідно до матриці вище          | T095–T096                          |

---

## Залежності й порядок виконання

### Залежності фаз

- **Phase 1 — Setup**: не має залежностей.
- **Phase 2 — Foundation**: залежить від Phase 1 і блокує всі user stories.
- **US1**: стартує після Foundation; не залежить від інших stories.
- **US2**: стартує після Foundation; використовує спільний layout, але не
  залежить від CMS.
- **US6**: залежить від публічних content schemas US1/US2 для повного
  publish-preview сценарію.
- **US3**: стартує після Foundation; CMS-частина T064 залежить від T047–T050,
  але публічний каталог можна розробляти паралельно з US6.
- **US4**: залежить від Page model і navigation із US1.
- **US5**: залежить від наявності публічних маршрутів US1–US4, щоб перевірити
  повний індекс, але компонент пошуку можна готувати після Foundation.
- **Phase 9 — Polish**: починається після stories, потрібних для обраного
  release; T092–T095 блокують production launch.

### Граф користувацьких історій

```text
Setup → Foundation ─┬→ US1 ───────────────→ US4 ─┐
                    ├→ US2 → US6 ────────┐       ├→ US5 → Production readiness
                    └→ US3 public ───────┴───────┘
```

US1, US2 та публічна частина US3 можуть розроблятися паралельно після
Foundation. US6 завершує перший редакційний вертикальний зріз. US5 інтегрує
результати всіх публічних stories.

### Порядок усередині кожної історії

1. Написати тести й підтвердити, що вони падають з очікуваної причини.
2. Реалізувати або розширити схеми даних.
3. Реалізувати чисті content/query helpers.
4. Реалізувати компоненти та маршрути.
5. Інтегрувати CMS або зовнішню межу.
6. Запустити незалежну перевірку story та попередні regression tests.

---

## Приклади паралельного виконання

### US1

Після T024 паралельно виконуються T025–T027; тести T021–T023 також змінюють
різні файли.

### US2

Після T035 паралельно виконуються T036–T037, T039–T040; тести T031–T034 можна
підготувати одночасно до реалізації.

### US6

T042–T045 виконуються паралельно; після T046–T048 validator T049–T050 і
операційна документація T052 можуть готуватися паралельно.

### US3

T054–T057 і T059 готуються паралельно; після T058–T061 маршрути T062–T063 та
сторінка прозорості T065 можуть реалізовуватися окремо.

### US4

T066–T068 і контент T069–T070 готуються паралельно; T071–T072 інтегрують
затверджені дані після перевірки приватності.

### US5

T073–T076 готуються паралельно; після T077 компоненти metadata T078 і UI T079
можуть розроблятися окремо перед інтеграцією T080–T081.

---

## Стратегія реалізації

### Перший вертикальний зріз

1. Завершити Setup і Foundation.
2. Реалізувати потрібну основу US1.
3. Реалізувати US2 для новин.
4. Реалізувати US6 для CMS і editorial workflow.
5. Зупинитися й перевірити повний цикл:
   `створення → preview → схвалення → публікація → доступність → revert`.

Це перший демонстраційний інкремент, але ще не весь законодавчо достатній MVP.

### Мінімальний публічний MVP

Для першого офіційного запуску обов'язкові:

1. Setup + Foundation.
2. US1 — основна інформація й контакти.
3. US2 — новини, оголошення й події.
4. US6 — безпечне керування контентом.
5. US3 — офіційні документи й прозорість.
6. US4 і US5 — погоджені P2-сценарії baseline-специфікації.
7. Уся Phase 9 — production readiness.

### Інкрементальна поставка

1. Foundation → технічний каркас.
2. US1 → інформаційний прототип.
3. US2 + US6 → редакційний вертикальний зріз.
4. US3 → законодавчо необхідний контур документів.
5. US4 → тематичні розділи.
6. US5 → пошук по всьому опублікованому контенту.
7. Polish → production launch.

## Примітки

- `[P]` не означає, що задачу можна починати до завершення попередньої
  блокувальної фази.
- Тести критичних сценаріїв створюються до відповідної реалізації.
- Коміти мають бути малими й логічними; один task може бути одним комітом або
  частиною атомарної групи.
- Зміни вимог, ролей, схем, безпеки чи приватності спочатку вносяться у
  специфікаційні артефакти.
- Домен і нормативний реєстр не блокують перший вертикальний зріз, але блокують
  офіційний production launch.

## Phase 10: Convergence

- [x] T097 Додати до `public/admin/config.yml` безпечну CMS-форму редагування офіційних контактів у `src/data/site.yml` і contract test відповідності полів схемі per Constitution V та plan: регулярні операції без коду (partial)

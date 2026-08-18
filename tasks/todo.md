# School Website Specification Plan

## Публікація статуту та офіційних реквізитів — 18 серпня 2026

- [x] Перевірити наданий скан статуту та виписати підтверджені реквізити.
- [x] Додати реквізити до валідованих налаштувань і сторінки «Про ліцей».
- [x] Опублікувати чинну редакцію статуту в каталозі документів.
- [x] Оновити CMS-контракт і тести каталогу документів.
- [x] Виконати форматування, перевірки, збірку та браузерну перевірку.

### Review

- Переглянуто всі 21 сторінку наданого скану; підтверджено рішення
  № 2833/53/2026 від 14.07.2026 та реквізити з пунктів 1.1–1.10.
- На сторінку «Про ліцей» додано повну назву, ЄДРПОУ, тип закладу,
  власність, засновника, орган управління та повну адресу.
- Опубліковано PDF і доступний текстовий опис статуту; документ позначено
  чинним і пов’язано з підтвердженою вимогою статті 30 Закону України
  «Про освіту».
- `npm run validate:content`, `npm run check`, `npm run build` і `npm test`
  пройшли; 37 unit/content тестів та 6 цільових Playwright-тестів на desktop
  і mobile успішні.

## Goal

Create a practical, version-controlled specification for the official website of
Манявський ліцей Солотвинської селищної ради, based on the decisions captured
in the shared ChatGPT conversation and grounded in the current repository.

The specification must be written in Ukrainian. English may be used only for
stable technical identifiers, technology names, code fragments, and terms whose
translation would reduce precision. Ukrainian terminology must be preferred in
all explanatory text.

## Plan

- [x] Read and summarize the shared ChatGPT conversation.
- [x] Inspect the repository structure and current Git state.
- [x] Establish the specification hierarchy, terminology, requirement IDs, and
      traceability rules.
- [x] Draft the project constitution.
- [x] Draft the baseline product specification and product vision.
- [x] Define stakeholders, user groups, MVP scope, and explicit exclusions.
- [x] Define information architecture and the public content model.
- [x] Define the initial public content model.
- [x] Write functional requirements and measurable acceptance criteria for the
      MVP modules.
- [x] Define accessibility, privacy, security, performance, SEO, availability,
      backup, and maintainability requirements.
- [x] Document assumptions, unresolved questions, dependencies, and risks.
- [x] Evaluate the legacy website and record the decision not to migrate its
      content into the MVP.
- [x] Define a phased roadmap and the first vertical implementation slice.
- [x] Review all documents for internal consistency, duplicate requirements,
      missing acceptance criteria, and traceability.
- [x] Add a review/results section to this file describing the completed
      deliverables and verification performed.

## Spec Kit Deliverables

```text
.specify/
├── memory/constitution.md
├── templates/
└── feature.json

specs/
└── 001-public-school-website/
    ├── spec.md
    ├── checklists/requirements.md
    ├── plan.md
    ├── research.md
    ├── data-model.md
    ├── quickstart.md
    └── tasks.md
```

The first draft will distinguish verified requirements from legal assumptions.
Any legal statement that requires confirmation by the school or a Ukrainian
legal specialist will be marked explicitly rather than presented as legal
advice.

## Review

### Speckit Specify

- Created baseline specification:
  `specs/001-public-school-website/spec.md`.
- Created and completed the requirements quality checklist.
- Validation found no unresolved clarification markers, placeholders, duplicate
  requirement IDs, or implementation-specific technology choices.
- Current scope contains 6 user stories, 22 acceptance scenarios, 30 functional
  requirements, 21 quality requirements, and 11 measurable success criteria.
- Clarification decisions were integrated into the specification: initial CMS
  roles, no legacy-content migration, mandatory news and official documents,
  no MVP forms, and deferred AIKOM integration.

### Speckit Plan

- Created `plan.md` with the technical context, architecture, security and
  operational rules, quality gates, delivery phases, and a first vertical
  slice.
- Created `research.md` documenting the selected static-site, CMS, hosting,
  search, testing, and backup approaches together with rejected alternatives.
- Created `data-model.md` and contracts for content schemas, CMS workflow, and
  public routes.
- Created `quickstart.md` with future implementation and acceptance checks.
- Re-ran the constitution gate after design: all principles pass; the justified
  operational complexity is limited to CMS OAuth and managed preview hosting.
- Verified that all planned artifacts exist and contain no unresolved
  clarification markers, template placeholders, `TODO`, or `TBD` entries.
- Confirmed there are no Spec Kit extension hooks configured for this project.
- Next phase: generate dependency-ordered implementation tasks with
  `speckit-tasks`.

### Speckit Tasks

- Created `specs/001-public-school-website/tasks.md` with 96 sequential,
  executable tasks across setup, foundation, six user stories, and production
  readiness.
- Included mandatory tests before implementation for critical publication,
  access-control, privacy, accessibility, search, and recovery scenarios.
- Identified 49 explicitly parallelizable tasks while preserving blocking phase
  and story dependencies.
- Mapped all 51 functional and quality requirement IDs to implementation tasks
  and verification tasks.
- Defined the first vertical slice as US2 + US6 after the required foundation:
  create news → preview → approve → publish → accessibility check → revert.
- Validated task IDs, checklist syntax, story labels, exact paths, requirement
  coverage, and absence of placeholders or unresolved clarification markers.
- Next phase: run `speckit-analyze` before implementation.

### Speckit Implement — Foundation

- Completed T001–T020: Astro setup, pinned dependencies, formatting/linting,
  project structure, Netlify build, shared schemas, Ukrainian date helpers, SEO
  metadata, design tokens, semantic layout, common components, validated YAML
  settings, security headers, sitemap, CI, axe and Lighthouse gates.
- Added a temporary visual homepage shell so stakeholders can review the design
  before real content implementation starts.
- Kept the public foundation serverless and free of client-side JavaScript.
- Removed `decap-cms-app` from the current dependency tree after `npm audit`
  identified high-severity transitive advisories, including an advisory without
  an available fix. The CMS integration task T046 must choose a safe, pinned
  delivery method after re-evaluation.
- Verified Astro check, ESLint, formatting, unit-test runner, production build,
  Pagefind indexing, desktop/mobile Playwright + axe, Lighthouse gates, and a
  production-dependency audit with zero known vulnerabilities.

### Speckit Implement — Contacts

- Completed T027 with a standalone `/contacts/` route sourced from validated
  `site.yml` settings and independent of maps, forms, or external services.
- Added per-field publication flags so unverified phone, email, or office hours
  are absent from public HTML instead of appearing as plausible placeholders.
- Added a safe editorial state explaining that official contact details are
  being verified.
- Added unit coverage for contact publication rules and desktop/mobile
  Playwright + axe coverage, including keyboard focus and 320 px reflow.
- Left T021–T023 open because their task scope also covers pages, admission,
  navigation depth, and the complete US1 journey beyond the contacts page.

### About Page

- [x] Record verified public facts and their sources.
- [x] Add route, metadata, semantic sections, and source note for `/about/`.
- [x] Add route, privacy, accessibility, and 200% reflow tests.
- [x] Run formatting, checks, tests, and production build.
- [x] Review the page in the local browser at desktop and mobile widths.

#### Review

- Used АІКОМ as the authoritative source for institution type, ownership,
  language of instruction, governance, and address.
- Used the public Facebook page and the previous school site only to identify
  broad community themes; copied no photos or children's personal data.
- Deliberately omitted volatile staffing figures and leadership details from
  the about page.
- Confirmed 320 px mobile reflow, keyboard focus, axe accessibility, the 200%
  reflow equivalent, metadata, source links, and absence of forms, embeds, and
  images.
- Passed Astro check, ESLint, Vitest, production build with Pagefind, and 12
  relevant Playwright tests across desktop and mobile projects.

### About Page — Community Heading Fix

- [x] Add a regression test that compares the heading and card-column bounds.
- [x] Keep the long Ukrainian heading inside its grid column.
- [x] Verify desktop, mobile, and 200% reflow behavior.

### Homepage — School Introduction

- [x] Add an end-to-end test for visitor-focused school information.
- [x] Replace the technical-principles block with a concise school introduction.
- [x] Link the introduction to `/about/` and verify responsive behavior.

#### Review

- Removed the developer-facing `Mobile-first`, accessibility, and editorial
  workflow marketing copy from the homepage.
- Added a verified school summary, three visitor-focused themes, and a direct
  `/about/` link.
- Confirmed no horizontal overflow at 375 px and visually reviewed the section
  at 1440 px and 390 px browser widths.
- Passed Astro check, ESLint, Vitest, production build with Pagefind, and 10
  relevant Playwright tests across desktop and mobile projects.

### About Page — School Photo

- [x] Update the content test for one meaningful, locally hosted school photo.
- [x] Replace the decorative hero landscape with the provided building photo.
- [x] Add intrinsic dimensions, accessible alternative text, and responsive styles.
- [x] Verify build, accessibility, desktop, and mobile presentation.

#### Review

- Converted the supplied 592 × 299 PNG to a 35 KB WebP stored locally in
  `public/media/`; the page has no runtime dependency on Facebook or another
  image host.
- Added intrinsic dimensions, `fetchpriority="high"`, and the alternative text
  «Будівля Манявського ліцею».
- Updated the transparency note to distinguish the supplied building photo from
  children's images and personal data.
- Passed Astro check, ESLint, Vitest, production build with Pagefind, and 8
  about-page Playwright/axe tests on desktop and mobile.

### Speckit Implement — User Story 1 Completion

- [x] T021 Add validation tests for pages, site settings, and navigation depth.
- [x] T022 Add ≤3-transition journeys for contacts, admission, and school information.
- [x] T023 Add keyboard, focus-order, axe, and 200% reflow coverage.
- [x] T024 Define the validated `pages` content collection and Markdown policy.
- [x] T025 Add reviewed content records for About, Leadership, and Admission.
- [x] T026 Complete homepage routes and the contact-information entry point.
- [x] T028 Generate stable content pages with breadcrumbs and review metadata.
- [x] T029 Add accessible desktop/mobile navigation with at most three levels.
- [x] T030 Add a useful accessible 404 page.

#### Review

- Completed the full US1 route set with `/about/`, `/about/leadership/`,
  `/admission/`, `/contacts/`, homepage entry points, and a custom 404.
- Added a strict Page schema, canonical-path uniqueness guard, safe Markdown
  guard, owner/review metadata, and maximum three-level navigation validation.
- Replaced the horizontal mobile navigation strip with a keyboard-operable menu
  and added a nested desktop menu for About, Leadership, and Admission.
- Confirmed all key information is one meaningful transition from the homepage,
  below the three-transition requirement.
- Built six static pages and indexed the five public content routes with
  Pagefind; 320 px reflow and axe checks pass across the complete US1 route set.

# Speckit Implement — User Story 2

- [x] Перевірити вимоги, модель даних, контракти й задачі US2.
- [x] Написати unit, content contract, e2e та accessibility тести.
- [x] Реалізувати схеми, helpers і перевірений демонстраційний контент.
- [x] Створити картки, списки, архіви та detail-сторінки.
- [x] Додати актуальні публікації на головну.
- [x] Виконати повну перевірку й задокументувати результат.

## Review

- Реалізовано повний потік US2 для новин, оголошень і подій: колекції, валідація,
  автоматичне сортування й архівування, картки, списки та detail-маршрути.
- Додано одну правдиву новину про підготовку офіційного сайту. Для непідтверджених
  оголошень і подій використано порожні стани без вигаданих фактів.
- Головна сторінка показує останню новину, актуальне оголошення й найближчу
  подію або відповідний порожній стан.
- `npm test`: 13/13; `npm run check`: 0 помилок; `npm run build`: 13 сторінок;
  `npm run test:e2e`: 50/50 на desktop і mobile.
- Окремо перевірено семантичну структуру та компонування головної в локальному
  браузері: горизонтального переповнення немає.

# Speckit Implement — User Story 6

- [x] Перевірити вимоги й задачі CMS workflow.
- [x] Додати contract, boundary та browser smoke тести.
- [x] Реалізувати український Decap CMS shell і editorial workflow.
- [x] Додати build-blocking content policy та українські помилки.
- [x] Налаштувати Netlify contexts, redirect і security headers.
- [x] Документувати ролі, MFA, onboarding, revocation, conflict і revert.
- [ ] Провести реальний training publish-preview-approve-revert із GitHub Admin/Write
      акаунтами та Netlify preview.

## Review

- Decap CMS 3.15.1 доступний через `/admin/`, показує українську кнопку входу
  через GitHub і не містить credentials у репозиторії.
- Форми Pages/News/Notice/Event відповідають Astro schemas, використовують
  `editorial_workflow` і збирають review та media-rights metadata.
- `npm run build` спочатку блокує небезпечний Markdown, URL, недозволені або
  завеликі файли та неповні права на медіа.
- Pagefind знайшов 14 HTML-файлів, але проіндексував 13 публічних сторінок:
  `/admin/` не потрапив до індексу.
- Перевірки: 22/22 unit/contract, 52/52 Playwright desktop/mobile, Astro check і
  lint без помилок.
- T053 лишається відкритою: для чесного результату потрібні реальні GitHub
  `Admin`/`Write`, MFA, Netlify OAuth і deploy preview.

# Fix Netlify admin redirect loop

- [x] Reproduce and identify the redirect loop on `/admin/`.
- [x] Remove the redundant forced `/admin` redirect from `netlify.toml`.
- [x] Permit Decap CMS dynamic evaluation only within the `/admin/*` CSP.
- [x] Run formatting, project checks, and a production build.
- [x] Deploy through the protected `main` workflow and verify `/admin` performs
      one canonical redirect while `/admin/` returns the working editor.

## Review

- Production `/admin` returns one `301` to `/admin/`; `/admin/` returns `200`.
- The admin-only CSP permits Decap CMS evaluation while the public-site CSP
  remains unchanged.
- Decap CMS rendered its GitHub login action on the deploy preview with no
  browser console errors.
- GitHub quality, browser, and Netlify deploy-preview checks passed before the
  production merge.

# Contacts and specification completion

- [x] Run Spec Kit prerequisites and verify all feature checklists.
- [x] Add the confirmed director, email, phone number, and postal address to the
      canonical site data.
- [x] Verify the contacts page on desktop, mobile, and with accessible links.
- [x] Run `speckit-converge` against the implemented website.
- [x] Execute every locally actionable remaining task through `speckit-implement`.
- [x] Run the full quality, build, content, browser, and Lighthouse test suites.
- [x] Review the final diff against the specification and document results.
- [ ] Publish through the protected `main` workflow and smoke-test production.

## Review

- Додано підтверджені контакти, ім’я директорки та CMS-форму для подальшого
  редагування контактів без коду.
- Реалізовано документи й прозорість, сторінки для батьків та учнів, протидію
  булінгу, пошук Pagefind, RSS, SEO, реєстр медіаправ і responsive-зображення.
- Додано link checker, Lighthouse budgets, документацію домену, аналітики,
  доступності, резервування, релізу та трасованості.
- Перевірки: Astro/lint без помилок; 37/37 Vitest; build і link checker успішні;
  Playwright 79/80 у повному запуску з одним нестабільним focus-тестом, який
  одразу пройшов 3/3 ізольовано; Lighthouse завершився без blocking failures.
- Відкритими лишаються T053, T056, T088, T090–T092, T094–T095: вони потребують
  навчання директора, реальних офіційних документів, ручного screen-reader
  аудиту, незалежного backup destination/restore drill, завершення поширення TLS
  або фінального production sign-off.

# Sticky footer

- [x] Inspect the shared page layout and existing footer styles.
- [x] Keep the footer visible while scrolling without overlaying page content.
- [x] Re-run focused browser coverage and project checks after correcting the behavior.

## Review

- The earlier normal-flow implementation did not match the requested interaction
  because the footer disappeared while scrolling. It is now fixed to the viewport,
  with responsive bottom spacing reserved on the document body.
- Browser inspection confirmed that the footer retains identical viewport
  coordinates before and after a real page scroll and that the reserved body
  spacing exceeds the rendered footer height.
- `npm run check` and the production build passed; the corrected focused
  Playwright suite passed 4/4 tests across desktop and mobile projects.

# Navigation accordion

- [x] Inspect the current desktop dropdown and mobile navigation structure.
- [x] Add regression coverage for single-open desktop and mobile menu sections.
- [x] Close an open desktop menu item when a peer item opens.
- [x] Replace the expanded mobile navigation tree with accordion sections.
- [x] Verify accessibility, desktop/mobile behavior, checks, and production build.

## Review

- Desktop dropdowns now form a native single-open disclosure group, so opening
  a peer closes the previously expanded menu.
- Mobile navigation uses single-open accordion sections with clear plus/minus
  indicators and explicit overview links instead of a permanently expanded tree.
- Updated the existing mobile journey test to open the relevant accordion
  before selecting its child destination.
- `npm run check` passed; the focused navigation/accessibility run passed 18/18
  applicable tests across desktop and mobile (2 viewport-specific skips); and
  the production build generated 25 pages with a 23-page Pagefind index.

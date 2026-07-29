# Матриця трасованості

| Вимога                                           | Сценарій | Задачі    | Основний код                                                 | Тести                                                     |
| ------------------------------------------------ | -------- | --------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| FR-CONTACT-001, FR-PAGE-001–004                  | US1      | T021–T030 | `src/pages/contacts.astro`, `src/content/pages/`, navigation | `site-data`, `contacts`, `us1-core-information`           |
| FR-NEWS-001–002, FR-NOTICE-001, FR-EVENT-001–002 | US2      | T031–T041 | publication schemas, helpers і routes                        | `publication-schemas`, `publications`, `us2-publications` |
| FR-CMS-001–004, FR-ROLE-001–004                  | US6      | T042–T053 | `public/admin/`, validator, Netlify config                   | `cms-contract`, `publication-boundary`, admin shell       |
| FR-DOC-001–004, FR-TRANS-001                     | US3      | T054–T065 | document schemas, helpers, catalog, detail, transparency     | `document-schemas`, `documents`, `us3-documents`          |
| FR-EXT-001–002, QR-PRIV-001–003                  | US4      | T066–T072 | audience pages, `SafeguardingContacts`                       | `us4-privacy`, `us4-audience-pages`                       |
| FR-SEARCH-001–004                                | US5      | T073–T081 | Pagefind config, metadata, `SiteSearch`                      | `search-index`, `us5-search`                              |
| QR-SEO-001–002                                   | усі      | T082–T083 | sitemap, RSS, robots, BaseLayout metadata                    | `seo.test.ts`                                             |
| QR-MEDIA-001–003                                 | US2, US6 | T084–T085 | `ApprovedImage`, media validator/register                    | `media-rights.test.ts`, CMS contract                      |
| QR-PERF-001–002                                  | US1, US5 | T087      | Lighthouse budgets                                           | CI `test:performance`                                     |
| QR-RECOVERY-001                                  | US6      | T090–T091 | backup workflow і runbook                                    | ручний restore drill                                      |
| SC-001–011                                       | усі      | T095–T096 | повний сайт і документація                                   | release checklist                                         |

Незавершені ручні або контентні докази явно залишені відкритими у
`tasks.md` і `docs/release-checklist.md`; матриця не підміняє фактичне приймання.

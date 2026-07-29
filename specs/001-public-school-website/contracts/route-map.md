# Контракт публічних маршрутів

Усі маршрути мають українські canonical URLs без file extensions. Slugs —
стабільні ASCII kebab-case. Зміна canonical URL потребує redirect.

| Route | Джерело | Index | Search | Notes |
|---|---|---:|---:|---|
| `/` | site settings + featured content | yes | yes | головна |
| `/about/` | Page | yes | yes | про ліцей |
| `/contacts/` | SiteSettings | yes | yes | без форми MVP |
| `/parents/` | Page tree | yes | yes | тематичний hub |
| `/students/` | Page tree | yes | yes | тематичний hub |
| `/bullying-prevention/` | Page | yes | yes | безпечні канали |
| `/news/` | News collection | yes | yes | pagination |
| `/news/{slug}/` | News | yes | yes | detail |
| `/notices/` | Notice collection | yes | yes | current + archive |
| `/events/` | Event collection | yes | yes | upcoming + archive |
| `/documents/` | Document collection | yes | yes | filters |
| `/documents/{slug}/` | Document | yes | yes | metadata + file |
| `/transparency/` | LegalPublication | yes | yes | confirmed registry |
| `/search/` | Pagefind | yes | no | search UI |
| `/admin/` | Decap CMS | no | no | authenticated editor |
| `/404/` | static | no | no | safe next steps |

## Response behavior

- published route: `200`;
- unknown route: custom `404`;
- archived/superseded canonical: either archive detail with clear label or `301`
  to current version according to content decision;
- protected/admin content: `noindex`, excluded from sitemap and Pagefind;
- third-party outage does not change core routes.

## Metadata contract

Кожна indexable route має:

- unique `<title>`;
- unique meta description;
- canonical URL;
- Open Graph title/description/image when approved;
- `lang="uk"`;
- semantic single `h1`;
- appropriate structured data only when validated.

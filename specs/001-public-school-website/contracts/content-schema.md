# Контракт контентних схем

Цей контракт визначає build-blocking правила між CMS, Git-контентом і
публічними шаблонами.

## Загальні правила

- UTF-8, українська основна мова.
- Ідентифікатори й filename — lowercase ASCII kebab-case.
- Дати — ISO 8601; timezone для datetime — `Europe/Kyiv`.
- Невідомі поля відхиляються схемою.
- `title`, `description`, `ownerId`, `status`, `reviewedAt`, `reviewDueAt`
  обов'язкові для всіх публічних типів.
- `status=archived` виключає матеріал із current views, sitemap і Pagefind.
- Чернетка існує лише поза `main`.

## Markdown policy

Дозволено:

- headings від `h2` у body;
- paragraphs, lists, tables, blockquotes;
- внутрішні й перевірені HTTPS links;
- images через MediaRef;
- semantic emphasis.

Заборонено:

- `<script>`, `<iframe>`, inline event handlers;
- довільний raw HTML без allowlist;
- `javascript:`, `data:` і невідомі URL schemes;
- вставляння зовнішніх tracking widgets;
- heading level jumps, що порушують структуру.

## Колекції CMS

| Collection         |  Create | Delete |      Publish | Основний шлях                     |
| ------------------ | ------: | -----: | -----------: | --------------------------------- |
| pages              | limited |  false |         true | `src/content/pages/`              |
| news               |    true |  false |         true | `src/content/news/`               |
| notices            |    true |  false |         true | `src/content/notices/`            |
| events             |    true |  false |         true | `src/content/events/`             |
| documents          |    true |  false |         true | `src/content/documents/`          |
| legal-publications | limited |  false | admin review | `src/data/legal-publications.yml` |
| site-settings      |   false |  false | admin review | `src/data/site.yml`               |

`delete=false` означає, що редактор використовує archive/withdraw workflow.

## Document file policy

- allowed: PDF, PDF/A, ODT, DOCX, XLSX, CSV;
- preferred public formats: HTML summary + signed PDF/PDF-A;
- maximum: 10 МБ на файл у MVP;
- filename не містить персональних даних, пробілів або нестабільних версій;
- metadata type/size/date/issuer validation є build-blocking;
- файл без доступного summary позначається для ручної remediation.

## Media policy

- external source requires `sourceUrl`, `license`, `approvedBy`, `approvedAt`;
- meaningful image requires non-empty alt;
- decorative image requires `decorative=true` and empty alt;
- children require `containsChildren=true` and `publicationBasis`;
- stock image requires `depictsSchoolReality=false`;
- media lacking proof is rejected before merge.

## Error contract

Validation output MUST include:

- content file path;
- invalid field;
- requirement/schema code;
- Ukrainian explanation;
- safe correction hint;
- no secret or personal data values beyond what is required to locate error.

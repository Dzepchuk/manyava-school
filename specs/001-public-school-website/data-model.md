# Модель даних

Модель реалізується через Astro content collections і конфігураційні YAML/JSON
файли. Усі схеми валідовуються під час локальної перевірки та production build.

## Спільні типи

### ContentStatus

`published | archived`

Чернетки не зберігаються в production branch: Decap editorial workflow тримає
їх у feature branch/pull request.

### ContentOwner

- `id`: стабільний технічний ідентифікатор;
- `displayName`: публічна або внутрішня назва відповідального;
- `role`: `administrator | editor | approver`;
- `active`: чи можна призначати новий контент;
- `contact`: внутрішній контакт, не публікується автоматично.

### ReviewMetadata

- `ownerId`: обов'язкове посилання на ContentOwner;
- `createdAt`: дата створення;
- `updatedAt`: дата останньої зміни;
- `reviewedAt`: дата останнього підтвердження;
- `reviewDueAt`: дата наступної перевірки;
- `status`: ContentStatus.

Правила:

- `reviewDueAt` не раніше `reviewedAt`;
- archived content не з'являється у поточних списках і Pagefind;
- прострочений review не видаляє матеріал автоматично, але створює build warning
  і потрапляє у звіт редактора.

## Page

Стабільна тематична сторінка.

- `title`: 1–120 символів;
- `description`: 50–180 символів;
- `path`: унікальний canonical path;
- `section`: дозволений розділ навігації;
- `body`: Markdown без script, iframe і довільних interactive embeds;
- `review`: ReviewMetadata;
- `seoImage`: optional MediaRef;
- `showInNavigation`: boolean;
- `searchKeywords`: optional string array.

## News

- `title`: 1–120 символів;
- `description`: 50–220 символів;
- `publishedAt`: дата й час;
- `eventDate`: optional date;
- `body`: Markdown;
- `cover`: optional MediaRef;
- `gallery`: optional MediaRef array;
- `authorDisplayName`: відповідальна доросла особа або назва ліцею;
- `review`: ReviewMetadata;
- `tags`: контрольований список;
- `featured`: boolean.

Сортування: `publishedAt desc`.

## Notice

- `title`, `description`, `body`;
- `startsAt`: дата початку;
- `expiresAt`: дата завершення;
- `audience`: `all | parents | students | staff | community`;
- `priority`: `normal | important | urgent`;
- `review`: ReviewMetadata.

Перехід стану: current → expired view автоматично за `expiresAt`, але джерело
залишається published або archived.

## Event

- `title`, `description`;
- `startsAt`: required date/time;
- `endsAt`: optional date/time;
- `timeStatus`: `confirmed | to-be-confirmed`;
- `location`: optional string;
- `format`: `onsite | online | hybrid`;
- `externalUrl`: optional validated HTTPS URL;
- `review`: ReviewMetadata.

Правила:

- `endsAt` не раніше `startsAt`;
- при `timeStatus=to-be-confirmed` UI показує явну позначку;
- минулі події доступні в archive view.

## Document

- `title`: 1–180 символів;
- `description`: 50–500 символів;
- `documentDate`: дата документа;
- `publishedAt`: дата публікації;
- `categoryId`: посилання на DocumentCategory;
- `legalPublicationId`: optional посилання на LegalPublication;
- `number`: optional номер;
- `issuer`: optional видавець;
- `file`: DocumentFile;
- `accessibleSummary`: HTML/Markdown summary;
- `supersedes`: optional Document ID;
- `versionStatus`: `current | superseded | withdrawn`;
- `review`: ReviewMetadata.

Правила:

- у логічній серії документа лише одна current version;
- file type входить у allowlist;
- file ≤ 10 МБ для MVP;
- inaccessible PDF потребує доступного summary або альтернативного файла.

## DocumentCategory

- `id`: stable kebab-case;
- `label`: українська назва;
- `description`;
- `order`: integer;
- `active`: boolean.

## LegalPublication

Реєстр підтверджених обов'язкових публікацій.

- `id`;
- `title`;
- `sourceTitle`;
- `sourceUrl`: офіційна HTTPS-адреса;
- `sourceSection`: стаття/пункт;
- `verifiedAt`;
- `verifiedBy`;
- `reviewDueAt`;
- `responsibleOwnerId`;
- `publicationPath`;
- `status`: `unverified | confirmed | superseded`;

Тільки `confirmed` може позначати матеріал як законодавчо обов'язковий.

## MediaAsset / MediaRef

- `path`: локальний дозволений файл;
- `alt`: обов'язковий для змістового зображення;
- `decorative`: boolean;
- `sourceUrl`: required для зовнішнього джерела;
- `author`: optional;
- `license`: required enum/text;
- `licenseProof`: локальний запис або URL;
- `depictsSchoolReality`: boolean;
- `containsChildren`: boolean;
- `publicationBasis`: required if `containsChildren=true`;
- `width`, `height`, `mimeType`, `bytes`;
- `approvedBy`, `approvedAt`.

Правила:

- `decorative=true` вимагає порожній alt; інакше alt обов'язковий;
- `depictsSchoolReality=false` не може мати documentary caption;
- external media без license/source/approval блокує build;
- source image ≤ 5 МБ; дозволені JPEG, PNG, WebP, AVIF, SVG після окремої
  sanitization policy.

## SiteSettings

- `officialName`;
- `shortName`;
- `tagline`;
- `address`;
- `phones`;
- `email`;
- `workingHours`;
- `socialLinks`;
- `defaultSeo`;
- `analyticsEnabled`;
- `analyticsProvider`: optional;
- `updatedAt`, `approvedBy`.

## NavigationItem

- `label`;
- `path`;
- `parentId`: optional;
- `order`;
- `audiences`;
- `visible`.

Максимальна рекомендована глибина — 3 рівні.

## UserRole

Джерело прав — GitHub/Netlify, а не публічний content repository.

- `administrator`: repository admin, OAuth/config/secrets/users;
- `editorApprover`: repository write, Decap draft/review/publish;
- майбутній `editor`: окрема роль/процес, що не отримує user administration.

Спільні облікові записи заборонені.

## Зв'язки

```text
ContentOwner 1 ── * Page/News/Notice/Event/Document
DocumentCategory 1 ── * Document
LegalPublication 0..1 ── * Document
Document 0..1 ── 0..1 Document (supersedes)
MediaAsset 1 ── * MediaRef ── 1 Page/News
NavigationItem * ── 1 Page/Section
```

## Обсяг і архівування

- колекції MVP проєктуються щонайменше для 1 000 записів;
- archived records залишаються в Git, але виключаються з поточних списків і
  пошуку;
- коли media наближається до 1 ГБ або repository operations помітно
  погіршуються, запускається ADR щодо object storage;
- видалення офіційного документа не використовується замість
  `superseded/withdrawn`, якщо немає юридично підтвердженої причини.

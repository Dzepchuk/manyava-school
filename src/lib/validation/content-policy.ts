import fs from 'node:fs';
import path from 'node:path';

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_DOCUMENT_BYTES = 10 * 1024 * 1024;
const ALLOWED_IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const ALLOWED_DOCUMENT_EXTENSIONS = new Set(['.pdf', '.odt', '.docx', '.xlsx', '.csv']);

export interface ContentPolicyIssue {
  file: string;
  field: string;
  code: string;
  message: string;
  hint: string;
}

export class ContentPolicyError extends Error {
  readonly issues: ContentPolicyIssue[];

  constructor(issues: ContentPolicyIssue[]) {
    super(`Виявлено порушень контентної політики: ${issues.length}.`);
    this.name = 'ContentPolicyError';
    this.issues = issues;
  }
}

function issue(
  file: string,
  field: string,
  code: string,
  message: string,
  hint: string,
): ContentPolicyIssue {
  return { file, field, code, message, hint };
}

export function validateMarkdownPolicy(markdown: string, file: string): ContentPolicyIssue[] {
  const issues: ContentPolicyIssue[] = [];
  const forbidden = [
    [/<\s*script\b/i, 'POLICY-MARKDOWN-SCRIPT', 'Тег script заборонено.'],
    [/<\s*iframe\b/i, 'POLICY-MARKDOWN-IFRAME', 'Тег iframe заборонено.'],
    [/\bon[a-z]+\s*=/i, 'POLICY-MARKDOWN-EVENT', 'Inline event handler заборонено.'],
    [/<\s*\/?\s*[a-z][^>]*>/i, 'POLICY-MARKDOWN-HTML', 'Довільний HTML заборонено.'],
  ] as const;

  for (const [pattern, code, message] of forbidden) {
    if (pattern.test(markdown)) {
      issues.push(
        issue(file, 'body', code, message, 'Використайте стандартні елементи Markdown без HTML.'),
      );
    }
  }

  for (const match of markdown.matchAll(/\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const url = match[1];
    if (
      !url.startsWith('/') &&
      !url.startsWith('#') &&
      !url.startsWith('mailto:') &&
      !url.startsWith('https://')
    ) {
      issues.push(
        issue(
          file,
          'body.link',
          'POLICY-URL-SCHEME',
          'Посилання має недозволену схему.',
          'Використайте внутрішній шлях, mailto: або перевірене HTTPS-посилання.',
        ),
      );
    }
  }

  let previousHeading = 1;
  for (const line of markdown.split(/\r?\n/)) {
    const heading = /^(#{1,6})\s/.exec(line);
    if (!heading) continue;
    const level = heading[1].length;
    if (level === 1 || level > previousHeading + 1) {
      issues.push(
        issue(
          file,
          'body.heading',
          'POLICY-HEADING-ORDER',
          'Структура заголовків порушена.',
          'Починайте основний зміст із H2 і не пропускайте рівні.',
        ),
      );
    }
    previousHeading = level;
  }

  return issues;
}

function resolvePublicAsset(projectRoot: string, publicPath: string): string {
  return path.join(projectRoot, 'public', publicPath.replace(/^\/+/, ''));
}

export function validateMediaReference(
  media: Record<string, unknown>,
  file: string,
  field: string,
  projectRoot: string,
): ContentPolicyIssue[] {
  const issues: ContentPolicyIssue[] = [];
  const src = typeof media.src === 'string' ? media.src : '';
  const alt = typeof media.alt === 'string' ? media.alt.trim() : '';

  if (!alt) {
    issues.push(
      issue(
        file,
        `${field}.alt`,
        'POLICY-MEDIA-ALT',
        'Відсутній альтернативний текст.',
        'Опишіть зміст і призначення зображення.',
      ),
    );
  }
  if (typeof media.license !== 'string' || !media.license.trim()) {
    issues.push(
      issue(
        file,
        `${field}.license`,
        'POLICY-MEDIA-LICENSE',
        'Не вказано право на використання.',
        'Вкажіть ліцензію або зафіксований дозвіл.',
      ),
    );
  }
  if (!media.approvedBy || !media.approvedAt) {
    issues.push(
      issue(
        file,
        `${field}.approvedBy`,
        'POLICY-MEDIA-APPROVAL',
        'Медіа не має повного затвердження.',
        'Вкажіть відповідального та дату затвердження.',
      ),
    );
  }
  if (media.containsChildren === true && !media.publicationBasis) {
    issues.push(
      issue(
        file,
        `${field}.publicationBasis`,
        'POLICY-CHILD-BASIS',
        'Не вказано підставу публікації зображення дітей.',
        'Додайте перевірену правову підставу або не публікуйте файл.',
      ),
    );
  }
  if (media.sourceUrl && !String(media.sourceUrl).startsWith('https://')) {
    issues.push(
      issue(
        file,
        `${field}.sourceUrl`,
        'POLICY-MEDIA-SOURCE',
        'URL джерела має бути HTTPS.',
        'Вкажіть повну перевірену HTTPS-адресу.',
      ),
    );
  }

  if (!src.startsWith('/media/')) {
    issues.push(
      issue(
        file,
        `${field}.src`,
        'POLICY-MEDIA-PATH',
        'Медіа має бути в каталозі /media/.',
        'Завантажте файл через медіатеку CMS.',
      ),
    );
    return issues;
  }

  const extension = path.extname(src).toLowerCase();
  if (!ALLOWED_IMAGE_EXTENSIONS.has(extension)) {
    issues.push(
      issue(
        file,
        `${field}.src`,
        'POLICY-MEDIA-MIME',
        'Формат зображення не дозволено.',
        'Використайте JPEG, PNG, WebP або AVIF.',
      ),
    );
  }

  const assetPath = resolvePublicAsset(projectRoot, src);
  if (!fs.existsSync(assetPath)) {
    issues.push(
      issue(
        file,
        `${field}.src`,
        'POLICY-MEDIA-MISSING',
        'Файл зображення не знайдено.',
        'Перевірте шлях або повторно завантажте файл.',
      ),
    );
  } else if (fs.statSync(assetPath).size > MAX_IMAGE_BYTES) {
    issues.push(
      issue(
        file,
        `${field}.src`,
        'POLICY-MEDIA-SIZE',
        'Зображення перевищує 5 МБ.',
        'Оптимізуйте зображення перед завантаженням.',
      ),
    );
  }

  return issues;
}

export function validateDocumentReference(
  document: Record<string, unknown>,
  file: string,
  field: string,
  projectRoot: string,
): ContentPolicyIssue[] {
  const src = typeof document.path === 'string' ? document.path : '';
  const issues: ContentPolicyIssue[] = [];
  const extension = path.extname(src).toLowerCase();

  if (!ALLOWED_DOCUMENT_EXTENSIONS.has(extension)) {
    issues.push(
      issue(
        file,
        `${field}.path`,
        'POLICY-DOCUMENT-MIME',
        'Формат документа не дозволено.',
        'Використайте PDF, ODT, DOCX, XLSX або CSV.',
      ),
    );
  }
  if (/\s/.test(path.basename(src))) {
    issues.push(
      issue(
        file,
        `${field}.path`,
        'POLICY-DOCUMENT-NAME',
        'Назва файла містить пробіли.',
        'Використайте lowercase kebab-case без персональних даних.',
      ),
    );
  }

  const assetPath = resolvePublicAsset(projectRoot, src);
  if (!fs.existsSync(assetPath)) {
    issues.push(
      issue(
        file,
        `${field}.path`,
        'POLICY-DOCUMENT-MISSING',
        'Файл документа не знайдено.',
        'Перевірте шлях до файла.',
      ),
    );
  } else if (fs.statSync(assetPath).size > MAX_DOCUMENT_BYTES) {
    issues.push(
      issue(
        file,
        `${field}.path`,
        'POLICY-DOCUMENT-SIZE',
        'Документ перевищує 10 МБ.',
        'Оптимізуйте або розділіть документ.',
      ),
    );
  }
  return issues;
}

export function validateContentPolicy(input: {
  frontmatter: Record<string, unknown>;
  body: string;
  file: string;
  projectRoot: string;
}): ContentPolicyIssue[] {
  const { frontmatter, body, file, projectRoot } = input;
  const issues = validateMarkdownPolicy(body, file);

  if (frontmatter.cover && typeof frontmatter.cover === 'object') {
    issues.push(
      ...validateMediaReference(
        frontmatter.cover as Record<string, unknown>,
        file,
        'cover',
        projectRoot,
      ),
    );
  }
  if (Array.isArray(frontmatter.gallery)) {
    frontmatter.gallery.forEach((media, index) => {
      if (media && typeof media === 'object') {
        issues.push(
          ...validateMediaReference(
            media as Record<string, unknown>,
            file,
            `gallery.${index}`,
            projectRoot,
          ),
        );
      }
    });
  }
  if (frontmatter.file && typeof frontmatter.file === 'object') {
    issues.push(
      ...validateDocumentReference(
        frontmatter.file as Record<string, unknown>,
        file,
        'file',
        projectRoot,
      ),
    );
  }
  return issues;
}

export function formatContentPolicyIssues(issues: ContentPolicyIssue[]): string {
  return issues
    .map(
      ({ file, field, code, message, hint }) =>
        `${file} · ${field} · ${code}\n  ${message}\n  Як виправити: ${hint}`,
    )
    .join('\n');
}

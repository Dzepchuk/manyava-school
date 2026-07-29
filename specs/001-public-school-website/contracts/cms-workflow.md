# Контракт CMS workflow

## Actors

### TechnicalAdministrator

- початково власник проєкту;
- GitHub repository `Admin`;
- керує OAuth, Netlify, secrets, users, roles, schemas і deployment;
- не використовує admin privilege для обходу quality gates без
  задокументованої emergency reason.

### EditorApprover

- початково директор ліцею;
- окремий GitHub account із repository `Write`;
- створює й змінює контент через Decap;
- перевіряє preview і публікує дозволений контент;
- не керує users, OAuth, secrets або repository settings.

## State machine

```text
Draft → In review → Ready → Published → Archived
  ↑         │          │         │
  └─────────┴──────────┘         └→ Corrected version
```

Відображення в Git:

- Draft/In review/Ready: `cms/<collection>/<slug>` branch + pull request;
- Published: merged commit у `main`;
- Archived: нова підтверджена зміна `status=archived`;
- Corrected version: новий pull request, Git зберігає попередню версію.

## Preconditions for publish

- schema validation passed;
- production build passed;
- preview deployment available;
- required fields and alt complete;
- document/legal metadata complete where applicable;
- media rights approved;
- no high/critical accessibility violation from automated checks;
- reviewer explicitly accepts preview.

## Authorization

| Action | TechnicalAdministrator | EditorApprover |
|---|---:|---:|
| Create/edit content | yes | yes |
| Review preview | yes | yes |
| Publish content | emergency/backup | yes |
| Archive/restore content | yes | yes |
| Manage users/roles | yes | no |
| Change schema/CMS config | yes | no |
| Change secrets/OAuth/deploy | yes | no |

## Failure behavior

- OAuth unavailable: public site remains operational; editing pauses.
- Preview build fails: publish blocked, current production unchanged.
- Validation fails: CMS/CI explains affected file and field.
- Netlify production deploy fails: last successful deployment remains active.
- GitHub unavailable: public static site remains active; editing and new deploy
  pause.
- Concurrent edits: pull request conflict MUST be resolved before publish; no
  silent last-write-wins.

## Adding future users

1. TechnicalAdministrator verifies identity and role approval.
2. A unique GitHub account with MFA is required.
3. Least-privilege repository role is assigned.
4. CMS access is tested with a non-production draft.
5. Access owner and review date are recorded.
6. Revoked staff access is removed promptly from GitHub and Netlify.

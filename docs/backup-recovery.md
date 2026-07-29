# Резервне копіювання та відновлення

## Цілі

- RPO: не більше 24 годин підтвердженого контенту.
- RTO: не більше 4 годин.
- Основне сховище: GitHub repository.
- Незалежна копія: окремий Git-сервіс або інший HTTPS Git remote, що не
  належить тому самому GitHub account.

## Автоматизація

`.github/workflows/backup.yml` щодня виконує `git push --mirror` до незалежного
remote. Секрети існують лише в GitHub Actions:

- `BACKUP_REMOTE_URL`;
- `BACKUP_USERNAME`;
- `BACKUP_TOKEN`.

Workflow навмисно завершується помилкою, якщо destination не налаштовано: зелена
перевірка без фактичної незалежної копії була б оманливою.

## Retention

- mirror зберігає повну Git-історію, branches і tags;
- destination повинен мати MFA, окремого власника від production account і
  retention не менше 90 днів;
- щоквартально виконується контрольне відновлення в тимчасовий repository.

## Restore drill

1. Створити порожній тимчасовий repository.
2. Clone незалежного mirror без використання production GitHub repository.
3. Виконати `npm ci`, `npm run build`, `npm run test`.
4. Розгорнути тимчасовий preview.
5. Порівняти останній підтверджений content commit.
6. Записати початок, кінець, фактичний RTO/RPO і видалити тимчасовий ресурс.

**Поточний статус**: destination secrets і фактичний restore drill ще не
підтверджені. T090–T091 залишаються відкритими до появи незалежної копії та
доказів відновлення.

# Production hosting review

**Перевірено**: 2026-07-29

## Рішення

Netlify залишається production hosting для MVP:

- Git integration із захищеною `main`;
- deploy previews для pull requests;
- custom domain і автоматичний TLS;
- OAuth provider для GitHub backend Decap CMS;
- останній успішний static deploy залишається доступним при невдалій збірці.

## Тариф і редактори

Personal/Free plan не дозволяє додаткові team-member seats. Редактори Decap не
додаються до Netlify team: вони використовують окремі GitHub accounts із
repository access. За потреби Netlify team collaboration Credit Pro включає
необмежені seats і стартує від 20 USD/місяць.

## Ризики й контроль

- pricing та credits можуть змінюватися — перевіряти щоквартально;
- Git Gateway deprecated і не використовується;
- OAuth Client Secret зберігається лише в Netlify;
- публічний сайт не залежить від OAuth у runtime;
- при зміні hosting потрібен експорт із Git, перевірка redirects, DNS і TLS.

Джерела:

- <https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans/>
- <https://docs.netlify.com/manage/security/secure-access-to-sites/oauth-provider-tokens/>
- <https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/>

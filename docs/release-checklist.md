# Production release checklist

## Автоматизовані gates

- [ ] Formatting, ESLint і Astro check.
- [ ] Content schemas та content policy.
- [ ] Unit і contract tests.
- [ ] Production build, sitemap, RSS та Pagefind.
- [ ] Internal link checker.
- [ ] Playwright desktop/mobile й axe.
- [ ] Lighthouse budgets.

## Acceptance journeys

- [x] US1: контакти, відомості про ліцей і вступ.
- [x] US2: список і detail новини, оголошення та події з чесними empty states.
- [ ] US3: реальний затверджений документ, файл і version history.
- [x] US4: тематичні hub-сторінки й безпечне звернення.
- [x] US5: пошук, metadata і empty state.
- [ ] US6: навчальна публікація директором, preview, approve, publish і revert.

## Ручне й організаційне приймання

- [ ] Нормативний реєстр затверджений уповноваженою особою.
- [ ] Стартові офіційні документи опубліковані.
- [ ] Ручний accessibility audit завершений.
- [ ] Незалежний backup destination і restore drill підтверджені.
- [ ] Директор пройшов редакторський сценарій.
- [ ] Custom domain і HTTPS перевірені.

Реліз не слід називати законодавчо повним, доки всі організаційні пункти не
підтверджені.

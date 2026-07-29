# Домен і HTTPS

## Production

- Primary domain: `https://manyava-school.if.ua`
- Alias: `https://www.manyava-school.if.ua`
- Netlify fallback: `https://manyava-school.netlify.app`
- Netlify site ID: `ec284852-86c3-49a7-983e-18b4290273fb`

## DNS

| Host  | Type  | Value                        |
| ----- | ----- | ---------------------------- |
| `@`   | A     | `75.2.60.5`                  |
| `www` | CNAME | `manyava-school.netlify.app` |

Перевірка 2026-07-29 підтвердила обидва записи. Netlify API показує виданий
сертифікат Let's Encrypt для apex і `www`, однак apex на частині edge-вузлів ще
віддає попередній самопідписаний сертифікат. До закриття T092 потрібно дочекатися
поширення конфігурації (Netlify допускає до 48 годин) та повторити:

```bash
curl -I https://manyava-school.if.ua/
curl -I https://www.manyava-school.if.ua/
```

Очікуваний результат: apex повертає `200` із валідним публічним сертифікатом,
`www` — один redirect на apex, HTTP — redirect на HTTPS.

Canonical URL задається `PUBLIC_SITE_URL=https://manyava-school.if.ua` у
production context `netlify.toml`. Зміна домену потребує оновлення
`src/data/site.yml`, Netlify custom domains, DNS, canonical, sitemap і цього
runbook.

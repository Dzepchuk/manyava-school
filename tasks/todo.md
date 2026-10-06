# School Website Specification Plan

## Публікація оновлень головної та благодійних подій — 6 жовтня 2026

- [x] Перевірити остаточний diff, форматування, збірку та тести.
- [ ] Створити коміт і pull request, пройти GitHub та Netlify preview.
- [ ] Об’єднати у main та перевірити публічні сторінки, афішу й admin.

### План

Опублікувати погоджені зміни типографіки й відступів, порядок секцій
головної та дві події з афішею. Папку `output/` із локальними PDF
і промптом не включати в коміт. Після CI й preview перевірити production.

## Відступ після breadcrumbs на всіх сторінках — 6 жовтня 2026

- [x] Визначити спільний відступ 24–32 px та застосувати його до всіх вступних блоків.
- [x] Перевірити всі маршрути з breadcrumbs на desktop/mobile й доступність.

### План

Прибрати локальні верхні margin/padding 48–112 px у page-heading та hero.
Визначити спільну CSS-змінну відступу, зберегти сітки й внутрішній вміст.

### Review

Змінну `--page-heading-gap` застосовано до всіх вступних шаблонів,
включно з пошуком і харчуванням. На 33 маршрутах із breadcrumbs
на desktop і mobile (66 перевірок) сумарний margin/padding після
breadcrumbs не перевищує 32 px; горизонтального переповнення немає.
Пошук, харчування, контакти та сторінки батьків і учнів пройшли axe
на обох viewport. Astro check, ESLint, форматування та збірка пройшли;
локальний dev також віддає оновлені відступи.

## Порожній простір перед вступом «Про ліцей» — 6 жовтня 2026

- [x] Прибрати min-height 38rem і зменшити вертикальний padding hero до 24–32 px.
- [x] Перевірити відступ після breadcrumbs, фото та доступність на desktop/mobile.

### Review

Відступ від breadcrumbs до вступу — 32 px на desktop і 24 px на mobile.
Фото видиме; axe-порушень і переповнення немає. Astro check, ESLint
та форматування пройшли. Зміни доступні локально.

## Новини на першому екрані головної — 6 жовтня 2026

- [x] Переставити «Актуальне» перед «Основна інформація».
- [x] Скоротити hero, щоб картка новини була видима відразу на desktop/mobile.
- [x] Перевірити порядок, видимість новини, посилання та доступність.

### План

Зберегти вступ, кнопки та всі секції, але зменшити вертикальні відступи
hero й декоративну ілюстрацію на desktop. На mobile приховати декор,
що не містить інформації, щоб він не відсував новини за перший екран.
Переставити секції у DOM, зберігши якір `#essentials`.

### Review

Після компактного hero йде «Актуальне», потім «Основна інформація».
Декоративна ілюстрація на desktop зменшена з 26 до 16rem, на mobile
прихована; зменшено відступи hero й опису. Початок заголовка картки
новини видно без прокручування на 1440×900, 1366×768, 393×851 і 375×667;
на desktop він не перекритий fixed footer. Якір кнопки основної інформації
працює після перестановки. На всіх чотирьох viewport немає axe-порушень
і горизонтального переповнення. Astro check, ESLint, форматування та
production build пройшли; зміни доступні локально.

## Відступи між секціями головної — 6 жовтня 2026

- [x] Прибрати сумування завеликих вертикальних відступів між секціями.
- [x] Виміряти проміжки на desktop/mobile та перевірити доступність і форматування.

### План

Поточний проміжок між картками та «Актуальне» становить 128 px:
по 64 px від кожної сусідньої секції. Зменшити міжсекційні відступи
до 32–48 px, зберігши внутрішні відступи зеленого блоку.

### Review

Проміжки між картками, блоком «Актуальне» та зеленим блоком становлять
48 px на desktop і 32 px на mobile замість 128 px між першими двома.
Зменшено також нижній відступ hero. Форматування й diff check пройшли;
axe-порушень та горизонтального переповнення на обох viewport немає.

## Благодійна ярмарка «З турботою про захисників» — 6 жовтня 2026

- [x] Додати подію для 1–6 класів 9 жовтня о 13:00 і для 7–11 класів 13 жовтня без вигаданого часу.
- [x] Показати дату навіть коли час потребує уточнення, перевірити календар і головну.
- [x] Додати відтворену афішу за вкладенням користувача після уточнення «Use this».
- [x] Перевірити контент, збірку, посилання й desktop/mobile.

### План

Джерело — текст і афіша в повідомленні користувача. Рік 2026 відповідає
поточному контексту та п’ятниці 9 жовтня. Створити два пов’язані записи
подій у Манявському ліцеї: підтверджений початок 9 жовтня о 13:00 та
13 жовтня з невідомим часом. Описати домашні смаколики, запрошення родин
і громади та передачу зібраних коштів захисникам за текстом джерела.
Афіша відсутня у workspace і Downloads; запитано Drive-посилання.

### Review

Додано дві пов’язані події. На головній показано найближчу — 9 жовтня
о 13:00; у календарі є обидві дати. Для 13 жовтня показано дату й
«Час буде уточнено», без вигаданого часу. Старий тест календаря тепер
підтримує як список подій, так і порожній стан.

Користувач не має окремого оригіналу. Через built-in ImageGen відтворено
надану афішу; звірено всі написи, дату й класи. Файл збережено як
`public/media/blahodiina-yarmarka-2026.jpg` (1024 × 1536, 561803 байти),
джерело й характер відтворення зафіксовано у реєстрі медіа. Промпт:
`output/imagegen/fair-poster-prompt.md`. Афіша не обрізається й обмежена
шириною 28rem; розміщена після деталей події.

Astro check, ESLint, форматування, production build, внутрішні посилання,
37 unit-тестів, 2 перевірки медіареєстру та 22 цільові браузерні тести пройшли.
Окремо на desktop/mobile перевірено головну, обидві події, календар,
переходи, дату без часу, пропорції афіші та axe; переглянуто mobile-скриншот.
Локальний dev-сервер перезапущено для підхоплення нової колекції подій.

## Спрощення блоку актуальних матеріалів — 6 жовтня 2026

- [x] Замінити великий вступ компактним заголовком «Актуальне».
- [x] Зберегти три колонки, прибрати невикористані стилі й перевірити desktop/mobile.

### План

Застосувати той самий компактний стиль, що й для основної інформації;
прибрати повтор назв колонок і пояснення про перевірені матеріали.

### Review

Обидва компактні заголовки головної використовують спільний клас.
Прибрано зайвий вступ і невикористані стилі; новину, порожні стани та
три посилання збережено. Astro check, ESLint і форматування пройшли.
Desktop/mobile перевірки підтвердили розмір до 32 px, три колонки,
посилання й відсутність переповнення або axe-порушень.

## Спрощення блоку основної інформації — 6 жовтня 2026

- [x] Замінити великий вступ компактним H2 «Основна інформація».
- [x] Перевірити три картки, перехід із головного екрана та доступність на desktop/mobile.

### План

Прибрати гасло й пояснення про реєстрацію, зберегти три картки та якір
`#essentials`. Застосувати заголовок 24–32 px із коротким відступом.

### Review

Гасло й пояснення прибрано; три картки з посиланнями залишено.
Astro check, ESLint і форматування пройшли. На desktop/mobile браузер
підтвердив компактний H2, три картки, правильні посилання й якір;
axe-порушень немає. Зміни доступні у локальному dev-перегляді.

## Компактні заголовки на всіх сторінках — 6 жовтня 2026

- [x] Запровадити спільний розмір H1 і прибрати локальні завеликі стилі.
- [x] Перевірити всі згенеровані сторінки на desktop/mobile.
- [x] Перевірити доступність, збірку, форматування й підготувати локальний перегляд.

### План

Застосувати погоджену шкалу 28–48 px до всіх H1 через global.css.
Прибрати дубльовані розміри, щільну міжрядкову відстань і вузькі обмеження
ширини заголовків у шаблонах; зберегти сітки та решту оформлення.
Перевірити кожен маршрут зі збірки, довгі українські назви та головну.

### Review

Шкалу H1 28–48 px визначено у global.css. Прибрано дубльовану типографіку
у 14 шаблонах і компонентах, включно з головною, пошуком, контактами,
харчуванням, сторінками аудиторій та 404. Astro check, ESLint, форматування
й production build пройшли. Браузер перевірив 33 сторінки на desktop
і mobile (66 перевірок): усі H1 у спільному діапазоні, без переповнення
заголовка або сторінки. Головна, «Про ліцей», контакти, харчування та
довга новина пройшли axe на обох viewport. Переглянуто скриншоти головної.
Зміни доступні локально на портах 4321 (dev) та 4322 (production preview).

## Компактні заголовки публікацій — 6 жовтня 2026

- [x] Зменшити заголовок і відступи спільного компонента публікацій.
- [x] Перевірити довгу назву новини на desktop/mobile та при збільшенні масштабу.
- [x] Перевірити доступність, збірку й записати результат.

### План

У спільному заголовку новин, подій, оголошень і документів замінити
діапазон 48–96 px на 28–48 px. Зменшити вертикальні відступи, щоб
опис і початок матеріалу були ближче до заголовка. Зберегти безпечне
перенесення довгих українських слів та перевірити реальні браузерні розміри.

### Review

Заголовок новини на desktop зменшено з 96 до 48 px, на mobile —
з 48 до 28 px. Початок статті перемістився з 857 до 477 px на desktop
і з 760 до 542 px на mobile. Зміна застосовується до спільного компонента
публікацій; переглянуто обидва скриншоти. Astro check, ESLint,
форматування, production build та 22 цільові тести доступності пройшли.
Нову статтю окремо перевірено через axe без порушень на обох viewport.
При 200% CSS zoom заголовок переноситься в межах своєї колонки.
Перевірка всієї сторінки при такому масштабі виявила наявне обмеження
`body { min-width: 20rem; }`; загальні стилі сторінки цим завданням не змінено.
Зміни локальні для перегляду.

## Публікація новини «Безпека і закон» — 5 жовтня 2026

- [x] Перевірити остаточні зміни, збірку та цільові тести.
- [x] Надіслати зміни в GitHub через pull request і пройти перевірки.
- [x] Об’єднати зміни та перевірити production deploy, новину, фото й `/admin/`.

### План

Опублікувати лише новину, фото, посилання зі сторінки безпеки та робочі
записи; локальну папку `output/` не включати в коміт. Зберегти погоджене
розміщення фото всередині статті без обкладинки картки. Після успішних
перевірок GitHub об’єднати pull request у `main`, дочекатися Netlify
та перевірити публічні сторінки.

### Review

Остаточна версія з фото всередині статті пройшла Astro check, ESLint,
форматування, content policy, production build, внутрішні посилання,
37 модульних тестів і 34 цільові браузерні перевірки.

Pull request №16 пройшов quality, browser та Netlify preview й об’єднаний
у `main` через rebase (коміт `fc63ffe`). Production CI №37328797244 пройшов.
На `https://manyava-school.if.ua` головна, список новин, нова стаття,
сторінка безпеки й `/admin/` повернули HTTP 200. JPEG має правильний MIME
та ті самі байти, що й локальний файл. На desktop/mobile перевірено
переходи, фото всередині статті без обкладинки та відсутність axe-порушень.

## Новина про бесіди «Безпека і закон» — 5 жовтня 2026

- [x] Прочитати Google Doc, перевірити посилання на фото й структуру новин.
- [x] Додати українську новину за документом без непідтвердженої дати заходу.
- [x] Пов’язати новину зі сторінкою безпеки та перевірити зміни.
- [x] Додати знайдене у наданій папці фото заходу без обрізання та перевірити його відображення.
- [x] Додати фото як обкладинку картки новини й перевірити головну, список та статтю.
- [x] За запитом користувача скасувати обкладинку й повернути фото в текст статті.

### План

Опублікувати текст у колекції новин із датою публікації 2026-10-05;
не вказувати дату заходу, якої немає в джерелі. Передати теми бесід для
8–11 класів і формат діалогу без додавання юридичних тверджень.
Додати взаємні посилання з розділом «Безпека в інтернеті».
Перевірити контент, збірку, внутрішні посилання та відображення на комп’ютері й телефоні.

Після уточнення папки знайдено «04. Фото заходу Тетяни Яр.»
(`1BUmh6Ip9I773HAWrkVSDsZV4xFndndq-`). Зберегти оригінальний JPEG,
зареєструвати джерело та підставу публікації за запитом користувача,
розмістити колаж у тексті новини з посиланням на повний розмір.

### Review

Додано `/news/bezpeka-i-zakon/` за текстом Google Doc
`1RbWFnmQUOCrtt1ZGYuvOsWh3Fd59MjWuDxCpY9Ulu3E` (вкладка `t.0`).
Дата публікації — 5 жовтня 2026; дату заходу джерело не містить.
Новину пов’язано взаємними посиланнями зі сторінкою `/parents/safety/`.
Наданий Drive-файл `1qYAZOjFVVslPcADW9i3UvWsENISVVaCs` є раніше
опублікованою інфографікою про наказ МОН № 243. Після уточнення папки
додано правильне фото `1BUmh6Ip9I773HAWrkVSDsZV4xFndndq-`:
колаж 1600 × 1067, JPEG, 232030 байтів. Копія має той самий SHA-256,
що й завантажений оригінал. Джерело та запит користувача на публікацію
зафіксовано в реєстрі медіа; окремі документи згоди не перевірялися.
Зміни залишаються локальними.

`npm run check`, `npm run build`, `npm run check:links` та перевірка
форматування змінених файлів пройшли. Усі 12 цільових Playwright-тестів
пройшли. Окремо перевірено новину зі списку, текст джерела, взаємні
переходи, відсутність переповнення та axe-порушень на desktop і mobile;
переглянуто скриншоти обох варіантів.

Після додавання фото повторно пройшли збірка, Astro check, ESLint,
перевірки форматування, внутрішніх посилань і 2 тести реєстру медіа.
На desktop і mobile перевірено повні пропорції фото без обрізання,
посилання на повний розмір, HTTP 200, MIME, розмір завантаження,
відсутність переповнення та axe-порушень.

За уточненням користувача фото додано в `cover`, щоб воно було видиме
на картці головної та у списку новин. Прибрано дубль із Markdown;
посилання на повний розмір залишено. Збірка й форматування пройшли;
браузерна перевірка desktop/mobile підтвердила одне видиме фото на
головній, у списку новин і у статті без горизонтального переповнення.

## Публікація фото харчування та гуртків — 20 вересня 2026

- [x] Перевірити чистоту Git, локальну збірку та цільові тести.
- [x] Надіслати коміти в GitHub і дочекатися production deploy.
- [x] Перевірити публічні сторінки, PDF і `/admin/` на production.

### Review

Pull request №9 пройшов quality, browser і Netlify preview; об’єднано в
`main` через rebase. Netlify опублікував production deploy для коміту
`8080477`. На `https://manyava-school.if.ua` сторінки гуртків і харчування,
обидва PDF, обидва фото та `/admin/` повернули HTTP 200; `/admin` повернув
один редирект на `/admin/`. Production CI для `main` також пройшов.

## Гуртки та позашкільна освіта — 19 вересня 2026

- [x] Звірити обидва затверджені скани та розділити гуртки ліцею й позашкільної освіти.
- [x] Створити читабельну сторінку з усіма назвами, класами, днями, часом і керівниками.
- [x] Додати переходи з розділів «Учням» і «Батькам» та обидва PDF-джерела.
- [x] Перевірити контент, збірку, доступність і мобільне відображення.

### Review

Опубліковано 10 гуртків ліцею та 2 гуртки позашкільної освіти з класами,
часом і керівниками. Для суботи залишено формулювання джерела про практичні
заняття, екскурсії та походи без вигаданого часу. Обидва PDF збережено без
змін; контрольні SHA-256 збігаються з файлами користувача.

Контентна валідація, Astro check, ESLint, production build, 37 unit/content
тестів, перевірка внутрішніх посилань і 6 цільових браузерних тестів пройшли.
Сторінку переглянуто на desktop і mobile; горизонтального переповнення й
axe-порушень немає.

## Два нові фото харчування — 19 вересня 2026

- [x] Знайти у Downloads та звірити обидва вихідні фото.
- [x] Оптимізувати обидва фото для галереї й додати записи до реєстру медіа.
- [x] Додати обидва фото до сторінки й оновити опис галереї.
- [x] Зафіксувати повідомлення користувача про підтверджену директором згоду батьків.
- [x] Запустити валідацію, збірку й цільову перевірку сторінки.

### Review

Обидва фото додано. Підставу публікації другого фото записано відповідно до
повідомлення користувача про підтвердження директора; самі документи згоди
не перевірялися.
Контентна валідація, Astro check, ESLint і production build успішні. Чотири
браузерні тести сторінки на desktop і mobile пройшли; порушень доступності й
горизонтального переповнення не виявлено. Перший запуск браузерних тестів
перервався через оновлення контексту сторінки під час аналізу доступності;
повторний запуск пройшов повністю.

## Читабельне чотириденне меню — 14 вересня 2026

- [x] Розпізнати всі страви з наданого меню та звірити їх із таблицями у PDF.
- [x] Замінити помилковий чотиритижневий опис на цикл «День 1–4».
- [x] Додати читабельний список страв для кожного дня та вікової групи.
- [x] Перевірити адаптивність, доступність, збірку й браузерні тести.

### Review

- Перші чотири дні першого тижня виписано зі скану як ротацію «День 1–4»;
  після четвертого дня цикл починається знову.
- Для кожного дня опубліковано назву дня з документа та повний перелік страв;
  уточнено, що розмір порції залежить від віку учнів.
- На мобільних пристроях картки складаються в одну колонку для комфортного
  читання; повний PDF залишено як документ-джерело.
- Astro check, ESLint, production build, 37 unit/content тестів і 4 цільові
  Playwright-тести на desktop/mobile успішні; axe-порушень і горизонтального
  переповнення немає.

## Сторінка харчування — 14 вересня 2026

- [x] Переглянути повністю графік харчування та чотиритижневе меню з наданих PDF.
- [x] Визначити й оптимізувати два надані фото без публікації персональних даних.
- [x] Оновити сторінку «Організація харчування» та додати завантаження документів.
- [x] Додати цільові перевірки контенту, доступності й адаптивності.
- [x] Виконати валідацію, тести, production build і візуальну перевірку.

### Review

- Опубліковано окрему сторінку харчування з чотиритижневим циклом меню,
  точним графіком для чотирьох груп класів і завантаженням двох вихідних PDF.
- Два надані фото без дітей і персональних даних оптимізовано у WebP та
  зареєстровано в журналі прав на медіа.
- Усунуто виявлені axe проблеми контрасту й дубльованої `main`-області.
- Контентна валідація, Astro check, ESLint, 37 unit/content тестів, production
  build, перевірка посилань і 4 Playwright-тести на desktop/mobile успішні.
- Сторінку візуально перевірено повністю на desktop і mobile; горизонтального
  переповнення немає.

## Опис Маняви та регіону — 18 серпня 2026

- [x] Витягти факти з наданої фотографії друкованого матеріалу.
- [x] Перефразувати опис без копіювання захищеного тексту й без публікації скану.
- [x] Додати регіональний блок на сторінку «Про ліцей».
- [x] Перевірити адаптивність, доступність і production build.

### Review

- Додано блок «Манява і Карпати» з трьома темами: природне середовище,
  історія та традиції, школа і громада.
- Збережено фактичну основу наданого матеріалу, але текст повністю
  перефразовано; фотографію друкованої сторінки не опубліковано.
- Джерело походження опису прозоро зазначено в примітці сторінки.
- Контентна валідація, Astro check, ESLint і production build пройшли;
  6 цільових Playwright-тестів доступності та адаптивності успішні на desktop
  і mobile.

## Новина про правила доступу — 18 серпня 2026

- [x] Перевірити наказ МОН № 243 за офіційним джерелом.
- [x] Адаптувати допис офіційної Facebook-сторінки у формат новини сайту.
- [x] Додати посилання на чинний нормативний документ і джерело допису.
- [x] Оновити браузерний тест новин і перевірити збірку.

### Review

- Наказ МОН № 243 від 11.02.2026 підтверджено в базі Верховної Ради: чинний,
  зареєстрований Мін’юстом за № 436/45830, набрав чинності 17.04.2026.
- Відокремлено локальний порядок входу Манявського ліцею від загальних Типових
  правил; уточнено вимогу документа для відвідувачів і виняток для
  собак-поводирів.
- Новину опубліковано без неперевіреного зображення, з посиланнями на наказ і
  першоджерело у Facebook.
- Контентна валідація, Astro check, ESLint, production build, 37 unit/content
  тестів і 6 Playwright-тестів на desktop та mobile пройшли успішно.

## Публікація статуту та офіційних реквізитів — 18 серпня 2026

- [x] Перевірити наданий скан статуту та виписати підтверджені реквізити.
- [x] Додати реквізити до валідованих налаштувань і сторінки «Про ліцей».
- [x] Опублікувати чинну редакцію статуту в каталозі документів.
- [x] Оновити CMS-контракт і тести каталогу документів.
- [x] Виконати форматування, перевірки, збірку та браузерну перевірку.

### Review

- Переглянуто всі 21 сторінку наданого скану; підтверджено рішення
  № 2833/53/2026 від 14.07.2026 та реквізити з пунктів 1.1–1.10.
- На сторінку «Про ліцей» додано повну назву, ЄДРПОУ, тип закладу,
  власність, засновника, орган управління та повну адресу.
- Опубліковано PDF і доступний текстовий опис статуту; документ позначено
  чинним і пов’язано з підтвердженою вимогою статті 30 Закону України
  «Про освіту».
- `npm run validate:content`, `npm run check`, `npm run build` і `npm test`
  пройшли; 37 unit/content тестів та 6 цільових Playwright-тестів на desktop
  і mobile успішні.

## Goal

Create a practical, version-controlled specification for the official website of
Манявський ліцей Солотвинської селищної ради, based on the decisions captured
in the shared ChatGPT conversation and grounded in the current repository.

The specification must be written in Ukrainian. English may be used only for
stable technical identifiers, technology names, code fragments, and terms whose
translation would reduce precision. Ukrainian terminology must be preferred in
all explanatory text.

## Plan

- [x] Read and summarize the shared ChatGPT conversation.
- [x] Inspect the repository structure and current Git state.
- [x] Establish the specification hierarchy, terminology, requirement IDs, and
      traceability rules.
- [x] Draft the project constitution.
- [x] Draft the baseline product specification and product vision.
- [x] Define stakeholders, user groups, MVP scope, and explicit exclusions.
- [x] Define information architecture and the public content model.
- [x] Define the initial public content model.
- [x] Write functional requirements and measurable acceptance criteria for the
      MVP modules.
- [x] Define accessibility, privacy, security, performance, SEO, availability,
      backup, and maintainability requirements.
- [x] Document assumptions, unresolved questions, dependencies, and risks.
- [x] Evaluate the legacy website and record the decision not to migrate its
      content into the MVP.
- [x] Define a phased roadmap and the first vertical implementation slice.
- [x] Review all documents for internal consistency, duplicate requirements,
      missing acceptance criteria, and traceability.
- [x] Add a review/results section to this file describing the completed
      deliverables and verification performed.

## Spec Kit Deliverables

```text
.specify/
├── memory/constitution.md
├── templates/
└── feature.json

specs/
└── 001-public-school-website/
    ├── spec.md
    ├── checklists/requirements.md
    ├── plan.md
    ├── research.md
    ├── data-model.md
    ├── quickstart.md
    └── tasks.md
```

The first draft will distinguish verified requirements from legal assumptions.
Any legal statement that requires confirmation by the school or a Ukrainian
legal specialist will be marked explicitly rather than presented as legal
advice.

## Review

### Speckit Specify

- Created baseline specification:
  `specs/001-public-school-website/spec.md`.
- Created and completed the requirements quality checklist.
- Validation found no unresolved clarification markers, placeholders, duplicate
  requirement IDs, or implementation-specific technology choices.
- Current scope contains 6 user stories, 22 acceptance scenarios, 30 functional
  requirements, 21 quality requirements, and 11 measurable success criteria.
- Clarification decisions were integrated into the specification: initial CMS
  roles, no legacy-content migration, mandatory news and official documents,
  no MVP forms, and deferred AIKOM integration.

### Speckit Plan

- Created `plan.md` with the technical context, architecture, security and
  operational rules, quality gates, delivery phases, and a first vertical
  slice.
- Created `research.md` documenting the selected static-site, CMS, hosting,
  search, testing, and backup approaches together with rejected alternatives.
- Created `data-model.md` and contracts for content schemas, CMS workflow, and
  public routes.
- Created `quickstart.md` with future implementation and acceptance checks.
- Re-ran the constitution gate after design: all principles pass; the justified
  operational complexity is limited to CMS OAuth and managed preview hosting.
- Verified that all planned artifacts exist and contain no unresolved
  clarification markers, template placeholders, `TODO`, or `TBD` entries.
- Confirmed there are no Spec Kit extension hooks configured for this project.
- Next phase: generate dependency-ordered implementation tasks with
  `speckit-tasks`.

### Speckit Tasks

- Created `specs/001-public-school-website/tasks.md` with 96 sequential,
  executable tasks across setup, foundation, six user stories, and production
  readiness.
- Included mandatory tests before implementation for critical publication,
  access-control, privacy, accessibility, search, and recovery scenarios.
- Identified 49 explicitly parallelizable tasks while preserving blocking phase
  and story dependencies.
- Mapped all 51 functional and quality requirement IDs to implementation tasks
  and verification tasks.
- Defined the first vertical slice as US2 + US6 after the required foundation:
  create news → preview → approve → publish → accessibility check → revert.
- Validated task IDs, checklist syntax, story labels, exact paths, requirement
  coverage, and absence of placeholders or unresolved clarification markers.
- Next phase: run `speckit-analyze` before implementation.

### Speckit Implement — Foundation

- Completed T001–T020: Astro setup, pinned dependencies, formatting/linting,
  project structure, Netlify build, shared schemas, Ukrainian date helpers, SEO
  metadata, design tokens, semantic layout, common components, validated YAML
  settings, security headers, sitemap, CI, axe and Lighthouse gates.
- Added a temporary visual homepage shell so stakeholders can review the design
  before real content implementation starts.
- Kept the public foundation serverless and free of client-side JavaScript.
- Removed `decap-cms-app` from the current dependency tree after `npm audit`
  identified high-severity transitive advisories, including an advisory without
  an available fix. The CMS integration task T046 must choose a safe, pinned
  delivery method after re-evaluation.
- Verified Astro check, ESLint, formatting, unit-test runner, production build,
  Pagefind indexing, desktop/mobile Playwright + axe, Lighthouse gates, and a
  production-dependency audit with zero known vulnerabilities.

### Speckit Implement — Contacts

- Completed T027 with a standalone `/contacts/` route sourced from validated
  `site.yml` settings and independent of maps, forms, or external services.
- Added per-field publication flags so unverified phone, email, or office hours
  are absent from public HTML instead of appearing as plausible placeholders.
- Added a safe editorial state explaining that official contact details are
  being verified.
- Added unit coverage for contact publication rules and desktop/mobile
  Playwright + axe coverage, including keyboard focus and 320 px reflow.
- Left T021–T023 open because their task scope also covers pages, admission,
  navigation depth, and the complete US1 journey beyond the contacts page.

### About Page

- [x] Record verified public facts and their sources.
- [x] Add route, metadata, semantic sections, and source note for `/about/`.
- [x] Add route, privacy, accessibility, and 200% reflow tests.
- [x] Run formatting, checks, tests, and production build.
- [x] Review the page in the local browser at desktop and mobile widths.

#### Review

- Used АІКОМ as the authoritative source for institution type, ownership,
  language of instruction, governance, and address.
- Used the public Facebook page and the previous school site only to identify
  broad community themes; copied no photos or children's personal data.
- Deliberately omitted volatile staffing figures and leadership details from
  the about page.
- Confirmed 320 px mobile reflow, keyboard focus, axe accessibility, the 200%
  reflow equivalent, metadata, source links, and absence of forms, embeds, and
  images.
- Passed Astro check, ESLint, Vitest, production build with Pagefind, and 12
  relevant Playwright tests across desktop and mobile projects.

### About Page — Community Heading Fix

- [x] Add a regression test that compares the heading and card-column bounds.
- [x] Keep the long Ukrainian heading inside its grid column.
- [x] Verify desktop, mobile, and 200% reflow behavior.

### Homepage — School Introduction

- [x] Add an end-to-end test for visitor-focused school information.
- [x] Replace the technical-principles block with a concise school introduction.
- [x] Link the introduction to `/about/` and verify responsive behavior.

#### Review

- Removed the developer-facing `Mobile-first`, accessibility, and editorial
  workflow marketing copy from the homepage.
- Added a verified school summary, three visitor-focused themes, and a direct
  `/about/` link.
- Confirmed no horizontal overflow at 375 px and visually reviewed the section
  at 1440 px and 390 px browser widths.
- Passed Astro check, ESLint, Vitest, production build with Pagefind, and 10
  relevant Playwright tests across desktop and mobile projects.

### About Page — School Photo

- [x] Update the content test for one meaningful, locally hosted school photo.
- [x] Replace the decorative hero landscape with the provided building photo.
- [x] Add intrinsic dimensions, accessible alternative text, and responsive styles.
- [x] Verify build, accessibility, desktop, and mobile presentation.

#### Review

- Converted the supplied 592 × 299 PNG to a 35 KB WebP stored locally in
  `public/media/`; the page has no runtime dependency on Facebook or another
  image host.
- Added intrinsic dimensions, `fetchpriority="high"`, and the alternative text
  «Будівля Манявського ліцею».
- Updated the transparency note to distinguish the supplied building photo from
  children's images and personal data.
- Passed Astro check, ESLint, Vitest, production build with Pagefind, and 8
  about-page Playwright/axe tests on desktop and mobile.

### Speckit Implement — User Story 1 Completion

- [x] T021 Add validation tests for pages, site settings, and navigation depth.
- [x] T022 Add ≤3-transition journeys for contacts, admission, and school information.
- [x] T023 Add keyboard, focus-order, axe, and 200% reflow coverage.
- [x] T024 Define the validated `pages` content collection and Markdown policy.
- [x] T025 Add reviewed content records for About, Leadership, and Admission.
- [x] T026 Complete homepage routes and the contact-information entry point.
- [x] T028 Generate stable content pages with breadcrumbs and review metadata.
- [x] T029 Add accessible desktop/mobile navigation with at most three levels.
- [x] T030 Add a useful accessible 404 page.

#### Review

- Completed the full US1 route set with `/about/`, `/about/leadership/`,
  `/admission/`, `/contacts/`, homepage entry points, and a custom 404.
- Added a strict Page schema, canonical-path uniqueness guard, safe Markdown
  guard, owner/review metadata, and maximum three-level navigation validation.
- Replaced the horizontal mobile navigation strip with a keyboard-operable menu
  and added a nested desktop menu for About, Leadership, and Admission.
- Confirmed all key information is one meaningful transition from the homepage,
  below the three-transition requirement.
- Built six static pages and indexed the five public content routes with
  Pagefind; 320 px reflow and axe checks pass across the complete US1 route set.

# Speckit Implement — User Story 2

- [x] Перевірити вимоги, модель даних, контракти й задачі US2.
- [x] Написати unit, content contract, e2e та accessibility тести.
- [x] Реалізувати схеми, helpers і перевірений демонстраційний контент.
- [x] Створити картки, списки, архіви та detail-сторінки.
- [x] Додати актуальні публікації на головну.
- [x] Виконати повну перевірку й задокументувати результат.

## Review

- Реалізовано повний потік US2 для новин, оголошень і подій: колекції, валідація,
  автоматичне сортування й архівування, картки, списки та detail-маршрути.
- Додано одну правдиву новину про підготовку офіційного сайту. Для непідтверджених
  оголошень і подій використано порожні стани без вигаданих фактів.
- Головна сторінка показує останню новину, актуальне оголошення й найближчу
  подію або відповідний порожній стан.
- `npm test`: 13/13; `npm run check`: 0 помилок; `npm run build`: 13 сторінок;
  `npm run test:e2e`: 50/50 на desktop і mobile.
- Окремо перевірено семантичну структуру та компонування головної в локальному
  браузері: горизонтального переповнення немає.

# Speckit Implement — User Story 6

- [x] Перевірити вимоги й задачі CMS workflow.
- [x] Додати contract, boundary та browser smoke тести.
- [x] Реалізувати український Decap CMS shell і editorial workflow.
- [x] Додати build-blocking content policy та українські помилки.
- [x] Налаштувати Netlify contexts, redirect і security headers.
- [x] Документувати ролі, MFA, onboarding, revocation, conflict і revert.
- [ ] Провести реальний training publish-preview-approve-revert із GitHub Admin/Write
      акаунтами та Netlify preview.

## Review

- Decap CMS 3.15.1 доступний через `/admin/`, показує українську кнопку входу
  через GitHub і не містить credentials у репозиторії.
- Форми Pages/News/Notice/Event відповідають Astro schemas, використовують
  `editorial_workflow` і збирають review та media-rights metadata.
- `npm run build` спочатку блокує небезпечний Markdown, URL, недозволені або
  завеликі файли та неповні права на медіа.
- Pagefind знайшов 14 HTML-файлів, але проіндексував 13 публічних сторінок:
  `/admin/` не потрапив до індексу.
- Перевірки: 22/22 unit/contract, 52/52 Playwright desktop/mobile, Astro check і
  lint без помилок.
- T053 лишається відкритою: для чесного результату потрібні реальні GitHub
  `Admin`/`Write`, MFA, Netlify OAuth і deploy preview.

# Fix Netlify admin redirect loop

- [x] Reproduce and identify the redirect loop on `/admin/`.
- [x] Remove the redundant forced `/admin` redirect from `netlify.toml`.
- [x] Permit Decap CMS dynamic evaluation only within the `/admin/*` CSP.
- [x] Run formatting, project checks, and a production build.
- [x] Deploy through the protected `main` workflow and verify `/admin` performs
      one canonical redirect while `/admin/` returns the working editor.

## Review

- Production `/admin` returns one `301` to `/admin/`; `/admin/` returns `200`.
- The admin-only CSP permits Decap CMS evaluation while the public-site CSP
  remains unchanged.
- Decap CMS rendered its GitHub login action on the deploy preview with no
  browser console errors.
- GitHub quality, browser, and Netlify deploy-preview checks passed before the
  production merge.

# Contacts and specification completion

- [x] Run Spec Kit prerequisites and verify all feature checklists.
- [x] Add the confirmed director, email, phone number, and postal address to the
      canonical site data.
- [x] Verify the contacts page on desktop, mobile, and with accessible links.
- [x] Run `speckit-converge` against the implemented website.
- [x] Execute every locally actionable remaining task through `speckit-implement`.
- [x] Run the full quality, build, content, browser, and Lighthouse test suites.
- [x] Review the final diff against the specification and document results.
- [ ] Publish through the protected `main` workflow and smoke-test production.

## Review

- Додано підтверджені контакти, ім’я директорки та CMS-форму для подальшого
  редагування контактів без коду.
- Реалізовано документи й прозорість, сторінки для батьків та учнів, протидію
  булінгу, пошук Pagefind, RSS, SEO, реєстр медіаправ і responsive-зображення.
- Додано link checker, Lighthouse budgets, документацію домену, аналітики,
  доступності, резервування, релізу та трасованості.
- Перевірки: Astro/lint без помилок; 37/37 Vitest; build і link checker успішні;
  Playwright 79/80 у повному запуску з одним нестабільним focus-тестом, який
  одразу пройшов 3/3 ізольовано; Lighthouse завершився без blocking failures.
- Відкритими лишаються T053, T056, T088, T090–T092, T094–T095: вони потребують
  навчання директора, реальних офіційних документів, ручного screen-reader
  аудиту, незалежного backup destination/restore drill, завершення поширення TLS
  або фінального production sign-off.

# Sticky footer

- [x] Inspect the shared page layout and existing footer styles.
- [x] Keep the footer visible while scrolling without overlaying page content.
- [x] Re-run focused browser coverage and project checks after correcting the behavior.

## Review

- The earlier normal-flow implementation did not match the requested interaction
  because the footer disappeared while scrolling. It is now fixed to the viewport,
  with responsive bottom spacing reserved on the document body.
- Browser inspection confirmed that the footer retains identical viewport
  coordinates before and after a real page scroll and that the reserved body
  spacing exceeds the rendered footer height.
- `npm run check` and the production build passed; the corrected focused
  Playwright suite passed 4/4 tests across desktop and mobile projects.

# Mobile footer viewport space

- [x] Inspect the fixed-footer styles and existing browser coverage.
- [x] Return the footer to normal document flow at the phone breakpoint.
- [x] Verify desktop fixed behavior and mobile scrolling behavior.

## Review

- At widths up to 40rem, the footer now follows the page content and the body no
  longer reserves space for a fixed footer. Larger screens retain the existing
  fixed footer behavior.
- Astro check, ESLint, the production build, formatting, and diff validation
  passed. The focused Playwright suite passed 4/4 tests across desktop and
  mobile projects.
- Pull request №11 passed GitHub quality, browser, and Netlify preview checks;
  it was rebased into `main` as commit `813b831` and deployed to production.
- Production returned HTTP 200. Browser inspection at 1280px confirmed the
  desktop footer remains fixed, while at 412px it uses normal flow with no
  reserved body space and appears only after scrolling to the page bottom.

# Navigation accordion

- [x] Inspect the current desktop dropdown and mobile navigation structure.
- [x] Add regression coverage for single-open desktop and mobile menu sections.
- [x] Close an open desktop menu item when a peer item opens.
- [x] Replace the expanded mobile navigation tree with accordion sections.
- [x] Verify accessibility, desktop/mobile behavior, checks, and production build.

## Review

- Desktop dropdowns now form a native single-open disclosure group, so opening
  a peer closes the previously expanded menu.
- Mobile navigation uses single-open accordion sections with clear plus/minus
  indicators and explicit overview links instead of a permanently expanded tree.
- Updated the existing mobile journey test to open the relevant accordion
  before selecting its child destination.
- `npm run check` passed; the focused navigation/accessibility run passed 18/18
  applicable tests across desktop and mobile (2 viewport-specific skips); and
  the production build generated 25 pages with a 23-page Pagefind index.

# School development strategy

- [x] Inspect the supplied PDF and confirm its title, approval date, and period.
- [x] Publish the original PDF and accessible document summary.
- [x] Add browser coverage for catalog visibility and downloading.
- [x] Run content validation, project checks, build, and focused browser tests.

## Review

- Published the unchanged 34-page source PDF as an organizational document with
  its confirmed 2022–2029 period and 31 August 2022 pedagogical-council date.
- Added a concise accessible summary without claiming an unverified mandatory-
  publication status.
- Source and published SHA-256 hashes match; content validation, Astro check,
  lint, production build, and all 37 Vitest tests passed.
- The focused documents suite passed 6/6 across desktop and mobile; the local
  page and PDF both return HTTP 200 with the correct PDF content type and size.

# Attestation certificate and EDR extract

- [x] Inspect every page and record exact document metadata.
- [x] Publish both original PDF scans with accessible summaries.
- [x] Mark the expired attestation certificate as archival.
- [x] Extend desktop and mobile document coverage.
- [x] Run content validation, checks, build, and tests.

## Review

- Published the unchanged one-page attestation certificate and three-page EDR
  extract; each published SHA-256 hash matches its supplied source.
- Identified the registry document by its printed title as an EDR extract dated
  3 August 2026 and published it as current.
- Clearly marked the attestation certificate as archival because its stated
  validity ended on 10 April 2024.
- Content validation, Astro check, lint, production build, and all 37 Vitest
  tests passed; the documents suite passed 8/8 on desktop and mobile.
- Both local document pages and PDF downloads return HTTP 200 with the expected
  PDF content type and file size.

# Об'єднання освітньої програми — 29 вересня 2026

- [x] Завантажити два PDF та перевірити порядок і кількість сторінок.
- [x] Об'єднати титульну сторінку з програмою в один PDF і перевірити результат.
- [ ] Завантажити об'єднаний файл у вихідну папку Google Drive та перевірити доступ (потрібен доступ на додавання файлів).

## Review

Зібрано 16-сторінковий PDF: 1 сторінка титулки та 15 сторінок програми. Перевірено відповідність вмісту всіх сторінок і переглянуто першу сторінку. Google Drive відхилив завантаження з помилкою 403 `insufficientParentPermissions` для папки «Документи для сайта». Після надання доступу редактора потрібно повторити завантаження та перевірити файл у папці.

# Публікація освітньої програми на сайті — 29 вересня 2026

- [x] Додати об'єднаний PDF до публічних файлів сайту та звірити копію з джерелом.
- [x] Додати запис у каталог документів із підтвердженими датою, категорією та доступним описом.
- [x] Перевірити сторінку, посилання на PDF, контентну валідацію та збірку.

## Review

PDF у `public/documents/` має той самий SHA-256, що й об'єднаний файл. Новий запис автоматично з'являється у каталозі «Офіційні документи» в категорії «Освітня діяльність». `npm run check`, `npm run build` і `npm run check:links` пройшли; 37/37 модульних тестів і 10/10 цільових Playwright-тестів пройшли на комп'ютері й телефоні, з перевіркою HTTP 200, MIME та розміру PDF. Також пройшли 6/6 перевірок доступності каталогу.

# Кібербезпека на сайті — 29 вересня 2026

- [x] Звірити презентацію з листом управління освіти та перевірити PDF.
- [x] Опублікувати PDF і посилання на «Кібер Браму» на сторінці безпеки.
- [x] Перевірити сторінку, завантаження PDF, збірку й цільові тести.

## Review

Обидва PDF-посилання з листа і папки Google Drive мають однаковий SHA-256. На сторінку `/parents/safety/` додано 20-слайдову презентацію та перевірене посилання на офіційний портал «Кібер Брама». Копія PDF на сайті збігається з джерелом. `npm run check`, `npm run build`, `npm run check:links` і `npm run format:check` пройшли; 6/6 цільових Playwright-тестів пройшли на комп'ютері й телефоні, з перевіркою HTTP 200, MIME та розміру PDF.

# Інфографіка про правила доступу — 29 вересня 2026

- [x] Додати надане зображення до медіатеки та реєстру прав.
- [x] Розмістити його в статті про наказ МОН № 243 без обрізання.
- [x] Перевірити розміри зображення, посилання, збірку й цільові тести.

## Review

Інфографіку розміщено в статті про наказ МОН № 243 у вихідному співвідношенні сторін і зареєстровано дозвіл на публікацію, наданий користувачем. SHA-256 копії збігається з файлом Google Drive. Перевірено чинність наказу за нормативним джерелом. `npm run check`, `npm run build`, `npm run check:links`, `npm run format:check`, тест реєстру медіаправ і 6/6 цільових Playwright-тестів пройшли. Browser-тести підтвердили повне зображення та посилання на оригінальний розмір на комп'ютері й телефоні.

# Lessons

## Specification language

- Confirm the working language before drafting project documentation.
- For this project, write all specification documents in Ukrainian.
- Keep English only where technically necessary: requirement identifiers,
  technology and protocol names, code, filenames, and carefully defined terms.

## Official institution name

- Use the confirmed full name in formal project documents:
  «Манявський ліцей Солотвинської селищної ради».
- Do not treat a shortened working name as the legal name.

## Provisional content decisions

- Treat proposed migration or reuse of legacy content as provisional until the
  user explicitly confirms it.
- When the user prefers a clean start, remove superseded migration requirements
  completely instead of keeping contradictory optional paths.
- Never recommend copying arbitrary internet images; require a documented
  licence or permission and avoid presenting stock imagery as documentary
  photography of the school.

## Responsive typography

- Test long Ukrainian words inside narrow cards at actual browser/CSS zoom, not
  only with a narrow viewport.
- Headings in constrained cards must use safe wrapping (`overflow-wrap`,
  optional hyphenation, and balanced lines) so a single long word cannot cross
  the component boundary.
- For every large heading placed beside another column, verify its rendered
  bounding box does not cross the sibling column; a page-level no-overflow test
  does not detect overlap between grid children.
- Grid form controls can overflow their tracks because of intrinsic sizing even
  when the grid has a `gap`; set grid children and controls to `min-width: 0`
  and controls to `width: 100%` before judging the visible spacing.

## Netlify directory redirects

- Do not add a forced `/path` to `/path/` redirect for a deployed static
  directory without testing both URLs against Netlify's production redirect
  engine; Netlify may normalize both patterns to the same path and create a
  self-redirect loop.
- Include direct HTTP checks for protected utility routes such as `/admin/`
  after every production deployment, not only build and browser checks for
  public pages.

## Decap CMS security policy

- Validate the deployed CMS boot sequence, not only whether `/admin/` returns
  HTML. Decap CMS currently requires `'unsafe-eval'`; if used, scope that CSP
  exception to `/admin/*` and never add it to the public-site policy.

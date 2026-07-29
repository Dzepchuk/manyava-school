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

# School Website Specification Plan

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

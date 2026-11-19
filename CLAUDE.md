# CLAUDE.md

Spec for the personal portfolio site of Tracie Ling Yan Ying (Software Engineer), live at https://tracielyy.com, hosted on Vercel. This file is the source of truth: **when a requirement changes, update the spec first, then implement against it.**

## 1. Constraints (Approval Required)

- **No action without approval.** Claude must not perform any action (editing or creating files, running commands, installing packages, committing, pushing, etc.) until the user has explicitly approved it. Propose the action first, then wait.
- **Never delete files without approval.** This includes `rm`, `git rm`, `git clean`, overwriting a file with empty content, and removing directories.
- **Deletions need double confirmation.** Before any deletion, list exactly what will be deleted and ask for approval, then ask a second, separate confirmation after the first is given. Proceed only once both are explicit "yes" answers.
- Approval for one action does not carry over to other actions. Ask again each time.
- Show the proposed commit message before committing. Don't push unless asked.

## 2. Product Spec

### Purpose
Showcase projects, experience, skills and education to recruiters and engineers, and let them contact the owner.

### Functional requirements
| ID | Requirement |
| --- | --- |
| F1 | Bilingual site: `/en` and `/zh`; `/` permanently redirects to `/en`; unknown locale → 404. |
| F2 | Language toggle in the navbar switches locale while keeping the current path and `#hash`. |
| F3 | Home page sections in order: Hero, About, Skills & Tools, Experience, Projects, Contact. |
| F4 | Navbar links scroll to section anchors: `#about`, `#skills`, `#experience`, `#projects`, `#contact`. |
| F5 | Project cards link to `/[locale]/projects/[slug]`; detail page has previous/next navigation that wraps around. |
| F6 | Hero offers a "Contact" button (→ `#contact`) and a "Resume" button (opens `/Resume.pdf` in a new tab). |
| F7 | Contact form POSTs `{name, email, subject, message}` to `/api/contact`; all fields required; shows success/error feedback. |
| F8 | SEO: page metadata, Open Graph, canonical URL, `sitemap.js`, favicons. |

### Non-functional requirements
- Content is data-driven (JSON), never hardcoded in components.
- Fully responsive (mobile first); usable at 320px width and up.
- Pages render server-side where possible; use `'use client'` only when state/hooks are needed.
- No secrets in the repo; SMTP config via `.env.local` only.

## 3. UI Spec

### Overall look & feel
Dark, modern, developer-portfolio aesthetic: deep slate backgrounds, rounded cards with subtle borders, and a violet accent. Calm and minimal, with generous spacing; accents are used sparingly for headings, links, hover states and primary actions.

### Design tokens (defined in `src/app/[locale]/globals.css` under `@theme`)
| Role | Token | Value |
| --- | --- | --- |
| Page background | `slate-page` | `#161A22` |
| Navbar background | `theme-bg-color` | `#161828` |
| Card surface | `slate-card` | `#1D2130` |
| Border | `slate-border` | `#2A2F42` |
| Primary accent | `accent-primary` | `#7C3AED` |
| Secondary accent (titles, links, hover) | `accent-secondary` | `#A78BFA` |
| Heading text | `heading` | `#E2DEFF` |
| Body text | — | `text-gray-200` (main), `text-gray-400/500` (secondary/muted) |
| Disabled | — | `text-gray-600` |

- Use these tokens rather than raw hex values. Other palette entries in `@theme` (teal, burgundy, etc.) are legacy and unused; don't use them for new UI.
- Dark theme only. No light mode.

### Typography
- English: `--font-en` (Space Grotesk, fallback Arial/Helvetica); Chinese: `--font-zh`. Applied via the `en` / `zh` class on `<body>`.
- Code/monospace accents (hero role, bio): Fira Code (`--font-fira-code`).
- Section titles: 36px bold centered (25px on mobile), `accent-secondary`.
- Sub-section/card titles: ~20px bold, `heading`. Body copy: `text-sm`, muted gray.

### Layout
- Single-page home with stacked sections; each section uses `.section-container` (`py-20`, full width).
- Page horizontal padding steps up by breakpoint: `px-5` → `sm:px-15` → `md:px-25` → `lg:px-35` (`.main-container`).
- Navbar is fixed to the top (`z-50`, 64px tall): logo + language pill on the left, section links on the right (≥ `lg`), hamburger dropdown below `lg`.
- Hero: profile photo (circular, thick gray border) beside text on desktop; stacked and centered on mobile. Photo sits on the right on desktop.
- Projects: responsive card grid; all cards equal height.
- Breakpoints: Tailwind defaults plus custom `xs` = 30rem.

### Component patterns
- **Card** (`.sub-section-bordered`, `.experience-card`, `ProjectCard`): `bg-slate-card`, `border border-slate-border`, `rounded-xl`/`rounded-2xl`, padding `p-4` (`lg:p-6`). Project cards show an image (`h-48`, `object-cover`) with a placeholder icon + "No image available" fallback, then title, 4-line-clamped description and badges pinned to the bottom.
- **Badge**: small pill-ish tag, `bg-slate-card`, `border-slate-border`, `text-accent-secondary`, `text-xs font-bold`, `rounded-md`.
- **Primary button**: gradient `from-accent-primary to-violet-400`, white text, `rounded-lg`, `px-6 py-3`; reverses gradient on hover.
- **Secondary (border) button**: `border-2 border-slate-border text-gray-200`; hover → `border-accent-secondary text-accent-secondary`.
- **Disabled button**: `text-gray-600`, `cursor-not-allowed`.
- **Pill / eyebrow** (hero welcome): `bg-accent-primary/20 text-accent-secondary rounded-full text-sm font-semibold`.
- **Hero name**: gradient text `accent-primary → accent-secondary → heading`.
- **Language toggle**: rounded-full pill on `slate-card`; active segment `bg-accent-primary text-white`, inactive gray with `accent-secondary` hover.
- **Links** (`.site-links`): `accent-secondary`, `heading` on hover, `transition-colors duration-200`.
- **Form fields** (`.contact-form-fields`): `slate-card` background, `slate-border` border, `rounded-lg`, violet focus ring (`ring-2 ring-accent-primary`).
- **List bullets** (`.ul-point-container`): `›` marker in `accent-secondary`, `text-gray-400 text-sm`.
- **Icons**: `react-icons`; project/skill imagery under `public/images`.

### Interaction & motion
- Subtle only: color/border transitions of 200–300ms on hover/focus; smooth scrolling for anchor links (`scroll-behavior: smooth`).
- Hover on interactive cards/buttons shifts border/text to `accent-secondary`; no heavy animation.
- Every interactive element needs a visible hover and focus state.

### UI rules for new work
1. Reuse existing classes/components (`globals.css`, `components/ui`) before creating new ones; add reusable styles to `globals.css`, one-off layout as Tailwind utilities.
2. Use theme tokens, never new hardcoded colors.
3. Build mobile first, then add `sm`/`md`/`lg` variants following the padding scale above.
4. Keep new sections visually consistent: centered `.section-title`, then content in cards.
5. Include `alt` text on images and sufficient contrast on the dark background.

## 4. Technical Spec

### Stack
- Next.js 16 (App Router), React 19, React Compiler enabled (`reactCompiler: true`)
- Tailwind CSS v4 (`@tailwindcss/postcss`), `react-icons`
- Plain JavaScript (no TypeScript); path alias `@/*` → `src/*`
- `nodemailer` for the contact form (SMTP)

### Commands
- `npm run dev` — dev server on **port 3001**
- `npm run build` / `npm run start` — production build / serve
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)
- No test suite yet.

### Project structure
```
src/
  app/
    page.js                      # redirects / → /en (permanent)
    [locale]/                    # en | zh; layout validates locale, else notFound()
      page.js                    # home (assembles sections)
      projects/[slug]/page.js    # project detail
    api/contact/route.js         # POST: sends contact email via SMTP
    sitemap.js, not-found.js
  components/
    layout/                      # Header, Navbar, Footer
    sections/                    # Hero, About, Experience, Projects, SkillsTools, Contact
    ui/                          # Badge, Button, ExperienceCard, ProgressBar, Socials, Tooltip
    ProjectCard.js
  data/{en,zh}/*.json            # content: basic, educations, experiences, projects, skills-and-tools, socials, languages
  dictionaries/{en,zh}.json      # UI strings (labels, headings, buttons)
  lib/
    data.js                      # getData(locale, filename) — falls back to en if zh file missing
    dictionary.js                # getDictionary(locale) — falls back to en
    models/                      # Basic, Experience, Project classes (static finders over JSON data)
    enums/Language.enum.js
    utils/                       # dateUtil, localehelper
public/                          # favicon/, images/ (icons, personal, projects), Resume.pdf
```

### Data spec
- Content lives in `src/data/<locale>/*.json`; UI strings in `src/dictionaries/<locale>.json`. `src/data/en/sample.jsonc` documents the shape.
- Read data via the model classes (e.g. `Project.findBySlug(locale, slug)`), not by importing JSON directly.
- **Always update both `en` and `zh`** when adding or changing content/strings. Some zh data files (`skills-and-tools`, `socials`, `languages`) don't exist and intentionally fall back to en — don't create them unless asked.
- Project entry fields: unique `id`, unique `slug`, `title`, `description`, `tags[]`, `repo`, `image` (filename in `public/images/projects/`), `live`. Prev/next order follows array order.

### i18n spec
- Locale is the first URL segment; supported: `en`, `zh` (defined in `[locale]/layout.js` and `Language.enum.js` — update both when adding one).
- Build internal links with `LocaleHelper.localizedUrl(path)`.

### Environment & secrets
- `.env.local` (gitignored): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `TO_EMAIL`. Never commit or print these.
- Images are `unoptimized`; `output: 'export'` is commented out — the site relies on the API route, so it is not a static export.

### Code style
- Match surrounding code: JS, function components, Tailwind utilities, keep components in `layout` / `sections` / `ui`.
- Don't add manual `useMemo`/`useCallback` just for perf — React Compiler handles it.

## 5. Workflow (Spec-Driven)

For any new feature or change:
1. **Spec**: describe the change here (requirement ID, UI behavior, data shape). Get approval.
2. **Plan**: list the files to be touched. Get approval.
3. **Implement**: change only what the spec covers; update `en` and `zh` together.
4. **Verify**: run `npm run lint` (and `npm run build` for larger changes); check the UI at mobile (~375px) and desktop widths.
5. **Commit**: short prefixed message (`Update: ...`, `Fix: ...`); show it for approval first.

### Definition of done
- Matches the requirement and UI spec above, using existing tokens/components.
- Works in both `/en` and `/zh`.
- Responsive from 320px up; hover/focus states present.
- Lint passes; no new console errors.

## 6. Known Issues / TODO

- `api/contact/route.js` interpolates user input into HTML unescaped and has SMTP `debug`/`logger` enabled; sanitize and disable in production.
- Space Grotesk (`--font-en`) is declared in the theme but not loaded in `layout.js`, so English falls back to Arial/Helvetica.
- `BadgesDisplay` passes `className` inside a plain string (`"... ${className ?? ''}"`), so the prop has no effect.
- Legacy/unused tokens and empty classes in `globals.css` (`.theme-border-color`, `.theme-gradient-text`, `.general-btn-color`, commented blocks).

## 7. Additional Requirements

<!-- Add your own rules and new specs below -->

# CLAUDE.md

Personal portfolio site for Tracie Ling Yan Ying (Software Engineer), live at https://tracielyy.com, hosted on Vercel. Bilingual (English / Chinese).

## Tech Stack

- Next.js 16 (App Router), React 19, React Compiler enabled (`reactCompiler: true`)
- Tailwind CSS v4 (via `@tailwindcss/postcss`), `react-icons`
- Plain JavaScript (no TypeScript); path alias `@/*` → `src/*`
- `nodemailer` for the contact form (SMTP)

## Commands

- `npm run dev` — dev server on **port 3001**
- `npm run build` / `npm run start` — production build / serve
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)
- No test suite yet.

## Project Structure

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

## Conventions

### Content lives in data files, not components
- Portfolio content (projects, experience, education, skills) goes in `src/data/<locale>/*.json`. Don't hardcode it in components.
- UI strings go in `src/dictionaries/<locale>.json`.
- `src/data/en/sample.jsonc` documents the shape of the data.
- **Always update both `en` and `zh`** when adding or changing content/strings. Some zh data files (e.g. `skills-and-tools`, `socials`, `languages`) don't exist and intentionally fall back to en — don't create them unless asked.
- Use the model classes in `src/lib/models` to read data (e.g. `Project.findBySlug(locale, slug)`) rather than importing JSON directly.

### i18n
- Locale is the first URL segment (`/en/...`, `/zh/...`); supported locales are `en` and `zh`, defined in `[locale]/layout.js` and `Language.enum.js`. Adding a locale means updating both.
- Build internal links with `LocaleHelper.localizedUrl(path)` so they keep the current locale.

### Adding a project
1. Add an entry to `src/data/en/projects.json` (and `zh`) with unique `id`, `slug`, `title`, `description`, `tags`, `repo`, `image`, `live`.
2. Put the image in `public/images/projects/` and reference it by filename.
3. Prev/next navigation on detail pages is derived from array order in the JSON.

### Code style
- Match surrounding code: JS (not TS), function components, Tailwind utility classes for styling, shared theme in `src/app/[locale]/globals.css`.
- Keep components in the existing folders (`layout` / `sections` / `ui`).
- Don't add manual `useMemo`/`useCallback` just for perf — React Compiler handles it.

## Environment & Secrets

- Contact form needs `.env.local` (gitignored): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `TO_EMAIL`. Never commit or print these.
- Images are `unoptimized` (`next.config.mjs`); `output: 'export'` is commented out — the site relies on the API route, so it is not a static export.

## Git

- Work on `main`; commit messages are short and prefixed, e.g. `Update: ...`, `Fix: ...`.
- Don't commit or push unless asked.

## Known Issues / TODO

- `README.md` is still the default create-next-app text.
- `api/contact/route.js` interpolates user input into HTML unescaped and has `debug`/`logger` enabled; consider sanitizing and disabling in production.

## Additional Requirements

<!-- Add your own rules below -->

# Tracie Ling Yan Ying — Portfolio

Personal portfolio website showcasing my projects, experience, skills and education. Available in English and Chinese (中文).

**Live:** https://tracielyy.com

## Features

- Bilingual (`/en`, `/zh`) with locale-based routing
- Sections for hero, about, experience, projects, skills & tools, and contact
- Project detail pages (`/[locale]/projects/[slug]`) with previous/next navigation
- Contact form that sends email through SMTP (Nodemailer)
- Content driven by JSON data files, so updates don't require touching components
- Sitemap and SEO metadata (Open Graph, canonical URL)

## Tech Stack

- [Next.js](https://nextjs.org) 16 (App Router) with React 19 and the React Compiler
- [Tailwind CSS](https://tailwindcss.com) v4
- [React Icons](https://react-icons.github.io/react-icons/)
- [Nodemailer](https://nodemailer.com)
- Deployed on [Vercel](https://vercel.com)

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001). The root path redirects to `/en`.

### Environment variables

The contact form needs SMTP credentials. Create a `.env.local` file in the project root:

```env
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
TO_EMAIL=
```

`.env*` files are gitignored — never commit them.

### Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start dev server (port 3001) |
| `npm run build` | Create a production build    |
| `npm run start` | Serve the production build   |
| `npm run lint`  | Run ESLint                   |

## Project Structure

```
src/
  app/
    [locale]/            # en | zh pages (home, projects/[slug])
    api/contact/         # contact form endpoint
  components/            # layout, sections and ui components
  data/{en,zh}/          # portfolio content (JSON)
  dictionaries/{en,zh}.json  # UI strings
  lib/                   # data loaders, models, enums, utils
public/                  # favicons, images, resume
```

## Updating Content

- **Portfolio content** (projects, experience, education, skills): edit the JSON files in `src/data/en/` and `src/data/zh/`. `src/data/en/sample.jsonc` shows the expected shape.
- **UI text**: edit `src/dictionaries/en.json` and `src/dictionaries/zh.json`.
- **Adding a project**: add an entry to `projects.json` in both locales (unique `id` and `slug`) and place the image in `public/images/projects/`.

If a file doesn't exist for the `zh` locale, the English version is used as a fallback.

## Deployment

The site is deployed on Vercel. Set the SMTP environment variables above in the Vercel project settings.

## Contact

Reach me through the contact form on the site, or on [GitHub](https://github.com/tracielyy) and [LinkedIn](https://www.linkedin.com/in/tracielyy/).

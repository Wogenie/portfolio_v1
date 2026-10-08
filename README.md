# Wogenie Liyew — Personal Portfolio

Light, warm (white + amber) portfolio for an AI/ML Engineer & Applied AI Developer.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Framer Motion (scroll reveals, hero entrance, modal)
- Lucide React (icons)

## Chat assistant

A floating assistant answers visitors' questions (skills, projects, contact) using a
built-in knowledge base — no key required. Optionally connect any OpenAI-compatible
LLM via env vars; if unset or failing, it falls back to the local knowledge base.

```bash
# .env.local  (optional)
VITE_LLM_API_URL=https://api.openai.com/v1/chat/completions
VITE_LLM_API_KEY=sk-...
VITE_LLM_MODEL=gpt-4o-mini
```

Never expose a sensitive key: prefer a server-side proxy for anything beyond a
low-privilege key.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check (tsc -b) + production build
npm run preview  # serve the production build
npm run lint     # oxlint
```

## Structure

```
src/
  components/     # Navbar, Hero, About, Capabilities, Projects,
                  # CaseStudyModal, Skills, Philosophy, Interests,
                  # GithubSection, Contact, Footer + shared UI (Section, Reveal)
  data/projects.ts  # project cards + case-study content
```

## Content rules

All copy is grounded in the provided brief: no fabricated metrics, employers,
testimonials, or user numbers. The brain-tumor project is labeled an
educational/research system, and no accuracy figures are shown without
evaluation context.

## SEO

`index.html` carries the title, description, Open Graph / Twitter metadata,
favicon, semantic markup, and JSON-LD (`Person`) for the site.

## Deploy

Static build output in `dist/` — deploy to GitHub Pages, Vercel, Netlify, or
any static host. Update the `canonical` / `og:url` values in `index.html` to
the final domain.

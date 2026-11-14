# NOVA AI: launch checklist

Items that still need a backend, key, domain, or real content. None of these work yet.

- Contact form: validates only; nothing is sent. Needs an email/API service or backend.
- Consultation booking: placeholder box. Needs a scheduling integration (e.g. Calendly, Cal.com).
- Production domain: needed for absolute `og:image`/`og:url`, `<link rel="canonical">`, and a `sitemap.xml` (+ `Sitemap:` line in `public/robots.txt`).
- Metrics: "100%" and "100+ apps & games shipped" are in `src/components/Body.tsx` (METRICS); confirm they are accurate before launch.
- Team: names are set; portraits are initials placeholders (add photos). Further social profile links (only LinkedIn is set).
- Photography: Unsplash stock images used for atmosphere; replace with original work/team photos.
- Fonts load from Google Fonts (index.html); self-host if privacy policy requires.
- Analytics, cookie consent, privacy policy and terms: not included.

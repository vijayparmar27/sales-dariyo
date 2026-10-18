# sales-site

The site that sells the commerce platform (storefront + admin panel + backend) to other businesses: a home page and a pricing page where a buyer ticks modules and gets a live quote: one-time setup fee, monthly support plan, hosting estimate, launch time and payment stages. They can send it on WhatsApp or by email, copy the link, or print it.

Next.js 16 App Router, React 19, Tailwind CSS 4, TypeScript. No database and no API: the quote is computed on the server from `src/data/catalog.ts`.

## Run

```bash
npm install
npm run dev            # http://localhost:3200
npm run build && npm start
npm run lint
npm run typecheck
npm run verify:quote   # pure checks of the price list and the quote math
```

## What to edit

| To change | Edit |
|---|---|
| Your name, WhatsApp number, email, domain, and whether the live store (dariyo.in) is shown | `src/config/site.ts` |
| Modules, prices, packages, support plans, hosting estimates, GST, payment stages, hourly rate | `src/data/catalog.ts` |

Prices are whole rupees before GST. Set `GST.enabled = false` if you are not GST-registered. The WhatsApp and email buttons only appear once `site.whatsapp` / `site.email` are filled in. Set `site.url` to the real domain before launch, so links in sent quotes always point at it.

## How it fits together

- The pricing page's URL is the whole state (`/pricing?m=core&m=wholesale&plan=basic&hosting=launch`), so a quote can be shared as a link, works without JavaScript (it is a plain GET form), and prints exactly what the buyer saw.
- `src/lib/quote.ts` is the only place money is calculated. It imports `server-only`, so it cannot end up in browser code; the client configurator gets back formatted figures and the rendered summary.
- `src/lib/selection.ts` turns the URL into a selection and back. It is shared with the browser so boxes tick instantly (`useOptimistic`) while the server works out the new figures.

## Deploy

Any Node host or Vercel. The home page is static. The pricing page renders on each request because it reads the query string.

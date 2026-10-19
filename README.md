# sales-site

The site that sells the commerce platform (storefront + admin panel + backend) to other businesses: a home page and a pricing page where a buyer ticks modules and gets a live quote: one-time setup fee, monthly support plan, hosting estimate, launch time and payment stages. They can send it on WhatsApp or by email, copy the link, or print it.

It also has an About page, a blog (`/blog`, `/blog/[slug]`) and a Contact page with a form. Their words, pictures and posts, the contact details, and the form's fields are edited in the admin panel under **Sales site** (Blog posts, Site pages, Enquiries), and messages sent from the form land in its Enquiries inbox.

Next.js 16 App Router, React 19, Tailwind CSS 4, TypeScript. The quote is computed on the server from `src/data/catalog.ts`; prices never come from the API.

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

## Connecting it to the admin panel

The About, Blog and Contact pages read from dryfish-backend's `/sales-site/public/*` routes, on the server only. Set these in the site's server environment:

| Variable | What it is |
|---|---|
| `SITE_API_URL` | The API, e.g. `https://api.yourcompany.in`. Unset, the pages show their built-in text (`src/data/page-defaults.ts`), the blog is empty and the contact form says it is not connected yet. |
| `SITE_ASSET_URL` | Optional: where uploaded pictures are served from, if not the API itself (a CDN in front of the bucket). |
| `SITE_IMAGE_HOSTS` | Optional, comma-separated: more hosts whose pictures Next may optimise, e.g. the S3 bucket's host if uploads go to a bucket. Pictures from any other host are shown unoptimised. |
| `SITE_VISITOR_IP_HEADER` | Optional: the header your host's proxy puts the visitor's address in, for the contact form's per-visitor limit: `cf-connecting-ip` behind Cloudflare, `x-real-ip` behind an nginx that sets it. Unset, the first `x-forwarded-for` entry (right on Vercel). |

`SITE_API_URL`, `SITE_ASSET_URL` and `SITE_IMAGE_HOSTS` are also read by `next build` (image optimisation is configured at build time), so set them for the build too.

On the API, set `SALES_SITE_URL` to this site's address: after a save in the panel the API posts the changed cache tags to `/api/revalidate` (signed; nothing to share), and the edit shows on the next request. Without it, edits show when the five-minute cache runs out. The pages keep working if the API is down: each read falls back to the last copy this server read, then to the built-in text.

Contact details set in the panel (Site pages → Contact) are used everywhere: the contact page, the footer and the price builder's WhatsApp and email buttons. `site.email` and `site.whatsapp` in `src/config/site.ts` fill in any left empty there.

## How it fits together

- The pricing page's URL is the whole state (`/pricing?m=core&m=wholesale&plan=basic&hosting=launch`), so a quote can be shared as a link, works without JavaScript (it is a plain GET form), and prints exactly what the buyer saw.
- `src/lib/quote.ts` is the only place money is calculated. It imports `server-only`, so it cannot end up in browser code; the client configurator gets back formatted figures and the rendered summary.
- `src/lib/selection.ts` turns the URL into a selection and back. It is shared with the browser so boxes tick instantly (`useOptimistic`) while the server works out the new figures.

## Deploy

Any Node host or Vercel, not a static export: the pricing page renders on each request because it reads the query string, the contact form is a server action, and the About, Blog and Contact pages are cached for five minutes and refreshed by the API (`/api/revalidate`). The home page is cached the same way, because its footer shows the contact details from the panel.

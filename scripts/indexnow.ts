/**
 * CLI Script: npm run indexnow
 *
 * Tells Bing, Yandex, Seznam and Naver about every URL in the live sitemap at
 * once, through IndexNow, instead of waiting for them to recrawl.
 *
 * Bing powers ChatGPT Search, Microsoft Copilot, DuckDuckGo and Yahoo.
 * Instant submission ensures new platform solutions, tech staffing roles,
 * and blog updates are indexed in minutes instead of weeks.
 *
 * Usage:
 *   npm run indexnow                 # Submit all URLs from sitemap
 *   npm run indexnow -- --dry-run    # Print URLs that would be submitted
 */

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://solutions.dariyo.in").replace(/\/+$/, "");
const KEY = process.env.INDEXNOW_KEY || "0cde612cf375a9fe196fd7db2dcb6b1c";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const BATCH = 10_000;

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const host = new URL(SITE_URL).host;

  console.log(`[IndexNow] Target host: ${host} (${SITE_URL})`);

  // Verify key file accessibility if running against deployed target
  if (!dryRun && !SITE_URL.includes("localhost")) {
    try {
      const keyRes = await fetch(`${SITE_URL}/${KEY}.txt`);
      const keyBody = keyRes.ok ? (await keyRes.text()).trim() : "";
      if (keyBody !== KEY) {
        console.warn(
          `⚠ Note: ${SITE_URL}/${KEY}.txt returned HTTP ${keyRes.status} (remote key check). Ensure public/${KEY}.txt is deployed.`
        );
      }
    } catch {
      console.warn(`⚠ Could not verify ${SITE_URL}/${KEY}.txt over network.`);
    }
  }

  const sitemapUrl = `${SITE_URL}/sitemap.xml`;
  console.log(`[IndexNow] Fetching sitemap from ${sitemapUrl}...`);
  const sitemapRes = await fetch(sitemapUrl);
  if (!sitemapRes.ok) {
    console.error(`✗ Failed to fetch sitemap: HTTP ${sitemapRes.status}`);
    process.exit(1);
  }
  const sitemapText = await sitemapRes.text();

  // Extract both primary loc tags and alternate language links
  const locUrls = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!.trim());
  const altUrls = [...sitemapText.matchAll(/<xhtml:link[^>]+href="([^"]+)"/g)].map((m) => m[1]!.trim());

  const allUrls = Array.from(new Set([...locUrls, ...altUrls])).filter(
    (u) => u.startsWith("http://") || u.startsWith("https://")
  );

  if (allUrls.length === 0) {
    console.error("✗ No URLs found in sitemap.");
    process.exit(1);
  }

  console.log(`[IndexNow] Found ${allUrls.length} total URLs across all languages.`);

  for (let start = 0; start < allUrls.length; start += BATCH) {
    const urlList = allUrls.slice(start, start + BATCH);
    const body = {
      host,
      key: KEY,
      keyLocation: `${SITE_URL}/${KEY}.txt`,
      urlList,
    };

    if (dryRun) {
      console.log(`[dry-run] Would submit ${urlList.length} URLs. Examples:`);
      urlList.slice(0, 5).forEach((u) => console.log(`  - ${u}`));
      continue;
    }

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });

    if (res.status === 200 || res.status === 202) {
      console.log(`✓ Successfully submitted ${urlList.length} URLs to IndexNow (HTTP ${res.status}).`);
    } else {
      console.error(`✗ HTTP ${res.status}: ${await res.text()}`);
      process.exit(1);
    }
  }
}

main().catch((err) => {
  console.error("[IndexNow] Error:", err);
  process.exit(1);
});

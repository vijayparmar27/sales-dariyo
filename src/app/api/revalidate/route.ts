import { createPublicKey, verify, type KeyObject } from "node:crypto";

import { revalidateTag } from "next/cache";

import { isCacheTag } from "@/lib/cache-tags";
import { API_URL } from "@/lib/site-api";

/**
 * The API saying "what you cached under these tags has changed".
 *
 * dryfish-backend posts here after a save in the admin panel's Sales site
 * screens (`services/salesSiteCache.service.ts`) with `{ tags, at, nonce }`,
 * and every read filed under those tags — and every page built from one — is
 * dropped, so an edit is on the site at the next request rather than when
 * its five minutes run out. The storefront's `/api/revalidate`, pointed at
 * this site's own key.
 *
 * Nothing to configure, and nobody else can use it: the body is signed with
 * an Ed25519 key the API derives for this site alone, and the public half is
 * read from the API this site already talks to
 * (`GET /sales-site/public/refresh-key` on `SITE_API_URL`). An unsigned or
 * forged request, a body older than five minutes and a signature already
 * acted on are all refused — a caller free to name tags could make every page
 * render cold on every visit.
 *
 * `{ expire: 0 }` rather than "max": with "max" the next request still gets
 * the old page while the new one renders, and that request is usually the
 * person who just saved, reloading to check.
 */
const SIGNATURE_HEADER = "x-sales-site-signature";
const MAX_BODY_BYTES = 4096;
/** How old a signed body may be: clock drift between two servers, with room. */
const MAX_AGE_MS = 5 * 60 * 1000;
/** How soon the key may be read again after a signature fails to verify. */
const KEY_REREAD_MS = 60 * 1000;

let apiKey: { value: KeyObject; readAt: number } | null = null;
/**
 * When reading the key last failed. While the API is away, a stream of forged
 * requests must not become a stream of key reads against it, so a failed read
 * is not tried again for `KEY_REREAD_MS`.
 */
let keyFailedAt = 0;
/** Signatures already acted on, until they are too old to be accepted anyway. */
const seen = new Map<string, number>();

async function readApiKey(reread: boolean): Promise<KeyObject | null> {
  if (apiKey && (!reread || Date.now() - apiKey.readAt < KEY_REREAD_MS)) return apiKey.value;
  if (!API_URL) return null;
  if (Date.now() - keyFailedAt < KEY_REREAD_MS) return apiKey?.value ?? null;
  try {
    const response = await fetch(`${API_URL}/sales-site/public/refresh-key`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.ok) throw new Error(`answered ${response.status}`);
    const body = (await response.json()) as { data?: { key?: string } };
    if (!body.data?.key) throw new Error("answered without a key");
    apiKey = {
      value: createPublicKey({ key: Buffer.from(body.data.key, "base64"), format: "der", type: "spki" }),
      readAt: Date.now(),
    };
    return apiKey.value;
  } catch (error) {
    keyFailedAt = Date.now();
    console.warn("[revalidate] could not read the API's refresh key:", error instanceof Error ? error.message : error);
    return apiKey?.value ?? null;
  }
}

/**
 * The body, read no further than `max` bytes; null when it is longer. Route
 * handlers have no body limit of their own, and `request.text()` would buffer
 * whatever an unauthenticated caller chose to send before the size could be
 * checked.
 */
async function readCapped(request: Request, max: number): Promise<string | null> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > max) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString("utf8");
}

const signedBy = (key: KeyObject, body: Buffer, signature: Buffer): boolean => {
  try {
    return verify(null, body, key, signature);
  } catch {
    return false;
  }
};

const refuse = (status: number, message: string) => Response.json({ message }, { status });

export async function POST(request: Request) {
  // The cheap refusals first, before a byte of the body is read.
  const signature = Buffer.from(request.headers.get(SIGNATURE_HEADER) ?? "", "base64");
  if (signature.length !== 64) return refuse(401, "Not signed.");
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return refuse(413, "Too large.");

  const raw = await readCapped(request, MAX_BODY_BYTES);
  if (raw === null) return refuse(413, "Too large.");

  const body = Buffer.from(raw);
  let key = await readApiKey(false);
  if (!key) return refuse(503, "Could not read the API's refresh key.");
  if (!signedBy(key, body, signature)) {
    // The key moves with the API's JWT_SECRET; read it again before refusing.
    key = await readApiKey(true);
    if (!key || !signedBy(key, body, signature)) {
      console.warn("[revalidate] refused a request whose signature does not verify");
      return refuse(401, "The signature does not verify.");
    }
  }

  let payload: { tags?: unknown; at?: unknown } | null = null;
  try {
    payload = JSON.parse(raw) as { tags?: unknown; at?: unknown };
  } catch {
    return refuse(400, "Not JSON.");
  }

  const now = Date.now();
  const at = typeof payload?.at === "number" ? payload.at : Number.NaN;
  if (!(Math.abs(now - at) <= MAX_AGE_MS)) return refuse(401, "Too old.");

  // Keyed on the signature's bytes, not the header's text: one signature has
  // many base64 spellings, and keyed on the text a captured request could be
  // replayed under each of them.
  const seenKey = signature.toString("base64");
  for (const [known, until] of seen) if (until < now) seen.delete(known);
  if (seen.has(seenKey)) return refuse(409, "Already applied.");
  seen.set(seenKey, now + MAX_AGE_MS);

  const tags = [...new Set(Array.isArray(payload?.tags) ? payload.tags.filter(isCacheTag) : [])];
  if (tags.length === 0) return refuse(400, "Name at least one known cache tag.");

  for (const tag of tags) revalidateTag(tag, { expire: 0 });
  return Response.json({ revalidated: tags, at: now });
}

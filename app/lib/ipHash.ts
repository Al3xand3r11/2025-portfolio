import { createHmac } from "node:crypto";
import { headers } from "next/headers";

/** HMAC of the visitor IP. Null when the secret or the forwarding header is missing, which turns rate limits off. */
export async function getIpHash(): Promise<string | null> {
  const secret = process.env.IP_HASH_SECRET;
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim();
  if (!secret || !ip) return null;
  return createHmac("sha256", secret).update(ip).digest("hex");
}

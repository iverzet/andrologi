import "server-only";
import { headers } from "next/headers";
import { getDb } from "@/lib/db";
import { keyedHash } from "@/lib/security";

export async function requestIdentity() {
  const h = await headers();
  const ip = process.env.VERCEL ? h.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() : "local";
  return keyedHash("ip:" + (ip || "unknown"));
}
export async function consumeLimit(bucket: string, identity: string, limit: number, seconds: number) {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + seconds * 1000);
  const key = keyedHash(bucket + ":" + identity);
  const rows = await getDb().$queryRaw<{ count: number }[]>`
    INSERT INTO "RateLimit" ("key", "count", "expiresAt") VALUES (${key}, 1, ${expiresAt})
    ON CONFLICT ("key") DO UPDATE SET
      "count" = CASE WHEN "RateLimit"."expiresAt" <= ${now} THEN 1 ELSE "RateLimit"."count" + 1 END,
      "expiresAt" = CASE WHEN "RateLimit"."expiresAt" <= ${now} THEN ${expiresAt} ELSE "RateLimit"."expiresAt" END
    RETURNING "count"`;
  return rows[0].count <= limit;
}

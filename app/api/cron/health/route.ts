import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { runChecks } from "../../../lib/health/service";

export const dynamic = "force-dynamic";

function authorized(header: string | null, secret: string): boolean {
  const given = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : "";
  const a = createHash("sha256").update(given).digest();
  const b = createHash("sha256").update(secret).digest();
  return timingSafeEqual(a, b);
}

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || !authorized(request.headers.get("authorization"), secret)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await runChecks("cron");
  return NextResponse.json({ ok: true });
}

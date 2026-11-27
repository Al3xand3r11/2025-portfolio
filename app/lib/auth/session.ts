import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "./cookie";

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function signaturesMatch(given: string, expected: string): boolean {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function createSession(): Promise<void> {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET environment variable is not set");

  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = String(expiresAt);
  const jar = await cookies();
  jar.set(SESSION_COOKIE, `${payload}.${sign(payload, secret)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/dashboard",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

/** True only for an unexpired cookie whose signature matches SESSION_SECRET. */
export async function verifySession(): Promise<boolean> {
  const secret = process.env.SESSION_SECRET;
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!secret || !value) return false;

  const dot = value.lastIndexOf(".");
  if (dot === -1) return false;
  const payload = value.slice(0, dot);
  const signature = value.slice(dot + 1);
  if (!signaturesMatch(signature, sign(payload, secret))) return false;

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

/** The single gate for dashboard pages and actions. Swap this body to change how ownership is decided. */
export async function requireOwner(): Promise<void> {
  if (!(await verifySession())) redirect("/dashboard/login");
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete({ name: SESSION_COOKIE, path: "/dashboard" });
}

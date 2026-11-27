"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { recordLoginAttempt, secretsMatch, tooManyLoginAttempts } from "../lib/auth/attempts";
import { createSession, destroySession, requireOwner } from "../lib/auth/session";
import { INQUIRY_STATUSES, markFeedbackRead, setInquiryStatus, type InquiryStatus } from "../lib/contact/queries";
import { runChecks } from "../lib/health/service";
import { getIpHash } from "../lib/ipHash";

export type LoginState = { status: "idle" } | { status: "error"; message: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const ipHash = await getIpHash();

  try {
    if (await tooManyLoginAttempts(ipHash)) {
      return { status: "error", message: "Too many attempts. Try again in an hour." };
    }
  } catch (error) {
    console.error("Login rate limit check failed:", error);
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  const expected = process.env.DASHBOARD_PASSWORD;
  const given = String(formData.get("password") ?? "");
  if (!expected || !secretsMatch(given, expected)) {
    try {
      await recordLoginAttempt(ipHash);
    } catch (error) {
      console.error("Recording a login attempt failed:", error);
    }
    return { status: "error", message: expected ? "That password is wrong." : "Dashboard login is not configured." };
  }

  try {
    await createSession();
  } catch (error) {
    console.error("Creating a session failed:", error);
    return { status: "error", message: "Dashboard login is not configured." };
  }
  redirect("/dashboard");
}

export async function logout(): Promise<void> {
  await requireOwner();
  await destroySession();
  redirect("/dashboard/login");
}

function isInquiryStatus(value: string): value is InquiryStatus {
  return (INQUIRY_STATUSES as readonly string[]).includes(value);
}

export async function updateInquiryStatus(formData: FormData): Promise<void> {
  await requireOwner();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!isInquiryStatus(status)) return;
  await setInquiryStatus(id, status);
  redirect(`/dashboard/inbox/inquiries/${id}`);
}

export async function markFeedbackAsRead(formData: FormData): Promise<void> {
  await requireOwner();
  const id = String(formData.get("id") ?? "");
  await markFeedbackRead(id);
  redirect(`/dashboard/inbox/feedback/${id}`);
}

export async function runHealthChecksNow(): Promise<void> {
  await requireOwner();
  await runChecks("manual");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/projects");
  redirect("/dashboard/projects");
}

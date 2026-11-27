"use server";

import { z } from "zod";
import {
  feedbackSchema,
  projectInquirySchema,
  type FieldErrors,
  type FormState,
} from "../lib/contact/schemas";
import { createFeedback, createProjectInquiry, type CreateResult } from "../lib/contact/service";
import { getIpHash } from "../lib/ipHash";

async function submit<S extends z.ZodType>(
  formData: FormData,
  schema: S,
  create: (input: z.output<S>, ipHash: string | null) => Promise<CreateResult>
): Promise<FormState> {
  /* Honeypot: visitors never see this field. Report success so a bot gets no
     signal, and store nothing. */
  if (formData.get("fax")) return { status: "success" };

  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors as FieldErrors,
    };
  }

  try {
    const result = await create(parsed.data, await getIpHash());
    if (result === "rate_limited") {
      return { status: "error", message: "Too many submissions. Try again in an hour.", fieldErrors: {} };
    }
    return { status: "success" };
  } catch (error) {
    console.error("Contact submission failed:", error);
    return { status: "error", message: "Something went wrong. Please try again.", fieldErrors: {} };
  }
}

export async function submitProjectInquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  return submit(formData, projectInquirySchema, createProjectInquiry);
}

export async function submitFeedback(_prev: FormState, formData: FormData): Promise<FormState> {
  return submit(formData, feedbackSchema, createFeedback);
}

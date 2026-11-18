import { z } from "zod";
import { BUDGETS, INSPIRATIONS, MESSAGE_LIMIT, SUGGEST_PROJECTS, TIMELINES } from "./options";

/* Empty inputs arrive as "", and a <select> left on its disabled placeholder
   is not submitted at all; both mean "not answered". Textarea line breaks can
   arrive as CRLF, which would push a message past the 500 the counter shows. */
const clean = (value: unknown) => {
  if (typeof value !== "string") return value ?? null;
  const text = value.replace(/\r\n/g, "\n").trim();
  return text === "" ? null : text;
};

const required = <T extends z.ZodType>(schema: T) => z.preprocess(clean, schema);
const optional = <T extends z.ZodType>(schema: T) => z.preprocess(clean, schema.nullable());

const rating = optional(z.coerce.number().int().min(1).max(5));
const message = optional(z.string().max(MESSAGE_LIMIT, "Message is too long"));

export const projectInquirySchema = z.object({
  name: required(z.string("Name is required").max(120, "Name is too long")),
  email: required(
    z
      .string("Email is required")
      .max(254, "Email is too long")
      .toLowerCase()
      .pipe(z.email("Enter a valid email address"))
  ),
  organization: optional(z.string().max(160, "Organization is too long")),
  budget: optional(z.enum(BUDGETS)),
  timeline: optional(z.enum(TIMELINES)),
  inspiration: optional(z.enum(INSPIRATIONS)),
  message,
});

export const feedbackSchema = z
  .object({
    name: optional(z.string().max(120, "Name is too long")),
    responsiveness: rating,
    timeSpent: rating,
    wouldRecommend: rating,
    reportsProblem: z.preprocess((v) => v === "true", z.boolean()),
    project: required(
      z.string("Pick a project").refine((v) => SUGGEST_PROJECTS.includes(v), "Pick a project from the list")
    ),
    message,
  })
  .refine(
    (v) =>
      v.message !== null ||
      [v.responsiveness, v.timeSpent, v.wouldRecommend].some((r) => r !== null),
    { message: "Add a rating or a message before sending.", path: ["message"] }
  );

export type ProjectInquiryInput = z.output<typeof projectInquirySchema>;
export type FeedbackInput = z.output<typeof feedbackSchema>;

export type FieldErrors = Record<string, string[] | undefined>;

export type FormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors: FieldErrors };

export const IDLE: FormState = { status: "idle" };

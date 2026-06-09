import { z } from "zod";

const SUBJECT_OPTIONS = [
  "Web Development",
  "Mobile App",
  "UI/UX Design",
  "Consulting",
  "Collaboration",
  "Other",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name is too long")
    .trim(),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email is too long")
    .trim()
    .toLowerCase(),
  subject: z.enum(SUBJECT_OPTIONS, {
    message: "Please select a valid subject",
  }),
  message: z
    .string()
    .min(1, "Message is required")
    .max(5000, "Message is too long")
    .trim(),
});

export type ContactInput = z.infer<typeof contactSchema>;

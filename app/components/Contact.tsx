"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const subjectOptions = [
  "Web Development",
  "Mobile App",
  "UI/UX Design",
  "Consulting",
  "Collaboration",
  "Other",
];

export default function Contact() {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [thoughts, setThoughts] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const serviceID = "service_pma3dql";
    const templateID = "template_08llu1i";
    const publicKey = "7rv-9u7Zg-84Mkoh-";

    const templateParams = {
      from_name: `${firstName} ${lastName}`,
      email: email,
      to_name: "Brandon",
      message: `[${subject}] ${thoughts}`,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      setStatus("sent");
      setSubject("");
      setEmail("");
      setFirstName("");
      setLastName("");
      setThoughts("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error sending email", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="relative pb-32 lg:pb-48 overflow-hidden" style={{ paddingTop: "250px" }}>
      {/* Large background heading */}
      <div className="absolute top-20 right-0 pointer-events-none select-none overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 0.08, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[12rem] md:text-[18rem] lg:text-[22rem] font-extrabold leading-none tracking-tighter text-[var(--color-foreground)]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          US?
        </motion.h2>
      </div>

      <div className="container relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2
            className="text-5xl md:text-6xl lg:text-8xl font-extrabold uppercase tracking-tight text-[var(--color-foreground)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Contact{" "}
            <span className="text-[var(--color-accent-warm)]">Us?</span>
          </h2>
        </motion.div>

        {/* Form */}
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col"
          style={{ gap: "10vh" }}
        >
          {/* Row 1: Subject + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 lg:gap-x-28 gap-y-14">
            {/* Subject */}
            <div className="flex items-start gap-8">
              <label
                htmlFor="subject"
                className="text-base md:text-lg lg:text-xl font-bold uppercase tracking-wider text-[var(--color-foreground)] whitespace-nowrap pt-4 shrink-0"
              >
                Subject<span className="text-[var(--color-accent-warm)] align-super text-xs ml-0.5">*</span>
              </label>
              <div className="relative w-full">
                <select
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full appearance-none bg-transparent border-0 border-b border-[var(--color-border)] text-[var(--color-muted)] text-lg lg:text-xl py-4 pr-8 focus:outline-none focus:border-[var(--color-accent-warm)] transition-colors cursor-pointer"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <option value="" disabled>SELECT</option>
                  {subjectOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[var(--color-background)] text-[var(--color-foreground)]">
                      {opt}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted)] pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-8">
              <label
                htmlFor="email"
                className="text-base md:text-lg lg:text-xl font-bold uppercase tracking-wider text-[var(--color-foreground)] whitespace-nowrap pt-4 shrink-0"
              >
                Email<span className="text-[var(--color-accent-warm)] align-super text-xs ml-0.5">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="user_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-0 border-b border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-muted)] text-lg lg:text-xl py-4 focus:outline-none focus:border-[var(--color-accent-warm)] transition-colors"
                placeholder="Enter Your Email"
              />
            </div>
          </div>

          {/* Row 2: First Name + Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 lg:gap-x-28 gap-y-14">
            {/* First Name */}
            <div className="flex items-start gap-8">
              <label
                htmlFor="firstName"
                className="text-base md:text-lg lg:text-xl font-bold uppercase tracking-wider text-[var(--color-foreground)] whitespace-nowrap pt-4 shrink-0"
              >
                First Name<span className="text-[var(--color-accent-warm)] align-super text-xs ml-0.5">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full bg-transparent border-0 border-b border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-muted)] text-lg lg:text-xl py-4 focus:outline-none focus:border-[var(--color-accent-warm)] transition-colors"
                placeholder="Enter Your First Name"
              />
            </div>

            {/* Last Name */}
            <div className="flex items-start gap-8">
              <label
                htmlFor="lastName"
                className="text-base md:text-lg lg:text-xl font-bold uppercase tracking-wider text-[var(--color-foreground)] whitespace-nowrap pt-4 shrink-0"
              >
                Last Name<span className="text-[var(--color-accent-warm)] align-super text-xs ml-0.5">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full bg-transparent border-0 border-b border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-muted)] text-lg lg:text-xl py-4 focus:outline-none focus:border-[var(--color-accent-warm)] transition-colors"
                placeholder="Enter Your Last Name"
              />
            </div>
          </div>

          {/* Row 3: Thoughts */}
          <div className="flex items-start gap-8">
            <label
              htmlFor="thoughts"
              className="text-base md:text-lg lg:text-xl font-bold uppercase tracking-wider text-[var(--color-foreground)] whitespace-nowrap pt-4 shrink-0"
            >
              Thoughts<span className="text-[var(--color-accent-warm)] align-super text-xs ml-0.5">*</span>
            </label>
            <textarea
              id="thoughts"
              name="message"
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
              required
              rows={1}
              className="w-full bg-transparent border-0 border-b border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-muted)] text-lg lg:text-xl py-4 focus:outline-none focus:border-[var(--color-accent-warm)] transition-colors resize-none"
              placeholder="We are excited to hear your idea!"
            />
          </div>

          {/* Submit button area */}
          <div className="flex items-center justify-center gap-6 pt-8">
            {/* Orange dot */}
            <span className="w-3 h-3 rounded-full bg-orange-500 shrink-0" />

            {/* Orbital button */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="relative group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="relative flex items-center justify-center w-40 h-40">
                {/* Orbital rings */}
                <svg
                  className="absolute inset-0 w-full h-full animate-spin"
                  style={{ animationDuration: "8s" }}
                  viewBox="0 0 160 160"
                  fill="none"
                >
                  <ellipse
                    cx="80"
                    cy="80"
                    rx="70"
                    ry="30"
                    stroke="#d4573a"
                    strokeWidth="1.5"
                    transform="rotate(-20 80 80)"
                  />
                  <ellipse
                    cx="80"
                    cy="80"
                    rx="70"
                    ry="30"
                    stroke="#d4573a"
                    strokeWidth="1.5"
                    transform="rotate(40 80 80)"
                  />
                  <ellipse
                    cx="80"
                    cy="80"
                    rx="70"
                    ry="30"
                    stroke="#d4573a"
                    strokeWidth="1.5"
                    transform="rotate(-70 80 80)"
                  />
                </svg>

                {/* Button text */}
                <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-[var(--color-foreground)] group-hover:text-[var(--color-accent-warm)] transition-colors">
                  {status === "idle" && "GET IN TOUCH"}
                  {status === "sending" && "SENDING..."}
                  {status === "sent" && "SENT!"}
                  {status === "error" && "ERROR"}
                </span>
              </div>
            </button>
          </div>
        </motion.form>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-[var(--color-muted)]">
            © {new Date().getFullYear()} Brandon Nance. Built with Next.js.
          </p>
          <p
            className="text-xs text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Los Angeles, CA
          </p>
        </motion.footer>
      </div>
    </section>
  );
}

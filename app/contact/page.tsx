"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Community", href: "/community" },
  { label: "Engineering", href: "/engineering" },
  { label: "Lagree", href: "/lagree" },
  { label: "Contact", href: "/contact" },
];

const subjectOptions = [
  "Web Development",
  "Mobile App",
  "UI/UX Design",
  "Consulting",
  "Collaboration",
  "Other",
];

export default function ContactPage() {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [thoughts, setThoughts] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const serviceID = "service_pma3dql";
    const templateID = "template_08llu1i";
    const publicKey = "7rv-9u7Zg-84Mkoh-";

    const templateParams = {
      from_name: name,
      email: email,
      to_name: "Brandon",
      message: `[${subject}] ${thoughts}`,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      setStatus("sent");
      setSubject("");
      setEmail("");
      setName("");
      setThoughts("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error sending email", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <main
      style={{
        minHeight: "100svh",
        backgroundColor: "#fff",
        color: "#000",
        fontFamily: "var(--font-mono)",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: 24,
        }}
      >
        <nav style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: "#000",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontFamily: "var(--font-mono)",
                textDecoration:
                  item.label === "Contact" ? "underline" : "none",
                textUnderlineOffset: "4px",
                transition: "opacity 0.2s",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a
            href="https://www.linkedin.com/in/bnance1/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{ color: "#000", transition: "opacity 0.2s" }}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://github.com/Al3xand3r11"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{ color: "#000", transition: "opacity 0.2s" }}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>
      </header>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #000",
          margin: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          minHeight: "calc(100svh - 80px)",
        }}
      >
        {/* Left label */}
        <span
          style={{
            position: "absolute",
            top: 40,
            left: 24,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontFamily: "var(--font-mono)",
          }}
        >
          Contact
        </span>

        {/* Center content column */}
        <div
          style={{
            width: "100%",
            maxWidth: 560,
            margin: "0 auto",
            borderLeft: "1px solid #000",
            borderRight: "1px solid #000",
            minHeight: "calc(100svh - 80px)",
            padding: "160px 48px 48px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-display)",
              marginBottom: 24,
            }}
          >
            Let&apos;s build what comes next.
          </h1>

          <p
            style={{
              fontSize: 13,
              lineHeight: 1.6,
              color: "#666",
              fontFamily: "var(--font-mono)",
              marginBottom: 56,
              maxWidth: 380,
            }}
          >
            Provide your contact details and share your project idea. I&apos;ll
            get back to you shortly.
          </p>

          <form
            ref={form}
            onSubmit={sendEmail}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              flex: 1,
            }}
          >
            <div style={{ borderBottom: "1px solid #000", padding: "16px 0" }}>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="NAME"
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-mono)",
                  color: "#000",
                }}
              />
            </div>

            <div style={{ borderBottom: "1px solid #000", padding: "16px 0" }}>
              <input
                type="email"
                name="user_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="EMAIL"
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-mono)",
                  color: "#000",
                }}
              />
            </div>

            <div style={{ borderBottom: "1px solid #000", padding: "16px 0" }}>
              <select
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-mono)",
                  color: subject ? "#000" : "#999",
                  appearance: "none",
                  cursor: "pointer",
                }}
              >
                <option value="" disabled>
                  SUBJECT
                </option>
                {subjectOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ borderBottom: "1px solid #000", padding: "16px 0" }}>
              <textarea
                name="message"
                value={thoughts}
                onChange={(e) => setThoughts(e.target.value)}
                required
                rows={1}
                placeholder="DESCRIBE YOUR PROJECT"
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-mono)",
                  color: "#000",
                  resize: "none",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                border: "none",
                borderBottom: "1px solid #000",
                backgroundColor: "transparent",
                padding: "16px 0",
                cursor: status === "sending" ? "not-allowed" : "pointer",
                opacity: status === "sending" ? 0.5 : 1,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#000",
                transition: "opacity 0.2s",
              }}
            >
              <span>
                {status === "idle" && "SEND"}
                {status === "sending" && "SENDING..."}
                {status === "sent" && "SENT!"}
                {status === "error" && "ERROR — TRY AGAIN"}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}

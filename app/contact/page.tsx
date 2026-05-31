"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import PageHeader from "../components/PageHeader";

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
      <PageHeader activeLabel="Contact" />

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
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
        </motion.span>

        {/* Center content column */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
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
            Reach Out.
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
            Questions, ideas, or connections.
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
        </motion.div>

      </div>
    </main>
  );
}

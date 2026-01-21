"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
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
      message: message,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error sending email", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="py-[var(--section-padding)] border-t border-[var(--color-border)]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left side - CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-5xl md:text-6xl lg:text-7xl leading-tight mb-8"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Let&apos;s build
              <br />
              <span className="italic text-[var(--color-accent)]">something</span>
              <br />
              together
            </h2>

            <p className="text-[var(--color-muted-foreground)] text-lg mb-12 max-w-md">
              Have a project in mind? Looking for a developer who understands community? 
              I&apos;d love to hear from you.
            </p>

            {/* Contact info */}
            <div className="space-y-6">
              <div>
                <span
                  className="text-xs text-[var(--color-muted)] uppercase tracking-widest block mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Email
                </span>
                <a
                  href="mailto:hello@brandonnance.com"
                  className="text-[var(--color-foreground)] hover:text-[var(--color-accent)] transition-colors"
                >
                  hello@brandonnance.com
                </a>
              </div>

              <div>
                <span
                  className="text-xs text-[var(--color-muted)] uppercase tracking-widest block mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Social
                </span>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/brandonnance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/brandonnance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://instagram.com/brandonnance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
                  >
                    Instagram
                  </a>
                </div>
              </div>

              <div>
                <span
                  className="text-xs text-[var(--color-muted)] uppercase tracking-widest block mb-2"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Resume
                </span>
                <a
                  href="/BrandonNance2024Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--color-foreground)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <span>Download PDF</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="text-xs text-[var(--color-muted)] uppercase tracking-widest block mb-3"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-xs text-[var(--color-muted)] uppercase tracking-widest block mb-3"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-xs text-[var(--color-muted)] uppercase tracking-widest block mb-3"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-[var(--color-border)] text-[var(--color-foreground)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="relative group w-full py-4 mt-4 bg-[var(--color-foreground)] text-[var(--color-background)] font-medium transition-all hover:bg-[var(--color-accent)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Corner brackets */}
                <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--color-background)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--color-background)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--color-background)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--color-background)] opacity-0 group-hover:opacity-100 transition-opacity" />

                {status === "idle" && "Send Message"}
                {status === "sending" && "Sending..."}
                {status === "sent" && "Message Sent!"}
                {status === "error" && "Error - Try Again"}
              </button>
            </form>
          </motion.div>
        </div>

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


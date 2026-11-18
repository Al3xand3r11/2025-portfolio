"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import SocialButtons from "../components/SocialButtons";
import { ADDITIONAL_PROJECTS } from "../lib/additionalProjects";
import styles from "./contact.module.css";

export type TabId = "touch" | "project" | "suggest";

const TABS: { id: TabId; title: string }[] = [
  { id: "touch", title: "Get in touch" },
  { id: "project", title: "Work together" },
  { id: "suggest", title: "Suggest" },
];

const BUDGETS = ["Under $5k", "$5k – $10k", "$10k – $25k", "$25k+", "Not sure yet"];
const TIMELINES = ["ASAP", "1 – 3 months", "3 – 6 months", "Flexible"];

const RATING_QUESTIONS = [
  "How responsive is the website?",
  "How much time did you spend on this website?",
  "Would you recommend this website?",
];

const SUGGEST_PROJECTS = ["alexandernance.com", ...ADDITIONAL_PROJECTS.map((p) => p.title)];

const MESSAGE_LIMIT = 500;

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function ContactView({ initialTab = "touch" }: { initialTab?: TabId }) {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [tab, setTab] = useState<TabId>(initialTab);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <main
      style={{
        paddingInline: "clamp(24px, 5vw, 80px)",
        minHeight: "100svh",
        backgroundColor: "var(--page-bg)",
        color: "var(--page-fg)",
        fontFamily: "var(--font-mono)",
      }}
    >
      <PageHeader activeLabel="Contact" />

      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.7 }}
        style={{
          paddingTop: isMobile ? 64 : 120,
          paddingBottom: isMobile ? 96 : 160,
        }}
      >
        
        <div
          role="tablist"
          aria-label="Contact options"
          className={styles.tabs}
          style={{ marginTop: isMobile ? 32 : 48 }}
        >
          {TABS.map((t) => (
            <TabCard
              key={t.id}
              title={t.title}
              active={tab === t.id}
              onSelect={() => setTab(t.id)}
            />
          ))}
        </div>

        <div style={{ marginTop: isMobile ? 40 : 56 }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              role="tabpanel"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease }}
            >
              {tab === "touch" && <GetInTouch />}
              {tab === "project" && <ProjectForm />}
              {tab === "suggest" && <SuggestForm isMobile={isMobile} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.section>
    </main>
  );
}

function TabCard({
  title,
  active,
  onSelect,
}: {
  title: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onSelect}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "20px 22px",
        borderRadius: 12,
        textAlign: "left",
        color: active ? "var(--page-bg)" : "var(--page-fg)",
        backgroundColor: active ? "var(--page-fg)" : "var(--page-surface)",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "relative",
          flexShrink: 0,
          width: 14,
          height: 14,
          borderRadius: "50%",
          border: "1.5px solid currentColor",
        }}
      >
        <motion.span
          initial={false}
          animate={{ scale: active ? 1 : 0 }}
          transition={{ duration: 0.25, ease }}
          style={{
            position: "absolute",
            inset: 2,
            borderRadius: "50%",
            backgroundColor: "currentColor",
          }}
        />
      </span>
      <span style={{ fontSize: 15, fontFamily: "var(--font-display)" }}>{title}</span>
    </button>
  );
}

function GetInTouch() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 24,
      }}
    >
      <p
        style={{
          margin: 0,
          maxWidth: "40ch",
          fontSize: 13,
          lineHeight: 1.8,
          color: "var(--page-body)",
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore.
      </p>
      <SocialButtons />
    </div>
  );
}

function ProjectForm() {
  const [message, setMessage] = useState("");

  return (
    <form onSubmit={preventSubmit} style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <div className={styles.grid2}>
        <TextField label="Name" name="name" />
        <TextField label="Organization" name="organization" />
        <SelectField label="Budget" name="budget" options={BUDGETS} placeholder="Select a range" />
        <SelectField label="Timeline" name="timeline" options={TIMELINES} placeholder="Select a timeline" />
      </div>
      <MessageField
        label="Additional message"
        value={message}
        onChange={setMessage}
        placeholder="Tell me about the project"
      />
      <SendRow />
    </form>
  );
}

function SuggestForm({ isMobile }: { isMobile: boolean }) {
  const [ratings, setRatings] = useState<(number | null)[]>(RATING_QUESTIONS.map(() => null));
  const [reportProblem, setReportProblem] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <form onSubmit={preventSubmit} style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <Link
        href="/"
        style={{
          alignSelf: "flex-start",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 18px",
          borderRadius: 999,
          fontSize: 14,
          fontFamily: "var(--font-display)",
          color: "var(--page-fg)",
          backgroundColor: "color-mix(in srgb, var(--page-fg) 6%, transparent)",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M13 8H3M7 4L3 8l4 4" />
        </svg>
        Navigate to home
      </Link>

      <div style={{ maxWidth: isMobile ? "none" : 320 }}>
        <TextField label="Name" name="name" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {RATING_QUESTIONS.map((question, qi) => (
          <Rating
            key={question}
            question={question}
            value={ratings[qi]}
            onChange={(v) => setRatings((prev) => prev.map((r, i) => (i === qi ? v : r)))}
          />
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, maxWidth: 420 }}>
        <span className={styles.label}>Report a problem</span>
        <YesNoToggle value={reportProblem} onChange={setReportProblem} />
      </div>

      <div style={{ maxWidth: isMobile ? "none" : "calc(50% - 12px)" }}>
        <SelectField
          label="Which project"
          name="project"
          options={SUGGEST_PROJECTS}
          defaultValue={SUGGEST_PROJECTS[0]}
        />
      </div>

      <MessageField
        label="Message"
        value={message}
        onChange={setMessage}
        placeholder="Anything you'd like to share"
      />
      <SendRow />
    </form>
  );
}

function preventSubmit(e: FormEvent) {
  e.preventDefault();
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className={styles.field}>
      <label htmlFor={htmlFor} className={styles.label}>
        {label}
      </label>
      {children}
    </div>
  );
}

function TextField({ label, name }: { label: string; name: string }) {
  const id = `contact-${name}`;
  return (
    <Field label={label} htmlFor={id}>
      <input id={id} name={name} type="text" className={styles.input} autoComplete="off" />
    </Field>
  );
}

function SelectField({
  label,
  name,
  options,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  options: string[];
  placeholder?: string;
  defaultValue?: string;
}) {
  const id = `contact-${name}`;
  return (
    <Field label={label} htmlFor={id}>
      <div className={styles.selectWrap}>
        <select
          id={id}
          name={name}
          defaultValue={defaultValue ?? ""}
          className={`${styles.input} ${styles.select}`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <svg className={styles.chevron} width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M4 6l4 4 4-4" />
        </svg>
      </div>
    </Field>
  );
}

function MessageField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <Field label={label} htmlFor="contact-message">
      <textarea
        id="contact-message"
        name="message"
        value={value}
        maxLength={MESSAGE_LIMIT}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${styles.input} ${styles.textarea}`}
      />
      <span className={styles.counter}>
        {value.length}/{MESSAGE_LIMIT}
      </span>
    </Field>
  );
}

function Rating({
  question,
  value,
  onChange,
}: {
  question: string;
  value: number | null;
  onChange: (v: number) => void;
}) {
  return (
    <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
      <legend
        style={{
          padding: 0,
          fontSize: 16,
          fontFamily: "var(--font-display)",
          color: "var(--page-fg)",
        }}
      >
        {question}
      </legend>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginTop: 14 }}>
        {[1, 2, 3, 4, 5].map((n) => {
          const selected = value === n;
          return (
            <button
              key={n}
              type="button"
              aria-pressed={selected}
              aria-label={`${n} of 5`}
              onClick={() => onChange(n)}
              className={styles.dotButton}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                width: 40,
                padding: "6px 0",
              }}
            >
              <motion.span
                className={styles.dot}
                initial={false}
                animate={{ scale: selected ? 1.3 : 1 }}
                transition={{ duration: 0.25, ease }}
                style={{
                  backgroundColor: selected ? "var(--page-fg)" : "transparent",
                  borderColor: selected ? "var(--page-fg)" : undefined,
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  color: selected ? "var(--page-fg)" : "var(--page-muted)",
                  transition: "color 0.25s",
                }}
              >
                {n}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function YesNoToggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      role="radiogroup"
      aria-label="Report a problem"
      style={{
        display: "inline-flex",
        padding: 4,
        borderRadius: 999,
        backgroundColor: "var(--page-surface)",
      }}
    >
      {[
        { label: "No", v: false },
        { label: "Yes", v: true },
      ].map((opt) => {
        const active = value === opt.v;
        return (
          <button
            key={opt.label}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.v)}
            style={{
              position: "relative",
              padding: "6px 16px",
              borderRadius: 999,
              fontSize: 13,
              fontFamily: "var(--font-display)",
              color: active ? "var(--page-bg)" : "var(--page-muted)",
              transition: "color 0.25s",
            }}
          >
            {active && (
              <motion.span
                layoutId="report-toggle-thumb"
                transition={{ duration: 0.3, ease }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 999,
                  backgroundColor: "var(--page-fg)",
                }}
              />
            )}
            <span style={{ position: "relative" }}>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function SendRow() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <button
        type="submit"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: "10px 22px",
          borderRadius: 12,
          fontSize: 14,
          fontFamily: "var(--font-display)",
          color: "var(--page-bg)",
          backgroundColor: "var(--page-fg)",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        Send
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </button>
    </div>
  );
}

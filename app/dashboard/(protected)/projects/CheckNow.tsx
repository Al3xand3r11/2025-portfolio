"use client";

import { useFormStatus } from "react-dom";
import { runHealthChecksNow } from "../../actions";
import styles from "../../dashboard.module.css";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.button} disabled={pending}>
      {pending ? "Checking" : "Check now"}
    </button>
  );
}

export default function CheckNow() {
  return (
    <form action={runHealthChecksNow}>
      <Submit />
    </form>
  );
}

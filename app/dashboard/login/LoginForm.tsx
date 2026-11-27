"use client";

import { useActionState } from "react";
import { login, type LoginState } from "../actions";
import styles from "../dashboard.module.css";

const IDLE: LoginState = { status: "idle" };

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, IDLE);

  return (
    <form action={action} className={styles.loginForm}>
      <label className={styles.label} htmlFor="password">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className={styles.input}
      />
      <div className={styles.row}>
        <button type="submit" className={styles.button} disabled={pending}>
          {pending ? "Checking" : "Enter"}
        </button>
        {state.status === "error" ? <p className={styles.error}>{state.message}</p> : null}
      </div>
    </form>
  );
}

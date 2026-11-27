/** Sent only to /dashboard routes. The proxy checks that it exists; the session module checks that it is valid. */
export const SESSION_COOKIE = "dashboard_session";

export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

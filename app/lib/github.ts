export const GITHUB_LOGIN = "Al3xand3r11";

const REVALIDATE_SECONDS = 3600;

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  date: string;
  count: number;
  level: ContributionLevel;
};

export type GitHubEvent = {
  id: string;
  summary: string;
  repo: string;
  createdAt: string;
};

export type GitHubActivity = {
  /** Null when GITHUB_TOKEN is unset; the calendar is GraphQL-only. */
  calendar: { total: number; weeks: ContributionDay[][] } | null;
  events: GitHubEvent[];
};

const LEVELS: Record<string, ContributionLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const CALENDAR_QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { date contributionCount contributionLevel }
          }
        }
      }
    }
  }
`;

async function getCalendar(token: string): Promise<GitHubActivity["calendar"]> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: CALENDAR_QUERY, variables: { login: GITHUB_LOGIN } }),
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) return null;

  const json = await res.json();
  const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) return null;

  return {
    total: calendar.totalContributions,
    weeks: calendar.weeks.map(
      (week: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: LEVELS[day.contributionLevel] ?? 0,
        }))
    ),
  };
}

type RawEvent = {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    ref?: string | null;
    ref_type?: string;
    action?: string;
  };
};

function summarize(event: RawEvent): string | null {
  const { payload } = event;
  const branch = payload.ref?.replace("refs/heads/", "");
  switch (event.type) {
    case "PushEvent":
      return branch ? `Pushed to ${branch}` : "Pushed commits";
    case "CreateEvent":
      return payload.ref_type === "repository"
        ? "Created repository"
        : `Created ${payload.ref_type} ${payload.ref ?? ""}`.trim();
    case "PullRequestEvent":
      return `${capitalize(payload.action ?? "updated")} a pull request`;
    case "IssuesEvent":
      return `${capitalize(payload.action ?? "updated")} an issue`;
    case "WatchEvent":
      return "Starred";
    case "ForkEvent":
      return "Forked";
    case "ReleaseEvent":
      return "Published a release";
    default:
      return null;
  }
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

async function getEvents(token: string | undefined): Promise<GitHubEvent[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_LOGIN}/events/public?per_page=30`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      next: { revalidate: REVALIDATE_SECONDS },
    }
  );
  if (!res.ok) return [];

  const raw: RawEvent[] = await res.json();
  return raw
    .map((event) => {
      const summary = summarize(event);
      return summary
        ? {
            id: event.id,
            summary,
            repo: event.repo.name.replace(`${GITHUB_LOGIN}/`, ""),
            createdAt: event.created_at,
          }
        : null;
    })
    .filter((event): event is GitHubEvent => event !== null)
    .slice(0, 5);
}

/** Server-only: reads GITHUB_TOKEN. Never import from a client component. */
export async function getGitHubActivity(): Promise<GitHubActivity> {
  const token = process.env.GITHUB_TOKEN;
  try {
    const [calendar, events] = await Promise.all([
      token ? getCalendar(token) : Promise.resolve(null),
      getEvents(token),
    ]);
    return { calendar, events };
  } catch {
    return { calendar: null, events: [] };
  }
}

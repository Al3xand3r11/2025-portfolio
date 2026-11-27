/** Public profile. A token is optional and only adds private channels. */
export const ARENA_SLUG = "brandon-nance";

const API = "https://api.are.na";
const USER_AGENT = "alexandernance-dashboard/1.0 (+https://alexandernance.com)";
const REVALIDATE_SECONDS = 21600;

export type RawChannel = {
  type?: string;
  slug?: string;
  title?: string;
  updated_at?: string;
};

export type RawBlock = {
  id?: number;
  type?: string;
  title?: string | null;
  created_at?: string;
  content?: { plain?: string } | null;
  image?: { src?: string; medium?: { src?: string } } | null;
  source?: { url?: string } | null;
  connection?: { connected_at?: string } | null;
};

async function getJson<T>(path: string): Promise<T | null> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/json",
      "User-Agent": USER_AGENT,
    };
    const token = process.env.ARENA_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API}${path}`, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

/** First page of channels, newest update first. An empty list means the request failed. */
export async function getUserChannels(): Promise<RawChannel[]> {
  const params = new URLSearchParams({
    type: "Channel",
    sort: "updated_at_desc",
    page: "1",
    per: "24",
  });
  const json = await getJson<{ data?: RawChannel[] }>(`/v3/users/${ARENA_SLUG}/contents?${params}`);
  return json?.data?.filter((item) => item.type === "Channel" && item.slug && item.title) ?? [];
}

/** First page of a channel. Null means this channel failed and should be skipped. */
export async function getChannelBlocks(slug: string): Promise<RawBlock[] | null> {
  const params = new URLSearchParams({
    sort: "updated_at_desc",
    page: "1",
    per: "12",
  });
  const json = await getJson<{ data?: RawBlock[] }>(
    `/v3/channels/${encodeURIComponent(slug)}/contents?${params}`
  );
  return json?.data ?? null;
}

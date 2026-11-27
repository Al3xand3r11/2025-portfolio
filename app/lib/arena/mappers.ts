import type { RawBlock } from "./client";

export type BlockKind = "image" | "link" | "text" | "media" | "attachment";

export type Block = {
  id: string;
  kind: BlockKind;
  title: string | null;
  /** Plain text for text blocks. Link blocks usually only have a title. */
  text: string | null;
  image: string | null;
  source: string | null;
  channel: { slug: string; title: string };
  addedAt: Date;
};

const KINDS: Record<string, BlockKind> = {
  Image: "image",
  Link: "link",
  Text: "text",
  Embed: "media",
  Attachment: "attachment",
};

export function toBlock(raw: RawBlock, channel: { slug: string; title: string }): Block | null {
  if (raw.id == null || !raw.type) return null;
  const kind = KINDS[raw.type];
  if (!kind) return null;

  const added = raw.connection?.connected_at ?? raw.created_at;
  const addedAt = added ? new Date(added) : null;
  if (!addedAt || Number.isNaN(addedAt.getTime())) return null;

  const title = raw.title?.trim() || null;
  const text = raw.content?.plain?.trim() || null;

  return {
    id: String(raw.id),
    kind,
    title,
    text,
    image: raw.image?.medium?.src ?? raw.image?.src ?? null,
    source: raw.source?.url ?? null,
    channel,
    addedAt,
  };
}

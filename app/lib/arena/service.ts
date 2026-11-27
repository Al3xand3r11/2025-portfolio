import { cache } from "react";
import type { ModuleSummary, Signal } from "../signals/types";
import { getChannelBlocks, getUserChannels } from "./client";
import { toBlock, type Block } from "./mappers";

const CHANNEL_LIMIT = 8;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export const getRecentBlocks = cache(async function getRecentBlocks(): Promise<Block[]> {
  const channels = (await getUserChannels()).slice(0, CHANNEL_LIMIT);
  const lists = await Promise.all(
    channels.map(async (channel) => {
      const slug = channel.slug as string;
      const title = channel.title as string;
      const contents = await getChannelBlocks(slug);
      if (!contents) return [];
      return contents.flatMap((raw) => {
        const block = toBlock(raw, { slug, title });
        return block ? [block] : [];
      });
    })
  );

  return lists.flat().sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime());
});

function mostActive(blocks: Block[]): string | null {
  const counts = new Map<string, number>();
  for (const block of blocks) {
    counts.set(block.channel.title, (counts.get(block.channel.title) ?? 0) + 1);
  }
  let best: string | null = null;
  let bestCount = 0;
  for (const [title, count] of counts) {
    if (count > bestCount) {
      best = title;
      bestCount = count;
    }
  }
  return best;
}

export async function getProcessSummary(): Promise<ModuleSummary> {
  const blocks = await getRecentBlocks();
  if (blocks.length === 0) {
    return {
      id: "process",
      status: "unknown",
      headline: "No channels yet",
      metrics: [],
      updatedAt: null,
      href: "/dashboard/process",
    };
  }

  const recent = blocks.filter((block) => Date.now() - block.addedAt.getTime() <= WEEK_MS);
  return {
    id: "process",
    status: "ok",
    headline: recent.length === 1 ? "1 block this week" : `${recent.length} blocks this week`,
    metrics: [
      { label: "This week", value: String(recent.length) },
      { label: "Channel", value: mostActive(recent) ?? "—" },
    ],
    updatedAt: blocks[0].addedAt,
    href: "/dashboard/process",
  };
}

export async function getProcessSignals(): Promise<Signal[]> {
  const blocks = await getRecentBlocks();
  return blocks.slice(0, 10).map((block) => ({
    source: "process",
    kind: "block.added",
    severity: "info",
    subject: block.channel.slug,
    title: block.title ?? block.text?.slice(0, 80) ?? `Added to ${block.channel.title}`,
    at: block.addedAt,
  }));
}

import Image from "next/image";
import Link from "next/link";
import { getRecentBlocks } from "../../../lib/arena/service";
import type { Block } from "../../../lib/arena/mappers";
import styles from "../../dashboard.module.css";
import { formatStamp } from "../../format";

function channelsOf(blocks: Block[]): { slug: string; title: string }[] {
  const seen = new Map<string, string>();
  for (const block of blocks) seen.set(block.channel.slug, block.channel.title);
  return [...seen].map(([slug, title]) => ({ slug, title }));
}

function Card({ block }: { block: Block }) {
  const href = block.source ?? `https://www.are.na/block/${block.id}`;
  const textual = block.kind === "text" || block.kind === "link" || !block.image;
  const copy = block.kind === "text" ? (block.text ?? block.title) : block.title;

  return (
    <a href={href} className={styles.card} target="_blank" rel="noopener noreferrer">
      {textual ? (
        <p className={styles.cardText}>{copy ?? "Untitled"}</p>
      ) : (
        <Image
          src={block.image as string}
          alt={block.title ?? block.channel.title}
          width={640}
          height={640}
          sizes="(max-width: 768px) 100vw, 220px"
          className={styles.cardImage}
        />
      )}
      <div className={styles.cardBody}>
        {!textual && block.title ? <p>{block.title}</p> : null}
        <p className={styles.meta}>
          {block.channel.title} · {formatStamp(block.addedAt)}
        </p>
      </div>
    </a>
  );
}

export default async function ProcessPage({
  searchParams,
}: {
  searchParams: Promise<{ channel?: string }>;
}) {
  const params = await searchParams;
  const blocks = await getRecentBlocks();
  const channels = channelsOf(blocks);
  const selected = channels.some((channel) => channel.slug === params.channel) ? params.channel : undefined;
  const shown = selected ? blocks.filter((block) => block.channel.slug === selected) : blocks;

  return (
    <div className={styles.stack}>
      <div className={styles.filters}>
        <Link href="/dashboard/process" className={styles.filter} data-active={!selected}>
          All
        </Link>
        {channels.map((channel) => (
          <Link
            key={channel.slug}
            href={`/dashboard/process?channel=${encodeURIComponent(channel.slug)}`}
            className={styles.filter}
            data-active={selected === channel.slug}
          >
            {channel.title}
          </Link>
        ))}
      </div>
      {shown.length === 0 ? (
        <p className={styles.empty}>No blocks yet.</p>
      ) : (
        <div className={styles.board}>
          {shown.map((block) => (
            <Card key={`${block.channel.slug}-${block.id}`} block={block} />
          ))}
        </div>
      )}
    </div>
  );
}

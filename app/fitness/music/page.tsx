import type { Metadata } from "next";
import styles from "../fitness.module.css";
import { ArrowIcon } from "../icons";

export const metadata: Metadata = {
  title: "Music for Class | Brandon Nance Lagree",
  description:
    "The Apple Music playlists behind Brandon Nance's Lagree classes in downtown Los Angeles.",
};

type Playlist = {
  title: string;
  subtitle: string;
  tags: string[];
  /** the embed.music.apple.com URL Apple hands out under Share → Embed */
  embedUrl: string;
};

const playlists: Playlist[] = [
  {
    title: "Volume One",
    subtitle: "45 minutes, start to finish",
    tags: ["Apple Music", "45 min"],
    embedUrl: "https://embed.music.apple.com/us/playlist/516/pl.u-9N9LbEpFxZlP2pr",
  },
  {
    title: "Volume Two",
    subtitle: "45 minutes, start to finish",
    tags: ["Apple Music", "45 min"],
    embedUrl: "https://embed.music.apple.com/us/playlist/5224/pl.u-76oNZ1MFWRd64Dp",
  },
];

/* the embed host only differs by subdomain from the page a listener can open */
function toListenUrl(embedUrl: string) {
  return embedUrl.replace("embed.music.apple.com", "music.apple.com");
}

export default function MusicPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.eyebrow}>Music for Class</h1>

      <div className={styles.sections}>
        {playlists.map((playlist) => (
          <section key={playlist.embedUrl} className={styles.section}>
            <div className={styles.sectionMeta}>
              <div className={styles.tags}>
                {playlist.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={toListenUrl(playlist.embedUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sectionAction}
              >
                Open in Apple Music
                <ArrowIcon />
              </a>
            </div>

            <h2 className={styles.sectionTitle}>
              <span className={styles.titleStrong}>{playlist.title}</span>{" "}
              <span className={styles.titleSoft}>{playlist.subtitle}</span>
            </h2>

            <div className={styles.sectionBand}>
              <iframe
                title={playlist.title}
                src={`${playlist.embedUrl}?theme=dark`}
                height="450"
                loading="lazy"
                allow="autoplay *; encrypted-media *; clipboard-write"
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                className={styles.playerFrame}
              />
            </div>
          </section>
        ))}
      </div>

      <p className={styles.footNote}>
        Press play to hear the room before you book.
      </p>
    </main>
  );
}

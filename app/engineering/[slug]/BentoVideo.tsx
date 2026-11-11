"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./caseStudy.module.css";

/* Attaches the file only once the tile is near the viewport. Muted, looping,
   and without controls so the scroll-through plays like a silent GIF. */
export default function BentoVideo({
  video,
  title,
}: {
  video: string;
  title: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [attachVideo, setAttachVideo] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    if (typeof IntersectionObserver === "undefined") {
      setAttachVideo(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setAttachVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className={styles.videoFrame}>
      {attachVideo && (
        <video
          className={styles.video}
          src={video}
          autoPlay
          muted
          loop
          playsInline
          aria-label={`${title} walkthrough`}
        />
      )}
    </div>
  );
}

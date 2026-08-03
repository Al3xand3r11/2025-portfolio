"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* The poster is the element worth painting first, so it goes through next/image
   and the video is only attached once the hero is on screen. Until real frames
   arrive the poster stays on top, which keeps the swap from flashing. */
export default function CaseStudyHero({
  video,
  poster,
  title,
}: {
  video: string;
  poster: string;
  title: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [attachVideo, setAttachVideo] = useState(false);
  const [playing, setPlaying] = useState(false);

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
    <div
      ref={frameRef}
      style={{
        position: "relative",
        flex: 1,
        minHeight: "45vh",
        overflow: "hidden",
        borderRadius: 6,
        backgroundColor: "var(--page-surface)",
      }}
    >
      <Image
        src={poster}
        alt={title}
        fill
        priority
        sizes="100vw"
        style={{
          objectFit: "cover",
          opacity: playing ? 0 : 1,
          transition: "opacity 0.4s",
          zIndex: 1,
        }}
      />
      {attachVideo && (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          onPlaying={() => setPlaying(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}
    </div>
  );
}

import Image from "next/image";
import styles from "./caseStudy.module.css";

export default function MediaSlot({
  src,
  alt,
  label,
  priority = false,
  sizes,
  className,
}: {
  src: string;
  alt: string;
  label: string;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={className ? `${styles.slot} ${className}` : styles.slot}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          unoptimized={src.includes("ez1.webp")}
          sizes={sizes}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <span className={styles.slotLabel}>{label}</span>
      )}
    </div>
  );
}

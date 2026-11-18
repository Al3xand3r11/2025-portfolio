import Image from "next/image";
import Parallax from "../../components/Parallax";
import styles from "./caseStudy.module.css";

export default function MediaSlot({
  src,
  alt,
  label,
  priority = false,
  sizes,
  className,
  parallax = false,
}: {
  src: string;
  alt: string;
  label: string;
  priority?: boolean;
  sizes: string;
  className?: string;
  parallax?: boolean;
}) {
  const image = (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      unoptimized={src.includes("ez1.webp")}
      sizes={sizes}
      style={{ objectFit: "cover" }}
    />
  );

  return (
    <div className={className ? `${styles.slot} ${className}` : styles.slot}>
      {src ? (
        parallax ? <Parallax>{image}</Parallax> : image
      ) : (
        <span className={styles.slotLabel}>{label}</span>
      )}
    </div>
  );
}

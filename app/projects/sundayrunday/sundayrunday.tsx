import Image from "next/image"
import styles from './style.module.css'

export default function SundayRunday () {
    return (
        <main className={styles.sdrdHeader}>
            <div className={styles.title}>
                <p>SundayRunday</p>
            </div>
            
            <div className={styles.heroImage}>
                <Image
                    src={'/images/sdrdhero1.webp'}
                    alt="hero"
                    fill
                />
            </div>
            
        </main>
        
    )
}
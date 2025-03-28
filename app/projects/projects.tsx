import HikeCrew from "./hikecrew/HikeCrew";
import Links from "./links/links";
import SundayRunday from "./sundayrunday/sundayrunday";
import styles from './style.module.css'

export default function Projects() {
    return (
        <main className={styles.viewport}>
            <SundayRunday/>
            <HikeCrew/>
            <Links/>
        </main>
    )
}
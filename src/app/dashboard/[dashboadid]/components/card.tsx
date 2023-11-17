import Link from "next/link";
import styles from "../page.module.css";

export default function Card() {
  return (
    <div className={styles.card}>
        <div className={styles.card_text}>
            No Pending Leave
        </div>
        <div>
            <Link href='/dashboard/leave' className={styles.card_link}>Apply here</Link>
        </div>
    </div>
  )
}

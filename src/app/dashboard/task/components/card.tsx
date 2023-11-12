import Link from "next/link";
import styles from "../page.module.css";

export default function Card() {
  const id = 1;
  return (
    <div className={styles.card}>
       <Link href={`/dashboard/task/${id}`} className={styles.link}>
        <span>Name</span>
        <span>Title</span>
        <span>Desciption</span>
       </Link>
    </div>

  )
}

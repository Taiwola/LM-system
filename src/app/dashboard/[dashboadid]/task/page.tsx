import Card from "./components/card";
import styles from "./page.module.css";

export default function Task() {
  return (
    <section className={styles.section}>
        <Card />
        <Card />
    </section>
  )
}

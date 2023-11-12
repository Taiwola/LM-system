import Card from "./card"
import styles from "../page.module.css"

export default function Card_body() {
  return (
    <section className={styles.section}>
        <Card />
        <Card />
        <Card />
    </section>
  )
}

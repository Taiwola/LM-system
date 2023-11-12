import Card from "./components/card"
import Button from "./components/button"
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.card_component}>
      <div className={styles.first}>
          <h1>Welcome to LM</h1>
      </div>
      <div className={styles.second}>
      <Card />
      </div>
    </main>
  )
}

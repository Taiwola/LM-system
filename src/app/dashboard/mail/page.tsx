import styles from "./page.module.css";

export default function Mail() {
  return (
    <section className={styles.section}>
      <form action="" method="post" className={styles.form_control}>
      <h1>Edit your mail</h1>
        <div>
          <input type="email" name="email" id="email" placeholder="Email" className={styles.form_input} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

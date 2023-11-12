import styles from "./page.module.css"

export default function Profile() {
  return (
    <section className={styles.section}>
      <h1>Profile</h1>
      <div className={styles.acct}>
        <p>first name: Olanitori</p>
        <p>last name: Seun</p>
        <p>email: junk@gmail.com</p>
      </div>
      <button className={styles.btn}>
        Delete account
      </button>
    </section>
  )
}

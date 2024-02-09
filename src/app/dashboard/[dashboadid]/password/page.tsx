"use client"
import { FormEvent } from "react"
import styles from "../mail/page.module.css"

export default function Password() {

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    
  }

  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit} method="post" className={styles.form_control}>
      <h1>Edit your Password</h1>
        <div>
          <input type="password" name="password" id="password" className={styles.form_input} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

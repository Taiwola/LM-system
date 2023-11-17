import Date from "./date";
import Input from "./input";
import Submit from "./button";
import styles from "../page.module.css";
import Textarea from "./textarea";

export default function Card() {
  return (
    <section className={styles.section}>
        <form action="" method="get" className={styles.form_control}>
        <div className={styles.form_input}>
                <Input name="title" label="Enter a title" />
            </div>
            <div className={styles.form_input}>
                <Input name="days" label="Number of days" />
            </div>
            <div className={styles.form_input}>
                <Input name="weeks" label="Number of weeks" />
            </div>
            <div className={styles.form_date}>
                <Date label="Start Date" name="start" />
            </div>
            <div className={styles.form_date}>
                <Date label="End Date" name="end" />
            </div>
            <div className={styles.input_text}>
                <Textarea name="description" />
            </div>
            <div className={styles.btn}>
                <Submit />
            </div>
        </form>
    </section>
  )
}

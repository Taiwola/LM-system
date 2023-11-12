import styles from "./page.module.css";

type Params = {
    id: string;
}

export default function Taskid({id}: Params) {
  return (
<div className={styles.appr}>
        <h1>title</h1>
        <hr />
        <p>date</p>
        <hr />
        <p>number of days</p>
        <p>number of weeks</p>
        <p>description</p>
        <hr />
        <div className={styles.btn}>
        <button>Reject</button>
        <button>Approve</button>
        </div>
    </div>
  )
}

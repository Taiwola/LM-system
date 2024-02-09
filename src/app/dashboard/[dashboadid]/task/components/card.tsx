"use client"
import Link from "next/link";
import styles from "../page.module.css";
import { useParams } from "next/navigation";

type CardProps = {
  id: string;
  title: string;
  desc: string;
  status: string;
  name: string
}

export default function Card({ id, title, desc, status, name }: CardProps) {

  const path = useParams();
  const Id = path.dashboadid;

 



  return (
    <div className={styles.card}>
       <Link href={`/dashboard/${Id}/task/${id}`} className={styles.link}>
        <span className={styles.title}>{title}</span>
        <span className={styles.title}>{name}</span>
        <span className={status === 'approved' ? styles.green : styles.grey }>{status}</span>
        <span>{desc}</span>
       </Link>
    </div>

  )
}

"use client"
import Link from "next/link";
import {useParams} from "next/navigation"
import {useEffect, useState} from "react"
import styles from "./page.module.css"
import Image from "next/image";

const initState: Leave[] = [];
export default function Operation() {
    const params = useParams();
    const Id = params.dashboadid;
    const [leaves, setLeave] = useState(initState);


    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const userData = {
          accessToken
        };
        const res = fetch('http://localhost:3000/api/pendingleaves', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        })
        const response = res.then(response => response.json())
        .then(responseData => {
          if (responseData.success === true) {
            // console.log(responseData.data.leave);
            setLeave(responseData.data.leave);
          } else {
            console.error('Failed to fetch user data: ' + responseData.message);
          }
        });
    }, []);

    const contentDept = leaves.filter((leave) => leave.departmental_approval === "reviewed");
    const content = contentDept.filter((leave) => leave.operation_management_approval !== "reviewed").map((leave) => leave)
  return (
    <div className={styles.container}>
    <header className={styles.header}>
      <h1>Operation Page</h1>
    </header>
    {content.length === 0 ? (
      <div className={styles.center}>
        <Image src="/image/bear.jpg" alt="no content" width={200} height={100} />
      </div>
    ) : <section className={styles.content}>
        {content.map((content) => (
          <div key={content.id} className={styles.card}>
          <Link href={`/dashboard/${Id}/operation/${content.id}`} className={styles.link}>
              <span className={styles.span}>name: {content.user.firstname + " " + content.user.lastname}</span>
              <span className={styles.span}>title: {content.title}</span>
              <span className={styles.span}>type: {content.leave_type}</span>
          </Link>
        </div>
        ))}
   
    </section>}
  </div>
  )
}

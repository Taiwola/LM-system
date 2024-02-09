"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css"
import Link from "next/link";
import Image from "next/image";

const initState: Leave[] = [];
const initUser: User = {
    id: "",
  firstname: "",
  lastname: "",
  email: "",
  status: "",
  staff: {
    id: "",
    name: ""
  },
  directorOf: {
    id: "",
    name: ""
  }
};
export default function Department() {
    const {dashboadid} = useParams();
    const Id = dashboadid;
  const [leaves, setLeave] = useState(initState);
  const [user, setUser] = useState(initUser);

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

useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
  
    const userData = {
      accessToken,
      Id: dashboadid,
    };
  
    fetch('http://localhost:3000/api/getuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.success) {
          
          setUser(responseData.data);
        } else {
          console.error('Failed to fetch user data: ' + responseData.message);
        }
      })
      .catch(error => {
        console.error('Error fetching user data: ' + error);
      });
  }, []);

  const initLeave = leaves
  .filter((leave) => leave.user.staff.name === user.directorOf.name)
  .map((leave) => leave);

  const content = initLeave.filter((leave) => leave.departmental_approval !== "reviewed").map(leave => leave);
    
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Department Page</h1>
      </header>
      {content.length === 0 ? (
        <div className={styles.center}>
          <Image src="/image/bear.jpg" alt="no content" width={200} height={100} />
        </div>
      ) : <section className={styles.content}>
          {content.map((content) => (
            <div key={content.id} className={styles.card}>
            <Link href={`/dashboard/${Id}/department/${content.id}`} className={styles.link}>
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

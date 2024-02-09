"use client"
import { useEffect, useState } from "react";
import Card from "./components/card";
import styles from "./page.module.css";
import Image from "next/image";

interface Leave {
  id: string;
  title: string;
  description: string;
  status: string;
  firstname: string;
  lastname: string;
  operation_management_approval: string
  user: {
    firstname: string;
    lastname: string
  }
}

const initState: Leave[] = [];

export default function Task() {
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
                        //console.log(response);
      
  }, []);

  // console.log("length: ",leaves )
  const review = leaves.filter((leave) => leave.operation_management_approval === "reviewed");
  const reviewed = review.map((item) => item);
  console.log(reviewed);
  const content = reviewed.length > 0 ? reviewed.map((L) => {
    const name = L.user.firstname +' '+ L.user.lastname;
    return <Card
    key={L.id}
    title= {L.title}
    desc = {L.description}
    id = {L.id}
    name={name}
    status={L.status}
    />
  }) : null;
  return <section className={styles.section}> {content} </section>;
}

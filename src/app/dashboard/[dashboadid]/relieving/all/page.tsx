"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import {useEffect, useState} from "react";
import styles from "../../page.module.css"




let initReq: Relive_Request[]; 
const AllRelive = () => {

    const [getReq, setReq] = useState(initReq)

    const path = useParams();
    const Id = path.dashboadid;

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
      
        fetch("http://localhost:3000/api/request/getall", {
          method: "POST",  // Correcting the method name
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accessToken }),  // Wrapping the accessToken in an object
        })
        .then((response) => response.json())
        .then((responseData) => {
          setReq(responseData);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
      }, []);
// find the user relieve request
const relieve_request = getReq?.filter((relive) => {
  return relive.requesting_officer.id === Id
});

const content =  relieve_request?.map((request) => {
    return (
        <div>
            <Link href={`/dashboard/${Id}/request/${request.id}`} key={request.id} className={styles.relieve_card}>
      <div className={styles.relieve_card_header}>
        <h1>{request.relieve_leave.title}</h1>
      </div>
      <div className={styles.relieve_card}>
        <div className={styles.relieve_card_content}>
          <span className={styles.relieve_card_span}>Relieving officer:</span>
          <h1>{request.relieving_officer.firstname + ' ' + request.relieving_officer.lastname}</h1>
        </div>
      </div>
    </Link>
        </div>
    )
    })
    return (
        <>
        {content}
        </>
    )
}

export default AllRelive;
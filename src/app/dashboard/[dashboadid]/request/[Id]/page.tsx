
'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import styles from "./page.module.css"
import Link from "next/link";


let initState: Relive_Request;
const Page = () => {
    const [initReq, setReq] = useState(initState);

    const params = useParams();
    const {Id} = params;

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({accessToken, Id})
        };

        const res = fetch("http://localhost:3000/api/request/getone", options);

        res.then((response) => response.json()).then((responseData) => {
           if (responseData.success === true) {
            setReq(responseData.data)
           } else {
            const message = responseData.message
            toast.error(message)
           }
        })
    },[])

    
    return (
        <div className={styles.container}>
            <div className={styles.leave_container}>
    <h1 className={styles.leave_title}>{initReq?.relieve_leave.title}</h1>

    <div className={styles.officer_details}>
      <p><strong>Requesting Officer:</strong> {initReq?.requesting_officer.firstname +' '+ initReq?.requesting_officer.lastname}</p>
      <p><strong>Relieving Officer:</strong> {initReq?.relieving_officer.firstname +' '+ initReq?.relieving_officer.lastname} </p>
    </div>

    <div className={styles.acceptance_details}>
      {initReq?.acceptance_date ? (<p><strong>Acceptance Date:</strong> {initReq?.acceptance_date}</p>) : (
        <p><strong>Acceptance Date:</strong> N/A</p>
      )}
    </div>

    <div className={styles.acceptance_details}>
      {initReq?.acceptance_date ? ( <p><strong>url:</strong> <Link href={`http://localhost:8000/api/reliveletter/${initReq?.id}`} target="_blank">
        Generate url
        </Link></p>) : (
          null
      )}
    </div>
  </div>

        </div>
    )
}

export default Page;
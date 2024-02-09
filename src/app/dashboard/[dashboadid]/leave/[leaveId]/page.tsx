"use client"
import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import {useEffect, useState} from "react";
import Link from "next/link";
import { toast } from "sonner";

type Params = {
    id: string;
}

let initState: Leave = {
  id: "",
  title: "",
  description: "",
  status: "",
  firstname: "",
  lastname: "",
  start_date: "",
  end_date: "",
  leave_type: "",
  number_of_weeks: "",
  number_of_days: "",
  comment: "",
  departmental_approval: "",
  operation_management_approval: "",
  user: {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    status: "",
    directorOf: {
      id: "",
      name: ""
    },
    staff: {
      id: "",
      name: ""
    }
  }
};

let initReq: Relive_Request[]
export default function Taskid({id}: Params) {
  const [leave, setLeave] = useState(initState);
  const [relieveReq, setReq] = useState(initReq);
    const path = useParams();
    const router = useRouter();
    const Id = path.leaveId;

    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      const leaveData = {
        accessToken, Id
      };

      const res = fetch("http://localhost:3000/api/getleave", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leaveData)
      });

      const response = res.then(response => response.json())
                          .then((responseData) => {
                            if (responseData.success === true) {
                              // console.log(responseData.data.data);
                              setLeave(responseData.data.data);
                            } else {
                              console.error('Failed to fetch user data: ' + responseData.message)
                            }
                          })
    }, []);

    const relieve_request = relieveReq?.filter((relive) => {
      return relive.relieve_leave.id === leave.id
    });

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

    async function handleDelete() {
      const accessToken = localStorage.getItem('accessToken');
      const leaveData = {
        accessToken, Id
      };

      const res = fetch("http://localhost:3000/api/deleteleave", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leaveData)
      });

      const response = res.then(response => response.json())
                          .then((responseData) => {
                            if (responseData.success === true) {
                              // console.log(responseData.data.data);
                              // alert(responseData.message);
                              toast.success(responseData.message);
                              router.back();
                            } else {
                              toast.error("failed to delete");
                            }
                          })
    }
    
  return (
<div className={styles.appr}>
        <h1>Title: {leave.title}</h1>
        <p>description: {leave.description}</p>
        <hr />
        <h2>First name: {leave.user.firstname}</h2>
        <h2>Last name: {leave.user.lastname}</h2>
        <h2>email: {leave.user.email}</h2>
        <hr />
        <h1>Status: {leave.status}</h1>
        <h1>Department status: {leave.departmental_approval}</h1>
        {leave.departmental_approval === "reviewed" ? (
          <p>Approval letter: <Link href={`http://localhost:8000/api/directorletter/${leave.id}`} target="_blank">Click</Link></p>
        ) : null}
        <h1>Operation and management: {leave.operation_management_approval}</h1>
        {relieve_request ? (
          relieve_request.flat().map((relieve) => (
            leave.operation_management_approval === "reviewed" ?<div>
            <p>Approval letter: <Link href={`http://localhost:8000/api/operationsletter/${relieve.id}`} target="_blank">Click</Link></p>
            </div> : null
          ))
        ) : (
          null
        )}
        <h1>Leave type: {leave.leave_type}</h1>
        <hr />
        <p>start date: {leave.start_date}</p>
        <p>end date: {leave.end_date}</p>
        <hr />
        <p>number of days: {leave.number_of_days}</p>
        <p>number of weeks: {leave.number_of_weeks}</p>
        <hr />
        {relieve_request ? (
          relieve_request.flat().map((relieve) => (
            relieve.acceptance_date ? <div>
                <p>Relieving officer: {relieve.relieving_officer.firstname + " " + relieve.relieving_officer.lastname}</p>
            <p><strong>Approval letter: </strong><Link href={`http://localhost:8000/api/reliveletter/${relieve.id}`} target="_blank">Click</Link></p>
            </div> : null
          ))
        ) : (
          null
        )}
        <hr />
        {leave.comment === null ? "" :<p>comment: {leave.comment}</p>}
        <hr />
        {leave.status === "approved" ?
         <div className={styles.cover_letter_link_container}>
         <Link className={styles.cover_letter_link} href={`http://localhost:8000/api/coverletter/${Id}`} target="_blank">Generate cover letter</Link>
         </div>
         : null}
        <hr />


        <div className={styles.btn}>
        <button onClick={handleDelete}>Delete</button>
        </div>
    </div>
  )
}

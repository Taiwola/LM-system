"use client"
import Link from "next/link";
import styles from "../../department/[departmentId]/page.module.css"
import {useParams, useRouter} from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";


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
export default function page() {
  const params = useParams();
  const router = useRouter();
  const Id = params.operationId;
  const id = params.dashboadid;
  const [leave, setLeave] = useState(initState);
  const [reliveReq, setReq] = useState(initReq);

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


  const handleApproval = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const data = {
        accessToken, Id, director_id: id
      }
      const res = await fetch('http://localhost:3000/api/operation/approval', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });


      const response = await res.json();

      if (response.success === true) {
        const message = response.message;
        router.refresh;
      } else {
        const message = response.message;
        // alert(message);
        toast.error(message);
      }
  }

  const handleReject = async () => {
    const accessToken = localStorage.getItem("accessToken");
      const data = {
        accessToken, Id, director_id: id
      }
      const res = await fetch('http://localhost:3000/api/operation/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });


      const response = await res.json();

      if (response.success === true) {
        const message = response.message;
        // alert(message);
        toast.success(message);   
        router.refresh();
      } else {
        const message = response.message;
        // alert(message);
        toast.error(message);
      }
  }

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

  const relieve_officer = reliveReq?.filter((request) =>{
    return request.relieve_leave.id === leave.id
  });

  const accepted_officer = relieve_officer?.filter((request) => {
    return request.accept_relieve === true;
  });



  return (
    <div> <div className={styles.container}>
    <header className={styles.header}>
      <h1>Leave Details</h1>
    </header>
    <section className={styles.leaveDetails}>
      <div>
        <strong>Title:</strong> {leave.title}
      </div>
      <div>
        <strong>Description:</strong> {leave.description}
      </div>
      <hr />
      <div>
        <strong>Status:</strong> {leave.status}
      </div>
      <div>
        <strong>Department:</strong> {leave.departmental_approval}
        <br />
        <strong>Department Letter:</strong> <Link href={`http://localhost:8000/api/directorletter/${leave.id}`}>Click</Link>
      </div>
      <div>
        <strong>Operation and management:</strong> {leave.operation_management_approval}
      </div>
      <hr />
      <div>
        <strong>First Name:</strong> {leave.user.firstname}
      </div>
      <div>
        <strong>Last Name:</strong> {leave.user.lastname}
      </div>
      <hr />
      <hr />
      <div>
      {
        accepted_officer?.length > 0 ? (
          accepted_officer.flat().map((l) => {
            return (
              <div>
                <strong>Relieving officer:</strong> {l.relieving_officer.firstname + " " + l.relieving_officer.lastname}
                <br />
                <strong>Acceptance Date:</strong> {l.acceptance_date}
                <br />
                <strong>Acceptance Letter:</strong> <Link href={`http://localhost:8000/api/reliveletter/${l.id}`} target='_blank'>
                  click
                </Link>
              </div>
            )
          })
        ) : null
      }
      </div>
      <hr />
      <div>
        <strong>Start Date:</strong> {leave.start_date}
      </div>
      <div>
        <strong>End Date:</strong> {leave.end_date}
      </div>
      <hr />
      <div>
        <strong>Leave Type:</strong> {leave.leave_type}
      </div>
      <div>
        <strong>Number of Weeks:</strong> {leave.number_of_weeks}
      </div>
      <div>
        <strong>Number of Days:</strong> {leave.number_of_days}
      </div>
     <div className={styles.btn}>
      <button onClick={handleApproval}>approve</button>
      <button onClick={handleReject}>reject</button>
     </div>
    </section>
  </div></div>
  )
}


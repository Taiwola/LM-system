"use client"
import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {FaEdit} from "react-icons/fa"
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
  },
  departmental_approval: "",
  operation_management_approval: ""
};

interface Response {
  success: Boolean,
  message: string
}
let initReq: Relive_Request[]
export default function Taskid({id}: Params) {
  const [leave, setLeave] = useState(initState);
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState(true);
  const [relieveReq, setReq] = useState(initReq);
    const path = useParams();
    const router = useRouter()
    const Id = path.taskId;

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


    useEffect(()=> {
      if (leave.comment === null) {
        setShowComment(true)
      } else {
        setShowComment(false);
      }
    }, [])

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
const relieve_request = relieveReq?.filter((relive) => {
  return relive.relieve_leave.id === leave.id
});

    async function handleReject () {
      const accessToken = localStorage.getItem('accessToken');
      const status = "reject"
      const data = {
        accessToken, Id, status
      }
      const res = await fetch('http://localhost:3000/api/reject', {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      });
      const response: Response = await res.json();
      if (response.success === true) {
        const message = response.message;
        // alert(message);
        toast.success(message);
        router.back();
      } else {
        // alert("failed")
        toast.error("failed");
      }
    }

    async function handleApprove() {
      const accessToken = localStorage.getItem('accessToken');
      const status = "approved"
      const data = {
        accessToken, Id, status
      }
      const res = await fetch('http://localhost:3000/api/reject', {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      });
      const response: Response = await res.json();
      if (response.success === true) {
        const message = response.message;
        // alert(message);
        toast.success(message);
        router.back();
      } else {
        // alert("failed")
        toast.error("failed")
      }
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
    };


    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      const accessToken = localStorage.getItem('accessToken')
      const res = await fetch("http://localhost:3000/api/addcomment", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({accessToken, Id, comment})
      });

      const response = await res.json();
      if (response.success === true) {
        const message = response.message;
        // alert(message);
        toast.success(message);
        setShowComment(false);
      } else {
        const message = response.message;
        // alert(message);
        toast.error(message);
      }
    }

    const handleEditClick = () => {
      setShowComment(true);
    };
    const handleBackClick = () => {
      setShowComment(false);
    };
    

  return (
<div className={styles.appr}>
<h1>Title: {leave.title}</h1>
        <h2>First name: {leave.user.firstname}</h2>
        <h2>Last name: {leave.user.lastname}</h2>
        <h2>email: {leave.user.email}</h2>
        <hr />
        <h1>Status: {leave.status}</h1>
        <h1>leave type: {leave.leave_type}</h1>
        <hr />
        <p>start date: {leave.start_date}</p>
        <p>end date: {leave.end_date}</p>
        <hr />
        {relieve_request ? (
          relieve_request.flat().map((relieve) => (
            <div>
                 <p>Relieving officer: {relieve.relieving_officer.firstname + " " + relieve.relieving_officer.lastname}</p>
            <p>Approval letter: <Link href={`http://localhost:8000/api/reliveletter/${relieve.id}`} target="_blank">Click</Link></p>
            </div>
          ))
        ) : (
          null
        )}
        <hr />
        {relieve_request ? (
          relieve_request.flat().map((relieve) => (
            <div>
                 <p>Department Approval: {leave.departmental_approval}</p>
            <p>Approval letter: <Link href={`http://localhost:8000/api/directorletter/${leave.id}`} target="_blank">Click</Link></p>
            </div>
          ))
        ) : (
          null
        )}

        <hr />
        
        {relieve_request ? (
          relieve_request.flat().map((relieve) => (
            <div>
                 <p>Operation and management approval: {leave.operation_management_approval}</p>
            <p>Approval letter: <Link href={`http://localhost:8000/api/operationsletter/${relieve.id}`} target="_blank">Click</Link></p>
            </div>
          ))
        ) : (
          null
        )}


        <p>number of days: {leave.number_of_days}</p>
        <p>number of weeks: {leave.number_of_weeks}</p>
        <hr />
        <p>description: {leave.description}</p>
        <hr />
          {showComment == true ? <form onSubmit={handleSubmit} method="post" className={styles.form}>
            <div>
            <label htmlFor="comment" className={styles.label}>Add comment</label>
            </div>
            <div>
            <textarea name="comment" id="" cols={20} rows={5} value={comment} onChange={handleChange} className={styles.textarea}></textarea>
            </div>
            <button type='button' onClick={handleBackClick} className={styles.grey}>Back</button>
            <button type="submit" className={styles.button}>Add</button>
          </form>: <p>comment: {leave.comment} <button onClick={handleEditClick}><FaEdit/></button> </p>}
          <hr />
          {/* {leave.status === "approved" ? <Link href={`http://localhost:8000/api/coverletter/${Id}`} target="_blank">Generate cover letter</Link>: null} */}
        <div className={styles.btn}>
        <button onClick={handleReject}>Reject</button>
        <button onClick={handleApprove}>Approve</button>
        </div>
    </div>
  )
}

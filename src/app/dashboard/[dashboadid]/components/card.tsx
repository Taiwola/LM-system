
// Import necessary modules
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../page.module.css";
import { useParams } from "next/navigation";
import TaskCard from "./task_card";
import Image from "next/image";

// Define the interface for the leave object
interface Leave {
 id: string;
 title: string;
 description: string;
 status: string;
 firstname: string;
 lastname: string;
 leave_type: string;
 user: {
    id: string
    firstname: string;
    lastname: string;
 };
}

// Initialize the state for the leave array
const initState: Leave[] = [];

let initReq: Relive_Request[]; 

// Define the main component
export default function Card() {
 // Declare the state for the leave array and the setter function
 const [leaves, setLeave] = useState(initState);
 const [getReq, setReq] = useState(initReq)

 // Retrieve the dashboard id from the URL parameters
 const path = useParams();
 const Id = path.dashboadid;

 // Fetch the leave data from the server whens the component mount
 useEffect(() => {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    // Create the user data object
    const userData = {
      accessToken,
    };

    // Send a POST request to the server with the user data
    const res = fetch("http://localhost:3000/api/userleave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // Process the server response
    const response = res.then((response) => response.json()).then((responseData) => {
      if (responseData.success === true) {
        // console.log(responseData.data.data);
        setLeave(responseData.data.data);
      } else {
        console.error("Failed to fetch user data: " + responseData.message);
      }
    });
 }, []);

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


 // Render the pending leave cards
 const hasPendingLeaves = leaves.filter((leave) => leave.status === "PENDING");
 const pendingContent = leaves.length > 0 ? (
  hasPendingLeaves.length > 0 ? (
    hasPendingLeaves.slice(-3).map((leave) => {
      const name = leave.user.firstname + ' ' + leave.user.lastname;
      return (
        <TaskCard
          key={leave.id}
          desc={leave.description}
          id={leave.id}
          leave_type={leave.leave_type}
          name={name}
          title={leave.title}
          status={leave.status}
        />
      );
    })
  ) : (
    <p style={{ textAlign: "center", lineHeight: "2em" }}>No pending leave</p>
  )
) : (
  <p style={{ textAlign: "center", lineHeight: "2em" }}>Come back later</p>
);

 // Render the approved leave cards
 const approvedLeaves = leaves.filter((leave) => leave.status === "approved");

 const approveContent = leaves.length > 0 ? (
   approvedLeaves.length > 0 ? (
     approvedLeaves.slice(-3).map((leave) => {
       const name = leave.user.firstname + ' ' + leave.user.lastname;
       return (
         <TaskCard
           key={leave.id}
           desc={leave.description}
           id={leave.id}
           name={name}
           leave_type={leave.leave_type}
           title={leave.title}
           status={leave.status}
         />
       );
     })
   ) : (
     <p style={{ textAlign: "center", lineHeight: "2em" }}>No approved leave yet</p>
   )
 ) : (
  <p style={{ textAlign: "center", lineHeight: "2em" }}>Come back later</p>
 );
 

 // Render the rejected leave cards
 const hasRejectedLeaves = leaves.filter((leave) => leave.status === "reject");

const leaveContent = leaves.length > 0 ? (
  hasRejectedLeaves.length > 0 ? (
    hasRejectedLeaves.slice(-3).map((leave) => (
      <TaskCard
        key={leave.id}
        desc={leave.description}
        id={leave.id}
        leave_type={leave.leave_type}
        name={`${leave.user.firstname} ${leave.user.lastname}`}
        title={leave.title}
        status={leave.status}
      />
    ))
  ) : (
    <p style={{ textAlign: "center", lineHeight: "2em" }}>No rejected leave yet</p>
  )
) : (
  <p style={{ textAlign: "center", lineHeight: "2em" }}>Come back later</p>
);


const userId = leaves.flat().map((l) => l.user.id)
// find the user relieve request
const relieve_request = getReq?.filter((relive) => {
  return relive.requesting_officer.id === userId[0]
});

// Now you can use the `leaveContent` variable in your component JSX


 // Render the main component
 return (
    <div className={styles.container}>
        <div className={styles.card_section}>
          <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.card_text}>
              Apply for leave
            </div>
          <div>
            <Link href={`/dashboard/${Id}/leave`} className={styles.card_link}>Apply here</Link>
          </div>
        </div>
          <div className={styles.card}>
            <div className={styles.card_text}>
              Apply for relieving officer
            </div>
          <div>
            <Link href={`/dashboard/${Id}/request`} className={styles.card_link}>Apply here</Link>
          </div>
        </div>

        {relieve_request?.length > 0 ? <div className={styles.relieve_content_flex}>
          {relieve_request.slice(-3).map((request) => (
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
))}
 {relieve_request?.length >= 3 ? <Link href={`/dashboard/${Id}/relieving/all`}>View more &rarr;</Link> : null}
        </div>: null}
          </div>

        {leaves.length === 0 ? 
        //   <div className={styles.loading}>
        //   <p style={{ textAlign: "center", lineHeight: "2em" }}>Come back later</p>
        //   <Image src='/image/bear.jpg' alt="..." width={400} height={100} loading="eager" />
        // </div> 
        null
         :<><div className={styles.pending}>
         <h1>Pending</h1>
         <div className={styles.pending_section}>
           {pendingContent}
         </div>
       </div><div className={styles.pending}>
           <h1>Approved</h1>
           <div className={styles.pending_section}>
             {approveContent}
           </div>
         </div><div className={styles.pending}>
           <h1>Rejected</h1>
           <div className={styles.pending_section}>
             {leaveContent}
           </div>
         </div></>
}
        </div>
    </div>
 );
}
//
//This code defines a React component that fetches leave data from the server and renders it in a series of cards. The component uses the `useEffect`
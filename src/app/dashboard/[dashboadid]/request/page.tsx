"use client"
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './page.module.css';
import {useParams} from "next/navigation";
import { toast } from 'sonner';


let init: User;
let initDept: Department[]
let initLeave: Leave[];
const initStaffId = {
  id: ""
}
let initLeaveId = {
  id: ""
}
const Page = () => {
    const params = useParams();
    const {dashboadid} = params;

    const [leave, setLeave] = useState(initLeave);
    const [data, setData] = useState(init);
    const [dept, setDept] = useState(initDept);
    const [selectedStaffId, setStaffid] = useState(initStaffId);
    const [leaveId, setLeaveId] = useState(initLeaveId)

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
      
        if (!accessToken) {
          // Handle missing access token
          console.error('Missing access token');
          // Set firstname to 'Guest' if no access token
          return;
        }
      
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
              setData(responseData.data); // Set firstname from response
            } else {
              console.error('Failed to fetch user data: ' + responseData.message);
            }
          })
          .catch(error => {
            console.error('Error fetching user data: ' + error);
          });
      }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const data = fetch("http://localhost:3000/api/department/get", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({accessToken})
        });

        const res = data.then(response => response.json())
                        .then((responseData) => {
                            if (responseData.success === true) {
                                // console.log(responseData.data);
                                setDept(responseData.data)
                            }
                        })
    },[]);

    let staffs: Department[] = [];

    if (dept && data?.staff) {
        staffs = dept.filter((dept) => dept.id === data?.staff.id);
    } else {
        // Handle the case where either dept or data?.staff is undefined
        console.error("dept or data.staff is undefined");
    }

    const staff = staffs.map((staff) => staff.staff);

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
      setStaffid({
          id: e.target.value
      })
  };
    const handleLeaveChange = (e: ChangeEvent<HTMLSelectElement>) => {
      setLeaveId({
        id: e.target.value
      })
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const accessToken = localStorage.getItem('accessToken');
    const data = {
      accessToken, relievingOfficerId: selectedStaffId.id, leaveId: leaveId.id, requestingOfficerId: dashboadid
    }
    toast.loading('loading')
    const res = await fetch('http://localhost:3000/api/request/create', {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    const response = await res.json();
    if (res.ok) {
      const message = response.message;
      toast.success(message);
    } else {
      const message = response.message
      toast.error(message);
    }
  }


    return (
        <div className={styles.form_wrapper}>
            <h2> Request for relieving officer </h2>
            

            <form action="" className={styles.form_container} onSubmit={handleSubmit}>
            <label htmlFor='department'>Select leave:</label>
            <select
             id="department"
            name="department"
            onChange={handleLeaveChange}
            value={leaveId.id}
            >
                <option value="">Select leave</option>
                {leave ? leave.map((l) => (
                    <option key={l.id} value={l.id}>
                            {l.title}
                    </option>
                )): null}
            </select>

        <label htmlFor="priority">Reliving officer:</label>
        <select
         id="priority"
          name="priority"
          value={selectedStaffId.id}
          onChange={handleSelectChange}
          >
        <option value="" className={styles.option}>Choose a staff</option>
              {/* Dynamically populate options from the array of objects */}
              {staff.flat().map((option) => (
                <option key={option.id} value={option.id}>
                  {option.firstname + " " + option.lastname}
                </option>
              ))}
        </select>

        <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Page;
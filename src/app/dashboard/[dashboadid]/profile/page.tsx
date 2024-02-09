"use client"
import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css"
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";



const initState: User = {
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
}

const initStaffId = {
  id: ""
}

let initDept: Department[]
export default function Profile() {
  const [data, setData] = useState(initState);
  const [selectedStaffId, setStaffid] = useState(initStaffId);
  const [dept, setDept] = useState(initDept);
 
  
  const path = useParams();
  const Id = path.dashboadid;
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
  
    const userData = {
      accessToken,
      Id,
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
          setData(responseData.data);
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
},[])

  const handleStaffSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStaffid({
        id: e.target.value
    });
}

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const accessToken = localStorage.getItem("accessToken");
  const data = {
    Id,
    deptId: selectedStaffId.id,
    accessToken
  };

  try {
    const res = await fetch('http://localhost:3000/api/user/changedept', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await res.json();

    if (responseData === true) {
      toast.success(responseData.message);
    } else {
      toast.error(responseData.message);
    }

    window.location.reload(); // Refresh the page
  } catch (error) {
    console.error('Error:', error);
    // Handle error, perhaps display a toast message or some other feedback to the user
    toast.error("something wrong happened")
  }
};



  
  return (
    <section className={styles.section}>
      <h1>Profile</h1>
      <div className={styles.acct}>
        <p>first name: {data.firstname}</p>
        <p>last name: {data.lastname}</p>
        <p>email: {data.email}</p>
        {data.staff ? <p>department: {data.staff ? data.staff.name : null}</p> : null}
        {data.directorOf ? <p> department director: {data.directorOf.name}</p> : null}
      </div>
      <div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="department" className={styles.label}>
            Change Department
            <select
            id="options"
            name="staff"
            value={selectedStaffId.id}
            onChange={handleStaffSelectChange}
            className={styles.select}
            >
              <option value="">select department</option>
              {dept?.length >= 1 && dept?.map((dept) => (
                <option value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </label>
          <button type="submit" className={styles.button}>Submit</button>
        </form>
      </div>
    </section>
  )
}

"use client"
import {useParams} from "next/navigation";
import styles from "./page.module.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const initStaff: User[] = [{
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    status: "",
    directorOf: {
      id: "",
      name: "",
    },
    staff: {
      id: "",
      name: "",
    }
}]

const initStaffId = {
    id: ""
}

const initDept: Department = {
    id: "",
    name: "",
    director: {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        status: ""
    },
    staff:[{
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        status: "",
        directorOf: {
          id: "",
          name: "",
        },
        staff: {
          id: "",
          name: "",
        }
    }]
} 


const initState = {
    name: ""
}
export default function Department() {
    const {id} = useParams();
    
      // State to store the form data
      
      const [staffId, setStaffId] = useState(initStaffId);

      const [staffs, setStaff] = useState(initStaff);
      const [selectedStaffId, setStaffid] = useState(initStaffId);
      const [dept, setDept] = useState(initDept);
      const [dpt, setDpt] = useState("");
      const [formData, setFormData] = useState(initStaff);

      // get all users
      useEffect(()=>{
        const accessToken = localStorage.getItem('accessToken');
        const data = fetch("http://localhost:3000/api/getalluser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({accessToken})
        });
        const res = data.then(response => response.json())
                        .then((responseData) => {
                            if (responseData.success === true) {
                                // console.log(responseData.user);
                                setStaff(responseData.user);
                                setFormData(responseData.user);
                            } else {
                                //alert('Failed');
                                toast.error("failed")
                            }
                        })
    }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const data = {
            accessToken, id
        }

        const res = fetch('http://localhost:3000/api/department/getone', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).then((responseData) => {
            if (responseData.success === true) {
                //console.log(responseData);
                setDpt(responseData.data.name);
                setDept(responseData.data);
            } else {
                toast.error(responseData.message);
            }
        })
        
    }, []);



      // Event handler for handling changes in the form inputs
      const handleInputChange = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setStaffId({
            id: e.target.value
        })
    }
    
    const handleStaffSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setStaffid({
            id: e.target.value
        });
    }

      // Event handler for handling form submission
      const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Perform any actions with the form data (e.g., send to server, update state, etc.)
        //console.log('Form Data:', formData);
        // console.log("director: ", staffId.id)
        // console.log("name: ", dpt);

        const accessToken = localStorage.getItem("accessToken");
        let data = {
            accessToken,
            dept_id: id,
            name: dpt,
            director_id: staffId.id
        }

        const res = await fetch("http://localhost:3000/api/department/update", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(response => response.json()).then((responseData) => {
            if (responseData.success === true ) {
                window.location.reload()
            } else {
                const message = responseData.message
                toast.error(message)
            }
        });
      };

      const handleStaffSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // console.log("staff: ", selectedStaffId.id)
        const accessToken = localStorage.getItem("accessToken");
        let data = {
          accessToken,
          id,
          staff_id: selectedStaffId.id
      }

      const res = await fetch("http://localhost:3000/api/department/addstaff", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(response => response.json()).then((responseData) => {
        if (responseData.success === true ) {
            window.location.reload()
        } else {
            const message = responseData.message
            toast.error(message)
        }
    });

      }

      const handleDelete = async (Id: string) => {
        const accessToken = localStorage.getItem("accessToken");
        let data = {
          accessToken,
          dept_id: id,
          staff_id: Id
      }

      const res = await fetch("http://localhost:3000/api/department/removestaff", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => response.json()).then((responseData) => {
        if (responseData.success === true ) {
            window.location.reload()
        } else {
            const message = responseData.message
            toast.error(message)
        }
    });

      }


      const staffInDepartment: User[] = dept.staff.map((staff) => {
        return staff
      });

    
      return (
        <div className={styles.body}>
          {/* Form Section */}
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="name" className={styles.label}>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={dpt}
              onChange={handleInputChange}
              className={styles.input}
            />
    
            <label htmlFor="options" className={styles.label}>Select an option:</label>
            <select
              id="options"
              name="director"
              value={staffId.id}
              onChange={handleSelectChange}
              className={styles.select}
            >
              <option value={`dept.director ? dept.director.id : null `} className={styles.option}>{dept.director ? dept.director.firstname + " " + dept.director.lastname : null}</option>
              {/* Dynamically populate options from the array of objects */}
              {formData.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.lastname + " " + option.firstname}
                </option>
              ))}
            </select>
    
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </form>
    
          {/* Staff Card Section */}
          {staffInDepartment.length > 0 ?<div className={styles.formStyle}>
            <h2>Staff in Department</h2>
            <ul className={styles.listStyle}>
              {staffInDepartment.map((staffs) => (

                    <li key={staffs.id} className={styles.listItem}>{staffs.firstname + " " + staffs.lastname} 
                        <button
                            className={styles.deleteButton}
                            onClick={() => handleDelete(staffs.id)} // Add a delete handler
                        >
                            Remove
                        </button>
                    </li>
              ))}
            </ul>
          </div>: null}

          

          <form onSubmit={handleStaffSubmit} className={styles.form}>
    
            <label htmlFor="options" className={styles.label}>Select a new staff:</label>
            <select
              id="options"
              name="staff"
              value={selectedStaffId.id}
              onChange={handleStaffSelectChange}
              className={styles.select}
            >
              <option value="" className={styles.option}>Choose a staff</option>
              {/* Dynamically populate options from the array of objects */}
              {staffs.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.firstname + " " + option.lastname}
                </option>
              ))}
            </select>
    
            <button type="submit" className={styles.button}>
              Add
            </button>
          </form>
        </div>
      );
              
}

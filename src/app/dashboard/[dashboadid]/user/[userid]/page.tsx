"use client"
import {useParams, useRouter} from "next/navigation"
import {ChangeEvent, FormEvent, useEffect, useState} from "react"
import styles from "./page.module.css"
import { toast } from "sonner"
export default function Userid() {
  const userState: User = {
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
      name: "",
    }
  }
  const [data, setData] = useState(userState);
  const params = useParams();
  const router = useRouter();
  const Id = params.userid;

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

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    status: "",
  });

  useEffect(() => {
    // Set formData only when data is not empty
    if (Object.keys(data).length !== 0) {
      setFormData({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        status: data.status,
      });
    }
  }, [data]);

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const name = e.target.name;
      setData(prevData => ({
          ...prevData,
          [name]: e.target.value
      }));
    };
  
    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
      const accessToken = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:3000/api/updateuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken, Id, firstname: data.firstname, lastname: data.lastname, email: data.email, status: data.status
        })
      }).then((response) => response.json())
        .then((responseData) => {
          if (responseData.success === true) {
            const message = responseData.message;
            toast.success(message);
            router.back();
          } else {
            toast.error(responseData.message);
          }
        })
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const name = e.target.name;
      setData(prevData => ({
          ...prevData,
          [name]: e.target.value
      }));
  }
  return (
    <form className={styles.userForm} onSubmit={submitForm}>
      <label htmlFor="firstname" className={styles.label}>First Name:</label>
      <input
      className={styles.input}
        type="text"
        id="firstname"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        required
      />

      <label htmlFor="lastname" className={styles.label}>Last Name:</label>
      <input
      className={styles.input}
        type="text"
        id="lastname"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        required
      />

      <label htmlFor="email" className={styles.label}>Email:</label>
      <input
      className={styles.input}
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="status" className={styles.label}>Status:</label>
      <select
        id="status"
        name="status"
        value={formData.status}
        className={styles.select}
        onChange={handleSelectChange}
      >
        <option value={formData.status}>{formData.status}</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="superadmin">Super Admin</option>
      </select>

      <button type="submit" className={styles.button}>Submit</button>
    </form>
  )
}

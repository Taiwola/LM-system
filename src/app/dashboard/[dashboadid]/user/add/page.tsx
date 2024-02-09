"use client"
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./page.module.css";
import { toast } from "sonner";

const initState = {
    firstname: '',
    lastname: '',
    password: '',
    confirm_password: '',
    email: '',
}

interface Response {
    message: string,
    success: Boolean
}

export default function AddUser() {
    const [data, setData] = useState(initState);

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
    setData(prevData => ({
        ...prevData,
        [name]: e.target.value
    }));
    }

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (data.password !== data.confirm_password) {
            toast.error("password does not match")
        }

        const res = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...data})
        });
        const response: Response = await res.json();
        if (response.success === true) {
            toast.success("Registration Successful");
            setData(initState);
        } else {
            toast.error(response.message);
        }
    }

  return (
    <form className={styles.userForm} onSubmit={submitForm}>
      <label htmlFor="firstname" className={styles.label}>First Name:</label>
      <input
      className={styles.input}
        type="text"
        id="firstname"
        name="firstname"
         value={data.firstname}
        onChange={handleChange}
        required
      />

      <label htmlFor="lastname" className={styles.label}>Last Name:</label>
      <input
      className={styles.input}
        type="text"
        id="lastname"
        name="lastname"
        value={data.lastname}
        onChange={handleChange}
        required
      />

      <label htmlFor="email" className={styles.label}>Email:</label>
      <input
      className={styles.input}
        type="email"
        id="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        required
      />
      <label htmlFor="password" className={styles.label}>Password:</label>
      <input
      className={styles.input}
        type="password"
        id="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        required
      />

      <label htmlFor="password" className={styles.label}>Confirm password:</label>
      <input
      className={styles.input}
        type="password"
        id="confirm_password"
        name="confirm_password"
        value={data.confirm_password}
        onChange={handleChange}
        required
      />

      <button type="submit" className={styles.button}>Submit</button>
    </form>
  )
}

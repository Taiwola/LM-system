"use client"
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "../add/page.module.css";
import {useRouter} from "next/navigation";
import { toast } from "sonner";

const initState = {
    name: ""
}
export default function Department() {
    const [data, setData] = useState(initState);
    const router = useRouter();
    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
    setData(prevData => ({
        ...prevData,
        [name]: e.target.value
    }));
    }

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const accessToken = localStorage.getItem('accessToken');

      const res = await fetch('http://localhost:3000/api/department/create', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({accessToken, ...data})
      });
      const response= await res.json();
      if (response.success === true) {
          // alert("Registration Successful");
          toast.success("Registration Successfull")
          setData(initState);
          router.back();
      } else {
         toast(response.message);
      }
  }
  return (
    <form className={styles.userForm} onSubmit={submitForm}>
      <label htmlFor="firstname" className={styles.label}>Name:</label>
      <input
      className={styles.input}
        type="text"
        id="name"
        name="name"
         value={data.name}
        onChange={handleChange}
        required
      />

      <button type="submit" className={styles.button}>Submit</button>
    </form>
  )
}

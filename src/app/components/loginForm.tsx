'use client'
import {ChangeEvent, useState, useEffect, FormEvent} from 'react';
import styles from "../page.module.css";
import RegisterForm from './registerForm';
import { useRouter } from 'next/navigation';



const initState = {
    password: '',
    email: '',
}

interface Response {
    accessToken: string,
    message: string,
    success: Boolean,
    id: string
}
export default function LoginForm() {
    const [showRegister, setRegister] = useState(false);
    const [data, setData] = useState(initState);
    const router = useRouter();



    const handleClick = () => {
        setRegister(true);
    }

    const handChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
    setData(prevData => ({
        ...prevData,
        [name]: e.target.value
    }));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log(res);
        const response: Response = await res.json();
        if (response.success === true) {
            const accessToken = response.accessToken;
            const id = response.id
           // Save the access token to localStorage
            localStorage.setItem('accessToken', accessToken);
            router.push(`/dashboard/${id}`);
        } else {
            alert("login failed")
        }

    }
  return (
    <>
    { showRegister ? <RegisterForm /> :<><form onSubmit={handleSubmit} method="post">
              <div className={styles.form_control}>
                  <label htmlFor="email">Email</label>
                  <input
                   type="email" 
                   name="email" 
                   id="email" 
                   value={data.email}
                   onChange={handChange}
                   required
                    />
              </div>
              <div className={styles.form_control}>
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" value={data.password} onChange={handChange} />
              </div>
              <div className={styles.form_control}>
                  <button type='submit'>Submit</button>
              </div>
          </form><div>
                  <p>You do not have an account? <button  onClick={handleClick} className="text-red-700">Register</button></p>
              </div></>}
    </>
  )
}

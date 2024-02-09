'use client'
import {ChangeEvent, FormEvent, useState} from 'react';
import styles from "../page.module.css";
import LoginForm from './loginForm';

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

export default function RegisterForm() {
    const [showLogin, setLogin] = useState(false);
    const [data, setData] = useState(initState);
    const handleClick = () => {
        setLogin(true);
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
    setData(prevData => ({
        ...prevData,
        [name]: e.target.value
    }));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (data.password !== data.confirm_password) {
            alert("password does not match")
        }

        const res = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...data})
        });
        const response: Response = await res.json();
        if (response.success === true) {
            alert("Registration Successful");
            setLogin(true);
        } else {
            alert(response.message);
        }
    }
  return (
    <>
    { showLogin ? <LoginForm /> :<><form onSubmit={handleSubmit} method="post">
             <div className={styles.form_control}>
                  <label htmlFor="firstname">First name</label>
                  <input type="text" name="firstname" value={data.firstname} id="firstname" onChange={handleChange} required />
              </div>
              <div className={styles.form_control}>
                  <label htmlFor="lastname">Last name</label>
                  <input type="text" name="lastname" id="lastname" value={data.lastname} onChange={handleChange} required />
              </div>
              <div className={styles.form_control}>
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" value={data.email} onChange={handleChange} required />
              </div>
              <div className={styles.form_control}>
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" value={data.password} onChange={handleChange} id="password" />
              </div>
              <div className={styles.form_control}>
                  <label htmlFor="Password">Confirm Password</label>
                  <input type="password" name="confirm_password" value={data.confirm_password} onChange={handleChange} id="password" />
              </div>
              <div className={styles.form_control}>
                  <button type='submit'>Submit</button>
              </div>
          </form><div>
                  <p>You already have an account? <button onClick={handleClick} className="text-cyan-600">Login</button></p>
              </div></>}
    </>
  )
}

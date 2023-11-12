'use client'
import {useState} from 'react';
import styles from "../page.module.css";
import LoginForm from './loginForm';

export default function RegisterForm() {
    const [showLogin, setLogin] = useState(false);
    const handleClick = () => {
        setLogin(true);
    }

    const handleSubmit = () => {
      setLogin(true);
    }
  return (
    <>
    { showLogin ? <LoginForm /> :<><form action="" method="post">
             <div className={styles.form_control}>
                  <label htmlFor="firstname">First name</label>
                  <input type="text" name="firstname" id="firstname" required />
              </div>
              <div className={styles.form_control}>
                  <label htmlFor="lastname">Last name</label>
                  <input type="text" name="lastname" id="lastname" required />
              </div>
              <div className={styles.form_control}>
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" required />
              </div>
              <div className={styles.form_control}>
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" />
              </div>
              <div className={styles.form_control}>
                  <label htmlFor="Password">Confirm Password</label>
                  <input type="password" name="password" id="password" />
              </div>
              <div className={styles.form_control}>
                  <button onClick={handleSubmit}>Submit</button>
              </div>
          </form><div>
                  <p>You already have an account? <button onClick={handleClick} className="text-cyan-600">Login</button></p>
              </div></>}
    </>
  )
}

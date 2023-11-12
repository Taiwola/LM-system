'use client'
import {useState} from 'react';
import styles from "../page.module.css";
import RegisterForm from './registerForm';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const [showRegister, setRegister] = useState(false);
    const router = useRouter();
    const handleClick = () => {
        setRegister(true);
    }
    const handleSubmit = () => {
        router.push('/dashboard');
    }
  return (
    <>
    { showRegister ? <RegisterForm /> :<><form action="" method="post">
              <div className={styles.form_control}>
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" required />
              </div>
              <div className={styles.form_control}>
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" />
              </div>
              <div className={styles.form_control}>
                  <button onClick={handleSubmit}>Submit</button>
              </div>
          </form><div>
                  <p>You do not have an account? <button onClick={handleClick} className="text-red-700">Register</button></p>
              </div></>}
    </>
  )
}

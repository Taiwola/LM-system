"use client"
import Date from "./date";
import Input from "./input";
import styles from "../page.module.css";
import Textarea from "./textarea";
import { ChangeEvent, FormEvent, SelectHTMLAttributes, useState } from "react";
import { toast } from "sonner";

const initState = {
    title: "",
    days: "",
    start: "",
    end: "",
    description: "",
    leave_type: "",
}
export default function Card() {
    
    const [data, setData] = useState(initState);

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name as string;
    setData(prevData => ({
        ...prevData,
        [name]: e.target.value
    }));
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.name;
        setData(prevData => ({
            ...prevData,
            [name]: e.target.value
        }));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('accessToken');
        const res = await fetch('http://localhost:3000/api/createleave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({accessToken, ...data})
        });

        const response = await res.json();

        if (response.success === true) {
            const message = response.message;
            // alert(message);
            toast.success(message);
            setData(initState);
        } else {
            const message = response.message;
            // alert(message);
            toast.error(message);
        }
    }

  return (
    <section className={styles.section}>
        <form onSubmit={handleSubmit} method="post" className={styles.form_control}>
        <div className={styles.form_input}>
                <Input name="title" label="Enter a title" value={data.title}
                   onchange={handleChange} />
            </div>
            <div className={styles.form_input}>
                <Input name="days" label="Number of days" value={data.days} onchange={handleChange} />
            </div>
            <div className={styles.form_input}>
            <select name="leave_type" id="" value={data.leave_type} onChange={handleSelectChange}>
                        <option value="">choose an option</option>
                        <option value="annual leave">annual leave</option>
                        <option value="maternity leave">maternity leave</option>
                        <option value="vacation">vacation</option>
                        <option value="sick leave">sick leave</option>
                    </select>
            </div>
            <div className={styles.form_date}>
                <Date label="Start Date" name="start" value={data.start} onchange={handleChange} />
            </div>
            <div className={styles.form_date}>
                <Date label="End Date" name="end" value={data.end} onchange={handleChange} />
            </div>
            <div className={styles.input_text}>
                <Textarea name="description" value={data.description} onchange={handleChange} />

                <div className={styles.btn}>
            <button type='submit'>Submit</button>
            </div>
            </div>
        </form>
    </section>
  )
}

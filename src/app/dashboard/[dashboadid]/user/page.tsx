"use client"
import {useParams} from "next/navigation";
import {ChangeEvent, useEffect, useState} from "react";
import styles from "./page.module.css";
import {FaTrash, FaEdit} from "react-icons/fa"
import Link from "next/link";
import { toast } from "sonner";


const initState: User[] = []
const initDept: Department[] = []
export default function User() {
    const [users, setUser] = useState(initState);
    const [dept, setDept] = useState(initDept);
    const params = useParams();
    const Id = params.dashboadid;

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
                                setUser(responseData.user);
                            } else {
                                // alert('Failed');
                                toast.error("failed");
                            }
                        })
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
                                console.log(responseData.data);
                                setDept(responseData.data)
                            }
                        })
    },[])

    const handleDelete = async (id: string) => {
        const accessToken = localStorage.getItem('accessToken');
        const Id = id;
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({accessToken, Id})
        }

        const res = await fetch("http://localhost:3000/api/deleteuser", options)
                            .then(response => response.json())
                            .then((responseData) => {
                                if (responseData.success === true) {
                                    const message = responseData.message;
                                    //alert(message)
                                    toast.success(message);
                                } else {
                                    const message = responseData.message;
                                    // alert(message)
                                    toast.error(message);
                                }
                            });
    }
    const content = users.map((user) => {
        return  <tbody key={user.id}>
          <tr className={styles.tr}>
            <td id="firstName" className={styles.td}>{user.firstname}</td>
            <td id="lastName" className={styles.td}>{user.lastname}</td>
            <td id="email" className={styles.td}>{user.email}</td>
            <td id="status" className={styles.td}>{user.status}</td>
            <td id="status" className={styles.td}>{user.staff ? user.staff.name : null}</td>
            <td id="edit" className={styles.td}><Link href={`/dashboard/${Id}/user/${user.id}`}>
            <FaEdit />
            </Link></td>
            <td id="delete" className={styles.td}><button type="button" className={styles.delete} onClick={() => handleDelete(user.id)}>
                <FaTrash />
                </button></td>
          </tr>
        </tbody>
      
    })

    const department = dept.map((department) => {
        const name = department.director === null ? null : department.director?.firstname + " " +department.director?.lastname;
        const numberOfStaff = department.staff?.length;
        return <tbody key={department.id}>
        <tr className={styles.tr}>
          <td id="firstName" className={styles.td}>{department.name}</td>
          <td id="lastName" className={styles.td}>{name}</td>
          <td id="email" className={styles.td}>{numberOfStaff}</td>
          <td id="edit" className={styles.td}><Link href={`/dashboard/${Id}/user/department/${department.id}`}>
          <FaEdit />
          </Link></td>
          <td id="delete" className={styles.td}><button type="button" className={styles.delete} onClick={() => handleDelete(department.id)}>
              <FaTrash />
              </button></td>
        </tr>
      </tbody>
    }) 
  return (
    <div className={styles.body}>
        <div className={styles.table_container}>
        <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>First Name</th>
            <th className={styles.th}>Last Name</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Department</th>
            <th className={styles.th}>Edit</th>
            <th className={styles.th}>Delete</th>
          </tr>
        </thead>
       {content}
       </table>
        </div>

        <div className={styles.table_container}>
    {   dept.length > 0   ?  <table className={styles.table}>
            <thead>
                <tr>
                <th className={styles.th}>Department Name</th>
                <th className={styles.th}>Director</th>
                <th className={styles.th}>Number of staffs</th>
                <th className={styles.th}>Edit</th>
                <th className={styles.th}>Delete</th>
                </tr>
            </thead>
            {department}
            </table> : null}
        </div>
       

       <div className={styles.container}>
        <Link href={`/dashboard/${Id}/user/add`} className={styles.link}>Add new user</Link>
        <Link href={`/dashboard/${Id}/user/department`} className={styles.link}>Add new department</Link>
        </div>
    </div>
  )
}

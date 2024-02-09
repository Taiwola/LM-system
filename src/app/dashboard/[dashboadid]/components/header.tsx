'use client'
import {FaBars, FaTimes, FaTh} from "react-icons/fa";
import styles from "../page.module.css";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {useEffect, useState} from "react"

type Prop = {
  toggle: () => void,
  menu: boolean,
  close: () => void
}

let initState:User = {
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
    name: ""
  }
};

export default function Header({toggle, menu, close}: Prop) {
  const [data, setData] = useState(initState);
 
  
  const path = useParams();
  const Id = path.dashboadid;

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
  
    if (!accessToken) {
      // Handle missing access token
      console.error('Missing access token');
      // Set firstname to 'Guest' if no access token
      return;
    }
  
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
          
          setData(responseData.data); // Set firstname from response
        } else {
          console.error('Failed to fetch user data: ' + responseData.message);
        }
      })
      .catch(error => {
        console.error('Error fetching user data: ' + error);
      });
  }, []);
  
  
  return (
    <header className={styles.header}>
        <div className={styles.header_container}>
            <div className={styles.header_img}>
              <p>Hi {data.firstname}</p>
            <Image src="/image/background.png"  alt="..." width={50} height={40} priority={true} className={styles.img}/>
            </div>
            <Link href="#" className={styles.header_logo}>
            <span>
            <FaTh />
            </span>
            </Link>

           {menu == false ? <button className={styles.header_toggle} onClick={toggle}>
              <FaBars />
            </button>: <button className={styles.header_toggle}
            onClick={close}
            >
              <FaTimes />
              </button>}
        </div>        
    </header>
  )
}

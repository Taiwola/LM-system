import Link from "next/link";
import styles from "../page.module.css";
import {FaCompactDisc, FaHome, FaTasks, FaSignOutAlt, FaCalendarWeek, FaUserAlt, FaBell, FaUserCircle, FaChevronDown} from 'react-icons/fa';
import {CheckCircle2} from "lucide-react"
import { useParams, useRouter } from "next/navigation";
import {useEffect, useState} from "react";
import { CheckSquare2 } from "lucide-react";
import { toast } from "sonner";

type Prop = {
  style: string
}

type Response = {
  success: boolean,
  message: string
}

// interface User {
//   firstname: string;
//   lastname: string;
//   email: string;
// }

const initState: User = {
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
}

let initReq: Relive_Request[]; 

export default function Sidebar({style}: Prop) {
  const [data, setData] = useState(initState);
  const [getReq, setReq] = useState(initReq);
  const path = useParams();
  const router = useRouter();
  const Id = path.dashboadid;

  async function handleLogout() {
    const accessToken = localStorage.getItem('accessToken');
    const data = {accessToken}
    const res = await fetch("http://localhost:3000/api/logout",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const response:Response  = await res.json();

    if (response.success === true) {
        const message = response.message;
        const accessToken = localStorage.removeItem('accessToken');
        toast.success('logging out')
        router.push('/');
    } else {
      const message = response.message;
      // alert(message);
      toast(message);
    }
  }

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

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
  
    fetch("http://localhost:3000/api/request/getall", {
      method: "POST",  // Correcting the method name
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken }),  // Wrapping the accessToken in an object
    })
    .then((response) => response.json())
    .then((responseData) => {
      setReq(responseData);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);

  const relieving_officer = getReq?.filter((request) => {
    return request.relieving_officer.id === Id
  });

  const accepted_or_declined = relieving_officer?.filter((officer) => {
    return officer.accept_relieve === null
  })


  return (
    <>
    <div className={`${styles.nav} ${style === 'show_menu' ? styles.show_menu : ''}`}>
    <nav className={styles.nav_container}>
      
        <Link href={`/dashboard/${Id}`} className={`${styles.nav_link} ${styles.nav_logo}`}>
          <span className={styles.nav_icon}>
          <FaCompactDisc />
          </span>
          <span className={styles.nav_logo_name}>LM</span>
        </Link>

        <div className={styles.nav_list}>
          <div className={styles.nav_items}>
            <h3 className={styles.nav_subtitle}>
              Profile
            </h3>


            <div className={styles.nav_dropdown}>

            <Link href={`/dashboard/${Id}/profile`} className={styles.nav_link}>
              <span className={styles.nav_icon}>
                <FaUserAlt />
              </span>
            <span className={styles.nav_name}>
              Profile
            </span>
            <span className={`${styles.nav_icon} ${styles.nav_dropdown_icon}`}>
                <FaChevronDown />
              </span>
            </Link>

            <div className={styles.nav_dropdown_collapse}>
                <div className={styles.nav_dropdown_content}>
                  <Link href={`/dashboard/${Id}/password`} className={styles.nav_dropdown_item}>Password</Link>
                  <Link href={`/dashboard/${Id}/mail`} className={styles.nav_dropdown_item}>Mail</Link>
                  <Link href={`/dashboard/${Id}/profile`} className={styles.nav_dropdown_item}>Account</Link>
                </div>
            </div>

            </div>

            

            <Link href={`/dashboard/${Id}`} className={styles.nav_link}>
            <span className={styles.nav_icon}>
            <FaHome />
            </span>
            <span className={styles.nav_name}>
              Home
            </span>
            </Link>

            <Link href={`/dashboard/${Id}/leave`} className={styles.nav_link}>
            <span className={styles.nav_icon}>
            <FaCalendarWeek />
            </span>
            <span className={styles.nav_name}>
              Leave
            </span>
            </Link>

            <Link href={`/dashboard/${Id}/request`} className={styles.nav_link}>
            <span className={styles.nav_icon}>
            <CheckSquare2 />
            </span>
            <span className={styles.nav_name}>
              Request
            </span>
            </Link>

            {data.status === 'admin' ? <Link href={`/dashboard/${Id}/task`} className={styles.nav_link}>
            <span className={styles.nav_icon}>
            <FaTasks />
            </span>
            <span className={styles.nav_name}>
              Tasks
            </span>
            </Link> : null
            }

          {data.directorOf ? <Link href={`/dashboard/${Id}/department`} className={styles.nav_link}>
            <span className={styles.nav_icon}>
            <FaTasks />
            </span>
            <span className={styles.nav_name}>
              department
            </span>
            </Link> : null}

          {data.directorOf?.name === "operation and management" ? <Link href={`/dashboard/${Id}/operation`} className={styles.nav_link}>
            <span className={styles.nav_icon}>
            <FaTasks />
            </span>
            <span className={styles.nav_name}>
              Operations
            </span>
            </Link> : null}
            
          </div>


          <div className={styles.nav_items}>
          <h3 className={styles.nav_subtitle}>
              Menu
            </h3>
          <Link href="#" className={styles.nav_link}>
          <span className={styles.nav_icon}>
            <FaBell />
            </span>
            <span className={styles.nav_name}>
              Notification
            </span>
            </Link>

          {data?.status === 'superadmin' ?<Link href={`/dashboard/${Id}/user`} className={styles.nav_link}>
          <span className={styles.nav_icon}>
            <FaUserCircle />
            </span>
            <span className={styles.nav_name}>
              User
            </span>
            </Link> : null}


            {accepted_or_declined?.length > 0 ? <Link href={`/dashboard/${Id}/relieving`} className={styles.nav_link}>
          <span className={styles.nav_icon}>
            <CheckCircle2 />
            </span>
            <span className={styles.nav_name}>
              Relieving Request
            </span>
            </Link> : null}

          </div>

          <div className={styles.nav_items}>
          <button onClick={handleLogout} className={`${styles.nav_link} ${styles.nav_logout}`}>
          <span className={styles.nav_icon}>
            <FaSignOutAlt />
            </span>
            <span className={styles.nav_name}>
              Logout
            </span>
            </button>
          </div>
        </div>
 
    </nav>
    </div>
    </>
  )
}

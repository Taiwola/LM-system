import Link from "next/link";
import styles from "../page.module.css";
import {FaCompactDisc, FaHome, FaTasks, FaSignOutAlt, FaCalendarWeek, FaUserAlt, FaBell, FaChevronDown} from 'react-icons/fa'

type Prop = {
  style: string
}

export default function Sidebar({style}: Prop) {
  return (
    <>
    <div className={`${styles.nav} ${style === 'show_menu' ? styles.show_menu : ''}`}>
    <nav className={styles.nav_container}>
      
        <Link href='/dashboard' className={`${styles.nav_link} ${styles.nav_logo}`}>
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

            <Link href="/dashboard/profile" className={styles.nav_link}>
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
                  <Link href="/dashboard/password" className={styles.nav_dropdown_item}>Password</Link>
                  <Link href="/dashboard/mail" className={styles.nav_dropdown_item}>Mail</Link>
                  <Link href="/dashboard/profile" className={styles.nav_dropdown_item}>Account</Link>
                </div>
            </div>

            </div>

            

            <Link href="/dashboard" className={styles.nav_link}>
            <span className={styles.nav_icon}>
            <FaHome />
            </span>
            <span className={styles.nav_name}>
              Home
            </span>
            </Link>

            <Link href="/dashboard/leave" className={styles.nav_link}>
            <span className={styles.nav_icon}>
            <FaCalendarWeek />
            </span>
            <span className={styles.nav_name}>
              Leave
            </span>
            </Link>

            <Link href="/dashboard/task" className={styles.nav_link}>
            <span className={styles.nav_icon}>
            <FaTasks />
            </span>
            <span className={styles.nav_name}>
              Tasks
            </span>
            </Link>

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

          </div>

          <div className={styles.nav_items}>
          <Link href="#" className={`${styles.nav_link} ${styles.nav_logout}`}>
          <span className={styles.nav_icon}>
            <FaSignOutAlt />
            </span>
            <span className={styles.nav_name}>
              Logout
            </span>
            </Link>
          </div>
        </div>
 
    </nav>
    </div>
    </>
  )
}

import {FaBars, FaTimes, FaTh} from "react-icons/fa";
import styles from "../page.module.css";
import Image from "next/image";
import Link from "next/link";

type Prop = {
  toggle: () => void,
  menu: boolean,
  close: () => void
}

export default function Header({toggle, menu, close}: Prop) {

  async function getUsername() {
    
  }

  return (
    <header className={styles.header}>
        <div className={styles.header_container}>
            <div className={styles.header_img}>
              <p>NAME</p>
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

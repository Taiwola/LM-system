import styles from '../page.module.css';

type Prop = {
    title: String,
    name: String,
    onclick: () => void,
    handleclick: () => void,
    active:string
}

export default function Button({title, name, onclick, active, handleclick}:Prop ) {
  return (
    <button
    className={`${name === 'login' ? styles.login : styles.register} ${active === 'true' ? '' : styles.active}`}
    onClick={() => {
      onclick();
      handleclick();
    }}
  >
    {title}
  </button> 
  )
}

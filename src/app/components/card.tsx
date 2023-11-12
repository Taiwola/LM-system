'use client'
import {useState} from 'react';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import Button from "./button"
import Imgbar from './imgbar';
export default function Card() {
  const [showLogin, setLogin] = useState(false);
  const [showRegister, setRegister] = useState(false);
  const handleLoginClick = () => {
    setLogin(true);
    setRegister(false);
  };

  const handleRegisterClick = () => {
    setRegister(true);
    setLogin(false);
  };
  const [isClicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);
  };
  return (
    <>
    {
      showLogin ?
      <LoginForm /> : 
      <> 
      <Button title='Login' name='login' active={isClicked ? "false" : "true"} handleclick={handleClick} onclick={handleLoginClick} />
      </>
      
    }
    {showRegister ? <RegisterForm /> : <Button title='register' name='register' active={isClicked ? "false" : "true"} handleclick={handleClick} onclick={handleRegisterClick} />}
    </>
   
  )
}




'use client'
import Header from "./header";
import Sidebar from "./sidebar";
import {useState} from 'react';

export default function NavBar() {
  const [showWidth, setWidth] = useState(false);
  const handleClick = () => {
    setWidth(true);
    return true;
  }
  function closeMenu() {
    setWidth(false);
  }
  const isMenuShown = showWidth;

  return (
    <>
    <Header toggle={handleClick} close={closeMenu} menu={isMenuShown} />
    <Sidebar style={isMenuShown ? 'show_menu' : ' ' }/>
    </>
  )
}

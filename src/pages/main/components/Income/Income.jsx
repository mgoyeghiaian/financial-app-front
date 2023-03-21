import React from 'react'
import { useState } from 'react'
import Report from './Report'
import Navbar from '../../../../components/Navbar'
import "./income.css"
const Income = () => {
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  var [isMenuClicked, setIsMenuClicked] = useState(false);

  const updateMenu = () => {
    if (!isMenuClicked){
      setBurgerClass("burger-bar clicked")
      setMenuClass("menu visible")
    }

    else {
      setBurgerClass("burger-bar unclicked")
      setMenuClass("menu hidden")
    }
    setIsMenuClicked(!isMenuClicked)
  }
  return (
    <div className='income-body'>
      <div className={menu_class}>
          <Navbar />
        </div>
      <div className='income-right'>
      <div className='header-mid'>
              <div className='brgr-menu' onClick={updateMenu}>
                <div className={burger_class}></div>
                <div className={burger_class}></div>
                <div className={burger_class}></div>
              </div>
              <h1 style={{opacity: isMenuClicked === true ? '0' : '1'}}>Financial App</h1>
          </div>
        <Report />
      </div>
    </div>

  )
}

export default Income
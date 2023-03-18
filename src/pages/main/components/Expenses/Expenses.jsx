import Navbar from "../../../../components/Navbar"
import { useState } from 'react'
import Report from './Report'
import "./Expenses.css"

const Expenses = () => {
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
    <div className='expenses-body' >
      <div className={menu_class}>
          <Navbar />
        </div>
      <div className='expenses-right'>
      <div className='header-mid'>
              <div className='brgr-menu' onClick={updateMenu}>
                <div className={burger_class}></div>
                <div className={burger_class}></div>
                <div className={burger_class}></div>
              </div>
              <h1>Financial App</h1>
          </div>
        <Report />
      </div>
    </div>
  )
}

export default Expenses
import React from 'react'
import { useState } from 'react'
import Hero from './Hero'
import Report from './Report'
import Navbar from '../../../../components/Navbar'
import Targetgoal from './Targetgoal'
import "./home.css"
import Profitgoal from '../../../../components/Profitgoal'

const Home = () => {
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
    <>
      <div className='home-body'>
        <div className={menu_class}>
          <Navbar />
        </div>
        <div className='home-middle'>
          <div className='header-mid'>
              <div className='brgr-menu' onClick={updateMenu}>
                <div className={burger_class}></div>
                <div className={burger_class}></div>
                <div className={burger_class}></div>
              </div>
              <h1>Financial App</h1>
          </div>
          <div className="home-mid-ch1"><Profitgoal /></div>
          <div className="home-mid-ch2"><Hero /></div>
        </div>
        <div className='home-right'>
          <Targetgoal />
        </div>
        <div className='home-report'>
          <Report />
        </div>
      </div>
    </>
  )
}


export default Home
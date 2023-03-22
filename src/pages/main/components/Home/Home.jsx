import React from 'react'
import { useState, useEffect } from 'react'
import Hero from './Hero'
import Report from './Report'
import Navbar from '../../../../components/Navbar'
import Targetgoal from './Targetgoal'
import "./home.css"
import Profitgoal from '../../../../components/Profitgoal'
import PropagateLoader from "react-spinners/PropagateLoader";
import Logo from "../../../../assets/New Project.png"
const Home = () => {
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked")
      setMenuClass("menu visible")
    }

    else {
      setBurgerClass("burger-bar unclicked")
      setMenuClass("menu hidden")
    }
    setIsMenuClicked(!isMenuClicked)
  }
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 6000)
  }, [])
  return (
    <>
      <div >

        {loader ?
          <div className='loader'>
            <img src={Logo} alt='Logo' className='loader-img' />
            <PropagateLoader
              className='loading'
              color="rgba(130, 118, 118, 0.648)"
              size={26}
              speedMultiplier={1.2}
            />
          </div>

          :
          <div className='home-body'>
            <div className={menu_class}>
              <Navbar />
            </div>
            <div className='home-middle'>
              <div className='header-mid'>
                <div style={{ marginTop: isMenuClicked === true ? '-13px' : '0px' }} className='brgr-menu' onClick={updateMenu}>
                  <div className={burger_class}></div>
                  <div className={burger_class}></div>
                  <div className={burger_class}></div>
                </div>
                <h1 style={{ opacity: isMenuClicked === true ? '0' : '1' }}>Financial App</h1>
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
        }

      </div>
    </>
  )
}


export default Home
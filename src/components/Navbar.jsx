import React from 'react'
import "./Navbar.css"
import logo from "../assets/Logo.png"
import { IoApps } from "react-icons/io5";
import { Link, NavLink } from 'react-router-dom'
import { TfiBarChartAlt, TfiBarChart } from "react-icons/tfi"
import { MdManageAccounts } from "react-icons/md"
import { useEffect } from 'react';
const activePage = window.location
console.log(activePage);

const Navbar = () => {
  function changeTheme() {
    const root = document.documentElement;
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
      root.style.setProperty('--lightgray', 'white');
      root.style.setProperty('--darkgray', 'rgba(209, 201, 201, 0.536)');
      root.style.setProperty('--textlight', 'black');
      root.style.setProperty('--admlight', 'rgba(209, 201, 201, 0.536)');
      root.style.setProperty('--transition', 'background-color 0.5s ease');
      root.style.setProperty('--btn-hvr', 'black');
      root.style.setProperty('--btn-hvrt', 'black');
      root.style.setProperty('--text', 'white');
      root.style.setProperty('--chart', 'white');
      localStorage.setItem('theme', 'light');
      setThemeOnLoad();
      setIsChecked(false);
    } else {
      root.style.setProperty('--lightgray', '#4e4e4e');
      root.style.setProperty('--darkgray', 'gray');
      root.style.setProperty('--textlight', 'white');
      root.style.setProperty('--admlight', 'white');
      root.style.setProperty('--transition', 'background-color 0.5s ease');
      root.style.setProperty('--btn-hvr', 'white');
      root.style.setProperty('--btn-hvrt', 'black');
      root.style.setProperty('--text', 'black');
      root.style.setProperty('--chart', '#ebebeb');
      localStorage.setItem('theme', 'dark');
      setThemeOnLoad();
      setIsChecked(true);
    }
  }

  function setThemeOnLoad() {
    const root = document.documentElement;
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      root.style.setProperty('--lightgray', '#4e4e4e');
      root.style.setProperty('--darkgray', 'gray');
      root.style.setProperty('--textlight', 'white');
      root.style.setProperty('--admlight', '#242424');
      root.style.setProperty('--btn-hvr', 'white');
      root.style.setProperty('--btn-hvrt', 'white');
      root.style.setProperty('--text', 'black');
      root.style.setProperty('--chart', '#ebebeb');
      root.style.setProperty('--transition', 'background-color 0.5s ease');
    } else {
      root.style.setProperty('--lightgray', 'white');
      root.style.setProperty('--darkgray', 'rgba(209, 201, 201, 0.536)');
      root.style.setProperty('--textlight', 'black');
      root.style.setProperty('--admlight', 'white');
      root.style.setProperty('--btn-hvr', 'black');
      root.style.setProperty('--btn-hvrt', 'black');
      root.style.setProperty('--text', 'white');
      root.style.setProperty('--chart', 'white');
      root.style.setProperty('--transition', 'background-color 0.5s ease');
    }
  }


  const [isChecked, setIsChecked] = React.useState(
    localStorage.getItem('theme') === 'dark'
  );
  const userType = sessionStorage.getItem('userType'); // or sessionStorage
  const handleLogout = () => {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('expiresAt');
    window.location.href = "home";
  };
  useEffect(() => {
    setThemeOnLoad();
  }, []);

  return (
    <>
      <div className='navbar-body'>
        <div className='nav-logo'>
          <Link to='/home'>
            <img src={logo} alt='logo' />
          </Link>
          <h3>Financal app</h3>
        </div>
        <div className='nav-manage'>
          <h2>Manage</h2>
          <div className='nav-manage-list'>
            <ul>
              <li><NavLink to="/home"> <IoApps /><p>Home</p></NavLink></li>
              <li><NavLink to="/income"> <TfiBarChartAlt /><p>Income</p></NavLink></li>
              <li><NavLink to="/expenses"> <TfiBarChart /><p>Expenses</p></NavLink></li>
              {userType === "1" ? <li><NavLink to="/users"><MdManageAccounts /><p>Users</p></NavLink></li> : null}
            </ul>
            <div className='nav-manage-l'>
              <div id="botton" className='theme'>
                <span>Theme</span>
                <div className="checkbox-wrapper-34">
                  <input className='tgl tgl-ios' id='toggle-34' type='checkbox' defaultChecked={isChecked} onClick={changeTheme} />
                  <label className='tgl-btn' htmlFor='toggle-34'></label>
                </div>
              </div>
              <button onClick={handleLogout} className='logout'>Log Out</button>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default Navbar;
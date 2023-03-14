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
function changeTheme() {
  const root = document.documentElement;
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark') {
    root.style.setProperty('--lightgray', 'white');
    root.style.setProperty('--darkgray', 'rgba(209, 201, 201, 0.536)');
    root.style.setProperty('--textlight', 'black');
    root.style.setProperty('--admlight', 'rgba(209, 201, 201, 0.536)');
    root.style.setProperty('--transition', 'background-color 0.5s ease');
    localStorage.setItem('theme', 'light');
    setThemeOnLoad();
  } else {
    root.style.setProperty('--lightgray', 'black');
    root.style.setProperty('--darkgray', 'gray');
    root.style.setProperty('--textlight', 'white');
    root.style.setProperty('--admlight', 'white');
    root.style.setProperty('--transition', 'background-color 0.5s ease');
    localStorage.setItem('theme', 'dark');
    setThemeOnLoad();
  }
}

function setThemeOnLoad() {
  const root = document.documentElement;
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    root.style.setProperty('--lightgray', 'black');
    root.style.setProperty('--darkgray', 'gray');
    root.style.setProperty('--textlight', 'white');
    root.style.setProperty('--admlight', '#242424');
    root.style.setProperty('--transition', 'background-color 0.5s ease');
  } else {
    root.style.setProperty('--lightgray', 'white');
    root.style.setProperty('--darkgray', 'rgba(209, 201, 201, 0.536)');
    root.style.setProperty('--textlight', 'black');
    root.style.setProperty('--admlight', 'white');
    root.style.setProperty('--transition', 'background-color 0.5s ease');
  }
}

const Navbar = () => {
  const userType = sessionStorage.getItem('userType'); // or sessionStorage
  const handleLogout = () => {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('expiresAt');
    window.location.href = "/";
  };
  useEffect(() => {
    setThemeOnLoad();
  }, []);

  return (
    <>
      <div className='navbar-body'>
        <div className='nav-logo'>
          <Link to='/'>
            <img src={logo} alt='logo' />
          </Link>
          <h3>Financal app</h3>
        </div>
        <div className='nav-manage'>
          <h2>Manage</h2>
          <div className='nav-manage-list'>
            <ul>
              <li><NavLink to="/home"> <IoApps /><p>Home</p></NavLink ></li>
              <li><NavLink to="/income"> <TfiBarChartAlt /><p>Income</p></NavLink ></li>
              <li><NavLink to="/expenses"> <TfiBarChart /><p>Expenses</p></NavLink ></li>
              {userType === "1" ? <li><NavLink to="/users"><MdManageAccounts /><p>Users</p></NavLink ></li> : null}
            </ul>
            <div className='nav-manage-l'>
              <button id="botton" className='theme'  onClick={changeTheme}>Theme</button>
              <button onClick={handleLogout} className='logout'>Log Out</button>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default Navbar;
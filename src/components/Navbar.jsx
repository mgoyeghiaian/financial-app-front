import React from 'react'
import "./Navbar.css"
import logo from "../assets/Logo.png"
import { IoApps } from "react-icons/io5";
import { Link, NavLink } from 'react-router-dom'
import { TfiBarChartAlt, TfiBarChart } from "react-icons/tfi"
import { MdManageAccounts } from "react-icons/md"
const activePage = window.location
console.log(activePage);
const Navbar = () => {
  const userType = sessionStorage.getItem('userType'); // or sessionStorage
  const handleLogout = () => {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('expiresAt');
    window.location.href = "/";
  };
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
              <li><button>Theme</button></li>
              <li><button onClick={handleLogout}>Log Out</button></li>
            </ul>
          </div>
        </div>
      </div >
    </>
  )
}

export default Navbar
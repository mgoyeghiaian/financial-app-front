import React from 'react'
import "./Navbar.css"
import logo from "../assets/Logo.png"
import { IoApps } from "react-icons/io5";
import { Link, NavLink } from 'react-router-dom'
import { TfiBarChartAlt, TfiBarChart, TfiPencilAlt } from "react-icons/tfi"
import { SlChart } from "react-icons/sl"
import PersonIcon from '@mui/icons-material/Person';
import { MdManageAccounts } from "react-icons/md"
const activePage = window.location
console.log(activePage);
const Navbar = () => {
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
              <li><NavLink to="/home"> <IoApps />   Home</NavLink ></li>
              <li><NavLink to="/income"> <TfiBarChartAlt />Income</NavLink ></li>
              <li><NavLink to="/expenses"> <TfiBarChart />Expenses</NavLink ></li>
              <li><NavLink to="/total"> <SlChart />Total</NavLink ></li>
            </ul>
          </div>
        </div>

        <div className='nav-preferences'>
          <h2>Preferences</h2>
          <div className='nav-preferences-list'>
            <ul>
              <li><button>Theme</button></li>
              <li><NavLink to="/users"><PersonIcon /> Users</NavLink ></li>
            </ul>
          </div>
        </div>
      </div >
    </>
  )
}

export default Navbar